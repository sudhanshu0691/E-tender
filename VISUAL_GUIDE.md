# 🎉 OFFICER MODULE - COMPLETE VISUAL GUIDE

## User Journey Map

```
┌─────────────────────────────────────────────────────────────────┐
│                    TENDERCHAIN PORTAL                           │
│                   (Public Home Page)                             │
└──────────────────────────┬──────────────────────────────────────┘
                           │
                ┌──────────┴──────────┐
                │                     │
           ┌────▼────┐          ┌────▼────┐
           │ REGISTER │          │  LOGIN   │
           └────┬────┘          └────┬────┘
                │                     │
        ┌───────┴────────┐       ┌────┴────────────┐
        │                │       │                 │
    ┌───▼──┐        ┌───▼──┐    │              ┌──▼──┐
    │VENDOR│        │OFFICER│   └──────────────► │ROLE?│
    └───┬──┘        └───┬──┘    LOGIN SUCCESS   └─────┘
        │                │
    ┌───▼──────┐     ┌───▼─────────────┐
    │4-STEP    │     │4-STEP           │
    │REGISTRATION   │REGISTRATION      │
    │(Company)│     │(Identity+Docs)   │
    │         │     │                  │
    │1. Details    │1. Identity        │
    │2. Address    │2. Official        │
    │3. e-KYC      │3. Documents       │
    │4. Review     │4. Review          │
    │         │     │                  │
    └───┬──────┘     └───┬─────────────┘
        │                │
    ┌───▼────────┐   ┌───▼──────────┐
    │SUCCESS ID  │   │SUCCESS ID    │
    │VEND-2026   │   │OFC-2026-MP   │
    └────────────┘   └───┬──────────┘
                         │
                    ┌────▼────────────────────────────┐
                    │   OFFICER PORTAL (/admin)       │
                    │                                 │
                    │  SIDEBAR            MAIN CONTENT│
                    │  ────────           ────────────│
                    │  📊 Dashboard       Welcome Card │
                    │  ➕ Create          Stat Cards   │
                    │  📄 My Tenders      Health Panel │
                    │  👥 Vendors         KYC Queue    │
                    │  ⚖️  Bid Eval       Recent List  │
                    │  ⚠️  Disputes                    │
                    │  📊 Reports                     │
                    │  👤 Profile                     │
                    │  🔔 Notifications (3)           │
                    │                                 │
                    │  [Logout Button]                │
                    └────┬──────────────────────────┬─┘
                         │                          │
                    ┌────▼─────────┐       ┌───────▼────┐
                    │Sidebar Links  │       │Query Params│
                    │Direct Routes  │       │?page=X     │
                    └────┬────────┬─┘       └───────┬────┘
                         │        │               │
        ┌────────────┬───┴─┴──┬───┴─────┬────┬───┴──┐
        │            │        │         │    │      │
    ┌───▼───┐  ┌────▼────┐ ┌─▼──┐  ┌──▼──┐ │   ┌──▼────┐
    │Create │  │Manage   │ │Vend│  │Eval │ │   │Report │
    │Tender │  │Tenders  │ │ors │  │Bids │ │   │s      │
    │Wizard │  │Search   │ │Tab:│  │Tab: │ │   │       │
    │       │  │List     │ │KYC │  │Scor │ │   │Analyt │
    │5-Steps│  │         │ │All │  │es   │ │   │ics    │
    │       │  │Link→[id]│ │BL  │  │     │ │   │       │
    └───┬───┘  └────┬────┘ └─┬──┘  └──┬──┘ │   └──┬────┘
        │           │        │        │    │      │
    ┌───▼─────┐ ┌──▼──────┐ │   ┌───▼───┐ │  ┌──▼─────┐
    │[id]/page│ │NIT #    │ │   │Dispute│ │  │Officer │
    │         │ │Title    │ │   │Manag. │ │  │Profile │
    │5 TABS:  │ │Status   │ │   │       │ │  │        │
    │1.Bids   │ │Cost     │ │   └───────┘ │  │Info +  │
    │2.Eval   │ │EMD      │ │            │  │Edit    │
    │3.Audit  │ │Deadline │ │            │  └────┬───┘
    │4.Info   │ │         │ │            │       │
    │5.Dispute│ │⏱Count↓  │ │            │  ┌────▼────┐
    │         │ │Tabs:[B] │ │            │  │Notif    │
    └─────────┘ │[E][A][I]│ │            │  │List(5)  │
                │[D]      │ │            │  │         │
                └─────────┘ │            │  └─────────┘
                            │            │
                        ┌───▼────────────▼──┐
                        │ LOGOUT → /login   │
                        └───────────────────┘
```

---

