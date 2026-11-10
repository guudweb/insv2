// Catálogo de textos incorporados: las claves se actualizan en los cuatro JSON en cada entrega.
import es from './release/es.json' with {type:'json'};
import en from './release/en.json' with {type:'json'};
import fr from './release/fr.json' with {type:'json'};
import pt from './release/pt.json' with {type:'json'};
export const releaseLocales={es,en,fr,pt};
export function localize(text,lang='es',params={}){if(text===undefined||text===null)return '';const value=releaseLocales[lang]?.[text]??text;return String(value).replace(/\{(\w+)\}/g,(match,key)=>Object.hasOwn(params,key)?String(params[key]):match);}
export const createLocalizer=lang=>(text,params)=>localize(text,lang,params);
export const localeCode=lang=>({es:'es-ES',en:'en-GB',fr:'fr-FR',pt:'pt-PT'}[lang]||'es-ES');
