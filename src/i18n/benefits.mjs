import es from './benefits/es.json' with {type:'json'};
import en from './benefits/en.json' with {type:'json'};
import fr from './benefits/fr.json' with {type:'json'};
import pt from './benefits/pt.json' with {type:'json'};
export const benefitLocales={es,en,fr,pt};
export const translateBenefitText=(text,lang='es')=>benefitLocales[lang]?.[text]??text;
export function translateBenefit(value,lang='es'){
 if(typeof value==='string')return translateBenefitText(value,lang);
 if(Array.isArray(value))return value.map(item=>translateBenefit(item,lang));
 if(value&&typeof value==='object')return Object.fromEntries(Object.entries(value).map(([key,item])=>[key,['slug','group','imagen'].includes(key)?item:translateBenefit(item,lang)]));
 return value;
}
