# Plan Detallado - Fase 2: Componentes de Contenido Dinámico

## 📊 Análisis de index.astro

He identificado estos tipos de contenido en la página de inicio:

### 1. HeroCarousel (línea 9)
- **Tipo**: Carrusel de imágenes principales
- **Actual**: 7 imágenes estáticas
- **Migrar a**: Content Type `HeroSlide`

### 2. BlogSlider (línea 17)
- **Tipo**: Slider de afiliación (4 slides)
- **Actual**: Datos hardcodeados
- **Migrar a**: Content Type `SlideAfiliacion`

### 3. Sección Principal + Sidebar (líneas 22-46)
- **Tipo**: Card principal de afiliación + sidebar
- **Actual**: Contenido hardcodeado
- **Migrar a**: Single Type `ConfiguracionInicio`

### 4. NOVEDADES (líneas 52-99)
- **Tipo**: 4 cards de prestaciones destacadas
- **Actual**: Links hardcodeados
- **Opción**: Mantener hardcodeado o cargar desde Strapi prestaciones con flag `destacado`

### 5. NOTICIAS (líneas 101-124)
- **Tipo**: Video principal + 2 noticias laterales
- **Actual**: Contenido hardcodeado
- **Migrar a**: Content Type `Noticia` con posición "principal" y "lateral"

### 6. NOTICIAS DE ÚLTIMA HORA (líneas 129-172)
- **Tipo**: 3 noticias con fecha
- **Actual**: Contenido hardcodeado
- **Migrar a**: Content Type `Noticia` con posición "ultima-hora"

---

## 🎯 Lecciones Aprendidas de Fase 1

### ❌ Errores a Evitar:
1. **NO** escribir código que consulte campos antes de crearlos en Strapi
2. **NO** usar comillas dobles para strings multi-línea
3. **NO** dejar contenido hardcodeado en las páginas
4. **NO** olvidar habilitar SSR cuando sea necesario

