# Guía: Sistema de Gestión de Formularios con Strapi

## 📋 Resumen

Se ha implementado un sistema completo de gestión de formularios que permite administrar todos los formularios descargables desde el panel de Strapi, incluyendo:

- Categorización de formularios
- Subida de archivos PDF/Excel/Word
- Imágenes personalizadas (thumbnails)
- Contador de descargas
- Instrucciones y requisitos para cada formulario

## 🏗️ Estructura Creada

### Content Types

Se crearon dos content types nuevos en Strapi:

#### 1. **Categoría de Formulario** (`categoria-formulario`)
- **Ubicación**: `cms/src/api/categoria-formulario/`
- **Campos**:
  - `titulo` (String, requerido)
  - `descripcion` (Text, requerido)
  - `icono` (String) - Clase de FontAwesome (ej: "fas fa-file-pdf")
  - `color` (String) - Color hexadecimal (ej: "#8c1b12")
  - `orden` (Integer) - Para ordenar categorías
  - `activa` (Boolean)
  - `formularios` (Relación OneToMany)

#### 2. **Formulario** (`formulario`)
- **Ubicación**: `cms/src/api/formulario/`
- **Campos**:
  - `nombre` (String, requerido)
  - `codigo` (String, único) - Formato: XX-000 (ej: "AF-001")
  - `descripcion` (Text, requerido)
  - `formato` (Enum: PDF, Excel, Word)
  - `tamano` (String) - Ej: "250 KB"
  - `archivo` (Media) - El archivo descargable
  - `thumbnail` (Media Image) - Imagen del formulario
  - `categoria_formulario` (Relación ManyToOne)
  - `orden` (Integer)
  - `activo` (Boolean)
  - `requisitos` (Rich Text)
  - `instrucciones` (Rich Text)
  - `descargas` (Integer) - Contador de descargas

### Funciones Helper

Se añadieron las siguientes funciones en `/src/lib/strapi.ts`:

```typescript
getCategoriasFormularios()  // Obtiene todas las categorías con sus formularios
getFormularios()            // Obtiene todos los formularios
getFormularioByCodigo()     // Busca un formulario por su código
```

### Página Actualizada

La página `/descarga_formularios` ahora:
- ✅ Se conecta automáticamente a Strapi
- ✅ Muestra formularios dinámicos desde la base de datos
- ✅ Tiene fallback a datos estáticos si Strapi no está disponible
- ✅ Descarga archivos reales cuando están configurados

## 🚀 Pasos para Configurar

### 1. Reiniciar Strapi

```bash
cd cms
npm run build
npm run develop
```

### 2. Configurar Permisos

1. Ir a **Settings → Users & Permissions Plugin → Roles → Public**
2. Buscar `categoria-formulario`:
   - ✅ Marcar `find`
   - ✅ Marcar `findOne`
3. Buscar `formulario`:
   - ✅ Marcar `find`
   - ✅ Marcar `findOne`
4. Click en **Save**

### 3. Crear Categorías

1. Ir a **Content Manager → Categoria de Formulario**
2. Click en **Create new entry**
3. Llenar los campos:

#### Ejemplo: Categoría "Afiliación"
```
Titulo: Afiliación
Descripcion: Formularios para afiliación y actualización de datos
Icono: fas fa-user-plus
Color: #8c1b12
Orden: 1
Activa: ✅
```

#### Ejemplo: Categoría "Prestaciones Sociales"
```
Titulo: Prestaciones Sociales
Descripcion: Solicitudes de prestaciones y pensiones
Icono: fas fa-hands-helping
Color: #217346
Orden: 2
Activa: ✅
```

4. **Save** y **Publish**

### 4. Crear Formularios

1. Ir a **Content Manager → Formulario**
2. Click en **Create new entry**
3. Llenar los campos:

#### Ejemplo: Formulario de Afiliación
```
Nombre: Solicitud de Afiliación - Trabajador
Codigo: AF-001
Descripcion: Formulario para solicitar la afiliación de trabajadores al sistema de seguridad social
Formato: PDF
Tamano: 250 KB
Archivo: [Subir PDF]
Thumbnail: [Subir imagen o usar logo INSESO]
Categoria formulario: Afiliación
Orden: 1
Activo: ✅
Requisitos: (Rich Text) - Lista de documentos necesarios
Instrucciones: (Rich Text) - Cómo completar el formulario
```

