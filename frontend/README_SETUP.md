# TenderChain Frontend - Project Setup & Architecture Guide

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- npm or yarn
- Git

### Installation

```bash
# Clone the repository
git clone <repo-url>
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local

# Run development server
npm run dev

# Open http://localhost:3000
```

## 📁 Project Structure

### Root Configuration Files
```
frontend/
├── package.json              # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── next.config.mjs          # Next.js configuration  
├── tailwind.config.ts       # Tailwind CSS configuration
├── postcss.config.mjs       # PostCSS configuration
├── .eslintrc.json          # ESLint rules
├── .gitignore              # Git ignore patterns
└── STRUCTURE.md            # Architecture documentation
```

### Source Code
```
src/
├── app/                     # Next.js 14 App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles
│   ├── (auth)/
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   └── verify/page.tsx
│   ├── (public)/
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── how-it-works/page.tsx
│   │   └── layout.tsx
│   ├── admin/              # Officer/Admin Portal
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── tenders.tsx
│   │   ├── officers-profile.tsx
│   │   ├── vendors/page.tsx
│   │   ├── profile/page.tsx
│   │   └── tender/
│   │       ├── create/page.tsx
│   │       └── [id]/page.tsx
│   ├── vendor/             # Vendor Portal
│   │   ├── page.tsx
│   │   ├── layout.tsx
│   │   ├── profile/page.tsx
│   │   ├── notifications/page.tsx
│   │   └── dispute/[tenderId]/page.tsx
│   ├── tenders/
│   │   ├── page.tsx        # All tenders list
│   │   ├── [id]/page.tsx   # Tender details
│   │   └── [id]/bid/page.tsx
│   ├── api/
│   │   └── live-news/route.ts
│   ├── dashboard/page.tsx
│   ├── notifications/page.tsx
│   ├── dispute/[tenderId]/page.tsx
│   ├── ledger/page.tsx
│   ├── public-analytics/page.tsx
│   ├── ministry-performance-analytics/page.tsx
│   ├── vendor-performance-tracking/page.tsx
│   └── vendor-portal-information/page.tsx
│
├── components/              # React Components
│   ├── ui/                 # Shadcn UI Components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   ├── tabs.tsx
│   │   ├── badge.tsx
│   │   ├── textarea.tsx
│   │   ├── toast.tsx
│   │   ├── table.tsx
│   │   ├── separator.tsx
│   │   ├── dropdown-menu.tsx
│   │   ├── avatar.tsx
│   │   └── progress.tsx
│   ├── Navbar.tsx          # Navigation bar
│   ├── Footer.tsx          # Footer
│   ├── AuthProvider.tsx    # Auth context
│   ├── RoleGuard.tsx       # Role-based access
│   ├── CreateTenderModal.tsx
│   ├── BidCountdown.tsx
│   ├── BlockchainTxModal.tsx
│   ├── KYCStatusBadge.tsx
│   ├── KYCStatusStepper.tsx
│   ├── AdminPageContent.tsx
│   ├── OfficerSidebar.tsx
│   ├── SystemHealthPanel.tsx
│   ├── AuditTimeline.tsx
│   ├── EncryptedBidBadge.tsx
│   ├── ImmutableBadge.tsx
│   ├── IPFSHashPill.tsx
│   ├── WinnerBanner.tsx
│   ├── WeightSlider.tsx
│   └── WalletConnectButton.tsx
│
├── lib/                    # Utilities & Helpers
│   ├── tenderStore.tsx    # Global state management
│   ├── useBlockchainTx.ts # Blockchain transaction hook
│   └── utils.ts           # Utility functions
│
├── types/                  # TypeScript Definitions
│   └── index.ts           # All type definitions
│
├── data/                   # Mock Data
│   ├── tenders.json
│   ├── vendors.json
│   ├── officers.json
│   ├── tenderBids.json
│   ├── disputes.json
│   ├── notifications.json
│   ├── auditEvents.json
│   ├── auditEvents.json
│   ├── designations.json
│   ├── ministries.json
│   ├── kycQueue.json
│   ├── blockchain.json
│   └── systemHealth.json
│
└── app/fonts/              # Custom Fonts
    ├── GeistVF.woff
    └── GeistMonoVF.woff
```

## 🔧 Available Scripts

```bash
# Development
npm run dev              # Start dev server (http://localhost:3000)

# Production
npm run build            # Build for production
npm start                # Start production server

# Quality
npm run lint             # Run ESLint

# TypeScript
tsc --noEmit             # Check types (manual)
```

## 🛡️ Type Safety

This project uses **TypeScript in strict mode**:
- All types must be explicitly defined
- No implicit `any` types
- Strict null checking enabled

### Type Definitions Organization

```typescript
// src/types/index.ts - Main type exports
export interface TenderBid { ... }
export interface AuditEvent { ... }
export interface Officer { ... }

// src/lib/tenderStore.tsx - Store-specific types
export interface Tender { ... }
export interface Bid { ... }

// Usage in components
import type { Tender, Bid } from "@/types"
```

## 📦 Dependencies

### Core
- **next** (14.2.35) - React framework
- **react** (18.x) - UI library
- **react-dom** (18.x) - DOM rendering

