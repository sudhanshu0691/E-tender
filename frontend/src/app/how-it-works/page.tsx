"use client"

import { FileText, Lock, Blocks, CheckCircle2, ShieldCheck, ChevronRight } from "lucide-react"

export default function HowItWorksPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 rounded-full border border-[#FF9933]/20 bg-[#FF9933]/10 px-3 py-1 text-sm font-medium text-[#FF9933] mb-4">
            <ShieldCheck className="h-4 w-4" />
            <span>Process Documentation</span>
          </div>
          <h1 className="font-poppins text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            How TenderChain Secures Public Procurement
          </h1>
          <p className="text-lg text-gray-600 leading-relaxed">
            Understanding the cryptographic process that ensures 100% transparency, eliminates corruption, and automates fair bid evaluation for the Government of India.
          </p>
        </div>

        <div className="space-y-16">
          {/* Step 1 */}
          <div className="relative">
            <div className="md:flex items-center gap-10">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="aspect-square bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#0B3D91]/5 rounded-bl-full"></div>
                  <FileText className="h-16 w-16 text-[#0B3D91] mb-4 relative z-10" />
                  <h3 className="font-poppins font-bold text-xl relative z-10">Tender Creation</h3>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center text-[#FF9933] font-bold tracking-wider uppercase text-sm mb-2">
                  <span>Phase 01</span>
                  <div className="h-px w-12 bg-[#FF9933]/30 mx-3"></div>
                </div>
                <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-4">Publishing to the Ledger</h2>
                <p className="text-gray-600 mb-4">
                  Government Departments create a new tender specifying the scope of work, eligibility criteria, and deadlines. Once approved by the competent authority, the tender details are hashed (cryptographically signed) and published to the TenderChain blockchain.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-[#138808] mr-2 shrink-0" /> Documents are stored securely with hashes on-chain.</li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-[#138808] mr-2 shrink-0" /> Smart Contract is deployed containing the evaluation rules.</li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-[#138808] mr-2 shrink-0" /> Public transparency ledger begins tracking the tender lifecycle.</li>
                </ul>
              </div>
            </div>
            {/* Connecting Line */}
            <div className="hidden md:block absolute top-[120%] left-1/6 w-0.5 h-16 bg-gradient-to-b from-[#0B3D91] to-transparent z-0"></div>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="md:flex items-center gap-10 flex-row-reverse">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="aspect-square bg-white rounded-2xl border border-gray-200 shadow-lg flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-24 h-24 bg-[#0B3D91]/5 rounded-br-full"></div>
                  <Lock className="h-16 w-16 text-[#0B3D91] mb-4 relative z-10" />
                  <h3 className="font-poppins font-bold text-xl relative z-10">Encrypted Bidding</h3>
                </div>
              </div>
              <div className="md:w-2/3 text-left">
                <div className="flex items-center text-[#FF9933] font-bold tracking-wider uppercase text-sm mb-2">
                  <span>Phase 02</span>
                  <div className="h-px w-12 bg-[#FF9933]/30 mx-3"></div>
                </div>
                <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-4">The Commit-Reveal Scheme</h2>
                <p className="text-gray-600 mb-4">
                  Verified vendors submit their bids. To prevent early bid-peeking or cartel formation, TenderChain uses a cryptographic Commit-Reveal scheme. Bids are submitted heavily encrypted and locked.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-[#138808] mr-2 shrink-0" /> Absolutely no one (not even Govt officials or Admins) can see the bid amount.</li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-[#138808] mr-2 shrink-0" /> A timestamped transaction hash serves as an unforgeable receipt.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="md:flex items-center gap-10">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="aspect-square bg-[#0B3D91] rounded-2xl shadow-lg flex flex-col items-center justify-center p-8 text-center relative overflow-hidden text-white">
                  <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
                  <Blocks className="h-16 w-16 mb-4 relative z-10" />
                  <h3 className="font-poppins font-bold text-xl relative z-10">Smart Evaluation</h3>
                </div>
              </div>
              <div className="md:w-2/3">
                <div className="flex items-center text-[#FF9933] font-bold tracking-wider uppercase text-sm mb-2">
                  <span>Phase 03</span>
                  <div className="h-px w-12 bg-[#FF9933]/30 mx-3"></div>
                </div>
                <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-4">Automated & Unbiased</h2>
                <p className="text-gray-600 mb-4">
                  Once the deadline passes, the Smart Contract automatically triggers the Reveal phase. Vendors provide their decryption keys. The blockchain code executes the evaluation logic without human intervention.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-[#138808] mr-2 shrink-0" /> Evaluates Technical Eligibility strictly based on provided documents.</li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-[#138808] mr-2 shrink-0" /> Ranks Financial Bids automatically to find the L1 (Lowest Bidder).</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="relative">
            <div className="md:flex items-center gap-10 flex-row-reverse">
              <div className="md:w-1/3 mb-6 md:mb-0">
                <div className="aspect-square bg-[#138808]/10 rounded-2xl border border-[#138808]/20 shadow-lg flex flex-col items-center justify-center p-8 text-center relative overflow-hidden">
                  <ShieldCheck className="h-16 w-16 text-[#138808] mb-4 relative z-10" />
                  <h3 className="font-poppins font-bold text-xl text-[#138808] relative z-10">Award & Audit</h3>
                </div>
              </div>
              <div className="md:w-2/3 text-left">
                <div className="flex items-center text-[#FF9933] font-bold tracking-wider uppercase text-sm mb-2">
                  <span>Phase 04</span>
                  <div className="h-px w-12 bg-[#FF9933]/30 mx-3"></div>
                </div>
                <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-4">Immutable Award</h2>
                <p className="text-gray-600 mb-4">
                  The contract is awarded to the eligible L1 bidder. This final decision is permanently etched into the TenderChain ledger.
                </p>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-[#138808] mr-2 shrink-0" /> Full Audit Trail is generated and accessible via the Transparency Ledger.</li>
                  <li className="flex items-start"><CheckCircle2 className="h-5 w-5 text-[#138808] mr-2 shrink-0" /> EMD (Earnest Money Deposit) is automatically refunded to unsuccessful bidders via smart contracts.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-white p-8 rounded-2xl border border-gray-200 shadow-sm text-center">
          <h2 className="font-poppins text-2xl font-bold text-[#0B3D91] mb-4">Ready to participate in transparent procurement?</h2>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="bg-[#0B3D91] hover:bg-[#0B3D91]/90 text-white px-6 py-3 rounded-md font-semibold inline-flex items-center justify-center">
              Register <ChevronRight className="ml-2 h-4 w-4" />
            </button>
            <button className="bg-white border border-[#0B3D91] text-[#0B3D91] hover:bg-gray-50 px-6 py-3 rounded-md font-semibold inline-flex items-center justify-center">
              View Transparency Ledger
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
