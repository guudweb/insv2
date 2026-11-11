// CAMBIO INSESO FINAL: agenda persistente, exclusión de dobles reservas y bandeja de correos reintentable.
import {createLocalizer} from '../i18n/release.mjs';
import {translateBenefitText} from '../i18n/benefits.mjs';
import {FORM_PATTERNS} from '../data/web-forms.mjs';
import {matchesPattern} from '../lib/form-validation.mjs';
import {DatabaseSync} from 'node:sqlite';
import {mkdirSync,chmodSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {randomUUID,createHash} from 'node:crypto';
import config from '../data/appointments.json' with {type:'json'};
import benefits from '../data/benefits.json' with {type:'json'};
import {mailReady,mailSender} from './mail.mjs';
import {mailRecipient} from '../config/mail.mjs';
export {config};
export class BookingError extends Error{constructor(code,status=400){super(code);this.code=code;this.status=status;}}
export function createAgenda({dbPath=process.env.APPOINTMENTS_DB_PATH||'var/appointments.sqlite',settings=config,sendMail,clock=()=>new Date(),enabled=process.env.APPOINTMENTS_ENABLED==='true'}={}){
 if(!Number.isInteger(settings.slotMinutes)||settings.slotMinutes<5||settings.slotMinutes>240||settings.startHour<0||settings.endHour>24||settings.startHour>=settings.endHour||settings.daysAhead<1||settings.daysAhead>365)throw new Error('INVALID_SCHEDULE');
 const file=resolve(dbPath);mkdirSync(dirname(file),{recursive:true,mode:0o700});const db=new DatabaseSync(file);chmodSync(file,0o600);db.exec('PRAGMA journal_mode=WAL; PRAGMA busy_timeout=5000; PRAGMA foreign_keys=ON;');
 db.exec(`CREATE TABLE IF NOT EXISTS bookings(id TEXT PRIMARY KEY,request_key TEXT UNIQUE NOT NULL,fingerprint TEXT NOT NULL,office TEXT NOT NULL,service TEXT NOT NULL,benefit TEXT NOT NULL,date TEXT NOT NULL,time TEXT NOT NULL,name TEXT NOT NULL,email TEXT NOT NULL,locale TEXT NOT NULL DEFAULT 'es',status TEXT NOT NULL DEFAULT 'confirmed',created_at TEXT NOT NULL);CREATE UNIQUE INDEX IF NOT EXISTS slot_unique ON bookings(office,date,time) WHERE status='confirmed';CREATE TABLE IF NOT EXISTS outbox(id INTEGER PRIMARY KEY,booking_id TEXT NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,kind TEXT NOT NULL,status TEXT NOT NULL DEFAULT 'pending',attempts INTEGER NOT NULL DEFAULT 0,next_attempt INTEGER NOT NULL DEFAULT 0,lease_until INTEGER NOT NULL DEFAULT 0,UNIQUE(booking_id,kind));`);
 // Migración compatible con las agendas creadas por entregas anteriores.
 if(!db.prepare('PRAGMA table_info(bookings)').all().some(column=>column.name==='locale')){try{db.exec("ALTER TABLE bookings ADD COLUMN locale TEXT NOT NULL DEFAULT 'es'");}catch(e){if(!String(e).includes('duplicate column name'))throw e;}}
 const isReady=()=>enabled&&(sendMail||mailReady())&&settings.offices.some(o=>o.enabled&&o.services.length);
 const today=()=>new Intl.DateTimeFormat('en-CA',{timeZone:settings.timezone,year:'numeric',month:'2-digit',day:'2-digit'}).format(clock());
 function validDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const date=new Date(value+'T12:00:00Z');if(!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==value)return false;const diff=Math.round((date-new Date(today()+'T12:00:00Z'))/86400000);return diff>=settings.minimumLeadDays&&diff<=settings.daysAhead&&settings.weekdays.includes(date.getUTCDay())&&!settings.closedDates.includes(value);}
 function officeFor(service,office){if(!settings.services.some(s=>s.id===service))throw new BookingError('INVALID_SERVICE');const row=settings.offices.find(o=>o.id===office&&o.enabled&&o.services.includes(service));if(!row)throw new BookingError('INVALID_OFFICE');return row;}
 function slots(service,office,date){if(!isReady())throw new BookingError('UNAVAILABLE',503);officeFor(service,office);if(!validDate(date))throw new BookingError('INVALID_DATE');const used=new Set(db.prepare("SELECT time FROM bookings WHERE office=? AND date=? AND status='confirmed'").all(office,date).map(b=>b.time));const result=[];for(let minute=settings.startHour*60;minute+settings.slotMinutes<=settings.endHour*60;minute+=settings.slotMinutes){const time=String(Math.floor(minute/60)).padStart(2,'0')+':'+String(minute%60).padStart(2,'0');if(!used.has(time))result.push(time);}return result;}
 function metadata(lang='es'){const l=createLocalizer(lang),bt=text=>translateBenefitText(text,lang);return{enabled:Boolean(isReady()),timezone:settings.timezone,minimumLeadDays:settings.minimumLeadDays,daysAhead:settings.daysAhead,weekdays:settings.weekdays,closedDates:settings.closedDates,services:settings.services.map(service=>({...service,name:l(service.name),requirements:service.requirements.map(text=>l(text))})),offices:settings.offices.filter(o=>o.enabled).map(o=>({...o,name:l(o.name)})),benefits:benefits.map(b=>({slug:b.slug,title:bt(b.titulo),requirements:b.questions.filter(q=>/Requisitos|documentación/i.test(q.heading)).flatMap(q=>[...q.answers,...(q.documentGroups||[]).flatMap(g=>[g.title,...g.items])]).map(bt)}))};}

 function response(b){const jobs=db.prepare('SELECT kind,status FROM outbox WHERE booking_id=?').all(b.id);return{reference:b.id,date:b.date,time:b.time,office:createLocalizer(b.locale||'es')(settings.offices.find(o=>o.id===b.office)?.name||b.office),notification:jobs.length===2&&jobs.every(j=>j.status==='sent')?'smtp-accepted':'pending'};}
 function reserve(input){
  if(!isReady())throw new BookingError('UNAVAILABLE',503);
  const {service,office,date,time,name,email,requestKey,benefit='',privacy,lang='es',website=''}=input||{};
  if(website)throw new BookingError('INVALID_INPUT');
  if([service,office,date,time,name,email,requestKey,benefit].some(v=>typeof v!=='string')||name.trim().length<2||name.length>120||!matchesPattern(FORM_PATTERNS.name,name.trim())||/[\r\n\x00-\x1f]/.test(name)||email.length>254||!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)||!/^[\w-]{20,80}$/.test(requestKey)||privacy!==true)throw new BookingError('INVALID_INPUT');
  const normalized={service,office,date,time,name:name.trim(),email:email.trim().toLowerCase(),benefit:service==='prestacion'?benefit:''};
  if(service==='prestacion'&&!benefits.some(b=>b.slug===benefit))throw new BookingError('INVALID_BENEFIT');
  const fingerprint=createHash('sha256').update(JSON.stringify(normalized)).digest('hex');
  const prior=db.prepare('SELECT * FROM bookings WHERE request_key=?').get(requestKey);if(prior){if(prior.fingerprint!==fingerprint)throw new BookingError('KEY_CONFLICT',409);if(prior.status!=='confirmed')throw new BookingError('CANCELLED',409);return response(prior);}
  officeFor(service,office);if(!validDate(date))throw new BookingError('INVALID_DATE');
  if(!slots(service,office,date).includes(time))throw new BookingError('SLOT_TAKEN',409);
  if(db.prepare("SELECT COUNT(*) AS n FROM bookings WHERE email=? AND date>=? AND status='confirmed'").get(normalized.email,today()).n>=3)throw new BookingError('TOO_MANY_BOOKINGS',429);
  const id='INSESO-'+randomUUID().slice(0,18).toUpperCase();
  try{db.exec('BEGIN IMMEDIATE');db.prepare('INSERT INTO bookings(id,request_key,fingerprint,office,service,benefit,date,time,name,email,created_at,locale) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)').run(id,requestKey,fingerprint,office,service,normalized.benefit,date,time,normalized.name,normalized.email,clock().toISOString(),['es','en','fr','pt'].includes(lang)?lang:'es');for(const kind of ['institution','citizen'])db.prepare('INSERT INTO outbox(booking_id,kind) VALUES(?,?)').run(id,kind);db.exec('COMMIT');}catch(error){db.exec('ROLLBACK');if(String(error).includes('UNIQUE constraint'))throw new BookingError('SLOT_TAKEN',409);throw error;}
  return response(db.prepare('SELECT * FROM bookings WHERE id=?').get(id));
 }
 async function deliver(limit=10){
  const send=sendMail||mailSender();let sent=0,failed=0;
  for(let i=0;i<limit;i++){
   const now=clock().getTime();db.exec('BEGIN IMMEDIATE');let job;
   try{job=db.prepare(`SELECT o.* FROM outbox o JOIN bookings b ON b.id=o.booking_id WHERE b.status='confirmed' AND o.status!='sent' AND o.next_attempt<=? AND o.lease_until<? AND (o.kind='institution' OR EXISTS(SELECT 1 FROM outbox x WHERE x.booking_id=o.booking_id AND x.kind='institution' AND x.status='sent')) ORDER BY o.id LIMIT 1`).get(now,now);if(job)db.prepare("UPDATE outbox SET status='sending',lease_until=? WHERE id=?").run(now+120000,job.id);db.exec('COMMIT');}catch(e){db.exec('ROLLBACK');throw e;}
   if(!job)break;
   const b=db.prepare('SELECT * FROM bookings WHERE id=?').get(job.booking_id);const office=settings.offices.find(o=>o.id===b.office),service=settings.services.find(s=>s.id===b.service),benefit=benefits.find(x=>x.slug===b.benefit);
   const requirements=benefit?benefit.questions.filter(q=>/Requisitos|documentación/i.test(q.heading)).flatMap(q=>[...q.answers,...(q.documentGroups||[]).flatMap(g=>[g.title,...g.items])]):service.requirements;
   const language=job.kind==='citizen'?(b.locale||'es'):'es',l=createLocalizer(language),bt=text=>translateBenefitText(text,language);
   const text=`${l('CITA PREVIA INSESO')}\n${l('Referencia:')} ${b.id}\n${l('Nombre:')} ${b.name}\n${l('Correo:')} ${b.email}\n${l('Trámite:')} ${l(service.name)}${benefit?' · '+bt(benefit.titulo):''}\n${l('Delegación:')} ${l(office.name)}\n${l('Dirección:')} ${office.address}\n${l('Fecha:')} ${b.date}\n${l('Hora:')} ${b.time} (${settings.timezone})\n\n${l('Documentos que debe llevar:')}\n${requirements.map(x=>'- '+(benefit?bt(x):l(x))).join('\n')}\n\n${l('La atención y la presentación de documentación se realizan en persona. Este justificante acredita la reserva de cita; no supone la concesión de una prestación. No responda con informes médicos. Para incidencias o cambios contacte con info@inseso.org o llame al 1066 indicando la referencia.')}`;
   try{await send({to:job.kind==='institution'?mailRecipient():b.email,replyTo:job.kind==='institution'?b.email:'info@inseso.org',subject:`${l(job.kind==='institution'?'Nueva cita':'Justificante de cita')} INSESO · ${b.id}`,text,messageId:`<${b.id}.${job.kind}@inseso.org>`});db.prepare("UPDATE outbox SET status='sent',attempts=attempts+1,lease_until=0 WHERE id=?").run(job.id);sent++;}catch{db.prepare("UPDATE outbox SET status='pending',attempts=attempts+1,next_attempt=?,lease_until=0 WHERE id=?").run(now+Math.min(3600000,60000*2**Math.min(job.attempts,6)),job.id);failed++;}
  }return{sent,failed,pending:db.prepare("SELECT COUNT(*) AS n FROM outbox o JOIN bookings b ON b.id=o.booking_id WHERE o.status!='sent' AND b.status='confirmed'").get().n};
 }
 function cleanup(days=90){if(!Number.isInteger(days)||days<30)throw new Error('Retention must be at least 30 days');const date=new Date(clock().getTime()-days*86400000).toISOString().slice(0,10);return db.prepare('DELETE FROM bookings WHERE date<?').run(date).changes;}
 return{metadata,slots,reserve,deliver,cleanup,close:()=>db.close(),cancel:id=>db.prepare("UPDATE bookings SET status='cancelled' WHERE id=?").run(id),status:id=>{const b=db.prepare('SELECT * FROM bookings WHERE id=?').get(id);return b?response(b):null;}};
}
let agenda;export function productionAgenda(){return agenda??=createAgenda();}
