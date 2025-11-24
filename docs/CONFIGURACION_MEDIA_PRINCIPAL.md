# Configuración de Media Principal en Página de Inicio

## 📋 Descripción

La sección de **NOTICIAS** en la página de inicio ahora soporta tanto videos como imágenes. Puedes configurar esto desde el panel de administración de Strapi.

## 🎯 Cómo Usar

### 1. Acceder a la Configuración

1. Inicia Strapi: `cd cms && npm run develop`
2. Accede al panel: http://localhost:1337/admin
3. Ve a **Content Manager → Configuracion Inicio** (Single Type)

### 2. Configurar Media Principal

La configuración tiene 3 campos nuevos en la sección de media principal:

#### **tipoMediaPrincipal** (requerido)
- **Opciones**: "video" o "imagen"
- **Por defecto**: "video"
- Selecciona qué tipo de contenido quieres mostrar

#### **videoArchivoPrincipal** (opcional)
- **Tipo**: Video file
- Solo se usa si `tipoMediaPrincipal = "video"`
- Sube un video MP4 directamente a Strapi
- **Prioridad**: Este video tiene prioridad sobre `videoUrl`

#### **imagenPrincipal** (opcional)
- **Tipo**: Image
- Solo se usa si `tipoMediaPrincipal = "imagen"`
- Sube una imagen (JPG, PNG, WEBP)
- **Recomendación**: Tamaño mínimo 800x450px

### 3. Campos Compartidos

Estos campos funcionan tanto para video como para imagen:

- **videoTitulo**: Título del contenido
- **videoFecha**: Fecha/hora del evento (ej: "MALABO, 26 DE JUNIO DE 2025 - 15.00 HORAS")
- **videoDescripcion**: Descripción del contenido (acepta múltiples párrafos)

## 🔄 Prioridad de Fallbacks

### Para Videos:
1. `videoArchivoPrincipal` (archivo subido a Strapi)
2. `videoUrl` (URL externa del video)
3. Video por defecto del sistema

### Para Imágenes:
1. `imagenPrincipal` (imagen subida a Strapi)
2. Sin fallback - se mostrará video si no hay imagen

## 📝 Ejemplo de Uso

### Caso 1: Mostrar una Imagen
```
tipoMediaPrincipal: "imagen"
imagenPrincipal: [Subir imagen de evento.jpg]
videoTitulo: "Inauguración Nueva Sede INSESO"
videoFecha: "MALABO, 15 DE ENERO DE 2025 - 10:00 HORAS"
videoDescripcion: "El Presidente inaugura las nuevas instalaciones..."
```

### Caso 2: Mostrar un Video Subido
```
tipoMediaPrincipal: "video"
videoArchivoPrincipal: [Subir discurso.mp4]
videoTitulo: "Mensaje del Director General"
videoFecha: "MALABO, 20 DE ENERO DE 2025 - 15:00 HORAS"
videoDescripcion: "Palabras del Director General sobre..."
```

### Caso 3: Mostrar Video de YouTube/Vimeo
```
tipoMediaPrincipal: "video"
videoUrl: "https://www.youtube.com/embed/xxxxxxxxxxx"
videoTitulo: "Conferencia de Prensa"
videoFecha: "MALABO, 25 DE ENERO DE 2025 - 11:00 HORAS"
videoDescripcion: "Conferencia sobre nuevas prestaciones..."
```

## ⚙️ Cambios Técnicos

### Archivos Modificados:
1. `/cms/src/api/configuracion-inicio/content-types/configuracion-inicio/schema.json`
   - Agregados campos: `tipoMediaPrincipal`, `videoArchivoPrincipal`, `imagenPrincipal`

2. `/src/lib/strapi.ts`
   - Actualizada interfaz `ConfiguracionInicio`
   - Actualizada función `getConfiguracionInicio()` con populate de nuevos campos

3. `/src/pages/index.astro`
   - Lógica condicional para renderizar video o imagen según `tipoMediaPrincipal`
   - Soporte para videos subidos directamente a Strapi

## 🎨 Estilos Aplicados

- **Imágenes**: `max-height: 450px` con `object-fit: cover`
- **Videos**: `max-height: 450px` con controles nativos del navegador
- Ambos son responsive y ocupan 100% del ancho disponible

## ✅ Publicación

**IMPORTANTE**: Después de configurar cualquier campo, asegúrate de hacer clic en **"Publish"** (no solo "Save") para que los cambios sean visibles en el sitio web.
