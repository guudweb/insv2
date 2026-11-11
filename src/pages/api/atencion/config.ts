// CAMBIO INSESO FINAL: solo publica oficinas activadas para cada trámite.
import {productionAgenda} from '../../../server/appointments.mjs';
import {json} from '../../../server/mail.mjs';
export const prerender=false;
export const GET=({url})=>json(productionAgenda().metadata(['es','en','fr','pt'].includes(url.searchParams.get('lang'))?url.searchParams.get('lang'):'es'));
