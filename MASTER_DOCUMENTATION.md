# TenderChain Portal Master Documentation

This file replaces the separate Markdown notes in the workspace and consolidates the implemented frontend behavior, route map, auth model, data shapes, testing guidance, and known limitations into one document.

## Scope

The frontend currently supports two primary user flows:
- Public portal pages for visitors.
- Protected Officer and Vendor portals with role-based access control.

The implementation is backed by local mock data in `src/data` and is designed to pass Next.js build and lint checks after the recent fixes.

## Public Portal Features

Public pages remain visible before login and include the standard navigation and footer on routes such as `/`, `/register`, `/login`, `/tenders`, `/ledger`, `/how-it-works`, `/about`, and `/contact`.

Implemented public behavior includes:
- Home page hero actions that route to tenders and registration.
- Public tenders listing with links to tender details and ledger verification.
- Tender detail pages that support navigation to vendor workflows.
- Login and registration entry points for both Vendor and Officer roles.
- Informational pages for how it works, about, and contact.

## Navbar and Footer Behavior

Navbar and footer are hidden automatically on protected portal routes so the authenticated experience stays focused.

Visible on public routes:
- `/`
- `/register`
- `/login`
- `/tenders`
- `/about`
- `/contact`
- `/how-it-works`
- `/ledger`

Hidden on protected routes:
- `/admin`
- `/admin?page=*`
- `/admin/tender/*`
- `/admin/vendors`
- `/vendor`
- `/vendor/*`

The hide/show behavior is implemented with `usePathname()` checks in the Navbar and Footer components.

## Authentication and RBAC

Authentication is centralized in `AuthProvider`.

Key behaviors:
- `login()` stores the current user in context and localStorage.
- `logout()` clears the user and removes the persisted session.
- Auth state uses the `tenderchain-auth-user` localStorage key.
- `RoleGuard` protects role-specific areas.

Role behavior:
- Officers are redirected to `/admin`.
- Vendors are redirected to `/vendor`.
- Unauthorized access is handled with a redirect to `/login` and an unauthorized banner when needed.

## Officer Portal Summary

The Officer portal is the most feature-rich part of the admin experience.

Implemented Officer features:
- Role-protected `/admin` routes.
- Responsive officer sidebar with mobile overlay behavior.
- Working logout button tied to the auth context.
- Admin dashboard with statistics, system health, KYC preview, and recent tenders.
- Query-parameter driven subpages under `/admin?page=*`.
- Tender creation wizard.
- Tender management view with bidding, evaluation, audit trail, tender info, and disputes tabs.
- Vendor management with KYC queue, all vendors, and blacklist-ready sections.

### Officer Dashboard

Main dashboard elements include:
- `Total Tenders`
- `Active Bids`
- `Pending KYC`
- `Vendors Registered`
- System health cards for Blockchain, IPFS, Database, and Smart Contract.
- KYC queue preview with approve and reject actions.
- Recent tenders table with manage links.
- Create tender call-to-action.

### Officer Dashboard Subpages

The following pages are rendered through `AdminPageContent` and controlled by `?page=`:
- `?page=tenders`
- `?page=bids`
- `?page=disputes`
- `?page=reports`
- `?page=profile`
- `?page=notifications`

This approach replaced broken nested routes that had caused 404 errors.

### Tender Creation

The tender creation flow is implemented as a multi-step wizard.

Core behavior:
- Step-based data entry.
- Weight validation for scoring criteria.
- Document upload simulation with IPFS-style hashes.
- Blockchain transaction modal for publish flow.
- Success redirect after publish.

### Tender Management

Tender detail pages provide:
- Live countdown to the bid deadline.
- Encrypted bid display before deadline.
- Bid evaluation with weighted scoring.
- Winner declaration flow.
- Audit trail timeline.
- Tender information view.
- Dispute resolution flow.

### Vendor Management

Vendor management includes:
- KYC queue review.
- All vendors search and filter.
- Blacklist-ready structure.
- Vendor detail panels and IPFS document pills.

## Vendor Portal Summary

The Vendor portal is a separate protected experience with its own layout and dashboard.

Implemented Vendor features:
- Protected vendor layout.
- Dashboard tabs for overview, bids, won contracts, wallet/EMD, analytics, and settings.
- Logout button wired to the shared auth context.
- Schema alignment with the tender JSON data.

Vendor logout now works by calling `logout()` and redirecting to `/login`.

## Registration and Login

The public registration and login flows support both roles.

### Registration

Registration is split into two tabs:
- Vendor
- Government Officer

Vendor registration is a multi-step wizard.
Officer registration is a multi-step wizard with identity, official details, document upload, and review sections.

### Login

