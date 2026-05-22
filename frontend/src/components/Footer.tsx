import Link from "next/link"
import { Shield } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-[#0B3D91] text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Shield className="h-8 w-8 text-white" />
              <div>
                <span className="block font-poppins text-lg font-bold leading-tight">
                  TenderChain
                </span>
                <span className="block text-[10px] uppercase tracking-wider text-blue-200">
                  Government of India
                </span>
              </div>
            </Link>
            <p className="text-sm text-blue-100">
              India&apos;s first blockchain-powered tendering platform ensuring transparency, immutability, and trust in public procurement.
            </p>
          </div>

          <div>
            <h4 className="mb-4 font-poppins font-semibold text-[#FF9933]">Quick Links</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><Link href="/" className="hover:text-white hover:underline">Home</Link></li>
              <li><Link href="/tenders" className="hover:text-white hover:underline">Live Tenders</Link></li>
              <li><Link href="/ledger" className="hover:text-white hover:underline">Transparency Ledger</Link></li>
              <li><Link href="/about" className="hover:text-white hover:underline">About Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-poppins font-semibold text-[#FF9933]">For Vendors</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li><Link href="/register" className="hover:text-white hover:underline">Register as Vendor</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white hover:underline">How It Works</Link></li>
              <li><Link href="/login" className="hover:text-white hover:underline">Vendor Login</Link></li>
              <li><Link href="#" className="hover:text-white hover:underline">e-KYC Process</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 font-poppins font-semibold text-[#FF9933]">Contact & Support</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>Helpdesk: 1800-111-2222</li>
              <li>Email: support@tenderchain.gov.in</li>
              <li><Link href="/contact" className="hover:text-white hover:underline">Grievance Redressal</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between border-t border-blue-800 pt-8 text-xs text-blue-200 md:flex-row">
          <div className="mb-4 flex space-x-6 md:mb-0">
            <span className="font-semibold text-white">Supported By:</span>
            <span>Digital India</span>
            <span>MeitY</span>
            <span>NIC</span>
          </div>
          <div className="text-center md:text-right">
            <p>&copy; {new Date().getFullYear()} TenderChain, Government of India. All rights reserved.</p>
            <p className="mt-1">Designed for transparency.</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
