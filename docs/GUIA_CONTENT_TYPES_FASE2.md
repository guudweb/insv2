# Guía: Crear Content Types para Fase 2

## 📋 Resumen

Esta guía te llevará paso a paso para crear **5 Content Types** en Strapi:

1. ✏️ Categoria (Collection Type - NUEVO)
2. 🎠 HeroSlide (Collection Type - NUEVO)
3. 🎯 SlideAfiliacion (Collection Type - NUEVO)
4. 📰 Noticia (Collection Type - MEJORAR EXISTENTE)
5. ⚙️ ConfiguracionInicio (Single Type - NUEVO)

**⚠️ IMPORTANTE**: Crea TODOS los Content Types antes de continuar con el código.

---

## 1️⃣ Categoria (Collection Type)

### Crear el Collection Type

1. Ve a **Content-Type Builder**
2. Haz clic en **"Create new collection type"**
3. **Display name**: `Categoria`
4. Haz clic en **"Continue"**

### Agregar Campos

#### Campo 1: nombre
- Tipo: **Text**
- Name: `nombre`
- Type: Short text
- **ADVANCED SETTINGS**:
  - ✅ Required field
  - ✅ Unique field

#### Campo 2: slug
- Tipo: **Text**
- Name: `slug`
- Type: Short text
- **ADVANCED SETTINGS**:
  - ✅ Required field
  - ✅ Unique field
  - ✅ RegExp pattern: `^[a-z0-9]+(?:-[a-z0-9]+)*$`

#### Campo 3: descripcion
- Tipo: **Text**
- Name: `descripcion`
- Type: Long text

#### Campo 4: color
- Tipo: **Text**
- Name: `color`
- Type: Short text
- **ADVANCED SETTINGS**:
  - Default value: `#007bff`

#### Campo 5: icono
- Tipo: **Text**
- Name: `icono`
- Type: Short text

#### Campo 6: activo
- Tipo: **Boolean**
- Name: `activo`
- **ADVANCED SETTINGS**:
  - Default value: `true`

### Finalizar
- Haz clic en **"Finish"**
- Haz clic en **"Save"**
- Espera que Strapi se reinicie

---

## 2️⃣ HeroSlide (Collection Type)

### Crear el Collection Type

1. Ve a **Content-Type Builder**
2. Haz clic en **"Create new collection type"**
3. **Display name**: `HeroSlide`
4. Haz clic en **"Continue"**

### Agregar Campos

#### Campo 1: titulo
- Tipo: **Text**
- Name: `titulo`
- Type: Short text

#### Campo 2: subtitulo
- Tipo: **Text**
- Name: `subtitulo`
- Type: Short text

#### Campo 3: imagen
- Tipo: **Media**
- Name: `imagen`
- Type: Single media
- Allowed types: **✅ Images** (jpg, png, webp)
- **ADVANCED SETTINGS**:
  - ✅ Required field

#### Campo 4: enlace
- Tipo: **Text**
- Name: `enlace`
- Type: Short text

#### Campo 5: textoBoton
- Tipo: **Text**
- Name: `textoBoton`
- Type: Short text

#### Campo 6: orden
- Tipo: **Number**
- Name: `orden`
- Number format: integer
- **ADVANCED SETTINGS**:
  - ✅ Required field
  - Default value: `0`

#### Campo 7: activo
- Tipo: **Boolean**
- Name: `activo`
- **ADVANCED SETTINGS**:
  - Default value: `true`

### Finalizar
- Haz clic en **"Finish"**
- Haz clic en **"Save"**
- Espera que Strapi se reinicie

---

## 3️⃣ SlideAfiliacion (Collection Type)

### Crear el Collection Type

1. Ve a **Content-Type Builder**
2. Haz clic en **"Create new collection type"**
3. **Display name**: `SlideAfiliacion`
4. Haz clic en **"Continue"**

### Agregar Campos

#### Campo 1: titulo
- Tipo: **Text**
- Name: `titulo`
- Type: Short text
- **ADVANCED SETTINGS**:
  - ✅ Required field

#### Campo 2: imagen
- Tipo: **Media**
- Name: `imagen`
- Type: Single media
- Allowed types: **✅ Images**
- **ADVANCED SETTINGS**:
  - ✅ Required field

#### Campo 3: enlace
- Tipo: **Text**
- Name: `enlace`
- Type: Short text
- **ADVANCED SETTINGS**:
  - ✅ Required field

#### Campo 4: descripcion
- Tipo: **Text**
- Name: `descripcion`
- Type: Long text

#### Campo 5: orden
- Tipo: **Number**
- Name: `orden`
- Number format: integer
- **ADVANCED SETTINGS**:
  - ✅ Required field
  - Default value: `0`

#### Campo 6: activo
- Tipo: **Boolean**
- Name: `activo`
- **ADVANCED SETTINGS**:
  - Default value: `true`

### Finalizar
- Haz clic en **"Finish"**
- Haz clic en **"Save"**
- Espera que Strapi se reinicie

---

## 4️⃣ Noticia (Collection Type) - MEJORAR EXISTENTE

**⚠️ NOTA**: Si ya tienes el Content Type "Noticia", solo AGREGA los campos nuevos. Si no existe, créalo completo.

### Si ya existe Noticia:

1. Ve a **Content-Type Builder**
2. Haz clic en **Noticia** en la lista
3. Haz clic en **"Edit"**

### Si NO existe Noticia:

1. Ve a **Content-Type Builder**
2. Haz clic en **"Create new collection type"**
3. **Display name**: `Noticia`
4. Haz clic en **"Continue"**

### Campos que debe tener (agrega los que falten):

#### Campo 1: titulo
- Tipo: **Text**
- Name: `titulo`
- Type: Short text
- **ADVANCED SETTINGS**:
  - ✅ Required field

