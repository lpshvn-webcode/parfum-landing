import { readFile, mkdir, writeFile, copyFile } from 'node:fs/promises';
const root=new URL('../',import.meta.url);
const [html,css,js]=await Promise.all(['noir.html','noir.css','noir.js'].map(file=>readFile(new URL(file,root),'utf8')));
const fragment=html.split('<!-- KP:START -->')[1].split('<!-- KP:END -->')[0].trim();
const assets=['campaign.webp','imagination.webp','tygar.webp','hedonistic.webp','absolu.webp','pheramone.webp','manrope-400.ttf','manrope-600.ttf'];
await mkdir(new URL('dist/assets/',root),{recursive:true});
const inlineAssets=new Map();
for(const file of assets){
  const data=await readFile(new URL(`assets/${file}`,root));
  inlineAssets.set(`./assets/${file}`,`data:${file.endsWith('.webp')?'image/webp':'font/ttf'};base64,${data.toString('base64')}`);
  await copyFile(new URL(`assets/${file}`,root),new URL(`dist/assets/${file}`,root));
}
await copyFile(new URL('assets/manrope-OFL.txt',root),new URL('dist/assets/manrope-OFL.txt',root));
const inline=(text)=>{for(const [from,to]of inlineAssets)text=text.replaceAll(from,to);return text;};
const assetBase=process.env.ASSET_BASE;
if(assetBase && !/^https:\/\/[a-zA-Z0-9.-]+(?:\/[a-zA-Z0-9_./-]*)?$/.test(assetBase))throw new Error('ASSET_BASE must be a plain HTTPS asset directory URL');
const external=(text)=>assetBase?text.replaceAll('./assets/',assetBase.replace(/\/$/,'')+'/'):text;
for(const offer of ['10','5']) {
  const contents=`<!-- KILLER PERFUME / Tilda T123 / DEMO: set ASSET_BASE, connect lead receiver and replace demo catalog before launch -->\n<style>\n${css}\n</style>\n${fragment.replace('data-offer="10"',`data-offer="${offer}"`)}\n<script>\n${js}\n</script>\n`;
  await writeFile(new URL(`dist/tilda-${offer}.html`,root),external(contents));
  await writeFile(new URL(`dist/preview-${offer}.html`,root),`<!doctype html><html lang="ru"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover"><meta name="theme-color" content="#430c1a"><title>KILLER PERFUME — ${offer} ароматов</title></head><body style="margin:0">${inline(contents)}</body></html>`);
  console.log(`Built dist/tilda-${offer}.html and dist/preview-${offer}.html`);
}
