import {readProfile, saveProfile, progression, matchReward} from './profile.js';

const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
// Editorial content for this local edition. No invented live events or online rewards.
export const announcements = [
  {id:'season', tag:'TEMPORADA 01', title:'Mundos en colisión', subtitle:'Universos distintos. Una misma arena.', body:'La primera temporada de NEXO reúne a 245 personajes. Elige un activo, prepara cinco aliados en banca y encuentra la combinación de energías y evoluciones que define a tu equipo.', points:['245 personajes, desde básicos hasta sus formas finales.','Mazos de 60 cartas con energías y entrenadores.','Duelos contra la IA y partidas locales para dos jugadores.'], action:'Preparar mi equipo', target:'decks'},
  {id:'collection', tag:'TU COLECCIÓN', title:'El poder de evolucionar', subtitle:'Encuentra tu próxima carta favorita.', body:'Explora las familias de personajes, compara sus ataques y descubre qué evoluciones encajan en tu mazo. Pulsa cualquier ilustración para contemplarla completa.', points:['Filtra por personaje, energía o etapa.','Incluye tus propias ilustraciones desde la colección.'], action:'Abrir colección', target:'gallery'},
  {id:'guide', tag:'GUÍA DE JUEGO', title:'Tu primera victoria empieza aquí', subtitle:'Un activo. Cinco aliados. Seis premios.', body:'Cada turno es una decisión: cargar energía, preparar la banca, evolucionar o atacar. Aprende el ciclo de juego y entra en la arena con tu mazo listo.', points:['Unir una energía por turno.','Atacar cierra el turno.','Ganar seis premios, dejar al rival sin personajes o agotar su mazo.'], action:'Leer las reglas', target:'rules'}
];

