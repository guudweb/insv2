# Migración INSESO a Astro + Strapi

Documentación del proceso de migración y refactorización del sitio web INSESO.org a Astro con integración de Strapi CMS.

---

## 📊 Estado del Proyecto

### ✅ FASE 1: COMPONENTES Y PRESTACIONES (COMPLETADA)

#### Componentes Creados
- ✅ `Breadcrumb.astro` - Navegación de migas de pan reutilizable
- ✅ `PartnersCarousel.astro` - Carousel de logos de socios
- ✅ `PrestacionesGrid.astro` - Grid de prestaciones con integración Strapi
- ✅ `PrestacionLayout.astro` - Layout reutilizable para páginas de prestaciones

#### Integración con Strapi
- ✅ Content Type `Prestacion` configurado con 9 prestaciones
- ✅ Funciones en `strapi.ts`:
  - `getPrestaciones()` - Obtiene todas las prestaciones
  - `getPrestacionBySlug()` - Obtiene prestación por slug
  - `richTextToPlainText()` - Convierte Rich Text a texto plano
  - `getStrapiImageUrl()` - Obtiene URL completa de imágenes

#### Páginas Refactorizadas (9 prestaciones)
- ✅ Prestaciones_Médico_Farmacéuticas
- ✅ Subsidio_de_incapacidad_temporal
- ✅ Subsidio_por_maternidad
- ✅ Prestaciones_por_invalidez
- ✅ Pensión_por_vejez
- ✅ Prestaciones_por_muerte_y_supervivencia
- ✅ Protección_al_empleo
- ✅ Subsidios_familiares
- ✅ Servicios_sociales

#### Rutas Dinámicas
- ✅ `/prestacion/[slug].astro` - Genera páginas automáticamente para nuevas prestaciones

#### Configuración
- ✅ Modo `hybrid` en `astro.config.mjs`
- ✅ SSR habilitado en páginas de prestaciones (`prerender = false`)
- ✅ Script `populate-prestaciones.js` para poblar datos iniciales

#### Resultados
- **Reducción de código:** ~1,872 líneas → ~179 líneas (**-90%**)
- **Mantenibilidad:** Contenido editable desde Strapi sin tocar código
- **Escalabilidad:** Nuevas prestaciones se crean automáticamente

---

## 📋 FASE 2: COMPONENTES DE CONTENIDO DINÁMICO (PENDIENTE)

### Componentes a Crear

#### Componentes de Noticias
- [ ] `NewsCard.astro` - Tarjeta individual de noticia
- [ ] `NewsGrid.astro` - Grid de noticias con layout configurable
- [ ] `NovedadesSection.astro` - Sección de novedades (4 cards)
- [ ] `UltimaHoraSection.astro` - Sección noticias última hora (3 cards con fecha)
- [ ] `NewsLateralCard.astro` - Tarjeta lateral de noticias

#### Componentes de UI
- [ ] `Card.astro` - Componente de tarjeta genérico
- [ ] `CardGrid.astro` - Grid genérico de tarjetas
- [ ] `SidebarCard.astro` - Tarjeta para sidebars
- [ ] `ContactBanner.astro` - Banner "Contacte con nosotros"
- [ ] `VideoSection.astro` - Sección de video destacado

### Content Types de Strapi

#### Noticia (mejorar existente)
```typescript
{
  titulo: string
  slug: string
  contenido: richtext
  resumen: string
  fechaPublicacion: date
  autor: string
  imagen: media
  categoria: relation → Categoria
  posicion: enum ['destacada', 'lateral', 'ultima-hora', 'novedad']
  orden: number
  destacado: boolean
  activo: boolean
}
```

#### Categoria (nuevo)
```typescript
{
  nombre: string
  slug: string
  descripcion: string
  color: string
}
```

#### Socio/Partner (nuevo)
```typescript
{
  nombre: string
  logo: media
  url: string
  orden: number
  activo: boolean
}
```

#### SlideAfiliacion (nuevo)
```typescript
{
  titulo: string
  imagen: media
  enlace: string
  orden: number
  activo: boolean
}
```

#### HeroSlide (nuevo)
```typescript
{
  titulo: string
  descripcion: string
  imagen: media
  enlace: string
  textoBoton: string
  orden: number
  activo: boolean
}
```

### Páginas a Refactorizar
- [ ] `index.astro` - Página de inicio
  - Usar `NovedadesSection` para sección de novedades
  - Usar `NewsGrid` para noticias principales
  - Usar `UltimaHoraSection` para última hora
  - Cargar HeroSlides desde Strapi
  - Cargar SlideAfiliacion desde Strapi

### Single Types de Strapi
- [ ] `ConfiguracionInicio` - Textos configurables de la página de inicio

---

## 🎯 FASE 3: OPTIMIZACIÓN Y FINALIZACIÓN (PENDIENTE)

### ⚙️ Preparación de ImagenDetalle

**Estado del código:** ✅ COMPLETADO

El código ya está 100% preparado para usar imágenes de detalle desde Strapi:
- ✅ Interface `Prestacion` incluye campo `imagenDetalle`
- ✅ Funciones `getPrestaciones()` y `getPrestacionBySlug()` populan `imagenDetalle`
- ✅ `PrestacionLayout.astro` usa `imagenDetalle` con fallback inteligente
- ✅ Guía completa de configuración en [GUIA_IMAGENDETALLE.md](GUIA_IMAGENDETALLE.md)

**Falta solo configuración en Strapi** (no requiere código, solo panel admin):

### Tareas Pendientes

