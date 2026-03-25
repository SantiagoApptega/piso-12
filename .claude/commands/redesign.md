Redesign the complete visual system:
1. Read CLAUDE.md for the new design direction
2. Update ALL color tokens in tailwind.config.mjs and global.css — never hardcode hex in components
3. Update typography if needed
4. Check every component uses theme tokens, not hardcoded values
5. Run pnpm build and fix all errors
6. Run /project:sync after
