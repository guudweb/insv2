# Datos para Popular en Strapi

Este documento contiene todos los datos que debes agregar manualmente en el panel de administración de Strapi.

## 📋 Instrucciones Generales

1. Inicia Strapi: `cd cms && npm run develop`
2. Accede al panel admin: http://localhost:1337/admin
3. Agrega los datos en el orden indicado
4. **IMPORTANTE**: Después de agregar cada entrada, haz clic en "Publish" (no solo "Save")

---

## 1️⃣ CATEGORÍAS DE NOTICIAS

**Content Type:** `Categoria` (api::categoria.categoria)
**Ruta en Strapi:** Content Manager → Categoria

### Categoría 1: Institucional
- **nombre:** `Institucional`
- **slug:** `institucional`
- **descripcion:** `Noticias institucionales de INSESO`
- **color:** `#8c1b12`
- **icono:** `fa-building`
- **activo:** ✅ Activado

### Categoría 2: Eventos
- **nombre:** `Eventos`
- **slug:** `eventos`
- **descripcion:** `Eventos y actividades de INSESO`
- **color:** `#1b5e8c`
- **icono:** `fa-calendar`
- **activo:** ✅ Activado

### Categoría 3: Prestaciones
- **nombre:** `Prestaciones`
- **slug:** `prestaciones`
- **descripcion:** `Información sobre prestaciones sociales`
- **color:** `#2e8c1b`
- **icono:** `fa-hand-holding-heart`
- **activo:** ✅ Activado

### Categoría 4: Comunicados
- **nombre:** `Comunicados`
- **slug:** `comunicados`
- **descripcion:** `Comunicados oficiales`
- **color:** `#8c6d1b`
- **icono:** `fa-bullhorn`
- **activo:** ✅ Activado

### Categoría 5: Salud
- **nombre:** `Salud`
- **slug:** `salud`
- **descripcion:** `Noticias relacionadas con salud`
- **color:** `#8c1b6d`
- **icono:** `fa-heartbeat`
- **activo:** ✅ Activado

---

## 2️⃣ CATEGORÍAS DE FORMULARIOS

**Content Type:** `Categoria Formulario` (api::categoria-formulario.categoria-formulario)
**Ruta en Strapi:** Content Manager → Categorias Formularios

### Categoría 1: Afiliación
- **titulo:** `Afiliación`
- **descripcion:** `Formularios para afiliación y actualización de datos`
- **icono:** `fas fa-user-plus`
- **color:** `#8c1b12`
- **orden:** `1`
- **activa:** ✅ Activado

### Categoría 2: Prestaciones Sociales
- **titulo:** `Prestaciones Sociales`
- **descripcion:** `Solicitudes de prestaciones y pensiones`
- **icono:** `fas fa-hands-helping`
- **color:** `#217346`
- **orden:** `2`
- **activa:** ✅ Activado

### Categoría 3: Declaraciones y Contribuciones
- **titulo:** `Declaraciones y Contribuciones`
- **descripcion:** `Declaraciones y pagos de cotizaciones`
- **icono:** `fas fa-file-invoice-dollar`
- **color:** `#0066cc`
- **orden:** `3`
- **activa:** ✅ Activado

### Categoría 4: Certificados y Constancias
- **titulo:** `Certificados y Constancias`
- **descripcion:** `Solicitudes de certificados y constancias`
- **icono:** `fas fa-certificate`
- **color:** `#d97706`
- **orden:** `4`
- **activa:** ✅ Activado

### Categoría 5: Otros Trámites
- **titulo:** `Otros Trámites`
- **descripcion:** `Formularios adicionales y servicios generales`
- **icono:** `fas fa-folder-open`
- **color:** `#7c3aed`
- **orden:** `5`
- **activa:** ✅ Activado

---

## 3️⃣ FORMULARIOS (Ejemplos)

**Content Type:** `Formulario` (api::formulario.formulario)
**Ruta en Strapi:** Content Manager → Formularios

### 📌 Categoría: Afiliación

