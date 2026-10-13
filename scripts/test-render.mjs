// CAMBIO INSESO 2026-10-13: identidad verde y correcciones previas; detalles en docs/CAMBIOS_REVISION_2.md.
import { readdirSync, writeFileSync, readFileSync } from 'node:fs';
import { App } from 'astro/app';
process.env.ASTRO_NODE_AUTOSTART='disabled';
const { pageMap }=await import('../dist/server/entry.mjs');
const manifestName=readdirSync(new URL('../dist/server/',import.meta.url)).find(x=>x.startsWith('manifest_'));
const { manifest }=await import(`../dist/server/${manifestName}`);
const app=new App({...manifest,pageMap,middleware:()=>import('../dist/server/_astro-internal_middleware.mjs')});
const paths=['/','/nuestras_agencias','/fr/nuestras_agencias','/en/nuestras_agencias','/pt/nuestras_agencias','/Prestaciones_Sociales','/prestacion/discapacidad','/prestacion/pension-por-vejez','/prestacion/prestaciones-medico-farmaceuticas','/en/prestacion/viudedad','/descarga_formularios','/fr/descarga_formularios','/api/preview?type=noticia&documentId=test','/preview/home','/xx/contacto','/institucional','/en/institucional','/fr/','/en/','/pt/','/formulario-prestaciones','/fr/formulario-prestaciones','/sobre_nosotros','/condiciones_adhesion','/afiliacionee_trabajadores','/afiliacionee_empresas','/Prestaciones_Médico_Farmacéuticas'];
for (const b of JSON.parse(readFileSync(new URL('../src/data/benefits.json',import.meta.url)))) for (const locale of ['es','fr','en','pt']) paths.push(`${locale==='es'?'':'/'+locale}/prestacion/${b.slug}`);
let failed=0;
const results=[];
process.env.PREVIEW_SECRET='test-only-secret-for-render';
for(const path of paths){
 const res=await app.render(new Request('http://localhost'+path));const html=await res.text();
 const expected=path.endsWith('/institucional')||path.includes('Prestaciones_Médico_Farmacéuticas')?301:path.includes('prestaciones-medico-farmaceuticas')||path.startsWith('/xx/')?404:path.startsWith('/api/preview')||path.startsWith('/preview/')?401:200;
 let pass=res.status===expected;
 if(path.endsWith('nuestras_agencias'))pass=pass&&['Ebebiyín','Annobón','Luba','Oyala','Unidad Africana','Santa María 2','Kie-Osie'].every(x=>html.includes(x))&&!html.includes('Avenida de la Libertad');
 if(path==='/prestacion/pension-por-vejez')pass=pass&&html.includes('120 meses')&&html.includes('60 años')&&html.includes('80 %');
 if(path==='/prestacion/discapacidad')pass=pass&&html.includes('garantía de ingresos mínimos');
 if(path==='/Prestaciones_Sociales')pass=pass&&(html.match(/class="benefit-card"/g)||[]).length===8&&!html.includes('Prestaciones Médico-Farmacéuticas');
 if(path.includes('/prestacion/')&&res.status===200)pass=pass&&!html.includes('>Oficinas</a>')&&html.includes('/formulario-prestaciones')&&html.includes('/formularios/solicitud-comun-prestaciones.pdf');
 if(path.endsWith('nuestras_agencias'))pass=pass&&(html.match(/class="office"/g)||[]).length===10&&(html.match(/href="mailto:info@inseso.org"/g)||[]).length>=10;
 if(path==='/formulario-prestaciones')pass=pass&&html.includes('download=')&&html.includes('application/pdf');
 if(res.status===200){
 const menu=html.match(/<div class="dropdown-menu[^>]*aria-labelledby="navbarDropdownEmployers"[^>]*>([\s\S]*?)<\/div>/)?.[1]||'';
 pass=pass&&!menu.includes('/descarga_formularios')&&!html.includes('href="/institucional"')&&!html.includes('DECLARACIÓN Y PAGO DE CONTRIBUCIONES');
 }
 if(path.includes('/prestacion/')&&res.status===200){
 const summaries=(html.match(/<summary/g)||[]).length;
 pass=pass&&summaries>=5&&html.includes('data-faq-action="open"')&&html.includes('data-faq-action="close"');
 if(path.includes('prestaciones-por-invalidez'))pass=pass&&(html.match(/<table/g)||[]).length===2;
 }
 if(res.status===200)pass=pass&&(html.match(/class="[^"]*tiktok-social pending[^"]*"/g)||[]).length===2;
 if(!pass)failed++;
 results.push({path,status:res.status,expected,pass});
 if(path==='/nuestras_agencias')writeFileSync('/tmp/agencies-render.html',html);
 if(path==='/prestacion/prestaciones-por-invalidez')writeFileSync('/tmp/benefit-faq-render.html',html);
}
const preview=await app.render(new Request('https://localhost/api/preview?type=noticia&documentId=test&secret='+process.env.PREVIEW_SECRET),{addCookieHeader:true});
const signed=preview.status===307 && preview.headers.get('set-cookie')?.includes('preview-signature=');
results.push({path:'preview autorizado: firma de cookie',status:preview.status,expected:307,pass:Boolean(signed)});
if(!signed)failed++;
writeFileSync(new URL('../docs/PRUEBAS_AUTOMATICAS.json',import.meta.url),JSON.stringify(results,null,2));
console.log(JSON.stringify(results,null,2));process.exitCode=failed?1:0;
