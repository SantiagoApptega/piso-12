Create a new custom hook in application/hooks/:
1. Pure logic only — no JSX, no styling, no ui/ imports
2. No direct API calls — use ports from domain/
3. Cleanup all side effects on unmount
4. Export as named export
5. Add types to domain/entities/ if needed
6. Run pnpm build after
