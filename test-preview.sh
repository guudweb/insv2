#!/bin/bash

# Script para probar la configuración del preview

echo "🔍 Verificando configuración del preview..."
echo ""

# Colores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Función para verificar archivos
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✓${NC} $1 existe"
        return 0
    else
        echo -e "${RED}✗${NC} $1 no encontrado"
        return 1
    fi
}

# Función para verificar que un archivo contiene un string
check_content() {
    if grep -q "$2" "$1" 2>/dev/null; then
        echo -e "${GREEN}✓${NC} $1 contiene configuración de preview"
        return 0
    else
        echo -e "${RED}✗${NC} $1 no contiene '$2'"
        return 1
    fi
}

echo "📁 Verificando archivos de configuración..."
echo ""

# Verificar Strapi
echo "Backend (Strapi):"
check_file "cms/config/admin.ts"
check_content "cms/config/admin.ts" "previewUrl"
check_file "cms/.env"
check_content "cms/.env" "PREVIEW_URL"
echo ""

# Verificar Astro
echo "Frontend (Astro):"
check_file "src/pages/api/preview.ts"
check_file "src/pages/api/exit-preview.ts"
check_file "src/pages/preview/noticia/[documentId].astro"
check_file "src/pages/preview/prestacion/[documentId].astro"
check_file "src/pages/preview/home.astro"
check_file "src/components/PreviewBanner.astro"
echo ""

# Verificar lib/strapi.ts
echo "Librería de Strapi:"
check_content "src/lib/strapi.ts" "setPreviewContext"
check_content "src/lib/strapi.ts" "getNoticiaByDocumentId"
check_content "src/lib/strapi.ts" "getPrestacionByDocumentId"
echo ""

# Verificar documentación
echo "📚 Documentación:"
check_file "PREVIEW_SETUP.md"
check_file "PREVIEW_QUICKSTART.md"
echo ""

# Verificar PREVIEW_URL en .env
echo "🔧 Verificando variables de entorno..."
if [ -f "cms/.env" ]; then
    PREVIEW_URL=$(grep "^PREVIEW_URL=" cms/.env | cut -d'=' -f2)
    if [ -n "$PREVIEW_URL" ]; then
        echo -e "${GREEN}✓${NC} PREVIEW_URL configurada: $PREVIEW_URL"
    else
        echo -e "${YELLOW}⚠${NC}  PREVIEW_URL no está configurada en cms/.env"
        echo "   Por favor, añade: PREVIEW_URL=http://localhost:4321"
    fi
fi
echo ""

# Verificar si los servidores están corriendo
echo "🚀 Verificando servidores..."

# Verificar Strapi
if curl -s http://localhost:1337 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Strapi está corriendo en http://localhost:1337"
else
    echo -e "${YELLOW}⚠${NC}  Strapi no está corriendo"
    echo "   Ejecuta: cd cms && npm run dev"
fi

# Verificar Astro
if curl -s http://localhost:4321 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Astro está corriendo en http://localhost:4321"
else
    echo -e "${YELLOW}⚠${NC}  Astro no está corriendo"
    echo "   Ejecuta: npm run dev"
fi

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "📋 Resumen:"
echo ""
echo "Para usar el preview:"
echo "1. Asegúrate de que ambos servidores estén corriendo"
echo "2. Abre http://localhost:1337/admin"
echo "3. Ve a Content Manager → Noticias o Prestaciones"
echo "4. Edita un contenido y guárdalo"
echo "5. Haz clic en 'Open preview'"
echo ""
echo "📖 Para más información, consulta:"
echo "   - PREVIEW_QUICKSTART.md (guía rápida)"
echo "   - PREVIEW_SETUP.md (documentación técnica)"
echo ""
