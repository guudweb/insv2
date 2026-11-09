// CAMBIO WEB_INSESO: documentos originales, exclusivamente mediante descarga.
import seguridad from '../../../assets/normativas/seguridad-social.pdf?url&inline';
import entidades from '../../../assets/normativas/entidades-autonomas-y-empresas-publicas.pdf?url&inline';
export const prerender=false;
const documents={'seguridad-social':{data:seguridad,name:'Seguridad_Social.pdf'},'entidades-autonomas-y-empresas-publicas':{data:entidades,name:'Ley_Reguladora_Entidades_Autonomas_y_Empresas_Publicas.pdf'}};
export const GET=({params})=>{const document=Object.hasOwn(documents,params.documento)?documents[params.documento]:null;if(!document)return new Response('Not found',{status:404});const bytes=Buffer.from(document.data.split(',')[1],'base64');return new Response(bytes,{headers:{'Content-Type':'application/pdf','Content-Disposition':`attachment; filename="${document.name}"`,'Content-Length':String(bytes.length),'X-Content-Type-Options':'nosniff','Cache-Control':'public, max-age=3600'}});};
