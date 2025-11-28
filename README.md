# 🏛️ INSESO - Instituto Nacional de Seguridad Social de Guinea Ecuatorial

Sitio web oficial del Instituto Nacional de Seguridad Social de Guinea Ecuatorial.

**Versión:** 2.1 (Astro + Strapi v5)
**Estado:** ✅ Producción
**Última actualización:** Noviembre 2025

---

## 📋 Índice

1. [Resumen del Proyecto](#resumen-del-proyecto)
2. [Tecnologías](#tecnologías)
3. [Arquitectura](#arquitectura)
4. [Características Principales](#características-principales)
   - [Sistema Multilingüe](#sistema-multilingüe-i18n)
   - [Página de Agencias](#página-de-agencias)
5. [Guía de Uso para Editores](#guía-de-uso-para-editores-strapi)
6. [Desarrollo y Mantenimiento](#desarrollo-y-mantenimiento)
7. [Deployment](#deployment)
8. [Documentación Adicional](#documentación-adicional)
9. [Changelog](#changelog)

---

## 🎯 Resumen del Proyecto

INSESO es un sitio web moderno desarrollado con **Astro 5** (frontend) y **Strapi v5** (CMS headless) que proporciona información y servicios relacionados con la seguridad social en Guinea Ecuatorial.

### Características Principales

- ✅ **Sistema de Gestión de Contenido**: Strapi v5 para administración fácil sin código
- ✅ **Multilingüe Completo**: 4 idiomas (Español, Francés, Inglés, Portugués) con i18n
- ✅ **Rendimiento Optimizado**: Lazy loading, Sharp, optimización automática de imágenes
- ✅ **Responsive Design**: Compatible con todos los dispositivos (móvil, tablet, desktop)
- ✅ **SEO Optimizado**: Meta tags, sitemap, rendimiento Google PageSpeed >90
- ✅ **Sistema de Noticias Avanzado**: Categorías, posiciones, multimedia (imagen/video)
- ✅ **Formularios Descargables**: Sistema completo con categorías y búsqueda
- ✅ **Páginas Dinámicas**: Todo el contenido gestionado desde Strapi
- ✅ **Email por Categoría**: Sistema de contacto con routing automático
- ✅ **Configuración Flexible**: Homepage configurable desde Strapi
- ✅ **Rich Text desde Strapi**: Soporte completo para texto enriquecido con estilos

---

## 🛠️ Tecnologías

### Frontend
- **Astro 5.15.9** - Framework web moderno con SSR
- **TypeScript** - Tipado estático
- **Bootstrap 5** - Framework CSS responsive
- **Swiper.js** - Carruseles modernos y táctiles
- **Sharp 0.34.5** - Optimización automática de imágenes
- **Nodemailer** - Sistema de envío de emails

### Backend (CMS)
- **Strapi v5** - Headless CMS
- **PostgreSQL** - Base de datos relacional
- **Node.js 18+** - Runtime JavaScript

### Optimizaciones Aplicadas
- HTML5 Lazy Loading en 100% de imágenes
- fetchpriority para imágenes LCP
- Preconnect a recursos externos
- Preload de fuentes críticas
- WebP/AVIF automático con Sharp
- Compresión gzip/brotli

### Métricas de Rendimiento
- **Performance Score:** >90 (PageSpeed Insights)
- **First Contentful Paint:** <1.5s
- **Largest Contentful Paint:** <1.8s
- **Total Blocking Time:** <200ms
- **Reducción de peso:** 74% (3.5 MB → 900 KB)

---

## 🏗️ Arquitectura

```
inseso.org_V2/
├── src/
│   ├── pages/                    # Páginas del sitio
│   │   ├── index.astro           # Homepage (configurable desde Strapi)
│   │   ├── noticias.astro        # Listado de noticias
│   │   ├── noticias/[slug].astro # Detalle de noticia
│   │   ├── prestacion/[slug].astro # Detalle de prestación
│   │   ├── nuestras_agencias.astro # Página de agencias
│   │   ├── descarga_formularios.astro # Sistema de formularios
│   │   ├── contacto.astro        # Formulario de contacto
│   │   ├── [lang]/               # Páginas multilingües
│   │   │   ├── index.astro       # Homepage localizada
│   │   │   ├── noticias/[slug].astro # Noticias localizadas
│   │   │   ├── prestacion/[slug].astro # Prestaciones localizadas
│   │   │   ├── nuestras_agencias.astro # Agencias localizadas
│   │   │   └── ...               # Otras páginas localizadas
│   │   ├── api/
│   │   │   └── send-email.ts     # API de envío de emails
│   │   └── preview/              # Sistema de preview
│   ├── components/               # Componentes reutilizables
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── LanguageSwitcher.astro # Selector de idioma inteligente
│   │   ├── SwiperHero.astro      # Carousel hero principal
│   │   ├── BlogSlider.astro      # Cards de afiliación
│   │   ├── PrestacionesGrid.astro # Grid de prestaciones
│   │   ├── OptimizedImage.astro  # Optimización de imágenes
│   │   ├── NovedadesSection.astro
│   │   ├── UltimaHoraSection.astro
│   │   └── NewsLateralCard.astro
│   ├── layouts/                  # Layouts base
│   │   ├── BaseLayout.astro
│   │   ├── PrestacionLayout.astro # Layout para prestaciones
│   │   └── ContentWithSidebarLayout.astro
│   ├── i18n/                     # Internacionalización
│   │   ├── utils.ts              # Funciones de i18n
│   │   └── locales/              # Archivos de traducción
│   │       ├── es.json           # Español (default)
│   │       ├── en.json           # Inglés
│   │       ├── fr.json           # Francés
│   │       └── pt.json           # Portugués
│   ├── lib/                      # Librerías y utilidades
│   │   └── strapi.ts             # Cliente Strapi con TypeScript + Rich Text
│   ├── config/                   # Configuración
│   │   └── contact.ts            # Info de contacto
│   └── assets/                   # Assets optimizados
│       └── images/
├── cms/                          # Strapi CMS
│   └── src/api/                  # Content Types
│       ├── noticia/
│       ├── categoria/
│       ├── prestacion/
│       ├── formulario/
│       ├── categoria-formulario/
│       ├── hero-slide/
│       ├── slide-afiliacion/
│       ├── socio/
│       └── configuracion-inicio/
├── public/                       # Archivos estáticos
│   ├── css/
│   ├── js/
│   ├── images/
│   └── video/
├── scripts/                      # Scripts de utilidad
│   └── populate-strapi.js        # Población automática de datos
├── docs/                         # Documentación
│   ├── CONFIGURAR_PERMISOS_STRAPI.md
│   ├── DEPLOY_VPS.md
│   ├── GUIA_DEPLOY_VPS.md
│   └── GUIA_FORMULARIOS_STRAPI.md
└── dist/                         # Build de producción
```

---

## ✨ Características Principales

### 🎨 Homepage Dinámica
- Hero carousel configurable desde Strapi
- Sección de afiliación personalizable
- **Nueva:** Soporte para video O imagen en sección principal de noticias
- Prestaciones destacadas
- Noticias laterales
- Sección "Última Hora"
- Carousel de socios/partners

### 📰 Sistema de Noticias Completo
- Categorías personalizables con colores e iconos
- Soporte para imágenes y videos (YouTube/Vimeo o archivo MP4)
- Posiciones: principal, lateral, última-hora, novedad
- Rich text editor para contenido
- Sistema de ordenamiento
- Vista de detalle con metadata completa

### 📋 Sistema de Formularios
- Categorías de formularios (5 categorías principales)
- 17 formularios pre-cargados
- Búsqueda en tiempo real
- Filtros por formato (PDF, Excel, Word)
- Thumbnails personalizables
- Contador de descargas
- Script de población automática

### 📧 Sistema de Contacto Inteligente
- Routing automático por categoría
- 7 categorías predefinidas (Consulta, Afiliación, Prestaciones, etc.)
- Emails a diferentes departamentos
- CC automático a administración
- Validación de formularios
- Confirmación de envío

### 🎯 Prestaciones
- Página de detalle individual con rutas dinámicas
- Contenido Rich Text con estilos (negritas, listas, enlaces)
- Requisitos y documentación en sidebar
- Imágenes optimizadas desde Strapi
- Grid de prestaciones con enlaces localizados
- Sistema de activación/desactivación

### 🌍 Sistema Multilingüe (i18n)

El sitio soporta 4 idiomas con contenido localizado desde Strapi:

| Idioma | Código | URL Pattern | Ejemplo |
|--------|--------|-------------|---------|
| Español | `es` | Sin prefijo (default) | `/prestacion/pension-por-vejez` |
| Francés | `fr` | `/fr/...` | `/fr/prestacion/pension-de-retraite` |
| Inglés | `en` | `/en/...` | `/en/prestacion/old-age-pension` |
| Portugués | `pt` | `/pt/...` | `/pt/prestacion/pensao-por-velhice` |

#### Características del Sistema i18n:

- **Selector de idioma inteligente**: Mantiene la página actual al cambiar idioma
- **Slugs localizados**: URLs amigables en cada idioma desde Strapi
- **Traducciones UI**: Textos de interfaz en archivos JSON (`src/i18n/locales/`)
- **Contenido dinámico**: Prestaciones y noticias con slugs por idioma
- **documentId de Strapi**: Vinculación entre versiones de diferentes idiomas

#### Archivos de Traducción:

```
src/i18n/
├── utils.ts          # Funciones: getLangFromUrl, useTranslations, getLocalizedPath
└── locales/
    ├── es.json       # ~400 traducciones
    ├── en.json       # English translations
    ├── fr.json       # Traductions françaises
    └── pt.json       # Traduções portuguesas
```

### 🏢 Página de Agencias

Muestra las oficinas de INSESO organizadas por ciudad:

- **Malabo** (Región Insular):
  - Sede Central con imagen
  - Centro de la Ciudad
  - Santa María
  - Malabo 2

- **Bata** (Región Continental):
  - Oficinas en barrios principales

- **Annobón**:
  - Oficina regional

Cada oficina muestra:
- Dirección
- Teléfono
- Email
- Horario de atención
- Enlace a Google Maps

---

## 👥 Guía de Uso para Editores (Strapi)

### Acceso al Panel de Administración

**URL:** `http://localhost:1337/admin` (desarrollo) o `http://tu-servidor:1337/admin` (producción)
**Credenciales:** Solicitar al administrador del sistema

---

### 🎬 Configurar Media Principal (Video o Imagen)

La sección principal de NOTICIAS en la homepage ahora soporta tanto videos como imágenes.

#### Pasos para Configurar:

1. **Acceder a:** Content Manager → Configuracion Inicio (Single Type)

2. **Seleccionar tipo de media:**
   - **tipoMediaPrincipal**: Elegir "video" o "imagen"

3. **Si eligió "imagen":**
   - Subir archivo en **imagenPrincipal**
   - Recomendado: Mínimo 800x450px, máximo 500 KB

4. **Si eligió "video":**
   - **Opción A:** Subir archivo MP4 en **videoArchivoPrincipal** (máx 50 MB)
   - **Opción B:** Ingresar URL de YouTube/Vimeo en **videoUrl**

5. **Completar información:**
   - **videoTitulo**: Título del contenido
   - **videoFecha**: Fecha/hora (ej: "MALABO, 26 DE JUNIO DE 2025 - 15:00 HORAS")
   - **videoDescripcion**: Descripción del contenido (acepta múltiples párrafos)

6. **Publicar:** Click en "Publish"

**Documentación completa:** [CONFIGURACION_MEDIA_PRINCIPAL.md](CONFIGURACION_MEDIA_PRINCIPAL.md)

---

### 📰 Gestionar Noticias

#### Crear Nueva Noticia

1. **Content Manager → Noticias → Create new entry**

2. **Campos obligatorios:**
   - **Título**: Título de la noticia
   - **Slug**: URL amigable (se genera automáticamente)
   - **Contenido**: Texto completo con formato rich text
   - **Resumen**: Extracto breve (150-200 caracteres)

3. **Multimedia:**
   - **Tipo de Media**: "imagen" o "video"
   - **Imagen**: Subir imagen principal (800x450px recomendado)
   - **Video**: URL de YouTube/Vimeo O subir MP4
   - **Video Archivo**: Subir archivo MP4 directamente

4. **Posición en homepage:**
   - **principal**: Video/imagen destacado en homepage
   - **lateral**: Cards laterales (sidebar)
   - **ultima-hora**: Sección inferior de últimas noticias
   - **novedad**: Sección de novedades

5. **Categoría y metadata:**
   - Seleccionar categoría existente
   - Fecha de publicación
   - Autor (opcional)
   - Destacado (checkbox)
   - Orden (número menor = primero)

6. **Publicar:** "Save" (borrador) → "Publish" (público)

---

### 📋 Gestionar Formularios

#### Agregar Nuevo Formulario

1. **Content Manager → Formularios → Create new entry**

2. **Información básica:**
   - **Nombre**: Título del formulario
   - **Descripción**: Para qué sirve
   - **Formato**: PDF, Excel o Word
   - **Tamaño**: Ej: "250 KB"

3. **Archivos:**
   - **Archivo**: Subir PDF, Excel o Word
   - **Thumbnail**: Imagen preview (opcional, 300x300px)

4. **Categorización:**
   - **Categoría Formulario**: Seleccionar de las 5 categorías principales
     - Afiliación
     - Prestaciones Sociales
     - Declaraciones y Contribuciones
     - Certificados y Constancias
     - Otros Trámites

5. **Configuración:**
   - **Orden**: Posición en listado
   - **Activo**: Checkbox para publicar
   - **Descargas**: Se actualiza automáticamente

#### Popular Formularios Automáticamente

Para cargar los 17 formularios de ejemplo:

```bash
cd /ruta/proyecto
node scripts/populate-strapi.js
```

**Nota:** Requiere Strapi corriendo en `http://localhost:1337`

---

### 🎨 Configurar Homepage

**Content Manager → Configuracion Inicio** (Single Type)

#### Secciones Configurables:

1. **Hero Principal:**
   - **Título Hero**: Texto grande (ej: "JUNTOS EN CADA ETAPA DE TU VIDA")

2. **Sección Afiliación:**
   - Título, imagen, texto y enlace personalizables

3. **Sidebar:**
   - Banner publicitario
   - Card informativa

4. **Media Principal:** (Ver sección arriba)
   - Video o imagen
   - Título, fecha y descripción

5. **Hero Slides:**
   - Gestionar en Content Manager → Hero Slides
   - Máximo 5-7 slides recomendado

6. **Slides de Afiliación:**
   - 4 cards debajo del título hero
   - Gestionar en Content Manager → Slides Afiliacion

---

### 📧 Categorías de Contacto

El formulario de contacto envía automáticamente emails a diferentes departamentos:

| Categoría | Email de Destino |
|-----------|------------------|
| Consulta General | consultas@inseso.org |
| Afiliación | afiliacion@inseso.org |
| Prestaciones Sociales | prestaciones@inseso.org |
| Reclamo | reclamos@inseso.org |
| Seguimiento de Trámite | seguimiento@inseso.org |
| Sugerencia | sugerencias@inseso.org |
| Otro | support@omnitechsl.com |

**CC automático:** Todos los emails incluyen copia a `info@inseso.org`

---

### 💡 Mejores Prácticas para Editores

#### Imágenes
- **Formato:** JPG para fotos, PNG para logos con transparencia
- **Tamaño recomendado:**
  - Hero slides: 1920x800px
  - Noticias: 800x450px
  - Prestaciones: 600x400px
  - Thumbnails: 300x300px
  - Logos: 300x300px máximo
- **Peso:** Máximo 500 KB por imagen
- **Nombres:** Descriptivos sin espacios ni caracteres especiales

#### Contenido
- **Títulos:** Máximo 80 caracteres para SEO
- **Resúmenes:** 150-200 caracteres
- **Rich Text:** Usar encabezados (H2, H3) y párrafos
- **URLs:** Cortas, descriptivas, sin acentos

#### Videos
- **YouTube/Vimeo:** Usar URL de embed (no la URL normal)
- **Archivos MP4:** Máximo 50 MB, duración 2-5 minutos
- **Compresión:** Usar herramientas como HandBrake

#### SEO
- Completar siempre el campo "Slug"
- Usar texto alternativo en imágenes
- Mantener categorías consistentes
- Fecha de publicación precisa

---

## 💻 Desarrollo y Mantenimiento

### Requisitos del Sistema

- **Node.js:** 18.x o superior
- **npm:** 9.x o superior
- **PostgreSQL:** 14.x o superior (para Strapi)
- **Sistema operativo:** Linux, macOS, Windows con WSL2

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

Crear archivo `.env` en la raíz:

```env
# Strapi Configuration
STRAPI_URL=http://localhost:1337

# SMTP Configuration
SMTP_HOST=mail.inseso.org
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=insesoweb@inseso.org
SMTP_PASS=tu_password_aqui
SMTP_FROM=insesoweb@inseso.org
SMTP_TO=info@inseso.org
```

#### 4. Iniciar Strapi

```bash
cd cms
npm install
npm run develop
```

Strapi estará en: `http://localhost:1337`

#### 5. Configurar permisos públicos en Strapi

Ver: [docs/CONFIGURAR_PERMISOS_STRAPI.md](docs/CONFIGURAR_PERMISOS_STRAPI.md)

#### 6. Popular datos iniciales

```bash
node scripts/populate-strapi.js
```

#### 7. Iniciar servidor de desarrollo

```bash
npm run dev
```

**El sitio estará disponible en:** `http://localhost:4321`

---

### Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo (puerto 4321)
npm run start        # Alias de dev

# Producción
npm run build        # Construir para producción
npm run preview      # Vista previa del build

# Utilidades
npm run astro        # CLI de Astro

# Strapi
cd cms && npm run develop  # Iniciar Strapi en modo desarrollo
cd cms && npm run build    # Build de Strapi
cd cms && npm run start    # Iniciar Strapi en producción
```

---

### Estructura de Datos Strapi

#### Content Types Principales

| Content Type | Tipo | Descripción |
|--------------|------|-------------|
| **noticia** | Collection | Noticias con categorías y multimedia |
| **categoria** | Collection | Categorías de noticias |
| **prestacion** | Collection | Prestaciones sociales |
| **formulario** | Collection | Formularios descargables |
| **categoria-formulario** | Collection | Categorías de formularios |
| **hero-slide** | Collection | Slides del carousel principal |
| **slide-afiliacion** | Collection | Cards de afiliación |
| **socio** | Collection | Logos de socios/partners |
| **configuracion-inicio** | Single Type | Configuración de homepage |

Ver schemas completos en: `cms/src/api/`

#### Funciones Principales en strapi.ts

```typescript
// Obtener contenido
getPrestaciones(locale)           // Lista de prestaciones por idioma
getPrestacionBySlug(slug, locale) // Prestación individual
getNoticias(locale)               // Lista de noticias
getNoticiaBySlug(slug, locale)    // Noticia individual

// Multilingüe
getPrestacionSlugsByDocumentId(documentId) // Slugs en todos los idiomas
getNoticiaSlugsByDocumentId(documentId)    // Slugs de noticia por idioma

// Rich Text
richTextToHtml(richText)          // Convierte Rich Text de Strapi a HTML
richTextToPlainText(richText)     // Convierte a texto plano

// Utilidades
getStrapiImageUrl(url)            // URL completa de imagen
formatStrapiDate(date, locale)    // Formateo de fechas localizado
```

#### Soporte Rich Text

La función `richTextToHtml()` convierte el formato Rich Text de Strapi v5 a HTML:

- **Párrafos** (`<p>`)
- **Encabezados** (`<h1>` - `<h6>`)
- **Listas** ordenadas y no ordenadas
- **Texto con estilos**: negrita, cursiva, subrayado, tachado
- **Enlaces** con target="_blank"
- **Código** inline y bloques
- **Citas** (blockquote)
- **Imágenes** embebidas

---

## 🚀 Deployment

### Build de Producción

```bash
npm run build
```

Genera carpeta `dist/` con:
- HTML estático optimizado
- CSS/JS minificados
- Imágenes optimizadas (WebP/AVIF)
- Assets pre-comprimidos

---

### Deployment en VPS

#### Requisitos del Servidor
- Ubuntu 20.04+ o CentOS 8+
- Node.js 18+
- Nginx o Apache
- PM2 (gestor de procesos)
- PostgreSQL 14+

#### Configuración Nginx

```nginx
server {
    listen 80;
    server_name inseso.org www.inseso.org;

    # Redirigir a HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name inseso.org www.inseso.org;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Frontend (Astro)
    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Backend (Strapi)
    location /admin {
        proxy_pass http://localhost:1337;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-Host $host;
        proxy_set_header X-Forwarded-Server $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Host $http_host;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "Upgrade";
        proxy_pass_request_headers on;
    }

    # Compresión
    gzip on;
    gzip_vary on;
    gzip_min_length 1024;
    gzip_types text/css application/javascript application/json image/svg+xml;
    gzip_comp_level 6;
}
```

#### Iniciar con PM2

```bash
# Frontend
pm2 start npm --name "inseso-web" -- start
pm2 save

# Backend (Strapi)
cd cms
pm2 start npm --name "inseso-cms" -- start
pm2 save

# Auto-start al reiniciar
pm2 startup
```

**Documentación completa de deploy:** [docs/GUIA_DEPLOY_VPS.md](docs/GUIA_DEPLOY_VPS.md)

---

## 📖 Documentación Adicional

### Documentación de Usuario

| Documento | Descripción |
|-----------|-------------|
| [DATOS_PARA_STRAPI.md](DATOS_PARA_STRAPI.md) | Datos para popular manualmente |
| [CONFIGURACION_MEDIA_PRINCIPAL.md](CONFIGURACION_MEDIA_PRINCIPAL.md) | Guía de video/imagen en homepage |
| [docs/GUIA_FORMULARIOS_STRAPI.md](docs/GUIA_FORMULARIOS_STRAPI.md) | Sistema de formularios |
| [docs/CONFIGURAR_PERMISOS_STRAPI.md](docs/CONFIGURAR_PERMISOS_STRAPI.md) | Configurar permisos públicos |

### Documentación Técnica

| Documento | Descripción |
|-----------|-------------|
| [docs/GUIA_DEPLOY_VPS.md](docs/GUIA_DEPLOY_VPS.md) | Deploy completo en VPS |
| [docs/DEPLOY_VPS.md](docs/DEPLOY_VPS.md) | Guía rápida de deploy |

---

## 🔧 Mantenimiento

### Actualizar Dependencias

```bash
# Ver dependencias desactualizadas
npm outdated

# Actualizar todas (revisar breaking changes)
npm update

# Actualizar Astro específicamente
npm install astro@latest

# Actualizar Strapi
cd cms
npm install @strapi/strapi@latest
```

### Backup Recomendado

**Importante respaldar regularmente:**

1. **Base de datos PostgreSQL:**
```bash
pg_dump -U postgres inseso_db > backup_$(date +%Y%m%d).sql
```

2. **Uploads de Strapi:**
```bash
tar -czf uploads_backup_$(date +%Y%m%d).tar.gz cms/public/uploads/
```

3. **Variables de entorno:**
```bash
cp .env .env.backup_$(date +%Y%m%d)
cp cms/.env cms/.env.backup_$(date +%Y%m%d)
```

4. **Código fuente (Git):**
```bash
git add .
git commit -m "Backup $(date +%Y-%m-%d)"
git push
```

---

## 🐛 Solución de Problemas

### Error: "Failed to fetch from Strapi"

**Causa:** Strapi no está corriendo o URL incorrecta

**Solución:**
1. Verificar que Strapi esté corriendo: `http://localhost:1337`
2. Revisar variable `STRAPI_URL` en `.env`
3. Verificar permisos públicos en Strapi (Settings → Users & Permissions)
4. Revisar logs: `cd cms && npm run develop`

---

### Error: "Sharp installation failed"

**Causa:** Sharp no se instaló correctamente (problema común en Windows)

**Solución:**
```bash
npm uninstall sharp
npm install sharp --ignore-scripts=false
# O forzar rebuild:
npm rebuild sharp
```

---

### Imágenes no se muestran desde Strapi

**Causa:** Ruta incorrecta o permisos de archivos

**Solución:**
1. Verificar función `getStrapiImageUrl()` en `src/lib/strapi.ts`
2. Revisar permisos de `cms/public/uploads/`
3. Verificar URL completa: debe ser `http://localhost:1337/uploads/...`
4. Verificar en Strapi Media Library que el archivo exista

---

### Build falla con error de TypeScript

**Causa:** Tipos incorrectos o interfaces desactualizadas

**Solución:**
1. Verificar interfaces en `src/lib/strapi.ts`
2. Ejecutar: `npm run astro check`
3. Revisar errores y actualizar tipos según schema de Strapi
4. Limpiar caché: `rm -rf .astro && npm run build`

---

### Emails no se envían desde formulario de contacto

**Causa:** Configuración SMTP incorrecta

**Solución:**
1. Verificar variables SMTP en `.env`
2. Probar credenciales SMTP con herramienta externa
3. Revisar logs del servidor en `src/pages/api/send-email.ts`
4. Verificar que el puerto 465/587 esté abierto
5. Revisar configuración del firewall

---

## 📊 Métricas de Rendimiento

### Objetivos Alcanzados

- ✅ **Performance Score:** 92/100 (PageSpeed Insights)
- ✅ **First Contentful Paint:** 1.3s
- ✅ **Largest Contentful Paint:** 1.6s
- ✅ **Cumulative Layout Shift:** 0.02
- ✅ **Total Blocking Time:** 180ms
- ✅ **Speed Index:** 2.1s

### Optimizaciones Aplicadas

- Lazy loading en 100% de imágenes no críticas
- fetchpriority="high" en imagen LCP
- Preconnect a Google Fonts y Strapi
- Preload de fuentes críticas (Roboto)
- Sharp para conversión automática a WebP/AVIF
- Minificación de CSS y JavaScript
- Compresión gzip/brotli
- Cache headers optimizados

### Herramientas de Monitoreo

- **PageSpeed Insights:** https://pagespeed.web.dev/
- **GTmetrix:** https://gtmetrix.com/
- **Chrome Lighthouse:** DevTools → Lighthouse
- **WebPageTest:** https://www.webpagetest.org/

---

## 👨‍💻 Equipo y Créditos

**Cliente:**
Instituto Nacional de Seguridad Social de Guinea Ecuatorial (INSESO)

**Desarrollo y Mantenimiento:**
OMNITECH SL

**Stack Tecnológico:**
- Astro Framework 5.15.9
- Strapi v5 CMS
- Sharp Image Processing
- Bootstrap 5
- Swiper.js
- Nodemailer
- PostgreSQL

---

## 📄 Licencia

Todos los derechos reservados © 2025 INSESO - Instituto Nacional de Seguridad Social de Guinea Ecuatorial

---

## 📞 Soporte y Contacto

**Email:** info@inseso.org
**Email Técnico:** support@omnitechsl.com
**Teléfono:** (+240) 333 092214
**Ubicación:** Malabo, Guinea Ecuatorial
**Sitio Web:** https://www.inseso.org

---

## 🎯 Roadmap Futuro

### Corto Plazo (1-3 meses)
- [ ] Portal de usuario para asegurados registrados
- [ ] Sistema de consultas de estado de trámites
- [ ] Notificaciones por email automatizadas
- [ ] Búsqueda avanzada de noticias con filtros
- [ ] Sistema de comentarios en noticias
- [ ] Estadísticas de descargas de formularios

### Mediano Plazo (3-6 meses)
- [ ] Progressive Web App (PWA) para móviles
- [ ] Portal específico para empleadores
- [ ] Sistema de citas online para atención presencial
- [ ] Chat en vivo con agentes de soporte
- [ ] Dashboard de usuario con historial
- [ ] Integración con API de verificación de identidad

### Largo Plazo (6-12 meses)
- [ ] Pasarela de pago para cotizaciones online
- [ ] Dashboard analítico con estadísticas
- [ ] Sistema de afiliación 100% digital
- [ ] Portal completo de trámites sin papel
- [ ] App móvil nativa (iOS y Android)
- [ ] Integración con sistema nacional de identificación

---

**Última actualización:** Noviembre 2025
**Versión:** 2.1.0
**Estado:** ✅ En Producción

---

## 📝 Changelog

### v2.1.0 (Noviembre 2025)

#### Nuevas Características
- **Sistema Multilingüe Completo**: Soporte para 4 idiomas (ES, EN, FR, PT)
- **Selector de Idioma Inteligente**: Mantiene la página actual al cambiar idioma
- **Páginas Dinámicas Localizadas**: Prestaciones y noticias con slugs por idioma
- **Rich Text desde Strapi**: Función `richTextToHtml()` para contenido formateado
- **Página de Agencias Mejorada**: Cards de oficinas con imagen de sede

#### Mejoras
- URLs localizadas sin doble slash
- Language switcher funcional en páginas dinámicas (prestaciones, noticias)
- Archivos de traducción completos (~400 claves por idioma)
- Soporte para `documentId` de Strapi para vincular contenido entre idiomas
- Grid de prestaciones con enlaces correctos por idioma

#### Archivos Nuevos/Modificados
- `src/i18n/` - Sistema de internacionalización
- `src/components/LanguageSwitcher.astro` - Selector de idioma
- `src/pages/[lang]/` - Todas las páginas localizadas
- `src/lib/strapi.ts` - Funciones Rich Text y slugs por documentId

### v2.0.0 (Octubre 2025)
- Migración a Astro 5 + Strapi v5
- Sistema de noticias con categorías
- Sistema de formularios descargables
- Optimización de rendimiento (Sharp, lazy loading)
- Sistema de contacto con routing por categoría
