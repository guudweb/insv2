// Script real del formulario con DOM y red controlados; no se envía correo.
import {readFileSync,writeFileSync} from 'node:fs';import vm from 'node:vm';import assert from 'node:assert/strict';import ts from 'typescript';
const source=readFileSync(new URL('../src/components/ContactPanel.astro',import.meta.url),'utf8').match(/<script>([\s\S]*?)<\/script>/)[1];
const events={},consent={checked:false,addEventListener:(name,fn)=>events['consent:'+name]=fn},button={disabled:false},status={textContent:''};
let valid=true,networkError=false,receipt=true;
const form={querySelector:selector=>selector==='[name=privacy]'?consent:button,reportValidity:()=>valid,addEventListener:(name,fn)=>events[name]=fn,reset:()=>{consent.checked=false;}};
const root={dataset:{words:JSON.stringify({success:'OK',error:'ERROR',receiptFailed:'JUSTIFICANTE PENDIENTE'})},querySelector:selector=>selector==='form'?form:selector==='#contact-result'?status:button};
const calls=[];class FormDataMock{constructor(){return new Map(Object.entries({name:'Persona de prueba',email:'prueba@example.org',category:'informacion',message:'Consulta de prueba',privacy:'on'}));}}
const context={document:{querySelector:()=>root,addEventListener:()=>{}},FormData:FormDataMock,fetch:async(url,options)=>{calls.push({url,body:JSON.parse(options.body)});return{ok:!networkError,json:async()=>({success:true,reference:'INSESO-C-TEST',confirmation:receipt})};}};
vm.runInNewContext(ts.transpileModule(source,{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText,context);
const submit=()=>events.submit({preventDefault(){}}),check=()=>{consent.checked=true;events['consent:change']();};
assert.equal(button.disabled,true);await submit();assert.equal(calls.length,0);
check();assert.equal(button.disabled,false);valid=false;await submit();assert.equal(calls.length,0);valid=true;
await submit();assert.equal(calls.length,1);assert.equal(calls[0].url,'/api/send-email');assert.equal(calls[0].body.privacy,true);assert(status.textContent.includes('INSESO-C-TEST'));assert.equal(button.disabled,true);
receipt=false;check();await submit();assert(status.textContent.includes('JUSTIFICANTE PENDIENTE'));
networkError=true;check();await submit();assert.equal(status.textContent,'ERROR');assert.equal(consent.checked,true);assert.equal(button.disabled,false);
consent.checked=false;events['consent:change']();assert.equal(button.disabled,true);await submit();assert.equal(calls.length,3);
writeFileSync(new URL('../docs/PRUEBAS_CONFIRMACION_UI.json',import.meta.url),JSON.stringify([{name:'Privacidad obligatoria, validación, petición, referencia y manejo de fallos de correo',pass:true}],null,2));console.log('Interfaz de contacto: privacidad, validación, referencia y errores verificados');