Login supports role-based behavior:
- Vendor login uses email, password, and CAPTCHA.
- Officer login adds mandatory mobile OTP and DSC login support.
- Forgot password flow is available.
- Successful login redirects by role.

## Route Map

Public routes:
- `/`
- `/tenders`
- `/tenders/[id]`
- `/ledger`
- `/how-it-works`
- `/about`
- `/contact`
- `/register`
- `/login`

Protected officer routes:
- `/admin`
- `/admin?page=tenders`
- `/admin?page=bids`
- `/admin?page=disputes`
- `/admin?page=reports`
- `/admin?page=profile`
- `/admin?page=notifications`
- `/admin/tender/create`
- `/admin/tender/[id]`
- `/admin/vendors`

Protected vendor routes:
- `/vendor`
- `/vendor/*`

## Core Components

Reusable components that form the backbone of the portal:
- `AuthProvider`
- `RoleGuard`
- `OfficerSidebar`
- `AdminPageContent`
- `SystemHealthPanel`
- `WeightSlider`
- `BlockchainTxModal`
- `WinnerBanner`
- `AuditTimeline`
- `BidCountdown`
- `IPFSHashPill`
- `KYCStatusBadge`
- `EncryptedBidBadge`

## Data Files and Schemas

The application uses local mock JSON files in `src/data`.

### Tenders

Common tender fields:
- `id`
- `title`
- `department`
- `budget`
- `deadline`
- `status`
- `category`
- `state`
- `verified`
- `bidsReceived`
- `hash`
- `deadlinePassed`

### System Health

Service-specific health objects:
- Blockchain: `status`, `latency`, `blockHeight`, `network`, `lastBlock`
- IPFS: `status`, `latency`, `gateway`, `uptime`
- Database: `status`, `latency`, `operational`, `queryCount`
- Smart Contract: `status`, `address`, `verified`, `etherscanUrl`

### Officer Profiles

Officer profiles include identity, organization, address, wallet, DSC, and usage stats.

### KYC Queue, Bids, Audit Events, Disputes

Additional mock data supports:
- KYC queue review
- Tender bid evaluation
- Audit trail visualization
- Dispute resolution flows

## Technical Fixes Already Applied

The workspace had several build and lint issues that were resolved:
- Unsafe union property access in admin health data.
- Conditional React hook usage in admin page code.
- Mismatched tender field names against the JSON schema.
- Unused imports and lint violations.
- Logout wiring for Vendor and Officer flows.
- Navbar/footer visibility on protected routes.

## Testing Checklist

Recommended manual validation:
1. Run the frontend.
2. Log in as Officer.
3. Confirm `/admin` loads and sidebar navigation works.
4. Confirm `?page=` subpages render without 404 errors.
5. Test KYC preview actions.
6. Test tender creation and publish flow.
7. Test tender detail tabs and countdown behavior.
8. Log in as Vendor.
9. Confirm vendor dashboard tabs render and logout works.
10. Verify navbar and footer are hidden on protected routes and visible on public routes.

## Known Limitations

The current implementation is still mock-data driven.

Not yet integrated:
- Real backend authentication and sessions.
- Real tender CRUD APIs.
- Real blockchain transactions.
- Real IPFS upload service.
- Real email/OTP delivery.
- Real database persistence.
- Automated E2E coverage.

## Recommended Next Steps

1. Replace local JSON usage with API calls.
2. Add backend endpoints for auth, tenders, KYC, disputes, and health.
3. Integrate real IPFS and blockchain providers.
4. Add Playwright or Cypress coverage for login, logout, RBAC, and tender workflows.
5. Keep the shared auth and role-based routing model as the base architecture.

## Source Documents Consolidated Here

This master file absorbs the content from the following Markdown notes that previously existed in the workspace:
- `IMPLEMENTATION_SUMMARY.md`
- `README.md`
- `DOCUMENTATION_INDEX.md`
- `FINAL_STATUS.md`
- `VISUAL_GUIDE.md`
- `QUICK_REFERENCE.md`
- `OFFICER_MODULE_SUMMARY.md`
- `OFFICER_MODULE_STATUS_FIXED.md`
- `OFFICER_MODULE_QUICK_REFERENCE.md`
- `OFFICER_MODULE_FILE_MANIFEST.md`
- `OFFICER_MODULE_COMPLETE_GUIDE.md`
- `OFFICER_MODULE_API_REFERENCE.md`
- `NAVBAR_CHANGE_SUMMARY.md`
- `NAVBAR_HIDDEN_AFTER_LOGIN.md`
- `frontend/OFFICER_VENDOR_FEATURES.md`
- `frontend/OFFICER_VENDOR_FEATURES_EN.md`
- `frontend/README.md`
