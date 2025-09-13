# Repository Guidelines

## Project Structure & Module Organization
- Next.js (App Router) with TypeScript. Key paths:
  - `app/` pages, routes, server actions, and route-scoped GraphQL ops (`*.graphql`, `*.generated.ts`).
  - `components/` reusable UI by domain (`domains/`) and shared (`shared/`).
  - `libs/` utilities (Apollo client, atoms, formatters), `hooks/` custom hooks.
  - `graphql/` shared fragments and generated types (`graphql/generated/`).
  - `public/` static assets, `docs/` specs, `middleware.ts` for edge.

## Build, Test, and Development Commands
- `yarn dev` — run the app locally.
- `yarn build` — generate GraphQL types then build Next.js.
- `yarn start` — start production build locally.
- `yarn codegen` / `:beta` / `:prod` / `:watch` — run GraphQL Codegen (requires env).
- `yarn lint` — ESLint (Next core-web-vitals + TS rules).
- `yarn test` — unit tests (Vitest + JSDOM + Testing Library).
- `yarn test:e2e` / `:e2e-ui` — Playwright tests.
- `yarn storybook` — Storybook dev; `yarn build-storybook`, `yarn test-storybook`.
- Docker: see `README.md` for build/run; compose in `docker-compose.yml`.

## Coding Style & Naming Conventions
- TypeScript strict (`tsconfig.json`); import alias `@/*`.
- 2-space indentation; prefer `const`; no default exports for React components.
- Filenames: kebab-case (`edit-profile-form.tsx`), components PascalCase inside default export files allowed.
- React components `*.tsx`; utilities `*.ts`; co-locate styles as `*.module.css`.
- Keep GraphQL ops next to routes/components; generated files end with `.generated.ts`.

## Testing Guidelines
- Unit: place near source in `__tests__/`, name `*.spec.ts(x)`. Use Testing Library (`getByRole`, `userEvent`) and meaningful assertions.
- E2E: Playwright matches `tests/` or `**/__tests__/**/*.spec.ts(x)` (see `playwright.config.ts`).
- Prefer small, focused tests; mock network via Apollo/testing where needed.

## Commit & Pull Request Guidelines
- Commit style: Conventional Commits used in history (`feat:`, `fix:`, `chore:`, `refactor:`, `test:`). Keep messages imperative and concise; English or Korean ok.
- PRs: clear description, motivation, screenshots for UI, reproduction/verification steps, linked issues, and checklist (tests added/updated, codegen/lint pass).

## Security & Configuration Tips
- Env management: `APP_ENV` selects `.env.dev`/`.env.beta`/`.env`; require `NEXT_PUBLIC_GRAPHQL_API`. For Docker, also set `COOKIE_PASSWORD`.
- Run `yarn codegen` after env changes; avoid committing `.env*`.
- PWA is enabled (see `next.config.ts`); test offline behavior when touching service-worker-affecting code.
