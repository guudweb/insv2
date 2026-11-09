// CAMBIO INSESO FINAL: validación en servidor, límites, reserva única y envío institucional + justificante.
import {productionAgenda,BookingError} from '../../../server/appointments.mjs';
import {json,sameOrigin,readJson,clientKey} from '../../../server/mail.mjs';
export const prerender=false;
const limits=new Map();
export const POST=async({request,clientAddress})=>{
 if(!sameOrigin(request))return json({code:'ORIGIN'},403);
 if(!request.headers.get('content-type')?.startsWith('application/json'))return json({code:'INVALID_INPUT'},415);
 const now=Date.now(),key=clientKey(request,clientAddress),prior=limits.get(key)||{n:0,at:now};if(now-prior.at>600000){prior.n=0;prior.at=now;}prior.n++;limits.set(key,prior);if(limits.size>5000){for(const[k,v]of limits)if(now-v.at>600000)limits.delete(k);while(limits.size>5000)limits.delete(limits.keys().next().value);}if(prior.n>15)return json({code:'RATE_LIMIT'},429);
 try{const input=await readJson(request,4096);const agenda=productionAgenda();const booking=agenda.reserve(input);try{await agenda.deliver(2);}catch{}return json({...agenda.status(booking.reference),success:true},201);}catch(e){return json({code:e instanceof BookingError?e.code:e instanceof SyntaxError?'INVALID_INPUT':'UNAVAILABLE'},e instanceof BookingError?e.status:e?.status||503);}
};
