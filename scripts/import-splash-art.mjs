// Copy user-supplied images into the distributable project; no generated portraits.
import {readdir,readFile,mkdir,copyFile,writeFile} from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=fileURLToPath(new URL('../',import.meta.url));
const source=process.argv[2];
if(!source){console.error('Uso: node scripts/import-splash-art.mjs /ruta/a/imagenes-extraidas');process.exit(1);}
const cataloguePath=path.join(root,'src/cards.json');
const cards=JSON.parse(await readFile(cataloguePath,'utf8'));
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
async function walk(dir){const entries=await readdir(dir,{withFileTypes:true});const all=[];for(const entry of entries){const p=path.join(dir,entry.name);if(entry.isDirectory())all.push(...await walk(p));else if(entry.isFile()&&/\.(png|jpe?g|webp)$/i.test(entry.name))all.push(p);}return all;}
const files=(await walk(path.resolve(source))).sort(),used=new Set(),plan=[],rejected=[];
for(const file of files){const stem=normalize(path.basename(file,path.extname(file)));const exact=cards.find(c=>normalize(c.id)===stem);const matches=exact?[exact]:cards.filter(c=>normalize(c.name)===stem);if(matches.length!==1){rejected.push({file:path.basename(file),reason:matches.length?'Nombre ambiguo: usa ID':'Sin coincidencia'});continue;}const card=matches[0];if(used.has(card.id)){rejected.push({file:path.basename(file),reason:'ID duplicado en el lote'});continue;}used.add(card.id);plan.push({file,card,extension:path.extname(file).toLowerCase()});}
if(plan.length){const dest=path.join(root,'public/art/personajes');await mkdir(dest,{recursive:true});for(const {file,card,extension} of plan){const filename=card.id+extension;const destination=path.join(dest,filename);if(path.resolve(file)!==destination)await copyFile(file,destination);card.art='/art/personajes/'+filename;}await writeFile(cataloguePath,JSON.stringify(cards,null,2)+'\n');}
console.log(JSON.stringify({imported:plan.length,rejected},null,2));
