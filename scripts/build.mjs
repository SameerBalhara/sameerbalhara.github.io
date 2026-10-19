// Optional authoring helper. Generated pages work without Node.js or a build step.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const read=name=>fs.readFileSync(path.join(root,name),'utf8');
const images=JSON.parse(read('content/images.json'));
const esc=value=>String(value).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const categories=[
 {id:'first-settlers',name:'First Settlers',label:'Development journal',description:'The making of First Settlers, from procedural terrain to the details of a living world.',image:'terrain',type:'Devlogs'},
 {id:'open-source',name:'Open Source',label:'Contributions',description:'Issues investigated, changes proposed, and fixes adopted by the wider software community.',image:'assets/images/open-source.svg',type:'Contributions'},
 {id:'papers',name:'Academic Papers',label:'Research & reports',description:'Academic work, with the methods, findings, and original documents in one place.',image:images.report.src,type:'Papers & reports'},
 {id:'projects',name:'Independent Projects',label:'Published work',description:'Independent software and the writeups behind it.',image:'assets/images/projects.svg',type:'Projects'}
];
const posts=[
 {id:'post1',file:'post1.html',category:'first-settlers',title:'Procedural Terrain Generation',eyebrow:'Devlog 00',date:'2026-03-23',summary:'Chunk-based streaming, LOD meshes, biome blending, and the evolving approach to rivers.',image:'UnityScenePreview_007CompressedForGit.png',source:'content/post1.html'},
 {id:'post3',file:'post3.html',category:'first-settlers',title:'Terrain Visuals Improvements',eyebrow:'Devlog 01',date:'2026-03-30',summary:'Smoother height maps, LOD stitching, mesh normals, custom shaders, and the beginnings of grass rendering.',image:'UnityScenePreview3_008.png',source:'content/post3.html'},
 {id:'devlog3-29',file:'first-settlers/devlog-3-29.html',category:'first-settlers',title:'From Terrain to a Playable World',eyebrow:'Devlog 3–29',date:'2026-10-18',summary:'Catching up on terrain erosion, GPU vegetation, modular building, excavation, lighting, and the systems bringing First Settlers together.',image:'FirstSettlers_Progress_Settlement.png',source:'content/devlog-3-29.html',fullHero:true},
 {id:'post2',file:'post2.html',category:'projects',title:'Competitive Rank Overlay — The Finals',eyebrow:'Independent project',date:'2026-03-23',summary:'A computer vision based information overlay for The Finals, developed with Vincent Liu.',image:'assets/images/projects.svg',source:'content/post2.html',status:'Completed'},
 {id:'report1',file:'report1.html',category:'papers',title:'Deep Reinforcement Learning in AWS DeepRacer',eyebrow:'Academic report',date:'2026-05-15',dateLabel:'Added May 15, 2026',summary:'PPO, curriculum training, reward shaping, and transfer learning across autonomous driving tasks.',image:images.report.src,status:'Report'},
 {id:'queue',file:'open-source/queue-timer-reset.html',category:'open-source',title:'Exception-safe cleanup for the main-thread queue timer',eyebrow:'LayerProcGen · Bug fix',date:'2026-10-18',summary:'An exception-path timer bug, a proposed cleanup fix, and its adoption by the maintainer in LayerProcGen 0.5.0.',image:'assets/images/open-source.svg',source:'content/open-source.html',status:'Fix adopted upstream'}
];
const captions={
 'UnityScenePreview_004CompressedForGit.png':'Chunk-based terrain streaming in the Unity scene.',
 'UnityScenePreview_006.png':'Terrain generated with noise functions, levels of detail, and biome variation.',
 'UnityScenePreview_007CompressedForGit.png':'Procedural terrain with lakes and the evolving river network.',
 'UnityScenePreview2_007.png':'An iteration of the river generation system.',
 'UnityScenePreview2_008.png':'River carving and terrain continuity during development.',
 'UnityScenePreview1_008.png':'Terracing artifacts before correcting the noise sample range.',
 'UnityScenePreview3_008.png':'Smoother terrain after correcting the noise sample range.',
 'UnityScenePreview1_009.png':'Custom terrain shading with patches of light and dark grass.',
 'UnityScenePreview_010.png':'The initial grass prototype, with Unity performance statistics.',
 'FirstSettlers_Progress_Lakeside.png':'An earlier progress view: broader mountains, reflective water, shoreline vegetation, and denser ground cover.',
 'FirstSettlers_Progress_Settlement.png':'The latest progress view: an authored shelter, trees and flowers, the hotbar, and an excavated space below the surface.'
};
const dateText=iso=>new Date(iso+'T12:00:00Z').toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'});
const prefix=file=>'../'.repeat(file.split('/').length-1);
const categoryLink=id=>`${id}/index.html`;
function picture(name,p='',options={}){
 const variants=images[name].variants;
 const main=variants.find(v=>v.width>=960)||variants.at(-1);
 return `<img src="${p+main.src}" srcset="${variants.map(v=>p+v.src+' '+v.width+'w').join(', ')}" sizes="${options.sizes||'(max-width: 760px) 100vw, 860px'}" width="${main.width}" height="${main.height}" alt="${esc(options.alt??captions[name]??'First Settlers terrain prototype')}" ${options.eager?'fetchpriority="high"':'loading="lazy"'} decoding="async">`;
}
function art(c,p='',eager=false){
 if(c.image==='terrain')return picture('UnityScenePreview3_008.png',p,{alt:'',eager,sizes:'50vw'});
 return `<img src="${p+c.image}" width="${c.id==='papers'?images.report.width:1000}" height="${c.id==='papers'?images.report.height:700}" alt="" decoding="async" ${eager?'':'loading="lazy"'}>`;
}
function profiles(p=''){
 return `<nav class="profiles" aria-label="Profile links"><a class="profile-link" href="https://github.com/sameerbalhara" target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in a new tab)" data-label="GitHub"><img class="brand-logo github-logo" src="${p}assets/logos/github.svg" width="20" height="20" alt=""></a><button class="profile-link resume-link" type="button" aria-disabled="true" aria-label="Résumé — coming soon" data-label="Résumé — coming soon"><img src="${p}assets/logos/resume.svg" width="19" height="19" alt=""></button><a class="profile-link" href="https://www.linkedin.com/in/sameerbalhara/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in a new tab)" data-label="LinkedIn"><img class="brand-logo linkedin-logo" src="${p}assets/logos/linkedin.png" width="23" height="20" alt=""></a></nav>`;
}
function header(p='',active='',landing=false){
 return `<a class="skip-link" href="#main">Skip to content</a><header class="site-header ${landing?'landing-header':''}"><div class="identity"><a class="site-name" href="${p}index.html">Sameer Balhara</a>${profiles(p)}</div>${landing?'':`<nav class="section-nav" aria-label="Sections"><a href="${p}index.html">All sections</a>${categories.map(c=>`<a href="${p+categoryLink(c.id)}" ${active===c.id?'aria-current="page"':''}>${c.name}</a>`).join('')}</nav>`}</header>`;
}
function footer(p=''){return `<footer class="site-footer"><span>Sameer Balhara</span><a href="${p}index.html">All sections <span aria-hidden="true">↗</span></a></footer>`;}
function document(file,title,description,body,landing=false){
 const p=prefix(file);
 return `<!doctype html>\n<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="color-scheme" content="dark"><meta name="theme-color" content="#141b18"><title>${esc(title)}${landing?'':' · Sameer Balhara'}</title><meta name="description" content="${esc(description)}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:type" content="${posts.some(post=>post.file===file)?'article':'website'}"><link rel="icon" href="${p}assets/favicon.svg" type="image/svg+xml"><link rel="stylesheet" href="${p}style.css"><script src="${p}script.js" defer></script></head><body class="${landing?'landing-page':'interior-page'}">${body}</body></html>\n`;
}
function write(file,html){fs.mkdirSync(path.dirname(path.join(root,file)),{recursive:true});fs.writeFileSync(path.join(root,file),html);}
const landing=header('','',true)+`<main id="main" class="landing" aria-label="Portfolio sections"><h1 class="visually-hidden">Sameer Balhara — software portfolio</h1>${categories.map(c=>`<a class="quadrant quadrant-${c.id}" href="${categoryLink(c.id)}"><div class="quadrant-art">${art(c,'',true)}</div><span class="quadrant-wash"></span><span class="quadrant-scrim"></span><span class="quadrant-label"><span class="eyebrow">${esc(c.label)}</span><span class="quadrant-title">${esc(c.name)}</span></span></a>`).join('')}</main>`;
write('index.html',document('index.html','Sameer Balhara — Software Portfolio','First Settlers devlogs, open-source contributions, academic papers, and independent software projects.',landing,true));
function thumb(post,p){if(images[post.image])return picture(post.image,p,{alt:'',sizes:'(max-width: 600px) 96px, 160px'});return `<img src="${p+post.image}" width="160" height="100" alt="" loading="lazy" decoding="async">`;}
for(const c of categories){
 const file=categoryLink(c.id),p=prefix(file);
 const items=posts.filter(post=>post.category===c.id).sort((a,b)=>b.date.localeCompare(a.date));
 const rows=items.map(post=>`<li data-date="${post.date}" data-key="${post.id}"><a class="archive-entry" href="${p+post.file}"><div class="entry-image">${thumb(post,p)}</div><div class="entry-copy"><div class="entry-meta"><span>${esc(post.eyebrow)}</span><time datetime="${post.date}">${post.dateLabel||dateText(post.date)}</time></div><h2>${esc(post.title)}</h2><p>${esc(post.summary)}</p>${post.status?`<span class="status">${esc(post.status)}</span>`:''}</div><span class="entry-arrow" aria-hidden="true">↗</span></a></li>`).join('');
 const body=header(p,c.id)+`<main id="main"><section class="archive-banner"><div class="banner-art">${art(c,p)}</div><div class="banner-scrim"></div><div class="page-width banner-label"><a class="breadcrumb" href="${p}index.html">← All sections</a><p class="eyebrow">${esc(c.label)}</p><h1>${esc(c.name)}</h1><p>${esc(c.description)}</p></div></section><section class="page-width archive-section" aria-label="${esc(c.type)}"><div class="archive-toolbar"><p>${esc(c.type)} <span class="item-count">${items.length}</span></p><label class="sort-control" hidden>Order <select data-sort aria-label="Chronological order"><option value="newest" selected>Newest first</option><option value="oldest">Oldest first</option></select></label><span class="sort-fallback">Newest first</span></div><ol class="archive-list" data-archive>${rows}</ol><p class="visually-hidden" data-sort-status role="status"></p></section></main>`+footer(p);
 write(file,document(file,c.name,c.description,body));
}
function processContent(post,p){
 let body=read(post.source);
 body=body.replace(/<div class="media">\s*<img src="images\/([^"]+)">\s*<\/div>/g,(_,name)=>`<figure class="article-figure"><a href="${p}images/${name}" aria-label="Open full-resolution image: ${esc(captions[name]||'terrain prototype')}">${picture(name,p)}</a><figcaption>${esc(captions[name]||'First Settlers development screenshot.')}</figcaption></figure>`);
 body=body.replace(/<video controls muted loop>/g,`<video controls muted loop playsinline preload="none" poster="${p+images['UnityScenePreview_004CompressedForGit.png'].variants[0].src}" aria-label="Chunk streaming demonstration">`);
 body=body.replace(/src="videos\//g,`src="${p}videos/`);
 const headings=[];
 body=body.replace(/<h2>(.*?)<\/h2>/g,(_,title)=>{const id=title.toLowerCase().replace(/<[^>]+>/g,'').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');headings.push({id,title});return `<h2 id="${id}">${title}</h2>`;});
 return {body,headings};
}
for(const post of posts){
 const p=prefix(post.file),c=categories.find(c=>c.id===post.category);
 let body='',headings=[];
 if(post.source){({body,headings}=processContent(post,p));}
 else{
  headings=[{id:'overview',title:'Overview'},{id:'report',title:'Full report'}];
  body=`<h2 id="overview">Overview</h2><p>This report explores how Deep Reinforcement Learning (Proximal Policy Optimization) can train an AWS DeepRacer agent across increasingly difficult autonomous driving tasks. Beginning with time-trial completion, the project extends into obstacle avoidance and head-to-bot racing through staged curriculum training, reward shaping, and transfer learning. The final policy achieved 100% lap progress across all benchmark tracks for five consecutive evaluation episodes in each phase.</p><h2 id="report">Full report</h2><div class="document-actions"><a class="action-link" href="${p}reports/AWSDeepracerReportSameerBalhara.pdf" target="_blank" rel="noopener">Open PDF <span aria-hidden="true">↗</span></a><a class="action-link" href="${p}reports/AWSDeepracerReportSameerBalhara.pdf" download>Download PDF <span aria-hidden="true">↓</span></a></div><details class="pdf-panel"><summary>Read the PDF on this page</summary><div class="pdf-viewer" data-pdf="${p}reports/AWSDeepracerReportSameerBalhara.pdf"><p>The original PDF is available using the links above.</p></div></details>`;
 }
 if(post.id==='queue'&&images.evidence){body+=`<figure class="article-figure"><a href="${p+images.evidence.src}"><img src="${p+images.evidence.src}" width="${images.evidence.width}" height="${images.evidence.height}" loading="lazy" decoding="async" alt="PR #22 marked closed, followed by the maintainer confirming adoption of the suggested try-finally fix."></a><figcaption>The contribution discussion, including the maintainer's confirmation. The live PR is the source of record.</figcaption></figure>`;}
 let hero=post.category==='first-settlers'?picture(post.image,p,{eager:true,alt:captions[post.image],sizes:'(max-width: 1000px) 100vw, 1100px'}):`<img src="${p+post.image}" width="${post.id==='report1'?images.report.width:1000}" height="${post.id==='report1'?images.report.height:700}" alt="${post.id==='report1'?'First page of the original DeepRacer report':''}" decoding="async">`;
 if(post.fullHero)hero=`<a href="${p}images/${post.image}" aria-label="Open the full-resolution latest progress image">${hero}</a><figcaption>${esc(captions[post.image])}</figcaption>`;
 const toc=headings.length>2?`<aside class="article-toc" aria-label="On this page"><details open><summary>On this page</summary><ol>${headings.map(h=>`<li><a href="#${h.id}">${h.title}</a></li>`).join('')}</ol></details></aside>`:'';
 const categoryPosts=posts.filter(s=>s.category===post.category).sort((a,b)=>a.date.localeCompare(b.date));
 const position=categoryPosts.findIndex(s=>s.id===post.id);
 const siblings=[categoryPosts[position-1],categoryPosts[position+1]].filter(Boolean);
 const nav=`<nav class="article-navigation" aria-label="More in ${esc(c.name)}"><a href="${p+categoryLink(c.id)}">← All ${c.id==='first-settlers'?'devlogs':c.type.toLowerCase()}</a>${siblings.map(s=>`<a href="${p+s.file}">${s.date>post.date?'Next':'Previous'}: ${esc(s.title)} <span aria-hidden="true">→</span></a>`).join('')}</nav>`;
 const html=header(p,c.id)+`<main id="main"><div class="page-width article-heading"><a class="breadcrumb" href="${p+categoryLink(c.id)}">← ${esc(c.name)}</a><p class="eyebrow">${esc(post.eyebrow)}</p><h1>${esc(post.title)}</h1><p class="article-summary">${esc(post.summary)}</p><div class="article-meta"><time datetime="${post.date}">${post.dateLabel||dateText(post.date)}</time>${post.source?`<span>${Math.max(1,Math.ceil(body.replace(/<[^>]*>/g,' ').split(/\s+/).length/220))} min read</span>`:''}${post.status?`<span class="status">${esc(post.status)}</span>`:''}</div></div><figure class="page-width article-hero hero-${post.category}${post.fullHero?' hero-full':''}">${hero}</figure><div class="page-width reading-layout ${toc?'':'without-toc'}">${toc}<article class="prose">${body}${nav}</article></div></main>`+footer(p);
 write(post.file,document(post.file,post.title,post.summary,html));
}
// A 404 can be served at any nested URL; resolve its assets/navigation from the user-site root.
write('404.html',document('404.html','Page not found','This page could not be found.',header()+`<main id="main" class="page-width not-found"><p class="eyebrow">404</p><h1>This path ends here.</h1><p>The page may have moved. Explore the portfolio to find what you need.</p><a class="action-link" href="index.html">Return to the portfolio ↗</a></main>`+footer()).replace('<head>','<head><base href="/">'));
console.log(`Built landing page, ${categories.length} archives, ${posts.length} articles, and a 404 page.`);
