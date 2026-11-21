# A Letter for You

Experiencia de carta romántica hecha con React, TypeScript y Vite.

## Desarrollo

```sh
npm install
npm run dev
```

Verifica el proyecto con `npm run build` y `npm run lint`.

## Música

Al pulsar el sobre, el reproductor inicia el MP3 local `public/audio/letter-music.mp3`. Los controles permiten pausar, reanudar y cambiar el volumen. La reproducción puede bloquearse según el navegador; en ese caso se puede iniciar desde el botón del reproductor.

La ruta se configura en `src/config.ts`. El audio local está excluido de Git mediante `.gitignore`; para que suene en otra instalación, coloca allí un MP3 autorizado con ese nombre. No subas el audio comercial al repositorio.

## Carta

Edita el título, la firma y los textos de la carta en `src/config.ts` y `src/content/letter.ts`.
