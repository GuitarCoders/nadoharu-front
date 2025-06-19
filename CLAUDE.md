# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**나도하루 (Nadoharu Front)** is a Korean social media platform built with Next.js 15, featuring real-time chat, posts timeline, friend system, and PWA capabilities. The app follows a mobile-first design approach with GraphQL-first data architecture.

## Core Architecture

### GraphQL-First Data Layer
- **Apollo Client 3.13.7** with type-safe operations via GraphQL Code Generator
- **Co-located GraphQL pattern**: Each feature directory contains `(graphql)/` folder with queries next to components
- **Near-operation-file preset**: Types generated adjacent to `.graphql` files for tight coupling
- GraphQL endpoint configured via `NEXT_PUBLIC_GRAPHQL_API` environment variable
- Schema introspection and automatic type generation with `npm run codegen`

### Route Architecture
- **Route Groups**: `(auth)`, `(tabs)` for logical organization without URL impact
- **Server Actions Pattern**: Each feature has `data.ts` (queries) and `action.ts` (mutations)
- **Dynamic Routes**: `[postId]`, `[accountId]`, `[id]` with co-located GraphQL operations
- **Nested Layouts**: Different layouts for auth flow vs main app tabs

### State Management Strategy
- **Jotai 2.12.3**: Atomic state for UI state (alerts, toasts, global app state)
- **Apollo Client Cache**: Server state management with GraphQL data
- **Iron Session 8.0.4**: Secure session management with `nadoharu` cookie
- **React Hook Form**: Form state with validation

## Development Commands

```bash
# Development
npm run dev                 # Start dev server with hot reload
npm run build              # Production build (required before deploy)
npm run start              # Start production server
npm run lint               # ESLint with Next.js rules

# GraphQL Development
npm run codegen            # Generate TypeScript types from GraphQL schema
npm run codegen:watch      # Watch mode for active development

# Docker (Production)
docker build --build-arg NEXT_PUBLIC_GRAPHQL_API={API_URL} --build-arg COOKIE_PASSWORD={PASSWORD} -t nadoharu-front .
```

## Key Development Patterns

### GraphQL Workflow
1. Create `.graphql` files in feature's `(graphql)/` directory
2. Run `npm run codegen` to generate types and hooks
3. Import generated documents/hooks with full TypeScript safety
4. Use server actions in `data.ts`/`action.ts` for data operations

### Component Architecture
- **Domain-driven organization**: `components/domains/` contains feature-specific components
- **Shared UI**: `components/shared/` for reusable components
- **Layout system**: `components/layouts/` with nested layout support
- **Provider pattern**: `components/providers/` for context providers

### Authentication Flow
- JWT-based with Iron Session cookie storage
- Middleware-based route protection in `middleware.ts`
- Session utilities in `libs/session.ts`
- Automatic auth redirects based on login state

## Technology Stack

### Core Framework
- **Next.js 15.3.0** with App Router, Standalone output for Docker
- **React 19.0.0** with Strict Mode
- **TypeScript 5.8.3** with strict configuration and path aliases (`@/*`)

### UI & Styling
- **Tailwind CSS 4** with custom theme and dark mode support
- **Radix UI** for accessible component primitives
- **Framer Motion 12.12.1** for animations
- **Heroicons** for consistent iconography
- **Geist fonts** (Sans & Mono)

### Mobile & PWA
- **Next PWA 5.6.0** with offline capabilities
- **Pull-to-refresh** implementation in posts timeline
- Mobile-first responsive design patterns
- Touch-optimized interactions

## Environment Configuration

### Required Environment Variables
```bash
NEXT_PUBLIC_GRAPHQL_API=    # GraphQL API endpoint
COOKIE_PASSWORD=            # Iron Session encryption key (32+ chars)
NODE_ENV=                   # development/production
```

### Configuration Files
- `next.config.ts`: PWA setup, standalone output, React strict mode
- `codegen.ts`: GraphQL type generation with near-operation-file preset
- `tsconfig.json`: Path aliases, strict mode, bundler resolution
- `tailwind.config.ts`: Custom theme with Korean font support

## Core Features

### Social Platform Features
- **Posts Timeline**: Infinite scroll with pull-to-refresh
- **Real-time Chat**: Individual and group messaging
- **Friend System**: Send/receive friend requests, friend lists
- **User Profiles**: Profile management and viewing
- **Notifications**: Activity notifications system
- **Comments & Reposts**: Social interaction features

### Mobile Experience
- PWA with app-like experience
- Touch gestures and mobile navigation
- Responsive design with mobile breakpoints
- Offline functionality via service worker

## File Organization Insights

### GraphQL Co-location
Each feature follows this pattern:
```
feature/
├── page.tsx              # React component
├── data.ts               # Server actions for queries
├── action.ts             # Server actions for mutations
├── layout.tsx            # Feature-specific layout
└── (graphql)/            # GraphQL operations
    ├── query.graphql     # GraphQL queries
    ├── mutation.graphql  # GraphQL mutations
    └── *.generated.ts    # Auto-generated types
```

### State Management Files
- `libs/atoms.ts`: Jotai atom definitions
- `libs/apollo-client.ts`: Apollo Client configuration
- `libs/session.ts`: Session management utilities
- `libs/utils.ts`: Shared utility functions

## Development Best Practices

### Type Safety
- End-to-end type safety from GraphQL schema to React components
- Generated TypeScript types for all GraphQL operations
- Strict TypeScript configuration with no implicit any

### Code Generation
- Always run `npm run codegen` after modifying `.graphql` files
- Use generated hooks and types for GraphQL operations
- Keep GraphQL operations close to consuming components

### Mobile-First Development
- Test on mobile devices/viewports first
- Use touch-friendly UI patterns
- Implement proper loading and error states for mobile UX