4. **Save** y **Publish**

### 5. Lista de Códigos de Formularios

Para mantener coherencia, usa estos códigos:

**Afiliación (AF-XXX):**
- AF-001: Solicitud de Afiliación - Trabajador
- AF-002: Solicitud de Afiliación - Empleador
- AF-003: Actualización de Datos del Afiliado

**Prestaciones Sociales (PS-XXX):**
- PS-001: Solicitud de Prestación por Enfermedad
- PS-002: Solicitud de Prestación por Maternidad
- PS-003: Solicitud de Pensión de Jubilación
- PS-004: Solicitud de Pensión de Invalidez
- PS-005: Solicitud de Pensión de Supervivencia

**Declaraciones y Contribuciones (DC-XXX):**
- DC-001: Declaración Mensual de Cotizaciones
- DC-002: Solicitud de Fraccionamiento de Pago
- DC-003: Declaración Rectificativa

**Certificados y Constancias (CC-XXX):**
- CC-001: Solicitud de Certificado de Afiliación
- CC-002: Solicitud de Certificado de Vida Laboral
- CC-003: Constancia de No Deuda

**Otros Trámites (OT-XXX):**
- OT-001: Formulario de Reclamaciones
- OT-002: Solicitud de Duplicado de Carnet
- OT-003: Autorización de Representante

## 📝 Iconos de FontAwesome Sugeridos

Para las categorías, puedes usar estos iconos:

- **Afiliación**: `fas fa-user-plus`
- **Prestaciones Sociales**: `fas fa-hands-helping`
- **Declaraciones**: `fas fa-file-invoice-dollar`
- **Certificados**: `fas fa-certificate`
- **Otros**: `fas fa-folder-open`

## 🎨 Colores Sugeridos

- **Rojo INSESO**: `#8c1b12`
- **Verde**: `#217346`
- **Azul**: `#0066cc`
- **Naranja**: `#d97706`
- **Púrpura**: `#7c3aed`

## 🔄 Cómo Actualizar un Formulario

1. Ve a **Content Manager → Formulario**
2. Click en el formulario a editar
3. Modifica los campos necesarios
4. Si cambias el archivo:
   - Click en el campo **Archivo**
   - Sube el nuevo archivo
   - El anterior será reemplazado automáticamente
5. **Save** y **Publish**

## 📊 Estadísticas de Descargas

El campo `descargas` está preparado para rastrear cuántas veces se descarga cada formulario. En una futura actualización se puede implementar:

1. Un endpoint personalizado en Strapi
2. Una función que incremente el contador al hacer click en "Descargar"
3. Dashboard con estadísticas de formularios más descargados

## 🖼️ Sobre las Imágenes (Thumbnails)

Puedes:
- **Opción 1**: Usar el logo de INSESO para todos (como está ahora)
- **Opción 2**: Crear thumbnails personalizados para cada formulario
- **Opción 3**: Generar previsualizaciones de la primera página del PDF

Si no subes un thumbnail, automáticamente se usará `/images/logo_01.png`

## ✅ Verificación

Para verificar que todo funciona:

1. Asegúrate de que Strapi esté corriendo (`npm run develop` en la carpeta `cms`)
2. Verifica que los permisos públicos estén configurados
3. Visita: `http://localhost:4321/descarga_formularios`
4. Deberías ver los formularios que creaste en Strapi

Si no hay datos en Strapi, la página mostrará los datos estáticos como fallback.

## 🐛 Solución de Problemas

### No aparecen los formularios

1. Verifica que Strapi esté corriendo
2. Revisa los permisos públicos
3. Asegúrate de que los formularios estén **Published**
4. Verifica que `activo` esté marcado

### Error 403 (Forbidden)

- Falta configurar los permisos públicos en Strapi
- Sigue el paso 2 de "Pasos para Configurar"

### Los archivos no se descargan

- Verifica que hayas subido el archivo en el campo `archivo`
- Asegúrate de que Strapi esté corriendo y accesible

## 📦 Archivos Modificados/Creados

