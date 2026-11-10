// CAMBIO INSESO 2026-10-13: identidad verde y correcciones previas; detalles en docs/CAMBIOS_REVISION_2.md.
/** Capas SVG: fotos y tipografía originales, filtro limitado al panel institucional. */
import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import sharp from 'sharp';
const directory=new URL('../public/images/accueil/',import.meta.url);
for(let i=0;i<=6;i++){
 const name=`slider-0${i}`;const input=readFileSync(new URL(name+'.jpg',directory));
 const {width:w,height:h}=await sharp(input).metadata();
 const source=i===0?[103,20,16]:[98,8,17];
 const matrix=(target)=>{
 const delta=source[0]-source[1];const a=(target[0]-source[1])/delta,b=(target[1]-source[1])/delta,c=(target[2]-source[2])/delta;
 return `${a} ${1-a} 0 0 0 ${b} ${1-b} 0 0 0 ${c} ${-c} 1 0 0 0 0 0 1 0`;
 };
 const x1=w*.69,x2=w*.61,strip=Math.max(3,w*.006);
 const image=`<image width="${w}" height="${h}" href="data:image/jpeg;base64,${input.toString('base64')}"/>`;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}"><defs><clipPath id="panel"><polygon points="0,0 ${x1},0 ${x2},${h} 0,${h}"/></clipPath><clipPath id="diagonal"><polygon points="${x1-strip},0 ${x1},0 ${x2},${h} ${x2-strip},${h}"/></clipPath><filter id="green" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${matrix([23,82,42])}"/></filter><filter id="accent" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="${matrix([37,132,68])}"/></filter></defs>${image}<g clip-path="url(#panel)"><g filter="url(#green)">${image}</g></g><polygon points="${x1-strip},0 ${x1},0 ${x2},${h} ${x2-strip},${h}" fill="#258444"/></svg>`;
 writeFileSync(new URL(name+'-verde.svg',directory),svg);
}
