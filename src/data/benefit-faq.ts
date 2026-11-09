// CAMBIO INSESO R4 2026-10-15: contenido completo del documento, con preguntas por modalidad.
import {getBenefitCatalog,canonicalBenefit} from './benefit-catalog';
export interface BenefitQuestion {id:string;question:string;answers:string[];documentGroups?:{title:string;items:string[]}[];dataTable?:{headers:string[];rows:string[][]};}
export function getBenefitQuestions(slug:string,lang='es'):BenefitQuestion[]{
 const benefit=getBenefitCatalog(lang).find(b=>b.slug===canonicalBenefit(slug));
 return (benefit?.questions||[]).map((q,i)=>({...q,id:`pregunta-${i+1}`}));
}
