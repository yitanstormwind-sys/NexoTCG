# Splash arts — integración v0.2

Se recibieron 255 JPEG de 896×1200 en `todascartas.rar`. Se integraron 237 imágenes con correspondencia visual al catálogo. Se conservaron los originales en los inputs y se crearon WebP de 600×804, calidad 78, sin deformar ni recortar la composición. Ocho formas siguen pendientes y 18 imágenes corresponden a otros personajes o variantes; véase `INTEGRACION-ARTE.md`. Energías y entrenadores conservan sus SVG. La galería y la ficha muestran el retrato completo; en mano y tablero se usa un recorte de la zona superior.

## Desde el juego

1. Abrir Colección → Importar splash arts.
2. Seleccionar PNG, JPEG o WebP; máximo 8 MB por imagen.
3. El nombre sin extensión debe ser el ID de `CATALOGO.csv` o el nombre de personaje, ignorando diferencias de acentos, espacios y mayúsculas.
4. Si un nombre es ambiguo, usar el ID. Ejemplo: `mega-man-x-zero.webp` identifica a Zero de Mega Man X.
5. Para cualquier otra nomenclatura: abrir la ficha de la carta y seleccionar “Asignar splash art”; ahí se acepta cualquier nombre de archivo.

Se valida que cada imagen pueda decodificarse. Los errores se informan sin perder las imágenes que sí se han importado. Las imágenes se conservan en IndexedDB del navegador y se restauran tras recargar. No forman parte de la exportación del mazo ni se sincronizan a otro PC. Borrar los datos del sitio elimina también las imágenes importadas.

## Incluir en el código y la distribución

Extraer el ZIP en una carpeta. Desde la raíz del proyecto:

```sh
node scripts/import-splash-art.mjs /ruta/a/imagenes
npm test
npm run build
```

El script recorre subcarpetas, acepta PNG/JPG/JPEG/WebP y encuentra coincidencias únicas por ID o nombre normalizado. Copia a `public/art/personajes/{id}.{extension}` y cambia `art` en `src/cards.json`. Los nombres ambiguos, desconocidos o duplicados en el lote se informan para corregirlos; no se adivina su carta. El script copia archivos, no verifica su decodificación ni convierte formatos: revisar visualmente el resultado y utilizar la importación del navegador si se necesita validación de imagen.

## Encuadre recomendado

Mantener rostro y torso en el centro, sin marcos, números o estadísticas incrustados: esos elementos los dibuja la carta. La galería, el activo y la banca usan recortes diferentes con object-fit: cover. Mantener un máster de alta resolución y un archivo optimizado para la web. No sobrescribir los originales personales.

Campos del catálogo que no deben cambiar para sustituir arte: ID, familia, etapa, tipo, ataques, PS, debilidad, resistencia, retirada y línea de fuente. Solo cambia `art`.
