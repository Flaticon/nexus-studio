# 🚀 Nexus Studio - Vercel Deployment Instructions

## Tareas que debes hacer EXTERNAMENTE:

### 1. 📱 Configurar Google OAuth Console
1. Ve a [Google Cloud Console](https://console.cloud.google.com/)
2. Crea un nuevo proyecto o usa uno existente
3. Habilita Google+ API
4. Ve a **Credentials** > **Create Credentials** > **OAuth 2.0 Client ID**
5. Configura:
   - Application type: **Web application**
   - Authorized redirect URIs: `https://YOUR_DOMAIN.vercel.app/api/auth/google/callback`
6. Guarda tu `Client ID` y `Client Secret`

### 2. 🌐 Deploy inicial en Vercel
1. Instala Vercel CLI: `npm i -g vercel`
2. En la carpeta del proyecto: `vercel login`
3. Ejecuta: `vercel` (primer deploy para obtener dominio)
4. Anota tu dominio asignado (ej: `nexus-studio-abc123.vercel.app`)

### 3. ⚙️ Configurar Variables de Entorno
Ejecuta el script que creé:
```bash
./deploy-to-vercel.sh
```

O manualmente en Vercel Dashboard:
- Ve a tu proyecto > Settings > Environment Variables
- Agrega todas las variables del archivo `.env.production`
- **IMPORTANTE:** Reemplaza `YOUR_VERCEL_DOMAIN` con tu dominio real
- **IMPORTANTE:** Agrega tus credenciales de Google OAuth

### 4. 🔄 Actualizar Google OAuth
Vuelve a Google Console y actualiza:
- Authorized redirect URIs con tu dominio real de Vercel

### 5. 🚀 Deploy final
```bash
vercel --prod
```

## Variables críticas que DEBES actualizar:

```
GOOGLE_CLIENT_ID=tu_client_id_real
GOOGLE_CLIENT_SECRET=tu_client_secret_real
GOOGLE_CALLBACK_URL=https://tu-dominio-real.vercel.app/api/auth/google/callback
FRONTEND_URL=https://tu-dominio-real.vercel.app
NEXT_PUBLIC_API_URL=https://tu-dominio-real.vercel.app
NEXTAUTH_URL=https://tu-dominio-real.vercel.app
```

## ✅ Verificación post-deploy:
1. Verifica que la app cargue
2. Prueba el login con Google
3. Verifica que el API funcione
4. Revisa los logs de Vercel si hay errores

**¡El resto ya está configurado! 🎉**