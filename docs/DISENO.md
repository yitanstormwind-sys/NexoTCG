# NEXO TCG — diseño y reglamento v0.2

Esta especificación sustituye a v0.1. Referencia de gameplay: Pokémon TCG en PC. Se conservan los personajes del usuario y una interfaz propia.

## Cambios frente a v0.1

| Antes | Ahora |
|---|---|
| Nexo con 30 de salud | No hay salud de jugador; ganar por premios, ausencia de personajes o robo inicial imposible |
| 30 bases, 2 copias | 60 cartas, 4 por nombre excepto energías básicas |
| Energía automática | Cartas de energía unidas a personajes |
| Cinco atacantes equivalentes | Un activo y cinco huecos de banca |
| Alternancia tras cada acción | Turno completo; ataque o finalizar cede el turno |
| Combate simultáneo | Daño del ataque elegido, sin represalia automática |
| Evoluciones en reserva | Evoluciones dentro del mazo, jugadas desde la mano |
| Fatiga y mano máxima 10 | Derrota por robo inicial imposible; mano sin límite |

## Preparación

1. Ambos mazos tienen exactamente 60 cartas. Hasta cuatro cartas con el mismo nombre, independientemente de su ID; las energías básicas no tienen límite. Debe existir al menos un personaje básico. Las evoluciones pueden incluirse sin sus bases, aunque normalmente no podrán jugarse.
2. El ganador del sorteo elige quién juega primero. No se muestran las manos durante esa elección.
3. Cada jugador recibe siete cartas. Sin básico, devuelve toda la mano, baraja y repite. El motor registra el número de mulligans. La compensación es la diferencia positiva de mulligans del rival respecto a los propios.
4. Cada jugador elige su activo básico y opcionalmente hasta cinco básicos para su banca. Al confirmar se apartan seis cartas del mazo como premios boca abajo. El equipo rival permanece oculto durante la preparación.
5. Después de colocar activo y premios, el jugador con compensación puede robar hasta el número permitido, de una en una, añadir básicos a su banca y terminar la preparación. No puede cambiar el activo con esas cartas extra.
6. Se revelan los equipos. El jugador inicial roba una carta y comienza su primer turno.

## Turno

El jugador de turno puede realizar acciones legales en cualquier orden hasta que ataque o termine. No se cede prioridad después de bajar una carta.

- Robar una carta obligatoria al inicio. Si no puede hacerlo, pierde. Un robo provocado por un entrenador toma las disponibles y no ocasiona derrota por sí mismo.
- Poner básicos de la mano en banca, sin coste y hasta cinco.
- Unir una energía básica de la mano a cualquier personaje propio en juego; máximo una por turno. Una energía proporciona una unidad de su tipo. Permanece unida al atacar, evolucionar o pasar a banca.
- Evolucionar desde la mano sobre la siguiente fase de la misma familia. Ambos jugadores tienen prohibido evolucionar en su primer turno. El personaje debe estar en juego desde un turno anterior y no haber evolucionado ese mismo turno. Mantiene todas sus fases debajo, el daño y las energías. No paga energía para evolucionar y puede atacar tras hacerlo si cumple el coste.
- Jugar Objetos sin límite numérico, cuando su efecto tenga un objetivo legal.
- Jugar como máximo un Partidario. El jugador inicial no puede usarlo en su primer turno; el segundo sí.
- Retirarse una vez por turno: seleccionar un personaje de banca y las energías que se descartan del activo para pagar ↩. El activo conserva daño y energías restantes al ir a banca. Cambio no consume esa retirada y no exige energía.
- Atacar una vez, únicamente con el activo y contra el activo rival. Solo puede elegirse un ataque cuyos requisitos energéticos estén cubiertos. Un coste incoloro acepta cualquier energía, sin reutilizar las reservadas para costes de tipo. Atacar termina el turno. El jugador inicial no ataca en su primer turno; el segundo sí.

No hay reposo de ataque por haber entrado ese turno: el límite es la energía y la restricción inicial. No hay salud de jugador, maná automático ni contraataque.

## Daño y final de partida

Cada personaje tiene PS, de dos a tres ataques, tipo, debilidad, resistencia opcional, retirada y valor de premio. El daño se calcula con el tipo del atacante: Debilidad ×2, después Resistencia −30, mínimo cero.

