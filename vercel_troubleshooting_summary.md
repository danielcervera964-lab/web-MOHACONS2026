# Resumen de Troubleshooting: Despliegue de Vercel (web-MOHACONS2026)

## El Problema Inicial
El despliegue en Vercel estaba devolviendo un error **404: NOT_FOUND**. 

Al investigar, descubrimos que el proceso de "build" del frontend estaba fallando con el siguiente error:
```
Error: Cannot find module 'ajv/dist/compile/codegen'
```

## La Causa Raíz
Este es un conflicto conocido entre `react-scripts@5.0.1` y las versiones más recientes de Node.js (como la versión 24.x que Vercel usa por defecto ahora). Al usar `--legacy-peer-deps`, se estaba instalando una versión de `ajv` (6.14.0) que no incluía archivos necesarios por `ajv-keywords@5.1.0`.

## Lo que ya hemos arreglado
1. **Instalación explícita de dependencias:** Instalamos `ajv@8.18.0` explícitamente en el `frontend/package.json` ejecutando `npm install ajv@8.18.0 --legacy-peer-deps`. Esto resolvió el error de build localmente.
2. **Actualización de Node.js en package.json:** Añadimos la restricción `"engines": { "node": "18.x" }` en el `package.json` de la raíz para indicarle a Vercel que prefiera Node 18, el cual es mucho más estable para `react-scripts 5`.
3. **Subida a GitHub:** Hicimos un rebase y empujamos estos arreglos a la rama `main` de GitHub.

## El Problema Actual (Por qué sigue el 404)
El nuevo despliegue en Vercel pasa el paso de *Build* (se marca como "Ready"), pero si revisas la pestaña "Source" -> "Output" del despliegue en Vercel, verás que dice **Static Files: 0**.

Esto significa que aunque el comando de build funciona, **Vercel no está encontrando los archivos compilados para servirlos.** Vercel no está aplicando correctamente el `outputDirectory` especificado en tu `vercel.json` ("frontend/build") frente a las configuraciones propias del proyecto en el Dashboard.

## Próximos pasos que debes hacer en el Dashboard de Vercel
Para solucionar definitivamente el 404, ve a **Project Settings -> Build & Development Settings** en el Dashboard de Vercel y asegúrate de lo siguiente activando el switch de **Override** en cada campo:

1. **Build Command:** Activa el *Override* y escribe: `cd frontend && npm install --legacy-peer-deps && npm run build`
2. **Output Directory:** Activa el *Override* y escribe: `frontend/build`
3. **Install Command:** Activa el *Override* y escribe: `npm install` (Para instalar solo lo necesario de la raíz como resend).
4. **Node.js Version:** Cámbialo de 24.x a **18.x** (Importante para evitar que el error de `ajv` vuelva a aparecer en futuras instalaciones limpias).

Guarda los cambios y haz clic en **Deployments -> Redploy** en el último despliegue. ¡Eso debería hacer que la página cargue correctamente!