## State Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                    AuthContext (Global)                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │  user: {                                                  │  │
│  │    id: "officer-001"                                      │  │
│  │    name: "Anita Deshmukh"                                 │  │
│  │    email: "anita.deshmukh@gov.in"                         │  │
│  │    role: "officer"                                        │  │
│  │    designation: "Procurement Officer"                     │  │
│  │    ministry: "Ministry of Road Transport..."             │  │
│  │    orgName: "Public Works Department"                     │  │
│  │    walletAddress: "0x41b2d3e4f5a6c7d8e9f..."            │  │
│  │    dscStatus: "connected"                                 │  │
│  │  }                                                        │  │
│  │  Stored in: localStorage['tenderchain-auth-user']        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│              URL & Query Parameter State                         │
│  ┌───────────────────────────────────────────────────────────┐  │
│  │ Navigation:                                               │  │
│  │ /admin                    → Main Dashboard                │  │
│  │ /admin?page=tenders       → My Tenders List               │  │
│  │ /admin?page=bids          → Bid Evaluation                │  │
│  │ /admin?page=disputes      → Dispute Management            │  │
│  │ /admin?page=reports       → Reports & Analytics           │  │
│  │ /admin?page=profile       → Officer Profile               │  │
│  │ /admin?page=notifications → Notifications List            │  │
│  │ /admin/vendors            → Vendor Management             │  │
│  │ /admin/tender/create      → Create Tender Wizard          │  │
│  │ /admin/tender/[id]        → Manage Tender (5 tabs)        │  │
│  │ /register                 → Registration (Vendor|Officer) │  │
│  │ /login                    → Login (Vendor|Officer)        │  │
│  └───────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Component Hierarchy

```
                           ┌─────────────┐
                           │ RootLayout  │
                           └──────┬──────┘
                                  │
                      ┌───────────┴──────────────┐
                      │                          │
                 ┌────▼─────┐          ┌────────▼────────┐
                 │RegisterPage        │LoginPage        │
                 │           │        │                 │
                 │ Tabs:     │        │ Tabs:           │
                 │Vendor|Offi│        │Vendor|Officer   │
                 │           │        │                 │
                 │┌─────┐┌──┐│        │                 │
                 ││Vendor ││Offi││        │ Mobile OTP 2FA  │
                 ││Form  ││Form││        │ DSC Login       │
                 │└─────┘└──┘│        │ Password Reset  │
                 └───────────┘        └─────────────────┘
                                            │
                                    ┌───────▼────────┐
                                    │AdminLayout     │
                                    │                │
                            ┌───────┴────────────┐   │
                            │                    │   │
                        ┌───▼─────┐      ┌──────▼────┐
                        │OfficerSide      │Main Content
                        │bar              │
                        │                 │
                        │ ┌─────────────┐ │
                        │ │AdminPage    │ │
                        │ │             │ │
                        │ │┌───────────┐│ │
                        │ ││AdminPage  ││ │
                        │ ││Content    ││ │
                        │ ││(6 pages)  ││ │
                        │ │└─────┬─────┘│ │
                        │ └─────┬───────┘ │
                        │       │         │
                ┌──────┬──┴─────┴────┬────┴───┬─────┐
                │      │            │        │     │
            ┌───▼──┐ ┌──▼──┐ ┌─────▼───┐ ┌─▼──┐ ┌▼─┐
            │My    │ │Eval │ │Dispute  │ │Offi│ │Not
            │Tenders    │Bids │ │Manage   │ │Profile  │ifi
            │    │ │    │ │            │ │ │ │cat
            │Search │ │Score│ │Resolution │ │Edit │ │ions
            └──────┘ └─────┘ └────────────┘ └────┘ └───┘

                            ┌─────────────┐
                            │Create Tender│
                            │Page (Wizard)│
                            │             │
                        ┌───┴────────────┐│
                        │5-Step Wizard   ││
                        │                ││
                        │1-Basic         ││
                        │2-Bid Structure ││
                        │3-Financial     ││
                        │4-Dates         ││
                        │5-Review        ││
                        │                ││
                        │BlockchainTxMod││
                        └────────────────┘│
                                         │
                            ┌────────────▼────┐
                            │Tender [id] Page │
                            │                 │
                        ┌───┴─────────────────┐
                        │5 Tabs:              │
                        │ 1. Bids (Encrypted) │
                        │ 2. Evaluation       │
                        │ 3. Audit Trail      │
                        │ 4. Tender Info      │
                        │ 5. Disputes         │
                        │                     │
                        │Components:         │
                        │ - BidCountdown      │
                        │ - WeightSlider      │
                        │ - WinnerBanner      │
                        │ - AuditTimeline     │
                        └─────────────────────┘

                            ┌──────────────────┐
                            │Vendor Management │
                            │(/admin/vendors)  │
                            │                  │
                        ┌───┴──────────────────┐
                        │3 Tabs:               │
                        │ 1. KYC Queue         │
                        │ 2. All Vendors       │
                        │ 3. Blacklist         │
                        │                      │
                        │Components:          │
                        │ - KYCStatusBadge     │
                        │ - IPFSHashPill       │
                        │ - Search/Filter      │
                        └──────────────────────┘
```

---

## Data Flow

