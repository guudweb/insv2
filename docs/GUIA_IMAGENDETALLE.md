# Guía: Agregar ImagenDetalle a Prestaciones

## 📋 Resumen

El código ya está preparado para usar imágenes de detalle desde Strapi. Solo faltan 2 pasos que debes realizar en el panel de administración de Strapi:

1. Agregar el campo `imagenDetalle` al Content Type "Prestacion"
2. Subir las imágenes de detalle a cada prestación

---

## 🔧 Paso 1: Agregar campo imagenDetalle en Strapi

### Acceder al Content Type Builder

1. Abre tu panel de Strapi: `http://localhost:1337/admin`
2. Ve a **Content-Type Builder** (icono de cubo en el menú lateral)
3. En la lista de "COLLECTION TYPES", haz clic en **Prestacion**

### Agregar el campo imagenDetalle

4. Haz clic en el botón **"+ Add another field to this collection type"**
5. Selecciona el tipo de campo: **Media**
6. Configura el campo:
   - **Name**: `imagenDetalle`
   - **Type**: Single media
   - **Allowed types**: Selecciona solo **Images** (jpg, png, webp, etc.)
7. En la pestaña **ADVANCED SETTINGS**:
   - Deja **Required field** sin marcar (opcional)
   - Deja **Private field** sin marcar
8. Haz clic en **"Finish"**
9. Haz clic en **"Save"** en la parte superior derecha
10. Espera a que Strapi se reinicie automáticamente

---

## 📁 Paso 2: Ubicar las imágenes de detalle

Las imágenes de detalle ya existen en tu proyecto en:

```
/home/salolo/Documents/web/inseso.org_V2/public/images/prestaciones/
```

Archivos:
- `prestaciones_detail_01.jpg` → Prestaciones Médico-Farmacéuticas
- `prestaciones_detail_02.jpg` → Subsidio de incapacidad temporal
- `prestaciones_detail_03.jpg` → Subsidio por maternidad
- `prestaciones_detail_04.jpg` → Prestaciones por invalidez
- `prestaciones_detail_05.jpg` → Pensión por vejez
- `prestaciones_detail_06.jpg` → Prestaciones por muerte y supervivencia
- `prestaciones_detail_07.jpg` → Protección al empleo
- `prestaciones_detail_08.jpg` → Subsidios familiares
- `prestaciones_detail_09.jpg` → Servicios sociales

---

## 📤 Paso 3: Subir imágenes a cada prestación

### Para cada prestación (repetir 9 veces):

1. Ve a **Content Manager → Prestacion**
2. Haz clic en la prestación que quieres editar
3. Busca el nuevo campo **"ImagenDetalle"** (debería aparecer después del campo "Imagen")
4. Haz clic en **"Add an asset"**
5. En la ventana de Media Library:
   - Haz clic en **"Upload assets"**
   - Selecciona el archivo correspondiente (ej: `prestaciones_detail_01.jpg`)
   - O arrastra el archivo a la ventana
6. Selecciona la imagen que acabas de subir
7. Haz clic en **"Finish"**
8. Haz clic en **"Save"** y luego **"Publish"**
9. Repite para las otras 8 prestaciones

### Mapeo de imágenes:

| Prestación | Imagen de detalle |
|------------|-------------------|
| Prestaciones Médico-Farmacéuticas | prestaciones_detail_01.jpg |
| Subsidio de incapacidad temporal | prestaciones_detail_02.jpg |
| Subsidio por maternidad | prestaciones_detail_03.jpg |
| Prestaciones por invalidez | prestaciones_detail_04.jpg |
| Pensión por vejez | prestaciones_detail_05.jpg |
| Prestaciones por muerte y supervivencia | prestaciones_detail_06.jpg |
| Protección al empleo | prestaciones_detail_07.jpg |
| Subsidios familiares | prestaciones_detail_08.jpg |
| Servicios sociales | prestaciones_detail_09.jpg |

---

## ✅ Verificar que funciona

1. Una vez que hayas subido las imágenes, ve a una página de prestación, por ejemplo:
   - `http://localhost:4321/Pensión_por_vejez`
   - `http://localhost:4321/prestacion/pension-por-vejez`

2. Deberías ver:
   - La imagen de detalle (`prestaciones_detail_05.jpg`) en la página principal
   - Si no has subido la `imagenDetalle`, se mostrará la `imagen` del card
   - Si ninguna está disponible, se mostrará la imagen por defecto

---

## 🔍 Cómo funciona el código

### Lógica de fallback en PrestacionLayout.astro

El código usa una lógica de "cascada" para elegir qué imagen mostrar:

```astro
const imagenDetalle = prestacion?.imagenDetalle
  ? getStrapiImageUrl(prestacion.imagenDetalle.url)           // 1. Prioridad: imagenDetalle
  : (prestacion?.imagen
      ? getStrapiImageUrl(prestacion.imagen.url)              // 2. Fallback: imagen del card
      : defaultImagen);                                        // 3. Último recurso: imagen por defecto
```

Esto significa que:
- **Si existe `imagenDetalle`**: Se usa esa imagen
- **Si NO existe `imagenDetalle` pero SÍ existe `imagen`**: Se usa la imagen del card
- **Si NO existe ninguna**: Se usa la imagen por defecto del prop

### Actualización en strapi.ts

El archivo `strapi.ts` ya fue actualizado para incluir `imagenDetalle` en las consultas:

```typescript
populate: ['imagen', 'imagenDetalle']
```

Esto significa que cuando se hace fetch de las prestaciones, Strapi devolverá ambas imágenes.

---

## 🎯 Beneficios

Una vez completado esto, podrás:

1. **Tener imágenes diferentes** para el card (grid) y la página de detalle
2. **Actualizar imágenes desde Strapi** sin tocar el código
3. **Optimizar mejor las imágenes**:
   - Card: imagen más pequeña y cuadrada
   - Detalle: imagen más grande y con mejor resolución

---

## ⚠️ Notas Importantes

- Si durante la subida de imágenes obtienes un error, verifica:
  - Que el campo `imagenDetalle` se haya creado correctamente
  - Que Strapi se haya reiniciado después de agregar el campo
  - Que los permisos de "find" y "findOne" estén habilitados en **Settings → Users & Permissions Plugin → Public**

- Las páginas se cargan con SSR (`prerender = false`), así que los cambios en Strapi se reflejan inmediatamente sin necesidad de rebuild

---

**Última actualización:** 18 de noviembre de 2025
