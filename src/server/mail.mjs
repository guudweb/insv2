// CAMBIO INSESO FINAL: configuración SMTP solo en el servidor y destinatario institucional único.
import nodemailer from 'nodemailer';
import {isIP} from 'node:net';
export function missingMailSettings(env=process.env){return ['SMTP_HOST','SMTP_FROM','SMTP_USER','SMTP_PASS'].filter(key=>typeof env[key]!=='string'||!env[key].trim());}
export function mailReady(env=process.env){return missingMailSettings(env).length===0;}
export function safeSmtpCode(error){return ['EAUTH','ECONNECTION','ETIMEDOUT','ESOCKET','EDNS','ETLS','EENVELOPE','EMESSAGE','ECONNREFUSED','ENOTFOUND','CERT_HAS_EXPIRED','DEPTH_ZERO_SELF_SIGNED_CERT','SMTP_NOT_CONFIGURED','SMTP_PORT_INVALID','SMTP_REJECTED'].includes(error?.code||error?.message)?(error.code||error.message):'SMTP_ERROR';}
export function smtpTransport(env=process.env){
 if(!mailReady(env))throw new Error('SMTP_NOT_CONFIGURED');
 const port=Number(env.SMTP_PORT||587);
 if(![465,587,2525].includes(port))throw new Error('SMTP_PORT_INVALID');
 return nodemailer.createTransport({host:env.SMTP_HOST,port,secure:port===465,requireTLS:port!==465,auth:{user:env.SMTP_USER,pass:env.SMTP_PASS},connectionTimeout:10000,greetingTimeout:10000,socketTimeout:20000});
}
export function mailSender(env=process.env){
 const transporter=smtpTransport(env);
 return async message=>{try{const result=await transporter.sendMail({from:env.SMTP_FROM,...message,disableFileAccess:true,disableUrlAccess:true});if(!result.accepted?.length||result.rejected?.length)throw new Error('SMTP_REJECTED');return result;}catch(error){console.error('[INSESO SMTP]',safeSmtpCode(error));throw error;}};
}
export function sameOrigin(request){const origin=request.headers.get('origin');if(!origin)return true;const allowed=process.env.SITE_ORIGIN||new URL(request.url).origin;return origin===allowed;}
export function json(data,status=200){return new Response(JSON.stringify(data),{status,headers:{'Content-Type':'application/json','Cache-Control':'no-store'}});}
// Lectura acotada, también cuando la petición llega sin Content-Length.
export async function readJson(request,maxBytes){const reader=request.body?.getReader();if(!reader)throw Object.assign(new Error('INVALID_INPUT'),{status:400});let total=0;const chunks=[];try{while(true){const{done,value}=await reader.read();if(done)break;total+=value.byteLength;if(total>maxBytes){await reader.cancel();throw Object.assign(new Error('TOO_LARGE'),{status:413});}chunks.push(value);}}finally{reader.releaseLock();}try{return JSON.parse(Buffer.concat(chunks).toString('utf8'));}catch{throw Object.assign(new Error('INVALID_INPUT'),{status:400});}}

// Confiar en X-Real-IP solo detrás del proxy local configurado explícitamente.
export function clientKey(request,address=''){if(process.env.TRUST_PROXY_IP==='true'&&['127.0.0.1','::1','::ffff:127.0.0.1'].includes(address)){const ip=request.headers.get('x-real-ip')||'';if(isIP(ip))return ip;}return address||'unknown';}
