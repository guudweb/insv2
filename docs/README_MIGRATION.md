# Migración de INSESO a Astro

## Estado de la Migración

### ✅ Completado - MIGRACIÓN FINALIZADA

1. **Inicialización del proyecto Astro**
   - ✅ Configuración de Astro v4.16.19
   - ✅ Estructura de carpetas: `src/`, `public/`

2. **Assets migrados a `/public`**
   - ✅ CSS (todos los estilos originales + custom-adjustments.css)
   - ✅ Imágenes
   - ✅ Videos
   - ✅ Webfonts
   - ✅ Vendor (Bootstrap, jQuery)
   - ✅ JavaScript

3. **Componentes creados**
   - ✅ `TopBar.astro` - Barra superior con redes sociales
   - ✅ `Navbar.astro` - Navegación principal
   - ✅ `Footer.astro` - Pie de página
   - ✅ `HeroCarousel.astro` - Carousel principal
   - ✅ `BlogSlider.astro` - Slider de categorías

4. **Layouts**
   - ✅ `BaseLayout.astro` - Layout base con todos los CSS originales

5. **Todas las páginas migradas (22 páginas)**
   - ✅ `/` - Inicio
   - ✅ `/sobre_nosotros` - Sobre nosotros
   - ✅ `/contacto` - Contacto
   - ✅ `/afiliacionee_trabajadores` - Afiliación trabajadores
   - ✅ `/afiliacionee_empresas` - Afiliación empresas
   - ✅ `/afiliacionee_autonomo` - Afiliación autónomos
   - ✅ `/afiliación_fernanda` - Afiliación
   - ✅ `/condiciones_adhesion` - Condiciones de adhesión
   - ✅ `/información_1`, `/información_2`, `/información_3` - Información
   - ✅ `/Pensión_por_vejez` - Pensión por vejez
   - ✅ `/Prestaciones_Médico_Farmacéuticas` - Prestaciones médicas
   - ✅ `/Prestaciones_por_invalidez` - Prestaciones invalidez
   - ✅ `/Prestaciones_por_muerte_y_supervivencia` - Muerte y supervivencia
   - ✅ `/Prestaciones_Sociales` - Prestaciones sociales
   - ✅ `/Protección_al_empleo` - Protección al empleo
   - ✅ `/Servicios_sociales` - Servicios sociales
   - ✅ `/solicitud_de_carne` - Solicitud de carné
   - ✅ `/Subsidio_de_incapacidad_temporal` - Subsidio incapacidad
   - ✅ `/Subsidio_por_maternidad` - Subsidio maternidad
   - ✅ `/Subsidios_familiares` - Subsidios familiares

6. **Mejoras aplicadas**
   - ✅ Owl Carousel funcionando correctamente (horizontal)
   - ✅ Tamaño de letra aumentado para mejor legibilidad
   - ✅ Navbar y dropdowns ajustados
   - ✅ Todos los estilos preservados

### 🎯 Próximos pasos (opcional)

- (Opcional) Reemplazar Owl Carousel con Swiper.js moderno
- (Opcional) Optimizar imágenes para mejor rendimiento
- (Opcional) Implementar SSG completo para mejor SEO

## Estilos y Diseño

**Todos los estilos originales se mantienen intactos:**
- Colores principales: #6a150e, #8c1b12, #6d2018 (rojos)
- Color de acento: #1273eb (azul)
- Tipografía: Work Sans
- Bootstrap 4
- Font Awesome para iconos
- Todos los CSS originales cargados en el mismo orden

## Cómo ejecutar el proyecto

```bash
# Servidor de desarrollo
npm run dev

# Build para producción
npm run build

# Preview del build
npm run preview
```

## Acceso al sitio

- **Desarrollo**: http://localhost:4322/
- Todas las rutas funcionan sin extensión `.html`
  - `/` → Inicio
  - `/sobre_nosotros` → Sobre nosotros
  - etc.

## Estructura del proyecto

```
inseso.org_V2/
├── src/
│   ├── layouts/
│   │   └── BaseLayout.astro
│   ├── components/
│   │   ├── TopBar.astro
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── HeroCarousel.astro
│   │   └── BlogSlider.astro
│   └── pages/
│       ├── index.astro
│       └── sobre_nosotros.astro
├── public/
│   ├── css/
│   ├── images/
│   ├── js/
│   ├── video/
│   ├── vendor/
│   └── webfonts/
├── package.json
└── astro.config.mjs
```

## Próximos pasos

1. Revisar visualmente las páginas migradas para confirmar que el diseño es idéntico
2. Migrar las páginas restantes siguiendo el mismo patrón
3. Probar todos los enlaces y funcionalidades
4. Optimizar el rendimiento si es necesario
