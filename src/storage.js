import {validateDeck} from './engine.js';
export const DECK_KEY='nexo.decks.v2';
export function readDecks(cards){try{const data=JSON.parse(localStorage.getItem(DECK_KEY)||'[]');return Array.isArray(data)?data.filter(d=>d&&typeof d.name==='string'&&d.name.length<=60&&validateDeck(d.cards,cards).length===0):[];}catch{return [];}}
export function saveDecks(decks){try{localStorage.setItem(DECK_KEY,JSON.stringify(decks));return true;}catch{return false;}}
export function legacyDecks(cards){try{const data=JSON.parse(localStorage.getItem('nexo.decks.v1')||'[]');return Array.isArray(data)?data.filter(d=>d&&typeof d.name==='string'&&d.name.length<=60&&Array.isArray(d.cards)&&d.cards.length===30&&d.cards.every(id=>cards.some(c=>c.id===id&&c.kind==='hero'&&c.stage===0))):[];}catch{return [];}}
export function migrateDeck(old,cards){
  if(!old||!Array.isArray(old.cards)||old.cards.length!==30)throw new Error('El mazo antiguo debe tener 30 personajes.');
  const types=old.cards.map(id=>cards.find(c=>c.id===id)).map(c=>{if(c?.kind!=='hero'||c.stage!==0)throw new Error('El mazo antiguo contiene cartas inválidas.');return c.energyType;});
  const energy=Array.from({length:20},(_,i)=>'energia-'+types[Math.floor(i*types.length/20)]);
  const result=[...old.cards,...energy,...Array(4).fill('entrenador-mentor'),...Array(4).fill('entrenador-pocion'),...Array(2).fill('entrenador-investigacion')];
  const errors=validateDeck(result,cards);if(errors.length)throw new Error(errors.join(' '));return {name:(old.name+' · adaptado').slice(0,60),cards:result};
}
