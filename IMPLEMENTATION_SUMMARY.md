# TenderChain - Frontend Implementation Summary

This document outlines everything that has been implemented in the **TenderChain Blockchain Portal** frontend so far, with a specific focus on what is functional, clickable, and working.

## 1. Global Components
- **Navbar**: Fully responsive. Navigation links to `Home`, `Tenders`, `Ledger`, `How It Works`, `About`, and `Contact` are clickable and working. "Login" and "Register" buttons route correctly.
- **Footer**: Contains clickable quick links to all internal pages.

## 2. Implemented Pages & Clickable Actions

### 🟢 Homepage (`/`)
- **Hero Section**: "Explore Tenders" button links to `/tenders`. "Register as Vendor" button links to `/register`.
- **Live Network Stats**: Visual layout mimicking real-time blockchain stats.
- **Features Grid**: Explains core blockchain features with Lucide icons.

### 🟢 Live Tenders (`/tenders`)
- **Tender List**: Renders a list of active and past tenders from mock JSON data.
- **Clickable Actions**:
  - **"View Details"**: Clicking on any tender button routes to the dynamic Tender Detail page (`/tenders/[id]`).
  - **"Verify Hash"**: Clicking this routes to the Transparency Ledger (`/ledger?search=[hash]`).

### 🟢 Tender Detail View (`/tenders/[id]`)
- **Dynamic Routing**: Correctly pulls specific tender data based on the URL ID.
- **Clickable Actions**:
  - **"Submit Bid"**: Functional button that redirects the user to the Vendor Dashboard (`/dashboard`) simulating a bid submission workflow.
  - **"View on Blockchain"**: Links directly to the ledger to verify the specific tender's smart contract transaction.
  - **"Back to Tenders"**: Clickable breadcrumb navigation.

### 🟢 Vendor Dashboard (`/dashboard`)
The dashboard is a fully interactive, multi-tab interface.
- **Sidebar Navigation**: Fully clickable. Clicking switches the active view dynamically without page reloads.
- **Tabs Implemented**:
  1. **Overview**: Displays interactive `Recharts` (Bar Chart for Bidding Activity, Pie Chart for Success Rate). 
     - *Clickable*: Tender IDs in the "Recent Bids" table route to the respective Tender Detail page.
  2. **My Bids**: 
     - *Clickable*: Tender IDs route to the Tender Detail page.
  3. **Won Contracts**:
     - *Clickable*: Tender IDs route to the Tender Detail page. Progress bars are visually implemented.
  4. **Wallet & EMD**: Displays wallet balances and transaction history.
     - *Visual*: "Add Funds" and "Withdraw" (Custom Blue) buttons are styled and interactable.
  5. **Analytics**: Contains an interactive `Recharts` Line Chart tracking win rates.
  6. **Settings**: Forms to manage company profile, DSC updates, and 2FA settings.

### 🟢 Transparency Ledger (`/ledger`)
- **Live Feed Mockup**: Shows recent blocks and a transaction table.
- **Clickable Actions**: Search bar is present (visual mockup) to query Tx Hashes. 

### 🟢 Vendor Registration (`/register`)
- **Multi-Step Form**: Visual implementation of a 4-step wizard (Company Details, Address, e-KYC Upload, Summary).
- **Clickable Actions**: Users can click through "Next Step" to progress through the form until the final "Generate Vendor Hash ID" success screen.

### 🟢 Login Portal (`/login`)
- **Role Selection**: Interactive tab selector for Vendor, Government Officer, Auditor, and Citizen.
- **Clickable Actions**: "Register Here" text routes to the `/register` page.

### 🟢 Informational Pages
- **How It Works (`/how-it-works`)**: Detailed visual storytelling of the cryptographic bidding process.
- **About (`/about`)**: Mission and vision of TenderChain.
- **Contact (`/contact`)**: Helpdesk and grievance redressal form layout.

## 3. Tech Stack & Styling
- **Routing**: Next.js 14 App Router used for all navigation.
- **Styling**: Tailwind CSS with standard Government of India color palette (Navy Blue `#0B3D91`, Saffron `#FF9933`, Emerald Green `#138808`).
- **Icons**: Lucide-React.
- **Charts**: Recharts used for all dashboard analytics.
- **Data**: Handled entirely through local JSON mock files (`/src/data`) for frontend-only execution.

## 4. Pending / Not Working Features (Backend & Blockchain Dependencies)

Since the current build is **Frontend-Only**, the following features are visual mockups and do not have functional business logic behind them yet:

### 🔴 Blockchain & Smart Contracts
- **Wallet Connection**: The UI suggests wallet interactions (e.g., MetaMask signatures), but no Web3 provider is actually connected.
- **Immutability & Hashes**: The Tx Hashes and block numbers shown in the Ledger and Tender Details are static dummy data.
- **Smart Contract Locks**: EMD amounts are not genuinely locked in any Ethereum/Polygon smart contract.

### 🔴 Backend & Database
- **Data Persistence**: Submitting a bid, registering a vendor, or adding funds will update the UI state temporarily, but it won't be saved to a database (PostgreSQL/MongoDB). Refreshing the page resets the state to the local JSON files.
- **Authentication**: There are no actual user sessions. Logging in or registering does not generate a secure JWT or session cookie.
- **e-KYC / DigiLocker**: The integration is purely visual. No real API calls are made to government identity providers.

### 🔴 UI Functionality Gaps
- **Advanced Filtering**: On the `/tenders` page, while the search bar filters titles, checking the sidebar filters (Status, Department, Budget) does not dynamically filter the list yet.
- **File Downloads**: Clicking "Download Agreement" or "Download BoQ" does not trigger actual PDF/file downloads.
- **Payment Gateway**: "Add Funds" and "Withdraw" in the wallet are visual buttons and do not connect to a real fiat payment gateway.
