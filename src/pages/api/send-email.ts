// CAMBIO WEB_INSESO 28/10: validación y envío centralizados; destinatario inicial flora.bula@inseso.org.
import {createContactHandler} from '../../server/contact.mjs';
export const prerender=false;
export const POST=createContactHandler();