```
cms/src/api/
├── categoria-formulario/
│   ├── content-types/categoria-formulario/schema.json
│   ├── controllers/categoria-formulario.ts
│   ├── routes/categoria-formulario.ts
│   └── services/categoria-formulario.ts
└── formulario/
    ├── content-types/formulario/schema.json
    ├── controllers/formulario.ts
    ├── routes/formulario.ts
    └── services/formulario.ts

src/
├── lib/strapi.ts (actualizado)
└── pages/descarga_formularios.astro (actualizado)
```

## 🎯 Próximos Pasos Sugeridos

1. **Subir formularios reales**: Reemplazar los enlaces `#` con PDFs reales
2. **Crear thumbnails**: Diseñar imágenes atractivas para cada formulario
3. **Implementar analytics**: Rastrear descargas y formularios más populares
4. **Buscador**: Añadir función de búsqueda de formularios
5. **Filtros**: Permitir filtrar por formato (PDF/Excel) o categoría
6. **API de descargas**: Endpoint para incrementar contador automáticamente

---

**¡Sistema de Formularios Implementado Exitosamente! ✨**

## 🔍 NUEVA FUNCIONALIDAD: Búsqueda y Filtros

### Buscador Implementado ✅

La página ahora incluye un potente sistema de búsqueda con las siguientes características:

#### 1. **Barra de Búsqueda**
- 🔎 Búsqueda en tiempo real (mientras escribes)
- Busca por:
  - Nombre del formulario
  - Código (ej: "AF-001")
  - Categoría
- Botón para limpiar búsqueda
- Icono visual de búsqueda

#### 2. **Filtros por Formato**
Tres botones de filtro rápido:
- **Todos**: Muestra todos los formularios
- **PDF**: Solo formularios en formato PDF
- **Excel**: Solo formularios en formato Excel

Los filtros se pueden combinar con la búsqueda.

#### 3. **Resultados Dinámicos**
- ✅ Contador de resultados encontrados
- ✅ Grid responsive de resultados
- ✅ Mensaje cuando no hay coincidencias
- ✅ Botón para cerrar resultados y volver a la vista normal

### Cómo Usar el Buscador

Ejemplos de búsqueda:
- `"afiliación"` → Encuentra todos los formularios de afiliación
- `"AF-001"` → Encuentra el formulario específico por código
- `"pensión"` → Encuentra formularios relacionados con pensiones
- `"certificado"` → Encuentra todos los certificados

### Combinar Búsqueda y Filtros

1. Escribe en la barra de búsqueda: `"prestación"`
2. Click en el botón **PDF**
3. Verás solo las prestaciones en formato PDF

## 📊 Estado del Proyecto

### ✅ Funcionalidades Implementadas

**Sistema Base:**
- ✅ Content types en Strapi (Formulario y Categoría)
- ✅ Integración con Astro
- ✅ Diseño responsive con cards visuales
- ✅ Subida de archivos (PDF/Excel/Word)
- ✅ Gestión de thumbnails personalizados
- ✅ Fallback a datos estáticos

**Búsqueda y Filtros:**
- ✅ Buscador en tiempo real
- ✅ Filtros por formato (PDF/Excel/Word)
- ✅ Combinación de búsqueda + filtros
- ✅ Resultados dinámicos con contador
- ✅ Botón de limpiar búsqueda
- ✅ Diseño responsive del buscador

### 🔄 Funcionalidades Pendientes

1. **Contador de descargas automático**: Endpoint para rastrear cada descarga
2. **Dashboard de estadísticas**: Página de admin con métricas
3. **Exportación de reportes**: CSV/Excel con estadísticas
4. **Notificaciones**: Alertar cuando se actualiza un formulario
5. **Historial de versiones**: Mantener versiones anteriores de formularios

## 🚀 Actualizaciones Recientes

### Versión 1.1 - Sistema de Búsqueda
**Fecha**: [Fecha actual]

**Nuevas características:**
- Buscador en tiempo real con múltiples criterios
- Filtros por formato de archivo
- Interfaz mejorada con resultados dinámicos
- Contador de resultados encontrados
- Compatibilidad móvil completa

**Mejoras técnicas:**
- JavaScript optimizado para búsqueda rápida
- Clonación de elementos para mejor performance
- CSS mejorado para la interfaz de búsqueda
- Responsive design para todos los tamaños de pantalla

