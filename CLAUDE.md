# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A portfolio website built with Next.js App Router, Sanity CMS, and Framer Motion. The site features smooth scroll animations and a contact form.

## Tech Stack

- **Framework**: Next.js 16 (App Router) with React 19
- **Language**: TypeScript (strict mode)
- **CMS**: Sanity v4 with GROQ queries
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Linter/Formatter**: Biome
- **Package Manager**: pnpm

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Type check without building
pnpm typecheck

# Build for production
pnpm build

# Start production server
pnpm start

# Lint and format code with Biome
pnpm fix

# Lint and format code (unsafe fixes)
pnpm fix:unsafe

# Check code quality with Biome (no changes)
pnpm check

# Run Next.js linter (optional)
pnpm lint
```

## Environment Variables

Required environment variables (create a `.env.local` file):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production

# For contact form functionality
SMTP_HOST=your_smtp_host
SMTP_ACC=your_smtp_username
SMTP_PASS=your_smtp_password
```

## Architecture

### App Router Structure

This project uses **Next.js App Router** (not Pages Router):

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page (server component)
│   ├── providers.tsx       # Client-side providers
│   ├── api/contact/        # API routes
│   └── studio/             # Sanity Studio
└── sanity/
    ├── lib/
    │   ├── client.ts       # Sanity client
    │   ├── queries.ts      # GROQ queries
    │   └── live.ts         # Live preview
    └── schemaTypes/        # Content schemas
```

### Data Fetching Pattern

The application uses **Sanity GROQ queries** with the modern client:

1. **Queries** are defined in `/src/sanity/lib/queries.ts` using `defineQuery`
2. **Client**: Sanity client is configured in `/src/sanity/lib/client.ts`
3. **Types**: Type definitions are in `/types/sanity/index.ts`
4. **Data Fetching**: Server components fetch data directly using `client.fetch()`

Example data fetching in App Router:
```typescript
// src/app/page.tsx
import { client } from '../sanity/lib/client'
import { ABOUTS_QUERY } from '../sanity/lib/queries'

export default async function HomePage() {
  const abouts = await client.fetch(ABOUTS_QUERY)
  return <About abouts={abouts} />
}
```

### Component Structure

- **`/components`**: Reusable components
  - `/sections` - Major page sections (Landing, About, Works, Skills, Footer)
  - `/wrappers` - Layout wrappers (MotionWrapper, FullScreenWrapper)
  - `/ui` - Reusable UI components
  - `Header.tsx`, `Layout.tsx` - Site structure
  - `Overlay.tsx` - Global overlay/modal with context and scroll lock
  - `NavigationDots.tsx`, `SocialMedia.tsx`, `Tooltip.tsx` - UI helpers

- **`/src/sanity`**: Sanity CMS configuration
  - `/lib` - Client, queries, and utilities
  - `/schemaTypes` - Content type definitions (TypeScript)

- **`/util`**: Utility functions
  - `getRndInteger`, `memoize`, `onNavigate`

### Client vs Server Components

- **Server Components** (default): `src/app/page.tsx`, layout
- **Client Components** (with `'use client'`): All interactive components using hooks, Framer Motion, or browser APIs
  - All components in `/components` directory are client components
  - `src/app/providers.tsx` wraps the app with client-side context

### Global State Management

React Context for overlay/modal management:

```typescript
// Provided in providers.tsx
const { dismiss, display, isOpen } = useOverlayImplementation()

// Used in any client component
const { isOpen, dismiss, display } = useOverlay()
```

### Animation Pattern

Framer Motion for scroll-based animations:

```typescript
<MotionWrapper>
  <YourComponent />
</MotionWrapper>
```

## Code Style Guidelines

### Biome Configuration

This project uses **Biome** for linting and formatting (not ESLint or Prettier).

**Configuration:** `biome.json`
- **Formatter**: Enabled with double quotes
- **Linter**: Enabled with recommended rules
- **Auto-organize imports**: Enabled
- **Quote style**: Double quotes

**Commands:**
- `pnpm check` - Check code quality (read-only)
- `pnpm fix` - Format and apply safe fixes
- `pnpm fix:unsafe` - Format and apply all fixes including unsafe ones

### Code Style Rules

- **Component Definition**: Use arrow functions for all components
  ```typescript
  // Correct
  const MyComponent = () => { ... }

  // Incorrect
  function MyComponent() { ... }
  ```

- **Quotes**: Double quotes (enforced by Biome)
- **Console Statements**: Use sparingly

### TypeScript

- Strict mode enabled
- Prefer explicit types over `any`
- Use manually defined types from `/types/sanity/index.ts`

### Imports

- Absolute imports from project root
- Auto-organized by Biome
- Prefer index.ts barrel exports

## Working with Sanity CMS

### Accessing Sanity Studio

Visit `/studio` route in development to access Sanity Studio for content editing.

### Modifying Content Schema

1. Edit schema files in `/src/sanity/schemaTypes/`
2. Update `/src/sanity/schemaTypes/index.ts` to export new schemas
3. Schemas are in TypeScript using `defineType` and `defineField`
4. Changes reflect immediately in Sanity Studio

### Adding New Queries

1. Add GROQ query to `/src/sanity/lib/queries.ts`:
   ```typescript
   export const YOUR_QUERY = defineQuery(`*[_type == "yourType"] {
     _id,
     field1,
     "imageUrl": image.asset->url
   }`)
   ```

2. Add types to `/types/sanity/index.ts`

3. Fetch in server component:
   ```typescript
   const data = await client.fetch(YOUR_QUERY)
   ```

## Next.js Configuration

- App Router (not Pages Router)
- React strict mode enabled
- Turbopack for faster builds
- Image optimization with `remotePatterns` for Sanity CDN

## Tailwind CSS v4

- CSS-first configuration in `styles/globals.css`
- Uses `@import "tailwindcss"` (not `@tailwind` directives)
- Theme defined in `@theme` block
- No SASS/SCSS support (plain CSS only)

## Branch Information

- **Main branch**: `master`
- **Current development**: `2025-overhaul`
