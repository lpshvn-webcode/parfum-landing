import { readFile, writeFile, mkdir } from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const read=file=>readFile(new URL(file,root),'utf8');
const [html,css,js,urlsRaw]=await Promise.all(['noir.html','noir.css','noir.js','scripts/tilda-urls.json'].map(read));
const urls=JSON.parse(urlsRaw);
const used=new Set();
const url=file=>{const value=urls[file];if(!value)throw new Error(`No Tilda URL for ${file}`);used.add(file);return value;};
const fragment=html.split('<!-- KP:START -->')[1].split('<!-- KP:END -->')[0].trim();
const swapAssets=text=>text
  .replace(/\.\/assets\/(?:certs\/)?([a-z0-9-]+\.webp)/g,(_,file)=>url(file))
  .replace(/image:'([a-z0-9-]+)\.png'/g,(_,stem)=>`image:'${url(stem+'.webp')}'`);
const styles=css.replace(/@font-face\{[^}]*\}\n?/g,'').replace('Killer,Arial,sans-serif','Manrope,Arial,sans-serif');
const body=swapAssets(fragment);
const script=swapAssets(js).replace('new URLSearchParams(location.search)',"new URLSearchParams('')").replace('`./assets/catalog/${item.image}`','item.image');
const forbidden=(body+script+styles).match(/location|replace|redirect|window\.open|http-equiv/gi);
if(forbidden)throw new Error(`Redirect-like keywords left: ${[...new Set(forbidden)].join(', ')}`);
const leftovers=(body+script+styles).match(/\.\/assets\/[^'")\s]*/g);
if(leftovers)throw new Error(`Unresolved local assets: ${[...new Set(leftovers)].join(', ')}`);
const unused=Object.keys(urls).filter(file=>!used.has(file));
if(unused.length)throw new Error(`Unused Tilda URLs: ${unused.join(', ')}`);
const fonts='<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600&amp;display=swap" rel="stylesheet">';
const output=`<!-- KILLER PERFUME / Tilda T123. Insert the whole file into one HTML block (T123), full width, no padding. -->\n${fonts}\n<style>\n${styles}\n</style>\n${body}\n<script>\n${script}\n</script>\n`;
await mkdir(new URL('tilda/',root),{recursive:true});
await writeFile(new URL('tilda/killer-perfume-t123.html',root),output);
console.log(`Built tilda/killer-perfume-t123.html (${Math.round(output.length/1024)} KB, ${used.size} Tilda images)`);
