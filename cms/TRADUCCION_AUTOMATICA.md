# Traducción Automática con strapi-llm-translator

## ✅ SOLUCIÓN: OpenRouter con Claude

El plugin `strapi-llm-translator` requiere APIs **compatibles con OpenAI**. Para usar Claude, utilizamos **OpenRouter** como proxy.

### 4 Opciones Disponibles:

1. **🎯 OpenRouter + Claude** - Mejor calidad, costo moderado (~$3 proyecto) **(RECOMENDADO)**
2. **🚀 Groq** - GRATIS, rápido, buena calidad
3. **💎 OpenAI** - Pago (~$2 para todo el proyecto), excelente calidad
4. **🏠 Ollama** - Local, gratis, más lento

## 🎯 Opción Recomendada: OpenRouter con Claude 3.5 Sonnet

**Por qué OpenRouter + Claude:**
- ✅ **Usa Claude 3.5 Sonnet** (el mejor modelo de Anthropic)
- ✅ **API compatible con OpenAI** (funciona con el plugin)
- ✅ **Costo razonable** (~$0.003 USD por noticia)
- ✅ **Calidad superior** en traducciones
- ✅ **Sin configuración compleja**

### Configurar OpenRouter en 3 Pasos:

**1. Obtener API Key:**
   - Ve a https://openrouter.ai/keys
   - Crea una cuenta (requiere $5 USD mínimo de crédito)
   - Genera una API key

**2. Configurar en `.env`:**
   Edita [cms/.env](cms/.env:33) y agrega tu API key:
   ```bash
   LLM_TRANSLATOR_LLM_API_KEY=sk-or-v1-xxxxxxxxxxxxxxxx
   STRAPI_ADMIN_LLM_TRANSLATOR_LLM_BASE_URL=https://openrouter.ai/api/v1
   STRAPI_ADMIN_LLM_TRANSLATOR_LLM_MODEL=anthropic/claude-3.5-sonnet
   ```

**3. Rebuild Strapi:**
   ```bash
   cd cms
   npm run build
   npm run develop
   ```

¡Listo! Ya puedes traducir contenido con Claude.

---

## 📋 Alternativa GRATIS: Groq (Llama 3.1)

**Por qué Groq:**
- ✅ **Completamente GRATIS** para uso moderado
- ✅ **Muy rápido** (1-2 segundos por traducción)
- ✅ **Calidad excelente** con Llama 3.1 70B
- ✅ **Sin configuración compleja**
- ✅ **API compatible con OpenAI** (funciona directamente)

### Configurar Groq en 3 Pasos:

**1. Obtener API Key (gratis):**
   - Ve a https://console.groq.com/keys
   - Crea una cuenta (gratis, no requiere tarjeta)
   - Genera una API key

**2. Configurar en `.env`:**
   Edita [cms/.env](cms/.env:49) y agrega:
   ```bash
   LLM_TRANSLATOR_LLM_API_KEY=gsk_xxxxxxxxxxxxxxxx
   STRAPI_ADMIN_LLM_TRANSLATOR_LLM_BASE_URL=https://api.groq.com/openai/v1
   STRAPI_ADMIN_LLM_TRANSLATOR_LLM_MODEL=llama-3.1-70b-versatile
   ```

**3. Rebuild Strapi:**
   ```bash
   cd cms
   npm run build
   npm run develop
   ```

¡Listo! Ya puedes traducir contenido.

---

## 📋 Otras Opciones

### Opción 2: OpenAI GPT-4o

**Costo:** ~$0.01-0.03 USD por noticia | **Total proyecto:** ~$2.20 USD

**Pasos:**
1. API Key: https://platform.openai.com/api-keys
2. Configurar `.env`:
   ```bash
   LLM_TRANSLATOR_LLM_API_KEY=sk-proj-xxxxxxxx
   STRAPI_ADMIN_LLM_TRANSLATOR_LLM_BASE_URL=https://api.openai.com/v1
   STRAPI_ADMIN_LLM_TRANSLATOR_LLM_MODEL=gpt-4o
   ```

### Opción 3: Ollama (Local)

**Costo:** GRATIS | **Velocidad:** Más lento

**Pasos:**
1. Instalar Ollama: `curl -fsSL https://ollama.com/install.sh | sh`
2. Descargar modelo: `ollama pull llama3.2`
3. Configurar `.env`:
   ```bash
   LLM_TRANSLATOR_LLM_API_KEY=
   STRAPI_ADMIN_LLM_TRANSLATOR_LLM_BASE_URL=http://localhost:11434/v1
   STRAPI_ADMIN_LLM_TRANSLATOR_LLM_MODEL=llama3.2
   ```

---

## 🚀 Cómo Usar el Plugin

### 1. Configurar Locales