```
┌──────────────┐
│  User Action │
└──────┬───────┘
       │
       │ (Click Create Tender)
       ▼
┌─────────────────────────────────┐
│ AdminPage                        │
│ useSearchParams() → ?page=null   │
│ Render main dashboard            │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ User clicks "Create New Tender"  │
│ Link → /admin/tender/create      │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ TenderCreatePage (5-step wizard) │
│                                 │
│ Step 1: Basic Details           │
│ (inputs → state)                │
│ ↓                               │
│ Step 2: Bid Structure           │
│ WeightSlider components         │
│ Total validation (=100%)        │
│ ↓                               │
│ Step 3: Financial               │
│ EMD Type selection              │
│ ↓                               │
│ Step 4: Dates                   │
│ Timeline preview                │
│ ↓                               │
│ Step 5: Review                  │
│ Read-only summary               │
│ BlockchainTxModal trigger       │
│                                 │
└──────────────┬──────────────────┘
               │
               ▼ (Publish clicked)
┌─────────────────────────────────┐
│ BlockchainTxModal (3 phases)    │
│                                 │
│ Phase 1: Broadcasting (1.5s)    │
│ "Sending to Ethereum..."        │
│ ↓                               │
│ Phase 2: Confirming (2s)        │
│ Progress bar                    │
│ ↓                               │
│ Phase 3: Confirmed              │
│ Green checkmark                 │
│ Show txHash                     │
│ "View on Etherscan" link        │
│                                 │
└──────────────┬──────────────────┘
               │
               ▼
┌─────────────────────────────────┐
│ Success Toast                   │
│ "Tender published"              │
│ Redirect to /admin?published=1  │
└─────────────────────────────────┘
```

---

## Component Props Flow

```
OfficerSidebar.tsx
│
├─ Props: { onNavigate?: () => void }
├─ State: { isOpen: boolean }
├─ Hooks: usePathname(), useAuth(), useRouter()
│
└─ Renders:
   └─ NavItems[]
      └─ Link
         └─ href: "/admin?page=X"

AdminPageContent.tsx
│
├─ Props: { page?: string }
├─ Logic: switch(page)
│
├─ Case "tenders":
│  ├─ State: { searchQuery: string }
│  ├─ Filter: tenders.filter(...)
│  └─ Render: List + Search
│
├─ Case "bids":
│  └─ Render: Instructions
│
├─ Case "disputes":
│  └─ Render: Empty state
│
├─ Case "reports":
│  └─ Render: Placeholder
│
├─ Case "profile":
│  └─ Render: Officer info
│
└─ Case "notifications":
   └─ Render: Notification list

BidCountdown.tsx
│
├─ Props: { 
│   deadline: string | number,
│   onExpired?: () => void 
│ }
├─ State: { 
│   timeLeft: string,
│   color: "blue" | "amber" | "red"
│ }
├─ Effect: setInterval (1000ms)
│
└─ Render: "DD:HH:MM:SS"

WeightSlider.tsx (×7 in tender creation)
│
├─ Props: {
│   label: string,
│   value: number,
│   onChange: (val: number) => void,
│   min?: number,
│   max?: number
│ }
├─ NO internal state (controlled)
│
└─ Parent (TenderCreatePage):
   ├─ State: { 
   │   price: 40,
   │   financial: 15,
   │   experience: 15,
   │   performance: 10,
   │   technical: 10,
   │   compliance: 5,
   │   proposal: 5
   │ }
   ├─ Calc: total = sum of all weights
   ├─ Validate: total === 100 (enable Next)
   │
   └─ Render: 7× WeightSlider
```

---

## Route Protection Flow

```
User navigates to /admin
│
├─ Check: user exists?
│  ├─ NO → Redirect to /login
│  └─ YES → Check role
│
├─ Check: user.role === "officer"?
│  ├─ NO → Redirect to /login?unauthorized=true
│  │      (Shows red banner)
│  └─ YES → Continue to /admin
│
├─ RoleGuard Wrapper:
│  ├─ if (requiredRole === "officer" && user.role !== "officer")
│  │  └─ Redirect to /login?unauthorized=true
│  │
│  └─ if (requiredRole === "officer" && user.role === "officer")
│     └─ Render children
│
└─ Render: AdminLayout → OfficerSidebar + Main Content
```

---

## Mobile Responsiveness

```
DESKTOP (md+)                          MOBILE (< md)
┌──────────────────────────┐          ┌───────────┐
│ SIDEBAR (fixed 240px)    │ CONTENT  │ ☰ Button  │
│                          │ AREA     │           │
│ Dashboard               │ (flex-1) │ Main      │
│ Create Tender           │ overflow │ Content   │
│ My Tenders              │ auto     │           │
│ Vendor Mgmt             │          │           │
│ Bid Eval                │          │           │
│ Dispute Mgmt            │          │ [When ☰   │
│ Reports                 │          │  clicked] │
│ Officer Profile         │          │           │
│ Notifications (3)       │          │ ┌────────┐│
│ [Logout]                │          │ │SIDEBAR  ││
└──────────────────────────┘          │ │(overlay)││
                                      │ │Dark bg  ││
                                      │ └────────┘│
                                      └───────────┘

Breakpoints:
- Mobile: 0px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

Sidebar:
- Desktop: position: relative (part of flex)
- Mobile: position: fixed (overlay)
- Close on nav click or overlay click
```

---

**All diagrams show the complete flow of the Officer Module implementation.**
