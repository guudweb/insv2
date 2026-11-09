// CAMBIO WEB_INSESO: delegaciones y direcciones facilitadas.
import {createLocalizer} from '../i18n/release.mjs';
import type { Locale } from '../i18n/utils';
export function getOffices(lang: Locale) {
 const l=createLocalizer(lang);
 const office=(nombre:string,direccion:string,imagen='',future=false)=>({nombre:l(nombre),direccion:l(direccion),imagen,future,telefono:'',email:'info@inseso.org',horario:future?'---':'08:00 – 16:00',photoCredit:'',photoSource:'',photoCaption:''});
 return [
 {ciudad:'Malabo',region:'',localidades:[office('Delegación Nacional · sede central','Avenida de la Independencia','/images/agencias/delegacion-nacional.jpeg'),office('Delegación Nacional · Santa María 2','Santa María 2','/images/agencias/santa-maria-exterior.jpg'),office('Delegación Nacional · Malabo II','Malabo II','/images/agencias/malabo2.jpg',true)]},
 {ciudad:'Bata',region:'',localidades:[office('Delegación Regional','Unidad Africana','/images/agencias/bata.jpg')]},
 {ciudad:'Mongomo',region:'',localidades:[office('Delegación Provincial','Kie-Osie','/images/03.jpg')]},
 {ciudad:'Evinayong',region:'',localidades:[office('Delegación Provincial','Barrio Servicio','/images/evina.webp')]},
 {ciudad:'Ebibeyín',region:'',localidades:[office('Delegación Provincial','Barrio Eson, frente al Hospital Provincial de Jesús Alfonso Oyono de Ebibeyín','/images/agencias/ebibeyin.jpg')]},
 {ciudad:'Annobón',region:'',localidades:[office('Delegación Provincial','Frente al Cuartel Militar, carretera del aeropuerto')]},
 {ciudad:'Luba',region:'',localidades:[office('Delegación Provincial','Frente del Mercado de Luba','/images/agencias/luba.jpg')]},
 {ciudad:'Oyala',region:'',localidades:[office('Delegación Provincial','Carretera Oyala Añisok, al lado del Complejo Candy Vista Lago')]}
 ];
}
