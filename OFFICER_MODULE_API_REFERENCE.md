# Officer Module - Component & API Reference

## File Structure

### Auth & Context
```
/src/components/
  ├── AuthProvider.tsx
  │   ├── AuthContext<AuthContextValue>
  │   ├── AuthUser type with officer fields
  │   ├── localStorage key: "tenderchain-auth-user"
  │   └── Hooks: useAuth()
  │
  └── RoleGuard.tsx
      ├── Props: requiredRole: "vendor" | "officer", children
      └── Behavior: Redirect if role mismatch
```

### Navigation & Layout
```
/src/components/
  ├── OfficerSidebar.tsx
  │   ├── Props: onNavigate?: () => void
  │   ├── Sidebar links (9 items)
  │   ├── Mobile hamburger menu
  │   ├── Logout functionality
  │   └── Officer info display (name, email, designation)
  │
/src/app/admin/
  └── layout.tsx
      ├── RoleGuard wrapper
      ├── OfficerSidebar component
      └── Main content area (flex-1 overflow-y-auto)
```

### Dashboard Components
```
/src/components/
  ├── SystemHealthPanel.tsx
  │   ├── Props: none (reads systemHealthData directly)
  │   └── Displays 4 health indicators:
  │       - blockchain: status, latency, blockHeight, network
  │       - ipfs: status, latency, gateway, uptime
  │       - database: status, latency, operational, queryCount
  │       - smartContract: status, address, verified, etherscanUrl
  │
/src/app/admin/
  └── page.tsx (Dashboard)
      ├── Stats cards (4 columns)
      ├── System health grid
      ├── KYC queue preview
      ├── Recent tenders table
      └── Create new tender CTA
```

### Tender Creation
```
/src/components/
  ├── WeightSlider.tsx
  │   ├── Props: label, value, onChange, min?, max?
  │   ├── Controlled component (lift state up)
  │   └── Validates 0-100 range
  │
  ├── BlockchainTxModal.tsx
  │   ├── Props: open: boolean, onConfirmed: () => void
  │   ├── Phase 1: "Broadcasting" spinner (1.5s)
  │   ├── Phase 2: "Confirming" progress bar (2s)
  │   └── Phase 3: "Confirmed" checkmark + txHash
  │
/src/app/admin/tender/
  └── create/page.tsx
      ├── Step 1: Basic Details
      │   └── NIT No, Title, Type, Category, Dept, Description, Cost, Urgency
      ├── Step 2: Specifications
      │   └── Bid Covers, Documents, Two-Stage toggle, Bid Type, Evaluation Method
      ├── Step 3: Budget & Deadline
      │   └── EMD, Performance Security, Liquidated Damages
      ├── Step 4: Eligibility
      │   └── Turnover, Experience, Certifications, MSME Quota
      ├── Step 5: Evaluation Weights
      │   └── 7 WeightSliders (Price, Financial, Experience, Performance, Technical, Compliance, Proposal)
      ├── Step 6: Document Upload (IPFS)
      ├── Step 7: Review & Publish (with DSC e-sign)
      └── Success: Redirect to /admin?published=1
```

### Tender Management
```
/src/components/
  ├── BidCountdown.tsx
  │   ├── Props: deadline: string, onExpired?: () => void
  │   ├── Display: DD:HH:MM:SS
  │   ├── Colors: blue (normal) → amber (48h-) → red (24h-)
  │   └── After expiry: "Bid Submission Closed" gray
  │
  ├── EncryptedBidBadge.tsx
  │   ├── Props: none (visual component)
  │   └── Shows: Lock icon + "Encrypted" + tooltip
  │
  ├── AuditTimeline.tsx
  │   ├── Props: events: AuditEvent[]
  │   ├── Event type: { type, label, timestamp, txHash, data }
  │   └── Vertical timeline with alternating left/right on desktop
  │
  ├── WinnerBanner.tsx
  │   ├── Props: winnerName, walletAddress, score, bidAmount
  │   ├── Visual: Gold crown icon + confetti animation
  │   └── Shows: Company name, total score, bid amount
  │
/src/app/admin/tender/
  └── [id]/page.tsx (Tender Detail)
      ├── Header: NIT No, Title, Status badge, Cost, EMD, Countdown
      ├── Tabs:
      │   ├── Bids: encrypted toggle, wallet, submitted at, IPFS hash
      │   ├── Evaluation: score inputs (7 fields), total score calc, winner declaration
      │   ├── Audit Trail: AuditTimeline component with all events
      │   ├── Tender Info: read-only fields, corrigendum button
      │   └── Disputes: dispute table, resolution form
      └── BlockchainTxModal on publish/resolve
```

