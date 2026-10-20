import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,mkdir,copyFile,writeFile,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
test('splash script maps unique ID/names and rejects unknown, ambiguous and duplicate inputs',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'nexo-art-test-'));
 try{
  await mkdir(path.join(root,'scripts'));await mkdir(path.join(root,'src'));await mkdir(path.join(root,'input'));
  await copyFile(new URL('../scripts/import-splash-art.mjs',import.meta.url),path.join(root,'scripts/import-splash-art.mjs'));
  const cards=[{id:'mega-man-x-x',name:'X',art:'old.svg'},{id:'mega-man-x-zero',name:'Zero',art:'old.svg'},{id:'code-geass-zero',name:'Zero',art:'old.svg'},{id:'dragon-ball-goku',name:'Gokú',art:'old.svg'}];
  await writeFile(path.join(root,'src/cards.json'),JSON.stringify(cards));
  const png=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+a9n0AAAAASUVORK5CYII=','base64');
  for(const name of ['mega-man-x-x.png','X.png','Zero.png','GOKU.png','unknown.png'])await writeFile(path.join(root,'input',name),png);
  const result=spawnSync(process.execPath,[path.join(root,'scripts/import-splash-art.mjs'),path.join(root,'input')],{encoding:'utf8'});
  assert.equal(result.status,0,result.stderr);const report=JSON.parse(result.stdout);assert.equal(report.imported,2);assert.equal(report.rejected.length,3);
  const updated=JSON.parse(await readFile(path.join(root,'src/cards.json'),'utf8'));assert.equal(updated[0].art,'/art/personajes/mega-man-x-x.png');assert.equal(updated[1].art,'old.svg');assert.equal(updated[2].art,'old.svg');assert.equal(updated[3].art,'/art/personajes/dragon-ball-goku.png');
  assert.deepEqual(await readFile(path.join(root,'public/art/personajes/mega-man-x-x.png')),png);
  const missing=spawnSync(process.execPath,[path.join(root,'scripts/import-splash-art.mjs')],{encoding:'utf8'});assert.equal(missing.status,1);
 }finally{await rm(root,{recursive:true,force:true});}
});
