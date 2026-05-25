"use client"

import { useState } from "react"
import Link from "next/link"
import { Shield, Menu, Globe, X, Moon, Sun } from "lucide-react"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [fontSize, setFontSize] = useState<"normal" | "large" | "xlarge">("normal")
  const [lang, setLang] = useState<"en" | "hi">("en")
  const [darkMode, setDarkMode] = useState(false)
  
  // Hide navbar on admin and vendor routes
  if (pathname.startsWith('/admin') || pathname.startsWith('/vendor')) {
    return null
  }

  const handleFontSize = (size: "normal" | "large" | "xlarge") => {
    setFontSize(size)
    const html = document.documentElement
    html.classList.remove("text-sm", "text-base", "text-lg")
    if (size === "normal") html.classList.add("text-base")
    else if (size === "large") html.classList.add("text-lg")
    else html.classList.add("text-xl")
  }

  const toggleLang = () => {
    setLang((prev) => (prev === "en" ? "hi" : "en"))
  }

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev
      if (next) {
        document.documentElement.classList.add("dark")
      } else {
        document.documentElement.classList.remove("dark")
      }
      return next
    })
  }

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/tenders", label: "Tenders" },
    { href: "/public-analytics", label: "Public Analytics" },
    { href: "/how-it-works", label: "How It Works" },
    { href: "/ledger", label: "Transparency Ledger" },
    { href: "/about", label: "About" },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white shadow-sm">
      {/* Top Strip */}
      <div className="bg-[#0B3D91] px-4 py-1.5 text-xs text-white">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <span>Government of India | Ministry of Electronics &amp; IT</span>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 border-r border-white/20 pr-4">
              <button
                onClick={() => handleFontSize("normal")}
                className={`hover:text-[#FF9933] ${fontSize === "normal" ? "text-[#FF9933] font-bold" : ""}`}
              >
                A-
              </button>
              <button
                onClick={() => handleFontSize("large")}
                className={`font-medium hover:text-[#FF9933] ${fontSize === "large" ? "text-[#FF9933] font-bold" : ""}`}
              >
                A
              </button>
              <button
                onClick={() => handleFontSize("xlarge")}
                className={`text-sm hover:text-[#FF9933] ${fontSize === "xlarge" ? "text-[#FF9933] font-bold" : ""}`}
              >
                A+
              </button>
            </div>
            <button
              onClick={toggleLang}
              className="flex items-center space-x-1 cursor-pointer hover:text-[#FF9933]"
            >
              <Globe className="h-3 w-3" />
              <span>{lang === "en" ? "English / हिंदी" : "हिंदी / English"}</span>
            </button>
            <button
              onClick={toggleDarkMode}
              className="flex items-center space-x-1 cursor-pointer hover:text-[#FF9933] border-l border-white/20 pl-4"
            >
              {darkMode ? <Sun className="h-3 w-3" /> : <Moon className="h-3 w-3" />}
              <span>{darkMode ? "Light" : "Dark"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container mx-auto flex h-16 items-center justify-between gap-4 px-4">
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
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                pathname === link.href
                  ? "text-[#0B3D91] font-semibold"
                  : "text-gray-700 hover:text-[#0B3D91]"
              }`}
            >
              {link.label}
            </Link>
          ))}
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
        <button
          className="block md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-gray-700" />
          ) : (
            <Menu className="h-6 w-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-sm font-medium py-2 px-3 rounded-md ${
                  pathname === link.href
                    ? "bg-[#0B3D91]/10 text-[#0B3D91]"
                    : "text-gray-700 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="border-t border-gray-200 pt-3 flex flex-col space-y-2">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="ghost" className="w-full font-semibold">
                  Login
                </Button>
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full bg-[#0B3D91] hover:bg-[#0B3D91]/90 font-semibold shadow-sm">
                  Register
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
