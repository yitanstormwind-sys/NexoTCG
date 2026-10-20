# Aplicar el nuevo menú principal en Google AI Studio

Abre el chat del proyecto actual de AI Studio, adjunta este archivo y escribe: «Implementa la solicitud de este archivo en mi proyecto actual y comprueba el resultado».

El ZIP completo adjunto en la entrega contiene la implementación de referencia y todos los splash arts ya integrados. Si has personalizado tu versión de AI Studio, adapta los componentes a esa versión conservando sus cambios. No reemplaces a ciegas sus archivos por los de otra estructura.

---

## Solicitud para el agente de AI Studio

Rediseña e implementa el menú principal de NEXO TCG con estética de juego de PC premium. Trabaja sobre el código actual y conecta todos los controles a funciones reales. Conserva reglas, cartas, estadísticas, mazos y las correcciones previas de PS y ampliación de imágenes.

### Composición y arte

1. Usa todo el espacio del inicio, ocultando en esta pantalla la barra lateral antigua si duplica el menú. Cabecera con marca NEXO a la izquierda y perfil del jugador a la derecha.
2. Dos columnas en escritorio: izquierda aproximadamente55–65% para título y opciones; derecha35–45%, con ancho máximo410–450px, para temporada/anuncios. Deja espacio central para apreciar el personaje del fondo.
3. En la izquierda: frase «Mundos distintos. Tu misma leyenda.», breve subtítulo y botones verticales: Jugar, Mis mazos, Colección, Cómo jugar, Mi perfil. Jugar es el botón más grande, dorado, con icono y flecha. Si hay duelo en curso muestra Continuar duelo y permite retomarlo. Los demás botones tienen paneles oscuros translúcidos y textos secundarios. Utiliza solo opciones y modos que existen en el proyecto.
4. Derecha: encabezado EN EL NEXO; banner con splash art, «TEMPORADA01», título «MUNDOS EN COLISIÓN» y enlace Descubrir temporada. Debajo, dos noticias: «El poder de evolucionar» y «Tu primera victoria». Añade un resumen de perfil con XP. Los anuncios abren un diálogo con título, descripción, puntos destacados y botón hacia mazos, colección o reglas, respectivamente. Su contenido es editorial local y configurable: no inventes eventos online, premios, tienda, cuenta atrás o clasificación.
5. Colores: fondo#080b12, paneles azul oscuro translúcido, dorado suave#d5bd8e para acción principal y temporada, detalles violeta de NEXO, textos blancos y gris claro. Bordes finos, radios6–10px, sombras discretas. Tipografía Space Grotesk para titulares y DM Sans para lectura, con fallback local. No uses blur fuerte que oculte los splash arts ni destellos rápidos.

### Fondo dinámico

- Reutiliza las ilustraciones ya incluidas y el resolvedor de arte del proyecto, incluyendo los overrides de IndexedDB. No generes imágenes nuevas ni dependas de enlaces de Drive para cargar el fondo en ejecución.
- Selección sugerida por nombre/ID: Goku Ultra instinto (`dragon-ball-z-goku-ultra-instinto`), Cloud Strife (`final-fantasy-cloud-strife`), Sora Forma Definitiva (`kingdom-hearts-sora-forma-definitiva`), X Armadura Definitiva (`mega-man-x-x-armadura-definitiva`). Si el esquema actual utiliza otros IDs, resuelve por el nombre exacto. Evita cartas sin ilustración real.
- Dos capas de imagen con object-fit:cover, rostro encuadrado aproximadamente50%28%, fundido suave1.6s cada9s y desplazamiento/zoom muy lento. Precarga la próxima imagen y conserva la actual si falla. Coloca degradados oscuros fuertes bajo el menú y más ligeros en el centro.
- Pie con nombre/universo del personaje, anterior, siguiente, contador01/04 y pausa/activar. El nombre abre el visor de arte existente.
- La pausa debe detener también el movimiento continuo. Guarda la preferencia; sin preferencia explícita respeta prefers-reduced-motion. Detén las animaciones CSS con movimiento reducido y permite navegación manual. Suspende cambios automáticos cuando haya diálogos abiertos o pestaña oculta.
- Limpia temporizadores/listeners al desmontar el inicio. Las cargas pendientes no deben modificar otra pantalla. No reconstruyas toda la app para cambiar una imagen ni perder el foco del usuario.

### Perfil funcional

- Muestra avatar, nombre, NIVEL1 inicial y una barra deXP real. Pulsar el perfil abre su edición con nombre hasta24 caracteres, selector de ocho avatares existentes, nivel,XP y estadísticas de duelos contraIA.
- Guarda en una clave propia (`nexo-player-v1`) sin tocar las claves de mazos o IndexedDB. Valida campos al leer; recupera un perfil inicial ante datos corruptos y muestra error si guardar falla. Escapa nombres al generarHTML.
- Regla deXP local: +120 por victoria y +40 por derrota contraIA, incluida rendición. Cada500XP sube un nivel: floor(XP/500)+1; progreso XP%500. Cuenta cada resultado exactamente una vez, también cuando se renderiza varias veces la pantalla final; reinicia el indicador al crear una nueva partida. El modo de dos jugadores locales no sumaXP. Conserva nombre/avatar al actualizar estadísticas.
- Identifica estos datos como progreso de este navegador. No simules cuentas de servidor, sincronización ni clasificación online.

### Adaptación y accesibilidad

- En1280×720 deben caber opciones y controles principales sin recorte. Ajusta altura de banner, espaciado y títulos en portátiles de poca altura.
- Por debajo de760px cambia a una columna: menú primero y noticias después. Conserva nombre/nivel/avatar en cabecera y evita desbordamiento horizontal desde390px.
- Diálogos con nombre accesible, foco controlado, cierre mediante×, Escape y fondo, y retorno de foco. El fondo decorativo debe tener aria-hidden y no capturar clics; botones con nombres claros y foco visible.
- Mantén operativo el clic para ampliar splash arts y el único valor de PS correcto de cada carta.

### Verificación y entrega

Ejecuta la compilación y prueba en navegador: las cinco opciones; los tres anuncios y sus acciones; edición/recarga de perfil;XP y nivel; una sola recompensa por partida y ninguna en duelo local; rotación automática y manual; pausa persistente; movimiento reducido; limpieza al navegar; vista1440×1000,1280×720 y390×844; galería y ampliación de arte. Informa solo de comprobaciones realmente realizadas y de cualquier limitación.

Implementa el cambio en los archivos actuales, incluyendo estilos y datos configurables de anuncios. Usa el proyecto de referencia como guía si se ha adjuntado. No entregues únicamente un boceto ni botones sin eventos.