### Vendor Management
```
/src/components/
  ├── IPFSHashPill.tsx
  │   ├── Props: hash: string, label?: string
  │   ├── Display: "Qm...xyz" (first 8 + "..." + last 6)
  │   ├── Copy button
  │   └── External link to ipfs.io
  │
  ├── KYCStatusBadge.tsx
  │   ├── Props: status: "pending" | "under-review" | "approved" | "rejected" | "suspended"
  │   └── Colors: amber (pending) → blue (under-review) → green (approved) → red (rejected)
  │
/src/app/admin/
  └── vendors/page.tsx (Vendor Management)
      ├── Tab 1: KYC Queue
      │   ├── Filter: All / Pending / Under Review
      │   ├── Table: Company Name | Org Type | KYC Level | Submitted Date | Days Waiting | Actions
      │   ├── Actions: Review (slide-over) | Approve | Reject
      │   └── Slide-over: Shows all vendor details + documents as IPFSHashPills
      ├── Tab 2: All Vendors
      │   ├── Search: company name / wallet / GSTIN
      │   ├── Filters: KYC Level, MSME, State, Industry
      │   ├── Table: Company | GSTIN | Wallet | KYC Badge | MSME Badge | Registered Date | Bids | Won | Actions
      │   └── Actions: View Profile | Blacklist
      └── Tab 3: Blacklisted (ready for implementation)
```

### Registration Forms
```
/src/app/register/
  ├── page.tsx (Main registration page)
  │   ├── Tabs: Vendor | Officer
  │   ├── Step counter (4 steps for both)
  │   └── Delegates to VendorForm or OfficerForm
  │
  ├── vendor-form.tsx (VendorForm component)
  │   ├── Step 1: Company Details (company name, PAN, GSTIN, CIN)
  │   ├── Step 2: Contact & Address (authorized person, email, mobile, address)
  │   ├── Step 3: e-KYC & Document Upload (drag-drop PDF upload)
  │   └── Step 4: Review & Submit (read-only summary, checkbox, submit button)
  │
  └── officer-form.tsx (OfficerForm component)
      ├── Step 1: Personal & Identity (name, Aadhaar OTP, PAN, DOB, mobile OTP, password)
      ├── Step 2: Official Details (email, emp ID, designation, org type, ministry, org name, office unit, address, role type)
      ├── Step 3: Documents Upload (authorization letter, sanction proof, DSC toggle, gov ID - all IPFS)
      └── Step 4: Review & Submit (read-only summary, integrity checkbox, submit button)
```

### Login
```
/src/app/
  └── login/page.tsx
      ├── Tabs: Vendor | Officer
      ├── Vendor login: Email | Password | CAPTCHA | DigiLocker button
      ├── Officer login: Email | Password | Mobile OTP (2FA) | CAPTCHA | DSC Login button
      ├── Forgot password: Email → OTP verification → password reset
      └── On success: Redirect to /admin (officer) or /vendor (vendor)
```

---

## Data Structures

### AuthUser (Enhanced)
```typescript
interface AuthUser {
  id: string                          // "officer-001"
  name: string                        // "Anita Deshmukh"
  email: string                       // "anita.deshmukh@gov.in"
  role: "vendor" | "officer"
  
  // Officer-specific fields
  department?: string                 // "Public Works Department"
  designation?: string                // "Procurement Officer"
  ministry?: string                   // "Ministry of Road Transport and Highways"
  orgName?: string                    // "Public Works Department, Government of India"
  walletAddress?: string              // "0x41b2d3e4f5a6c7d8e9f00112233445566778899a"
  dscStatus?: "connected" | "not_connected"
}
```

### Officer Profile (officers.json structure)
```typescript
interface Officer {
  id: string
  name: string
  email: string
  role: "officer"
  mobile: string
  aadhaar: string
  pan: string
  dob: string
  department: string
  ministry: string
  designation: string
  employeeId: string
  orgType: string
  orgName: string
  officeUnit: string
  state: string
  city: string
  pin: string
  address: string
  roleType: string
  kycStatus: "approved"
  walletAddress: string
  dscStatus: "connected" | "not_connected"
  dscToken: string
  createdAt: string
  tendersCreated: number
  activeBids: number
  totalProcurementValue: number
}
```

