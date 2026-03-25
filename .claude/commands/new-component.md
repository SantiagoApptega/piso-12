Create a new reusable component:
1. Check if a similar component already exists — reuse or extend before creating new
2. Props interface defined in domain/entities/ or at top of file if component-specific
3. Component in ui/components/shared/ if reusable, or in its section folder if specific
4. Use only theme tokens
5. Export as named export
6. Run pnpm build after
