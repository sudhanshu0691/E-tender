"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  FilePlus,
  FileText,
  Users,
  Scale,
  MessageSquareWarning,
  BarChart3,
  UserCog,
  Bell,
  LogOut,
  Menu,
  X,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "./AuthProvider"
import { useRouter } from "next/navigation"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/admin", badge: null },
  { icon: FilePlus, label: "Create Tender", href: "/admin/tender/create", badge: null },
  { icon: FileText, label: "My Tenders", href: "/admin?page=tenders", badge: null },
  { icon: Users, label: "Vendor Management", href: "/admin/vendors", badge: null },
  { icon: Scale, label: "Bid Evaluation", href: "/admin?page=bids", badge: null },
  { icon: MessageSquareWarning, label: "Dispute Management", href: "/admin?page=disputes", badge: null },
  { icon: BarChart3, label: "Reports", href: "/admin?page=reports", badge: null },
  { icon: UserCog, label: "Officer Profile", href: "/admin/profile", badge: null },
  { icon: Bell, label: "Notifications", href: "/admin?page=notifications", badge: 3 },
]

interface OfficerSidebarProps {
  onNavigate?: () => void
}

export function OfficerSidebar({ onNavigate }: OfficerSidebarProps) {
  const pathname = usePathname()
  const { logout, user } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleNavClick = () => {
    onNavigate?.()
    setIsOpen(false)
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed top-4 left-4 z-50 md:hidden bg-white rounded-lg p-2 shadow-md border border-gray-200"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 border-b border-gray-200 bg-white p-4">
          <Link href="/admin" onClick={handleNavClick} className="flex items-center gap-3 hover:opacity-80">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0B3D91] to-[#FF9933] flex items-center justify-center text-white font-bold text-sm">
              TC
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">TenderChain</p>
              <p className="text-xs text-gray-500">Officer Portal</p>
            </div>
          </Link>
        </div>

        {/* Officer Info */}
        {user && user.role === "officer" && (
          <div className="border-b border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Logged in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
            {user.designation && (
              <p className="text-xs text-gray-500 mt-1">{user.designation}</p>
            )}
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors relative group ${
                    isActive
                      ? "bg-[#0B3D91] text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  <Icon className="h-5 w-5 flex-shrink-0" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <span className="inline-flex items-center justify-center h-6 w-6 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              )
            })}
          </div>
        </nav>

        {/* Footer */}
        <div className="sticky bottom-0 border-t border-gray-200 bg-white p-3">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-700 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
