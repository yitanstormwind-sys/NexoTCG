import test from 'node:test';
import assert from 'node:assert/strict';
import {PROFILE_KEY,normalizeProfile,readProfile,saveProfile,progression,matchReward} from '../src/profile.js';
const avatars=['goku','cloud'];
test('local profile recovers from corrupt or unavailable storage and rejects invalid fields',()=>{
 assert.equal(readProfile(avatars,{getItem:()=>'{bad'}).name,'Invocador');
 assert.equal(readProfile(avatars,{getItem:()=>{throw Error('blocked');}}).xp,0);
 assert.deepEqual(normalizeProfile({name:'  Nexo  ',avatar:'missing',xp:-7,wins:3,matches:1},avatars),{name:'Nexo',avatar:'goku',xp:0,wins:3,matches:3});
});
test('XP crosses levels and match rewards preserve player identity',()=>{
 const profile={name:'Nexo',avatar:'cloud',xp:480,wins:2,matches:4};
 const next=matchReward(profile,true);
 assert.deepEqual(progression(next),{level:2,current:100,required:500});
 assert.deepEqual(next,{name:'Nexo',avatar:'cloud',xp:600,wins:3,matches:5});
 assert.equal(matchReward(profile,false).xp,520);
 assert.equal(profile.xp,480);
});
test('profile saving roundtrips without touching deck or image keys; failed writes propagate',()=>{
 const data=new Map([['nexo-decks-v2','preserved']]);
 const storage={getItem:key=>data.get(key),setItem:(key,value)=>data.set(key,value)};
 const original={name:'Nexo',avatar:'cloud',xp:510,wins:1,matches:3};
 saveProfile(original,avatars,storage);
 assert.deepEqual(readProfile(avatars,storage),original);
 assert.equal(data.get('nexo-decks-v2'),'preserved');
 assert.equal(data.size,2);assert.ok(data.has(PROFILE_KEY));
 assert.throws(()=>saveProfile(original,avatars,{setItem:()=>{throw Error('full');}}),/full/);
});