Si el daño acumulado alcanza los PS, se descartan el personaje, sus fases inferiores y todas las energías. Todos los personajes de esta edición valen un premio. Si el rival se queda sin personajes en juego, la victoria es inmediata. Si conserva banca, el atacante elige uno de sus premios boca abajo y lo añade a la mano. Si ha tomado los seis gana. En otro caso, el rival elige su nuevo activo de banca y comienza su turno con el robo inicial.

La promoción es una elección del propietario del personaje, no del atacante ni automática. Los premios se eligen por posición sin revelar su contenido antes de tomarlos. Las cartas de la banca no pueden ser atacadas por los ataques actuales.

## Catálogo

245 entradas de personaje originales, 119 básicos y 126 formas superiores. 8 energías básicas: fuego, agua, rayo, planta, psíquico, lucha, oscuridad, metal. No se usa energía básica de dragón o incolora. Cuatro entrenadores propios de la implementación:

| Carta | Categoría | Efecto |
|---|---|---|
| Poción | Objeto | Cura 30 PS a un personaje propio con daño |
| Cambio | Objeto | Intercambia activo y un personaje de banca sin pagar retirada |
| Investigación | Partidario | Descarta la mano y roba hasta 7 cartas disponibles |
| Mentor | Partidario | Roba hasta 3 cartas disponibles |

Los tipos de la antigua afinidad solo sirvieron como asignación inicial. Cada familia mantiene un tipo entre formas. El catálogo conserva `source`, nombre, universo e ID; se eliminan `cost` y `attack` escalares antiguos y se añaden `attacks`, `energyType`, `weakness`, `resistance`, `retreat`, `kind` y `prizes`.

Ajustes de continuidad:

- Sayaka Venus A pasa de la etiqueta original “Forma final” a Fase 1 para formar una línea jugable de dos cartas con Aphrodite A. La línea original permanece en `source` para trazabilidad.
- Shin-chan, Hamtaro y Jibanyan mantienen alternativas de Fase 1. La Fase 2 puede colocarse sobre cualquiera de las alternativas de su familia.
- Zero de Mega Man y Zero de Code Geass siguen siendo identidades diferentes. El límite de cuatro por nombre cuenta conjuntamente cualquier carta que comparta literalmente el mismo nombre.
- Goku y Goku GT conservan líneas distintas. No se han eliminado personajes para reducir el catálogo.

Cada personaje tiene dos ataques; las formas finales tienen un tercer ataque (Sayaka conserva tres tras normalizar su etapa). Los ataques actuales solo infligen daño. Hay nombres específicos para algunas familias y nombres genéricos para las restantes; diseñar efectos exclusivos continúa siendo trabajo futuro.

## Editor, persistencia y arte

El editor muestra personajes, evoluciones, energías y entrenadores. Valida 60 cartas, límite por nombre y al menos un básico. Permite guardar, exportar/importar JSON versión 2 y adaptar versión 1 con energías y entrenadores, sin borrar el original.

Clave nueva: `nexo.decks.v2`; la clave `nexo.decks.v1` permanece intacta. La adaptación explícita conserva las 30 bases del mazo anterior y añade 20 energías repartidas según sus tipos y 10 entrenadores. El usuario puede después añadir evoluciones.

Los splash arts se importan por lotes con coincidencia única por nombre/ID o individualmente desde la ficha. Se guardan como Blob en IndexedDB, no en localStorage. Se validan formato PNG/JPEG/WebP, tamaño hasta 8 MB y decodificación. El script `scripts/import-splash-art.mjs` permite incorporar archivos a la distribución y cambiar las rutas del catálogo. Se han integrado 237 retratos reales del archivo suministrado. Quedan ocho formas sin una imagen distinta identificada; consultar INTEGRACION-ARTE.md.

## Arquitectura y límites

`engine.js` es determinista para una semilla y devuelve un estado nuevo por acción. Fases explícitas: order, setup, bonus, battle, prize, promote, finished. La UI solo ofrece acciones legales. La IA decide con su mano y la información pública; no usa la mano, el orden del mazo rival ni las identidades de los premios. Las pruebas verifican conservación exacta de las 60 cartas de cada jugador en partidas completas, contando pilas evolutivas y energías adjuntas.

Esta es la adaptación del ciclo básico, no una implementación de todas las excepciones de Pokémon TCG Live. Quedan fuera estados especiales, habilidades pasivas, Estadios, Herramientas, energías especiales y cartas ex/V con varios premios. No se incluyen online, campaña, guardado de partidas ni una reproducción visual del cliente oficial. El equilibrio requiere pruebas con personas y no se demuestra mediante victorias de una IA heurística contra sí misma.