### SystemHealth (systemHealth.json structure)
```typescript
interface SystemHealth {
  blockchain: {
    status: "green" | "yellow" | "red"
    latency: number                    // ms
    blockHeight: number
    network: "Sepolia"
    lastBlock: string                  // ISO timestamp
  }
  ipfs: {
    status: "green" | "yellow" | "red"
    latency: number
    gateway: string                    // "pinata"
    uptime: number                     // percentage
  }
  database: {
    status: "green" | "yellow" | "red"
    latency: number
    operational: boolean
    queryCount: number
  }
  smartContract: {
    status: "green" | "yellow" | "red"
    address: string
    verified: boolean
    etherscanUrl: string
  }
}
```

### Tender Bid (tenderBids.json structure)
```typescript
interface TenderBid {
  id?: string
  bidderId: string
  companyName?: string
  walletAddress: string
  submittedAt: string
  encrypted: boolean
  price: number
  deadlinePassed?: boolean
  disqualified?: boolean
  disqualifyReason?: string
  scores: {
    price: number              // 0-100
    financial: number
    experience: number
    performance: number
    technical: number
    compliance: number
    proposal: number
  }
  totalScore?: number          // calculated weighted total
}
```

### Audit Event (auditEvents.json structure)
```typescript
interface AuditEvent {
  type: "Created" | "Document" | "Bid" | "Awarded" | ...
  label: string
  timestamp: string
  txHash: string
  data?: Record<string, unknown>
}
```

### Dispute (disputes.json structure)
```typescript
interface Dispute {
  id: string
  tenderId: string
  tenderTitle: string
  claimantId: string
  claimantName: string
  reason: string
  evidenceIPFSHash: string
  submittedAt: string
  status: "open" | "under-review" | "resolved"
  resolutionText?: string
  resolutionIPFSHash?: string
  resolvedAt?: string
}
```

---

## Backend Integration Points

### Authentication API
```
POST /api/auth/register/officer
  Request: {
    name, email, mobile, aadhaar, pan, dob,
    designation, ministry, orgName, roleType,
    documents: { authLetter, sanctionProof, govId }
  }
  Response: { officerId, status: "pending_verification" }

POST /api/auth/login
  Request: { email, password, otp (if officer), captchaToken }
  Response: { user: AuthUser, token: JWT }

POST /api/auth/request-otp
  Request: { email, type: "login" | "password_reset" }
  Response: { otpId, message }

POST /api/auth/verify-otp
  Request: { otpId, code, email }
  Response: { verified: boolean }

POST /api/auth/dsc/verify
  Request: { dscToken }
  Response: { user: AuthUser, token: JWT }
```

### Tender API
```
POST /api/tenders
  Request: { TenderCreationPayload with all 7 steps }
  Response: { tenderId, txHash, status: "published" | "draft" }

GET /api/tenders/:id
  Response: { Tender with all details }

PUT /api/tenders/:id/publish
  Request: { dscSignature }
  Response: { tenderId, txHash, status: "published" }

POST /api/tenders/:id/corrigendum
  Request: { document: File, changes: string }
  Response: { corrigendumId, txHash }
```

### Bid API
```
GET /api/tenders/:id/bids
  Response: [TenderBid]

POST /api/tenders/:id/evaluation
  Request: { scores: Record<bidderId, ScoreMap> }
  Response: { evaluationId, txHash }

POST /api/tenders/:id/declare-winner
  Request: { winnerId, txHash }
  Response: { awardId, txHash, status: "awarded" }
```

### KYC API
```
GET /api/kyc/queue
  Response: [QueueVendor]

POST /api/kyc/:vendorId/approve
  Request: { kycLevel: 2 | 3 }
  Response: { vendorId, kycStatus: "approved", txHash }

POST /api/kyc/:vendorId/reject
  Request: { reason: string }
  Response: { vendorId, kycStatus: "rejected", txHash }
```

### Dispute API
```
GET /api/disputes/:tenderId
  Response: [Dispute]

POST /api/disputes/:id/resolve
  Request: { resolution: string, document: File }
  Response: { disputeId, status: "resolved", txHash }
```

