import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=file=>fs.readFileSync(path.join(root,file),'utf8');
const pages=['index.html','first-settlers/index.html','open-source/index.html','papers/index.html','projects/index.html','post1.html','post2.html','post3.html','first-settlers/devlog-3-29.html','report1.html','open-source/queue-timer-reset.html','404.html'];
const base=`http://127.0.0.1:${process.env.PORT||4173}/`;
const files=new Set(pages);
let anchors=0;
for(const file of pages){
 const html=read(file);
 assert(html.startsWith('<!doctype html>'),file+' document type');
 assert(html.includes('name="viewport"'),file+' viewport');
 assert.equal((html.match(/<h1\b/g)||[]).length,1,file+' unique h1');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,file+' unique IDs');
 assert(!/window\.openai|\bTweak\b|data-lucide/.test(html),file+' no preview dependency');
 for(const match of html.matchAll(/<(img)\b([^>]+)>/g)){
  assert(/\balt="/.test(match[2]),file+' image alt');
  assert(/\bwidth="\d+"/.test(match[2])&&/\bheight="\d+"/.test(match[2]),file+' image dimensions');
 }
 const refs=[...html.matchAll(/(?:href|src|poster|data-pdf)="([^"]+)"/g)].map(m=>m[1]);
 for(const match of html.matchAll(/srcset="([^"]+)"/g))refs.push(...match[1].split(',').map(v=>v.trim().split(/\s+/)[0]));
 for(const ref of refs){
  if(/^(?:https?:|mailto:|data:)/.test(ref))continue;
  const url=new URL(ref,new URL(file,base));
  const local=decodeURIComponent(url.pathname).slice(1);
  assert(fs.existsSync(path.join(root,local)),`${file}: missing ${ref}`);
  files.add(local);
  if(url.hash){const target=read(local);assert(target.includes(`id="${url.hash.slice(1)}"`),`${file}: missing anchor ${ref}`);anchors++;}
 }
 if(html.includes('data-archive')){
  const dates=[...html.matchAll(/<li data-date="([^"]+)"/g)].map(m=>m[1]);
  assert.deepEqual(dates,[...dates].sort().reverse(),file+' newest first in static HTML');
 }
}
for(const id of ['post1','post2','post3']){
 const source=read(`content/${id}.html`),page=read(`${id}.html`);
 const paragraphs=[...source.matchAll(/<p>([\s\S]*?)<\/p>/g)].map(m=>m[1]);
 for(const paragraph of paragraphs)assert(page.includes(paragraph),`${id}: original paragraph altered`);
}
assert(read('post1.html').includes('preload="none"'),'Video must not preload');
assert(!read('report1.html').includes('<iframe'),'PDF must not load on initial page');
assert(read('open-source/queue-timer-reset.html').includes('closed the PR without merging'),'Accurate contribution status');
const pending=[...files];
for(let start=0;start<pending.length;start+=12){
 await Promise.all(pending.slice(start,start+12).map(async file=>{const response=await fetch(new URL(file,base),{method:'HEAD'});assert.equal(response.status,200,`${file}: HTTP ${response.status}`);}));
}
const missing=await fetch(new URL('missing-page-check',base));assert.equal(missing.status,404);
for(const file of ['reports/AWSDeepracerReportSameerBalhara.pdf','videos/ChunkSystemDemoAndCode_001TrimmedCompressedForGit.mp4']){
 const response=await fetch(new URL(file,base),{headers:{Range:'bytes=0-63'}});
 assert.equal(response.status,206);assert.equal((await response.arrayBuffer()).byteLength,64);
}
// Exercise progressive enhancements without a browser or external DOM dependency.
const list={children:[{dataset:{date:'2026-03-30'}},{dataset:{date:'2026-03-23'}}],append(...items){this.children=items;}};
const status={textContent:''},label={hidden:true},fallback={hidden:false,setAttribute(){this.hidden=true;}};
const section={querySelector(selector){return {'[data-archive]':list,'[data-sort-status]':status,'.sort-fallback':fallback}[selector];}};
const select={value:'',events:{},closest(selector){return selector==='section'?section:label;},addEventListener(name,handler){this.events[name]=handler;}};
const container={dataset:{pdf:'reports/AWSDeepracerReportSameerBalhara.pdf'},children:[],querySelector(){return this.children[0];},replaceChildren(frame){this.children=[frame];}};
const panel={open:false,events:{},addEventListener(name,handler){this.events[name]=handler;},querySelector(){return container;}};
vm.runInNewContext(read('script.js'),{document:{querySelectorAll(selector){return selector==='[data-sort]'?[select]:[panel];},createElement(tag){return {tag};}}});
assert.equal(select.value,'newest');assert.equal(label.hidden,false);assert.equal(fallback.hidden,true);
select.value='oldest';select.events.change();assert.equal(list.children[0].dataset.date,'2026-03-23');
select.value='newest';select.events.change();assert.equal(list.children[0].dataset.date,'2026-03-30');
assert.equal(container.children.length,0);panel.open=true;panel.events.toggle();assert.equal(container.children.length,1);assert.equal(container.children[0].src,container.dataset.pdf);panel.events.toggle();assert.equal(container.children.length,1);
console.log(`PASS: ${pages.length} pages, ${files.size} local files, ${anchors} anchors, HTTP/range responses, preserved paragraphs, sorting, and deferred PDF loading.`);
