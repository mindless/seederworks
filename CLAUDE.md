# Next.js 16 Application Template

A production-ready Next.js 16 application template with modern best practices, test-driven development, comprehensive error handling, and advanced routing patterns.

## Technical Stack

- **Framework**: Next.js 16 with App Router
- **Runtime**: Node.js 20.9+ (required)
- **Language**: TypeScript 5.1+ (strict mode)
- **React**: React 19.2 (stable)
- **Bundler**: Turbopack (stable, default)
- **UI Library**: Shadcn UI components
- **Styling**: Tailwind CSS
- **Forms**: React Hook Form + Zod validation
- **State Management**: React Server Components + Server Actions
- **Testing**: Jest + React Testing Library + Playwright (TDD approach)

## Core Principles

When building features in this template:
1. 🔴 **Test-First Development**: Write tests before implementation (Red-Green-Refactor)
2. 🔴 **Server-First**: Prefer Server Components and Server Actions
3. 🔴 **Type Safety**: Use TypeScript strictly with Zod for runtime validation
4. 🔴 **Error Handling**: Implement comprehensive error boundaries and graceful fallbacks
5. 🟡 **Performance**: Optimize for Core Web Vitals with proper code splitting
6. 🟡 **Accessibility**: Follow WCAG 2.1 AA standards

## Quick Reference

### Pattern Index

| Pattern | Section | When to Use |
|---------|---------|-------------|
| TDD Workflow | §0 | Writing tests before implementation |
| Server Actions | §1 | Internal mutations, form submissions |
| Cache Components | §1.5 | Explicit caching control |
| API Routes | §2 | External webhooks, REST endpoints |
| Network Proxy | §2.5 | Request interception, redirects |
| Parallel Routes | §3.1 | Multi-panel layouts, dashboards |
| Intercepting Routes | §3.2 | URL-aware modals, galleries |
| Component Patterns | §4 | Building UI components |
| Error Handling | §5 | Graceful failure management |
| Testing | §6 | Comprehensive test coverage |

### File Naming Conventions

| Convention | Purpose | Example |
|------------|---------|---------|
| `(name)` | Route group (no URL impact) | `(auth)/login` |
| `@name` | Parallel route slot | `@modal/page.tsx` |
| `(..)name` | Intercept route (one level up) | `(..)photo/[id]` |
| `[param]` | Dynamic route segment | `[id]/page.tsx` |
| `default.tsx` | Required for parallel routes | `@modal/default.tsx` |

### Next.js 16 Quick Reference

**💡 For complete Next.js 16 API documentation, use Context7: `@context7 fetch nextjs 16 docs`**

**Project-Specific Patterns** (critical for this template):

| Pattern | Code | Use Case |
|---------|------|----------|
| **Result Type** | `Result<T> = {success:true,data:T} \| {success:false,error:string}` | **ALL server actions** (required) |
| **Async Params** | `await params` / `use(params)` | Pages/Layouts (Next.js 16 breaking change) |
| **Cache Directive** | `'use cache'` / `'use cache: private'` | Opt-in caching (dynamic by default) |
| **Cache Updates** | `updateTag('tag')` / `revalidateTag('tag', 'max')` | Server Actions cache invalidation |
| **Turbopack** | `npm run dev -- --webpack` | Fallback if custom webpack needed |

**Breaking Changes Summary** (see Context7 for full details):
- `params`, `searchParams` are now Promises → use `await` or `use()`
- `cookies()`, `headers()`, `draftMode()` are now async → use `await`
- All code is dynamic by default → add `'use cache'` for static content
- `revalidateTag()` requires 2 arguments → `revalidateTag(tag, profile)`

---

## Getting Started

### Prerequisites

- **Node.js 20.9+** (required for Next.js 16)
- **TypeScript 5.1+**
- **npm** or **yarn** or **pnpm**

### Quick Start

```bash
# Install dependencies
npm install next@latest react@latest react-dom@latest

# Install TypeScript types
npm install -D @types/react@latest @types/react-dom@latest

# Set up environment
cp .env.example .env.local

# Initialize Shadcn UI (if needed)
npx shadcn@latest init

# Start development
npm run dev
```

