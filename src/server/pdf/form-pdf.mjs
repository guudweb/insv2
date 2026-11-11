// Los valores se superponen al original, en coordenadas de las pruebas de 800 px.
import {readFile} from 'node:fs/promises';
import {PDFDocument,rgb} from 'pdf-lib';
import fontkit from '@pdf-lib/fontkit';
import {regularFont} from './font-data.mjs';
import {webForms} from '../../data/web-forms.mjs';

export async function generateFormPdf(data,{templateBytes,now=new Date()}={}){
 const type=data.formType,doc=await PDFDocument.load(templateBytes??await readFile(new URL(`./templates/${type}.pdf`,import.meta.url)));doc.registerFontkit(fontkit);
 const font=await doc.embedFont(Buffer.from(regularFont,'base64'),{subset:true}),color=rgb(.06,.15,.24),config=webForms[type];doc.setTitle(config.title);doc.setModificationDate(now);
 const rendered=new Set();
 let page,scaleX,scaleY;
 const use=(i=0)=>{page=doc.getPage(i);scaleX=page.getWidth()/(['empresa','trabajador'].includes(type)?566:619);scaleY=page.getHeight()/800;};use();
 function put(value,x,y,width,size=10){
  if(!value)return;const s=Math.min(size,width*scaleX/font.widthOfTextAtSize(value,1)/scaleY);
  if(s<6)throw Object.assign(new Error('PRINT_FIELD_TOO_LONG'),{status:422});
  page.drawText(value,{x:x*scaleX,y:(800-y)*scaleY,size:s*scaleY,font,color});
 }
 const get=(s,f)=>{const id=`s${s}f${f}`;rendered.add(id);return data.values[id];};
 const date=v=>/^\d{4}-\d\d-\d\d$/.test(v??'')?v.split('-').reverse().join('/'):v;
 const row=(s,f,x,y,w,size)=>{const v=date(get(s,f));put(type==='trabajador'?v?.toUpperCase():v,x,y,w,size);};
 const check=(s,f,coords)=>{const selected=[get(s,f)].flat();config.sections[s].fields[f].options.forEach((option,i)=>{if(selected.includes(option)){const [x,y]=coords[i];put('X',x,y,14,8);}});};
 const sig=async(x,y,w,h)=>{
  if(data.signature.mode!=='name')return;
  if(data.signature.image){const png=await doc.embedPng(Buffer.from(data.signature.image.split(',')[1],'base64'));const ratio=Math.min(w*scaleX/png.width,h*scaleY/png.height);page.drawImage(png,{x:x*scaleX,y:(800-y+3)*scaleY,width:png.width*ratio,height:png.height*ratio});}
  put(data.signature.name,x,y+8,w,8);
 };
 const dates=(s,f,xs,y)=>{const v=date(get(s,f));if(v)v.split('/').forEach((part,i)=>put(part,xs[i],y,i===2?25:14,8));};
 if(type==='empresa'){
  row(0,0,175,129,365);check(0,1,[[176,144],[279,144]]);check(0,2,[[176,163],[271,163],[351,163],[406,163],[474,163]]);
  check(1,0,[[177,215],[271,215],[379,215]]);[234,253,272,290].forEach((y,i)=>row(1,i+1,175,y,365));check(1,5,[[178,308],[216,308],[252,308],[294,308],[359,308],[466,308]]);row(1,6,175,328,365);
  [366,385,403].forEach((y,i)=>row(2,i,175,y,365));check(2,3,[[176,422],[299,422],[383,422]]);row(2,4,482,419,61,9);
  [459,478,497].forEach((y,i)=>row(3,i,175,y,365));
  [534,553,571,590,609,628].forEach((y,i)=>row(4,i,175,y,365));check(4,6,[[190,645],[287,645],[387,645]]);[665,684,709].forEach((y,i)=>row(4,i+7,175,y,365));
  use(1);row(4,10,175,67,365);await sig(175,115,300,25);
 }else if(type==='trabajador'){
  row(0,0,126,204,262);row(0,1,133,227,255);dates(0,2,[202,263,328],249);row(0,3,184,273,200);check(0,4,[[171,296],[261,296],[347,296]]);
  [[172,319,86],[320,319,70],[108,342,159],[295,342,92],[174,365,213],[188,388,200]].forEach(([x,y,w],i)=>row(0,i+5,x,y,w));
  [[210,426],[159,441],[219,457]].forEach(([x,y],i)=>row(1,i,x,y,386-x));
  [[139,496],[175,519],[118,542]].forEach(([x,y],i)=>row(2,i,x,y,390-x));
  check(3,0,[[151,590],[241,590],[352,591]]);[[294,620,94],[216,664,172],[216,687,172],[251,713,137]].forEach(([x,y,w],i)=>row(3,i+1,x,y,w));
  use(1);[184,167,178,141,175,118].forEach((x,i)=>row(4,i,x,118+i*23,387-x));
  [347,406,472,533,586].forEach((y,i)=>[85,192,292].forEach((x,j)=>row(5,i*3+j,x,y,96)));
  row(5,15,83,648,111);dates(5,16,[207,241,267],648);await sig(258,667,132,12);
 }else if(type==='prestacion'){
  row(0,0,188,114,305);row(0,1,155,146,205);row(0,2,388,147,101);
  check(1,0,[[103,228],[201,229],[292,230],[410,231],[103,259],[201,261],[292,262],[410,263],[102,290],[201,292],[291,294],[410,294],[102,324],[291,325]]);row(1,1,336,322,171);
  row(2,0,185,390,306);row(2,1,152,423,207);row(2,2,384,426,104);
  [510,532,554,577,598,620].forEach((y,i)=>[[124,204],[345,58],[417,59]].forEach(([x,w],j)=>row(3,i*3+j,x,y,w,9)));
  const place=get(4,0);if(place){page.drawRectangle({x:235*scaleX,y:(800-701)*scaleY,width:33*scaleX,height:10*scaleY,color:rgb(1,1,1)});put(place,144,699,122,9);}const d=date(get(4,1));if(d){const [day,month,year]=d.split('/');put(day,269,699,15,8);put(month,298,699,40,8);put(year.slice(2),354,699,14,8);}await sig(230,740,164,16);
 }else if(type==='reembolso'){
  [[161,197,185],[464,201,90],[161,216,185],[464,223,90],[161,238,185],[464,242,90]].forEach(([x,y,w],i)=>row(0,i,x,y,w));
  check(1,0,[[55,282],[55,298],[55,314],[55,330],[310,284],[310,301],[310,317],[310,333]]);row(1,1,363,333,190);row(1,2,302,350,248);
  check(2,0,[[54,395],[54,419],[54,438],[54,453],[54,474],[54,490],[54,517]]);
  row(3,0,350,556,162);dates(3,1,[186,215,240],568);row(3,2,272,568,60);row(3,3,199,595,38);
  const d=date(get(3,4));if(d){const [day,month,year]=d.split('/');put(day,253,596,38,8);put(month,320,596,36,8);if(year.startsWith('202'))put(year.slice(3),401,596,12,8);else{page.drawRectangle({x:383*scaleX,y:(800-599)*scaleY,width:29*scaleX,height:11*scaleY,color:rgb(1,1,1)});put(year,383,596,28,8);}}
  await sig(236,630,164,16);
 }
 for(const [id,value] of Object.entries(data.values))if(value?.length&&!rendered.has(id))throw new Error('UNMAPPED_PRINT_FIELD');
 return doc.save();
}
