import { defineConfig } from 'tsup';

// Dual ESM + CJS bundle so the package works in NestJS (CJS) and Next.js (ESM)
// without conditional export gymnastics in consumers.
export default defineConfig({
  entry: ['src/index.ts', 'src/enums.ts', 'src/api.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  sourcemap: true,
  splitting: false,
  treeshake: true,
});
