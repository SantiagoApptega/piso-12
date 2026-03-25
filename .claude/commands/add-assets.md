Add new assets to the project:
1. Copy files to public/assets/ with correct structure: brand/, decorations/, artist/, videos/
2. Update ALL component references to use new paths
3. Apply correct blend mode: mix-blend-mode: multiply for PNG on light bg, screen for PNG on dark bg
4. Never reference assets outside public/assets/
5. Run pnpm build and fix all errors after
