# Plan para Sistema de Gestión de Noticias - INSESO

## Opción Simplificada: Sistema Personalizado con Astro

Dado que Strapi requiere configuración interactiva, te propongo un **sistema más simple y directo** que puedes gestionar completamente:

### 🎯 Arquitectura Propuesta:

```
inseso.org_V2/
├── src/
│   ├── pages/
│   │   ├── admin/
│   │   │   ├── login.astro          # Página de login
│   │   │   ├── dashboard.astro       # Panel de administración
│   │   │   └── nueva-noticia.astro   # Formulario para crear noticias
│   │   ├── noticias/
│   │   │   ├── index.astro          # Lista de noticias
│   │   │   └── [slug].astro         # Noticia individual
│   │   └── api/
│   │       ├── noticias.json.ts     # API para obtener noticias
│   │       ├── crear-noticia.ts     # API para crear noticias
│   │       └── login.ts             # API para autenticación
│   └── content/
│       └── noticias/                # Noticias en formato Markdown
│           ├── noticia-1.md
│           ├── noticia-2.md
│           └── ...
```

### ✨ Características:

1. **Login Simple**
   - Usuario y contraseña en variable de entorno
   - Session con JWT o cookies
   - Protección de rutas admin

2. **Panel de Administración**
   - Formulario para crear noticias
   - Lista de noticias publicadas
   - Posibilidad de editar/eliminar

3. **Noticias**
   - Se guardan como archivos Markdown
   - Incluyen: título, fecha, autor, contenido, imagen
   - Se muestran automáticamente en la página

4. **Sin Base de Datos**
   - Todo se guarda en archivos
   - Más simple de mantener
   - Backup automático con Git

### 🔧 Tecnologías:

- **Astro** (ya instalado)
- **Astro Content Collections** (para manejar noticias)
- **API Routes de Astro** (para el backend)
- **Auth simple** con cookies/JWT
- **Markdown** para el contenido

---

## Alternativa: Uso de Strapi (Manual)

Si prefieres Strapi, puedo darte los pasos para instalarlo manualmente:

1. Crear proyecto Strapi en servidor
2. Configurar base de datos SQLite
3. Crear modelo de Noticias
4. Conectar con Astro via API

---

## 💡 Mi Recomendación:

**Sistema Personalizado con Astro** porque:

✅ Más simple y directo
✅ No requiere base de datos adicional
✅ Todo integrado en tu proyecto
✅ Fácil de mantener y hacer backup
✅ Menos recursos del servidor

¿Quieres que implemente el sistema personalizado o prefieres que te ayude a instalar Strapi manualmente?
