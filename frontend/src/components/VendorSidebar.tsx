"use client"

import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation"
import {
  LayoutDashboard,
  FileText,
  CheckCircle2,
  Wallet,
  TrendingUp,
  UserCog,
  Bell,
  LogOut,
  Menu,
  X,
  Search,
  MessageSquareWarning,
  Settings,
  HelpCircle,
  Bookmark,
} from "lucide-react"
import { useState } from "react"
import { useAuth } from "./AuthProvider"
import { useRouter } from "next/navigation"

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/vendor", param: null, badge: null },
  { icon: FileText, label: "My Bids", href: "/vendor?tab=bids", param: "bids", badge: null },
  { icon: CheckCircle2, label: "Won Contracts", href: "/vendor?tab=won", param: "won", badge: null },
  { icon: Wallet, label: "Wallet & EMD", href: "/vendor?tab=wallet", param: "wallet", badge: null },
  { icon: Bookmark, label: "My Watchlist", href: "/vendor?tab=watchlist", param: "watchlist", badge: null },
  { icon: MessageSquareWarning, label: "My Disputes", href: "/vendor?tab=disputes", param: "disputes", badge: null },
  { icon: TrendingUp, label: "Analytics", href: "/vendor?tab=analytics", param: "analytics", badge: null },
  { icon: Search, label: "Browse Tenders", href: "/tenders", param: null, badge: null },
  { icon: UserCog, label: "My Profile", href: "/vendor/profile", param: null, badge: null },
  { icon: Bell, label: "Notifications", href: "/vendor/notifications", param: null, badge: 3 },
  { icon: Settings, label: "Settings", href: "/vendor?tab=settings", param: "settings", badge: null },
  { icon: HelpCircle, label: "Help & Support", href: "/vendor?tab=help", param: "help", badge: null },
]

export function VendorSidebar() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const { logout, user } = useAuth()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)

  const currentTab = searchParams.get("tab")

  const handleLogout = () => {
    logout()
    router.push("/login")
  }

  const handleNavClick = () => {
    setIsOpen(false)
  }

  const isActive = (item: typeof navItems[0]) => {
    if (item.param) {
      return currentTab === item.param
    }
    if (item.href === "/vendor") {
      return pathname === "/vendor" && !currentTab
    }
    if (item.href === "/tenders") {
      return pathname === "/tenders"
    }
    return pathname === item.href
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
        className={`fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200 z-40 transform transition-transform duration-300 md:relative md:translate-x-0 flex flex-col ${
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Header */}
        <div className="border-b border-gray-200 bg-white p-4">
          <Link href="/vendor" onClick={handleNavClick} className="flex items-center gap-3 hover:opacity-80">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-[#0B3D91] to-[#138808] flex items-center justify-center text-white font-bold text-sm">
              TC
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">TenderChain</p>
              <p className="text-xs text-gray-500">Vendor Portal</p>
            </div>
          </Link>
        </div>

        {/* Vendor Info */}
        {user && user.role === "vendor" && (
          <div className="border-b border-gray-200 p-4">
            <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Logged in as</p>
            <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
            <p className="text-xs text-gray-500 truncate">{user.email}</p>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4 px-3">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={handleNavClick}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    active
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
        <div className="border-t border-gray-200 bg-white p-3">
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