### ✅ Mejores Prácticas:
1. **PRIMERO** crear Content Types en Strapi
2. **DESPUÉS** escribir el código que los consulta
3. **USAR** template literals (`) para strings multi-línea
4. **CREAR** componentes reutilizables
5. **VERIFICAR** que SSR esté habilitado (`prerender = false`)

---

## 📝 Orden de Ejecución (Paso a Paso)

### PASO 1: Definir Content Types (Yo)
- Crear especificación detallada de cada Content Type
- Documentar campos, tipos y relaciones

### PASO 2: Crear Content Types en Strapi (Tú)
- Seguir la guía para crear cada Content Type
- **ESPERAR** a que estén todos creados antes de continuar

### PASO 3: Actualizar strapi.ts (Yo)
- Agregar interfaces TypeScript
- Crear funciones de fetch

### PASO 4: Crear Componentes (Yo)
- NewsCard.astro
- NewsGrid.astro
- NovedadesSection.astro
- UltimaHoraSection.astro
- NewsLateralCard.astro

### PASO 5: Refactorizar index.astro (Yo)
- Reemplazar contenido hardcodeado
- Usar nuevos componentes

### PASO 6: Poblar Datos en Strapi (Tú)
- Crear script de población o hacerlo manual
- Subir imágenes

### PASO 7: Verificar y Ajustar (Nosotros)
- Probar todo
- Arreglar errores

---

## 🗂️ Content Types a Crear

### 1. Noticia (Collection Type) - **MEJORAR EXISTENTE**

```typescript
{
  // Campos básicos
  titulo: string (required)
  slug: string (unique)
  contenido: richtext
  resumen: string

  // Metadata
  fechaPublicacion: date (required)
  autor: string

  // Media
  imagen: media (single, images only)
  video: string (URL, opcional)
  tipoMedia: enum ['imagen', 'video'] (default: 'imagen')

  // Categorización
  categoria: relation → Categoria (many-to-one)
  posicion: enum ['principal', 'lateral', 'ultima-hora', 'novedad'] (required)

  // Orden y visibilidad
  orden: number (default: 0)
  destacado: boolean (default: false)
  activo: boolean (default: true)
}
```

### 2. Categoria (Collection Type) - **NUEVO**

```typescript
{
  nombre: string (required, unique)
  slug: string (required, unique)
  descripcion: text
  color: string (hex color, default: '#007bff')
  icono: string (opcional, nombre de icono)
  activo: boolean (default: true)
}
```

### 3. SlideAfiliacion (Collection Type) - **NUEVO**

```typescript
{
  titulo: string (required)
  imagen: media (single, images only, required)
  enlace: string (required)
  descripcion: string (opcional)
  orden: number (required)
  activo: boolean (default: true)
}
```

### 4. HeroSlide (Collection Type) - **NUEVO**

```typescript
{
  titulo: string (opcional)
  subtitulo: string (opcional)
  imagen: media (single, images only, required)
  enlace: string (opcional)
  textoBoton: string (opcional)
  orden: number (required)
  activo: boolean (default: true)
}
```

### 5. ConfiguracionInicio (Single Type) - **NUEVO**

```typescript
{
  // Sección Título Principal
  tituloHero: string (default: "JUNTOS EN CADA ETAPA DE TU VIDA")

  // Card Principal Afiliación
  afiliacionTitulo: string
  afiliacionImagen: media
  afiliacionTexto: text
  afiliacionEnlace: string

  // Sidebar
  sidebarImagenBanner: media
  sidebarCardTitulo: string
  sidebarCardTexto: text

  // Sección Video Principal (Noticias)
  videoUrl: string
  videoTitulo: string
  videoFecha: string
  videoDescripcion: text
}
```

---

## 🔧 Componentes a Crear

### 1. NewsCard.astro
**Props**: `noticia, showDate, showExcerpt, imageSize`
**Uso**: Card individual de noticia reutilizable

### 2. NewsGrid.astro
**Props**: `noticias, columns, showDates`
**Uso**: Grid de noticias con layout configurable

### 3. NewsLateralCard.astro
**Props**: `noticia, variant`
**Uso**: Card lateral simple (título + imagen)

### 4. UltimaHoraSection.astro
**Props**: `limit`
**Uso**: Sección de últimas noticias con fecha

### 5. NovedadesSection.astro
**Props**: `prestaciones` o usa flag `destacado`
**Uso**: Grid de 4 novedades (prestaciones)

---

## 📋 Checklist de Ejecución

- [ ] **PASO 1**: Definir Content Types completos (YO)
- [ ] **PASO 2**: Crear guía para crear Content Types en Strapi (YO)
- [ ] **PASO 3**: ESPERAR - Usuario crea Content Types en Strapi (TÚ)
- [ ] **PASO 4**: Actualizar strapi.ts con interfaces y funciones (YO)
- [ ] **PASO 5**: Crear componentes de noticias (YO)
- [ ] **PASO 6**: Refactorizar index.astro (YO)
- [ ] **PASO 7**: Crear script de población de datos (YO)
- [ ] **PASO 8**: Poblar datos en Strapi (TÚ)
- [ ] **PASO 9**: Verificar y ajustar (NOSOTROS)

---

## 🎯 Resultado Esperado

Al terminar la Fase 2:
- ✅ index.astro tendrá ~80% menos código
- ✅ Todo el contenido dinámico será editable desde Strapi
- ✅ Componentes reutilizables para todo el sitio
- ✅ Sistema de categorización y posicionamiento de noticias
- ✅ SSR habilitado para actualizaciones inmediatas

---

## ⚠️ Importante

**NO EMPEZAREMOS A CODIFICAR** hasta que:
1. Todos los Content Types estén definidos
2. Tú hayas creado todos los Content Types en Strapi
3. Yo verifique que todo está listo

Esto evitará los errores de la Fase 1 donde intentamos consultar campos que no existían.

---

**Siguiente paso:** Crear la guía detallada para crear cada Content Type en Strapi.
