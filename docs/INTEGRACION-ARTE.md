# Integración de las ilustraciones del usuario

Archivo recibido: `todascartas.rar`, 255 imágenes JPEG de 896×1200.

## Resultado

- **237 cartas con splash art integrado** y correspondencia revisada visualmente.
- **8 cartas pendientes** de una ilustración distinta o de autorización para reutilizar la de su familia.
- **18 imágenes adicionales** de personajes no incluidos en las 245 entradas originales o variantes de una carta ya cubierta. No se han creado cartas ni cambiado las reglas para incluirlas.

La asignación no se ha realizado solo por nombre: muchos archivos tienen descripciones genéricas. Se revisaron hojas de contacto y ampliaciones de los casos dudosos. Ejemplos: el retrato del escenario teatral corresponde a Terry Actor; la figura triunfante ante una multitud corresponde a Usopp; Nodame y Chiaki incluye al director en el fondo; las dos mechas de Sayaka se distinguen por su diseño.

## Ocho formas pendientes

1. Shin-chan Marea de Kasukabe.
2. Shin-chan Niño Travieso de Kasukabe.
3. Hamtaro Capitán Ham-Ham.
4. Hamtaro Pequeño Aventurero.
5. Jibanyan Patas de la Furia.
6. Jibanyan Bestia de Fuego Fantasmal.
7. Pikachu Tacleada de Voltios.
8. Doraemon Gato Cósmico del Siglo XXII.

Mantienen sus símbolos provisionales hasta que el usuario aporte imágenes o decida reutilizar las de su familia. La ausencia de imagen no impide usar las cartas.

## Imágenes adicionales

Identificación visual propuesta, pendiente de incorporarlas a un catálogo ampliado si el usuario lo solicita:

- Gon: básico, ataque Jajanken y adulto (3).
- Deku: dos variantes (2).
- Utena: tres variantes/formas (3).
- Anya, Yor y Loid Forger (3).
- Frieren, Goblin Slayer, Edward Elric y Kenshin Himura (4).
- Vegeta y Vegeta Super Saiyan (2).
- Sakura con traje rosa y cetro de estrella, variante adicional (1).

## Trazabilidad y distribución

`SPLASH-ART-MANIFEST.json` registra cada ID, nombre del original, hash SHA-256 del JPEG, ruta y hash del WebP, dimensiones y parámetros de conversión. `CATALOGO.csv` contiene las rutas actualizadas.

Los originales permanecen en los inputs del sandbox y no se sobrescriben. La distribución contiene los WebP optimizados de las 237 cartas. Las imágenes adicionales permanecen en el archivo original; no se descartan ni se asignan a personajes distintos. La colección y los detalles conservan la composición completa; mano, portada y tablero usan recorte por espacio.
