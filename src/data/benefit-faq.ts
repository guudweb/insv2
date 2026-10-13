// CAMBIO INSESO 2026-10-13 R3: preguntas de orientación por prestación y modalidad.
// Respuestas derivadas del documento entregado; no se incorporan cifras ni condiciones nuevas.
import {benefitCatalog,canonicalBenefit} from './benefit-catalog';
export interface BenefitQuestion {id:string;question:string;answers:string[];table?:{grade:string;amount:string}[];tag?:string;}
const questionByHeading:Record<string,string>={
 'Beneficiarias':'¿Quiénes pueden beneficiarse de la prestación por maternidad?',
 'Beneficiarios':'¿Quiénes son los beneficiarios?',
 'Beneficiarios y condiciones':'¿Quiénes pueden beneficiarse de la prestación y qué condiciones deben cumplir?',
 'Período de espera':'¿Cuánto tiempo debo haber cotizado para solicitar la prestación?',
 'Cuantía de la prestación':'¿Cuál es la cuantía de la prestación?',
 'Cuantía de la prestación.':'¿Cuál es la cuantía de la prestación?',
 'Requisitos':'¿Qué requisitos y documentos debo presentar para solicitar la prestación?',
 'Requisitos generales':'¿Qué requisitos generales debo presentar para solicitar la prestación?',
 'Incompatibilidad y prohibición':'¿Con qué situaciones o prestaciones es incompatible?',
 'Forma y lugar de pago':'¿Cómo y dónde se paga la prestación?',
 'Situación de invalidez':'¿Qué situación se considera de invalidez?',
 'Grados de invalidez':'¿Qué grados de invalidez se reconocen?',
 'Situación de incapacidad temporal':'¿Qué situación se considera de incapacidad temporal?',
 'Determinación de los días de reposo':'¿Desde qué día se reconoce la incapacidad temporal y cuál es su duración máxima?',
 'Situación de discapacidad':'¿Qué situación se considera de discapacidad?',
 'Reconocimiento y procedimiento':'¿Cómo se reconoce la discapacidad y cómo puedo solicitar su evaluación?',
 'Contenido de la prestación':'¿Qué ayudas y servicios incluye la prestación por discapacidad?',
 'Período y lugar de pago':'¿Cada cuánto tiempo y dónde se pagan los subsidios?',
 'Datos no especificados en la documentación':'¿Qué información debo confirmar con INSESO antes de solicitar esta prestación?',
 'Edad y período de cotización':'¿Qué edad y cuántos meses de cotización necesito para solicitar la jubilación?',
 'Adquisición del derecho':'¿Desde qué fecha se reconoce el derecho a la pensión?',
 'Requisitos específicos para el sector público':'Soy funcionario o trabajador del sector público, ¿qué documentos debo presentar?',
 'Requisitos específicos para el sector privado':'Soy trabajador del sector privado, ¿qué documentos debo presentar?',
 'Hecho causante':'¿En qué situación se puede solicitar la prestación de gastos de sepelio?',
 'Requisitos comunes de los listados de los sectores público y privado':'¿Qué documentos se solicitan tanto en el sector público como en el privado?',
 'Requisitos adicionales si el causante era funcionario':'Si la persona fallecida era funcionaria, ¿qué documentos adicionales debo presentar?',
 'Requisitos de viudedad':'Solicito viudedad, ¿qué requisitos y documentos debo presentar?',
 'Requisitos de viudedad por reversión':'Solicito viudedad por reversión, ¿qué requisitos y documentos debo presentar?'
};
const pending='Este dato no está especificado en la documentación facilitada. Consulte con la unidad competente del INSESO antes de tramitar su solicitud.';
export function getBenefitQuestions(inputSlug:string):BenefitQuestion[]{
 const slug=canonicalBenefit(inputSlug);
 const benefit=benefitCatalog.find(b=>b.slug===slug);
 if(!benefit)return [];
 const sections:{heading:string;lines:string[]}[]=[];
 for(const text of benefit.sections){
  if(questionByHeading[text])sections.push({heading:text,lines:[]});
  else {if(!sections.length)sections.push({heading:'Información general',lines:[]});sections[sections.length-1].lines.push(text);}
 }
 const questions:Omit<BenefitQuestion,'id'>[]=[];
 for(const section of sections){
  if(slug==='prestaciones-por-invalidez'&&section.heading==='Cuantía de la prestación'){
   const split=section.lines.findIndex(line=>line==='Invalidez derivada de enfermedad profesional o accidente laboral.');
   const common=section.lines.slice(1,split),occupational=section.lines.slice(split+1);
   const rows=(lines:string[])=>lines.map(text=>{const index=text.indexOf(':');return {grade:text.slice(0,index),amount:text.slice(index+1).trim()};});
   questions.push({question:'Mi invalidez deriva de enfermedad común o accidente no laboral, ¿cuál es la cuantía de la prestación?',answers:[section.lines[0]],table:rows(common),tag:'Enfermedad común · accidente no laboral'});
   questions.push({question:'Mi invalidez deriva de enfermedad profesional o accidente laboral, ¿cuál es la cuantía de la prestación?',answers:[section.lines[split]],table:rows(occupational),tag:'Enfermedad profesional · accidente laboral'});
   continue;
  }
  if(slug==='prestaciones-por-invalidez'&&section.heading==='Período de espera'){
   questions.push({question:'Si mi invalidez deriva de enfermedad común o accidente no laboral, ¿cuánto tiempo debo haber cotizado?',answers:[section.lines[0]],tag:'Cotización · contingencias comunes'});
   questions.push({question:'Si mi invalidez deriva de enfermedad profesional o accidente laboral, ¿necesito un período previo de cotización?',answers:[section.lines[1]],tag:'Cotización · contingencias profesionales'});
   continue;
  }
  if(slug==='subsidio-de-incapacidad-temporal'&&section.heading==='Período de espera'){
   questions.push({question:'Si mi incapacidad temporal deriva de enfermedad común o accidente no laboral, ¿cuánto tiempo debo haber cotizado?',answers:[section.lines[0]],tag:'Cotización · contingencias comunes'});
   questions.push({question:'Si mi incapacidad temporal deriva de enfermedad profesional o accidente laboral, ¿necesito un período previo de cotización?',answers:[section.lines[1]],tag:'Cotización · contingencias profesionales'});
   continue;
  }
  if(slug==='subsidio-por-maternidad'&&section.heading==='Cuantía de la prestación'){
   questions.push({question:'¿Cuál es la cuantía de la prestación por maternidad?',answers:[section.lines[0]]});
   questions.push({question:'Si mis cotizaciones no alcanzan los 12 meses inmediatamente anteriores a la maternidad, ¿qué asignación se contempla?',answers:[section.lines[1]],tag:'Cotizaciones inferiores a 12 meses'});
   questions.push({question:'¿Durante cuánto tiempo se abona la prestación por maternidad?',answers:[section.lines[2]]});
   continue;
  }
  if(slug==='orfandad'&&section.heading==='Requisitos'){
   const forChild=section.lines.filter(t=>t.includes('por cada hijo'));
   const forPublic=section.lines.filter(t=>t.includes('si era funcionario'));
   const general=section.lines.filter(t=>!forChild.includes(t)&&!forPublic.includes(t));
   questions.push({question:'¿Qué documentos generales debo presentar para solicitar la prestación por orfandad?',answers:general});
   questions.push({question:'¿Qué documentación debo presentar por cada hijo?',answers:forChild,tag:'Documentación de cada hijo'});
   questions.push({question:'Si la persona fallecida era funcionaria, ¿qué documentación adicional debo presentar?',answers:forPublic,tag:'Sector público'});
   continue;
  }
  if(slug==='gastos-de-sepelio'&&section.heading==='Beneficiarios'){
   questions.push({question:'¿Quién puede solicitar la prestación si ha pagado los gastos de sepelio?',answers:section.lines.slice(0,2)});
   questions.push({question:'Si una entidad pública o privada ha costeado el sepelio, ¿cómo se abonan los gastos?',answers:[section.lines[2]],tag:'Solicitud por una entidad'});
   continue;
  }
  const tag=section.heading.includes('sector público')?'Sector público':section.heading.includes('sector privado')?'Sector privado':section.heading.includes('reversión')?'Viudedad por reversión':section.heading.includes('funcionario')?'Funcionario fallecido':undefined;
  questions.push({question:questionByHeading[section.heading]||'¿Qué información debo conocer sobre esta prestación?',answers:section.lines.length?section.lines:[pending],tag});
 }
 if(slug==='viudedad'){
  const lines=benefit.sections.filter(t=>t.includes('si era funcionario'));
  questions.push({question:'Si mi cónyuge fallecido era funcionario, ¿qué documentos adicionales debo presentar para solicitar viudedad?',answers:lines,tag:'Cónyuge funcionario'});
 }
 if(!questions.some(q=>/beneficiari|beneficiarse/i.test(q.question))) questions.unshift({question:'¿Quiénes son los beneficiarios y qué condiciones deben cumplir?',answers:[pending]});
 if(!questions.some(q=>/dónde.*pag|donde.*pag/i.test(q.question))) questions.push({question:'¿Cómo y dónde se paga la prestación?',answers:[pending]});
 // La orientación empieza por beneficiarios; las modalidades permanecen juntas en el orden del documento.
 const beneficiaries=questions.filter(q=>/beneficiari|beneficiarse/i.test(q.question));
 const rest=questions.filter(q=>!beneficiaries.includes(q));
 return [...beneficiaries,...rest].map((q,index)=>({...q,id:`pregunta-${index+1}`}));
}
