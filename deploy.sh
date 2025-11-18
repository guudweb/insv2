#!/bin/bash

# Script de deploy automatizado para INSESO
# Uso: ./deploy.sh

echo "🚀 Iniciando deploy de INSESO..."

# Colores para output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# 1. Actualizar código
echo -e "${YELLOW}📥 Actualizando código desde Git...${NC}"
git pull origin master
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al hacer git pull${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Código actualizado${NC}"

# 2. Instalar dependencias del proyecto principal
echo -e "${YELLOW}📦 Instalando dependencias de Astro...${NC}"
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al instalar dependencias de Astro${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Dependencias de Astro instaladas${NC}"

# 3. Instalar dependencias de Strapi
echo -e "${YELLOW}📦 Instalando dependencias de Strapi...${NC}"
cd cms
npm install
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al instalar dependencias de Strapi${NC}"
    exit 1
fi
cd ..
echo -e "${GREEN}✅ Dependencias de Strapi instaladas${NC}"

# 4. Build de Strapi
echo -e "${YELLOW}🔨 Construyendo Strapi...${NC}"
cd cms
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al construir Strapi${NC}"
    exit 1
fi
cd ..
echo -e "${GREEN}✅ Strapi construido${NC}"

# 5. Build de Astro
echo -e "${YELLOW}🔨 Construyendo Astro...${NC}"
npm run build
if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al construir Astro${NC}"
    exit 1
fi
echo -e "${GREEN}✅ Astro construido${NC}"

# 6. Reiniciar servicios con PM2
echo -e "${YELLOW}🔄 Reiniciando servicios...${NC}"

# Verificar si PM2 está instalado
if ! command -v pm2 &> /dev/null; then
    echo -e "${YELLOW}⚠️  PM2 no está instalado. Instalando...${NC}"
    npm install -g pm2
fi

# Crear directorio de logs si no existe
mkdir -p logs

# Detener aplicaciones anteriores (si existen)
pm2 delete astro-inseso 2>/dev/null
pm2 delete strapi-inseso 2>/dev/null

# Iniciar con ecosystem.config.js
pm2 start ecosystem.config.js

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Error al reiniciar servicios${NC}"
    exit 1
fi

# Guardar configuración de PM2
pm2 save

echo -e "${GREEN}✅ Servicios reiniciados${NC}"

# 7. Verificar estado
echo -e "${YELLOW}📊 Estado de los servicios:${NC}"
pm2 status

# 8. Mostrar logs recientes
echo -e "${YELLOW}📋 Logs recientes:${NC}"
pm2 logs --lines 10 --nostream

echo ""
echo -e "${GREEN}✅ Deploy completado exitosamente!${NC}"
echo ""
echo "🌐 URLs:"
echo "   - Sitio web: http://localhost:4321"
echo "   - Strapi Admin: http://localhost:1337/admin"
echo ""
echo "📊 Para ver los logs en tiempo real:"
echo "   pm2 logs"
echo ""
echo "🔧 Para ver el estado de los servicios:"
echo "   pm2 status"
