# Professional Frontend Project Structure

## Project Organization Guide

### Directory Structure

```
src/
├── app/                              # Next.js 14 App Router
│   ├── (auth)/                      # Auth group layout
│   │   ├── login/
│   │   ├── register/
│   │   └── layout.tsx
│   ├── (public)/                    # Public pages group
│   │   ├── about/
│   │   ├── contact/
│   │   ├── how-it-works/
│   │   ├── page.tsx (home)
│   │   └── layout.tsx
│   ├── (officer)/                   # Officer portal group
│   │   ├── admin/
│   │   ├── tender/
│   │   ├── layout.tsx
│   │   └── [...routes]
│   ├── (vendor)/                    # Vendor portal group
│   │   ├── dashboard/
│   │   ├── profile/
│   │   ├── tenders/
│   │   ├── layout.tsx
│   │   └── [...routes]
│   ├── api/                         # API Routes
│   │   └── [...routes]
│   ├── layout.tsx                   # Root layout
│   ├── loading.tsx
│   ├── not-found.tsx
│   └── globals.css
│
├── components/
│   ├── ui/                          # Shadcn UI Components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   └── [... other ui]
│   ├── common/                      # Shared across app
│   │   ├── Navbar.tsx
│   │   ├── Footer.tsx
│   │   ├── AuthProvider.tsx
│   │   └── RoleGuard.tsx
│   ├── features/                    # Feature-specific components
│   │   ├── tender/
│   │   │   ├── CreateTenderModal.tsx
│   │   │   └── [other tender components]
│   │   ├── bid/
│   │   │   ├── BidCountdown.tsx
│   │   │   ├── BlockchainTxModal.tsx
│   │   │   └── [other bid components]
│   │   ├── kyc/
│   │   │   ├── KYCStatusBadge.tsx
│   │   │   ├── KYCStatusStepper.tsx
│   │   │   └── [other kyc components]
│   │   └── admin/
│   │       ├── AdminPageContent.tsx
│   │       ├── SystemHealthPanel.tsx
│   │       └── [other admin components]
│   └── badges/                      # Badge/pill components
│       ├── EncryptedBidBadge.tsx
│       ├── ImmutableBadge.tsx
│       ├── IPFSHashPill.tsx
│       └── WinnerBanner.tsx
│
├── hooks/                           # Custom React Hooks
│   ├── useStoreSubscription.ts
│   └── [custom hooks]
│
├── lib/                             # Utilities & Helpers
│   ├── store/
│   │   └── tenderStore.ts           # Global state
│   ├── api/
│   │   └── client.ts                # API client utilities
│   ├── hooks/
│   │   └── useBlockchainTx.ts
│   └── utils.ts                     # General utilities
│
├── types/                           # Type Definitions
│   ├── index.ts                     # Centralized types
│   ├── tender.ts                    # Tender-specific types
│   ├── bid.ts                       # Bid-specific types
│   ├── user.ts                      # User-related types
│   └── api.ts                       # API response types
│
├── constants/                       # App Constants
│   ├── routes.ts                    # Route paths
│   ├── enums.ts                     # Enums
│   └── config.ts                    # App config
│
├── data/                            # Mock & Seed Data
│   ├── tenders.json
│   ├── vendors.json
│   ├── officers.json
│   └── [other mock data]
│
├── styles/                          # Global Styles (optional)
│   └── [additional styles]
│
├── middleware.ts                    # Next.js middleware
├── tsconfig.json                    # TypeScript config
├── next.config.mjs                  # Next.js config
├── tailwind.config.ts               # Tailwind config
└── .eslintrc.json                   # ESLint config

```

## Key Principles

### 1. **Import Paths**
All imports use the `@/` alias for cleaner, consistent imports:
```typescript
// ✅ Good
import { Button } from "@/components/ui/button"
import { getTenders } from "@/lib/store/tenderStore"
import type { Tender } from "@/types/tender"

// ❌ Avoid
import Button from "../../../components/ui/button"
import getTenders from "../../lib/store/tenderStore"
```

### 2. **Component Organization**
- **Common**: Reusable across entire app (Navbar, Footer, Auth)
- **Features**: Organized by domain (tender, bid, kyc, admin)
- **UI**: Shadcn components for consistent design system

### 3. **Type Safety**
- Centralized type definitions in `src/types/`
- Split by domain when large (tender.ts, bid.ts, user.ts)
- Index.ts for common/shared types
- Re-export from index for convenient access

### 4. **State Management**
- Global state in `src/lib/store/`
- Currently using React Context (tenderStore.ts)
- Easily upgradable to Redux/Zustand if needed

### 5. **Routing**
- Use Next.js 14 App Router with layout groups
- Organize by feature/role: (auth), (public), (officer), (vendor)
- Dynamic routes use [param] syntax

### 6. **API Routes**
- All server routes in `src/app/api/`
- Organize by resource: `/api/tenders/`, `/api/bids/`, etc.

## File Naming Conventions

| Type | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `TenderCard.tsx` |
| Hooks | camelCase with `use` prefix | `useTenderStore.ts` |
| Utils | camelCase | `formatPrice.ts` |
| Types | PascalCase (interfaces) | `Tender.ts`, `index.ts` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Pages | Same as route | `page.tsx` in route folder |

## Import/Export Patterns

### Component Export
```typescript
// components/ui/button.tsx
export function Button({ ... }) { ... }

// components/common/Navbar.tsx
export default function Navbar() { ... }
```

### Index File Re-exports
```typescript
// lib/store/index.ts
export { tenderStore, useTenderStore } from "./tenderStore"
export { setBids, setTenders } from "./actions"

// types/index.ts
export type { Tender, Bid, Officer } from "./tender"
export type { User } from "./user"
```

## Migration Checklist

- [ ] Move common components to `components/common/`
- [ ] Organize feature components in `components/features/`
- [ ] Create badge/badge components subfolder
- [ ] Move tenderStore to `lib/store/`
- [ ] Update all imports to use `@/` alias
- [ ] Consolidate types in `src/types/`
- [ ] Create hooks folder with custom hooks
- [ ] Organize routes with layout groups
- [ ] Add API client utilities
- [ ] Create constants file
- [ ] Run TypeScript compiler check
- [ ] Run ESLint and fix issues
- [ ] Build project successfully

## Git Workflow

```bash
# Create feature branch for reorganization
git checkout -b refactor/project-structure

# Make changes, commit with clear messages
git add .
git commit -m "refactor: reorganize components by feature"

# Create PR for review
git push origin refactor/project-structure
```

## Build & Test

```bash
# Type checking
npm run type-check

# Linting
npm run lint

# Building
npm run build

# Development
npm run dev
```

---

**Last Updated**: 2026-05-27
**Status**: Professional Structure Implementation
