/** Pure local TCG engine. Only act() can change a game; no UI rules or hidden AI reads. */
export const TYPES = ['fuego','agua','rayo','planta','psíquico','lucha','oscuridad','metal'];
const lookup = (cards,id) => cards.find(c=>c.id===id);
export const units = p => [p.active,...p.bench].filter(Boolean);
export function validateDeck(deck,cards) {
  if(!Array.isArray(deck)) return ['Formato de mazo inválido.'];
  const errors=[], counts=new Map();
  if(deck.length!==60) errors.push('El mazo debe tener exactamente 60 cartas.');
  for(const id of deck){const c=lookup(cards,id);if(!c)errors.push('El mazo contiene cartas desconocidas.');else if(c.kind!=='energy')counts.set(c.name,(counts.get(c.name)||0)+1);}
  if([...counts.values()].some(n=>n>4))errors.push('Máximo cuatro cartas con el mismo nombre, salvo energías básicas.');
  if(!deck.some(id=>{const c=lookup(cards,id);return c?.kind==='hero'&&c.stage===0;}))errors.push('Incluye al menos un personaje básico.');
  return [...new Set(errors)];
}
export function starter(cards,type='fuego') {
  const bases=cards.filter(c=>c.kind==='hero'&&c.stage===0&&c.energyType===type);
  const depth=base=>Math.max(...cards.filter(c=>c.family===base.id).map(c=>c.stage));
  const chosen=[...bases].sort((a,b)=>depth(b)-depth(a)).slice(0,4);
  if(chosen.length<4)throw new Error('No hay suficientes familias para este mazo.');
  const deck=[];
  for(const base of chosen){
    const middle=cards.find(c=>c.family===base.id&&c.stage===1);
    const final=cards.find(c=>c.family===base.id&&c.stage===2);
    deck.push(...Array(final?3:4).fill(base.id));
    if(middle)deck.push(middle.id,middle.id);
    if(final)deck.push(final.id);
  }
  for(const base of bases)while(deck.length<24&&deck.filter(id=>id===base.id).length<4)deck.push(base.id);
  deck.push(...Array(20).fill('energia-'+type));
  for(const c of cards.filter(c=>c.kind==='trainer'))deck.push(...Array(4).fill(c.id));
  const errors=validateDeck(deck,cards);if(errors.length)throw new Error(errors.join(' '));return deck;
}
export function seededRandom(seed){return()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function shuffled(a,random){a=[...a];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function createGame(cards,decks,seed=Date.now()) {
  if(!Array.isArray(decks)||decks.length!==2)throw new Error('Se necesitan dos mazos.');
  decks.forEach(d=>{const errors=validateDeck(d,cards);if(errors.length)throw new Error(errors.join(' '));});
  const random=seededRandom(seed),first=random()<.5?0:1;
  const g={phase:'order',active:first,coinWinner:first,first:null,turn:0,winner:null,reason:'',uid:0,log:[],players:decks.map((d,i)=>({name:i?'Rival':'Tú',deck:[...d],hand:[],prizes:[],grave:[],active:null,bench:[],turns:0,attached:false,retreated:false,supporter:false,ready:false,mulligans:0,bonus:0}))};
  for(const p of g.players){do{p.deck=shuffled([...p.deck,...p.hand],random);p.hand=p.deck.splice(0,7);if(p.hand.some(id=>lookup(cards,id).kind==='hero'&&lookup(cards,id).stage===0))break;p.mulligans++;}while(true);}
  g.players.forEach((p,i)=>{p.bonus=Math.max(0,g.players[1-i].mulligans-p.mulligans);if(p.mulligans)g.log.push(`${p.name}: ${p.mulligans} manos sin básicos; se volvió a barajar.`);});
  g.log.push(`${g.players[first].name} gana el sorteo y elige quién empieza.`);return g;
}
export function canPay(cost,energies,cards) {
  const available=energies.map(id=>lookup(cards,id)?.energyType);
  for(const t of cost.filter(t=>t!=='incolora')){const i=available.indexOf(t);if(i<0)return false;available.splice(i,1);}
  return available.length>=cost.filter(t=>t==='incolora').length;
}
export function attackDamage(attacker,defender,attack,cards) {
  const a=lookup(cards,attacker.card),d=lookup(cards,defender.card);
  let damage=attack.damage;if(d.weakness===a.energyType)damage*=2;if(d.resistance===a.energyType)damage-=30;return Math.max(0,damage);
}
export function canEvolve(g,p,u,card,cards) {
  const current=lookup(cards,u.card);
  return card.kind==='hero'&&card.family===current.family&&card.stage>current.stage&&p.turns>1&&u.born<g.turn&&u.evolved!==g.turn&&!cards.some(c=>c.kind==='hero'&&c.family===current.family&&c.stage>current.stage&&c.stage<card.stage);
}
function end(g,winner,reason){g.phase='finished';g.winner=winner;g.reason=reason;g.log.push(reason);}
function draw(p,n){p.hand.push(...p.deck.splice(0,n));}
function beginTurn(g,player){g.active=player;g.phase='battle';g.turn++;const p=g.players[player];p.turns++;p.attached=false;p.retreated=false;p.supporter=false;if(!p.deck.length){end(g,1-player,`${p.name} no puede robar al empezar su turno.`);return;}draw(p,1);g.log.push(`Turno ${g.turn}: ${p.name} roba una carta.`);}
function makeUnit(g,id){return {uid:++g.uid,card:id,stack:[id],damage:0,energies:[],born:g.turn,evolved:-1};}
function combinations(indices,n){if(n===0)return [[]];if(indices.length<n)return [];return indices.flatMap((v,i)=>combinations(indices.slice(i+1),n-1).map(rest=>[v,...rest]));}
export function legalActions(g,cards) {
  if(g.phase==='finished')return [];
  const p=g.players[g.active],actions=[];
  if(g.phase==='order')return [0,1].map(first=>({type:'order',first}));
  if(g.phase==='bonus'){
    if(p.bonus>0&&p.deck.length)actions.push({type:'bonus'});
    if(p.bench.length<5)p.hand.forEach((id,index)=>{const c=lookup(cards,id);if(c.kind==='hero'&&c.stage===0)actions.push({type:'bench',index});});
    actions.push({type:'readyBonus'});return actions;
  }
  if(g.phase==='prize')return p.prizes.map((_,index)=>({type:'prize',index}));
  if(g.phase==='promote')return p.bench.map(u=>({type:'promote',uid:u.uid}));
  if(g.phase==='setup'){
    p.hand.forEach((id,index)=>{const c=lookup(cards,id);if(c.kind==='hero'&&c.stage===0){if(!p.active)actions.push({type:'chooseActive',index});else if(p.bench.length<5)actions.push({type:'bench',index});}});
    if(p.active)actions.push({type:'ready'});return actions;
  }
  p.hand.forEach((id,index)=>{
    const c=lookup(cards,id);
    if(c.kind==='hero'){
      if(c.stage===0&&p.bench.length<5)actions.push({type:'bench',index});
      if(c.stage>0)for(const u of units(p))if(canEvolve(g,p,u,c,cards))actions.push({type:'evolve',index,uid:u.uid});
    }
    if(c.kind==='energy'&&!p.attached)for(const u of units(p))actions.push({type:'attach',index,uid:u.uid});
    if(c.kind==='trainer'&&!(c.subtype==='supporter'&&(p.supporter||(g.active===g.first&&p.turns===1)))){
      if(c.effect==='heal')for(const u of units(p).filter(u=>u.damage>0))actions.push({type:'trainer',index,uid:u.uid});
      if(c.effect==='switch')for(const u of p.bench)actions.push({type:'trainer',index,uid:u.uid});
      if(['research','draw'].includes(c.effect)&&p.deck.length)actions.push({type:'trainer',index});
    }
  });
  if(!p.retreated){const cost=lookup(cards,p.active.card).retreat;if(p.active.energies.length>=cost)for(const u of p.bench)for(const discard of combinations(p.active.energies.map((_,i)=>i),cost))actions.push({type:'retreat',uid:u.uid,discard});}
  if(!(g.active===g.first&&p.turns===1))lookup(cards,p.active.card).attacks.forEach((attack,index)=>{if(canPay(attack.cost,p.active.energies,cards))actions.push({type:'attack',index});});
  actions.push({type:'endTurn'});return actions;
}
function sameAction(a,b){return Object.keys(a).length===Object.keys(b||{}).length&&Object.keys(a).every(k=>JSON.stringify(a[k])===JSON.stringify(b[k]));}
function swap(p,uid){const i=p.bench.findIndex(u=>u.uid===uid);[p.active,p.bench[i]]=[p.bench[i],p.active];}
/** Reject invalid input before cloning, leaving the caller's state untouched. */
export function act(state,action,cards) {
  if(!legalActions(state,cards).some(a=>sameAction(a,action)))throw new Error('Acción no permitida en este momento.');
  const g=structuredClone(state),p=g.players[g.active],enemy=g.players[1-g.active];
  if(action.type==='order'){g.first=action.first;g.active=action.first;g.phase='setup';g.log.push(`${g.players[g.first].name} jugará primero.`);return g;}
  if(action.type==='bonus'){draw(p,1);p.bonus--;return g;}
  if(action.type==='readyBonus'){p.bonus=0;const other=g.players.findIndex(x=>x.bonus>0);if(other>=0)g.active=other;else beginTurn(g,g.first);return g;}
  if(action.type==='chooseActive'){const id=p.hand.splice(action.index,1)[0];p.active=makeUnit(g,id);return g;}
  if(action.type==='bench'){const id=p.hand.splice(action.index,1)[0];p.bench.push(makeUnit(g,id));if(!['setup','bonus'].includes(g.phase))g.log.push(`${p.name} coloca a ${lookup(cards,id).name} en la banca.`);}
  if(action.type==='ready'){p.ready=true;p.prizes=p.deck.splice(0,6);if(g.players.every(x=>x.ready)){const bonusPlayer=g.players.findIndex(x=>x.bonus>0);if(bonusPlayer>=0){g.phase='bonus';g.active=bonusPlayer;}else beginTurn(g,g.first);}else g.active=1-g.active;return g;}
  if(action.type==='attach'){const id=p.hand.splice(action.index,1)[0];units(p).find(u=>u.uid===action.uid).energies.push(id);p.attached=true;g.log.push(`${p.name} une una ${lookup(cards,id).name}.`);}
  if(action.type==='evolve'){const id=p.hand.splice(action.index,1)[0],u=units(p).find(u=>u.uid===action.uid);u.card=id;u.stack.push(id);u.evolved=g.turn;g.log.push(`${p.name} evoluciona a ${lookup(cards,id).name}.`);}
  if(action.type==='trainer'){
    const id=p.hand.splice(action.index,1)[0],c=lookup(cards,id);p.grave.push(id);if(c.subtype==='supporter')p.supporter=true;
    if(c.effect==='heal'){const u=units(p).find(u=>u.uid===action.uid);u.damage=Math.max(0,u.damage-30);}
    if(c.effect==='switch')swap(p,action.uid);
    if(c.effect==='research'){p.grave.push(...p.hand);p.hand=[];draw(p,7);}
    if(c.effect==='draw')draw(p,3);
    g.log.push(`${p.name} juega ${c.name}.`);
  }
  if(action.type==='retreat'){for(const i of [...action.discard].sort((a,b)=>b-a))p.grave.push(p.active.energies.splice(i,1)[0]);swap(p,action.uid);p.retreated=true;g.log.push(`${p.name} retira a su activo.`);}
  if(action.type==='attack'){
    const attack=lookup(cards,p.active.card).attacks[action.index],damage=attackDamage(p.active,enemy.active,attack,cards);enemy.active.damage+=damage;
    g.log.push(`${lookup(cards,p.active.card).name}: ${attack.name}, ${damage} de daño.`);
    if(enemy.active.damage>=lookup(cards,enemy.active.card).health){
      g.log.push(`${lookup(cards,enemy.active.card).name} queda fuera de combate.`);enemy.grave.push(...enemy.active.stack,...enemy.active.energies);enemy.active=null;
      if(!enemy.bench.length)end(g,g.active,`${enemy.name} no tiene personajes en juego.`);else g.phase='prize';
    }else beginTurn(g,1-g.active);
  }
  if(action.type==='prize'){
    p.hand.push(p.prizes.splice(action.index,1)[0]);g.log.push(`${p.name} toma un premio.`);
    if(!p.prizes.length)end(g,g.active,`${p.name} ha tomado sus seis premios.`);else {g.active=1-g.active;g.phase='promote';}
  }
  if(action.type==='promote'){const i=p.bench.findIndex(u=>u.uid===action.uid);p.active=p.bench.splice(i,1)[0];g.log.push(`${p.name} promueve a ${lookup(cards,p.active.card).name}.`);beginTurn(g,g.active);}
  if(action.type==='endTurn')beginTurn(g,1-g.active);
  g.log=g.log.slice(-80);return g;
}
/** Uses own hand and public board only. It never inspects rival hand/deck or prize identities. */
export function aiAction(g,cards) {
  const p=g.players[g.active],e=g.players[1-g.active];
  const score=a=>{
    const c=a.index===undefined?null:lookup(cards,p.hand[a.index]);
    if(a.type==='order')return a.first===g.active?100:90;
    if(a.type==='readyBonus')return -20;
    if(a.type==='bonus')return 100;
    if(a.type==='chooseActive')return 50+lookup(cards,p.hand[a.index]).health/20;
    if(a.type==='ready')return -20;
    if(a.type==='bench')return ['setup','bonus'].includes(g.phase)?(p.bench.length<2?30:-30):p.bench.length<3?40:-15;
    if(a.type==='promote')return 20+p.bench.find(u=>u.uid===a.uid).energies.length*20;
    if(a.type==='prize')return 1;
    if(a.type==='evolve')return 80;
    if(a.type==='attach'){const u=units(p).find(u=>u.uid===a.uid),hero=lookup(cards,u.card);return 70+(u===p.active?20:0)+(hero.energyType===c.energyType?10:0)-u.energies.length*8;}
    if(a.type==='trainer'){
      if(c.effect==='heal')return 75;
      if(c.effect==='draw')return p.deck.length>3?60:-20;
      if(c.effect==='research')return p.hand.length<=3&&p.deck.length>7?55:-20;
      if(c.effect==='switch'){const next=p.bench.find(u=>u.uid===a.uid);return p.active.damage>=lookup(cards,p.active.card).health-30&&next.energies.length>=2?50:-20;}
    }
    if(a.type==='retreat')return -20;
    if(a.type==='attack'){const attack=lookup(cards,p.active.card).attacks[a.index],damage=attackDamage(p.active,e.active,attack,cards);return damage>=lookup(cards,e.active.card).health-e.active.damage?150:10+damage/10;}
    return -10;
  };
  return legalActions(g,cards).sort((a,b)=>score(b)-score(a))[0];
}
