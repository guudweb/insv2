// CAMBIO INSESO 2026-10-13: identidad verde y correcciones previas; detalles en docs/CAMBIOS_REVISION_2.md.
/** Importación explícita de borradores ES. No publica ni borra registros. */
import {readFileSync,writeFileSync} from 'node:fs';
const benefits=JSON.parse(readFileSync(new URL('../src/data/benefits.json',import.meta.url)));
const drafts=benefits.map((b,i)=>({titulo:b.titulo,slug:b.slug,locale:'es',orden:i+1,activo:true,validado:false,descripcion:b.sections.map(text=>({type:'paragraph',children:[{type:'text',text}]}))}));
writeFileSync(new URL('../docs/BORRADORES_PRESTACIONES.json',import.meta.url),JSON.stringify(drafts,null,2));
console.log(`Preparados ${drafts.length} borradores. Sin cambios en el CMS.`);
if(process.argv.includes('--apply')){
 const url=process.env.STRAPI_URL,token=process.env.STRAPI_API_TOKEN;
 if(!url||!token)throw new Error('Defina STRAPI_URL y STRAPI_API_TOKEN para el CMS de pruebas.');
 for(const data of drafts){
  const res=await fetch(`${url}/api/prestaciones?filters[slug][$eq]=${encodeURIComponent(data.slug)}&locale=es&status=draft`,{headers:{Authorization:`Bearer ${token}`},signal:AbortSignal.timeout(15000)});
  if(!res.ok)throw new Error(`Consulta falló (${res.status}); se detuvo la importación.`);
  const matches=(await res.json()).data;
  if(matches.length>1)throw new Error(`Slug duplicado: ${data.slug}`);
  const id=matches[0]?.documentId;
  const result=await fetch(`${url}/api/prestaciones${id?'/'+id:''}?status=draft&locale=es`,{method:id?'PUT':'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify({data}),signal:AbortSignal.timeout(15000)});
  if(!result.ok)throw new Error(`Escritura de ${data.slug} falló (${result.status}). Revise los borradores anteriores antes de reintentar.`);
  console.log(`${data.slug}: borrador ${id?'actualizado':'creado'}`);
 }
}
