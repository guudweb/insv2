# 🚀 Guía de Deploy en VPS - INSESO

## 📋 Resumen de Pasos

1. Instalar adaptador de Node.js
2. Hacer commit y push de cambios
3. Actualizar código en VPS
4. Construir y desplegar

---

## 🔧 Paso 1: En tu Máquina Local

### Instalar el adaptador de Node.js

```bash
npm install @astrojs/node
```

### Hacer commit de los cambios

```bash
git add .
git commit -m "Add Node.js adapter and deploy configuration"
git push origin master
```

---

## 🖥️ Paso 2: En tu VPS

### Método A: Deploy Automático (Recomendado)

```bash
# Conectar al VPS
ssh root@tu-vps-ip

# Ir al directorio del proyecto
cd /var/www/inseso

# Hacer el script ejecutable (solo la primera vez)
chmod +x deploy.sh

# Ejecutar el script de deploy
./deploy.sh
```

El script automáticamente:
- ✅ Hace `git pull`
- ✅ Instala dependencias
- ✅ Construye Astro y Strapi
- ✅ Reinicia servicios con PM2
- ✅ Muestra el estado final

### Método B: Deploy Manual

Si prefieres hacerlo paso a paso:

```bash
# 1. Actualizar código
cd /var/www/inseso
git pull origin master

# 2. Instalar dependencias
npm install
cd cms && npm install && cd ..

# 3. Construir Strapi
cd cms
npm run build
cd ..

# 4. Construir Astro
npm run build

# 5. Reiniciar servicios
pm2 restart all
# O si es la primera vez:
pm2 start ecosystem.config.js
pm2 save

# 6. Ver estado
pm2 status
```

---

## 🔍 Verificación

### Verificar que los servicios están corriendo

```bash
pm2 status
```

Deberías ver:
```
┌─────┬──────────────────┬─────────┬─────────┬─────────┬──────────┐
│ id  │ name             │ status  │ restart │ uptime  │ cpu      │
├─────┼──────────────────┼─────────┼─────────┼─────────┼──────────┤
│ 0   │ astro-inseso     │ online  │ 0       │ 5s      │ 0%       │
│ 1   │ strapi-inseso    │ online  │ 0       │ 5s      │ 0%       │
└─────┴──────────────────┴─────────┴─────────┴─────────┴──────────┘
```

### Verificar que Astro responde

```bash
curl http://localhost:4321
```

### Verificar que Strapi responde

```bash
curl http://localhost:1337/api/noticias
```

---

## 📊 Comandos Útiles de PM2

```bash
# Ver estado de los servicios
pm2 status

# Ver logs en tiempo real
pm2 logs

# Ver logs de un servicio específico
pm2 logs astro-inseso
pm2 logs strapi-inseso

# Reiniciar un servicio
pm2 restart astro-inseso
pm2 restart strapi-inseso

# Reiniciar todos los servicios
pm2 restart all

# Detener un servicio
pm2 stop astro-inseso

# Detener todos los servicios
pm2 stop all

# Ver uso de recursos
pm2 monit

# Ver información detallada
pm2 show astro-inseso
```

---

## 🗄️ Configurar Datos en Strapi (Primera vez)

Si es la primera vez que despliegas, necesitas poblar los datos:

```bash
cd /var/www/inseso

# Asegurarse de que Strapi esté corriendo
pm2 status

# Ejecutar script de población de Fase 2
node scripts/populate-fase2.mjs
```

### Configurar Permisos en Strapi

1. Acceder a: `http://tu-vps-ip:1337/admin`
2. Ir a **Settings → Roles → Public**
3. Habilitar permisos `find` y `findOne` para:
   - Noticia
   - Categoria
   - Prestacion
   - ConfiguracionInicio
   - HeroSlide
   - SlideAfiliacion
4. **Save**

---

## 🌐 Configurar Nginx (Opcional pero Recomendado)

Para exponer tu sitio al público con un dominio:

### Instalar Nginx

```bash
apt update
apt install nginx
```

### Configurar Virtual Host

```bash
nano /etc/nginx/sites-available/inseso
```

Contenido:

```nginx
server {
    listen 80;
    server_name tu-dominio.com www.tu-dominio.com;

    # Astro
    location / {
        proxy_pass http://localhost:4321;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Strapi Admin (opcional, puedes restringir acceso)
    location /admin {
        proxy_pass http://localhost:1337/admin;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API de Strapi
    location /api {
        proxy_pass http://localhost:1337/api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    # Uploads de Strapi
    location /uploads {
        proxy_pass http://localhost:1337/uploads;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

### Activar configuración

```bash
ln -s /etc/nginx/sites-available/inseso /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

### Instalar SSL con Let's Encrypt

```bash
apt install certbot python3-certbot-nginx
certbot --nginx -d tu-dominio.com -d www.tu-dominio.com
```

---

## 🔄 Workflow de Desarrollo → Producción

### Desarrollo Local

```bash
# Trabajar en local
npm run dev

# Probar cambios en local con Strapi local
# Strapi: http://localhost:1337
# Astro: http://localhost:4321
```

### Deploy a Producción

```bash
# 1. Hacer commit
git add .
git commit -m "Descripción de cambios"
git push origin master

# 2. En VPS, ejecutar deploy
ssh root@vps-ip
cd /var/www/inseso
./deploy.sh
```

---

## 🆘 Solución de Problemas

### El build falla con "No adapter installed"

```bash
# Instalar el adaptador
npm install @astrojs/node

# Verificar que astro.config.mjs tenga:
# import node from '@astrojs/node';
# adapter: node({ mode: 'standalone' })
```

### PM2 no encuentra el script

```bash
# Verificar que el build se completó
ls -la dist/server/entry.mjs

# Si no existe, hacer build de nuevo
npm run build
```

### Error "Cannot find module"

```bash
# Limpiar y reinstalar
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Strapi no inicia

```bash
# Ver logs
pm2 logs strapi-inseso

# Reconstruir Strapi
cd cms
npm run build
cd ..
pm2 restart strapi-inseso
```

### Puerto en uso

```bash
# Ver qué está usando el puerto
lsof -i :4321
lsof -i :1337

# Matar proceso si es necesario
kill -9 <PID>
```

---

## 📝 Checklist de Primera Instalación

- [ ] Node.js 18+ instalado
- [ ] PM2 instalado globalmente (`npm install -g pm2`)
- [ ] Repositorio clonado en `/var/www/inseso`
- [ ] Adaptador `@astrojs/node` instalado
- [ ] Dependencias instaladas (`npm install` en raíz y `cms/`)
- [ ] Build exitoso (`npm run build`)
- [ ] Servicios iniciados con PM2 (`pm2 start ecosystem.config.js`)
- [ ] PM2 guardado (`pm2 save`)
- [ ] PM2 configurado para autostart (`pm2 startup`)
- [ ] Strapi poblado con datos (`node scripts/populate-fase2.mjs`)
- [ ] Permisos configurados en Strapi
- [ ] Nginx configurado (opcional)
- [ ] SSL instalado (opcional)

---

**Última actualización:** 18 de noviembre de 2025