### UI & Styling
- **tailwindcss** (3.4.1) - Utility-first CSS
- **@radix-ui/**(various) - Headless UI components
- **class-variance-authority** - CSS class utilities
- **clsx** - Conditional class names
- **tailwind-merge** - Merge Tailwind classes

### Features
- **framer-motion** (12.40.0) - Animations
- **lucide-react** - Icon library
- **recharts** (3.8.1) - Data visualization
- **sonner** - Toast notifications

### Development
- **typescript** (5.x) - Type checking
- **eslint** (8.x) - Linting
- **tailwindcss** - CSS framework
- **postcss** - CSS transformation

## 🔄 State Management

### Global State: Tender Store

Located in `src/lib/tenderStore.tsx`, provides:

```typescript
// Getters
getTenders()              // Get all tenders
getTender(id)             // Get single tender
getBids(tenderId)         // Get bids for tender
getCurrentRole()          // Get user role (officer/vendor)
getOfficerInfo()          // Get officer details
getVendorInfo()           // Get vendor details

// Setters
setCurrentRole(role)      // Switch user role
createTender(data)        // Create new tender
submitBid(tenderId, data) // Submit bid
declareWinner(...)        // Declare winner

// Context
TenderStoreProvider       // Wrap app with provider
useTenderStore()          // Use in components

// Subscriptions
subscribe(listener)       // Subscribe to changes
```

### Usage in Components

```typescript
"use client"

import { useTenderStore } from "@/lib/tenderStore"

export function MyComponent() {
  const { tenders, role, vendorCompanyName } = useTenderStore()
  
  return <div>...</div>
}
```

## 🎨 Styling

### Tailwind CSS
- Configured in `tailwind.config.ts`
- Custom colors, fonts, and spacing
- Responsive design with breakpoints
- Dark mode support (configurable)

### shadcn/ui Components
Accessible, unstyled components from `@radix-ui`:
- Dropdown menus
- Dialogs/Modals
- Form inputs
- Tabs
- Notifications
- Tables
- And more...

## 🔐 Environment Variables

Create `.env.local`:

```env
# Blockchain
NEXT_PUBLIC_BLOCKCHAIN_NETWORK=ethereum
NEXT_PUBLIC_CONTRACT_ADDRESS=0x...
NEXT_PUBLIC_RPC_URL=http://localhost:8545

# IPFS
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud
NEXT_PUBLIC_IPFS_API=http://localhost:5001

# API
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## 📝 Naming Conventions

| Item | Convention | Example |
|------|-----------|---------|
| Components | PascalCase | `TenderCard.tsx` |
| Hooks | camelCase with `use` | `useTenderStore.ts` |
| Utilities | camelCase | `formatPrice.ts` |
| Types | PascalCase | `Tender`, `Bid` |
| Constants | UPPER_SNAKE_CASE | `API_BASE_URL` |
| Files | Match export name | `button.tsx` for Button |
| Folders | kebab-case or lowercase | `tender-bid/` |

## 🚦 Code Quality

### ESLint
```bash
npm run lint              # Check all files
npm run lint --fix        # Auto-fix issues
```

### TypeScript
```bash
npm run build             # Type check during build
```

### Best Practices
- ✅ Use functional components
- ✅ Use hooks for state/effects
- ✅ Mark client components with "use client"
- ✅ Keep components small and focused
- ✅ Use TypeScript for all new code
- ✅ Add proper error boundaries
- ✅ Handle loading and error states

## 🔌 Component Patterns

### Client Component
```typescript
"use client"

import { useState, useEffect } from "react"

export default function MyComponent() {
  const [data, setData] = useState(null)
  
  useEffect(() => {
    // Fetch or setup
  }, [])
  
  return <div>...</div>
}
```

### With Custom Hook
```typescript
"use client"

import { useTenderStore } from "@/lib/tenderStore"

export function TenderList() {
  const { tenders } = useTenderStore()
  
  return (
    <div>
      {tenders.map(tender => (
        <TenderCard key={tender.id} tender={tender} />
      ))}
    </div>
  )
}
```

### With Types
```typescript
import type { Tender } from "@/types"
import { Card } from "@/components/ui/card"

interface TenderCardProps {
  tender: Tender
  onClick?: (id: string) => void
}

export function TenderCard({ tender, onClick }: TenderCardProps) {
  return (
    <Card onClick={() => onClick?.(tender.id)}>
      <h3>{tender.tenderTitle}</h3>
      {/* ... */}
    </Card>
  )
}
```

## 📚 Useful Resources

- [Next.js 14 Documentation](https://nextjs.org/docs)
- [React 18 Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [shadcn/ui Components](https://ui.shadcn.com)
- [Framer Motion](https://www.framer.com/motion/)

## 🐛 Troubleshooting

### Port already in use
```bash
# Use different port
npm run dev -- -p 3001
```

### Build errors
```bash
# Clear cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Build again
npm run build
```

### TypeScript errors
```bash
# Check types
npx tsc --noEmit

# Update types
npm install --save-dev @types/node @types/react
```

## 🤝 Contributing

1. Create feature branch: `git checkout -b feature/xyz`
2. Make changes following conventions
3. Run linter: `npm run lint --fix`
4. Build project: `npm run build`
5. Commit with clear message
6. Push and create PR

## 📄 License

This project is part of the TenderChain blockchain platform.

---

**Last Updated**: 2026-05-27
**Project**: TenderChain E-Tender Platform
**Version**: 1.0.0
