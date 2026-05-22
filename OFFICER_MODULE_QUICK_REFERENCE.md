# Officer Module - Quick Reference & Code Examples

## Quick Setup for Testing

### Test Officer Login
**Email**: `anita.deshmukh@gov.in`  
**Password**: `Any password` (mocked)  
**OTP**: `Any 6 digits` (simulated, required after clicking "Send OTP")  
**CAPTCHA**: `5X8N2`  
**Or**: Click "Login with DSC" button to skip 2FA (simulated DSC token detection)

**After Login**: Redirects to `/admin` dashboard

### Test Officer Registration
1. Go to `/register`
2. Click "Government Officer" tab
3. Fill 4-step form:
   - **Step 1**: Personal details (Aadhaar, PAN, phone - click verify buttons)
   - **Step 2**: Official details (email, designation, ministry, role type)
   - **Step 3**: Documents (click upload areas to simulate IPFS upload)
   - **Step 4**: Review and submit
4. **Result**: Success screen with Officer ID (OFC-2026-MP-XXXXX)

### Test Tender Creation
1. Login as Officer
2. Click "Create New Tender" button
3. Follow 5-step wizard:
   - Step 1: Basic details
   - Step 2: Bid specifications
   - Step 3: Budget & timeline
   - Step 4: Eligibility criteria
   - Step 5: Evaluation weights (must total 100%)
4. Click "Publish on Blockchain"
5. BlockchainTxModal will animate 3 phases, then redirect to dashboard with success toast

### Test Vendor KYC Management
1. Login as Officer
2. Click "Vendor Management" in sidebar
3. See KYC Queue tab with pending vendors
4. Click "Approve" or "Reject" on any vendor
5. All Vendors tab: Search, filter by KYC Level/MSME/State

---

## Code Examples

### Using AuthProvider & Checking Role

```typescript
import { useAuth } from "@/components/AuthProvider"

export function MyComponent() {
  const { user, login, logout } = useAuth()
  
  if (user?.role === "officer") {
    return <AdminDashboard />
  }
  
  return <PublicPage />
}
```

### RoleGuard Protection

```typescript
import { RoleGuard } from "@/components/RoleGuard"

export default function AdminPage() {
  return (
    <RoleGuard requiredRole="officer">
      <div>Only officers can see this</div>
    </RoleGuard>
  )
}
```

### BidCountdown Component

```typescript
import { BidCountdown } from "@/components/BidCountdown"

const deadline = "2026-05-25T18:00:00Z"

export function BidSection() {
  return (
    <div>
      <h3>Bid Submission Deadline</h3>
      <BidCountdown 
        deadline={deadline}
        onExpired={() => console.log("Bids are closed")}
      />
    </div>
  )
}
```

### WeightSlider for Evaluation

```typescript
import { WeightSlider } from "@/components/WeightSlider"
import { useMemo } from "react"

export function EvaluationWeights() {
  const [weights, setWeights] = useState({
    price: 40,
    financial: 15,
    experience: 15,
    performance: 10,
    technical: 10,
    compliance: 5,
    proposal: 5,
  })
  
  const total = useMemo(
    () => Object.values(weights).reduce((a, b) => a + b, 0),
    [weights]
  )
  
  const isValid = total === 100
  
  return (
    <div>
      {Object.entries(weights).map(([key, value]) => (
        <WeightSlider
          key={key}
          label={key}
          value={value}
          onChange={(newValue) => 
            setWeights(w => ({...w, [key]: newValue}))
          }
        />
      ))}
      <p className={isValid ? "text-green-600" : "text-red-600"}>
        Total: {total}% {isValid ? "✓" : "(must be 100%)"}
      </p>
    </div>
  )
}
```

### Using BlockchainTxModal

```typescript
import { BlockchainTxModal } from "@/components/BlockchainTxModal"
import { useState } from "react"

export function PublishTender() {
  const [modalOpen, setModalOpen] = useState(false)
  
  const handlePublish = async () => {
    setModalOpen(true)
    // Modal will auto-advance through 3 phases
    // Simulates: Broadcasting → Confirming → Confirmed
  }
  
  const handleConfirmed = () => {
    setModalOpen(false)
    router.push("/admin?published=1")
  }
  
  return (
    <>
      <Button onClick={handlePublish}>
        Publish Tender
      </Button>
      
      <BlockchainTxModal
        open={modalOpen}
        onConfirmed={handleConfirmed}
      />
    </>
  )
}
```

### Using SystemHealthPanel

```typescript
import { SystemHealthPanel } from "@/components/SystemHealthPanel"

export function Dashboard() {
  return (
    <div className="space-y-6">
      <h2>System Status</h2>
      <SystemHealthPanel />
    </div>
  )
}
```

### Using IPFSHashPill

