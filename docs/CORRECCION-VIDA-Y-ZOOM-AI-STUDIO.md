# Corrección de PS y ampliación de ilustraciones — NEXO TCG

## Cómo aplicarlo
En el chat del proyecto ACTUAL de Google AI Studio, pega el contenido desde «Solicitud» hasta el final. También puedes adjuntar este archivo y escribir: «Aplica la solicitud del archivo al proyecto actual y comprueba su funcionamiento».

## Solicitud
Implementa estas correcciones en los archivos actuales de mi app NEXO TCG. Entrega los cambios funcionales en el proyecto.

### 1. Vida correcta y cabecera compacta
- La colección muestra erróneamente valores como 5000/5000 PS. Usa un solo número de PS del catálogo original que incluyo abajo. X debe mostrar 70 PS, X Armadura Falcon 110 PS, X Armadura Definitiva 150 PS, Zero 70 PS, Omega Zero 110 PS y Jin Kazama 70 PS.
- Restaura el campo numérico de salud máxima de cada personaje desde este catálogo, relacionando por ID o por nombre exacto si los IDs han cambiado. El motor de daño, curación, evolución y KO debe utilizar ese mismo campo. No escondas una escala incorrecta dividiendo solo el texto mostrado. No dividas todos los valores por 100: los PS originales están incluidos.
- En colección, constructor y mano: mostrar PS máximos. En activo y banca: mostrar max(0, PS máximos − daño acumulado). Adapta la fórmula si el motor guarda directamente los PS actuales. Nunca restes el daño dos veces.
- Sin formato actual/máximo, decimales, separadores innecesarios ni abreviaturas tipo 5K. Usa «70 PS».
- Mantén etapa, PS y afinidad legibles sin solapamiento. Para PS utiliza white-space: nowrap, flex-shrink: 0 y font-variant-numeric: tabular-nums; ajusta el espacio disponible y mueve la afinidad a otra fila si es necesario. Nunca trunques el número. Energías y entrenadores no tienen PS.
- Conserva ataques, costes y otras propiedades actuales. No sobrescribas las ilustraciones importadas ni borres mazos o IndexedDB. Si hay partidas guardadas con la escala antigua, invalida solo esa partida con un aviso en lugar de reanudar datos incompatibles.

### 2. Ampliación real
- Pulsar cualquier ilustración o el botón existente «Ampliar» debe abrir el MISMO visor de la imagen seleccionada. Conecta ambos eventos a una función real; no dejes botones sin manejador.
- Utiliza la fuente de arte resuelta por el proyecto, incluyendo imágenes personalizadas de IndexedDB y su fallback. No reconstruyas rutas por el nombre del personaje.
- Muestra la ilustración completa, centrada y sin recortes: object-fit: contain, tamaño máximo aproximado 94vw/94dvh y fondo oscurecido. Incluye nombre de carta y botón de cerrar visible.
- Funciona en colección, constructor, ficha, mano, activo y banca, también cuando se abre desde otra ventana de detalle. El visor debe quedar por encima de esa ventana y cerrarse sin perderla.
- Cerrar con botón, Escape o clic en el fondo; pulsar la imagen no cierra. Gestiona el foco, navegación con teclado y retorno al control que lo abrió. Usa dialog nativo o un portal equivalente con accesibilidad y limpieza de eventos.
- Separar el control de imagen de las acciones de añadir al mazo, jugar, atacar o evolucionar. Abrir el visor nunca ejecuta una acción de partida.
- Manejar carga fallida con un mensaje y permitir siempre cerrar.

### 3. Comprobar antes de terminar
Comprueba compilación y, en navegador: PS originales en colección; PS restantes tras recibir daño/curarse/evolucionar; imagen y botón Ampliar; arte personalizado; ficha con visor encima; cierre con Escape/fondo/botón; añadir al mazo sin abrir visor; pantalla estrecha sin solapamientos. Informa de los archivos modificados y de las comprobaciones realmente realizadas.

## Catálogo original de PS (ID, nombre, PS máximos)
Los siguientes datos son valores numéricos de juego, no texto decorativo:

