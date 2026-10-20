# NEXO · Nuevo menú principal

## Referencias y criterio

Consulta de webs oficiales: 19 de octubre de 2026. Referencias representativas de TCG para PC, no una auditoría de todos los juegos ni de cada cliente instalado. Las webs respondieron HTTP200; no se verificaron mediante sesión los menús actuales de sus clientes. Los criterios de diseño combinan sus enfoques de producto con patrones habituales del género.

| Referencia | Criterio aplicado en NEXO |
| --- | --- |
| [Pokémon TCG Live](https://www.pokemon.com/us/pokemon-tcg/pokemon-tcg-live) | Acceso directo al duelo, los mazos y la colección. |
| [Hearthstone](https://hearthstone.blizzard.com/en-us/) | Una acción principal reconocible y anuncios con espacio propio. |
| [Magic: The Gathering Arena](https://magic.wizards.com/en/mtgarena) | Separación entre navegación, contenido de novedades y perfil. |
| [Yu-Gi-Oh! Master Duel](https://www.konami.com/yugioh/masterduel/us/en/) | Protagonismo de la ilustración y panel informativo del juego. |
| [Marvel Snap](https://www.marvelsnap.com/) | Identidad visual de temporada y progreso visible. |

## Composición

- Cabecera: marca NEXO y perfil con avatar, nombre, nivel y barra de experiencia.
- Izquierda: título del universo, Jugar (o Continuar duelo), Mis mazos, Colección, Cómo jugar y Mi perfil. Cada opción lleva a una función existente.
- Derecha: anuncio principal «Temporada 01 · Mundos en colisión», dos noticias secundarias y resumen del perfil. Cada anuncio abre una ficha con una acción hacia mazos, colección o reglas.
- Fondo: cuatro splash arts de personajes destacados, movimiento lento y transición entre imágenes cada nueve segundos. Oscurecimiento por capas para preservar el contraste del texto. Controles de anterior, siguiente, pausa y ampliación de la ilustración actual.
- Pantallas estrechas: una columna, primero opciones y después novedades; cabecera conserva perfil. Portátiles de 1280×720: distribución compacta para que el menú completo quepa en pantalla.

## Dirección artística

Azul casi negro, paneles translúcidos, acentos dorados para Jugar y temporada, violeta para identidad NEXO. Las ilustraciones existentes aportan el color. Se evita llenar la interfaz de indicadores o monedas sin función. El fondo utiliza el mismo resolvedor de arte que la colección, incluidas las imágenes personalizadas de IndexedDB.

## Comportamiento implementado

- El perfil local admite nombre de hasta24 caracteres y ocho avatares de personajes. Guarda datos en `nexo-player-v1`, separado de los mazos y las imágenes.
- Nivel inicial1; cada500XP sube un nivel. Las victorias contra IA dan120XP y las derrotas40XP, incluidas rendiciones. Solo registra cada resultado una vez durante la partida en memoria. El duelo local no sumaXP. El progreso es acumulado, sin reinicio por temporada.
- No hay cuentas de servidor ni sincronización entre dispositivos. Una partida nueva empieza al recargar porque no se ha añadido guardado de partidas.
- La preferencia de movimiento se conserva en `nexo-lobby-motion`. Si no hay preferencia explícita, se respeta `prefers-reduced-motion`. Las animaciones CSS se desactivan con esa preferencia incluso si se activa manualmente el cambio de imágenes.
- La rotación automática se suspende con la pestaña oculta o un diálogo abierto. Al salir del inicio se elimina su temporizador y los eventos; las imágenes pendientes no actualizan otra página.
- Las noticias son contenido editorial de esta edición local: no simulan eventos de servidor, fechas de temporada, clasificación, recompensas o compras. Se editan en `announcements` de `src/lobby.js`.
- La selección de imágenes de portada y avatares también se configura en `src/lobby.js`. Los formularios muestran un error si el navegador no permite guardar el perfil.

## Archivos

- `src/lobby.js`: inicio, noticias, perfil y controlador del fondo.
- `src/profile.js`: validación, almacenamiento y experiencia local.
- `src/main.js`: montaje, navegación y registro de resultados contraIA.
- `src/style.css`: diseño y adaptación a tamaños y preferencias de movimiento.
- `tests/profile.test.js`: datos corruptos, almacenamiento, recompensas y cambio de nivel.

El motor de combate, catálogo de cartas, mazos y arte conservan su implementación previa.
