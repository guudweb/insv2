// CAMBIO INSESO R4 2026-10-15: once prestaciones del documento actualizado.
import {translateBenefit} from '../i18n/benefits.mjs';
import benefits from './benefits.json';
// CAMBIO INSESO FINAL: imágenes relacionadas con cada una de las once prestaciones.
const photos=['prestaciones_detail_03.jpg','prestaciones_detail_04.jpg','prestaciones_detail_02.jpg','prestaciones_img_04.jpg','prestaciones_img_05.jpg','prestaciones_img_08.jpg','prestaciones_img_01.jpg','prestaciones_img_06.jpg','prestaciones_detail_06_0.jpg','prestaciones_img_03.jpg','prestaciones_img_09.jpg'];
export const benefitCatalog = benefits.map((b,index)=>({...b,imagen:`/images/prestaciones/${photos[index]}`}));

export const benefitAliases: Record<string,string> = {
 'maternity-allowance':'subsidio-por-maternidad','allocation-de-maternite':'subsidio-por-maternidad','subsidio-de-maternidade':'subsidio-por-maternidad',
 'disability-benefits':'prestaciones-por-invalidez','prestations-dinvalidite':'prestaciones-por-invalidez','prestacoes-por-invalidez':'prestaciones-por-invalidez',
 'temporary-disability-allowance':'subsidio-de-incapacidad-temporal','allocation-dincapacite-temporaire':'subsidio-de-incapacidad-temporal','subsidio-de-incapacidade-temporaria':'subsidio-de-incapacidad-temporal',
 'old-age-pension':'pension-por-vejez','pension-de-retraite':'pension-por-vejez','pensao-por-velhice':'pension-por-vejez'
};
export function canonicalBenefit(slug:string){return benefitAliases[slug]||slug;}

// Misma información y mismos identificadores, con textos del idioma elegido.
export function getBenefitCatalog(lang='es'){return benefitCatalog.map(benefit=>translateBenefit(benefit,lang));}
