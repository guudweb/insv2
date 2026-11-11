// CAMBIO INSESO FINAL: proceso continuo con reintentos sin solaparse; también admite ejecución puntual.
import {createAgenda} from '../src/server/appointments.mjs';
const daemon=process.argv.includes('--daemon'),agenda=createAgenda();
let stopping=false,timer,releaseWait;
function stop(){stopping=true;if(timer)clearTimeout(timer);releaseWait?.();}
process.on('SIGINT',stop);process.on('SIGTERM',stop);
async function tick(){try{console.log(await agenda.deliver(50));console.log({purged:agenda.cleanup(90)});}catch{console.error('No se pudo procesar la cola de correo. Se conservan los mensajes pendientes.');if(!daemon)process.exitCode=1;}}
try{do{await tick();if(!daemon||stopping)break;await new Promise(resolve=>{releaseWait=resolve;timer=setTimeout(resolve,60000);});releaseWait=undefined;}while(!stopping);}finally{agenda.close();}
