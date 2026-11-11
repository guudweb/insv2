// CAMBIO WEB_INSESO 28/10: mismo código de seguimiento en ambos correos; envío verificable sin SMTP real en pruebas.
import {createLocalizer} from '../i18n/release.mjs';
import {FORM_PATTERNS} from '../data/web-forms.mjs';
import {matchesPattern} from '../lib/form-validation.mjs';
import {randomUUID} from 'node:crypto';
import {json,sameOrigin,mailReady,mailSender,readJson,clientKey} from './mail.mjs';
import {mailRecipient} from '../config/mail.mjs';
export function createContactHandler({sendMail,ready=()=>mailReady(),recipient=()=>mailRecipient(),clock=()=>Date.now()}={}){
 const attempts=new Map();
 return async({request,clientAddress})=>{
  if(!sameOrigin(request))return json({success:false,code:'ORIGIN'},403);
  if(!request.headers.get('content-type')?.startsWith('application/json'))return json({success:false,code:'INVALID_CONTENT_TYPE'},415);
  const now=clock(),key=clientKey(request,clientAddress),a=attempts.get(key)||{n:0,at:now};if(now-a.at>600000){a.n=0;a.at=now;}a.n++;attempts.set(key,a);if(attempts.size>5000){for(const[k,v]of attempts)if(now-v.at>600000)attempts.delete(k);while(attempts.size>5000)attempts.delete(attempts.keys().next().value);}if(a.n>10)return json({success:false,code:'RATE_LIMIT'},429);
  try{
   const input=await readJson(request,8192);if(!input||typeof input!=='object'||Array.isArray(input))return json({success:false,code:'INVALID_INPUT'},400);
   const {name,email,phone='',category,message,privacy,lang='es',website=''}=input;
   if([name,email,phone,category,message].some(v=>typeof v!=='string')||name.trim().length<2||name.length>120||!matchesPattern(FORM_PATTERNS.name,name.trim())||/[\r\n\x00-\x1f]/.test(name)||email.length>254||!/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)||phone.length>50||(phone.trim()&&!matchesPattern(FORM_PATTERNS.phone,phone.trim()))||message.trim().length<2||message.length>3000||!['afiliacion','carne','prestaciones','informacion'].includes(category)||privacy!==true||website)return json({success:false,code:'INVALID_INPUT'},400);
   if(!ready())return json({success:false,code:'SMTP_UNAVAILABLE'},503);
   const reference='INSESO-C-'+randomUUID().slice(0,18).toUpperCase(),send=sendMail||mailSender();
   const body=`CONSULTA DE ATENCIÓN AL ASEGURADO\nReferencia: ${reference}\nFecha: ${new Intl.DateTimeFormat('es-ES',{timeZone:'Africa/Malabo',dateStyle:'medium',timeStyle:'short'}).format(now)} (Africa/Malabo)\n\nDATOS DEL SOLICITANTE\nNombre: ${name.trim()}\nCorreo: ${email}\nTeléfono: ${phone.trim()||'No facilitado'}\nTrámite: ${category}\n\nMENSAJE\n${message.trim()}`;
   await send({to:recipient(),replyTo:email,subject:`[${reference}] Nueva consulta · ${category}`,text:body});
   const l=createLocalizer(['es','en','fr','pt'].includes(lang)?lang:'es');let confirmation=true;try{await send({to:email,replyTo:'info@inseso.org',subject:`[${reference}] ${l('Justificante de consulta INSESO')}`,text:`${l('Hemos recibido su consulta. Conserve la referencia {reference} para su seguimiento.',{reference})}\n\n${l('Trámite:')} ${l({afiliacion:'Afiliación',carne:'Solicitud de carné',prestaciones:'Solicitud de prestaciones sociales',informacion:'Información'}[category])}\n${message.trim()}\n\n${l('Este justificante confirma la recepción del mensaje; no acredita la resolución del trámite. Para seguimiento contacte con INSESO indicando la referencia.')}`});}catch{confirmation=false;}
   return json({success:true,reference,confirmation});
  }catch(e){return json({success:false,code:e?.status?'INVALID_INPUT':'SMTP_UNAVAILABLE'},e?.status||503);}
 };
}