```json
[
  {
    "id": "mega-man-x-x",
    "nombre": "X",
    "PS": 70
  },
  {
    "id": "mega-man-x-x-armadura-falcon",
    "nombre": "X Armadura Falcon",
    "PS": 110
  },
  {
    "id": "mega-man-x-x-armadura-definitiva",
    "nombre": "X Armadura Definitiva",
    "PS": 150
  },
  {
    "id": "mega-man-x-zero",
    "nombre": "Zero",
    "PS": 70
  },
  {
    "id": "mega-man-x-omega-zero",
    "nombre": "Omega Zero",
    "PS": 110
  },
  {
    "id": "tekken-jin-kazama",
    "nombre": "Jin Kazama",
    "PS": 70
  },
  {
    "id": "tekken-devil-jin",
    "nombre": "Devil Jin",
    "PS": 110
  },
  {
    "id": "tekken-kazuya-mishima",
    "nombre": "Kazuya Mishima",
    "PS": 70
  },
  {
    "id": "tekken-kazuya-mishima-gen-diablo",
    "nombre": "Kazuya Mishima Gen Diablo",
    "PS": 110
  },
  {
    "id": "tekken-kazuya-mishima-demonio-pleno",
    "nombre": "Kazuya Mishima Demonio Pleno",
    "PS": 150
  },
  {
    "id": "tekken-hwoarang",
    "nombre": "Hwoarang",
    "PS": 70
  },
  {
    "id": "tekken-yoshimitsu",
    "nombre": "Yoshimitsu",
    "PS": 70
  },
  {
    "id": "jojo-s-bizarre-adventure-dio-brando",
    "nombre": "Dio Brando",
    "PS": 70
  },
  {
    "id": "jojo-s-bizarre-adventure-dio-brando-vampiro",
    "nombre": "Dio Brando Vampiro",
    "PS": 110
  },
  {
    "id": "jojo-s-bizarre-adventure-dio-the-world",
    "nombre": "DIO \"The World\"",
    "PS": 150
  },
  {
    "id": "jojo-s-bizarre-adventure-joseph-joestar",
    "nombre": "Joseph Joestar",
    "PS": 70
  },
  {
    "id": "jojo-s-bizarre-adventure-joseph-joestar-hermit-purple",
    "nombre": "Joseph Joestar Hermit Purple",
    "PS": 110
  },
  {
    "id": "jojo-s-bizarre-adventure-giorno-giovanna",
    "nombre": "Giorno Giovanna",
    "PS": 70
  },
  {
    "id": "jojo-s-bizarre-adventure-giorno-giovanna-gold-experience",
    "nombre": "Giorno Giovanna Gold Experience",
    "PS": 110
  },
  {
    "id": "jojo-s-bizarre-adventure-gold-experience-requiem",
    "nombre": "Gold Experience Requiem",
    "PS": 150
  },
  {
    "id": "jojo-s-bizarre-adventure-jolyne-kujo",
    "nombre": "Jolyne Kujo",
    "PS": 70
  },
  {
    "id": "jojo-s-bizarre-adventure-jolyne-kujo-stone-free",
    "nombre": "Jolyne Kujo Stone Free",
    "PS": 110
  },
  {
    "id": "jojo-s-bizarre-adventure-josuke-higashikata",
    "nombre": "Josuke Higashikata",
    "PS": 70
  },
  {
    "id": "jojo-s-bizarre-adventure-josuke-higashikata-crazy-diamond",
    "nombre": "Josuke Higashikata Crazy Diamond",
    "PS": 110
  },
  {
    "id": "jojo-s-bizarre-adventure-kira-yoshikage",
    "nombre": "Kira Yoshikage",
    "PS": 70
  },
  {
    "id": "jojo-s-bizarre-adventure-vinegar-doppio",
    "nombre": "Vinegar Doppio",
    "PS": 70
  },
  {
    "id": "jojo-s-bizarre-adventure-diavolo",
    "nombre": "Diavolo",
    "PS": 110
  },
  {
    "id": "busou-renkin-kazuki-muto",
    "nombre": "Kazuki Muto",
    "PS": 70
  },
  {
    "id": "gaogaigar-gai-shishioh-piloto-de-gaogaigar",
    "nombre": "Gai Shishioh Piloto de GaoGaiGar",
    "PS": 70
  },
  {
    "id": "gaogaigar-gai-shishioh-piloto-del-genesic-gaogaigar",
    "nombre": "Gai Shishioh Piloto del Genesic GaoGaiGar",
    "PS": 110
  },
  {
    "id": "mazinger-koji-kabuto-piloto-del-mazinger-z",
    "nombre": "Koji Kabuto Piloto del Mazinger Z",
    "PS": 70
  },
  {
    "id": "mazinger-koji-kabuto-piloto-del-mazinkaiser",
    "nombre": "Koji Kabuto Piloto del Mazinkaiser",
    "PS": 110
  },
  {
    "id": "mazinger-sayaka-yumi-piloto-del-aphrodite-a",
    "nombre": "Sayaka Yumi Piloto del Aphrodite A",
    "PS": 70
  },
  {
    "id": "mazinger-sayaka-yumi-piloto-del-venus-a",
    "nombre": "Sayaka Yumi Piloto del Venus A",
    "PS": 150
  },
  {
    "id": "saint-seiya-seiya",
    "nombre": "Seiya",
    "PS": 70
  },
  {
    "id": "saint-seiya-seiya-armadura-de-oro-de-sagitario",
    "nombre": "Seiya Armadura de Oro de Sagitario",
    "PS": 110
  },
  {
    "id": "saint-seiya-seiya-armadura-divina-de-pegaso",
    "nombre": "Seiya Armadura Divina de Pegaso",
    "PS": 150
  },
  {
    "id": "fullmetal-alchemist-alphonse-elric",
    "nombre": "Alphonse Elric",
    "PS": 70
  },
  {
    "id": "fullmetal-alchemist-roy-mustang",
    "nombre": "Roy Mustang",
    "PS": 70
  },
  {
    "id": "final-fantasy-yitan-tribal",
    "nombre": "Yitan Tribal",
    "PS": 70
  },
  {
    "id": "final-fantasy-yitan-tribal-trance",
    "nombre": "Yitan Tribal Trance",
    "PS": 110
  },
  {
    "id": "final-fantasy-garnet",
    "nombre": "Garnet",
    "PS": 70
  },
  {
    "id": "final-fantasy-garnet-trance",
    "nombre": "Garnet Trance",
    "PS": 110
  },
  {
    "id": "final-fantasy-vivi-ornitier",
    "nombre": "Vivi Ornitier",
    "PS": 70
  },
  {
    "id": "final-fantasy-vivi-ornitier-trance",
    "nombre": "Vivi Ornitier Trance",
    "PS": 110
  },
  {
    "id": "final-fantasy-cloud-strife",
    "nombre": "Cloud Strife",
    "PS": 70
  },
  {
    "id": "final-fantasy-sephiroth",
    "nombre": "Sephiroth",
    "PS": 70
  },
  {
    "id": "final-fantasy-sephiroth-jenova",
    "nombre": "Sephiroth Jenova",
    "PS": 110
  },
  {
    "id": "final-fantasy-sephiroth-ascendido",
    "nombre": "Sephiroth Ascendido",
    "PS": 150
  },
  {
    "id": "final-fantasy-vincent-valentine",
    "nombre": "Vincent Valentine",
    "PS": 70
  },
  {
    "id": "final-fantasy-vincent-valentine-galian-beast",
    "nombre": "Vincent Valentine Galian Beast",
    "PS": 110
  },
  {
    "id": "final-fantasy-vincent-valentine-chaos",
    "nombre": "Vincent Valentine Chaos",
    "PS": 150
  },
  {
    "id": "final-fantasy-cait-sith",
    "nombre": "Cait Sith",
    "PS": 70
  },
  {
    "id": "final-fantasy-tifa-lockhart",
    "nombre": "Tifa Lockhart",
    "PS": 70
  },
  {
    "id": "kingdom-hearts-sora",
    "nombre": "Sora",
    "PS": 70
  },
  {
    "id": "kingdom-hearts-sora-forma-maestra",
    "nombre": "Sora Forma Maestra",
    "PS": 110
  },
  {
    "id": "kingdom-hearts-sora-forma-definitiva",
    "nombre": "Sora Forma Definitiva",
    "PS": 150
  },
  {
    "id": "kingdom-hearts-riku",
    "nombre": "Riku",
    "PS": 70
  },
  {
    "id": "kingdom-hearts-riku-posesion-de-ansem",
    "nombre": "Riku Posesión de Ansem",
    "PS": 110
  },
  {
    "id": "kingdom-hearts-riku-maestro-de-la-llave-espada",
    "nombre": "Riku Maestro de la Llave Espada",
    "PS": 150
  },
  {
    "id": "kingdom-hearts-kairi",
    "nombre": "Kairi",
    "PS": 70
  },
  {
    "id": "kingdom-hearts-ansem-buscador-de-la-oscuridad",
    "nombre": "Ansem Buscador de la Oscuridad",
    "PS": 70
  },
  {
    "id": "kingdom-hearts-ansem-guardian-del-corazon",
    "nombre": "Ansem Guardián del Corazón",
    "PS": 110
  },
  {
    "id": "kingdom-hearts-xemnas",
    "nombre": "Xemnas",
    "PS": 70
  },
  {
    "id": "kingdom-hearts-xemnas-rey-de-los-incorporeos",
    "nombre": "Xemnas Rey de los Incorporeos",
    "PS": 110
  },
  {
    "id": "kingdom-hearts-xemnas-armadura-del-vacio",
    "nombre": "Xemnas Armadura del Vacío",
    "PS": 150
  },
  {
    "id": "kingdom-hearts-roxas",
    "nombre": "Roxas",
    "PS": 70
  },
  {
    "id": "kingdom-hearts-roxas-doble-llave-espada",
    "nombre": "Roxas Doble Llave Espada",
    "PS": 110
  },
  {
    "id": "kingdom-hearts-roxas-corazon-propio",
    "nombre": "Roxas Corazón Propio",
    "PS": 150
  },
  {
    "id": "dragon-ball-goku-gt",
    "nombre": "Goku GT",
    "PS": 70
  },
  {
    "id": "dragon-ball-goku-gt-super-saiyan",
    "nombre": "Goku GT Super Saiyan",
    "PS": 110
  },
  {
    "id": "dragon-ball-goku-gt-super-saiyan-4",
    "nombre": "Goku GT Super Saiyan 4",
    "PS": 150
  },
  {
    "id": "dragon-ball-trunks",
    "nombre": "Trunks",
    "PS": 70
  },
  {
    "id": "dragon-ball-trunks-super-saiyan",
    "nombre": "Trunks Super Saiyan",
    "PS": 110
  },
  {
    "id": "dragon-ball-gohan",
    "nombre": "Gohan",
    "PS": 70
  },
  {
    "id": "dragon-ball-gohan-super-saiyan-2",
    "nombre": "Gohan Super Saiyan 2",
    "PS": 110
  },
  {
    "id": "dragon-ball-gohan-poder-definitivo",
    "nombre": "Gohan Poder Definitivo",
    "PS": 150
  },
  {
    "id": "dragon-ball-pan",
    "nombre": "Pan",
    "PS": 70
  },
  {
    "id": "one-piece-zoro",
    "nombre": "Zoro",
    "PS": 70
  },
  {
    "id": "one-piece-zoro-ashura",
    "nombre": "Zoro Ashura",
    "PS": 110
  },
  {
    "id": "one-piece-zoro-rey-del-infierno",
    "nombre": "Zoro Rey del Infierno",
    "PS": 150
  },
  {
    "id": "one-piece-sanji",
    "nombre": "Sanji",
    "PS": 70
  },
  {
    "id": "one-piece-sanji-soba-mask",
    "nombre": "Sanji Soba Mask",
    "PS": 110
  },
  {
    "id": "one-piece-sanji-ifrit-jambe",
    "nombre": "Sanji Ifrit Jambe",
    "PS": 150
  },
  {
    "id": "one-piece-nami",
    "nombre": "Nami",
    "PS": 70
  },
  {
    "id": "one-piece-nami-clima-tact",
    "nombre": "Nami Clima-Tact",
    "PS": 110
  },
  {
    "id": "one-piece-nami-portadora-de-zeus",
    "nombre": "Nami Portadora de Zeus",
    "PS": 150
  },
  {
    "id": "one-piece-chopper",
    "nombre": "Chopper",
    "PS": 70
  },
  {
    "id": "one-piece-chopper-rumble-ball",
    "nombre": "Chopper Rumble Ball",
    "PS": 110
  },
  {
    "id": "one-piece-chopper-monster-point",
    "nombre": "Chopper Monster Point",
    "PS": 150
  },
  {
    "id": "one-piece-usopp",
    "nombre": "Usopp",
    "PS": 70
  },
  {
    "id": "one-piece-usopp-sogeking",
    "nombre": "Usopp Sogeking",
    "PS": 110
  },
  {
    "id": "one-piece-usopp-dios-de-los-francotiradores",
    "nombre": "Usopp Dios de los Francotiradores",
    "PS": 150
  },
  {
    "id": "code-geass-lelouch-lamperouge",
    "nombre": "Lelouch Lamperouge",
    "PS": 70
  },
  {
    "id": "code-geass-zero",
    "nombre": "Zero",
    "PS": 110
  },
  {
    "id": "code-geass-lelouch-vi-britannia-emperador-de-britannia",
    "nombre": "Lelouch vi Britannia Emperador de Britannia",
    "PS": 150
  },
  {
    "id": "code-geass-suzaku-kururugi",
    "nombre": "Suzaku Kururugi",
    "PS": 70
  },
  {
    "id": "code-geass-suzaku-kururugi-caballero",
    "nombre": "Suzaku Kururugi Caballero",
    "PS": 110
  },
  {
    "id": "slayers-lina-inverse",
    "nombre": "Lina Inverse",
    "PS": 70
  },
  {
    "id": "slayers-gourry-gabriev",
    "nombre": "Gourry Gabriev",
    "PS": 70
  },
  {
    "id": "naruto-sasuke",
    "nombre": "Sasuke",
    "PS": 70
  },
  {
    "id": "naruto-sasuke-sello-maldito-nivel-2",
    "nombre": "Sasuke Sello Maldito Nivel 2",
    "PS": 110
  },
  {
    "id": "naruto-sasuke-rinnegan",
    "nombre": "Sasuke Rinnegan",
    "PS": 150
  },
  {
    "id": "naruto-sakura",
    "nombre": "Sakura",
    "PS": 70
  },
  {
    "id": "naruto-sakura-discipula-de-tsunade",
    "nombre": "Sakura Discípula de Tsunade",
    "PS": 110
  },
  {
    "id": "naruto-sakura-sello-de-los-cien",
    "nombre": "Sakura Sello de los Cien",
    "PS": 150
  },
  {
    "id": "naruto-kakashi",
    "nombre": "Kakashi",
    "PS": 70
  },
  {
    "id": "naruto-kakashi-ninja-copia",
    "nombre": "Kakashi Ninja Copia",
    "PS": 110
  },
  {
    "id": "naruto-kakashi-sexto-hokage",
    "nombre": "Kakashi Sexto Hokage",
    "PS": 150
  },
  {
    "id": "one-piece-monkey-d-luffy",
    "nombre": "Monkey D. Luffy",
    "PS": 70
  },
  {
    "id": "one-piece-monkey-d-luffy-gear-4",
    "nombre": "Monkey D. Luffy Gear 4",
    "PS": 110
  },
  {
    "id": "one-piece-monkey-d-luffy-gear-5",
    "nombre": "Monkey D. Luffy Gear 5",
    "PS": 150
  },
  {
    "id": "naruto-naruto-uzumaki",
    "nombre": "Naruto Uzumaki",
    "PS": 70
  },
  {
    "id": "naruto-naruto-modo-sabio",
    "nombre": "Naruto Modo Sabio",
    "PS": 110
  },
  {
    "id": "naruto-naruto-baryon",
    "nombre": "Naruto Baryon",
    "PS": 150
  },
  {
    "id": "dragon-ball-z-goku",
    "nombre": "Goku",
    "PS": 70
  },
  {
    "id": "dragon-ball-z-goku-super-saiyan",
    "nombre": "Goku Super Saiyan",
    "PS": 110
  },
  {
    "id": "dragon-ball-z-goku-ultra-instinto",
    "nombre": "Goku Ultra instinto",
    "PS": 150
  },
  {
    "id": "bleach-ichigo-kurosaki-shinigami-sustituto",
    "nombre": "Ichigo Kurosaki Shinigami Sustituto",
    "PS": 70
  },
  {
    "id": "bleach-ichigo-bankai",
    "nombre": "Ichigo Bankai",
    "PS": 110
  },
  {
    "id": "bleach-ichigo-mugetsu",
    "nombre": "Ichigo Mugetsu",
    "PS": 150
  },
  {
    "id": "demon-slayer-tanjiro-kamado",
    "nombre": "Tanjiro Kamado",
    "PS": 70
  },
  {
    "id": "demon-slayer-tanjiro-respiracion-solar",
    "nombre": "Tanjiro Respiración Solar",
    "PS": 110
  },
  {
    "id": "ace-attorney-phoenix-wright",
    "nombre": "Phoenix Wright",
    "PS": 70
  },
  {
    "id": "ace-attorney-maya-fey",
    "nombre": "Maya Fey",
    "PS": 70
  },
  {
    "id": "ace-attorney-maya-fey-invocadora",
    "nombre": "Maya Fey Invocadora",
    "PS": 110
  },
  {
    "id": "ace-attorney-maya-fey-maestra-espiritista",
    "nombre": "Maya Fey Maestra Espiritista",
    "PS": 150
  },
  {
    "id": "ace-attorney-pearl-fey",
    "nombre": "Pearl Fey",
    "PS": 70
  },
  {
    "id": "ace-attorney-miles-edgeworth",
    "nombre": "Miles Edgeworth",
    "PS": 70
  },
  {
    "id": "ace-attorney-franziska-von-karma",
    "nombre": "Franziska von Karma",
    "PS": 70
  },
  {
    "id": "ace-attorney-apollo-justice",
    "nombre": "Apollo Justice",
    "PS": 70
  },
  {
    "id": "ace-attorney-trucy-wright",
    "nombre": "Trucy Wright",
    "PS": 70
  },
  {
    "id": "devil-may-cry-dante",
    "nombre": "Dante",
    "PS": 70
  },
  {
    "id": "devil-may-cry-dante-devil-trigger",
    "nombre": "Dante Devil Trigger",
    "PS": 110
  },
  {
    "id": "devil-may-cry-nero",
    "nombre": "Nero",
    "PS": 70
  },
  {
    "id": "devil-may-cry-nero-devil-trigger",
    "nombre": "Nero Devil Trigger",
    "PS": 110
  },
  {
    "id": "devil-may-cry-vergil",
    "nombre": "Vergil",
    "PS": 70
  },
  {
    "id": "devil-may-cry-lady",
    "nombre": "Lady",
    "PS": 70
  },
  {
    "id": "devil-may-cry-trish",
    "nombre": "Trish",
    "PS": 70
  },
  {
    "id": "devilman-akira-fudo",
    "nombre": "Akira Fudo",
    "PS": 70
  },
  {
    "id": "devilman-devilman",
    "nombre": "Devilman",
    "PS": 110
  },
  {
    "id": "devilman-ryo-asuka",
    "nombre": "Ryo Asuka",
    "PS": 70
  },
  {
    "id": "devilman-ryo-asuka-angel-caido",
    "nombre": "Ryo Asuka Ángel Caído",
    "PS": 110
  },
  {
    "id": "persona-joker",
    "nombre": "Joker",
    "PS": 70
  },
  {
    "id": "persona-ann-takamaki",
    "nombre": "Ann Takamaki",
    "PS": 70
  },
  {
    "id": "persona-yu-narukami",
    "nombre": "Yu Narukami",
    "PS": 70
  },
  {
    "id": "persona-makoto-yuki",
    "nombre": "Makoto Yuki",
    "PS": 70
  },
  {
    "id": "evangelion-asuka-langley",
    "nombre": "Asuka Langley",
    "PS": 70
  },
  {
    "id": "evangelion-asuka-langley-piloto-del-eva-02",
    "nombre": "Asuka Langley Piloto del EVA-02",
    "PS": 110
  },
  {
    "id": "evangelion-asuka-langley-unidad-02-mejorada",
    "nombre": "Asuka Langley Unidad 02 Mejorada",
    "PS": 150
  },
  {
    "id": "evangelion-rei-ayanami",
    "nombre": "Rei Ayanami",
    "PS": 70
  },
  {
    "id": "evangelion-rei-ayanami-tercera-replica",
    "nombre": "Rei Ayanami Tercera Réplica",
    "PS": 110
  },
  {
    "id": "evangelion-rei-ayanami-lilith-despierta",
    "nombre": "Rei Ayanami Lilith Despierta",
    "PS": 150
  },
  {
    "id": "evangelion-kaworu-nagisa",
    "nombre": "Kaworu Nagisa",
    "PS": 70
  },
  {
    "id": "evangelion-kaworu-nagisa-el-angel-tabris",
    "nombre": "Kaworu Nagisa El Ángel Tabris",
    "PS": 110
  },
  {
    "id": "evangelion-kaworu-nagisa-piloto-del-eva-13",
    "nombre": "Kaworu Nagisa Piloto del EVA-13",
    "PS": 150
  },
  {
    "id": "berserk-guts",
    "nombre": "Guts",
    "PS": 70
  },
  {
    "id": "berserk-guts-halcon-dorado",
    "nombre": "Guts Halcón Dorado",
    "PS": 110
  },
  {
    "id": "berserk-guts-con-armadura-berserker",
    "nombre": "Guts con Armadura Berserker",
    "PS": 150
  },
  {
    "id": "death-note-light-yagami",
    "nombre": "Light Yagami",
    "PS": 70
  },
  {
    "id": "tokyo-ghoul-ken-kaneki",
    "nombre": "Ken Kaneki",
    "PS": 70
  },
  {
    "id": "attack-on-titan-eren-jaeger",
    "nombre": "Eren Jaeger",
    "PS": 70
  },
  {
    "id": "attack-on-titan-eren-titan-de-ataque",
    "nombre": "Eren Titán de Ataque",
    "PS": 110
  },
  {
    "id": "attack-on-titan-eren-titan-fundador-el-retumbar",
    "nombre": "Eren Titán Fundador: El Retumbar",
    "PS": 150
  },
  {
    "id": "madoka-magica-madoka",
    "nombre": "Madoka",
    "PS": 70
  },
  {
    "id": "madoka-magica-madoka-despertar-milagroso",
    "nombre": "Madoka Despertar Milagroso",
    "PS": 110
  },
  {
    "id": "madoka-magica-diosa-madoka-suprema",
    "nombre": "Diosa Madoka Suprema",
    "PS": 150
  },
  {
    "id": "ghost-in-the-shell-motoko-kusanagi",
    "nombre": "Motoko Kusanagi",
    "PS": 70
  },
  {
    "id": "ghost-in-the-shell-motoko-inmersion-en-la-red",
    "nombre": "Motoko Inmersión en la Red",
    "PS": 110
  },
  {
    "id": "jojo-s-bizarre-adventure-jotaro-kujo",
    "nombre": "Jotaro Kujo",
    "PS": 70
  },
  {
    "id": "jojo-s-bizarre-adventure-jotaro-star-platinum",
    "nombre": "Jotaro Star Platinum",
    "PS": 110
  },
  {
    "id": "neon-genesis-evangelion-shinji-ikari",
    "nombre": "Shinji Ikari",
    "PS": 70
  },
  {
    "id": "neon-genesis-evangelion-eva-01-modo-berserk",
    "nombre": "EVA-01 Modo Berserk",
    "PS": 110
  },
  {
    "id": "one-punch-man-saitama",
    "nombre": "Saitama",
    "PS": 70
  },
  {
    "id": "cutie-honey-honey-kisaragi",
    "nombre": "Honey Kisaragi",
    "PS": 70
  },
  {
    "id": "cutie-honey-cutie-honey",
    "nombre": "Cutie Honey",
    "PS": 110
  },
  {
    "id": "k-on-yui-hirasawa",
    "nombre": "Yui Hirasawa",
    "PS": 70
  },
  {
    "id": "k-on-mio-akiyama",
    "nombre": "Mio Akiyama",
    "PS": 70
  },
  {
    "id": "k-on-ritsu-tainaka",
    "nombre": "Ritsu Tainaka",
    "PS": 70
  },
  {
    "id": "k-on-tsumugi-kotobuki",
    "nombre": "Tsumugi Kotobuki",
    "PS": 70
  },
  {
    "id": "k-on-azusa-nakano",
    "nombre": "Azusa Nakano",
    "PS": 70
  },
  {
    "id": "candy-candy-candy",
    "nombre": "Candy",
    "PS": 70
  },
  {
    "id": "candy-candy-candy-aprendiz-del-hogar-pony",
    "nombre": "Candy Aprendiz del Hogar Pony",
    "PS": 110
  },
  {
    "id": "candy-candy-terry-grandchester",
    "nombre": "Terry Grandchester",
    "PS": 70
  },
  {
    "id": "candy-candy-terry-grandchester-actor-de-teatro",
    "nombre": "Terry Grandchester Actor de Teatro",
    "PS": 110
  },
  {
    "id": "sailor-moon-usagi-tsukino",
    "nombre": "Usagi Tsukino",
    "PS": 70
  },
  {
    "id": "sailor-moon-sailor-moon-cetro-lunar",
    "nombre": "Sailor Moon Cetro Lunar",
    "PS": 110
  },
  {
    "id": "sailor-moon-princesa-serenity",
    "nombre": "Princesa Serenity",
    "PS": 150
  },
  {
    "id": "cardcaptor-sakura-sakura-cazadora-de-cartas",
    "nombre": "Sakura Cazadora de Cartas",
    "PS": 70
  },
  {
    "id": "cardcaptor-sakura-sakura-maestra-clear-card",
    "nombre": "Sakura Maestra Clear Card",
    "PS": 110
  },
  {
    "id": "ebichu-ebichu",
    "nombre": "Ebichu",
    "PS": 70
  },
  {
    "id": "yakuza-kazuma-kiryu",
    "nombre": "Kazuma Kiryu",
    "PS": 70
  },
  {
    "id": "yakuza-kazuma-kiryu-cuarto-chairman-del-clan-tojo",
    "nombre": "Kazuma Kiryu Cuarto Chairman del Clan Tojo",
    "PS": 110
  },
  {
    "id": "yakuza-kazuma-kiryu-leyenda-de-kamurocho",
    "nombre": "Kazuma Kiryu Leyenda de Kamurocho",
    "PS": 150
  },
  {
    "id": "yakuza-goro-majima",
    "nombre": "Goro Majima",
    "PS": 70
  },
  {
    "id": "yakuza-goro-majima-perro-rabioso-de-shimano",
    "nombre": "Goro Majima Perro Rabioso de Shimano",
    "PS": 110
  },
  {
    "id": "yakuza-goro-majima-patriarca-de-la-construccion",
    "nombre": "Goro Majima Patriarca de la Construcción",
    "PS": 150
  },
  {
    "id": "yakuza-ichiban-kasuga",
    "nombre": "Ichiban Kasuga",
    "PS": 70
  },
  {
    "id": "yakuza-ichiban-kasuga-heroe-de-ijincho",
    "nombre": "Ichiban Kasuga Héroe de Ijincho",
    "PS": 110
  },
  {
    "id": "yakuza-ichiban-kasuga-sonador-imparable",
    "nombre": "Ichiban Kasuga Soñador Imparable",
    "PS": 150
  },
  {
    "id": "gto-eikichi-onizuka",
    "nombre": "Eikichi Onizuka",
    "PS": 70
  },
  {
    "id": "nana-nana-osaki",
    "nombre": "Nana Osaki",
    "PS": 70
  },
  {
    "id": "nana-nana-osaki-maestra-del-punk",
    "nombre": "Nana Osaki Maestra del Punk",
    "PS": 110
  },
  {
    "id": "nana-nana-reina-del-rock",
    "nombre": "Nana Reina del Rock",
    "PS": 150
  },
  {
    "id": "nodame-cantabile-megumi-noda",
    "nombre": "Megumi Noda",
    "PS": 70
  },
  {
    "id": "nodame-cantabile-nodame-concierto-filarmonico",
    "nombre": "Nodame Concierto Filarmónico",
    "PS": 110
  },
  {
    "id": "nodame-cantabile-nodame-chiaki-sinfonia-de-amor",
    "nombre": "Nodame & Chiaki Sinfonía de Amor",
    "PS": 150
  },
  {
    "id": "pokemon-red",
    "nombre": "Red",
    "PS": 70
  },
  {
    "id": "pokemon-blue",
    "nombre": "Blue",
    "PS": 70
  },
  {
    "id": "pokemon-riolu",
    "nombre": "Riolu",
    "PS": 70
  },
  {
    "id": "pokemon-lucario",
    "nombre": "Lucario",
    "PS": 110
  },
  {
    "id": "pokemon-mega-lucario",
    "nombre": "Mega Lucario",
    "PS": 150
  },
  {
    "id": "pokemon-brock",
    "nombre": "Brock",
    "PS": 70
  },
  {
    "id": "pokemon-misty",
    "nombre": "Misty",
    "PS": 70
  },
  {
    "id": "pokemon-ash-ketchum",
    "nombre": "Ash Ketchum",
    "PS": 70
  },
  {
    "id": "pokemon-ash-retador-de-la-liga",
    "nombre": "Ash Retador de la Liga",
    "PS": 110
  },
  {
    "id": "pokemon-ash-campeon-del-mundo",
    "nombre": "Ash Campeón del Mundo",
    "PS": 150
  },
  {
    "id": "pokemon-pikachu",
    "nombre": "Pikachu",
    "PS": 70
  },
  {
    "id": "medabots-metabee",
    "nombre": "Metabee",
    "PS": 70
  },
  {
    "id": "medabots-rokusho",
    "nombre": "Rokusho",
    "PS": 70
  },
  {
    "id": "digimon-agumon",
    "nombre": "Agumon",
    "PS": 70
  },
  {
    "id": "digimon-greymon",
    "nombre": "Greymon",
    "PS": 110
  },
  {
    "id": "digimon-wargreymon",
    "nombre": "WarGreymon",
    "PS": 150
  },
  {
    "id": "detective-conan-conan-edogawa",
    "nombre": "Conan Edogawa",
    "PS": 70
  },
  {
    "id": "detective-conan-conan-gadgets-del-profesor",
    "nombre": "Conan Gadgets del Profesor",
    "PS": 110
  },
  {
    "id": "detective-conan-shinichi-kudo-detective-renacido",
    "nombre": "Shinichi Kudo Detective Renacido",
    "PS": 150
  },
  {
    "id": "yu-gi-oh-yugi-muto",
    "nombre": "Yugi Muto",
    "PS": 70
  },
  {
    "id": "yu-gi-oh-yami-yugi",
    "nombre": "Yami Yugi",
    "PS": 110
  },
  {
    "id": "yu-gi-oh-atem-faraon",
    "nombre": "Atem Faraón",
    "PS": 150
  },
  {
    "id": "crayon-shin-chan-shin-chan",
    "nombre": "Shin-chan",
    "PS": 70
  },
  {
    "id": "crayon-shin-chan-shin-chan-marea-de-kasukabe",
    "nombre": "Shin-chan Marea de Kasukabe",
    "PS": 110
  },
  {
    "id": "hamtaro-hamtaro",
    "nombre": "Hamtaro",
    "PS": 70
  },
  {
    "id": "hamtaro-hamtaro-capitan-ham-ham",
    "nombre": "Hamtaro Capitán Ham-Ham",
    "PS": 110
  },
  {
    "id": "yo-kai-watch-jibanyan",
    "nombre": "Jibanyan",
    "PS": 70
  },
  {
    "id": "yo-kai-watch-jibanyan-s",
    "nombre": "Jibanyan S",
    "PS": 110
  },
  {
    "id": "doraemon-doraemon",
    "nombre": "Doraemon",
    "PS": 70
  },
  {
    "id": "attack-on-titan-capitan-levi-ackerman",
    "nombre": "Capitán Levi Ackerman",
    "PS": 70
  },
  {
    "id": "crayon-shin-chan-shin-chan-nino-travieso-de-kasukabe",
    "nombre": "Shin-chan Niño Travieso de Kasukabe",
    "PS": 110
  },
  {
    "id": "crayon-shin-chan-shin-chan-y-el-ejercito-de-kasukabe",
    "nombre": "Shin-chan y el Ejército de Kasukabe",
    "PS": 150
  },
  {
    "id": "hamtaro-hamtaro-pequeno-aventurero",
    "nombre": "Hamtaro Pequeño Aventurero",
    "PS": 110
  },
  {
    "id": "hamtaro-capitan-hamtaro-navegante",
    "nombre": "Capitán Hamtaro Navegante",
    "PS": 150
  },
  {
    "id": "yo-kai-watch-jibanyan-patas-de-la-furia",
    "nombre": "Jibanyan Patas de la Furia",
    "PS": 110
  },
  {
    "id": "yo-kai-watch-jibanyan-bestia-de-fuego-fantasmal",
    "nombre": "Jibanyan Bestia de Fuego Fantasmal",
    "PS": 150
  },
  {
    "id": "pokemon-pikachu-tacleada-de-voltios",
    "nombre": "Pikachu Tacleada de Voltios",
    "PS": 110
  },
  {
    "id": "doraemon-doraemon-gato-cosmico-del-siglo-xxii",
    "nombre": "Doraemon Gato Cósmico del Siglo XXII",
    "PS": 110
  }
]
```
