#!/bin/bash

# Script para crear un nuevo repositorio limpio de INSESO V2
# Uso: ./create-new-repo.sh <URL_DEL_NUEVO_REPO>

# Colores
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

if [ -z "$1" ]; then
    echo -e "${RED}Error: Debes proporcionar la URL del nuevo repositorio${NC}"
    echo "Uso: ./create-new-repo.sh https://github.com/usuario/nuevo-repo.git"
    exit 1
fi

NEW_REPO_URL=$1

echo -e "${YELLOW}🚀 Creando nuevo repositorio limpio de INSESO V2${NC}"
echo ""

# Verificar que estamos en el directorio correcto
if [ ! -f "package.json" ]; then
    echo -e "${RED}❌ Error: Este script debe ejecutarse desde el directorio raíz del proyecto${NC}"
    exit 1
fi

# Crear directorio temporal
TEMP_DIR="../inseso-v2-clean-temp"
echo -e "${YELLOW}📁 Creando directorio temporal: $TEMP_DIR${NC}"
mkdir -p "$TEMP_DIR"

# Copiar archivos excluyendo lo innecesario
echo -e "${YELLOW}📦 Copiando archivos del proyecto...${NC}"
rsync -av --progress . "$TEMP_DIR" \
    --exclude='.git' \
    --exclude='node_modules' \
    --exclude='dist' \
    --exclude='cms/node_modules' \
    --exclude='cms/.tmp' \
    --exclude='cms/build' \
    --exclude='cms/.cache' \
    --exclude='cms/public/uploads/*' \
    --exclude='.astro' \
    --exclude='logs' \
    --exclude='*.log'

echo -e "${GREEN}✅ Archivos copiados${NC}"

# Ir al directorio temporal
cd "$TEMP_DIR"

# Inicializar git
echo -e "${YELLOW}🔧 Inicializando git...${NC}"
git init

# Crear .gitignore si no existe o actualizarlo
echo -e "${YELLOW}📝 Configurando .gitignore...${NC}"
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
cms/node_modules/

# Build outputs
dist/
.astro/
cms/build/
cms/.cache/

# Environment variables
.env
.env.local
.env.production
cms/.env

# Logs
logs/
*.log
npm-debug.log*
pnpm-debug.log*
yarn-debug.log*
yarn-error.log*

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# Strapi
cms/.tmp/
cms/public/uploads/*
!cms/public/uploads/.gitkeep
cms/.strapi-updater.json
cms/exports/
cms/LICENSE
cms/README.md

# PM2
.pm2/

# Temporary files
*.tmp
*.temp
EOF

# Agregar todos los archivos
echo -e "${YELLOW}📦 Agregando archivos a git...${NC}"
git add .

# Primer commit
echo -e "${YELLOW}💾 Creando commit inicial...${NC}"
git commit -m "Initial commit: INSESO V2 - Complete Astro + Strapi project

Includes:
- Astro 5 with Node.js adapter for SSR
- Strapi CMS integration
- Phase 1: Prestaciones (9 prestaciones migrated)
- Phase 2: Dynamic content (Noticias, ConfiguracionInicio, etc.)
- Responsive components
- Deploy scripts and documentation
"

# Conectar con el repositorio remoto
echo -e "${YELLOW}🔗 Conectando con repositorio remoto...${NC}"
git remote add origin "$NEW_REPO_URL"

# Cambiar a rama master
git branch -M master

# Push
echo -e "${YELLOW}⬆️  Haciendo push al repositorio remoto...${NC}"
git push -u origin master --force

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Repositorio creado exitosamente!${NC}"
    echo ""
    echo -e "${GREEN}📍 Ubicación del nuevo repositorio local: $TEMP_DIR${NC}"
    echo -e "${GREEN}🌐 Repositorio remoto: $NEW_REPO_URL${NC}"
    echo ""
    echo "Siguiente paso:"
    echo "cd $TEMP_DIR"
else
    echo -e "${RED}❌ Error al hacer push. Verifica la URL del repositorio y tus credenciales${NC}"
    exit 1
fi
EOF

chmod +x create-new-repo.sh