export function createLobby({cards, artURL, navigate, refresh, notify, zoom}) {
  const byName = name => cards.find(c => c.name === name && c.kind === 'hero');
  const featured = ['Goku Ultra instinto','Cloud Strife','Sora Forma Definitiva','X Armadura Definitiva'].map(byName).filter(Boolean);
  const avatars = ['Goku Ultra instinto','Cloud Strife','Sora Forma Definitiva','X','Zero','Jin Kazama','Pikachu','Sailor Moon Cetro Lunar'].map(byName).filter(Boolean);
  const avatarIds = avatars.map(c => c.id);
  let profile = readProfile(avatarIds), dispose = () => {}, scene = 0;
  let motionPreference = null;
  try { const stored = localStorage.getItem('nexo-lobby-motion'); if (stored !== null) motionPreference = stored === 'on'; } catch { /* Session preferences still work. */ }
  const avatar = () => cards.find(c => c.id === profile.avatar) || avatars[0];
  const image = (c, cls, alt = '') => `<img class="${cls}" src="${escape(artURL(c))}" alt="${escape(alt)}" draggable="false">`;
  function profileHTML() {
    const p = progression(profile);
    return `<button class="player-chip" data-profile aria-label="Abrir perfil de ${escape(profile.name)}, nivel ${p.level}">${image(avatar(),'player-avatar')}<span class="player-chip-copy"><strong>${escape(profile.name)}</strong><small>INVOCADOR · NIVEL ${p.level}</small><span class="player-mini-xp" aria-hidden="true"><i style="width:${p.current / p.required * 100}%"></i></span></span><span class="player-level" aria-hidden="true">${p.level}</span></button>`;
  }
  function homeHTML(hasGame) {
    const c = featured[scene];
    return `<section class="lobby" aria-label="Menú principal">
      <div class="lobby-background" aria-hidden="true">${image(c,'lobby-scene is-visible')}${image(c,'lobby-scene')}<div class="lobby-shade"></div><div class="lobby-grain"></div></div>
      <div class="lobby-layout">
        <section class="lobby-menu" aria-labelledby="lobby-title"><div class="lobby-kicker"><span></span> EL PUNTO DE ENCUENTRO DE TUS UNIVERSOS</div><h1 id="lobby-title">Mundos distintos.<br><em>Tu misma leyenda.</em></h1><p class="lobby-intro">Reúne a tus héroes. Despierta su poder.<br>La próxima jugada lleva tu nombre.</p>
          <div class="lobby-options" aria-label="Opciones del juego">
            <button class="lobby-play" data-nav="${hasGame?'battle':'play'}"><span class="menu-icon">⚔</span><span><strong>${hasGame?'CONTINUAR DUELO':'JUGAR'}</strong><small>${hasGame?'Tu equipo te está esperando':'Tu próximo duelo empieza aquí'}</small></span><span class="menu-arrow">↗</span></button>
            <button class="lobby-option" data-nav="decks"><span class="menu-icon">▤</span><span><strong>Mis mazos</strong><small>Construye tu estrategia</small></span><span class="menu-arrow">↗</span></button>
            <button class="lobby-option" data-nav="gallery"><span class="menu-icon">▦</span><span><strong>Colección</strong><small>245 personajes. Infinitas combinaciones.</small></span><span class="menu-arrow">↗</span></button>
            <button class="lobby-option" data-nav="rules"><span class="menu-icon">◇</span><span><strong>Cómo jugar</strong><small>Domina el activo, la banca y la energía</small></span><span class="menu-arrow">↗</span></button>
            <button class="lobby-option" data-profile><span class="menu-icon">◉</span><span><strong>Mi perfil</strong><small>Tu avatar y tu recorrido</small></span><span class="menu-arrow">↗</span></button>
          </div><div class="lobby-mode-note"><span class="online-dot"></span> IA Y DUELO LOCAL <span>·</span> TODAS LAS CARTAS DESBLOQUEADAS</div>
        </section>
        <aside class="lobby-news" aria-labelledby="lobby-news-title"><div class="lobby-section-label"><h2 id="lobby-news-title">EN EL NEXO</h2><span>NOVEDADES Y TEMPORADA</span></div>
          <button class="season-banner" data-news="season">${image(featured[2] || c,'season-art')}<span class="season-overlay"></span><span class="season-content"><span class="season-tag">TEMPORADA <b>01</b></span><strong>MUNDOS EN<br>COLISIÓN</strong><span class="season-description">Tu historia comienza con un equipo.</span><span class="season-link">Descubrir temporada <b>↗</b></span></span><span class="season-index" aria-hidden="true">N / 01</span></button>
          <div class="lobby-small-news"><button class="news-tile" data-news="collection">${image(featured[3] || c,'news-thumb')}<span><small>COLECCIÓN</small><strong>El poder de evolucionar</strong><span>Encuentra tu siguiente forma ↗</span></span></button><button class="news-tile" data-news="guide">${image(featured[1] || c,'news-thumb')}<span><small>EMPIEZA AQUÍ</small><strong>Tu primera victoria</strong><span>Conoce las reglas de la arena ↗</span></span></button></div>
          <div class="lobby-profile-card">${profileHTML()}<div class="lobby-xp-description"><span>${profile.matches} duelos contra IA</span><span>${progression(profile).current} / 500 XP</span></div></div>
        </aside>
      </div>
      <footer class="lobby-footer"><div class="scene-credit"><span class="scene-credit-label">EN PORTADA</span><button id="scene-art">${escape(c.name)} ↗</button><small id="scene-universe">${escape(c.universe)}</small></div><div class="scene-controls" aria-label="Controles del fondo"><button id="scene-prev" aria-label="Ilustración anterior">←</button><span id="scene-count">${String(scene+1).padStart(2,'0')} / ${String(featured.length).padStart(2,'0')}</span><button id="scene-next" aria-label="Ilustración siguiente">→</button><span class="scene-divider"></span><button id="scene-motion" aria-label="Pausar fondo dinámico" aria-pressed="false">Ⅱ <span>Pausar fondo</span></button></div></footer>
    </section>`;
  }
  function mount() {
    document.querySelectorAll('[data-profile]').forEach(b => b.onclick = openProfile);
    document.querySelectorAll('[data-news]').forEach(b => b.onclick = () => openNews(b.dataset.news));
    if (!document.querySelector('.lobby')) return;
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    let paused = motionPreference === null ? media.matches : !motionPreference;
    let interval, front = 0, generation = 0, alive = true;
    const layers = [...document.querySelectorAll('.lobby-scene')];
    async function change(delta) {
      const request = ++generation;
      const next = (scene + delta + featured.length) % featured.length, c = featured[next];
      const preload = new Image(); preload.src = artURL(c);
      try { await preload.decode(); } catch { return; }
      if (!alive || request !== generation) return;
      scene = next;
      const back = 1-front;
      layers[back].src = preload.src;
      layers[back].classList.add('is-visible'); layers[front].classList.remove('is-visible'); front = back;
      document.querySelector('#scene-art').textContent = `${c.name} ↗`;
      document.querySelector('#scene-universe').textContent = c.universe;
      document.querySelector('#scene-count').textContent = `${String(scene+1).padStart(2,'0')} / ${String(featured.length).padStart(2,'0')}`;
    }
    function sync() {
      clearInterval(interval);
      const button = document.querySelector('#scene-motion');
      button.setAttribute('aria-pressed', String(paused));
      button.setAttribute('aria-label', paused ? 'Activar fondo dinámico' : 'Pausar fondo dinámico');
      button.innerHTML = paused ? '▷ <span>Activar fondo</span>' : 'Ⅱ <span>Pausar fondo</span>';
      document.querySelector('.lobby').classList.toggle('motion-paused',paused || document.hidden);
      if (!paused && !document.hidden) interval = setInterval(() => {if (!document.querySelector('dialog[open]')) void change(1);}, 9000);
    }
    document.querySelector('#scene-prev').onclick = () => {void change(-1); sync();};
    document.querySelector('#scene-next').onclick = () => {void change(1); sync();};
    document.querySelector('#scene-art').onclick = event => zoom(featured[scene].id,event.currentTarget);
    document.querySelector('#scene-motion').onclick = () => {
      paused = !paused; motionPreference = !paused;
      try {localStorage.setItem('nexo-lobby-motion',paused?'off':'on');} catch { /* Keep the session toggle. */ }
      sync();
    };
    const preferenceChanged = () => {if(motionPreference===null){paused=media.matches;sync();}};
    document.addEventListener('visibilitychange',sync); media.addEventListener('change',preferenceChanged); sync();
    dispose = () => {alive=false;generation++;clearInterval(interval);document.removeEventListener('visibilitychange',sync);media.removeEventListener('change',preferenceChanged);};
  }
  function dialogShell(className, title, markup) {
    const trigger = document.activeElement;
    const dialog = document.createElement('dialog'); dialog.className = `lobby-dialog ${className}`;
    dialog.setAttribute('aria-labelledby','lobby-dialog-title');
    dialog.innerHTML = `<button class="modal-close" aria-label="Cerrar ventana">×</button><h2 id="lobby-dialog-title">${escape(title)}</h2>${markup}`;
    document.body.append(dialog); dialog.querySelector('.modal-close').onclick = () => dialog.close();
    dialog.addEventListener('click',event=>{if(event.target!==dialog)return;const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();});
    dialog.addEventListener('close',()=>{dialog.remove();if(trigger?.isConnected)trigger.focus({preventScroll:true});},{once:true});
    dialog.showModal(); return dialog;
  }
  function openNews(id) {
    const news = announcements.find(n=>n.id===id); if(!news || document.querySelector('.lobby-dialog'))return;
    const dialog = dialogShell('announcement-dialog',news.title,`<span class="eyebrow">${escape(news.tag)}</span><h3>${escape(news.subtitle)}</h3><p>${escape(news.body)}</p><ul>${news.points.map(p=>`<li>${escape(p)}</li>`).join('')}</ul><button class="primary" id="news-action">${escape(news.action)} ↗</button>`);
    dialog.querySelector('#news-action').onclick = () => {dialog.close();navigate(news.target);};
  }
  function openProfile() {
    if(document.querySelector('.lobby-dialog'))return;
    const p = progression(profile);
    const dialog = dialogShell('profile-dialog','Tu perfil',`<div class="profile-summary">${image(avatar(),'profile-large-avatar')}<div><span class="eyebrow">INVOCADOR · NIVEL ${p.level}</span><h3>${escape(profile.name)}</h3><p>${profile.matches} duelos · ${profile.wins} victorias contra IA</p></div></div><label class="xp-label" for="player-xp">${p.current} / ${p.required} XP para el siguiente nivel</label><progress id="player-xp" value="${p.current}" max="${p.required}"></progress><p class="profile-xp-help">+120 XP por victoria y +40 XP por derrota contra la IA. El duelo local no suma experiencia. Tu progreso se guarda en este navegador.</p><form id="profile-form"><label for="player-name">Nombre de invocador</label><input id="player-name" name="name" maxlength="24" required value="${escape(profile.name)}"><fieldset><legend>Elige tu avatar</legend><div class="avatar-options">${avatars.map(c=>`<label title="${escape(c.name)}"><input type="radio" name="avatar" value="${c.id}" ${profile.avatar===c.id?'checked':''}>${image(c,'avatar-choice',c.name)}<span>${escape(c.name)}</span></label>`).join('')}</div></fieldset><p id="profile-error" role="status"></p><button class="primary" type="submit">Guardar perfil</button></form>`);
    dialog.querySelector('form').onsubmit = event => {
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      try {profile=saveProfile({...profile,name:data.get('name'),avatar:data.get('avatar')},avatarIds);}
      catch {dialog.querySelector('#profile-error').textContent='No se ha podido guardar el perfil. Comprueba el almacenamiento del navegador.';return;}
      dialog.close();refresh();document.querySelector('.player-chip')?.focus({preventScroll:true});
    };
  }
  function recordResult(won) {
    try {profile=saveProfile(matchReward(profile,won),avatarIds);}
    catch {notify('No se pudo guardar la experiencia de esta partida en el navegador.');}
  }
  return {homeHTML,profileHTML,mount,unmount:()=>{dispose();dispose=()=>{};},recordResult};
}
