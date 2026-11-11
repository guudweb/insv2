// CAMBIO INSESO 2026-10-13: identidad verde y correcciones previas; detalles en docs/CAMBIOS_REVISION_2.md.
import {readFileSync,writeFileSync} from 'node:fs';
import sharp from 'sharp';
const dir=new URL('../public/images/',import.meta.url);
const data=name=>readFileSync(new URL(name,dir)).toString('base64');
const mark=`<svg x="70" y="0" width="80" height="80" viewBox="0 0 158 147"><defs><clipPath id="outline"><ellipse cx="77" cy="65" rx="64" ry="63"/><polygon points="27,113 127,113 119,135 86,147 67,147 34,133"/></clipPath></defs><image width="158" height="147" clip-path="url(#outline)" href="data:image/png;base64,${data('logo-institucional.png')}"/></svg>`;
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="150" height="80" viewBox="0 0 150 80"><svg width="70" height="80" viewBox="0 0 70 80"><image href="data:image/png;base64,${data('logo.png')}" width="150" height="80"/></svg>${mark}</svg>`;
writeFileSync(new URL('logo-institucional.svg',dir),svg);
await sharp(Buffer.from(svg)).png().toFile(new URL('logo-nuevo.png',dir).pathname);
const footer=`<svg xmlns="http://www.w3.org/2000/svg" width="343" height="183" viewBox="0 0 343 183"><svg width="160" height="183" viewBox="0 0 160 183"><image width="343" height="183" href="data:image/png;base64,${data('img_footer_01.png')}"/></svg>${mark.replace('x="70"','x="165"').replace('width="80" height="80"','width="178" height="183"')}</svg>`;
await sharp(Buffer.from(footer)).png().toFile(new URL('footer-nuevo.png',dir).pathname);
await sharp(new URL('logo-institucional.png',dir).pathname).resize(76,76,{fit:'contain',background:'#ffffff'}).png().toFile(new URL('favicon-nuevo.png',dir).pathname);
await sharp({create:{width:1200,height:630,channels:4,background:'#ffffff'}}).composite([{input:await sharp(Buffer.from(svg)).resize(900,480).png().toBuffer(),gravity:'centre'}]).png().toFile(new URL('logo_01.png',dir).pathname);
