# 🌍 Resumen Ejecutivo: Multiidioma INSESO

## 📊 Situación Actual
- **Idioma actual**: Solo español
- **Páginas**: 35 páginas .astro
- **Contenido dinámico**: 100% desde Strapi
- **Paquetes i18n**: Ninguno instalado

## 🎯 Estrategia Recomendada

### **Astro i18n + Strapi i18n Plugin**

#### Idiomas Propuestos (en orden de prioridad):
1. 🇪🇸 **Español** (actual, default)
2. 🇫🇷 **Francés** (prioritario - idioma oficial GQ)
3. 🇵🇹 **Portugués** (medio - idioma oficial GQ)
4. 🇬🇧 **Inglés** (opcional - internacional)

## 💡 Cómo Funcionará

### URLs Localizadas:
```
Español:    https://inseso.org/noticias
Francés:    https://inseso.org/fr/actualites
Portugués:  https://inseso.org/pt/noticias
```

### En Strapi (Panel de Admin):
Los editores verán un selector de idioma al crear/editar contenido:
- Crean noticia en español
- Click en "Add locale" → Traducen a francés
- Click en "Add locale" → Traducen a portugués
- Publican en todos los idiomas a la vez

### En el Sitio Web:
- Selector de idioma en navbar (banderitas o dropdown)
- Al cambiar idioma, **toda** la página se traduce:
  - Menú de navegación
  - Contenido (noticias, prestaciones, formularios)
  - Botones y textos
  - Footer

## ⏱️ Tiempo y Costo

### Cronograma: **3-4 semanas**
| Fase | Duración |
|------|----------|
| Setup técnico (Astro + Strapi) | 5 días |
| Migración de páginas | 5 días |
| SEO y optimización | 2 días |
| Traducción de contenido | 3 días |
| Testing y correcciones | 2 días |
| Deploy | 1 día |

### Costo Estimado:
- **Desarrollo interno**: $5,400 - $6,000
- **Agencia externa**: $10,000 - $15,000
- **Traducción profesional** (opcional): $2,000 - $3,000

## ✅ Ventajas de Esta Estrategia

1. ✅ **Fácil para editores**: Todo desde panel de Strapi, sin código
2. ✅ **SEO optimizado**: URLs limpias, hreflang tags automáticos
3. ✅ **Escalable**: Agregar nuevos idiomas es trivial
4. ✅ **Mantenible**: Una sola codebase, contenido separado
5. ✅ **Sin impacto en rendimiento**: Sin JavaScript adicional
6. ✅ **Professional**: URLs nativas (`/fr/`, `/pt/`)

## 📦 Qué Incluye

### Backend (Strapi):
- Plugin i18n instalado y configurado
- Todos los content types habilitados para traducción
- Interface de traducción para editores

### Frontend (Astro):
- Sistema de routing multiidioma
- Selector de idioma en navbar
- Archivos de traducción para UI estático
- SEO tags (hreflang, canonical)
- Sitemap multiidioma

## 🚀 Empezar Ahora

### Decisiones Necesarias:
1. ¿Cuántos idiomas? (2, 3 o 4)
2. ¿Traducción profesional o interna?
3. ¿Priorizar qué contenido traducir primero?

### Primera Iteración (MVP):
**Opción rápida (1-2 semanas):**
- Solo español + francés
- Traducir solo páginas principales (home, noticias, contacto)
- Traducir últimas 10 noticias
- Resto del contenido se traduce progresivamente

**Resultado**: Sitio bilingüe funcional en 2 semanas

---

## 📖 Documentación Completa

Ver documento detallado: [docs/ESTRATEGIA_MULTIIDIOMA.md](docs/ESTRATEGIA_MULTIIDIOMA.md)

Incluye:
- Análisis técnico completo
- Código de ejemplo para cada fase
- Alternativas evaluadas
- Diagramas de arquitectura
- Referencias y recursos
