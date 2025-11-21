# 🚀 Guía Rápida - Preview de Strapi

## ✅ Configuración completada

El sistema de preview de Strapi ya está completamente configurado en tu proyecto. Aquí está todo lo que se ha implementado:

### 📦 Archivos modificados/creados:

**Backend (Strapi):**
- ✅ `cms/config/admin.ts` - Configuración de previewUrl
- ✅ `cms/.env` - Variable PREVIEW_URL añadida

**Frontend (Astro):**
- ✅ `src/pages/api/preview.ts` - API endpoint para habilitar preview
- ✅ `src/pages/api/exit-preview.ts` - API endpoint para salir de preview
- ✅ `src/lib/strapi.ts` - Funciones de fetch actualizadas con soporte para draft
- ✅ `src/pages/preview/noticia/[documentId].astro` - Página de preview para noticias
- ✅ `src/pages/preview/prestacion/[documentId].astro` - Página de preview para prestaciones
- ✅ `src/pages/preview/home.astro` - Página de preview genérica
- ✅ `src/components/PreviewBanner.astro` - Componente banner de preview

## 🎯 Cómo usar el preview

### Paso 1: Iniciar los servidores

```bash
# Terminal 1: Strapi
cd cms
npm run dev

# Terminal 2: Astro
npm run dev
```

### Paso 2: Acceder a Strapi

1. Abre http://localhost:1337/admin
2. Inicia sesión con tu cuenta de administrador

### Paso 3: Probar el preview

1. Ve a **Content Manager** → **Noticias** o **Prestaciones**
2. Edita o crea una nueva entrada
3. **Guarda los cambios** (importante: el botón de preview se deshabilita si hay cambios sin guardar)
4. Haz clic en el botón **"Open preview"** (arriba a la derecha)
5. Se abrirá una nueva pestaña mostrando el preview

### Paso 4: Navegar en modo preview

Una vez en modo preview, verás:
- 🔵 Banner azul en la parte superior indicando que estás en modo preview
- 👁️ El contenido tal como se verá una vez publicado
- 🔘 Botones para ver la versión publicada o salir del preview

## 🔑 Características principales

### ✨ Lo que funciona:

1. **Preview de Noticias**:
   - URL: `/preview/noticia/[documentId]`
   - Muestra: Título, imagen/video, contenido, categoría, metadata

2. **Preview de Prestaciones**:
   - URL: `/preview/prestacion/[documentId]`
   - Muestra: Título, descripción, requisitos, imágenes

3. **Estados soportados**:
   - ✅ Draft (Borrador) - contenido no publicado
   - ✅ Published (Publicado) - contenido publicado

4. **Content Source Maps**:
   - Automáticamente habilitado en modo preview
   - Útil para Live Preview (planes pagos de Strapi)

5. **Seguridad**:
   - Cookies HTTP-only
   - Expiración automática (30 minutos)
   - Validación de parámetros

## 🎨 Content Types soportados

| Content Type | Ruta de Preview | Estado |
|--------------|----------------|--------|
| Noticias | `/preview/noticia/[documentId]` | ✅ Implementado |
| Prestaciones | `/preview/prestacion/[documentId]` | ✅ Implementado |
| Hero Slides | `/preview/home?type=hero-slide&documentId=...` | ✅ Implementado |
| Slides Afiliación | `/preview/home?type=slide-afiliacion&documentId=...` | ✅ Implementado |

## 🔧 Personalización

### Cambiar la URL de preview para producción:

Edita `cms/.env`:
```env
PREVIEW_URL=https://tu-dominio.com
```

### Añadir más content types:

Sigue la guía en [PREVIEW_SETUP.md](./PREVIEW_SETUP.md) - Sección "Añadir nuevos Content Types al preview"

## 📊 Flujo de datos

```
┌─────────────────┐
│ Usuario en      │
│ Strapi Admin    │
└────────┬────────┘
         │ Click "Open preview"
         ↓
┌─────────────────────────────────────────┐
│ Strapi genera URL:                      │
│ /api/preview?type=X&documentId=Y        │
└────────┬────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│ API Route (/api/preview)                │
│ - Establece cookie de preview           │
│ - Redirige a página de preview          │
└────────┬────────────────────────────────┘
         │
         ↓
┌─────────────────────────────────────────┐
│ Página de Preview                       │
│ - Lee cookie                            │
│ - setPreviewContext(true)               │
│ - Fetch contenido con status=draft      │
│ - Muestra banner + contenido            │
└─────────────────────────────────────────┘
```

## 🐛 Troubleshooting

### Problema: El botón "Open preview" no aparece
**Solución**:
- Verifica que `PREVIEW_URL` esté en `cms/.env`
- Reinicia el servidor de Strapi
- Asegúrate de haber guardado el contenido

### Problema: Error 400 al hacer click en preview
**Solución**:
- Verifica que Astro esté corriendo en http://localhost:4321
- Revisa los logs de Astro para más detalles

### Problema: El preview muestra contenido antiguo
**Solución**:
- Sal del preview usando el botón "Salir del preview"
- Limpia las cookies del navegador
- Vuelve a entrar al preview desde Strapi

### Problema: "Cannot find module" al iniciar
**Solución**:
```bash
npm install
```

## 📚 Documentación adicional

- [PREVIEW_SETUP.md](./PREVIEW_SETUP.md) - Documentación técnica completa
- [Docs Strapi Preview](https://docs.strapi.io/user-docs/latest/features/preview)
- [Docs Astro SSR](https://docs.astro.build/en/guides/server-side-rendering/)

## 💡 Tips

1. **Siempre guarda** antes de hacer preview
2. **Las cookies expiran** en 30 minutos
3. **Usa el botón "Salir del preview"** para limpiar el estado
4. **El banner azul** siempre indica que estás en modo preview
5. **Content source maps** se activan automáticamente en preview

## 🎉 ¡Listo para usar!

Tu sistema de preview está completamente funcional. Solo inicia los servidores y empieza a probarlo.

¿Necesitas ayuda? Consulta [PREVIEW_SETUP.md](./PREVIEW_SETUP.md) para más detalles técnicos.