#### Campo 2: slug
- Tipo: **Text**
- Name: `slug`
- Type: Short text
- **ADVANCED SETTINGS**:
  - ✅ Unique field

#### Campo 3: contenido
- Tipo: **Rich Text**
- Name: `contenido`

#### Campo 4: resumen
- Tipo: **Text**
- Name: `resumen`
- Type: Long text

#### Campo 5: fechaPublicacion
- Tipo: **Date**
- Name: `fechaPublicacion`
- Type: date
- **ADVANCED SETTINGS**:
  - ✅ Required field

#### Campo 6: autor
- Tipo: **Text**
- Name: `autor`
- Type: Short text

#### Campo 7: imagen
- Tipo: **Media**
- Name: `imagen`
- Type: Single media
- Allowed types: **✅ Images**

#### Campo 8: video (NUEVO)
- Tipo: **Text**
- Name: `video`
- Type: Short text

#### Campo 9: tipoMedia (NUEVO)
- Tipo: **Enumeration**
- Name: `tipoMedia`
- Values:
  - `imagen`
  - `video`
- **ADVANCED SETTINGS**:
  - Default value: `imagen`

#### Campo 10: categoria (NUEVO)
- Tipo: **Relation**
- Name: `categoria`
- Relation type: **Many-to-one**
- Configure:
  - Left: Noticia
  - Right: Categoria
  - Relation: **Noticia** (many) → **Categoria** (one)

#### Campo 11: posicion (NUEVO)
- Tipo: **Enumeration**
- Name: `posicion`
- Values:
  - `principal`
  - `lateral`
  - `ultima-hora`
  - `novedad`
- **ADVANCED SETTINGS**:
  - ✅ Required field

#### Campo 12: orden
- Tipo: **Number**
- Name: `orden`
- Number format: integer
- **ADVANCED SETTINGS**:
  - Default value: `0`

#### Campo 13: destacado
- Tipo: **Boolean**
- Name: `destacado`
- **ADVANCED SETTINGS**:
  - Default value: `false`

#### Campo 14: activo
- Tipo: **Boolean**
- Name: `activo`
- **ADVANCED SETTINGS**:
  - Default value: `true`

### Finalizar
- Haz clic en **"Finish"**
- Haz clic en **"Save"**
- Espera que Strapi se reinicie

---

## 5️⃣ ConfiguracionInicio (Single Type)

### Crear el Single Type

1. Ve a **Content-Type Builder**
2. Haz clic en **"Create new single type"**
3. **Display name**: `ConfiguracionInicio`
4. Haz clic en **"Continue"**

### Agregar Campos

#### Campo 1: tituloHero
- Tipo: **Text**
- Name: `tituloHero`
- Type: Short text
- **ADVANCED SETTINGS**:
  - Default value: `JUNTOS EN CADA ETAPA DE TU VIDA`

#### Campo 2: afiliacionTitulo
- Tipo: **Text**
- Name: `afiliacionTitulo`
- Type: Short text

#### Campo 3: afiliacionImagen
- Tipo: **Media**
- Name: `afiliacionImagen`
- Type: Single media
- Allowed types: **✅ Images**

#### Campo 4: afiliacionTexto
- Tipo: **Text**
- Name: `afiliacionTexto`
- Type: Long text

#### Campo 5: afiliacionEnlace
- Tipo: **Text**
- Name: `afiliacionEnlace`
- Type: Short text

#### Campo 6: sidebarImagenBanner
- Tipo: **Media**
- Name: `sidebarImagenBanner`
- Type: Single media
- Allowed types: **✅ Images**

#### Campo 7: sidebarCardTitulo
- Tipo: **Text**
- Name: `sidebarCardTitulo`
- Type: Short text

#### Campo 8: sidebarCardTexto
- Tipo: **Text**
- Name: `sidebarCardTexto`
- Type: Long text

#### Campo 9: videoUrl
- Tipo: **Text**
- Name: `videoUrl`
- Type: Short text

#### Campo 10: videoTitulo
- Tipo: **Text**
- Name: `videoTitulo`
- Type: Short text

#### Campo 11: videoFecha
- Tipo: **Text**
- Name: `videoFecha`
- Type: Short text

#### Campo 12: videoDescripcion
- Tipo: **Text**
- Name: `videoDescripcion`
- Type: Long text

### Finalizar
- Haz clic en **"Finish"**
- Haz clic en **"Save"**
- Espera que Strapi se reinicie

---

## ✅ Verificación

Una vez creados TODOS los Content Types, verifica:

1. **Content-Type Builder** debe mostrar:
   - COLLECTION TYPES:
     - Categoria ✅
     - HeroSlide ✅
     - Noticia ✅ (mejorado)
     - Prestacion ✅ (de Fase 1)
     - SlideAfiliacion ✅
   - SINGLE TYPES:
     - ConfiguracionInicio ✅

2. **Content Manager** debe mostrar:
   - Todas las colecciones creadas
   - ConfiguracionInicio en Single Types

---

## 🔐 Configurar Permisos (Importante)

Para que el sitio pueda acceder a los datos:

1. Ve a **Settings → Users & Permissions Plugin → Roles**
2. Haz clic en **Public**
3. Para cada Content Type, marca:
   - ✅ `find`
   - ✅ `findOne`
4. Haz clic en **Save**

---

## 🎯 Siguiente Paso

Una vez que TODOS los Content Types estén creados:

1. **Avísame** diciendo "Content Types creados"
2. Yo actualizaré el código para consultarlos
3. Luego crearemos los componentes
4. Finalmente refactorizaremos index.astro

**NO CONTINÚES** sin crear TODOS los Content Types primero.

---

**Última actualización:** 18 de noviembre de 2025
