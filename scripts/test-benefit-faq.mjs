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
test('Once prestaciones y cuatro de muerte y supervivencia',()=>{assert.equal(benefits.length,11);assert.equal(benefits.filter(b=>b.group==='muerte-supervivencia').length,4);});
test('Preguntas con identificadores únicos y respuestas o tablas',()=>{for(const b of benefits){const qs=getBenefitQuestions(b.slug);assert(qs.length>=4);assert.equal(new Set(qs.map(q=>q.id)).size,qs.length);for(const q of qs){assert(q.question.endsWith('?'));assert(q.answers.length||q.dataTable?.rows.length);}}});
test('Entradas inexistentes no producen fichas',()=>{for(const slug of ['', 'no-existe','prestaciones-medico-farmaceuticas'])assert.deepEqual(getBenefitQuestions(slug),[]);});
test('Invalidez mantiene ocho cuantías y ambas contingencias',()=>{const qs=getBenefitQuestions('prestaciones-por-invalidez');const tables=qs.filter(q=>q.dataTable);assert.equal(tables.length,2);assert.equal(tables.reduce((n,q)=>n+q.dataTable.rows.length,0),8);assert(tables[1].dataTable.rows.some(r=>r[1].includes('100%')));});
test('Sector público, privado y reversión conservan documentación diferenciada',()=>{const qs=getBenefitQuestions('pension-por-vejez');assert(qs.some(q=>q.question.includes('sector público')&&q.answers.some(a=>a.includes('nombramiento'))));assert(qs.some(q=>q.question.includes('sector privado')&&q.answers.some(a=>a.includes('cesantía'))));assert(getBenefitQuestions('viudedad').some(q=>q.question.includes('reversión')));});
test('Incapacidad temporal y sepelio son de pago único',()=>{for(const slug of ['subsidio-de-incapacidad-temporal','gastos-de-sepelio'])assert(getBenefitQuestions(slug).some(q=>q.answers.some(a=>a.includes('pago único'))));});
test('Orfandad distingue los documentos por hijo y del funcionario',()=>{const qs=getBenefitQuestions('orfandad');assert.equal(qs.find(q=>q.question.includes('por cada hijo')).answers.length,3);assert(qs.some(q=>q.question.includes('funcionaria')));});
test('Alias de idioma conserva la ficha',()=>assert.deepEqual(getBenefitQuestions('disability-benefits'),getBenefitQuestions('prestaciones-por-invalidez')));
fs.writeFileSync(path.join(root,'docs/PRUEBAS_PREGUNTAS.json'),JSON.stringify(results,null,2));console.log(`${results.length} pruebas de preguntas superadas`);
