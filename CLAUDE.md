# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A portfolio website built with Next.js, Sanity CMS, and Framer Motion. The site is statically generated at build time and features smooth scroll animations and a contact form.

## Tech Stack

- **Framework**: Next.js (latest) with React 19
- **Language**: TypeScript (strict mode)
- **CMS**: Sanity (GraphQL API)
- **Styling**: Tailwind CSS, SASS
- **Animation**: Framer Motion
- **Package Manager**: pnpm

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint

# Generate GraphQL types from schemas
pnpm gen
```

## Environment Variables

Required environment variables (create a `.env.local` file):

```
SANITY_PROJECT_ID=your_sanity_project_id
GRAPHQL_ENDPOINT=https://your_project_id.api.sanity.io/v1/graphql/production/default

# For contact form functionality
SMTP_HOST=your_smtp_host
SMTP_ACC=your_smtp_username
SMTP_PASS=your_smtp_password
```

## Architecture

### Data Flow Pattern

The application uses a GraphQL code generation workflow:

1. **GraphQL Queries** are defined in `/graphql/*.graphql` files
2. **Code Generation**: Run `pnpm gen` to generate TypeScript types and SDK in `/graphql/generated.ts`
3. **SDK Wrapper**: `/client/index.ts` creates a configured GraphQL client that connects to Sanity
4. **Type Exports**: `/types/sanity/index.ts` exports refined types from generated queries
5. **Data Fetching**: Pages use `getStaticProps` with the SDK to fetch data at build time

Example data fetching:
```typescript
export const getStaticProps: GetStaticProps = async () => {
  const { allAbouts: abouts } = await sdk().About();
  return { props: { abouts } };
};
```

### Component Structure

- **`/pages`**: Next.js pages and API routes
  - `index.tsx` - Main portfolio page
  - `_app.tsx` - App wrapper with Layout and OverlayContext provider
  - `api/contact.ts` - Contact form API endpoint using nodemailer

- **`/components`**: Reusable components organized by function
  - `/sections` - Major page sections (Landing, About, Works, Skills, Footer)
  - `/wrappers` - Layout wrappers (MotionWrapper for animations, FullScreenWrapper for full-screen sections)
  - `/ui` - Reusable UI components (Link, etc.)
  - `Header.tsx`, `Layout.tsx` - Site structure components
  - `Overlay.tsx` - Global overlay/modal with context (includes scroll lock functionality)
  - `NavigationDots.tsx`, `SocialMedia.tsx`, `Tooltip.tsx` - Navigation and UI helpers

- **`/sanity`**: Sanity CMS studio directory
  - `/schemas` - Content schemas (abouts, works, skills, experiences, etc.)
  - Independent Sanity Studio installation

- **`/util`**: Utility functions
  - `getRndInteger` - Random number generator
  - `memoize` - Function memoization helper
  - `onNavigate` - Smooth scroll navigation with header offset

### Global State Management

The app uses React Context for overlay/modal management:

```typescript
// Overlay context is provided in _app.tsx
const { dismiss, display, isOpen } = useOverlayImplementation();

// Use in any component
const { isOpen, dismiss, display } = useOverlay();
```

The overlay automatically handles scroll locking when opened.

### Animation Pattern

Components use Framer Motion for scroll-based animations:

```typescript
// MotionWrapper provides consistent scroll animations
<MotionWrapper>
  <YourComponent />
</MotionWrapper>
```

## Code Style Guidelines

### ESLint Rules

- **Component Definition**: All components must use arrow functions (enforced)
  ```typescript
  // Correct
  const MyComponent = () => { ... };

  // Incorrect - will error
  function MyComponent() { ... }
  ```

- **Console Statements**: `console.log` triggers warnings (use sparingly)

### TypeScript

- Strict mode enabled
- Prefer explicit types over `any`
- Use generated types from GraphQL queries

### Imports

- Use absolute imports from project root (configured in tsconfig.json)
- Prefer index.ts barrel exports for cleaner imports

## Working with Sanity CMS

### Modifying Content Schema

1. Edit schema files in `/sanity/schemas/`
2. Deploy schema changes through Sanity Studio (separate deployment from Next.js app)
3. Run `pnpm gen` to regenerate GraphQL types
4. Update GraphQL queries in `/graphql/*.graphql` if needed

### Adding New GraphQL Queries

1. Create or update `.graphql` file in `/graphql/`
2. Run `pnpm gen` to generate types
3. Import and use the generated query function from SDK:
   ```typescript
   import { sdk } from '../client';
   const data = await sdk().YourQuery();
   ```

## Next.js Configuration

- React strict mode enabled
- Image domains: `cdn.sanity.io` (for Sanity images)
- Static generation (SSG) is the primary rendering method

## Branch Information

- **Main branch**: `master`
- **Current development**: `2025-overhaul`
