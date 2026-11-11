// Comprobación sin envío ni uso de datos personales reales.
import assert from 'node:assert/strict';
import {readdirSync} from 'node:fs';
import {App} from 'astro/app';
process.env.ASTRO_NODE_AUTOSTART='disabled';
const {pageMap}=await import('../dist/server/entry.mjs');
const file=readdirSync(new URL('../dist/server/',import.meta.url)).find(n=>n.startsWith('manifest_'));
const {manifest}=await import(`../dist/server/${file}`);
const app=new App({...manifest,pageMap,middleware:()=>import('../dist/server/_astro-internal_middleware.mjs')});
const checks={empresa:['Nombre de la empresa','Capital social','N.º de Identificación Fiscal','País de nacimiento'],trabajador:['Nombre del padre','N.º de cuenta corriente','Historial laboral','Fecha de contratación'],prestacion:['Nombre y apellidos del causante','Empresa 6','Orfandad'],reembolso:['Patrono','Importe total de las facturas presentadas (FCFA)','Informe médico']};
for(const [id,fields] of Object.entries(checks)){const r=await app.render(new Request(`http://localhost/formulario-web?tipo=${id}`));const h=await r.text();assert.equal(r.status,200);assert(h.includes('<form'));assert((h.match(/<input/g)||[]).length>=8);for(const f of fields)assert(h.includes(f),`${id}: ${f}`);assert(h.includes('Descargar formulario'));assert(!h.includes('Enviar al INSESO'));assert(h.includes('data-form-action=')&&h.includes('name="signatureMethod"'));}
for(const [route,token,klass,count] of [['/nuestras_agencias','ebibeyin.jpg','class="office"',10],['/organigrama','service-photo','class="service-photo"',11]]){const r=await app.render(new Request('http://localhost'+route));const h=await r.text();assert.equal(r.status,200);assert(h.includes(token));assert.equal(h.split(klass).length-1,count);}
console.log('4 fichas, 10 delegaciones y 11 espacios para fotografías comprobados');
