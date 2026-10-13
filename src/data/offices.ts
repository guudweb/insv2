// CAMBIO INSESO 2026-10-13 R3: fotografía de Santa María identificada por el acto y la ubicación del 09/01/2025.
// CAMBIO INSESO 2026-10-13 R2: correo común; fotos por oficina y días de atención explícitos.
import type { Locale } from '../i18n/utils';
const names = {"es": ["Sede central actual de la DN", "Extensión de la sede central actual de la DN", "Próxima sede central de la DN", "Delegación Regional", "No facilitado", "Apertura pendiente"], "fr": ["Siège national actuel", "Extension du siège national actuel", "Prochain siège national", "Délégation régionale", "Non communiqué", "Ouverture à confirmer"], "en": ["Current national headquarters", "Extension of the current national headquarters", "Future national headquarters", "Regional delegation", "Not provided", "Opening to be confirmed"], "pt": ["Sede nacional atual", "Extensão da sede nacional atual", "Próxima sede nacional", "Delegação regional", "Não fornecido", "Abertura a confirmar"]};
export function getOffices(lang: Locale) {
 const n = names[lang];
 const office = (nombre: string, direccion = '', future = false) => ({nombre, direccion: direccion || n[4], telefono: '', email: 'info@inseso.org', horario: '08:00 – 16:00', future, imagen: '', photoCredit:'', photoSource:'', photoCaption:''});
 return [
 {ciudad:'Malabo',region:lang==='es'?'Región Insular':'',imagen:'/images/inseso-sede.webp',localidades:[office(n[0],'Avenida de la Independencia'),{...office(n[1],'Santa María 2'),imagen:'/images/agencias/santa-maria-exterior.jpg',photoCredit:'La Gaceta de Guinea Ecuatorial',photoSource:'https://lagdeguinea.com/manuel-osa-nsue-preside-el-primer-consejo-de-administracion-de-inseso-con-acciones-clave-para-mejorar-los-hospitales-y-servicios-sanitarios/',photoCaption:'Instalaciones de Santa María 2 · acto de enero de 2025'},{...office(n[2],'Malabo II',true),imagen:'/images/inseso-sede.webp'}]},
 ...['Bata','Mongomo','Evinayong','Ebebiyín','Annobón','Luba','Oyala'].map(ciudad=>({ciudad,region:'',imagen:'',localidades:[{...office(n[3],ciudad==='Bata'?'Unidad Africana':ciudad==='Mongomo'?'Kie-Osie':''),imagen:ciudad==='Mongomo'?'/images/03.jpg':ciudad==='Evinayong'?'/images/evina.png':''}]}))];
}
