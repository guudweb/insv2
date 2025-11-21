# Guía de Deploy en VPS - INSESO

Esta guía te ayudará a actualizar tu VPS con los últimos cambios del proyecto.

## 📋 Prerrequisitos

- Acceso SSH al VPS
- Git instalado en el VPS
- Node.js 18+ instalado
- PM2 o systemd configurado para los servicios

## 🔄 Actualización del Código

### 1. Actualizar repositorio

```bash
# Conectar al VPS
ssh usuario@tu-vps-ip

# Navegar al proyecto
cd /ruta/a/inseso.org_V2

# Hacer pull de los cambios
git pull origin master

# Instalar/actualizar dependencias
npm install

# También actualizar dependencias de Strapi
cd cms
npm install
cd ..
```

## 🗄️ Sincronizar Content Types de Strapi

Los Content Types de Strapi están en: `cms/src/api/`

### Método 1: Git (Recomendado)

Los archivos de definición de Content Types ya deberían estar en el repositorio después de hacer `git pull`.

### Método 2: SCP (Copia manual)

Si los archivos no están en git:

```bash
# Desde tu máquina local
scp -r cms/src/api/* usuario@vps-ip:/ruta/a/inseso.org_V2/cms/src/api/
```

## 🚀 Reiniciar Servicios

### Reiniciar Strapi

Strapi necesita reiniciarse para detectar los nuevos Content Types:

```bash
cd /ruta/a/inseso.org_V2/cms

# Si usas PM2
pm2 restart strapi-app

# Si usas systemd
sudo systemctl restart strapi-inseso

# Si ejecutas manualmente
npm run build
npm run start
```

### Verificar que Strapi inició correctamente

```bash
# Ver logs
pm2 logs strapi-app
# o
journalctl -u strapi-inseso -f

# Verificar que responde
curl http://localhost:1337/admin
```

## 🔐 Configurar Permisos en Strapi

1. Acceder al panel: `http://tu-vps-ip:1337/admin`
2. Ir a **Settings → Roles → Public**
3. Habilitar permisos para cada Content Type:

### Permisos necesarios:

| Content Type | Permisos |
|--------------|----------|
| Noticia | find, findOne |
| Categoria | find, findOne |
| Prestacion | find, findOne |
| ConfiguracionInicio | find |
| HeroSlide | find |
| SlideAfiliacion | find |

4. **Save**

## 📝 Poblar Datos en Strapi

### Ejecutar script de población

```bash
cd /ruta/a/inseso.org_V2

# Ejecutar script de Fase 2 (noticias y configuración)
node scripts/populate-fase2.mjs

# Si ya tienes prestaciones, puedes omitir este:
# node scripts/populate-prestaciones.js
```

### Verificar que los datos se crearon

```bash
# Verificar noticias
curl http://localhost:1337/api/noticias?populate=*

# Verificar prestaciones
curl http://localhost:1337/api/prestacions?populate=*

# Verificar configuración
curl http://localhost:1337/api/configuracion-inicio?populate=*
```

## 🏗️ Reconstruir Astro

```bash
cd /ruta/a/inseso.org_V2

# Build de producción
npm run build
```

### Reiniciar Astro

```bash
# Si usas PM2
pm2 restart astro-app

# Si usas systemd
sudo systemctl restart astro-inseso
```

## ✅ Verificación Final

### 1. Verificar que Strapi funciona

```bash
curl http://localhost:1337/api/noticias
```

Deberías ver JSON con las noticias.

### 2. Verificar que Astro funciona

```bash
curl http://localhost:4321
```

Deberías ver HTML de la página de inicio.

### 3. Verificar en navegador

- Página principal: `http://tu-dominio.com`
- Panel Strapi: `http://tu-dominio.com:1337/admin`

## 🔧 Variables de Entorno

Asegúrate de tener el archivo `.env` configurado:

```env
# .env en /ruta/a/inseso.org_V2/
STRAPI_URL=http://localhost:1337

# O si Strapi está en otro servidor/dominio
# STRAPI_URL=https://strapi.tu-dominio.com
```

## 🆘 Solución de Problemas

### Error: "Cannot find module"

```bash
# Limpiar node_modules y reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Error: "Failed to fetch from Strapi"

```bash
# Verificar que Strapi está corriendo
ps aux | grep strapi

# Verificar puerto
netstat -tlnp | grep 1337

# Revisar logs
pm2 logs strapi-app
```

### Error 403 en API de Strapi

- Verificar permisos en **Settings → Roles → Public**
- Asegurarse de que los permisos `find` y `findOne` están habilitados

### Strapi no detecta Content Types

```bash
# Verificar que los archivos existen
ls -la cms/src/api/

# Deberías ver:
# - noticia/
# - categoria/
# - prestacion/
# - configuracion-inicio/
# - hero-slide/
# - slide-afiliacion/

# Reconstruir Strapi
cd cms
npm run build
pm2 restart strapi-app
```

### Script populate falla

```bash
# Verificar conexión a Strapi
curl http://localhost:1337/admin

# Verificar que los Content Types existen
curl http://localhost:1337/api/content-type-builder/content-types

# Si falla, crear los datos manualmente desde el panel
```

## 📊 Checklist de Deploy

- [ ] `git pull` ejecutado
- [ ] `npm install` en raíz y en `cms/`
- [ ] Strapi reiniciado
- [ ] Content Types visibles en panel de Strapi
- [ ] Permisos configurados en Strapi
- [ ] Script `populate-fase2.mjs` ejecutado con éxito
- [ ] Datos verificados en Strapi (noticias, prestaciones, etc.)
- [ ] `.env` con STRAPI_URL correcto
- [ ] `npm run build` ejecutado
- [ ] Astro reiniciado
- [ ] Sitio web verificado en navegador
- [ ] Páginas dinámicas funcionando (noticias, prestaciones)

## 🔄 Comandos Rápidos de Deploy

```bash
#!/bin/bash
# Script de deploy rápido

cd /ruta/a/inseso.org_V2

# 1. Actualizar código
git pull origin master

# 2. Instalar dependencias
npm install
cd cms && npm install && cd ..

# 3. Reiniciar Strapi
pm2 restart strapi-app

# 4. Esperar a que Strapi inicie
sleep 10

# 5. Poblar datos (solo primera vez o si hay nuevos datos)
# node scripts/populate-fase2.mjs

# 6. Rebuild Astro
npm run build

# 7. Reiniciar Astro
pm2 restart astro-app

# 8. Ver estado
pm2 status
```

Guarda este script como `deploy.sh` y ejecútalo con:

```bash
chmod +x deploy.sh
./deploy.sh
```

---

## 📞 Soporte

Si encuentras problemas, verifica:
1. Los logs de PM2: `pm2 logs`
2. Los logs del sistema: `journalctl -f`
3. La conectividad: `curl http://localhost:1337` y `curl http://localhost:4321`

**Última actualización:** 18 de noviembre de 2025
