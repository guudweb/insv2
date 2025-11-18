# 🔐 Configurar Permisos en Strapi - Fase 2

Antes de ejecutar el script de población, debes configurar los permisos en Strapi para permitir que las peticiones sin autenticación puedan crear y modificar contenido.

---

## ⚠️ Importante

Estos permisos son necesarios **solo para poblar los datos iniciales**. Una vez poblados, puedes **desactivar** los permisos de creación y actualización, dejando solo lectura.

---

## 📝 Pasos para Configurar Permisos

### 1. Acceder a Configuración de Roles

1. Abre Strapi en tu navegador: `http://localhost:1337/admin`
2. Ve a **Settings** (⚙️ en el menú lateral)
3. Haz clic en **Users & Permissions Plugin**
4. Haz clic en **Roles**
5. Haz clic en **Public**

---

### 2. Configurar Permisos para ConfiguracionInicio

Busca **CONFIGURACION-INICIO** en la lista y marca las siguientes casillas:

- ✅ `find` - Leer configuración
- ✅ `update` - Actualizar configuración

---

### 3. Configurar Permisos para Noticia

Busca **NOTICIA** en la lista y marca las siguientes casillas:

- ✅ `find` - Listar noticias
- ✅ `findOne` - Ver una noticia
- ✅ `create` - Crear noticias (solo para población inicial)
- ✅ `update` - Actualizar noticias (solo para población inicial)

---

### 4. Configurar Permisos para Prestacion

Busca **PRESTACION** en la lista y marca las siguientes casillas:

- ✅ `find` - Listar prestaciones
- ✅ `findOne` - Ver una prestación
- ✅ `update` - Actualizar prestaciones (para marcar como destacadas)

---

### 5. Guardar Cambios

1. Haz clic en **Save** (arriba a la derecha)
2. Espera la confirmación "Saved"

---

## ✅ Verificar Configuración

Después de guardar, deberías ver algo como esto en el rol **Public**:

```
ConfiguracionInicio
  ✅ find
  ✅ update

Noticia
  ✅ find
  ✅ findOne
  ✅ create
  ✅ update

Prestacion
  ✅ find
  ✅ findOne
  ✅ update
```

---

## 🚀 Ejecutar el Script

Una vez configurados los permisos:

```bash
node scripts/populate-fase2.mjs
```

---

## 🔒 Seguridad Post-Población

**IMPORTANTE:** Después de poblar los datos, es recomendable **desactivar** los permisos de escritura:

### Permisos Recomendados para Producción:

#### ConfiguracionInicio
- ✅ `find` - Dejar activado
- ❌ `update` - Desactivar (editar solo desde panel admin)

#### Noticia
- ✅ `find` - Dejar activado
- ✅ `findOne` - Dejar activado
- ❌ `create` - Desactivar
- ❌ `update` - Desactivar
- ❌ `delete` - Desactivar

#### Prestacion
- ✅ `find` - Dejar activado
- ✅ `findOne` - Dejar activado
- ❌ `update` - Desactivar
- ❌ `delete` - Desactivar

---

## 🔑 Alternativa: Usar API Token

Si prefieres no habilitar permisos públicos, puedes usar un API Token:

### 1. Crear API Token en Strapi

1. Ve a **Settings → API Tokens**
2. Haz clic en **Create new API Token**
3. Nombre: `populate-script`
4. Token type: **Full access**
5. Haz clic en **Save**
6. **Copia el token** (solo se muestra una vez)

### 2. Ejecutar Script con Token

```bash
STRAPI_API_TOKEN=tu_token_aqui node scripts/populate-fase2.mjs
```

Reemplaza `tu_token_aqui` con el token que copiaste.

---

## ❓ Solución de Problemas

### Error 403 (Forbidden)

**Causa:** No tienes permisos configurados.

**Solución:** Sigue los pasos de arriba para configurar permisos o usa API Token.

### Error 400 (Validation Error)

**Causa:** Los campos enviados no coinciden con el Content Type.

**Solución:**
1. Verifica que todos los Content Types estén creados correctamente
2. Verifica que los campos coincidan con la [GUIA_CONTENT_TYPES_FASE2.md](GUIA_CONTENT_TYPES_FASE2.md)

### Error 404 (Not Found)

**Causa:** El Content Type no existe.

**Solución:** Crea el Content Type siguiendo [GUIA_CONTENT_TYPES_FASE2.md](GUIA_CONTENT_TYPES_FASE2.md)

---

## 📚 Referencias

- [Strapi Roles & Permissions Documentation](https://docs.strapi.io/user-docs/users-roles-permissions/configuring-administrator-roles)
- [GUIA_CONTENT_TYPES_FASE2.md](GUIA_CONTENT_TYPES_FASE2.md)
- [FASE_2_COMPLETADA.md](FASE_2_COMPLETADA.md)

---

**Una vez configurados los permisos, ejecuta el script y verifica que los datos se crean correctamente.**
