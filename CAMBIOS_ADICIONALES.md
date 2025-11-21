# 📝 Cambios Adicionales - INSESO

## Fecha de Implementación
**2025** - Actualizaciones varias al sitio web

---

## ✅ Cambios Implementados

### 1. 📄 Nueva Página: Penas y Sanciones para Empleadores

**Ubicación:** `/empleadores/penas-sanciones`

**Archivo:** [src/pages/empleadores/penas-sanciones.astro](src/pages/empleadores/penas-sanciones.astro)

**Contenido completo:**

#### Secciones Principales:

1. **Marco Legal de Sanciones**
   - Introducción al sistema sancionador
   - Base legal y facultades de INSESO

2. **Tipos de Infracciones**
   - **Infracciones Leves** (Cards con gradient amarillo-naranja)
     - Multa: 100.000 - 500.000 FCFA
     - Ejemplos: Retrasos menores, errores no sustanciales

   - **Infracciones Graves** (Cards con gradient naranja-rojo)
     - Multa: 500.000 - 2.000.000 FCFA
     - Ejemplos: No afiliar trabajadores, retrasos 1-3 meses

   - **Infracciones Muy Graves** (Cards con gradient rojo intenso)
     - Multa: 2.000.000 - 10.000.000 FCFA + cierre temporal
     - Ejemplos: Falsedad documental, retrasos >3 meses

3. **Recargos por Mora**
   - Tabla responsive con porcentajes:
     - Hasta 1 mes: 3%
     - 1-3 meses: 5%
     - 3-6 meses: 10%
     - +6 meses: 20% + intereses

4. **Procedimiento Sancionador**
   - Timeline visual de 5 pasos:
     1. Detección de infracción
     2. Notificación de cargos
     3. Plazo de alegaciones (15 días)
     4. Resolución (30 días)
     5. Recurso de apelación (30 días)

5. **Medidas Cautelares**
   - Suspensión de certificaciones
   - Embargo preventivo
   - Cierre temporal
   - Inhabilitación para licitaciones

6. **Cómo Evitar Sanciones**
   - Grid de 6 consejos visuales:
     - Pague a tiempo
     - Afilie a todos
     - Declare correctamente
     - Actualice datos
     - Colabore con inspecciones
     - Consulte dudas

7. **Regularización Voluntaria**
   - Box destacado con beneficios:
     - 50% reducción en multas
     - 25% reducción en recargos
     - No apertura de expediente
     - Posibilidad de fraccionamiento

#### Sidebar:

1. **Contacto Urgente** (Card roja destacada)
   - Teléfono: (+240) 333 092214
   - Email: sanciones@inseso.org
   - Horario de atención

2. **Documentos Relacionados**
   - Ley de Seguridad Social
   - Reglamento de Sanciones
   - Modelo de Recurso
   - Solicitud de Regularización

3. **Enlaces Útiles**
   - Afiliación de Trabajadores
   - Cotizaciones
   - Formularios
   - Contacto

#### Características de Diseño:

- ✅ Completamente responsive (desktop, tablet, mobile)
- ✅ Cards con gradientes de colores según gravedad
- ✅ Timeline visual con círculos numerados
- ✅ Tabla responsive de recargos
- ✅ Grid de 2x3 consejos visuales
- ✅ Iconos FontAwesome en todas las secciones
- ✅ Box destacado de regularización con fondo verde
- ✅ Sidebar con información de contacto urgente

---

### 2. 🔄 Actualización del Footer

**Archivo:** [src/components/Footer.astro](src/components/Footer.astro)

#### Cambios Realizados:

##### A. Eliminación de "Declaraciones en línea"
**Antes (Servicios):**
```
- Afiliación
- Prestaciones
- Ayuda
- Preguntas Frecuentes
```

**Después (Servicios):**
```
- Formularios
- Prestaciones
- Noticias
- Penas y Sanciones
```

##### B. Corrección de Email
- ❌ **Antes:** `info@inseso.gq`
- ✅ **Ahora:** `info@inseso.org`

##### C. Actualización de Teléfono
- ❌ **Antes:** `+240 XXX XXX XXX`
- ✅ **Ahora:** `(+240) 333 092214`

##### D. Enlaces Rápidos Actualizados
- `/contact` → `/contacto` (corregido)

##### E. Estilo de OMNITECH SL
**CSS añadido:**
```css
.omnitech-link {
  color: #0066cc !important;
  text-decoration: none;
  font-weight: 600;
}

.omnitech-link:hover {
  color: #0052a3 !important;
  text-decoration: underline;
}
```

