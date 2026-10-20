# Google AI Studio — NEXO TCG v0.2

Esta guía reemplaza los prompts de la edición con maná y reserva de evoluciones. Adjunta el proyecto actual, especialmente README.md, docs/DISENO.md, src/cards.json, src/engine.js, src/main.js y tests/. No uses el ZIP v0.1 como base.

## Prompt maestro

```text
Trabaja como desarrollador de juegos de cartas en NEXO TCG v0.2, web para PC en español. Conserva Vite y JavaScript modular, el catálogo de 245 personajes, las 8 energías y los 4 entrenadores. Usa los archivos adjuntos como fuente de verdad, sin inventar que has leído archivos que falten.

El gameplay sigue el ciclo básico de Pokémon TCG: mazo de 60, máximo cuatro por nombre excepto energías básicas, al menos un básico, sorteo con elección de quién empieza, mano de siete con mulligans obligatorios sin básicos, activo y banca de cinco, seis premios boca abajo. Primero se elige activo y premios; después se toma la compensación opcional por mulligans y pueden añadirse básicos a banca.

Turno completo con robo inicial. Una energía de la mano por turno a un personaje propio. Evoluciones desde la mano sobre la fase anterior, nunca en el primer turno propio ni sobre un personaje recién bajado o ya evolucionado ese turno. Conservar daño y energías. Solo ataca el activo, contra el activo rival; costes específicos e incoloros, energías no consumidas al atacar, ataque termina turno, sin contraataque automático. Primer jugador sin ataque ni Partidario en su primer turno. Objetos sin límite numérico y un Partidario por turno. Retirada una vez con selección de energías a descartar. KO descarta fases y energías, permite tomar premio y obliga al rival a elegir nuevo activo. Ganar por seis premios, rival sin personajes o robo inicial imposible.

No reintroduzcas maná automático, nexo con salud, combate simultáneo, reserva de evoluciones, mano máxima diez o mazos de treinta. Mantén dos o tres ataques por personaje. Cada personaje actual da un premio. Ya hay 237 splash arts integrados del archivo proporcionado por mí; conserva sus correspondencias en docs/SPLASH-ART-MANIFEST.json. Ocho formas siguen pendientes y 18 imágenes adicionales están documentadas en docs/INTEGRACION-ARTE.md. No sustituyas ni regeneres las ilustraciones existentes. Conserva importación por lotes/individual en IndexedDB y el script para incorporar imágenes al proyecto.

Entrega cambios completos y acotados. Ejecuta npm test y npm run build si tienes terminal y distingue resultados observados de pendientes. No declares reproducción total de Pokémon TCG Live: esta edición aún no implementa estados especiales, habilidades pasivas, Estadios, Herramientas, energías especiales ni cartas ex/V. No añadas servicios remotos ni claves API para jugar.
```

## Prompt 1 — Integrar mis splash arts

```text
Integra las imágenes que adjunto en el proyecto NEXO v0.2. Identifica cada una por el ID o nombre de carta en src/cards.json y consulta source y family para distinguir formas. No mezcles Goku con Goku GT ni Zero de universos diferentes. Si hay ambigüedad, lista las parejas candidatas y pide la correspondencia; no adivines.

Usa scripts/import-splash-art.mjs sobre la carpeta extraída o copia a public/art/personajes/{id}.{extension} actualizando solo art. Conserva los archivos originales fuera del proyecto. Verifica que todos los assets referidos existan, que el build funcione y que el recorte sea correcto en galería, ficha, activo y banca. Entrega lista de cartas con imagen, imágenes sin correspondencia y personajes aún con placeholder. No alteres mecánicas ni estadísticas en esta fase.
```

## Prompt 2 — Efectos específicos de los ataques

```text
Amplía NEXO v0.2 con efectos específicos para doce familias existentes. Antes de programar, presenta una tabla con IDs exactos, 2–3 movimientos por forma, coste energético, daño, efecto, objetivos, momento de resolución y contrajuego. Espera mi decisión sobre la tabla.

Respeta turnos completos, activo/banca, costes de energía, retirada y premios. Define explícitamente qué efectos alcanzan banca, descartan energía, curan o roban. No inventes pasivas usando la palabra ataque: separa ambas categorías si las incorporas. Para efectos aleatorios usa RNG reproducible del motor. Modela efectos con datos y funciones conocidas, nunca eval sobre JSON. Añade pruebas que cubran KO múltiple, elección de premios/promoción y conservación exacta de cartas antes de habilitar daño a banca. No cambies las otras familias sin necesidad.
```

## Prompt 3 — Extender fidelidad al reglamento

```text
Revisa el alcance implementado de NEXO v0.2 antes de ampliarlo. Propón una fase para estados especiales (Dormido, Paralizado, Confundido, Envenenado, Quemado) y comprobación entre turnos, con fuentes oficiales del reglamento y casos de empate/KO simultáneo. No presupongas que ya existe una pila de eventos o premios múltiples.

Describe cómo afectan ataque, retirada, evolución y Cambio; define el orden de comprobación y quién elige cada promoción. Después de mi aprobación, implementa una máquina de estados determinista y pruebas de regresión. No mezcles esta fase con online, rediseño gráfico o nuevos tipos de carta. Actualiza DISENO.md y la ayuda del juego para que reflejen exactamente lo implementado.
```

## Prompt 4 — Ajuste de interfaz

```text
Mejora la interfaz de NEXO TCG preservando el motor. Prioriza activo, banca, energías adjuntas, daño, ataques legales y premios. Permite ampliar cartas de la mesa y mano con teclado y ratón. Mantén visibles las razones por las que no puede usarse una carta o ataque. Usa retratos proporcionados por mí y símbolos con etiquetas, no solo colores.

Verifica que el rival no vea la mano ni el equipo durante preparación, ni los premios antes de elegirlos. En modo local, cualquier cambio de jugador debe pasar por pantalla de relevo. Mantén accesibles los diálogos con foco atrapado y retorno al cerrar. Respeta prefers-reduced-motion. Prueba escritorio 1440×900, ventana estrecha, guardado/importación de mazos e importación de imágenes. No expongas las manos ocultas en atributos DOM ni en el registro.
```

## Prompt de reparación

```text
Reproduce este fallo de NEXO TCG v0.2: [pasos, esperado, observado]. Lee los archivos implicados y corrige la causa mínima completa. Si afecta reglas, añade una regresión y verifica conservación de las 60 cartas entre mazo, mano, premios, descarte, pilas evolutivas y energías adjuntas. Conserva los mazos v1 originales y la compatibilidad de v2. No ocultes errores eliminando funciones. Informa de archivos modificados y comprobaciones realmente ejecutadas.
```
