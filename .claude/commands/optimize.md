Optimize project performance:
1. Audit all images — convert to WebP where possible, add width/height attributes
2. Check all components use client:visible instead of client:load where possible
3. Verify HeroSection and CountdownTimer use client:only="react"
4. Check no blocking scripts in Layout.astro head
5. Verify Lenis and Three.js cleanup on unmount
6. Run pnpm build and check bundle size
7. Report what was changed
