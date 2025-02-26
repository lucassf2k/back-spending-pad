import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/main.ts'],
  clean: true,
  format: ['esm'],
  sourcemap: true,
  target: 'es2022',
  outDir: 'dist',
});
