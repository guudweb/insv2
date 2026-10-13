// CAMBIO INSESO 2026-10-13 R3: pruebas de orientación, modalidades y conservación de cuantías.
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
const cache=new Map();
function load(file){
 file=path.resolve(file);if(cache.has(file))return cache.get(file).exports;
 if(file.endsWith('.json'))return JSON.parse(fs.readFileSync(file,'utf8'));
 const module={exports:{}};cache.set(file,module);
 const output=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText;
 const require=specifier=>{const resolved=path.resolve(path.dirname(file),specifier);return load(fs.existsSync(resolved)?resolved:resolved+'.ts');};
 new Function('require','module','exports',output)(require,module,module.exports);return module.exports;
}
const root=path.resolve(new URL('..',import.meta.url).pathname);
const {getBenefitQuestions}=load(path.join(root,'src/data/benefit-faq.ts'));
const benefits=JSON.parse(fs.readFileSync(path.join(root,'src/data/benefits.json'),'utf8'));
const results=[];const test=(name,fn)=>{fn();results.push({name,pass:true});};
test('Ocho prestaciones; preguntas y respuestas válidas sin identificadores duplicados',()=>{
 assert.equal(benefits.length,8);
 for(const benefit of benefits){const qs=getBenefitQuestions(benefit.slug);assert(qs.length>=5);assert.equal(new Set(qs.map(q=>q.id)).size,qs.length);assert.match(qs[0].question,/beneficiari|beneficiarse/i);for(const q of qs){assert(q.question.endsWith('?'));assert(q.answers.length);assert(q.answers.every(a=>typeof a==='string'&&a.trim()));}}
});
test('Prestación inexistente, entrada vacía y categoría retirada',()=>{for(const slug of ['','no-existe','prestaciones-medico-farmaceuticas'])assert.deepEqual(getBenefitQuestions(slug),[]);});
test('Invalidez: dos contingencias con tablas y cuantías independientes',()=>{
 const qs=getBenefitQuestions('prestaciones-por-invalidez'),tables=qs.filter(q=>q.table);assert.equal(tables.length,2);
 assert.deepEqual(tables[0].table.map(r=>r.amount),['subsidio del 40% del Salario base durante 3 meses.','subsidio del 40% del Salario base durante 6 meses.','pensión del 40% del Salario base de cotización.','pensión del 80% del Salario base de cotización.']);
 assert.deepEqual(tables[1].table.map(r=>r.amount),['subsidio del 50% del Salario base durante 24 meses.','subsidio del 50% del Salario base durante 48 meses.','pensión del 50% del Salario base de cotización.','pensión del 100% del Salario base de cotización.']);
 assert(qs.some(q=>q.answers.some(a=>a.includes('cinco años'))));assert(qs.some(q=>q.answers.some(a=>a.includes('no deberá demostrar ningún período previo'))));
});
test('Jubilación: documentos diferenciados del sector público y privado',()=>{
 const qs=getBenefitQuestions('pension-por-vejez');const pub=qs.find(q=>q.tag==='Sector público'),priv=qs.find(q=>q.tag==='Sector privado');assert(pub&&priv);assert(pub.answers.some(a=>a.includes('carne')||a.includes('carné militar')));assert(priv.answers.some(a=>a.includes('cesantía')));assert(!priv.answers.some(a=>a.includes('nombramiento')));
});
test('Viudedad: solicitud ordinaria, reversión y cónyuge funcionario',()=>{
 const qs=getBenefitQuestions('viudedad');const rev=qs.find(q=>q.tag==='Viudedad por reversión'),func=qs.find(q=>q.tag==='Cónyuge funcionario');assert(rev);assert(!rev.answers.some(a=>a.includes('nombramiento')));assert.equal(func.answers.length,2);assert(func.answers.every(a=>a.includes('si era funcionario')));
});
test('Orfandad: tres documentos por hijo separados de los del funcionario',()=>{
 const qs=getBenefitQuestions('orfandad');assert.equal(qs.find(q=>q.tag==='Documentación de cada hijo').answers.length,3);assert.equal(qs.find(q=>q.tag==='Sector público').answers.length,2);
});
test('Maternidad: 75 %, asignación con menos de doce meses y duración de pago',()=>{
 const all=getBenefitQuestions('subsidio-por-maternidad');assert(all.some(q=>q.answers.some(a=>a.includes('75%'))));assert(all.find(q=>q.tag==='Cotizaciones inferiores a 12 meses').answers[0].includes('dos mensualidades'));assert(all.some(q=>q.question.includes('Durante cuánto tiempo')));
});
test('Datos no facilitados permanecen pendientes; no se inventan cuantías',()=>{const q=getBenefitQuestions('viudedad').find(q=>q.question.includes('cuantía'));assert(q.answers[0].includes('no está especificado'));});
test('Alias de idioma conserva la prestación y sus modalidades',()=>assert.deepEqual(getBenefitQuestions('disability-benefits'),getBenefitQuestions('prestaciones-por-invalidez')));
fs.writeFileSync(path.join(root,'docs/PRUEBAS_PREGUNTAS.json'),JSON.stringify(results,null,2));console.log(`${results.length} pruebas de preguntas superadas`);