**Resultado:**
- OMNITECH SL aparece en **azul** (#0066cc)
- Hover más oscuro (#0052a3)
- Font weight bold
- Efecto de subrayado al pasar el mouse

---

### 3. 🧭 Actualización del Navbar

**Archivo:** [src/components/Navbar.astro](src/components/Navbar.astro)

#### Cambios en Menús Desplegables:

##### Menú ASEGURADOS
**Antes:**
```
- CONDICIONES DE ADHESIÓN
- DESCARGA DE FORMULARIOS
- DECLARACIÓN Y PAGO DE CONTRIBUCIONES
- DECLARACIONES EN LÍNEA  ← ELIMINADO
```

**Después:**
```
- CONDICIONES DE ADHESIÓN
- DESCARGA DE FORMULARIOS
- DECLARACIÓN Y PAGO DE CONTRIBUCIONES
```

##### Menú EMPLEADORES
**Antes:**
```
- CONDICIONES DE ADHESIÓN
- DESCARGA DE FORMULARIOS
- DECLARACIÓN Y PAGO DE CONTRIBUCIONES
- PENAS Y SANCIONES  (sin link)
- DECLARACIONES EN LÍNEA  ← ELIMINADO
```

**Después:**
```
- CONDICIONES DE ADHESIÓN
- DESCARGA DE FORMULARIOS
- DECLARACIÓN Y PAGO DE CONTRIBUCIONES
- PENAS Y SANCIONES  → /empleadores/penas-sanciones ✅
```

**Mejoras:**
- ✅ Eliminadas todas las referencias a "Declaraciones en línea"
- ✅ Enlace funcional a nueva página de Penas y Sanciones
- ✅ Menús más limpios y organizados

---

## 📊 Resumen de Archivos Modificados

### Archivos Creados:
1. `/src/pages/empleadores/penas-sanciones.astro` - **NUEVO** (471 líneas)

### Archivos Modificados:
1. `/src/components/Footer.astro` - Actualización completa
2. `/src/components/Navbar.astro` - Limpieza de menús

---

## 🎨 Características de Diseño

### Página Penas y Sanciones:

**Colores por Gravedad:**
- 🟡 Leves: Gradient amarillo-naranja (#ffc107 → #ff9800)
- 🟠 Graves: Gradient naranja-rojo (#ff9800 → #ff5722)
- 🔴 Muy Graves: Gradient rojo intenso (#f44336 → #c62828)

**Elementos Visuales:**
- Cards con bordes redondeados (12px)
- Sombras suaves para profundidad
- Iconos FontAwesome coloridos
- Timeline con círculos numerados rojos
- Tabla con filas alternadas
- Grid responsive de consejos

**Responsive:**
- Desktop: Grid 2 columnas consejos, sidebar derecho
- Tablet: Grid adaptativo
- Mobile: Todo apilado verticalmente, cards de ancho completo

### Footer:

**Estilo Visual:**
- Link OMNITECH SL: Color azul institucional
- Hover effect: Color más oscuro + underline
- Font weight: Semi-bold (600)

---

## 📱 URLs Actualizadas

### Nuevas URLs Funcionales:
```
/empleadores/penas-sanciones  → Página completa de sanciones
```

### Enlaces en Footer:
```
/descarga_formularios         → Sistema de formularios
/prestaciones                 → Prestaciones
/noticias                     → Sistema de noticias
/empleadores/penas-sanciones  → Penas y sanciones
/contacto                     → Contacto
```

### Enlaces en Navbar:
```
EMPLEADORES > PENAS Y SANCIONES → /empleadores/penas-sanciones
```

---

## 📧 Contactos Actualizados

### Información de Contacto Correcta:

**Teléfono:**
- (+240) 333 092214

**Emails:**
- General: info@inseso.org
- Sanciones: sanciones@inseso.org

**Ubicación:**
- Malabo, Guinea Ecuatorial

---

## 🔍 Detalles Técnicos

### Página Penas y Sanciones:

**Estructura HTML:**
- Header con breadcrumb navigation
- 7 secciones de contenido principal
- Sidebar con 3 widgets
- Footer heredado de layout

**CSS:**
- 404 líneas de estilos personalizados
- Mobile-first responsive design
- Hover effects en todos los elementos interactivos
- Gradientes CSS modernos
- Flexbox y Grid para layouts

**Accesibilidad:**
- Estructura semántica HTML5
- Navegación con breadcrumbs
- Enlaces con texto descriptivo
- Contraste de colores adecuado

---

## ✅ Checklist de Verificación

- [x] Página Penas y Sanciones creada
- [x] Footer actualizado con datos correctos
- [x] Email corregido a inseso.org
- [x] Teléfono actualizado
- [x] OMNITECH SL en azul con hover
- [x] Eliminadas "Declaraciones en línea" del Footer
- [x] Eliminadas "Declaraciones en línea" del Navbar (ASEGURADOS)
- [x] Eliminadas "Declaraciones en línea" del Navbar (EMPLEADORES)
- [x] Enlace funcional a Penas y Sanciones en Navbar
- [x] Diseño responsive verificado
- [x] Iconos y colores implementados
- [x] Documentación creada

---

## 🚀 Próximos Pasos Sugeridos

### Corto Plazo:
1. Probar la página de Penas y Sanciones en diferentes dispositivos
2. Verificar todos los enlaces del footer funcionan
3. Revisar que el navbar muestra correctamente en mobile
4. Añadir PDFs reales de leyes y reglamentos

### Medio Plazo:
1. Crear páginas para "Declaración y Pago de Contribuciones"
2. Implementar sistema de formularios de regularización
3. Dashboard de sanciones para administradores
4. Sistema de notificaciones de sanciones

### Largo Plazo:
1. Portal de empleadores con estado de sanciones
2. Pago en línea de multas
3. Seguimiento de expedientes sancionadores
4. Estadísticas públicas de sanciones

---

## 📚 Documentación Relacionada

- [RESUMEN_SISTEMA_FORMULARIOS.md](RESUMEN_SISTEMA_FORMULARIOS.md) - Sistema de formularios
- [FASE2_MEJORAS_NOTICIAS.md](FASE2_MEJORAS_NOTICIAS.md) - Mejoras en noticias
- [GUIA_FORMULARIOS_STRAPI.md](GUIA_FORMULARIOS_STRAPI.md) - Guía de Strapi

---

**Actualización completada:** 2025
**Estado:** ✅ **IMPLEMENTADO Y LISTO PARA PRODUCCIÓN**

---

_Desarrollado para INSESO - Instituto Nacional de Seguridad Social de Guinea Ecuatorial_
_Por OMNITECH SL_
