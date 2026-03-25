Create a new section following hexagonal architecture:
1. If new types needed → add to domain/entities/
2. If new logic needed → create hook in application/hooks/ (no JSX, no styling)
3. Create UI component in ui/components/[SectionName]/
4. Always wrap with SectionWrapper for scroll reveal
5. Always use SectionHeading for titles
6. Use only theme tokens — never hardcode colors
7. Add to index.astro with correct client directive
8. Run pnpm build and fix all errors
