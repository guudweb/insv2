# 🎥 Actualizar Content Type Noticia para Videos de Strapi

## 📝 Problema Actual

Actualmente, el campo `video` en el Content Type **Noticia** es un campo de texto donde debes pegar una URL (YouTube, Vimeo, o ruta del servidor).

**Mejor solución:** Agregar un campo de tipo **Media** para subir videos directamente a Strapi.

---

## ✅ Solución: Agregar Campo `videoArchivo`

### Paso 1: Actualizar Content Type en Strapi

1. Ve a **Content-Type Builder** en Strapi
2. Haz clic en **Noticia** en la lista de Collection Types
3. Haz clic en **Edit** (lápiz)
4. Haz clic en **Add another field**

#### Agregar Campo `videoArchivo`

- **Tipo**: **Media**
- **Name**: `videoArchivo`
- **Type**: **Single media**
- **Allowed types**: ✅ **Videos** (mp4, webm, mov, avi)
- **ADVANCED SETTINGS**:
  - ❌ Required field (opcional)
  - Max file size: Según tu configuración (recomendado: 100MB+)

5. Haz clic en **Finish**
6. Haz clic en **Save**
7. Espera que Strapi se reinicie

---

## 🔧 Actualizar Código (Opcional - Ya lo hago yo)

Voy a actualizar el código para que:
1. Priorice `videoArchivo` (video subido a Strapi)
2. Si no hay `videoArchivo`, use el campo `video` (URL externa)
3. Funcione con ambos métodos

---

## 📊 Uso Recomendado

### Para Videos Externos (YouTube, Vimeo):
1. Crear/Editar Noticia en Strapi
2. Campo `video`: Pegar URL del video
   - YouTube: `https://www.youtube.com/embed/VIDEO_ID`
   - Vimeo: `https://player.vimeo.com/video/VIDEO_ID`
3. Campo `tipoMedia`: Seleccionar `video`
4. Dejar `videoArchivo` vacío

### Para Videos Subidos a Strapi:
1. Crear/Editar Noticia en Strapi
2. Campo `videoArchivo`: Subir archivo de video (.mp4, .webm, etc.)
3. Campo `tipoMedia`: Seleccionar `video`
4. Campo `video` puede estar vacío

---

## 🎯 Ventajas de Usar `videoArchivo`

✅ **Control total:** Los videos están en tu servidor
✅ **Sin dependencias:** No depende de YouTube/Vimeo
✅ **Privacidad:** Los videos no están en plataformas externas
✅ **Mejor UX:** Experiencia uniforme en el sitio

---

## ⚠️ Consideraciones

### Tamaño de Archivos
- Videos pueden ser archivos grandes (50-500 MB)
- Asegúrate de tener suficiente espacio en disco
- Considera usar un CDN para servir videos

### Configuración de Strapi
Puede que necesites aumentar el límite de tamaño de archivos en Strapi.

Edita `config/middlewares.js` (o `.ts`):

```javascript
module.exports = [
  // ... otros middlewares
  {
    name: 'strapi::body',
    config: {
      formLimit: '256mb', // Aumentar límite
      jsonLimit: '256mb',
      textLimit: '256mb',
      formidable: {
        maxFileSize: 250 * 1024 * 1024, // 250MB en bytes
      },
    },
  },
  // ... otros middlewares
];
```

Reinicia Strapi después de cambiar la configuración.

---

## 🚀 Configuración en Nginx (Producción)

Si usas Nginx, aumenta el límite de subida:

```nginx
server {
    client_max_body_size 250M;
    # ... resto de la configuración
}
```

---

## 📝 Actualizar Script de Población

Si quieres poblar una noticia con video desde el script, primero debes subir el video manualmente a Strapi y luego obtener su ID.

**No es posible** subir archivos de video desde el script de población sin usar multipart/form-data.

**Recomendación:** Sube videos manualmente desde el panel de Strapi.

---

## ✅ Una vez agregado el campo `videoArchivo`

Avísame y actualizaré:
1. La interfaz TypeScript en `strapi.ts`
2. Las funciones de fetch para incluir `videoArchivo`
3. La página de detalle de noticia para priorizar `videoArchivo`
4. El componente de index.astro

---

**¿Procedemos con agregar el campo `videoArchivo` en Strapi?**
