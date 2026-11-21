# A Letter for You

Experiencia de carta romántica hecha con React, TypeScript y Vite.

## Desarrollo

```sh
npm install
npm run dev
```

Verifica el proyecto con `npm run build` y `npm run lint`.

## GitHub Pages

Cada push a `main` ejecuta `.github/workflows/deploy.yml` y publica `dist/` en `https://bordinola00-dev.github.io/sitioweb/`. Vite usa la base `/sitioweb/` para las rutas de recursos.

## Música

Al pulsar el sobre, el reproductor inicia el MP3 local `public/audio/letter-music.mp3` desde 2:08. Los controles permiten pausar, reanudar y cambiar el volumen. La reproducción puede bloquearse según el navegador; en ese caso se puede iniciar desde el botón del reproductor.

La ruta se configura en `src/config.ts`. El audio local está excluido de Git mediante `.gitignore` y no se incluye en el despliegue de GitHub Pages. Para que suene en Pages, coloca allí un MP3 que tengas derecho a publicar y modifica `.gitignore` solo si autorizas explícitamente subir ese archivo. No subas audio comercial protegido.

## Carta

Edita el título, la firma y los textos de la carta en `src/config.ts` y `src/content/letter.ts`.
