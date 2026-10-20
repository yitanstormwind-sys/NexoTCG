# NEXO TCG · Activo y banca (v0.2)

Juego web para PC en español con 245 personajes de anime y videojuegos. Esta versión sustituye el motor anterior por el ciclo básico de Pokémon TCG: activo, banca, energías adjuntas, ataques, entrenadores y premios.

## Ejecutar

Node.js 22.12+ y npm (verificado con Node 24.21.0).

```sh
npm ci
npm run dev -- --port 5173
```

Abre http://localhost:5173. `npm test` verifica el motor y los mazos; `npm run build` genera `dist/`; `npm run preview` permite comprobar el build. Sirve dist por HTTP, no mediante file://. No requiere API keys ni backend.

## Gameplay

- Mazos de 60 cartas, máximo cuatro del mismo nombre salvo energías básicas, al menos un personaje básico.
- Sorteo y elección de quién empieza; mano de 7, mulligans obligatorios si faltan básicos y compensación opcional al rival.
- Un activo y hasta cinco en banca; seis premios boca abajo.
- Una energía desde la mano por turno. Dos ataques por personaje y tres en las formas finales; costes de tipo e incoloros.
- Turnos completos: atacar termina el turno. No hay salud de jugador, maná automático ni contraataque simultáneo.
- Evoluciones desde la mano; conserva daño y energías. Restricciones de primer turno y de entrada/evolución en ese turno.
- Retirada con selección de energías a descartar, Debilidad ×2, Resistencia −30, KO y promoción elegida desde banca.
- Objetos Poción y Cambio; Partidarios Mentor e Investigación. Un Partidario por turno, excepto el primer turno del jugador inicial.
- Victoria por seis premios, rival sin personajes o imposibilidad de robar al inicio del turno.

Tres mazos preparados, IA local, duelo local con relevo, galería y editor. Los mazos v0.1 se conservan en su almacenamiento original y se pueden adaptar explícitamente a 60 cartas.

## Tus splash arts

En **Colección**, importa varias imágenes PNG/JPEG/WebP con el ID o nombre de la carta como nombre del archivo. Para un nombre ambiguo como Zero usa el ID. Cada ficha permite asignar una imagen independientemente de su nombre. Máximo 8 MB por imagen; se validan y guardan en IndexedDB de este navegador. No se incluyen automáticamente en un ZIP o en otro dispositivo.

Para incluirlas en el proyecto distribuible, extrae el ZIP de imágenes en una carpeta y ejecuta:

```sh
node scripts/import-splash-art.mjs /ruta/a/la/carpeta
npm test
npm run build
```

El script copia imágenes con coincidencia única a `public/art/personajes/` y actualiza las rutas `art`. Informa de nombres no reconocidos o ambiguos. No extrae ZIP ni transforma el formato de las imágenes. El catálogo CSV contiene los IDs. Se han integrado 237 splash arts del archivo del usuario, optimizados a WebP. Ocho formas siguen con arte provisional, pendientes de una imagen distinta o de confirmar reutilización. Las 18 imágenes adicionales (personajes fuera del catálogo o variantes) se documentan en `docs/INTEGRACION-ARTE.md`. El mapa completo y los hashes están en `docs/SPLASH-ART-MANIFEST.json`.

## Estructura

- `src/engine.js`: motor puro, acciones legales e IA que solo usa información propia/pública.
- `src/cards.json`: 245 personajes, 8 energías básicas y 4 entrenadores; 257 cartas distintas.
- `src/main.js`, `src/style.css`: interfaz y tablero, controles de ataques y energías.
- `src/storage.js`: mazos v2 y migración explícita de v1, sin borrar originales.
- `src/art.js`: imágenes locales persistentes en IndexedDB.
- `tests/engine.test.js`: reglas, conservación de cartas, partidas completas y migración.
- `docs/`: reglamento, catálogo, assets y prompts actualizados para Google AI Studio.

## Alcance real

Reproduce el ciclo básico de juego descrito, no toda la aplicación Pokémon TCG Live ni todas las excepciones de su catálogo. No hay estados especiales, habilidades pasivas, Estadios, Herramientas, energías especiales o cartas ex/V de varios premios. Los 2–3 movimientos actuales son ataques de daño; algunos nombres y presupuestos de poder siguen siendo provisionales. Todos otorgan un premio. El balance requiere partidas humanas.

No hay online, campaña ni guardado de partidas. Al recargar se pierde el duelo, pero se conservan los mazos y las imágenes importadas. El modo local oculta manos en la interfaz, no frente a inspección del estado del navegador. Las fuentes externas son opcionales y tienen sustitutas del sistema.

## Corrección de vida y ampliación

Las cartas muestran un único valor de PS (restantes en tablero). Pulsa la ilustración o «Ampliar» para verla completa; cierra con Escape, el fondo o ×. Para aplicar la corrección a una versión adaptada en Google AI Studio, utiliza `docs/CORRECCION-VIDA-Y-ZOOM-AI-STUDIO.md`, que incluye los PS originales del catálogo.

## Menú principal y perfil

Nuevo inicio con navegación a la izquierda, temporada y noticias a la derecha, fondo de splash arts con pausa y perfil local editable. Los duelos contra IA suman experiencia (120 por victoria,40 por derrota;500 por nivel). Documentación: `docs/MENU-PRINCIPAL.md`. Para tu versión de Google AI Studio: `docs/PROMPT-MENU-AI-STUDIO.md`.
