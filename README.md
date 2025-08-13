# essenza-site — GitHub Pages (www.essenzastudio.cl)

Este repositorio contiene el sitio estático de Essenza, listo para publicarse con tu dominio.


## Pasos rápidos
1) Crea un repo en GitHub llamado `essenza-site` en la cuenta **virginiaromay**.
2) Sube **estos archivos** (el contenido de esta carpeta, no el ZIP):
   - `index.html`, `styles.css`, `script.js`, carpeta `assets/`
   - `CNAME` y `.nojekyll`
3) En el repo: **Settings → Pages → Build and deployment → Source: Deploy from a branch**.  
   - Branch: `main` — Folder: `/ (root)`.
4) GitHub construirá el sitio y quedará activo con tu dominio: **https://www.essenzastudio.cl**

## DNS en tu proveedor
- Para **www** crea un **CNAME**:
  - **Host**: `www`
  - **Tipo**: `CNAME`
  - **Contenido**: `virginiaromay.github.io`
- (Opcional) Redirige el dominio raíz sin www (essenzastudio.cl) hacia **www**.  
  - Algunas empresas ofrecen “URL Redirect/Forwarding”.  
  - Alternativa avanzada: usar A/AAAA a GitHub Pages y un registro ALIAS/ANAME si tu proveedor lo soporta.

## WhatsApp
Edita el enlace en `index.html` y reemplaza `XXXXXXXXXXX` por tu número con prefijo de país (sin + ni guiones). Ejemplo Chile: `569XXXXXXXX`.

## Notas
- `.nojekyll` evita que GitHub Pages procese Jekyll (no lo necesitamos).
- `CNAME` fija el dominio personalizado.