#### Formulario 1
- **nombre:** `Solicitud de Afiliación - Trabajador`
- **codigo:** `AF-001`
- **descripcion:** `Formulario para solicitar la afiliación de trabajadores al sistema de seguridad social`
- **formato:** `PDF`
- **tamano:** `250 KB`
- **categoria_formulario:** Seleccionar "Afiliación"
- **orden:** `1`
- **activo:** ✅ Activado
- **archivo:** (Subir archivo PDF o dejar vacío)
- **thumbnail:** (Subir imagen o dejar vacío)

#### Formulario 2
- **nombre:** `Solicitud de Afiliación - Empleador`
- **codigo:** `AF-002`
- **descripcion:** `Formulario para registro de empleadores en el sistema INSESO`
- **formato:** `PDF`
- **tamano:** `320 KB`
- **categoria_formulario:** Seleccionar "Afiliación"
- **orden:** `2`
- **activo:** ✅ Activado

#### Formulario 3
- **nombre:** `Actualización de Datos del Afiliado`
- **codigo:** `AF-003`
- **descripcion:** `Actualice su información personal y de contacto`
- **formato:** `PDF`
- **tamano:** `180 KB`
- **categoria_formulario:** Seleccionar "Afiliación"
- **orden:** `3`
- **activo:** ✅ Activado

### 📌 Categoría: Prestaciones Sociales

#### Formulario 4
- **nombre:** `Solicitud de Prestación por Enfermedad`
- **codigo:** `PS-001`
- **descripcion:** `Solicite ayuda económica por enfermedad o incapacidad temporal`
- **formato:** `PDF`
- **tamano:** `290 KB`
- **categoria_formulario:** Seleccionar "Prestaciones Sociales"
- **orden:** `1`
- **activo:** ✅ Activado

#### Formulario 5
- **nombre:** `Solicitud de Prestación por Maternidad`
- **codigo:** `PS-002`
- **descripcion:** `Formulario para solicitar prestación por maternidad`
- **formato:** `PDF`
- **tamano:** `275 KB`
- **categoria_formulario:** Seleccionar "Prestaciones Sociales"
- **orden:** `2`
- **activo:** ✅ Activado

#### Formulario 6
- **nombre:** `Solicitud de Pensión de Jubilación`
- **codigo:** `PS-003`
- **descripcion:** `Inicie su trámite de pensión por jubilación`
- **formato:** `PDF`
- **tamano:** `340 KB`
- **categoria_formulario:** Seleccionar "Prestaciones Sociales"
- **orden:** `3`
- **activo:** ✅ Activado

#### Formulario 7
- **nombre:** `Solicitud de Pensión de Invalidez`
- **codigo:** `PS-004`
- **descripcion:** `Solicite pensión por invalidez permanente`
- **formato:** `PDF`
- **tamano:** `310 KB`
- **categoria_formulario:** Seleccionar "Prestaciones Sociales"
- **orden:** `4`
- **activo:** ✅ Activado

#### Formulario 8
- **nombre:** `Solicitud de Pensión de Supervivencia`
- **codigo:** `PS-005`
- **descripcion:** `Formulario para beneficiarios de pensión de supervivencia`
- **formato:** `PDF`
- **tamano:** `295 KB`
- **categoria_formulario:** Seleccionar "Prestaciones Sociales"
- **orden:** `5`
- **activo:** ✅ Activado

### 📌 Categoría: Declaraciones y Contribuciones

#### Formulario 9
- **nombre:** `Declaración Mensual de Cotizaciones`
- **codigo:** `DC-001`
- **descripcion:** `Plantilla Excel para declaración mensual de cotizaciones`
- **formato:** `Excel`
- **tamano:** `450 KB`
- **categoria_formulario:** Seleccionar "Declaraciones y Contribuciones"
- **orden:** `1`
- **activo:** ✅ Activado

#### Formulario 10
- **nombre:** `Solicitud de Fraccionamiento de Pago`
- **codigo:** `DC-002`
- **descripcion:** `Solicite facilidades de pago para deudas pendientes`
- **formato:** `PDF`
- **tamano:** `220 KB`
- **categoria_formulario:** Seleccionar "Declaraciones y Contribuciones"
- **orden:** `2`
- **activo:** ✅ Activado

