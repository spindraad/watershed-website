# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Stichting Watershed website - a React Router v7 application with SSR, using Puck as a visual page editor. The site supports multiple languages (Dutch, English, Papiamento).

## Common Commands

```bash
# Development
npm run dev              # Run app (port 3000) and Storybook (port 6006) in parallel
npm run dev:app          # Run only the app
npm run dev:storybook    # Run only Storybook

# Database (requires Docker for PostgreSQL)
npm run docker:start     # Start PostgreSQL container
npm run db:migrate       # Run Prisma migrations
npm run db:push:seed     # Push schema and seed database
npm run db:studio        # Open Prisma Studio

# Testing
npm run test:unit        # Run Vitest tests once
npm run test:unit:watch  # Run Vitest in watch mode
npm run test:components  # Run Storybook component tests

# Quality Assurance
npm run qa               # Run lint + typecheck
npm run lint             # ESLint
npm run typecheck        # TypeScript type checking

# Code Generation
npm run generate:component  # Generate new component with Plop
npm run generate:form       # Generate new form with validation
```

## Architecture

### Routing
- Uses `remix-flat-routes` for file-based routing in `app/routes/`
- Routes are locale-aware: `app/routes/($lang)/` pattern for i18n
- React Router v7 with SSR enabled

### Server-Only Code
- `app/.server/` contains server-only modules (db, session, mail, file uploads)
- Uses `vite-env-only` for client/server code separation

### Page Editor (Puck)
- Visual page builder configuration: `app/config/puck.config.tsx`
- Block components: `app/config/blocks/`
- Page content stored as JSON in database (`Page.content`)
- When updating Puck: run `npm run migrate-puck-data` for data migrations

### Internationalization
- Three locales: `nl` (Dutch), `en` (English), `pap` (Papiamento)
- Locale files: `app/locales/{nl,en,pap}.ts`
- Uses `react-i18next` and `remix-i18next`
- Components have co-located translation files: `ComponentName.translations.ts`

### Component Structure
Components follow a pattern with three files:
- `ComponentName.tsx` - Component implementation
- `ComponentName.stories.tsx` - Storybook stories
- `ComponentName.translations.ts` - i18n translations (exports `en`, `nl`, `pap`)

### Validation
- Zod schemas in `app/validations/flows/` for form validation
- Each validation exports types: `ValidationResult`, `ValidationErrors`, response types

### Database
- PostgreSQL with Prisma ORM
- Schema: `prisma/schema.prisma`
- Localised fields use `/// [Localised]` or `/// [LocalisedContent]` JSDoc comments with `prisma-json-types-generator`

### UI Components
- Shoelace web components (via `@shoelace-style/shoelace`)
- Tailwind CSS for styling
- Atomic Design organization in Storybook: Atoms, Molecules, Organisms, Templates