// CAMBIO INSESO R4: pruebas sobre las páginas renderizadas.
import {readdirSync,readFileSync,writeFileSync,existsSync} from 'node:fs';
import assert from 'node:assert/strict';
import {App} from 'astro/app';
process.env.ASTRO_NODE_AUTOSTART='disabled';
const {pageMap}=await import('../dist/server/entry.mjs');
const name=readdirSync(new URL('../dist/server/',import.meta.url)).find(n=>n.startsWith('manifest_'));
const {manifest}=await import(`../dist/server/${name}`);
const app=new App({...manifest,pageMap,middleware:()=>import('../dist/server/_astro-internal_middleware.mjs')});
const benefits=JSON.parse(readFileSync(new URL('../src/data/benefits.json',import.meta.url)));
assert.equal(benefits.length,11);assert.equal(new Set(benefits.map(b=>b.slug)).size,11);assert.equal(benefits.filter(b=>b.group==='muerte-supervivencia').length,4);
const paths=['/','/Prestaciones_Sociales','/nuestras_agencias','/contacto','/formulario-prestaciones','/sobre_nosotros','/fr/sobre_nosotros','/en/sobre_nosotros','/pt/sobre_nosotros','/fr/Prestaciones_Sociales','/en/Prestaciones_Sociales','/pt/Prestaciones_Sociales',...benefits.flatMap(b=>['','/en','/fr','/pt'].map(prefix=>`${prefix}/prestacion/${b.slug}`))];
const results=[];
for(const path of paths){
 const res=await app.render(new Request('http://localhost'+path));const html=await res.text();
 assert.equal(res.status,200,path);
 const top=html.match(/<div class="top-bar"[\s\S]*?<\/nav>/)?.[0]||'';
 assert(!top.includes('944')&&!top.includes('1066')&&!top.includes('fa-phone'),path+' header');
 assert.equal((html.match(/aria-label="TikTok de INSESO"/g)||[]).length,2,path+' TikTok');
 assert(!html.includes('tiktok-social pending'),path+' TikTok activated');
 if(path.endsWith('Prestaciones_Sociales')){assert.equal((html.match(/class="benefit-card"/g)||[]).length,11);assert(html.includes('id="muerte-supervivencia"'));}
 if(path.endsWith('sobre_nosotros')){
  for(const label of ['Eduardo Orobiyi Lajay','Monserrat de la Gracia Bonkanka','Juana Magdalena Ntutumu','id="organigrama"'])assert(html.includes(label),path+' '+label);
  assert.equal((html.match(/class="service-node"/g)||[]).length,10);
  assert.equal((html.match(/class="leader (pca|delegate|secretary)"/g)||[]).length,3);
 }
 const slug=path.split('/prestacion/')[1];
 if(slug){
  const benefit=benefits.find(b=>b.slug===slug);
  assert.equal((html.match(/<summary/g)||[]).length,benefit.questions.length,path+' questions');
  assert(html.includes('data-faq-action="open"')&&html.includes('data-faq-action="close"'));
  for(const question of benefit.questions)for(const answer of question.answers)assert(html.includes(answer.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;')),path+' missing source answer');
  for(const src of [...html.matchAll(/<img[^>]+src="([^"]+)"/g)].map(m=>m[1]).filter(s=>s.startsWith('/')))assert(existsSync(new URL('../public'+src,import.meta.url)),path+' image '+src);
  if(slug==='prestaciones-por-invalidez')writeFileSync('/tmp/benefit-faq-render.html',html);
  if(['gastos-de-sepelio','subsidio-de-incapacidad-temporal'].includes(slug))assert(html.includes('pago único'));
 }
 if(path==='/contacto')assert(html.includes('1066')&&!html.includes('bata@inseso-ge.org'));
 results.push({path,status:res.status,pass:true});
}
for(const path of ['/prestacion/no-existe','/prestacion/prestaciones-medico-farmaceuticas']){const r=await app.render(new Request('http://localhost'+path));assert.equal(r.status,404);results.push({path,status:r.status,pass:true});}
for(const path of ['/Subsidios_familiares','/Prestaciones_Médico_Farmacéuticas','/Prestaciones_por_muerte_y_supervivencia']){const r=await app.render(new Request('http://localhost'+path));assert.equal(r.status,301);results.push({path,status:r.status,location:r.headers.get('location'),pass:true});}
writeFileSync(new URL('../docs/PRUEBAS_REVISION_4.json',import.meta.url),JSON.stringify(results,null,2));console.log(`${results.length} rutas verificadas correctamente`);
