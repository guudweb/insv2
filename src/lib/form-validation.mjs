// Validación común: el servidor repite las reglas de la interfaz.
import {webForms,FORM_PATTERNS} from '../data/web-forms.mjs';
export const matchesPattern=(pattern,value)=>new RegExp(`^(?:${pattern})$`,'u').test(value);
export function validateInstitutionalForm(input,{today=new Date().toISOString().slice(0,10)}={}){
 const errors={};const fail=(key,message)=>{if(!errors[key])errors[key]=message;};
 if(!input||typeof input!=='object'||Array.isArray(input))return{ok:false,errors:{form:'Solicitud no válida.'}};
 const config=Object.hasOwn(webForms,input.formType)?webForms[input.formType]:null;if(!config)return{ok:false,errors:{form:'Seleccione un formulario válido.'}};
 if(!input.values||typeof input.values!=='object'||Array.isArray(input.values))return{ok:false,errors:{form:'Los campos no son válidos.'}};
 const fields=config.sections.flatMap(s=>s.fields),allowed=new Set(fields.map(f=>f.id)),values={};
 for(const key of Object.keys(input.values))if(!allowed.has(key))fail('form','La solicitud contiene campos no reconocidos.');
 for(const f of fields){const raw=input.values[f.id];
  if(f.readOnly){if(raw!==undefined&&raw!=='')fail(f.id,'Este campo está reservado para INSESO.');continue;}
  if(f.type==='choice'){
   if(f.multiple){if(raw!==undefined&&(!Array.isArray(raw)||raw.length>f.options.length||new Set(raw).size!==raw.length||raw.some(v=>typeof v!=='string'||!f.options.includes(v)))){fail(f.id,'Revise las opciones seleccionadas.');values[f.id]=[];}else values[f.id]=raw||[];}
   else{if(raw!==undefined&&(typeof raw!=='string'||(raw!==''&&!f.options.includes(raw))))fail(f.id,'Seleccione una sola opción válida.');values[f.id]=typeof raw==='string'?raw:'';}
   if(f.required&&(!values[f.id]||values[f.id].length===0))fail(f.id,'Seleccione una opción.');continue;
  }
  if(raw!==undefined&&typeof raw!=='string'){fail(f.id,'El campo debe contener texto.');values[f.id]='';continue;}
  const value=(raw||'').trim();values[f.id]=value;if(!value){if(f.required)fail(f.id,'Este campo es obligatorio.');continue;}
  if(f.type==='date'){
   const date=new Date(value+'T12:00:00Z');if(!/^\d{4}-\d{2}-\d{2}$/.test(value)||!Number.isFinite(date.getTime())||date.toISOString().slice(0,10)!==value)fail(f.id,'Introduzca una fecha válida.');else if(value>today)fail(f.id,'La fecha no puede ser futura.');
  }else if(value.length>f.maxLength||!matchesPattern(f.pattern,value))fail(f.id,f.hint||'Revise el formato del campo.');
 }
 const get=id=>values[id]||'';
 if(input.formType==='empresa'&&get('s2f3')==='Delegación Provincial'&&!get('s2f4'))fail('s2f4','Indique la delegación provincial.');
 if(input.formType==='trabajador'){for(let i=0;i<5;i++){const ids=[`s5f${i*3}`,`s5f${i*3+1}`,`s5f${i*3+2}`];if(ids.some(id=>get(id))){if(!get(ids[0]))fail(ids[0],'Indique el nombre de la empresa.');if(!get(ids[1]))fail(ids[1],'Indique la fecha de alta.');if(get(ids[1])&&get(ids[2])&&get(ids[1])>get(ids[2]))fail(ids[2],'La fecha final debe ser igual o posterior a la inicial.');}}}
 if(input.formType==='prestacion'){
  if(get('s1f0')==='Otros'&&!get('s1f1'))fail('s1f1','Indique la prestación o solicitud.');
  for(let i=0;i<6;i++){const ids=[`s3f${i*3}`,`s3f${i*3+1}`,`s3f${i*3+2}`];if(ids.some(id=>get(id))||(i===0&&get('s1f0')==='Vejez')){for(const id of ids)if(!get(id))fail(id,'Complete empresa y período.');if(get(ids[1])&&get(ids[2])&&get(ids[1])>get(ids[2]))fail(ids[2],'La fecha final debe ser igual o posterior a la inicial.');}}
 }
 if(input.formType==='reembolso'&&Array.isArray(get('s1f0'))&&get('s1f0').includes('Otras')&&!get('s1f1'))fail('s1f1','Indique la otra asistencia.');
 const signature=input.signature;if(!signature||typeof signature!=='object'||!['name','paper'].includes(signature.mode))fail('signature','Seleccione cómo va a firmar.');
 const signatureName=typeof signature?.name==='string'?signature.name.trim():'';
 if(signature?.mode==='name'&&(signatureName.length<2||!matchesPattern(FORM_PATTERNS.name,signatureName)||signature.confirmed!==true))fail('signatureName','Escriba su nombre completo y confirme la firma.');
 const image=signature?.mode==='name'?(signature.image||''):'';
 if(typeof image!=='string'||(image&&!/^data:image\/png;base64,[A-Za-z0-9+/=]+$/.test(image))||image.length>220000)fail('signature','La imagen de firma no es válida o pesa demasiado.');
 if(input.website)fail('form','La solicitud no es válida.');
 return{ok:Object.keys(errors).length===0,errors,data:{formType:input.formType,lang:['es','en','fr','pt'].includes(input.lang)?input.lang:'es',values,signature:{mode:signature?.mode,name:signatureName,confirmed:signature?.confirmed===true,image}}};
}