1. Inicia Strapi: `cd cms && npm run develop`
2. Ve a: `http://localhost:1337/admin`
3. Settings → Internationalization → Locales
4. Agrega: **Francés (fr-FR)**, **Inglés (en-US)**, **Portugués (pt-PT)**

### 2. Configurar el Plugin

1. Settings → **LLM Translator Configuration**
2. Ajusta:
   - **Temperature**: 0.3-0.5
   - **System Prompt**:
     ```
     Eres un traductor profesional especializado en contenido gubernamental
     de seguridad social de Guinea Ecuatorial. Traduce manteniendo el tono
     formal. Preserva nombres propios como INSESO, Malabo, Guinea Ecuatorial.
     ```

### 3. Traducir Contenido

1. Crea/edita contenido en **español**
2. Guarda
3. Click en botón **"Translate"** (arriba a la derecha)
4. Selecciona idiomas: fr, en, pt
5. ¡Traducción automática en segundos!

---

## 📋 Content Types Listos para Traducir

### ✅ Noticia
**Traducible:** titulo, slug, resumen, contenido
**Compartido:** imagen, video, fecha

### ✅ Prestación
**Traducible:** titulo, slug, descripcion, requisitos
**Compartido:** imagen, orden

### ✅ Formulario
**Traducible:** nombre, descripcion, requisitos
**Compartido:** archivo, formato

### ✅ Configuración Inicio
**Traducible:** tituloHero, afiliacionTitulo, textos
**Compartido:** imágenes, enlaces

---

## 💰 Comparación de Opciones

| Proveedor | Costo | Velocidad | Calidad | Recomendación |
|-----------|-------|-----------|---------|---------------|
| **OpenRouter + Claude 3.5** | ~$3 proyecto | ⚡⚡⚡ Muy rápida | ⭐⭐⭐⭐⭐ Superior | ✅ **MEJOR OPCIÓN** |
| Groq Llama 3.1 | GRATIS | ⚡⚡⚡ Muy rápida | ⭐⭐⭐⭐ Excelente | Alternativa gratis |
| OpenAI GPT-4o | ~$2 proyecto | ⚡⚡ Rápida | ⭐⭐⭐⭐⭐ Superior | Alternativa directa |
| Ollama Local | GRATIS | ⚡ Media | ⭐⭐⭐ Buena | Para testing |

---

## 🛠️ Troubleshooting

### Error: "404 model" o "Invalid model"
**Causa:** Configuración incorrecta del modelo
**Solución:**
- OpenRouter: usa `anthropic/claude-3.5-sonnet` (no `claude-3-5-sonnet-20241022`)
- Groq: usa `llama-3.1-70b-versatile`
- Reinicia Strapi después de cambiar `.env`

### Error: "Invalid API Key"
**Solución:**
- OpenRouter: debe comenzar con `sk-or-v1-`
- OpenAI: debe comenzar con `sk-proj-`
- Groq: debe comenzar con `gsk_`
- Reinicia Strapi: `npm run build && npm run develop`

### Error: "Rate limit exceeded" (Groq)
**Solución:**
- Espera 1 minuto
- O usa OpenRouter/OpenAI (sin límites estrictos)

### Error: "Insufficient credits" (OpenRouter)
**Solución:**
- Agrega créditos en https://openrouter.ai/credits
- Mínimo $5 USD requerido

---

## 📖 Recursos

- **Plugin**: https://github.com/grenzbotin/strapi-llm-translator
- **OpenRouter**: https://openrouter.ai/ (para usar Claude)
- **OpenRouter API Keys**: https://openrouter.ai/keys
- **OpenRouter Pricing**: https://openrouter.ai/models/anthropic/claude-3.5-sonnet
- **Groq Console**: https://console.groq.com/
- **OpenAI Pricing**: https://openai.com/api/pricing/
- **Ollama**: https://ollama.com/

---

## ✅ Próximos Pasos

1. **Elige OpenRouter + Claude** (recomendado para calidad) o **Groq** (gratis)
2. **Obtén API key:**
   - OpenRouter: https://openrouter.ai/keys (requiere $5 USD de crédito)
   - Groq: https://console.groq.com/keys (gratis)
3. **Configura API key** en [cms/.env](cms/.env:33)
4. **Rebuild**: `cd cms && npm run build && npm run develop`
5. **Configura locales** en Strapi Admin (Settings → Internationalization → Locales)
   - Agrega: fr-FR, en-US, pt-PT
6. **¡Empieza a traducir!** - Botón "Translate" en cada contenido

---

**Estado:** ✅ Plugin instalado y configurado para OpenRouter + Claude
**Acción requerida:** Obtener API key de OpenRouter y agregarla al .env
**Tiempo:** 5 minutos para estar listo
**Costo estimado:** ~$3 USD para traducir todo el sitio
