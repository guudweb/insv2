// CAMBIO INSESO 2026-10-13 R2: exactamente las ocho prestaciones del documento de 08/10.
import benefits from './benefits.json';
export const benefitCatalog = benefits.map((b,index)=>({...b,imagen:`/images/prestaciones/catalogo-${index+1}.svg`}));
export const benefitAliases: Record<string,string> = {
 'maternity-allowance':'subsidio-por-maternidad','allocation-de-maternite':'subsidio-por-maternidad','subsidio-de-maternidade':'subsidio-por-maternidad',
 'disability-benefits':'prestaciones-por-invalidez','prestations-dinvalidite':'prestaciones-por-invalidez','prestacoes-por-invalidez':'prestaciones-por-invalidez',
 'temporary-disability-allowance':'subsidio-de-incapacidad-temporal','allocation-dincapacite-temporaire':'subsidio-de-incapacidad-temporal','subsidio-de-incapacidade-temporaria':'subsidio-de-incapacidad-temporal',
 'old-age-pension':'pension-por-vejez','pension-de-retraite':'pension-por-vejez','pensao-por-velhice':'pension-por-vejez'
};
export function canonicalBenefit(slug:string){return benefitAliases[slug]||slug;}
