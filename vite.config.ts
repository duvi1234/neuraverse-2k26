import { defineConfig } from 'vite';

export default defineConfig({
    // Base path if deploying to a subfolder
    base: './',
    build: {
        outDir: 'dist',
    },
    server: {
        port: 3000,
        open: true,
    },
});