#### Strapi
- [ ] Agregar campo `imagenDetalle` al Content Type Prestacion *(ver [GUIA_IMAGENDETALLE.md](GUIA_IMAGENDETALLE.md))*
- [ ] Subir imágenes `prestaciones_detail_01.jpg` a `_09.jpg` *(ver [GUIA_IMAGENDETALLE.md](GUIA_IMAGENDETALLE.md))*
- ✅ Actualizar `strapi.ts` para incluir `imagenDetalle` en populate
- [ ] Configurar permisos de Strapi adecuadamente
- [ ] Configurar webhooks para rebuild automático (opcional)

#### Componentes Adicionales
- [ ] Migrar `BlogSlider` a componente dinámico con Strapi
- [ ] Migrar `HeroCarousel` a componente dinámico con Strapi
- [ ] Crear componente para formulario de contacto

#### Páginas Restantes
- [ ] `sobre_nosotros.astro`
- [ ] `contacto.astro`
- [ ] `afiliacion_*` (múltiples páginas)
- [ ] `información_*` (múltiples páginas)

#### Optimización
- [ ] Optimizar imágenes (WebP, lazy loading)
- [ ] Implementar caché de Strapi
- [ ] Mejorar SEO (meta tags, sitemap)
- [ ] Pruebas de rendimiento
- [ ] Configurar CDN para imágenes de Strapi

#### Documentación
- [ ] Documentar estructura de Content Types
- [ ] Guía de uso para editores de contenido
- [ ] Guía de despliegue

---

## 🚀 Uso Actual

### Editar Contenido de Prestaciones

1. Ir a **Strapi → Content Manager → Prestacion**
2. Seleccionar prestación a editar
3. Modificar campos:
   - **titulo**: Título de la prestación
   - **descripcion** (Rich Text): Descripción principal
   - **requisitos** (Text): Lista de requisitos (usar `-` para viñetas)
   - **imagen**: Imagen para el card en el grid
   - **orden**: Orden de aparición (1-9+)
   - **activo**: Activar/desactivar prestación
4. **Guardar y Publicar**
5. Recargar página → Cambios visibles inmediatamente

### Crear Nueva Prestación

1. **Strapi → Content Manager → Prestacion → Create new entry**
2. Completar todos los campos
3. **slug** se genera automáticamente
4. **Guardar y Publicar**
5. La prestación aparece automáticamente en `/prestacion/[slug]`

---

## 📁 Estructura del Proyecto

```
src/
├── components/
│   ├── Breadcrumb.astro          ✅ Navegación breadcrumb
│   ├── PartnersCarousel.astro    ✅ Carousel de socios
│   ├── PrestacionesGrid.astro    ✅ Grid de prestaciones
│   ├── BlogSlider.astro          🔄 Migrar a Strapi
│   ├── HeroCarousel.astro        🔄 Migrar a Strapi
│   ├── Navbar.astro
│   ├── Footer.astro
│   └── TopBar.astro
│
├── layouts/
│   ├── BaseLayout.astro
│   └── PrestacionLayout.astro    ✅ Layout para prestaciones
│
├── pages/
│   ├── index.astro               🔄 Pendiente refactorizar
│   ├── Prestaciones_Sociales.astro ✅
│   ├── prestacion/
│   │   └── [slug].astro          ✅ Ruta dinámica
│   └── [9 páginas de prestaciones] ✅
│
├── lib/
│   └── strapi.ts                 ✅ Funciones de integración
│
└── scripts/
    └── populate-prestaciones.js  ✅ Script de población inicial
```

---

## 🔧 Configuración

### Variables de Entorno
```env
STRAPI_URL=http://localhost:1337
```

### Astro Config
```js
export default defineConfig({
  output: 'hybrid',  // Permite SSR + Static
  // ...
});
```

### Páginas SSR
Todas las páginas de prestaciones tienen:
```astro
export const prerender = false;  // Habilita SSR
```

---

## 📝 Notas Técnicas

### Formato de Requisitos en Strapi
Para que los requisitos se muestren como lista:
```
- Primer requisito
- Segundo requisito
- Tercer requisito
```

### Rich Text vs Text
- **descripcion**: Rich Text (soporta formato, negritas, etc.)
- **requisitos**: Text Long (texto plano con saltos de línea)

### URLs de Prestaciones
- **Prestaciones originales**: `/Pensión_por_vejez`, `/Subsidios_familiares`, etc.
- **Prestaciones nuevas**: `/prestacion/nombre-slug`

---

## 🎯 Próximos Pasos Recomendados

1. **Completar campo imagenDetalle en Strapi**
   - Permitirá imágenes diferentes para card vs página detalle

2. **Migrar Noticias a Strapi (Fase 2)**
   - Content Type con campo `posicion` para categorizar
   - Componentes reutilizables para diferentes layouts

3. **Refactorizar página de inicio (Fase 2)**
   - Integrar componentes de noticias
   - Cargar todo desde Strapi

4. **Optimizar imágenes (Fase 3)**
   - Convertir a WebP
   - Implementar lazy loading

5. **Documentación para editores (Fase 3)**
   - Guía de uso de Strapi
   - Mejores prácticas de contenido

---

## 📊 Métricas de Mejora

- **Código duplicado eliminado:** 90%
- **Tiempo de actualización de contenido:** De horas → segundos
- **Páginas refactorizadas:** 9/24 páginas (37.5%)
- **Componentes reutilizables creados:** 4
- **Content Types en Strapi:** 1 (Prestacion)

---

**Última actualización:** 18 de noviembre de 2025
**Estado:** Fase 1 completada ✅ | Fase 2 pendiente 🔄 | Fase 3 pendiente ⏳
