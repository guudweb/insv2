import {productionAgenda,BookingError} from '../../../server/appointments.mjs';
import {json} from '../../../server/mail.mjs';
export const prerender=false;
export const GET=({url})=>{try{return json({slots:productionAgenda().slots(url.searchParams.get('service'),url.searchParams.get('office'),url.searchParams.get('date'))});}catch(e){return json({code:e instanceof BookingError?e.code:'UNAVAILABLE'},e instanceof BookingError?e.status:503);}};
