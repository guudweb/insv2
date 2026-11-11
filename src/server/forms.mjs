import {createLocalizer} from '../i18n/release.mjs';
import {randomUUID} from 'node:crypto';
import {json,sameOrigin,readJson,clientKey} from './mail.mjs';
import {validateInstitutionalForm} from '../lib/form-validation.mjs';
import {generateFormPdf} from './pdf/form-pdf.mjs';
export function createFormsHandler({clock=()=>new Date(),pdf=generateFormPdf}={}){
 const limits=new Map();return async({request,clientAddress})=>{
  if(!sameOrigin(request))return json({success:false,code:'ORIGIN'},403);if(!request.headers.get('content-type')?.startsWith('application/json'))return json({success:false,code:'CONTENT_TYPE'},415);
  const now=clock(),time=now.getTime(),key=clientKey(request,clientAddress),prior=limits.get(key)||{n:0,at:time};if(time-prior.at>600000){prior.n=0;prior.at=time;}prior.n++;limits.set(key,prior);if(limits.size>5000){for(const[k,v]of limits)if(time-v.at>600000)limits.delete(k);while(limits.size>5000)limits.delete(limits.keys().next().value);}if(prior.n>20)return json({success:false,code:'RATE_LIMIT'},429);
  try{const input=await readJson(request,260000),today=new Intl.DateTimeFormat('en-CA',{timeZone:'Africa/Malabo',year:'numeric',month:'2-digit',day:'2-digit'}).format(now),checked=validateInstitutionalForm(input,{today});if(!checked.ok){const l=createLocalizer(['es','en','fr','pt'].includes(input?.lang)?input.lang:'es');return json({success:false,code:'INVALID_INPUT',errors:Object.fromEntries(Object.entries(checked.errors).map(([key,text])=>[key,l(text)]))},400);}
   const reference='INSESO-F-'+randomUUID().slice(0,18).toUpperCase(),data=checked.data,document=await pdf(data,{reference,now});
   return new Response(document,{headers:{'Content-Type':'application/pdf','Content-Disposition':`inline; filename="${reference}.pdf"`,'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
  }catch(e){return json({success:false,code:e?.status===422?'PRINT_FIELD_TOO_LONG':e?.status===400?'INVALID_INPUT':'UNAVAILABLE'},e?.status||503);}
 };
}
