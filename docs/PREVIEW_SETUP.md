# Configuración del Preview de Strapi en Astro

Esta guía explica cómo funciona el sistema de preview de Strapi integrado en tu proyecto de Astro.

## 📋 Descripción

El sistema de preview permite visualizar el contenido en borrador (draft) directamente desde el panel de administración de Strapi, antes de publicarlo. Esto es útil para revisar cómo se verán los cambios en el frontend sin necesidad de publicar el contenido.

## 🏗️ Arquitectura

### Componentes implementados:

1. **Configuración de Strapi** (`cms/config/admin.ts`)
   - Función `previewUrl()` que mapea content types a rutas de preview
   - Soporta: Noticias, Prestaciones, Hero Slides, Slides de Afiliación

2. **API Routes de Astro** (`src/pages/api/`)
   - `/api/preview` - Habilita el modo preview y redirige a la página correspondiente
   - `/api/exit-preview` - Desactiva el modo preview

3. **Funciones de fetch mejoradas** (`src/lib/strapi.ts`)
   - `setPreviewContext()` - Establece el contexto de preview
   - `getNoticiaByDocumentId()` - Obtiene noticia por documentId (para preview)
   - `getPrestacionByDocumentId()` - Obtiene prestación por documentId (para preview)
   - Todas las funciones de fetch ahora soportan el header `strapi-encode-source-maps`

4. **Páginas de Preview** (`src/pages/preview/`)
   - `/preview/noticia/[documentId]` - Vista preview de noticias
   - `/preview/prestacion/[documentId]` - Vista preview de prestaciones
   - `/preview/home` - Vista preview para elementos de la home

## 🚀 Uso

### Desde el panel de Strapi:

1. Edita cualquier noticia o prestación en el Content Manager
2. **Guarda los cambios** (el botón de preview se deshabilita con cambios sin guardar)
3. Haz clic en el botón **"Open preview"** en la parte superior derecha
4. Se abrirá una nueva pestaña mostrando el preview del contenido

### Estados soportados:

- **Draft (Borrador)**: Contenido no publicado
- **Published (Publicado)**: Contenido ya publicado

## 🔧 Configuración

### Variables de entorno:

**En Strapi (`cms/.env`):**
```env
PREVIEW_URL=http://localhost:4321
```

**En Astro (`.env`):**
```env
STRAPI_URL=http://localhost:1337
```

### Para producción:

Actualiza `PREVIEW_URL` en el archivo `.env` de Strapi con la URL de tu sitio en producción:

```env
PREVIEW_URL=https://tu-sitio.com
```

## 📝 Características

### Banner de Preview
- Todas las páginas de preview muestran un banner superior azul
- Indica que estás en modo preview y el estado del contenido
- Incluye botones para:
  - Ver la versión publicada
  - Salir del modo preview

### Content Source Maps
- Habilitado automáticamente en modo preview
- Permite que Strapi identifique qué partes del frontend corresponden a qué campos
- Útil para el Live Preview (disponible en planes pagos de Strapi)

### Cookies de Preview
- Se establece una cookie `preview` con:
  - Estado habilitado/deshabilitado
  - Tipo de contenido
  - Document ID
  - Status (draft/published)
  - Timestamp
- Duración: 30 minutos

## 🔍 Flujo de Preview

```
1. Usuario hace clic en "Open preview" en Strapi
   ↓
2. Strapi llama a: http://localhost:4321/api/preview?type=noticia&documentId=xxx&status=draft
   ↓
3. API route establece cookie de preview
   ↓
4. Redirige a: /preview/noticia/xxx
   ↓
5. Página de preview:
   - Lee cookie de preview
   - Establece contexto de preview con setPreviewContext()
   - Obtiene contenido con getNoticiaByDocumentId()
   - Muestra contenido con banner de preview
```

## 🛠️ Desarrollo

### Añadir nuevos Content Types al preview:

1. **Actualiza `cms/config/admin.ts`:**
```typescript
const previewRoutes = {
  // ... existentes
  'api::tu-content-type.tu-content-type': `/api/preview?type=tu-content-type&documentId=${documentId}&status=${status}`,
};
```

2. **Crea función de fetch en `src/lib/strapi.ts`:**
```typescript
export async function getTuContentTypeByDocumentId(documentId: string): Promise<TuContentType | null> {
  const queryParams: any = {
    populate: ['campo1', 'campo2'],
  };

  if (previewContext.enabled && previewContext.status) {
    queryParams.status = previewContext.status;
  }

  const query = qs.stringify(queryParams, {
    encodeValuesOnly: true,
  });

  const headers: HeadersInit = {};
  if (previewContext.enabled) {
    headers['strapi-encode-source-maps'] = 'true';
  }

  const response = await fetch(`${STRAPI_URL}/api/tu-content-types/${documentId}?${query}`, {
    headers,
  });

  // ... resto del código
}
```

3. **Actualiza la ruta API (`src/pages/api/preview.ts`):**
```typescript
case 'tu-content-type':
  redirectUrl = `/preview/tu-content-type/${documentId}`;
  break;
```

4. **Crea página de preview (`src/pages/preview/tu-content-type/[documentId].astro`):**
```astro
---
import BaseLayout from '../../../layouts/BaseLayout.astro';
import { getTuContentTypeByDocumentId, setPreviewContext } from '../../../lib/strapi';

// ... código similar a noticia/prestacion
---
```

## 🧪 Testing

### Para probar localmente:

1. Inicia Strapi:
```bash
cd cms
npm run dev
```

2. Inicia Astro:
```bash
npm run dev
```

3. Accede a Strapi admin: http://localhost:1337/admin
4. Edita una noticia o prestación
5. Haz clic en "Open preview"

## 📚 Recursos

- [Documentación oficial de Strapi Preview](https://docs.strapi.io/user-docs/latest/features/preview)
- [Astro Server-side Rendering](https://docs.astro.build/en/guides/server-side-rendering/)
- [Strapi Content API](https://docs.strapi.io/dev-docs/api/content-api)

## ⚠️ Notas importantes

1. **El botón de preview se deshabilita** si hay cambios sin guardar en Strapi
2. **Las cookies de preview expiran** después de 30 minutos
3. **El modo preview solo funciona** con el servidor de Astro en modo SSR (ya configurado)
4. **Content source maps** solo se añaden cuando el header está presente
5. **Para Live Preview** (edición in-place), necesitas un plan pago de Strapi

## 🐛 Troubleshooting

### El botón de preview no aparece:
- Verifica que `PREVIEW_URL` esté configurado en `cms/.env`
- Asegúrate de haber guardado los cambios en Strapi

### El preview muestra contenido antiguo:
- Limpia las cookies del navegador
- Verifica que Strapi esté devolviendo el status correcto

### Error 400 en la API de preview:
- Verifica que los parámetros `type` y `documentId` estén presentes en la URL