```typescript
import { IPFSHashPill } from "@/components/IPFSHashPill"

export function DocumentList() {
  const documents = [
    { name: "Authorization Letter", hash: "QmApexIncorp001" },
    { name: "Sanction Authority", hash: "QmApexGST002" },
  ]
  
  return (
    <div>
      {documents.map(doc => (
        <div key={doc.hash}>
          <span>{doc.name}</span>
          <IPFSHashPill hash={doc.hash} />
        </div>
      ))}
    </div>
  )
}
```

### Using KYCStatusBadge

```typescript
import { KYCStatusBadge } from "@/components/KYCStatusBadge"

const vendor = {
  name: "Apex Infra Solutions",
  kycLevel: "under-review"
}

export function VendorRow() {
  return (
    <div>
      <span>{vendor.name}</span>
      <KYCStatusBadge status={vendor.kycLevel} />
    </div>
  )
}
```

### Using AuditTimeline

```typescript
import { AuditTimeline } from "@/components/AuditTimeline"

const events = [
  {
    type: "Created",
    label: "Tender published to blockchain",
    timestamp: "2026-05-13T05:30:00Z",
    txHash: "0x91aa1dd8ee9dfe44bc4c770011223344556677889900aabbccddeeff00112233",
  },
  {
    type: "Bid",
    label: "Bid submission received",
    timestamp: "2026-05-14T12:05:00Z",
    txHash: "0x33cc3ff90011ab66bb6e990011223344556677889900aabbccddeeff00116677",
  },
]

export function TenderAudit() {
  return <AuditTimeline events={events} />
}
```

### Using EncryptedBidBadge

```typescript
import { EncryptedBidBadge } from "@/components/EncryptedBidBadge"

export function BidRow({ bid }) {
  return (
    <tr>
      <td>{bid.bidder}</td>
      <td>
        {bid.encrypted ? (
          <EncryptedBidBadge />
        ) : (
          <span>₹{bid.price.toLocaleString("en-IN")}</span>
        )}
      </td>
    </tr>
  )
}
```

### Using WinnerBanner

```typescript
import { WinnerBanner } from "@/components/WinnerBanner"

const winner = {
  name: "BuildTech Enterprises",
  walletAddress: "0x41b2d3e4f5a6c7d8e9f00112233445566778899a",
  score: 87.5,
  bidAmount: 1980000000
}

export function AwardSection() {
  return (
    <div>
      <h2>Tender Awarded</h2>
      <WinnerBanner
        winnerName={winner.name}
        walletAddress={winner.walletAddress}
        score={winner.score}
        bidAmount={winner.bidAmount}
      />
    </div>
  )
}
```

---

## Navigation Patterns

### Redirect Based on Role

```typescript
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/AuthProvider"

export function LoginPage() {
  const { login } = useAuth()
  const router = useRouter()
  
  const handleLogin = async (credentials) => {
    const user = await authenticate(credentials)
    login(user)
    
    // Redirect based on role
    router.push(user.role === "officer" ? "/admin" : "/vendor")
  }
}
```

### Handle Unauthorized Access

```typescript
// In /login page:
const searchParams = useSearchParams()
const isUnauthorized = searchParams.get("unauthorized") === "true"

if (isUnauthorized) {
  return (
    <div className="text-red-600">
      Access denied. You do not have permission to access this page.
    </div>
  )
}
```

### Navigate from Sidebar

```typescript
// In OfficerSidebar component:
const handleNavClick = () => {
  onNavigate?.()  // Close mobile menu
  setIsOpen(false) // Close sidebar
  // Link handles navigation
}
```

---

## Data Fetching Patterns

### Reading Mock Data

```typescript
import officersData from "@/data/officers.json"
import ministries from "@/data/ministries.json"
import systemHealthData from "@/data/systemHealth.json"

// Use directly in components
const officer = officersData[0]
const ministryList = ministries.map(m => ({ id: m.id, label: m.name }))
const blockchainStatus = systemHealthData.blockchain.status
```

### Filtering Mock Data

```typescript
import kycQueueData from "@/data/kycQueue.json"

const [queueItems, setQueueItems] = useState(kycQueueData)

const pendingOnly = queueItems.filter(v => v.kycLevel === "pending")
const byDaysWaiting = queueItems.sort((a, b) => b.daysWaiting - a.daysWaiting)
```

### Modifying Mock State (Optimistic Update)

```typescript
const handleApproveKYC = (vendorId) => {
  // Optimistic update (real app would wait for API)
  setVendors(prev =>
    prev.map(v =>
      v.id === vendorId ? {...v, kycStatus: "approved"} : v
    )
  )
  
  // In real app:
  // await api.post(`/kyc/${vendorId}/approve`)
}
```

---

## Responsive Design Patterns

### Sidebar on Mobile

```typescript
// In OfficerSidebar:
<aside className="fixed md:relative md:translate-x-0 transform transition-transform">
  {/* Mobile: overlay sidebar, close on navigate */}
  {/* Desktop: always visible sidebar */}
</aside>

// In AdminLayout:
<div className="flex h-screen">
  <OfficerSidebar />
  {/* On mobile, sidebar overlays; on desktop, sidebar is fixed left */}
  <main className="flex-1 overflow-y-auto">
    {children}
  </main>
</div>
```

