/** User splash art lives in IndexedDB, never in the small localStorage quota. */
const normalize=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
const images=new Map();
function openDB(){return new Promise((resolve,reject)=>{const request=indexedDB.open('nexo-art',1);request.onupgradeneeded=()=>request.result.createObjectStore('images');request.onsuccess=()=>resolve(request.result);request.onerror=()=>reject(request.error);});}
export function artURL(card){return images.get(card.id)||card.art;}
export async function loadArt(){const db=await openDB();try{await new Promise((resolve,reject)=>{const tx=db.transaction('images','readonly'),request=tx.objectStore('images').openCursor();request.onsuccess=()=>{const cursor=request.result;if(cursor){if(cursor.value instanceof Blob)images.set(cursor.key,URL.createObjectURL(cursor.value));cursor.continue();}};tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);});}finally{db.close();}}
export async function importArt(files,cards,forcedId){
  const accepted=[],errors=[];
  for(const file of files){
    if(!['image/png','image/jpeg','image/webp'].includes(file.type)||file.size>8*1024*1024){errors.push(`${file.name}: usa PNG, JPEG o WebP de hasta 8 MB.`);continue;}
    const name=normalize(file.name.replace(/\.[^.]+$/,''));
    const exact=cards.find(c=>c.id===name);const matches=forcedId?cards.filter(c=>c.id===forcedId):exact?[exact]:cards.filter(c=>normalize(c.name)===name);
    if(matches.length!==1){errors.push(`${file.name}: ${matches.length?'nombre ambiguo, usa el ID de la carta':'no coincide con una carta'}.`);continue;}
    try{const bitmap=await createImageBitmap(file);bitmap.close();accepted.push({id:matches[0].id,file});}catch{errors.push(`${file.name}: imagen ilegible.`);}
  }
  if(accepted.length){const db=await openDB();try{await new Promise((resolve,reject)=>{const tx=db.transaction('images','readwrite');tx.oncomplete=resolve;tx.onerror=()=>reject(tx.error);tx.onabort=()=>reject(tx.error||new Error('No se pudieron guardar las imágenes.'));for(const {id,file} of accepted)tx.objectStore('images').put(file,id);});for(const {id,file} of accepted){if(images.has(id))URL.revokeObjectURL(images.get(id));images.set(id,URL.createObjectURL(file));}}finally{db.close();}}
  return {count:accepted.length,errors};
}
