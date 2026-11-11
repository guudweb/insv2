// Pruebas sin conexiones SMTP ni correos reales.
import assert from 'node:assert/strict';
import {createContactHandler} from '../src/server/contact.mjs';
import {mailRecipient} from '../src/config/mail.mjs';
const payload={name:'Persona de prueba',email:'ciudadano@example.org',phone:'123456',category:'informacion',message:'Consulta de prueba para verificar el formulario.',privacy:true};
const request=(data,headers={})=>({clientAddress:'127.0.0.1',request:new Request('http://localhost/api/send-email',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:typeof data==='string'?data:JSON.stringify(data)})});
const make=(options={})=>{const mails=[];const handler=createContactHandler({ready:()=>true,recipient:()=>mailRecipient({}),sendMail:async m=>{mails.push(m);return{accepted:[m.to]};},...options});return{handler,mails};};
let checks=0;
assert.equal(mailRecipient({}),'flora.bula@inseso.org');assert.equal(mailRecipient({SMTP_TO:'prueba@example.org'}),'flora.bula@inseso.org');checks+=2;
{const {handler,mails}=make();const r=await handler(request(payload));assert.equal(r.status,200);const b=await r.json();assert.equal(b.success,true);assert.equal(b.confirmation,true);assert.match(b.reference,/^INSESO-C-/);assert.equal(mails.length,2);assert.equal(mails[0].to,'flora.bula@inseso.org');assert.equal(mails[1].to,payload.email);assert.equal(mails[0].replyTo,payload.email);for(const m of mails){assert(m.subject.includes(b.reference));assert(m.text.includes(b.reference));}checks++;}
{const {handler}=make({sendMail:async()=>{throw new Error('rechazo SMTP');}});const r=await handler(request(payload));assert.equal(r.status,503);assert.equal((await r.json()).success,false);checks++;}
{let n=0;const {handler}=make({sendMail:async()=>{if(++n===2)throw new Error('fallo justificante');}});const r=await handler(request(payload));assert.equal(r.status,200);assert.equal((await r.json()).confirmation,false);checks++;}
for(const privacy of [false,undefined,'true',0,null]){const {handler,mails}=make();assert.equal((await handler(request({...payload,privacy}))).status,400);assert.equal(mails.length,0);checks++;}
for(const bad of [{...payload,name:'a'},{...payload,name:'nombre\r\ninyección'},{...payload,email:'correo-invalido'},{...payload,message:''},{...payload,message:'a'.repeat(3001)},{...payload,phone:123},{...payload,category:'otro'},{...payload,website:'bot'},null,[]]){const {handler,mails}=make();assert.equal((await handler(request(bad))).status,400);assert.equal(mails.length,0);checks++;}
{const {handler,mails}=make();assert.equal((await handler(request(payload,{Origin:'https://otro.example'}))).status,403);assert.equal((await handler(request(payload,{'Content-Type':'text/plain'}))).status,415);assert.equal((await handler(request('{'))).status,400);assert.equal((await handler(request('x'.repeat(9000)))).status,413);assert.equal(mails.length,0);checks+=4;}
{const {handler,mails}=make({ready:()=>false});assert.equal((await handler(request(payload))).status,503);assert.equal(mails.length,0);checks++;}
{let now=0;const {handler}=make({clock:()=>now});for(let i=0;i<10;i++)assert.equal((await handler(request(payload))).status,200);assert.equal((await handler(request(payload))).status,429);now=600001;assert.equal((await handler(request(payload))).status,200);checks++;}
console.log(`${checks} comprobaciones de contacto superadas sin enviar correos reales`);