### Responsive Grid

```typescript
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  {/* 1 col on mobile, 2 on tablet, 4 on desktop */}
</div>
```

### Responsive Table

```typescript
<div className="overflow-x-auto">
  <table className="w-full">
    {/* Horizontal scroll on mobile, normal on desktop */}
  </table>
</div>
```

---

## Form Patterns

### Multi-Step Form

```typescript
const [step, setStep] = useState(1)
const [formData, setFormData] = useState({})

const handleNext = () => {
  if (validateStep(step)) {
    setStep(s => s + 1)
  }
}

const handleSubmit = async () => {
  const result = await api.post("/register/officer", formData)
  setSuccess(true)
}

// Render different form based on step:
{step === 1 && <PersonalDetails onChange={setFormData} />}
{step === 2 && <OfficialDetails onChange={setFormData} />}
```

### Controlled Input with Validation

```typescript
const [email, setEmail] = useState("")
const [errors, setErrors] = useState({})

const validateEmail = (value) => {
  if (!value.includes("@")) {
    setErrors(e => ({...e, email: "Invalid email"}))
  } else {
    setErrors(e => ({...e, email: ""}))
  }
}

return (
  <div>
    <Input
      value={email}
      onChange={(e) => {
        setEmail(e.target.value)
        validateEmail(e.target.value)
      }}
    />
    {errors.email && <span className="text-red-600">{errors.email}</span>}
  </div>
)
```

---

## State Management Patterns

### Context for Auth

```typescript
// In useAuth:
const [user, setUser] = useState<AuthUser | null>(null)

// Persist to localStorage:
useEffect(() => {
  if (user) {
    localStorage.setItem("tenderchain-auth-user", JSON.stringify(user))
  }
}, [user])

// Initialize from localStorage:
useEffect(() => {
  const stored = localStorage.getItem("tenderchain-auth-user")
  if (stored) setUser(JSON.parse(stored))
}, [])
```

### Lifting State Up for Weights

```typescript
// Parent controls all 7 weights
const [weights, setWeights] = useState({...})

// Pass setter to child
<WeightSlider
  value={weights.price}
  onChange={(v) => setWeights(w => ({...w, price: v}))}
/>
```

---

## Common Mistakes to Avoid

### ❌ DON'T: Forget RoleGuard
```typescript
// WRONG - No protection
export default function AdminPage() {
  return <div>Admin content</div>
}

// RIGHT - Protected with RoleGuard
export default function AdminPage() {
  return (
    <RoleGuard requiredRole="officer">
      <div>Admin content</div>
    </RoleGuard>
  )
}
```

### ❌ DON'T: Use state for localStorage
```typescript
// WRONG - State out of sync with storage
const [user, setUser] = useState(null)
localStorage.setItem("user", JSON.stringify(user))

// RIGHT - Sync state with storage in useEffect
const [user, setUser] = useState(null)
useEffect(() => {
  localStorage.setItem("tenderchain-auth-user", JSON.stringify(user))
}, [user])
```

### ❌ DON'T: Forget validation
```typescript
// WRONG - No weight validation
<Button onClick={publish}>Publish</Button>

// RIGHT - Disable if weights not 100%
<Button onClick={publish} disabled={totalWeight !== 100}>
  Publish
</Button>
```

### ❌ DON'T: Hardcode data
```typescript
// WRONG
const officers = [
  { id: "1", name: "John" },
  { id: "2", name: "Jane" }
]

// RIGHT
import officersData from "@/data/officers.json"
const officers = officersData
```

---

## Testing Checklist

- [ ] Officer registration (4 steps) completes successfully
- [ ] Officer login with OTP requirement works
- [ ] DSC login alternate works
- [ ] RoleGuard redirects non-officers to /login
- [ ] Dashboard loads with correct stats
- [ ] System health panel displays all 4 indicators
- [ ] KYC queue shows pending vendors
- [ ] Can approve/reject vendors
- [ ] Tender creation wizard validates weights
- [ ] Tender publish triggers BlockchainTxModal
- [ ] Bid countdown timer works and turns red after 24h
- [ ] Tender evaluation calculates weighted scores
- [ ] Winner declaration works with confetti
- [ ] Audit trail shows all events
- [ ] Sidebar collapses on mobile
- [ ] All IPFSHashPills are clickable and copy-able
- [ ] All redirects work (login → /admin, unauthorized → /login?unauthorized=true)

---

## Performance Tips

1. **Component Splitting**: Each page is its own async component for code splitting
2. **Image Optimization**: Use Next.js Image component (not added yet, ready for)
3. **Memoization**: Use useMemo for expensive calculations (weights total, filtered lists)
4. **Pagination**: Add pagination to large tables (KYC queue, all vendors, tenders)
5. **Lazy Loading**: Tables and lists use window.scroll detection (ready for)

---

**Last Updated**: 2026-05-22  
**Framework**: Next.js 14 App Router with TypeScript
