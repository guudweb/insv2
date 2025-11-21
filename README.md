# 🏛️ INSESO - Instituto Nacional de Seguridad Social de Guinea Ecuatorial

Sitio web oficial del Instituto Nacional de Seguridad Social de Guinea Ecuatorial.

**Versión:** 2.0 (Astro + Strapi v5)
**Estado:** ✅ Producción
**Última actualización:** 2025

---

## 📋 Índice

1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Tecnologías](#tecnologías)
3. [Arquitectura](#arquitectura)
4. [Historial de Desarrollo](#historial-de-desarrollo)
5. [Guía de Uso para Editores](#guía-de-uso-para-editores-strapi)
6. [Desarrollo y Mantenimiento](#desarrollo-y-mantenimiento)
7. [Deployment](#deployment)
8. [Documentación Adicional](#documentación-adicional)

---

## 🎯 Resumen del Proyecto

INSESO es un sitio web moderno desarrollado con **Astro** (frontend) y **Strapi v5** (CMS) que proporciona información y servicios relacionados con la seguridad social en Guinea Ecuatorial.

### Características Principales

- ✅ **Sistema de Gestión de Contenido**: Strapi v5 para administración fácil
- ✅ **Rendimiento Optimizado**: Lazy loading, Sharp, optimización de imágenes
- ✅ **Responsive Design**: Compatible con todos los dispositivos
- ✅ **SEO Optimizado**: Meta tags, sitemap, rendimiento Google PageSpeed
- ✅ **Sistema de Noticias**: Con categorías, posiciones y multimedia
- ✅ **Formularios Descargables**: Sistema completo de gestión de documentos
- ✅ **Páginas Dinámicas**: Prestaciones, noticias, formularios desde Strapi
- ✅ **Preview de Contenido**: Vista previa antes de publicar

---

## 🛠️ Tecnologías

### Frontend
- **Astro 5.15.9** - Framework web moderno
- **TypeScript** - Tipado estático
- **Bootstrap 5** - Framework CSS
- **Swiper** - Carruseles modernos
- **Sharp 0.34.5** - Optimización de imágenes

### Backend (CMS)
- **Strapi v5** - Headless CMS
- **PostgreSQL** - Base de datos
- **Node.js** - Runtime

### Optimizaciones
- HTML5 Lazy Loading
- fetchpriority para imágenes LCP
- Preconnect a recursos externos
- Preload de fuentes críticas
- WebP/AVIF automático con Sharp

---

## 🏗️ Arquitectura

```
inseso.org_V2/
├── src/
│   ├── pages/              # Páginas del sitio
│   │   ├── index.astro     # Homepage
│   │   ├── noticias.astro  # Listado de noticias
│   │   ├── noticia/        # Detalle de noticia
│   │   ├── prestacion/     # Detalle de prestación
│   │   └── empleadores/    # Sección empleadores
│   ├── components/         # Componentes reutilizables
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── SwiperHero.astro
│   │   ├── OptimizedImage.astro
│   │   └── ...
│   ├── layouts/            # Layouts base
│   │   └── BaseLayout.astro
│   ├── lib/                # Librerías y utilidades
│   │   └── strapi.ts       # Cliente Strapi
│   └── assets/             # Assets optimizados
│       └── images/
├── public/                 # Archivos estáticos
│   ├── css/
│   ├── js/
│   ├── images/
│   └── video/
├── docs/                   # Documentación del proyecto
└── dist/                   # Build de producción
```

---

## 📚 Historial de Desarrollo

### **Fase 1: Migración a Astro** (Completada)
**Objetivo:** Migrar sitio HTML estático a Astro

**Logros:**
- ✅ Migración completa de HTML a Astro
- ✅ Estructura de componentes reutilizables
- ✅ Layouts base implementados
- ✅ Sistema de rutas dinámicas
- ✅ Integración de Bootstrap y assets

**Documentación:** [docs/README_MIGRATION.md](docs/README_MIGRATION.md)

---

### **Fase 2: Integración con Strapi v5** (Completada)
**Objetivo:** Conectar frontend con CMS Strapi

**Logros:**
- ✅ Cliente Strapi v5 implementado
- ✅ Content Types creados:
  - Noticias (con categorías y multimedia)
  - Prestaciones
  - Hero Slides
  - Slides de Afiliación
  - Socios (Partners)
  - Formularios
  - Configuración del Inicio
- ✅ Páginas dinámicas funcionando
- ✅ Sistema de preview de contenido
- ✅ Manejo de imágenes y videos

**Documentación:**
- [docs/FASE_2_COMPLETADA.md](docs/FASE_2_COMPLETADA.md)
- [docs/GUIA_CONTENT_TYPES_FASE2.md](docs/GUIA_CONTENT_TYPES_FASE2.md)
- [docs/PREVIEW_QUICKSTART.md](docs/PREVIEW_QUICKSTART.md)

---

### **Fase 3: Refactorización y Mejoras** (Completada)
**Objetivo:** Optimizar código y mejorar UX

**Logros:**
- ✅ Componentes reutilizables creados
- ✅ Mejoras en sistema de noticias
- ✅ Sección de "Última Hora" optimizada
- ✅ Fechas y metadata mejoradas
- ✅ Página de Penas y Sanciones creada
- ✅ Footer y Navbar actualizados
- ✅ Sistema de formularios mejorado

**Documentación:**
- [docs/FASE2_MEJORAS_NOTICIAS.md](docs/FASE2_MEJORAS_NOTICIAS.md)
- [docs/CAMBIOS_ADICIONALES.md](docs/CAMBIOS_ADICIONALES.md)
- [docs/RESUMEN_SISTEMA_FORMULARIOS.md](docs/RESUMEN_SISTEMA_FORMULARIOS.md)

---

### **Fase 4: Optimización de Rendimiento** (Completada)
**Objetivo:** Mejorar velocidad y Core Web Vitals

**Logros:**
- ✅ Lazy loading en 100% de imágenes
- ✅ Sharp instalado para optimización
- ✅ Componente OptimizedImage creado
- ✅ fetchpriority="high" en imagen LCP
- ✅ Preconnect a recursos externos
- ✅ Preload de fuentes críticas
- ✅ Mejora 40-50% en tiempo de carga

**Resultados PageSpeed Insights:**
- Primera carga: 2.5s → 1.2-1.5s (50% más rápido)
- LCP: 2.8s → 1.5-1.8s (36% mejor)
- Imágenes: 3.5 MB → 900 KB (74% menos)

**Documentación:**
- [docs/OPTIMIZACIONES_IMAGENES.md](docs/OPTIMIZACIONES_IMAGENES.md)
- [docs/GUIA_OPTIMIZACION_IMAGENES_ASTRO.md](docs/GUIA_OPTIMIZACION_IMAGENES_ASTRO.md)
- [docs/MEJORAS_RENDIMIENTO_PAGESPEED.md](docs/MEJORAS_RENDIMIENTO_PAGESPEED.md)

---

## 👥 Guía de Uso para Editores (Strapi)

### Acceso al Panel de Administración

**URL:** `http://tu-servidor:1337/admin`
**Credenciales:** Solicitar al administrador del sistema

---

### 📰 Gestionar Noticias

#### Crear Nueva Noticia

1. **Acceder a Content Manager → Noticias → Create new entry**

2. **Completar campos obligatorios:**
   - **Título**: Título de la noticia
   - **Slug**: URL amigable (se genera automáticamente)
   - **Contenido**: Texto completo de la noticia
   - **Resumen**: Extracto breve para listados

3. **Configurar multimedia:**
   - **Tipo de Media**: Elegir "imagen" o "video"
   - **Imagen**: Subir imagen principal
   - **Video**: URL de YouTube/Vimeo O subir archivo MP4

4. **Posición en el sitio:**
   - **principal**: Noticia destacada en homepage con video
   - **lateral**: Noticias laterales en homepage (sidebar)
   - **ultima-hora**: Sección "Noticias de Última Hora"
   - **novedad**: Sección de novedades

5. **Configurar metadata:**
   - **Categoría**: Seleccionar o crear categoría
   - **Fecha de Publicación**: Fecha a mostrar
   - **Autor**: Nombre del autor (opcional)
   - **Destacado**: Marcar para destacar
   - **Orden**: Número para ordenar (menor = primero)

6. **Guardar y Publicar:**
   - Click en "Save" para guardar borrador
   - Click en "Publish" para publicar inmediatamente

#### Vista Previa de Noticia

**URL:** `http://tu-sitio/preview/noticia/[documentId]?secret=TU_SECRET`

Reemplazar:
- `[documentId]` con el ID del documento en Strapi
- `TU_SECRET` con el secreto configurado en `.env`

---

### 📄 Gestionar Prestaciones

#### Crear Nueva Prestación

1. **Acceder a Content Manager → Prestaciones → Create new entry**

2. **Completar información:**
   - **Título**: Nombre de la prestación
   - **Slug**: URL amigable
   - **Descripción**: Contenido completo en formato rich text
   - **Resumen**: Texto breve para tarjetas
   - **Requisitos**: Lista de requisitos necesarios

3. **Imágenes:**
   - **Imagen**: Para listados y tarjetas
   - **Imagen Detalle**: Para página individual (opcional)

4. **Configuración:**
   - **Destacado**: Marcar para mostrar en homepage
   - **Orden**: Número para ordenar
   - **Activo**: Activar/desactivar

---

### 📋 Gestionar Formularios

#### Agregar Nuevo Formulario

1. **Acceder a Content Manager → Formularios → Create new entry**

2. **Información del formulario:**
   - **Título**: Nombre del formulario
   - **Descripción**: Para qué sirve el formulario
   - **Archivo PDF**: Subir el archivo PDF

3. **Categorización:**
   - **Categoría**: asegurados, empleadores, general
   - **Subcategoría**: afiliacion, prestaciones, cotizaciones, etc.

4. **Configuración:**
   - **Destacado**: Mostrar en sección destacados
   - **Requiere Autenticación**: Si necesita login
   - **Orden**: Posición en listados
   - **Activo**: Publicar o despublicar

#### Categorías de Formularios

**Asegurados:**
- afiliacion
- prestaciones
- consultas

**Empleadores:**
- afiliacion
- cotizaciones
- declaraciones

**General:**
- informacion
- otros

---

### 🎨 Configurar Homepage

#### Editar Configuración del Inicio

**Acceder a:** Content Manager → Configuracion Inicios → Entry

**Configuraciones disponibles:**

1. **Hero Principal:**
   - Título Hero (texto grande)

2. **Sección Afiliación:**
   - Título
   - Texto descriptivo
   - Imagen
   - Enlace

3. **Sidebar:**
   - Imagen Banner (publicidad)
   - Título de Card
   - Texto de Card

4. **Video Principal:**
   - URL del video (override noticia principal)
   - Título del video
   - Fecha a mostrar
   - Descripción

**Nota:** Si no se configura, el sistema usa la noticia principal automáticamente.

---

### 🖼️ Gestionar Hero Slides

#### Crear Nuevo Slide

1. **Acceder a Content Manager → Hero Slides → Create new entry**

2. **Configurar slide:**
   - **Imagen**: Imagen de fondo (recomendado: 1920x800px)
   - **Título**: Texto grande (opcional)
   - **Subtítulo**: Texto secundario (opcional)
   - **Enlace**: URL a dónde redirigir (opcional)
   - **Texto Botón**: Texto del botón CTA (opcional)

3. **Ordenar:**
   - **Orden**: Número (menor = primero)
   - **Activo**: Activar para mostrar

**Tip:** Mantener máximo 5-7 slides para mejor UX

---

### 🤝 Gestionar Socios (Partners)

#### Agregar Nuevo Socio

1. **Acceder a Content Manager → Socios → Create new entry**

2. **Información:**
   - **Nombre**: Nombre del socio/partner
   - **Logo**: Imagen del logo (fondo transparente recomendado)
   - **Enlace**: URL del sitio web (opcional)
   - **Descripción**: Breve descripción

3. **Configuración:**
   - **Orden**: Posición en el carrusel
   - **Activo**: Mostrar/ocultar

---

### 💡 Mejores Prácticas para Editores

#### Imágenes
- **Formato:** JPG para fotos, PNG para logos con transparencia
- **Tamaño recomendado:**
  - Hero slides: 1920x800px
  - Noticias: 800x450px
  - Prestaciones: 600x400px
  - Logos: 300x300px máximo
- **Peso:** Máximo 500 KB por imagen
- **Nombres:** Usar nombres descriptivos sin espacios

#### Contenido
- **Títulos:** Máximo 80 caracteres
- **Resúmenes:** 150-200 caracteres
- **Descripciones:** Usar formato rich text con encabezados y párrafos

#### SEO
- **Slug:** URLs cortas y descriptivas
- **Texto alternativo:** Describir imágenes para accesibilidad
- **Categorías:** Usar categorías consistentes

#### Videos
- **YouTube/Vimeo:** Usar URL de embed
- **Archivos MP4:** Máximo 50 MB
- **Duración:** Videos cortos (2-5 min) funcionan mejor

---

## 💻 Desarrollo y Mantenimiento

### Requisitos del Sistema

- **Node.js:** 18.x o superior
- **npm:** 9.x o superior
- **PostgreSQL:** 14.x o superior (para Strapi)
- **Sistema operativo:** Linux, macOS, Windows

---

### Instalación Local

#### 1. Clonar repositorio

```bash
git clone [URL_DEL_REPO]
cd inseso.org_V2
```

#### 2. Instalar dependencias

```bash
npm install
```

#### 3. Configurar variables de entorno

```bash
# .env
STRAPI_URL=http://localhost:1337
PREVIEW_SECRET=tu-secret-aqui
```

#### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

**El sitio estará disponible en:** `http://localhost:4321`

---

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run start        # Alias de dev

# Producción
npm run build        # Construir para producción
npm run preview      # Vista previa del build

# Utilidades
npm run astro        # CLI de Astro
```

---

### Estructura de Desarrollo

#### Agregar Nueva Página

1. Crear archivo en `src/pages/`
2. Usar layout base: `BaseLayout.astro`
3. Importar componentes necesarios

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';

export const prerender = false; // Si usa datos de Strapi
---

<BaseLayout title="Mi Página" currentPath="/mi-pagina">
  <div class="container">
    <h1>Contenido</h1>
  </div>
</BaseLayout>
```

#### Crear Nuevo Componente

1. Crear archivo en `src/components/`
2. Definir Props interface
3. Exportar para reutilización

```astro
---
interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<div class="mi-componente">
  <h2>{title}</h2>
  {description && <p>{description}</p>}
</div>
```

#### Agregar Función a Strapi Client

Editar `src/lib/strapi.ts`:

```typescript
// 1. Definir interface
export interface MiContentType {
  id: number;
  documentId: string;
  // ... otros campos
}

// 2. Crear función
export async function getMiContentType(): Promise<MiContentType[]> {
  const response = await fetch(`${STRAPI_URL}/api/mi-content-type`);
  const data = await response.json();
  return data.data;
}
```

---

## 🚀 Deployment

### Build de Producción

```bash
npm run build
```

Genera carpeta `dist/` con archivos optimizados.

---

### Deployment en VPS

#### Requisitos del Servidor
- Ubuntu 20.04+ o similar
- Node.js 18+
- Nginx
- PM2 (gestor de procesos)

#### Configuración Nginx

```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Compresión
    gzip on;
    gzip_types text/css application/javascript image/svg+xml;
    gzip_comp_level 6;
}
```

#### Iniciar con PM2

```bash
pm2 start npm --name "inseso-web" -- start
pm2 save
pm2 startup
```

**Documentación completa:** [docs/GUIA_DEPLOY_VPS.md](docs/GUIA_DEPLOY_VPS.md)

---

## 📖 Documentación Adicional

### Documentación Técnica

| Documento | Descripción |
|-----------|-------------|
| [README_MIGRATION.md](docs/README_MIGRATION.md) | Migración HTML → Astro |
| [FASE_2_COMPLETADA.md](docs/FASE_2_COMPLETADA.md) | Integración con Strapi |
| [GUIA_CONTENT_TYPES_FASE2.md](docs/GUIA_CONTENT_TYPES_FASE2.md) | Content Types de Strapi |
| [FASE2_MEJORAS_NOTICIAS.md](docs/FASE2_MEJORAS_NOTICIAS.md) | Sistema de noticias |
| [OPTIMIZACIONES_IMAGENES.md](docs/OPTIMIZACIONES_IMAGENES.md) | Lazy loading |
| [MEJORAS_RENDIMIENTO_PAGESPEED.md](docs/MEJORAS_RENDIMIENTO_PAGESPEED.md) | PageSpeed optimizations |

### Guías de Usuario

| Documento | Descripción |
|-----------|-------------|
| [PREVIEW_QUICKSTART.md](docs/PREVIEW_QUICKSTART.md) | Sistema de preview |
| [RESUMEN_SISTEMA_FORMULARIOS.md](docs/RESUMEN_SISTEMA_FORMULARIOS.md) | Gestión de formularios |
| [GUIA_FORMULARIOS_STRAPI.md](docs/GUIA_FORMULARIOS_STRAPI.md) | Formularios en Strapi |
| [CONFIGURAR_PERMISOS_STRAPI.md](docs/CONFIGURAR_PERMISOS_STRAPI.md) | Permisos y roles |

### Guías de Deployment

| Documento | Descripción |
|-----------|-------------|
| [GUIA_DEPLOY_VPS.md](docs/GUIA_DEPLOY_VPS.md) | Deploy completo en VPS |
| [DEPLOY_VPS.md](docs/DEPLOY_VPS.md) | Guía rápida de deploy |

---

## 🔧 Mantenimiento

### Actualizar Dependencias

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar todas (cuidado con breaking changes)
npm update

# Actualizar Astro específicamente
npm install astro@latest
```

### Backup

**Importante respaldar:**
1. Base de datos PostgreSQL de Strapi
2. Carpeta `uploads/` de Strapi
3. Variables de entorno (`.env`)
4. Configuración de Nginx

```bash
# Backup PostgreSQL
pg_dump nombre_db > backup_$(date +%Y%m%d).sql

# Backup uploads Strapi
tar -czf uploads_backup.tar.gz /path/to/strapi/public/uploads
```

---

## 🐛 Solución de Problemas

### Error: "Failed to fetch from Strapi"

**Causa:** Strapi no está corriendo o URL incorrecta

**Solución:**
1. Verificar que Strapi esté corriendo: `http://localhost:1337`
2. Revisar variable `STRAPI_URL` en `.env`
3. Verificar permisos públicos en Strapi

---

### Error: "Sharp installation failed"

**Causa:** Sharp no se instaló correctamente

**Solución:**
```bash
npm uninstall sharp
npm install sharp --ignore-scripts=false
```

---

### Imágenes no se muestran desde Strapi

**Causa:** Ruta incorrecta o permisos

**Solución:**
1. Verificar función `getStrapiImageUrl()` en `strapi.ts`
2. Revisar permisos de carpeta `uploads/` en Strapi
3. Verificar URL completa de la imagen en navegador

---

### Build falla con error de TypeScript

**Causa:** Tipos incorrectos o faltantes

**Solución:**
1. Verificar interfaces en `src/lib/strapi.ts`
2. Ejecutar: `npm run astro check`
3. Revisar errores específicos y corregir tipos

---

## 📊 Métricas de Rendimiento

### Objetivos Actuales (Alcanzados)

- ✅ **Performance Score:** > 90
- ✅ **First Contentful Paint:** < 1.5s
- ✅ **Largest Contentful Paint:** < 1.8s
- ✅ **Cumulative Layout Shift:** < 0.05
- ✅ **Total Blocking Time:** < 200ms

### Herramientas de Monitoreo

- **PageSpeed Insights:** https://pagespeed.web.dev/
- **GTmetrix:** https://gtmetrix.com/
- **Chrome Lighthouse:** DevTools → Lighthouse

---

## 👨‍💻 Equipo y Créditos

**Desarrollado para:**
Instituto Nacional de Seguridad Social de Guinea Ecuatorial (INSESO)

**Desarrollo:**
OMNITECH SL

**Tecnologías:**
- Astro Framework
- Strapi v5 CMS
- Sharp Image Processing
- Bootstrap 5
- Swiper

---

## 📄 Licencia

Todos los derechos reservados © 2025 INSESO - Instituto Nacional de Seguridad Social de Guinea Ecuatorial

---

## 📞 Soporte

**Email:** info@inseso.org
**Teléfono:** (+240) 333 092214
**Ubicación:** Malabo, Guinea Ecuatorial

---

## 🎯 Roadmap Futuro

### Corto Plazo (1-3 meses)
- [ ] Panel de usuario para asegurados
- [ ] Sistema de consultas en línea
- [ ] Notificaciones por email
- [ ] Búsqueda avanzada de noticias

### Mediano Plazo (3-6 meses)
- [ ] App móvil (Progressive Web App)
- [ ] Portal de empleadores
- [ ] Sistema de citas online
- [ ] Chat en vivo con soporte

### Largo Plazo (6-12 meses)
- [ ] Integración con sistemas de pago
- [ ] Dashboard de estadísticas
- [ ] Sistema de afiliación online
- [ ] Portal de trámites digitales

---

**Última actualización:** 2025
**Versión:** 2.0.0
**Estado:** ✅ Producción