### Development Commands

```bash
npm run dev          # Development server (Turbopack, default)
npm run build        # Production build (Turbopack, default)
npm run start        # Production server
npm run lint         # Run ESLint (ESLint CLI, not next lint)
npm run test         # Run tests
npm run test:e2e     # E2E tests

# To use webpack instead of Turbopack (if needed)
npm run dev -- --webpack
npm run build -- --webpack
```

**Note**: Next.js 16 uses Turbopack by default. Projects with custom webpack configurations must opt-in with the `--webpack` flag.

**Upgrading from Next.js 15?** See the complete [Migration Guide](#migration-guide-nextjs-15--nextjs-16) below.

---

## 📚 Using Documentation with Context7 MCP

**This template integrates with Context7 MCP for real-time documentation lookup.**

### When to Use Context7

**✅ Use Context7 for:**
- Official Next.js 16 API documentation
- React 19.2 hooks and patterns
- TypeScript syntax and type system details
- Vitest/Playwright API references
- Zod validation schema syntax
- Shadcn UI component APIs
- General web development patterns

**❌ Keep in CLAUDE.md (this file):**
- Project-specific patterns (`Result<T>` type, TDD workflow)
- Custom conventions (file naming, directory structure)
- Template architecture decisions
- Critical gotchas unique to this template

### How to Use Context7

When you need documentation that's not in this file:

```typescript
// Example: Need Next.js 16 caching API details
"@context7 fetch nextjs docs caching revalidateTag updateTag"

// Example: Need React 19 use() hook documentation
"@context7 fetch react docs use hook"

// Example: Need Vitest mocking patterns
"@context7 fetch vitest docs mocking"
```

**Pro Tip**: This file contains the essential patterns. For deep dives into framework APIs, always use Context7 to get the latest official documentation.

---

## Test-Driven Development Workflow

### §0. The Red-Green-Refactor Cycle

🔴 **Critical Principle**: Write tests BEFORE implementation. This is non-negotiable for business logic, server actions, and complex components.

**The TDD Cycle:**

```
1. 🔴 RED    → Write a failing test
2. 🟢 GREEN  → Write minimal code to pass
3. 🔵 REFACTOR → Improve code quality
4. 🔁 REPEAT → Next feature/requirement
```

### When to Use TDD

**🔴 Always Use TDD For:**
- Server Actions (business logic, mutations)
- API Routes (validation, error handling)
- Complex business logic
- Data transformations
- Critical user flows
- Error scenarios

**🟡 Optional for:**
- Simple UI components (presentational only)
- Layout components
- Static pages
- Prototypes (convert to TDD when productionizing)

**🟢 Skip TDD For:**
- One-off scripts
- Configuration files
- Quick experiments

### TDD Workflow

| Phase | Action | Template Pattern |
|-------|--------|------------------|
| 🔴 **RED** | Write failing test | Test `Result<T>`: success, VALIDATION_ERROR, SERVER_ERROR |
| 🟢 **GREEN** | Minimal code | Zod parse → db operation → return `Result<T>` |
| 🔵 **REFACTOR** | Improve | Extract schemas, error handlers, reuse |

**Quick Commands:**
```bash
npm test -- --watch          # TDD watch mode
npm test -- --coverage       # Coverage report
```

**Template Test Pattern:**
```typescript
it('should handle validation errors', async () => {
  const result = await serverAction(invalidData)
  expect(result.success).toBe(false)
  expect(result.code).toBe('VALIDATION_ERROR')
})
```

**Coverage Goals:** 100% server actions, 80%+ stateful components, 60%+ overall

---

## Implementation Patterns

### 1. Server Actions

🔴 **Critical Pattern**: Use `Result<T>` discriminated union for all server actions. **Write tests first** (TDD).

**Result Type:**
```typescript
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string; code?: string }
```

**Template (Next.js 16):**
```typescript
'use server'

import { z } from 'zod'
import { revalidatePath, updateTag } from 'next/cache'
import { cookies } from 'next/headers'

export async function createItem(formData: FormData): Promise<Result<Item>> {
  try {
    // 0. Access request APIs (Next.js 16: now async)
    const cookieStore = await cookies()
    const userId = cookieStore.get('userId')?.value

    // 1. Validate with Zod
    const data = z.object({
      name: z.string().min(1),
      description: z.string().optional(),
    }).parse({
      name: formData.get('name'),
      description: formData.get('description'),
    })

    // 2. Perform operation
    const item = await db.item.create({ data: { ...data, userId } })

    // 3. Update cache (Next.js 16: immediate read-your-writes)
    updateTag('items')

    // Alternative: Stale-while-revalidate
    // revalidateTag('items', 'max')

    // Or revalidate path
    revalidatePath('/items')

    return { success: true, data: item }
  } catch (error) {
    logger.error('Failed to create item', { error })
    if (error instanceof z.ZodError) {
      return { success: false, error: 'Invalid input', code: 'VALIDATION_ERROR' }
    }
    return { success: false, error: 'Failed to create item', code: 'SERVER_ERROR' }
  }
}
```

**Next.js 16 Caching APIs:**

| API | Use Case | Behavior |
|-----|----------|----------|
| `updateTag(tag)` | Server Actions | Immediate cache update (read-your-writes) |
| `revalidateTag(tag, profile)` | Background revalidation | Stale-while-revalidate with cacheLife profile |
| `refresh()` | Refresh uncached data | Refreshes only dynamic data |
| `revalidatePath(path)` | Path-based invalidation | Revalidates all data for path |

**Pattern:** Test first → `Result<T>` + Zod → `await cookies()` → `updateTag()` → Log errors

---

### 1.5. Cache Components

🔴 **Next.js 16**: Dynamic by default. Use `'use cache'` for opt-in caching.

**💡 Full caching API documentation:** `@context7 fetch nextjs 16 caching use cache`

**Config** (required):
```typescript
// next.config.ts
export default { experimental: { dynamicIO: true } }
```

**Decision Matrix:**

| Use Case | Directive | When to Use |
|----------|-----------|-------------|
| Public static | `'use cache'` | Blog posts, products, documentation |
| User-specific | `'use cache: private'` | Dashboards, profiles (with `cookies()`/`headers()`) |
| Shared server | `'use cache: remote'` | Popular items, Redis/Memcached backend |
| Real-time | None (default) | Live feeds, chat, real-time data |

**Quick Example:**
```typescript
'use cache'  // or 'use cache: private' with cookies/headers
import { cacheLife } from 'next/cache'

export async function getData() {
  cacheLife('hours')  // seconds, minutes, hours, days, weeks, max
  return await db.query()
}
```

**Gotchas:**
- 🔴 `'use cache: private'` REQUIRED when using `cookies()`, `headers()`, `searchParams`
- Can apply to file, function, or component level

---

### 2. API Routes

🟡 **Use for**: External integrations, webhooks, REST endpoints. **Prefer Server Actions** for internal mutations.

**Template:**
```typescript
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const schema = z.object({ /* ... */ })

export async function POST(request: NextRequest) {
  try {
    const data = schema.parse(await request.json())
    const result = await processData(data)
    return NextResponse.json({ success: true, data: result })
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { success: false, error: 'Invalid request', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { success: false, error: 'Internal error' },
      { status: 500 }
    )
  }
}
```

**Standards:**
- Validate all inputs with Zod
- Return consistent JSON structure
- Use proper HTTP status codes
- Add rate limiting for public endpoints

---

### 2.5. Network Proxy

🔴 **Next.js 16**: `middleware.ts` → `proxy.ts` (Node.js runtime only)

**💡 Full proxy/middleware documentation:** `@context7 fetch nextjs 16 proxy middleware`

**Common Patterns:**

| Use Case | Response Type | Quick Pattern |
|----------|---------------|---------------|
| **Auth redirect** | `NextResponse.redirect()` | Check `cookies.has('session')` → redirect |
| **A/B testing** | `NextResponse.rewrite()` | Cookie bucket → rewrite to variant |
| **Localization** | `NextResponse.redirect()` | Cookie locale → prefix pathname |

**Template:**
```typescript
// proxy.ts
import { NextRequest, NextResponse } from 'next/server'

export default function proxy(request: NextRequest) {
  const token = request.cookies.get('auth-token')
  if (!token && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  return NextResponse.next()
}

export const config = { matcher: ['/dashboard/:path*', '/api/:path*'] }
```

**Migration:** `npx @next/codemod@canary upgrade latest` (auto-renames middleware → proxy)

---

### 3. Advanced Routing Patterns

**💡 For detailed routing docs:** `@context7 fetch nextjs 16 routing parallel intercepting`

#### 3.1 Parallel Routes (@slots)

**Purpose:** Multi-panel layouts with independent loading/error states

**Structure:** `@modal/`, `@sidebar/` → Layout receives as props
```typescript
export default function Layout({ children, modal, sidebar }) {
  return <>{sidebar} {children} {modal}</>
}
```

**🔴 Critical:** Every `@slot` MUST have `default.tsx` (return `null`) or 404 on refresh

**Use Cases:** Dashboards, modals, split views, conditional auth UI

#### 3.2 Intercepting Routes

**Purpose:** Show modal, preserve shareable URL

**Syntax:** `(..)` = one level up | `(.)` = same level | `(...)` = root

**Template Pattern:**
```typescript
// Structure: @modal/(..)photo/[id]/page.tsx + photo/[id]/page.tsx
'use client'
export default function PhotoModal({ params }) {
  const { id } = use(params)  // Next.js 16
  return <Dialog open onOpenChange={() => router.back()}><Content /></Dialog>
}
```

**🔴 Critical:** Use `<Link>` (not `<a>`) for interception | Provide both modal + direct route

**Common Uses:** Photo gallery, login modal, cart sidebar, item previews

---

### 4. Component Architecture

🔴 **Default to Server Components**. Only add `'use client'` when you need:
- State management (useState, useReducer)
- Effects (useEffect, useLayoutEffect)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- Custom hooks using client features

**💡 For React component patterns:** `@context7 fetch react 19 docs components`

**Next.js 16 Breaking Change** (params are Promises):

```typescript
// Server Components
export default async function Page({ params, searchParams }: PageProps) {
  const { id } = await params  // Now Promise
  const { tab } = await searchParams  // Now Promise
}

// Client Components
import { use } from 'react'
const { id } = use(params)  // Unwrap Promise
```

**Template Pattern** (Server → Client data flow):
```typescript
// Server: Fetch with Result<T>
export async function UserProfile({ id }: { id: string }) {
  const result = await getUserData(id)
  if (!result.success) return <ErrorState error={result.error} />
  return <EditForm user={result.data} />
}

// Client: Handle interaction with Server Actions
'use client'
export function EditForm({ user }) {
  async function handleSubmit(formData: FormData) {
    const result = await updateUser(formData)  // Returns Result<T>
    // Handle result.success / result.error
  }
}
```

**Directory Structure:** `components/ui/` (Shadcn) | `modals/` | `slots/` | `forms/` | `layouts/` | `shared/`

---

### 5. Error Handling

🔴 **Critical**: Use discriminated union `Result<T>` types for all operations.

**Template Error Pattern:**

| Layer | Required | Pattern |
|-------|----------|---------|
| **Server** | `Result<T>` + Zod | `try { validate → db → return } catch { log → return error }` |
| **Client** | ErrorBoundary + cleanup | AbortController, useEffect cleanup, retry w/backoff |
| **UX** | Clear messages | Show `result.error`, recovery actions, optimistic UI |

---

### 6. Testing

🔴 **Critical Principle**: **Write tests FIRST** (see §0 TDD Workflow). Testing is not optional - it's a core requirement.

**Testing Priority Matrix:**

| Priority | Test Type | Focus | When to Write |
|----------|-----------|-------|---------------|
| 🔴 Critical | Server actions | Result types, error cases, caching | Before implementation (TDD) |
| 🔴 Critical | E2E flows | User journeys, critical paths | Before feature completion |
| 🔴 Critical | Business logic | Data transformations, calculations | Before implementation (TDD) |
| 🟡 Important | Components | User interactions, state changes | During implementation |
| 🟡 Important | Hooks | Async behavior, cleanup, effects | Before implementation (TDD) |
| 🟢 Optional | Edge cases | Race conditions, network issues | As discovered |

### Testing Patterns for Next.js 16

**💡 For Vitest/Playwright API details:** `@context7 fetch vitest docs` / `@context7 fetch playwright docs`

**Template-Specific Patterns:**

```typescript
// Server Actions (Next.js 16: async APIs)
vi.mock('next/headers', () => ({ cookies: vi.fn() }))
vi.mocked(cookies).mockResolvedValue({ get: vi.fn().mockReturnValue({ value: 'user-123' }) })

// Pages (Next.js 16: Promise params)
const params = Promise.resolve({ id: '123' })
const searchParams = Promise.resolve({ tab: 'overview' })

// Client Components (mock Result<T> actions)
vi.mock('@/lib/actions', () => ({ updateUser: vi.fn() }))
vi.mocked(updateUser).mockResolvedValue({ success: true, data: {} })

// E2E (Playwright - no changes from Next.js 15)
await page.goto('/users/123')
await expect(page.locator('text=Updated')).toBeVisible()
```

**Test Structure** (TDD: Red-Green-Refactor):
- Test `Result<T>` happy path: `expect(result.success).toBe(true)`
- Test validation errors: `expect(result.code).toBe('VALIDATION_ERROR')`
- Test server errors: `expect(result.code).toBe('SERVER_ERROR')`

### Test Coverage Goals

**Minimum Coverage Requirements:**
- 🔴 **100%** for server actions and business logic
- 🔴 **90%+** for critical user flows (E2E)
- 🟡 **80%+** for components with state/interactions
- 🟡 **70%+** for utility functions
- 🟢 **60%+** overall codebase

**Generate Coverage Report:**
```bash
npm test -- --coverage
```

### Testing Checklist

**TDD Flow:** 🔴 Write test (happy, error, edge) → 🟢 Implement `Result<T>` → 🔵 Refactor → ✅ Coverage

**Next.js 16 Mocking:**
- `vi.mocked(cookies).mockResolvedValue({ get: vi.fn() })` (async APIs)
- `params: Promise.resolve({ id: '123' })` (Promise params)
- Test `updateTag()`, `revalidateTag()`, `'use cache'` directives

---

## Common Gotchas

**Quick Reference** (see sections for details):

| Category | Critical Gotcha | Fix | Details |
|----------|----------------|-----|---------|
| **Async APIs** | `params`/`searchParams` are Promises | Add `await params` or `use(params)` | See §4, Cheat Sheet |
| **Caching** | Dynamic by default | Add `'use cache'` directive | See §1.5 |
| **Cache APIs** | `revalidateTag()` needs 2 args | Use `revalidateTag('tag', 'max')` or `updateTag('tag')` | See §1 |
| **Bundler** | Turbopack is default | Use `--webpack` flag if needed | See Migration Guide |
| **Directives** | Missing `'use'` directives | Add `'use server'`, `'use client'`, or `'use cache'` | See §1, §1.5, §4 |
| **Parallel Routes** | Missing `default.tsx` | Add to all `@slot` directories | See §3.1 |
| **Intercepting Routes** | Using `<a>` instead of `<Link>` | Use `next/link` for interception | See §3.2 |
| **Proxy** | `middleware.ts` deprecated | Rename to `proxy.ts` (Node.js runtime only) | See §2.5 |
| **Environment** | Wrong Node.js version | Requires Node.js 20.9+, TypeScript 5.1+ | See Prerequisites |
| **Metadata** | Params not awaited | Await params in metadata functions | See §4 |

**Next.js 16 Breaking Changes:**

```typescript
// ✅ Correct (Next.js 16)
export default async function Page({ params, searchParams }) {
  const { id } = await params
  const cookieStore = await cookies()
}

// ❌ Incorrect (Next.js 15 - will break!)
export default function Page({ params }) {
  const { id } = params  // Error: params is a Promise
}
```

**Common Pitfalls:**

- 🔴 Every `@slot` directory MUST have `default.tsx` (return `null` if inactive)
- 🔴 Client env vars MUST be prefixed with `NEXT_PUBLIC_`
- 🔴 Interception only works with `<Link>` from `next/link`, not `<a>` tags
- 🟡 Turbopack supports loaders but NOT webpack plugins
- 🟡 Use singleton pattern for expensive clients (DB, API connections)

---

## Performance Tips

| Category | Optimization | Impact |
|----------|--------------|--------|
| **Bundling** | Turbopack (default) | 2-5× faster builds, 10× faster Fast Refresh |
| **Build Caching** | File system caching (Beta) | Persistent compiler artifacts |
| **Compilation** | React Compiler (opt-in) | Automatic memoization, fewer re-renders |
| **Rendering** | Prefer Server Components | Better initial load, reduced JS |
| **Caching** | `"use cache"` directive | Explicit, granular cache control |
| **Routing** | Layout deduplication | Shared layouts load once |
| **Prefetching** | Incremental prefetching | Only fetch uncached portions |
| **Code Splitting** | Use `next/dynamic` for heavy components | Smaller bundles |
| **Loading States** | Suspense boundaries + `loading.tsx` | Progressive rendering |
| **Images** | Use `next/image` component | Optimized delivery |
| **Parallel Routes** | Independent data fetching per slot | Faster perceived perf |
| **Streaming** | Slots stream independently | Non-blocking UI |

### Next.js 16 Specific Optimizations

**1. Turbopack Performance:**
```json
// next.config.ts
export default {
  experimental: {
    // Enable file system caching (Beta)
    turbo: {
      resolveExtensions: ['.tsx', '.ts', '.jsx', '.js'],
    },
  },
}
```

**2. React Compiler (Opt-in):**
```json
// next.config.ts
export default {
  experimental: {
    reactCompiler: true,  // Auto memoization
  },
}
```

**3. Cache Components Strategy:**
- Static content: `'use cache'` + `cacheLife('max')` or `cacheLife('weeks')`
- Dynamic content: `'use cache: private'` + `cacheLife('minutes')`
- See [§1.5 Cache Components](#15-cache-components) for full details

**4. Incremental Prefetching:**
- Use `router.prefetch(url)` on hover: `<Link onMouseEnter={() => router.prefetch(url)}>`
- Only fetches uncached portions of the route

**Parallel Routes Performance:**
- Each slot fetches data independently
- Wrap slots in `<Suspense>` for granular loading
- Add `error.tsx` per slot to prevent full page crashes
- Keep modal content lightweight; full pages can be detailed

**Build Performance:**
```bash
# Production build with all optimizations
npm run build

# Analyze bundle size
npm run build && npx @next/bundle-analyzer

# Profile build performance
NEXT_PROFILE=true npm run build
```

---

## Design Implementation

**Pattern Decision Tree:**
- Modals w/URLs? → `@modal` + `(..)route` (intercepting)
- Multi-panel? → `@slot` (parallel routes)
- Auth layouts? → `@slot` + conditional render
- Independent loading/errors? → `loading.tsx` + `error.tsx` per slot

---

## Migration Guide: Next.js 15 → Next.js 16

**💡 For comprehensive migration guide:** `@context7 fetch nextjs 16 migration guide upgrade`

### Quick Start

```bash
# Automated migration (recommended)
npx @next/codemod@canary upgrade latest
```

**Prerequisites**: Node.js 20.9+, TypeScript 5.1+, clean git working directory

### Template-Specific Migration

**Critical Changes for This Template:**

| Step | Action | Why |
|------|--------|-----|
| **1. Update Server Actions** | Add `await` to `cookies()`, `headers()` | Breaking: Now async |
| **2. Update Pages/Layouts** | Add `await params`, `await searchParams` | Breaking: Now Promises |
| **3. Update Tests** | Mock async APIs: `vi.mocked(cookies).mockResolvedValue({...})` | Tests will fail otherwise |
| **4. Parallel Routes** | Verify all `@slot` have `default.tsx` | 404 on refresh without it |
| **5. Result<T> Pattern** | No changes needed | Template pattern still works |

**Server Actions** (critical for this template):
```typescript
// ✅ After migration
const cookieStore = await cookies()  // Now async
updateTag('items')  // For Result<T> actions
```

**Tests** (will break without this):
```typescript
vi.mocked(cookies).mockResolvedValue({ get: vi.fn().mockReturnValue({ value: 'test' }) })
const params = Promise.resolve({ id: 'test' })
```

**Parallel Routes** (template uses `@modal`, `@sidebar`):
```typescript
// Verify default.tsx exists in all slots
// @modal/default.tsx, @sidebar/default.tsx, etc.
export default function Default() { return null }
```
</details>

### Migration Checklist

**Quick Flow:** Backup → `npx @next/codemod@canary upgrade latest` → Fix tests → Verify `@slot/default.tsx` → Build → Test

**Template-Specific:**
- [ ] Update test mocks: `vi.mocked(cookies).mockResolvedValue({...})`
- [ ] Verify all `@slot` directories have `default.tsx`
- [ ] Update `revalidateTag()` to `revalidateTag(tag, 'max')` or use `updateTag(tag)`

### Common Migration Issues

| Issue | Error | Fix |
|-------|-------|-----|
| **TypeScript: params** | `Property 'id' does not exist on type 'Promise<{ id: string }>'` | Add `await params` in Server Components or `use(params)` in Client Components |
| **Missing Argument** | `revalidateTag: Expected 2 arguments, but got 1` | Use `revalidateTag('tag', 'max')` or `updateTag('tag')` for immediate updates |
| **Webpack Config** | `Webpack config not supported with Turbopack` | Use `--webpack` flag: `npm run dev -- --webpack` |
| **Async Mocks** | `cookies() is not a function` | Mock as Promise: `vi.mocked(cookies).mockResolvedValue({ get: vi.fn() })` |

<details>
<summary><strong>Detailed Fixes</strong> (click to expand)</summary>

**params TypeScript Error:**
```typescript
// ✅ Server Components
const { id } = await params

// ✅ Client Components
import { use } from 'react'
const { id } = use(params)
```

**revalidateTag Signature:**
```typescript
// ✅ Stale-while-revalidate
revalidateTag('tag', 'max')

// ✅ Immediate update (Server Actions)
updateTag('tag')
```

**Turbopack/Webpack:**
```bash
# Continue using webpack
npm run dev -- --webpack
npm run build -- --webpack
```

**Test Mocks:**
```typescript
vi.mocked(cookies).mockResolvedValue({
  get: vi.fn().mockReturnValue({ value: 'test' }),
} as any)
```
</details>

**Rollback**: `git reset --hard HEAD~1` or `git revert <commit-hash>`

**Expected Performance Gains**: 2-5× faster builds, 10× faster Fast Refresh (Turbopack)

---

## Appendix

### Project Structure

**Template Organization** (see file naming conventions in Quick Reference):

| Directory | Purpose | Key Files |
|-----------|---------|-----------|
| `app/` | Next.js App Router | Pages, layouts, API routes, slots (`@modal`, `@sidebar`) |
| `components/` | React components | `ui/` (Shadcn), `modals/`, `slots/`, `forms/`, `layouts/`, `shared/` |
| `lib/` | Business logic | `actions.ts` (Result<T>), `db.ts`, `schemas.ts` (Zod), `utils.ts` |
| `hooks/` | Custom React hooks | `useAsyncAction.ts`, `useDebounce.ts`, `useLocalStorage.ts` |
| `types/` | TypeScript definitions | `index.ts`, `api.ts`, `database.ts` |
| `tests/` | Test suites | `unit/`, `integration/`, `e2e/` |

**Critical Requirements:**
- 🔴 Every `@slot` directory MUST have `default.tsx`
- 🔴 All Server Actions MUST return `Result<T>`
- 🔴 Route groups: `(auth)`, `(dashboard)` for organization

### Resources

**💡 Use Context7 for documentation:**
- Next.js 16: `@context7 fetch nextjs 16 docs`
- React 19: `@context7 fetch react 19 docs`
- TypeScript: `@context7 fetch typescript docs`
- Vitest/Playwright: `@context7 fetch vitest docs` / `@context7 fetch playwright docs`
- Shadcn UI: `@context7 fetch shadcn ui docs`
- Zod: `@context7 fetch zod docs`

---

**Template Version**: 3.0 (Next.js 16 + TDD)
**Last Updated**: 2025-11-10
