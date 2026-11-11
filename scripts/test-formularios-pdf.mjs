import assert from 'node:assert/strict';
import {readFile,writeFile} from 'node:fs/promises';
import {PDFDocument} from 'pdf-lib';
import {webForms} from '../src/data/web-forms.mjs';
import {validateInstitutionalForm} from '../src/lib/form-validation.mjs';
import {generateFormPdf} from '../src/server/pdf/form-pdf.mjs';
const samples={empresa:{s0f1:'Modificación de nombre',s0f2:'Privada',s1f0:'Terciario',s2f3:'Delegación Provincial',s2f4:'Bata'},trabajador:{s0f4:'DIP',s3f0:['Trabajador/a','Pensionista']},prestacion:{s1f0:'Otros'},reembolso:{s1f0:['Consulta especializada','Otras'],s3f3:'Bata'}};
for(const [formType,form] of Object.entries(webForms)){
 const values={};
 for(const field of form.sections.flatMap(s=>s.fields)){
  if(field.readOnly)continue;
  values[field.id]=field.options?(field.multiple?field.options.slice(0,2):field.options[0]):field.type==='date'?'2021-02-15':field.inputType==='time'?'08:15':field.inputMode==='numeric'?'42':field.inputType==='tel'||field.inputMode==='decimal'?'222123456':field.pattern?.includes('{5,39}')?'123456789':'Ángela Prueba';
 }
 if(formType==='empresa')values.s4f10='prueba@example.org';
 Object.assign(values,samples[formType]);
 const input={formType,values,signature:{mode:'name',name:'Firma de Prueba',confirmed:true}};
 const checked=validateInstitutionalForm(input);assert(checked.ok,JSON.stringify(checked.errors));
 assert(!validateInstitutionalForm({...input,values:{}}).ok);
 const bytes=await generateFormPdf(checked.data),doc=await PDFDocument.load(bytes);
 const original=await PDFDocument.load(await readFile(new URL(`../src/server/pdf/templates/${formType}.pdf`,import.meta.url)));
 assert.deepEqual(doc.getPages().map(p=>p.getSize()),original.getPages().map(p=>p.getSize()));
 assert(await readFile(new URL('../public'+form.source,import.meta.url)));
 if(process.env.PRINT_SAMPLES_DIR)await writeFile(process.env.PRINT_SAMPLES_DIR+'/'+formType+'.pdf',bytes);
}
console.log('Cuatro modelos originales: campos obligatorios, correspondencia de campos y tamaño de página comprobados.');