#### Formulario 11
- **nombre:** `Declaración Rectificativa`
- **codigo:** `DC-003`
- **descripcion:** `Corrija errores en declaraciones anteriores`
- **formato:** `PDF`
- **tamano:** `200 KB`
- **categoria_formulario:** Seleccionar "Declaraciones y Contribuciones"
- **orden:** `3`
- **activo:** ✅ Activado

### 📌 Categoría: Certificados y Constancias

#### Formulario 12
- **nombre:** `Solicitud de Certificado de Afiliación`
- **codigo:** `CC-001`
- **descripcion:** `Obtenga su certificado de afiliación vigente`
- **formato:** `PDF`
- **tamano:** `150 KB`
- **categoria_formulario:** Seleccionar "Certificados y Constancias"
- **orden:** `1`
- **activo:** ✅ Activado

#### Formulario 13
- **nombre:** `Solicitud de Certificado de Vida Laboral`
- **codigo:** `CC-002`
- **descripcion:** `Certificado con su historial de cotizaciones`
- **formato:** `PDF`
- **tamano:** `170 KB`
- **categoria_formulario:** Seleccionar "Certificados y Constancias"
- **orden:** `2`
- **activo:** ✅ Activado

#### Formulario 14
- **nombre:** `Constancia de No Deuda`
- **codigo:** `CC-003`
- **descripcion:** `Documento que certifica que no tiene deudas pendientes`
- **formato:** `PDF`
- **tamano:** `160 KB`
- **categoria_formulario:** Seleccionar "Certificados y Constancias"
- **orden:** `3`
- **activo:** ✅ Activado

### 📌 Categoría: Otros Trámites

#### Formulario 15
- **nombre:** `Formulario de Reclamaciones`
- **codigo:** `OT-001`
- **descripcion:** `Presente quejas o reclamaciones sobre servicios`
- **formato:** `PDF`
- **tamano:** `190 KB`
- **categoria_formulario:** Seleccionar "Otros Trámites"
- **orden:** `1`
- **activo:** ✅ Activado

#### Formulario 16
- **nombre:** `Solicitud de Duplicado de Carnet`
- **codigo:** `OT-002`
- **descripcion:** `Solicite un duplicado de su carnet de afiliado`
- **formato:** `PDF`
- **tamano:** `140 KB`
- **categoria_formulario:** Seleccionar "Otros Trámites"
- **orden:** `2`
- **activo:** ✅ Activado

#### Formulario 17
- **nombre:** `Autorización de Representante`
- **codigo:** `OT-003`
- **descripcion:** `Autorice a un tercero para realizar trámites en su nombre`
- **formato:** `PDF`
- **tamano:** `130 KB`
- **categoria_formulario:** Seleccionar "Otros Trámites"
- **orden:** `3`
- **activo:** ✅ Activado

---

## 📝 Notas Importantes

1. **Orden de creación:** Crea primero las categorías, luego los formularios
2. **Publicar:** No olvides hacer clic en "Publish" en cada entrada
3. **Archivos:** Los campos de archivo (thumbnail, archivo) pueden dejarse vacíos inicialmente
4. **Iconos:** Los iconos usan la nomenclatura de FontAwesome (ej: `fa-building`, `fas fa-user-plus`)
5. **Colores:** Usa códigos hexadecimales (ej: `#8c1b12`)

---

## ✅ Verificación

Después de agregar los datos en Strapi:
1. Ve a la página de descarga de formularios: http://localhost:4321/descarga_formularios
2. Los formularios deben aparecer organizados por categorías
3. Si no aparecen, verifica que:
   - Todas las entradas estén publicadas (Published)
   - El campo "activo/activa" esté marcado
   - Strapi esté corriendo (cd cms && npm run develop)

---

## 🔄 Después de Popular los Datos

Una vez agregues estos datos en Strapi, el frontend ya está configurado para consumirlos automáticamente. La página de formularios ya tiene un sistema de fallback: si Strapi tiene datos, los usa; si no, muestra los datos estáticos por defecto.
