# TenderChain Prompt TODO

## Status Snapshot
- Existing core app pages, admin dashboard, vendor dashboard, auth, and many data/components already exist in `frontend/src/`.
- The prompt requires focused updates to specific files only, plus new public/vendor/admin pages and JSON data alignment.
- Strict constraints: keep existing vendor dashboard, admin dashboard, and public pages intact unless the prompt explicitly says to update them.

## Phase 1 - Data Layer
- [ ] Align `frontend/src/data/officers.json` to the prompt schema with 3 officers.
- [ ] Align `frontend/src/data/kycQueue.json` to the prompt schema with 10 vendor KYC entries.
- [ ] Align `frontend/src/data/tenderBids.json` to 4 tenders with deadline passed / not passed behavior.
- [ ] Align `frontend/src/data/auditEvents.json` to 2 tenders with lifecycle events.
- [ ] Align `frontend/src/data/disputes.json` to 3 disputes with open / under-review / resolved states.
- [ ] Align `frontend/src/data/notifications.json` to 12 notifications split between vendor and officer roles.
- [ ] Extend `frontend/src/data/tenders.json` with prompt fields such as `nitNo`, `emrAmount`, `bidOpeningDate`, `ipfsDocuments`, `evaluationWeights`, `corrigendums`, and `winnerDeclaredAt`.

## Phase 2 - Shared Components
- [ ] Ensure `frontend/src/components/IPFSHashPill.tsx` matches the prompt props and UI behavior.
- [ ] Ensure `frontend/src/components/BlockchainTxModal.tsx` matches the prompt phases and callbacks.
- [ ] Ensure `frontend/src/components/WinnerBanner.tsx` matches the prompt props, confetti, and action button.
- [ ] Ensure `frontend/src/components/AuditTimeline.tsx` matches the prompt event types and layout.
- [ ] Ensure `frontend/src/components/BidCountdown.tsx` matches the prompt deadline states.
- [ ] Ensure `frontend/src/components/KYCStatusBadge.tsx` matches the prompt status variants.
- [ ] Ensure `frontend/src/components/EncryptedBidBadge.tsx` matches the prompt tooltip and styling.
- [ ] Ensure `frontend/src/components/WeightSlider.tsx` matches the prompt label/value/bar behavior.
- [ ] Ensure all listed components export both named and default exports.
- [ ] Add or confirm `frontend/src/hooks/useBlockchainTx.ts`.

## Phase 3 - Auth Flows
- [ ] Update `frontend/src/app/login/page.tsx` for officer OTP, CAPTCHA, DSC flow, forgot-password flow, and error states.
- [ ] Update `frontend/src/app/register/page.tsx` to add the officer registration wizard while preserving the vendor flow.

## Phase 4 - Vendor Pages
- [x] Create or update `frontend/src/app/vendor/profile/page.tsx` for KYC profile and document vault.
- [x] Create `frontend/src/app/vendor/notifications/page.tsx` for vendor notification center.
- [x] Create `frontend/src/app/vendor/dispute/[tenderId]/page.tsx` for dispute submission and status tracking.

## Phase 5 - Public Verification
- [ ] Create `frontend/src/app/verify/page.tsx` for blockchain verification.
- [ ] Add `frontend/src/app/loading.tsx` skeleton UI.
- [ ] Add `frontend/src/app/not-found.tsx` 404 UI.

## Phase 6 - Tender Detail Enhancements
- [ ] Update `frontend/src/app/tenders/[id]/page.tsx` with documents, evaluation criteria, audit trail, scorecard, and dispute CTA.

## Phase 7 - Admin Workflows
- [ ] Update `frontend/src/app/admin/page.tsx` with create tender CTA, sparkline stats, KYC confirmation modals, sidebar links, and table columns.
- [ ] Create `frontend/src/app/admin/tender/create/page.tsx` as a 7-step wizard.
- [ ] Create or update `frontend/src/app/admin/tender/[id]/page.tsx` as the tender management page.
- [ ] Create or update `frontend/src/app/admin/vendors/page.tsx` as the vendor management page.
- [x] Create `frontend/src/app/admin/profile/page.tsx` for officer profile.
- [ ] Create placeholder pages for admin navigation targets if needed: evaluation, disputes, reports, notifications.

## Phase 9 - Portal Reference Route Parity
- [x] Create `frontend/src/app/public-analytics/page.tsx`.
- [x] Create `frontend/src/app/ministry-performance-analytics/page.tsx`.
- [x] Create `frontend/src/app/vendor-performance-tracking/page.tsx`.
- [x] Create `frontend/src/app/vendor-portal-information/page.tsx`.
- [x] Update public navigation links to expose new portal routes without duplicating existing dashboard logic.

## Phase 8 - Validation
- [ ] Run TypeScript / build validation after each major slice.
- [ ] Remove any remaining `any` usage where the prompt expects strict TypeScript.
- [ ] Confirm all prompt-required routes render without touching unrelated pages.

## Notes
- If a requested page already exists, update only the parts the prompt explicitly asks for.
- If a prompt requirement conflicts with current workspace structure, prefer the existing routing structure and keep changes minimal.
