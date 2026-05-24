"use client"

import Link from "next/link"
import { Shield, Menu, Globe } from "lucide-react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()
  
  // Hide navbar on admin and vendor routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/vendor')) {
    return null
  }
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Top Strip */}
      <div className="bg-[#0B3D91] px-4 py-1.5 text-xs text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>Government of India | Ministry of Electronics & IT</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-white/20 pr-4">
              <button className="hover:text-[#FF9933]">A-</button>
              <button className="font-medium hover:text-[#FF9933]">A</button>
              <button className="text-sm hover:text-[#FF9933]">A+</button>
            </div>
            <div className="flex items-center space-x-1 cursor-pointer hover:text-[#FF9933]">
              <Globe className="h-3 w-3" />
              <span>English / हिंदी</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-[#0B3D91]" />
          <div>
            <span className="block font-poppins text-lg font-bold leading-tight text-[#0B3D91]">
              TenderChain
            </span>
            <span className="block text-[10px] uppercase tracking-wider text-gray-500">
              National Blockchain Ledger
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center space-x-6 md:flex">
          <Link href="/" className="text-sm font-medium text-gray-700 hover:text-[#0B3D91]">
            Home
          </Link>
          <Link href="/tenders" className="text-sm font-medium text-gray-700 hover:text-[#0B3D91]">
            Tenders
          </Link>
          <Link href="/public-analytics" className="text-sm font-medium text-gray-700 hover:text-[#0B3D91]">
            Public Analytics
          </Link>
          <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-[#0B3D91]">
            How It Works
          </Link>
          <Link href="/ledger" className="text-sm font-medium text-gray-700 hover:text-[#0B3D91]">
            Transparency Ledger
          </Link>
          <Link href="/about" className="text-sm font-medium text-gray-700 hover:text-[#0B3D91]">
            About
          </Link>
        </nav>

        {/* Actions */}
        <div className="hidden items-center space-x-4 md:flex">
          <Link href="/login">
            <Button variant="ghost" className="font-semibold">
              Login
            </Button>
          </Link>
          <Link href="/register">
            <Button className="bg-[#0B3D91] hover:bg-[#0B3D91]/90 font-semibold shadow-sm">
              Register 
            </Button>
          </Link>
        </div>

        {/* Mobile menu button */}
        <button className="block md:hidden">
          <Menu className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </header>
  )
}
