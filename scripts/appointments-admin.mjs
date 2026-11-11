// Acceso exclusivamente local del operador del servidor; no expone una API pública.
import {createAgenda} from '../src/server/appointments.mjs';
const [command,reference]=process.argv.slice(2),agenda=createAgenda();
try{
 if(command==='status'&&reference)console.log(agenda.status(reference)||{error:'Referencia no encontrada'});
 else if(command==='cancel'&&reference)console.log({reference,cancelled:agenda.cancel(reference).changes===1});
 else {console.error('Uso: node --env-file=.env scripts/appointments-admin.mjs status|cancel INSESO-REFERENCIA');process.exitCode=1;}
}finally{agenda.close();}