### IPFS API
```
POST /api/ipfs/upload
  Request: { file: File }
  Response: { ipfsHash: string, gateway: string }

GET /api/ipfs/:hash
  Response: { file content }
```

---

## Component Props Reference

### OfficerSidebar
```typescript
interface OfficerSidebarProps {
  onNavigate?: () => void
}
```

### RoleGuard
```typescript
interface RoleGuardProps {
  requiredRole: "vendor" | "officer"
  children: React.ReactNode
}
```

### BidCountdown
```typescript
interface BidCountdownProps {
  deadline: string              // ISO date string
  onExpired?: () => void
}
```

### WeightSlider
```typescript
interface WeightSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  min?: number
  max?: number
}
```

### SystemHealthPanel
```typescript
interface SystemHealthPanelProps {
  // No props - reads from systemHealthData JSON
}
```

### IPFSHashPill
```typescript
interface IPFSHashPillProps {
  hash: string                  // Full IPFS hash
  label?: string               // Optional label
}
```

### KYCStatusBadge
```typescript
interface KYCStatusBadgeProps {
  status: "pending" | "under-review" | "approved" | "rejected" | "suspended"
}
```

### AuditTimeline
```typescript
interface AuditTimelineProps {
  events: AuditEvent[]
}
```

### BlockchainTxModal
```typescript
interface BlockchainTxModalProps {
  open: boolean
  onConfirmed: () => void
  txHash?: string              // Optional final hash
}
```

### WinnerBanner
```typescript
interface WinnerBannerProps {
  winnerName: string
  walletAddress: string
  score: number
  bidAmount: number
}
```

---

## Routing Map

### Public Routes (No Guard)
```
/                              Homepage
/tenders                       Tender list
/tenders/[id]                 Tender detail
/ledger                        Transparency ledger
/how-it-works                 How it works page
/about                        About page
/contact                      Contact page
```

### Unauthenticated Routes (Auto-redirect if logged in)
```
/register                      Registration page (tabs: vendor, officer)
/login                         Login page (tabs: vendor, officer)
```

### Officer-Protected Routes (RoleGuard: officer)
```
/admin                         Officer dashboard
/admin/tender/create           Tender creation wizard
/admin/tender/[id]            Tender management
/admin/vendors                Vendor KYC management
/admin/tenders                My tenders list
/admin/bids                   Bid evaluation
/admin/disputes               Dispute management
/admin/reports                Reports & analytics
/admin/profile                Officer settings
/admin/notifications          Notifications
```

### Vendor-Protected Routes (RoleGuard: vendor)
```
/vendor                        Vendor dashboard
/vendor/...                    Other vendor routes
```

---

## CSS/Tailwind Classes Used

### Key Utility Classes
```
bg-[#0B3D91]           Navy blue (primary)
bg-[#FF9933]           Saffron (accent)
bg-[#138808]           Emerald green (success)
text-[#0B3D91]         Navy text
border-[#0B3D91]       Navy border

Fixed Layout:
h-screen overflow-hidden       Full screen with hidden overflow
flex h-screen                  Flexbox full height
flex-1 overflow-y-auto        Flex grow with scrollable content

Responsive:
md:grid md:grid-cols-2        2 columns on tablet+
lg:grid-cols-4                4 columns on desktop
hidden md:block                Hidden on mobile, visible on tablet+
w-64 fixed                     Fixed 240px sidebar

Animations:
animate-in fade-in            Fade in animation
animate-pulse                 Pulsing animation
transition-all duration-300    Smooth transition
```

---

## Future Enhancements

1. **Placeholder Pages**: Implement /admin/bids, /admin/disputes, /admin/reports, /admin/profile, /admin/notifications
2. **Real Authentication**: Connect to backend JWT/OAuth
3. **Blockchain Integration**: Replace simulation with real Sepolia transactions
4. **IPFS Integration**: Replace mock hashing with real Pinata or IPFS gateway API
5. **Email Service**: Real OTP and notification emails
6. **File Storage**: Real file upload with virus scanning
7. **Database**: Replace JSON mocks with PostgreSQL/DynamoDB
8. **WebSocket**: Real-time bid updates and notifications
9. **Analytics**: Real charts using Recharts with live data
10. **Mobile App**: React Native version using same components

---

**Document Version**: 1.0  
**Last Updated**: 2026-05-22  
**Framework**: Next.js 14 App Router + TypeScript + Tailwind CSS
