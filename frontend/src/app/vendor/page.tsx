"use client"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip as RechartsTooltip, ResponsiveContainer,
  LineChart, Line,
} from "recharts"
import {
  FileText, CheckCircle2, Wallet, ShieldCheck,
  Download, ExternalLink, Bell, Lock, Bookmark, BookmarkCheck,
  AlertTriangle, Clock, Search, Calendar, Zap,
  Trophy, Eye, Star, HelpCircle, Mail, Phone, MessageCircle,
  Upload, ArrowUpRight, ArrowDownLeft, CreditCard,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import tendersData from "@/data/tenders.json"
import disputesData from "@/data/disputes.json"
import notificationsData from "@/data/notifications.json"

/* ── static mock data ── */
const monthlyData = [
  { name: "Jan", bids: 4 }, { name: "Feb", bids: 3 }, { name: "Mar", bids: 7 },
  { name: "Apr", bids: 5 }, { name: "May", bids: 8 }, { name: "Jun", bids: 12 },
]

const performanceData = [
  { name: "Jan", winRate: 15, avgBidDifference: -5 },
  { name: "Feb", winRate: 18, avgBidDifference: -3 },
  { name: "Mar", winRate: 25, avgBidDifference: 2 },
  { name: "Apr", winRate: 22, avgBidDifference: 1 },
  { name: "May", winRate: 30, avgBidDifference: 4 },
  { name: "Jun", winRate: 21, avgBidDifference: 0 },
]

const myBids = [
  { id: "TC-MH-883", title: "Construction of 4-Lane Highway...", amount: "Encrypted 🔒", date: "24 Oct 2024", status: "Pending Reveal", statusClass: "bg-yellow-50 text-yellow-700 border-yellow-200" },
  { id: "TC-DL-912", title: "IT Infrastructure Upgrade 2024", amount: "₹ 4,50,00,000", date: "12 Oct 2024", status: "Lost", statusClass: "bg-red-50 text-red-700 border-red-200" },
  { id: "TC-RJ-405", title: "Installation of 500MW Solar Park...", amount: "₹ 12,40,00,000", date: "15 Sep 2024", status: "Awarded", statusClass: "bg-green-50 text-green-700 border-green-200" },
]

const wonContracts = [
  { id: "TC-RJ-405", title: "Installation of 500MW Solar Park, Jodhpur", value: "₹ 12,40,00,000", date: "15 Sep 2024", progress: 60 },
  { id: "TC-KA-112", title: "Smart City Traffic Management System", value: "₹ 8,25,00,000", date: "02 Jun 2024", progress: 100 },
]

const activityLog = [
  { type: "bid", desc: "Bid submitted for TC-MH-883", hash: "0x4a3f...82bc", time: "24 Oct 2024, 14:30" },
  { type: "emd_lock", desc: "EMD locked for TC-UP-211", hash: "0x88c2...3a1f", time: "28 Oct 2024, 09:15" },
  { type: "emd_refund", desc: "EMD refunded for TC-DL-912", hash: "0x4b7f...9e22", time: "18 Oct 2024, 16:00" },
  { type: "kyc", desc: "KYC Level 2 approved", hash: "0x7c21...ab09", time: "16 May 2026, 10:00" },
  { type: "login", desc: "Login from Chrome on Windows", hash: "—", time: "24 May 2026, 09:15" },
  { type: "bid_reveal", desc: "Bid revealed for TC-KA-112", hash: "0x3e91...cc44", time: "01 Jun 2024, 11:00" },
  { type: "award", desc: "Contract awarded: TC-RJ-405", hash: "0x1b9f...7d4e", time: "15 Sep 2024, 14:30" },
  { type: "deposit", desc: "Wallet deposit via NEFT", hash: "0x221a...c7b4", time: "10 Oct 2024, 12:00" },
]

interface Dispute {
  id: string
  tenderId: string
  tenderTitle: string
  claimantName: string
  reason: string
  submittedAt: string
  status: string
}

/* ── helper ── */
function formatCurrency(n: number): string {
  return "₹ " + (n / 10000000).toFixed(1) + " Cr"
}

/* ────────────────────────── MAIN COMPONENT ────────────────────────── */
export default function VendorDashboardPage() {
  const searchParams = useSearchParams()
  const activeTab = searchParams.get("tab") || "overview"

  return (
    <div className="bg-[#F8F9FC] min-h-screen p-6 lg:p-10">
      <div className="mb-8 flex justify-between items-end">
        <div>
          <h1 className="font-poppins text-2xl font-bold text-gray-900">
            {activeTab === "overview" ? "Welcome back, Demo Infra Pvt Ltd" :
             activeTab === "bids" ? "My Bids" :
             activeTab === "won" ? "Won Contracts" :
             activeTab === "wallet" ? "Wallet & EMD" :
             activeTab === "watchlist" ? "My Watchlist" :
             activeTab === "disputes" ? "My Disputes" :
             activeTab === "analytics" ? "Performance Analytics" :
             activeTab === "settings" ? "Account Settings" :
             activeTab === "help" ? "Help & Support" : "Dashboard"}
          </h1>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/vendor/notifications" className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-[#F8F9FC]" />
          </Link>
          <div className="bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm text-sm flex items-center space-x-2">
            <ShieldCheck className="w-4 h-4 text-[#138808]" />
            <span className="text-gray-500">Network:</span>
            <span className="text-[#138808] font-bold">Synced</span>
          </div>
        </div>
      </div>

      {activeTab === "overview" && <OverviewTab />}
      {activeTab === "bids" && <MyBidsTab />}
      {activeTab === "won" && <WonContractsTab />}
      {activeTab === "wallet" && <WalletTab />}
      {activeTab === "watchlist" && <WatchlistTab />}
      {activeTab === "disputes" && <DisputesTab />}
      {activeTab === "analytics" && <AnalyticsTab />}
      {activeTab === "settings" && <SettingsTab />}
      {activeTab === "help" && <HelpTab />}
    </div>
  )
}

/* ────────────────────────── OVERVIEW TAB ────────────────────────── */
function OverviewTab() {
  const onboardingSteps = [
    { label: "Complete Profile", done: true },
    { label: "Upload KYC Documents", done: true },
    { label: "Connect Wallet", done: true },
    { label: "Submit First Bid", done: false },
  ]
  const completedSteps = onboardingSteps.filter((s) => s.done).length
  const allDone = completedSteps === onboardingSteps.length

  const upcomingDeadlines = tendersData
    .filter((t) => t.status === "Open" && !t.deadlinePassed)
    .map((t) => ({ id: t.id, title: t.tenderTitle, deadline: t.deadline, category: t.category }))

  const recentNotifs = (notificationsData as { id: string; title: string; message: string; timestamp: string; read: boolean }[]).slice(0, 3)

  return (
    <>
      {/* Onboarding Wizard (P3.14) */}
      {!allDone && (
        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-blue-900">Getting Started</h3>
                <p className="text-sm text-blue-700">{completedSteps} of {onboardingSteps.length} steps complete</p>
              </div>
              <div className="text-2xl font-bold text-blue-900">{Math.round((completedSteps / onboardingSteps.length) * 100)}%</div>
            </div>
            <div className="h-2 bg-blue-200 rounded-full mb-4">
              <div className="h-2 bg-blue-600 rounded-full" style={{ width: `${(completedSteps / onboardingSteps.length) * 100}%` }} />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {onboardingSteps.map((step) => (
                <div key={step.label} className={`flex items-center gap-2 text-sm rounded-lg p-2 ${step.done ? "bg-green-100 text-green-800" : "bg-white text-gray-600 border"}`}>
                  {step.done ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  {step.label}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Actions (P3.21) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Link href="/tenders">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-[#0B3D91]">
            <CardContent className="p-4 flex items-center gap-3">
              <Search className="h-8 w-8 text-[#0B3D91]" />
              <div>
                <p className="font-semibold text-sm">Browse Tenders</p>
                <p className="text-xs text-gray-500">Find new opportunities</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/vendor/profile">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-[#FF9933]">
            <CardContent className="p-4 flex items-center gap-3">
              <Upload className="h-8 w-8 text-[#FF9933]" />
              <div>
                <p className="font-semibold text-sm">Upload Document</p>
                <p className="text-xs text-gray-500">KYC & compliance</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/vendor?tab=wallet">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-[#138808]">
            <CardContent className="p-4 flex items-center gap-3">
              <Wallet className="h-8 w-8 text-[#138808]" />
              <div>
                <p className="font-semibold text-sm">Wallet Balance</p>
                <p className="text-xs text-gray-500">₹ 25,00,000</p>
              </div>
            </CardContent>
          </Card>
        </Link>
        <Link href="/vendor/notifications">
          <Card className="hover:shadow-md transition-shadow cursor-pointer border-l-4 border-l-red-400">
            <CardContent className="p-4 flex items-center gap-3">
              <Bell className="h-8 w-8 text-red-400" />
              <div>
                <p className="font-semibold text-sm">Notifications</p>
                <p className="text-xs text-gray-500">3 unread</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card className="border-l-4 border-l-[#0B3D91]">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Total Bids Submitted</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">19</h3>
            <p className="text-xs text-green-600 mt-2">+3 this month</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#138808]">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Contracts Won</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">4</h3>
            <p className="text-xs text-gray-500 mt-2">Value: ₹ 24.5 Cr</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-[#FF9933]">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">Pending Evaluation</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">3</h3>
            <p className="text-xs text-gray-500 mt-2">Under Smart Contract Lock</p>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-gray-400">
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500">EMD Locked</p>
            <h3 className="text-3xl font-bold text-gray-900 mt-2">₹ 15L</h3>
            <p className="text-xs text-gray-500 mt-2">Across 3 active bids</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts + Calendar Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="lg:col-span-2">
          <CardHeader><CardTitle className="text-lg">Bidding Activity (2024)</CardTitle></CardHeader>
          <CardContent className="h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
                <RechartsTooltip cursor={{ fill: "#F3F4F6" }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
                <Bar dataKey="bids" fill="#0B3D91" radius={[4, 4, 0, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Upcoming Deadlines Calendar (P3.20) */}
        <Card>
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Calendar className="h-5 w-5 text-[#0B3D91]" />Upcoming Deadlines</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {upcomingDeadlines.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">No upcoming deadlines</p>
            ) : (
              upcomingDeadlines.map((t) => (
                <Link key={t.id} href={`/tenders/${t.id}`}>
                  <div className="p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-mono text-gray-500">{t.id}</span>
                      <Badge variant="outline" className="text-xs bg-red-50 text-red-700 border-red-200">
                        <Clock className="h-3 w-3 mr-1" />
                        {new Date(t.deadline).toLocaleDateString()}
                      </Badge>
                    </div>
                    <p className="text-sm font-medium text-gray-900 truncate">{t.title}</p>
                  </div>
                </Link>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Notifications */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Recent Notifications</CardTitle>
          <Link href="/vendor/notifications"><Button variant="ghost" size="sm">View All</Button></Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentNotifs.map((n) => (
              <div key={n.id} className={`flex items-start gap-3 p-3 rounded-lg ${n.read ? "bg-white" : "bg-blue-50 border-l-2 border-l-[#0B3D91]"}`}>
                <Bell className="h-4 w-4 text-gray-400 mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-medium text-gray-900">{n.title}</p>
                  <p className="text-xs text-gray-500">{n.message}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </>
  )
}

/* ────────────────────────── MY BIDS TAB ────────────────────────── */
function MyBidsTab() {
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null)

  const handleWithdraw = (id: string) => {
    if (confirm(`Are you sure you want to withdraw your bid for ${id}? This action will be recorded on the blockchain and cannot be undone.`)) {
      setWithdrawingId(id)
      setTimeout(() => {
        alert(`Bid for ${id} has been withdrawn. Your EMD will be refunded within 2-3 business days.`)
        setWithdrawingId(null)
      }, 1500)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">My Submitted Bids</CardTitle>
        <CardDescription>Track all your encrypted bids and their evaluation status on the blockchain.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 border-y border-gray-200 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3">Tender ID</th>
                <th className="px-4 py-3">Title</th>
                <th className="px-4 py-3">Bid Amount</th>
                <th className="px-4 py-3">Date Submitted</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {myBids.map((bid) => (
                <tr key={bid.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 font-mono font-medium text-[#0B3D91] hover:underline">
                    <Link href={`/tenders/${bid.id}`}>{bid.id}</Link>
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900 max-w-[200px] truncate">{bid.title}</td>
                  <td className="px-4 py-4 font-mono text-gray-900">{bid.amount}</td>
                  <td className="px-4 py-4 text-gray-600">{bid.date}</td>
                  <td className="px-4 py-4">
                    <Badge variant="outline" className={bid.statusClass}>{bid.status}</Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex gap-2">
                      {bid.status === "Pending Reveal" && (
                        <>
                          <Button variant="outline" size="sm" className="h-8 text-xs" onClick={() => alert("Bid reveal will be available after the evaluation deadline passes.")}>
                            Reveal Bid
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 text-xs text-red-600 border-red-200 hover:bg-red-50"
                            disabled={withdrawingId === bid.id}
                            onClick={() => handleWithdraw(bid.id)}
                          >
                            {withdrawingId === bid.id ? "Withdrawing..." : "Withdraw"}
                          </Button>
                        </>
                      )}
                      {bid.status === "Lost" && (
                        <Link href={`/tenders/${bid.id}`}><Button variant="ghost" size="sm" className="h-8 text-xs">View Result</Button></Link>
                      )}
                      {bid.status === "Awarded" && (
                        <Link href={`/tenders/${bid.id}`}><Button variant="ghost" size="sm" className="h-8 text-xs text-[#0B3D91]">View Contract</Button></Link>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Bid Comparison (P2.11) */}
        <div className="mt-8 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-amber-500" />
            Bid Comparison (Awarded Tenders)
          </h3>
          <div className="bg-gray-50 rounded-lg p-4">
            <table className="w-full text-sm">
              <thead className="text-xs text-gray-500 uppercase">
                <tr>
                  <th className="text-left pb-3">Tender</th>
                  <th className="text-left pb-3">Your Bid</th>
                  <th className="text-left pb-3">L1 (Winner)</th>
                  <th className="text-left pb-3">Difference</th>
                  <th className="text-left pb-3">Your Rank</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 font-medium">TC-RJ-405</td>
                  <td className="py-3 font-mono">₹ 12,40,00,000</td>
                  <td className="py-3 font-mono text-green-700">₹ 12,40,00,000</td>
                  <td className="py-3 text-green-700 font-semibold">0% (L1)</td>
                  <td className="py-3"><Badge className="bg-green-100 text-green-800">#1 Winner</Badge></td>
                </tr>
                <tr>
                  <td className="py-3 font-medium">TC-DL-912</td>
                  <td className="py-3 font-mono">₹ 4,50,00,000</td>
                  <td className="py-3 font-mono text-green-700">₹ 3,90,00,000</td>
                  <td className="py-3 text-red-600 font-semibold">+15.4%</td>
                  <td className="py-3"><Badge variant="outline">#4 of 8</Badge></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/* ────────────────────────── WON CONTRACTS TAB ────────────────────────── */
function WonContractsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-xl">Won Contracts & Work Orders</CardTitle>
        <CardDescription>Digitally signed contracts and milestone tracking for awarded tenders.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {wonContracts.map((contract) => (
            <div key={contract.id} className="border border-gray-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between bg-white hover:border-[#0B3D91]/30 transition-colors">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <Link href={`/tenders/${contract.id}`} className="hover:underline">
                    <span className="font-mono text-[#0B3D91] font-semibold">{contract.id}</span>
                  </Link>
                  <Badge className="bg-[#138808] hover:bg-[#138808]">Active Contract</Badge>
                </div>
                <h3 className="font-medium text-gray-900 mb-1">{contract.title}</h3>
                <div className="flex space-x-4 text-sm text-gray-500">
                  <span>Award Value: {contract.value}</span>
                  <span>•</span>
                  <span>Award Date: {contract.date}</span>
                </div>
              </div>
              <div className="mt-4 md:mt-0 flex flex-col md:items-end">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="text-sm font-medium text-gray-700">Project Progress:</span>
                  <span className="text-sm font-bold text-[#0B3D91]">{contract.progress}%</span>
                </div>
                <div className="w-full md:w-32 h-2 bg-gray-100 rounded-full overflow-hidden mb-3">
                  <div className="h-full bg-[#138808]" style={{ width: `${contract.progress}%` }} />
                </div>
                <div className="flex space-x-2">
                  <Link href={`/tenders/${contract.id}`}>
                    <Button variant="outline" size="sm" className="h-8">
                      <ExternalLink className="w-4 h-4 mr-1" /> View Updates
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    className="h-8 bg-[#0B3D91]"
                    onClick={() => alert(`Agreement for ${contract.id} would download. (Mock environment)`)}
                  >
                    <Download className="w-4 h-4 mr-1" /> Download Agreement
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

/* ────────────────────────── WALLET TAB ────────────────────────── */
function WalletTab() {
  const [showPayment, setShowPayment] = useState(false)
  const [paymentAmount, setPaymentAmount] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("upi")
  const [paymentRef, setPaymentRef] = useState("")

  const handlePaymentSubmit = () => {
    if (!paymentAmount || !paymentRef) {
      alert("Please fill in amount and reference number.")
      return
    }
    alert(`Payment of ₹ ${Number(paymentAmount).toLocaleString("en-IN")} via ${paymentMethod.toUpperCase()} (Ref: ${paymentRef}) submitted. Funds will be credited within 1-2 hours.`)
    setShowPayment(false)
    setPaymentAmount("")
    setPaymentRef("")
  }

  const handleExportCSV = () => {
    const csv = "Date,Description,Tx Hash,Amount\n28 Oct 2024,EMD Lock (TC-UP-211),0x88c2...3a1f,-₹10,00,000\n18 Oct 2024,EMD Refund (TC-DL-912),0x4b7f...9e22,+₹4,50,000\n10 Oct 2024,Wallet Deposit (NEFT),0x221a...c7b4,+₹20,00,000"
    const blob = new Blob([csv], { type: "text/csv" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = "transaction-history.csv"
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-[#0B3D91] text-white">
          <CardContent className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-blue-200 text-sm mb-1">Available EMD Balance</p>
                <h2 className="text-3xl font-bold font-mono">₹ 25,00,000</h2>
              </div>
              <Wallet className="w-8 h-8 text-blue-300 opacity-50" />
            </div>
            <div className="flex space-x-3">
              <Button className="bg-white text-[#0B3D91] hover:bg-gray-100 flex-1" onClick={() => setShowPayment(true)}>Add Funds</Button>
              <Button className="bg-blue-600 text-white hover:bg-blue-700 border-none flex-1" onClick={() => alert("Withdraw: Available EMD balance can be withdrawn to your registered bank account. Processing takes 2-3 business days.")}>Withdraw</Button>
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Locked EMDs (Smart Contracts)</CardTitle>
            <CardDescription>Funds currently locked in active bids. Automatically refunded upon tender conclusion.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 mt-4">
              {[
                { id: "TC-MH-883", date: "24 Oct 2024", amount: "₹ 5,00,000" },
                { id: "TC-UP-211", date: "28 Oct 2024", amount: "₹ 10,00,000" },
              ].map((emd) => (
                <div key={emd.id} className="flex justify-between items-center p-3 border border-gray-100 rounded-lg bg-gray-50">
                  <div className="flex items-center">
                    <Lock className="w-4 h-4 text-gray-400 mr-3" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">{emd.id}</p>
                      <p className="text-xs text-gray-500">Locked on {emd.date}</p>
                    </div>
                  </div>
                  <span className="font-mono font-medium text-gray-900">{emd.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Payment Form (P2.9) */}
      {showPayment && (
        <Card className="border-green-200">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-600" />
              Add Funds to Wallet
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Amount (₹) *</label>
                <Input type="number" placeholder="Enter amount" value={paymentAmount} onChange={(e) => setPaymentAmount(e.target.value)} className="mt-1" />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Payment Method *</label>
                <select className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
                  <option value="upi">UPI</option>
                  <option value="neft">NEFT</option>
                  <option value="rtgs">RTGS</option>
                  <option value="netbanking">Net Banking</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Bank</label>
                <select className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm">
                  <option>State Bank of India</option>
                  <option>HDFC Bank</option>
                  <option>ICICI Bank</option>
                  <option>Punjab National Bank</option>
                  <option>Bank of Baroda</option>
                </select>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">UTR / Reference Number *</label>
                <Input placeholder="Enter transaction reference" value={paymentRef} onChange={(e) => setPaymentRef(e.target.value)} className="mt-1" />
              </div>
            </div>
            <div className="flex gap-3 justify-end">
              <Button variant="outline" onClick={() => setShowPayment(false)}>Cancel</Button>
              <Button className="bg-[#138808]" onClick={handlePaymentSubmit}>Submit Payment</Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Transaction History */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg">Transaction History</CardTitle>
          <Button variant="outline" size="sm" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-1" /> Export CSV
          </Button>
        </CardHeader>
        <CardContent>
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-600 uppercase text-xs font-semibold">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Tx Hash</th>
                <th className="px-4 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-4 py-3 text-gray-600">28 Oct 2024</td>
                <td className="px-4 py-3 font-medium flex items-center gap-2"><ArrowUpRight className="h-4 w-4 text-red-500" />EMD Lock (TC-UP-211)</td>
                <td className="px-4 py-3 font-mono text-gray-400 text-xs">0x88c2...3a1f</td>
                <td className="px-4 py-3 text-right text-red-600 font-mono">- ₹ 10,00,000</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-600">18 Oct 2024</td>
                <td className="px-4 py-3 font-medium flex items-center gap-2"><ArrowDownLeft className="h-4 w-4 text-green-500" />EMD Refund (TC-DL-912)</td>
                <td className="px-4 py-3 font-mono text-gray-400 text-xs">0x4b7f...9e22</td>
                <td className="px-4 py-3 text-right text-green-600 font-mono">+ ₹ 4,50,000</td>
              </tr>
              <tr>
                <td className="px-4 py-3 text-gray-600">10 Oct 2024</td>
                <td className="px-4 py-3 font-medium flex items-center gap-2"><ArrowDownLeft className="h-4 w-4 text-green-500" />Wallet Deposit (NEFT)</td>
                <td className="px-4 py-3 font-mono text-gray-400 text-xs">0x221a...c7b4</td>
                <td className="px-4 py-3 text-right text-green-600 font-mono">+ ₹ 20,00,000</td>
              </tr>
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}

/* ────────────────────────── WATCHLIST TAB (P2.8) ────────────────────────── */
function WatchlistTab() {
  const [watchlist, setWatchlist] = useState<string[]>(["TNDR-2026-001"])

  const watchedTenders = tendersData.filter((t) => watchlist.includes(t.id))
  const otherOpen = tendersData.filter((t) => t.status === "Open" && !watchlist.includes(t.id))

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><BookmarkCheck className="h-5 w-5 text-[#FF9933]" />Saved Tenders</CardTitle>
          <CardDescription>Tenders you are watching. You will receive deadline reminders.</CardDescription>
        </CardHeader>
        <CardContent>
          {watchedTenders.length === 0 ? (
            <div className="text-center py-8">
              <Bookmark className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500">No tenders in your watchlist yet.</p>
              <Link href="/tenders"><Button variant="outline" className="mt-3">Browse Tenders</Button></Link>
            </div>
          ) : (
            <div className="space-y-3">
              {watchedTenders.map((t) => (
                <div key={t.id} className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-sm text-gray-500">{t.id}</span>
                      <Badge variant="outline" className={t.status === "Open" ? "bg-green-50 text-green-700" : "bg-gray-100"}>{t.status}</Badge>
                    </div>
                    <Link href={`/tenders/${t.id}`} className="font-medium text-[#0B3D91] hover:underline">{t.tenderTitle}</Link>
                    <div className="flex gap-4 text-xs text-gray-500 mt-1">
                      <span>Budget: {formatCurrency(t.budget)}</span>
                      <span>Deadline: {new Date(t.deadline).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <Link href={`/tenders/${t.id}/bid`}><Button size="sm" className="bg-[#138808] h-8">Submit Bid</Button></Link>
                    <Button variant="outline" size="sm" className="h-8 text-red-600" onClick={() => setWatchlist((prev) => prev.filter((id) => id !== t.id))}>
                      Remove
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {otherOpen.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Suggested Tenders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {otherOpen.map((t) => (
                <div key={t.id} className="border rounded-lg p-4 flex items-center justify-between hover:bg-gray-50">
                  <div className="flex-1">
                    <span className="font-mono text-xs text-gray-500">{t.id}</span>
                    <Link href={`/tenders/${t.id}`}><p className="font-medium text-gray-900 hover:text-[#0B3D91]">{t.tenderTitle}</p></Link>
                    <p className="text-xs text-gray-500">{t.department} • {formatCurrency(t.budget)}</p>
                  </div>
                  <Button variant="outline" size="sm" className="h-8" onClick={() => setWatchlist((prev) => [...prev, t.id])}>
                    <Bookmark className="h-4 w-4 mr-1" /> Watch
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

/* ────────────────────────── DISPUTES TAB (P2.12) ────────────────────────── */
function DisputesTab() {
  const allDisputes: Dispute[] = Object.values(disputesData as Record<string, Dispute[]>).flat()
  const myDisputes = allDisputes.filter((d) => d.claimantName === "BuildTech Enterprises" || d.claimantName === "Digital Health Solutions")

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-amber-500" />
            My Filed Disputes
          </CardTitle>
          <CardDescription>Track the status of disputes you have filed.</CardDescription>
        </CardHeader>
        <CardContent>
          {myDisputes.length === 0 ? (
            <div className="text-center py-8">
              <CheckCircle2 className="h-12 w-12 text-green-300 mx-auto mb-3" />
              <p className="text-gray-600 font-medium">No disputes filed</p>
              <p className="text-gray-500 text-sm">You can file a dispute from any tender detail page.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myDisputes.map((d) => (
                <div key={d.id} className="border rounded-lg p-5">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-sm font-semibold text-gray-600">{d.id}</span>
                      <Badge variant="outline" className={
                        d.status === "under-review" ? "bg-amber-100 text-amber-800" :
                        d.status === "open" ? "bg-blue-100 text-blue-800" :
                        d.status === "resolved" ? "bg-green-100 text-green-800" :
                        "bg-red-100 text-red-800"
                      }>
                        {d.status.replace("-", " ")}
                      </Badge>
                    </div>
                    <span className="text-xs text-gray-500">Filed: {new Date(d.submittedAt).toLocaleDateString("en-IN")}</span>
                  </div>
                  <h4 className="font-medium text-gray-900 mb-1">{d.tenderTitle}</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">{d.reason}</p>
                  <div className="mt-3 flex gap-3">
                    <Link href={`/tenders/${d.tenderId}`}><Button variant="outline" size="sm">View Tender</Button></Link>
                    <Link href={`/vendor/dispute/${d.tenderId}`}><Button variant="outline" size="sm">View Details</Button></Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

/* ────────────────────────── ANALYTICS TAB ────────────────────────── */
function AnalyticsTab() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Competitor Analysis</p>
            <h3 className="text-2xl font-bold text-gray-900">Top 15%</h3>
            <p className="text-xs text-gray-500 mt-1">In Infrastructure category</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Avg. Bid Deviation</p>
            <h3 className="text-2xl font-bold text-[#138808]">-4.2%</h3>
            <p className="text-xs text-gray-500 mt-1">Below L1 winning bids</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-sm font-medium text-gray-500 mb-1">Profile Trust Score</p>
            <h3 className="text-2xl font-bold text-gray-900">98/100</h3>
            <p className="text-xs text-gray-500 mt-1">Based on on-chain history</p>
          </CardContent>
        </Card>
      </div>

      {/* Reputation Score Breakdown (P3.16) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Star className="h-5 w-5 text-amber-500" />Reputation Score Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { label: "On-time Delivery", score: 95, max: 100, color: "bg-green-500" },
              { label: "Quality Compliance", score: 92, max: 100, color: "bg-blue-500" },
              { label: "KYC Completeness", score: 100, max: 100, color: "bg-purple-500" },
              { label: "Past Project Completion", score: 100, max: 100, color: "bg-teal-500" },
              { label: "Dispute Frequency (lower is better)", score: 98, max: 100, color: "bg-amber-500" },
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-semibold">{item.score}/{item.max}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full ${item.color} rounded-full`} style={{ width: `${(item.score / item.max) * 100}%` }} />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Trends</CardTitle>
          <CardDescription>Win rate vs Bid difference relative to L1 over time</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={performanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: "#6B7280", fontSize: 12 }} />
              <RechartsTooltip cursor={{ stroke: "#E5E7EB", strokeWidth: 2 }} contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)" }} />
              <Line type="monotone" dataKey="winRate" name="Win Rate (%)" stroke="#0B3D91" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="avgBidDifference" name="Avg Bid Diff (%)" stroke="#FF9933" strokeWidth={3} dot={{ r: 4, strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Activity Log (P3.22) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2"><Eye className="h-5 w-5 text-[#0B3D91]" />Activity Log</CardTitle>
          <CardDescription>Your blockchain activity and account events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activityLog.map((log, i) => (
              <div key={i} className="flex items-start gap-4 p-3 border rounded-lg hover:bg-gray-50">
                <div className={`mt-1 p-2 rounded-full ${
                  log.type === "bid" ? "bg-blue-100 text-blue-600" :
                  log.type === "award" ? "bg-green-100 text-green-600" :
                  log.type === "emd_lock" ? "bg-red-100 text-red-600" :
                  log.type === "emd_refund" ? "bg-green-100 text-green-600" :
                  log.type === "kyc" ? "bg-purple-100 text-purple-600" :
                  log.type === "deposit" ? "bg-teal-100 text-teal-600" :
                  "bg-gray-100 text-gray-600"
                }`}>
                  {log.type === "bid" || log.type === "bid_reveal" ? <FileText className="h-4 w-4" /> :
                   log.type === "award" ? <Trophy className="h-4 w-4" /> :
                   log.type === "emd_lock" || log.type === "emd_refund" ? <Wallet className="h-4 w-4" /> :
                   log.type === "kyc" ? <ShieldCheck className="h-4 w-4" /> :
                   log.type === "deposit" ? <CreditCard className="h-4 w-4" /> :
                   <Zap className="h-4 w-4" />}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{log.desc}</p>
                  <div className="flex gap-4 text-xs text-gray-500 mt-1">
                    <span>{log.time}</span>
                    {log.hash !== "—" && <span className="font-mono">{log.hash}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ────────────────────────── SETTINGS TAB ────────────────────────── */
function SettingsTab() {
  const [saved, setSaved] = useState(false)
  const [notifPrefs, setNotifPrefs] = useState({
    tenderAlerts: true,
    bidStatus: true,
    kycUpdates: true,
    deadlineReminders: true,
    disputeUpdates: true,
  })

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="max-w-4xl space-y-8">
      {saved && (
        <div className="fixed right-4 top-4 z-50 rounded-lg border border-green-200 bg-green-50 px-4 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-700" />
            <p className="text-sm font-medium text-green-900">Settings saved successfully</p>
          </div>
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Organization Profile</CardTitle>
          <CardDescription>Manage your registered company details on the blockchain.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Company Name</label>
              <Input defaultValue="Demo Infra Pvt Ltd" readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">PAN Number</label>
              <Input defaultValue="ABCDE1234F" readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">GSTIN</label>
              <Input defaultValue="27ABCDE1234F1Z5" readOnly className="bg-gray-50" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Registered Email</label>
              <Input defaultValue="contact@demoinfra.in" />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button className="bg-[#0B3D91]" onClick={handleSave}>Save Changes</Button>
          </div>
        </CardContent>
      </Card>

      {/* Notification Preferences (P3.15) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><Bell className="h-5 w-5" />Notification Preferences</CardTitle>
          <CardDescription>Choose which notifications you want to receive.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {([
            ["tenderAlerts", "New Tender Alerts", "Get notified when new tenders in your category are published"],
            ["bidStatus", "Bid Status Updates", "Notifications when your bid status changes"],
            ["kycUpdates", "KYC Updates", "Alerts for KYC verification status changes"],
            ["deadlineReminders", "Deadline Reminders", "Reminders before bid submission deadlines"],
            ["disputeUpdates", "Dispute Updates", "Notifications for dispute status changes"],
          ] as const).map(([key, title, desc]) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <p className="font-medium text-gray-900">{title}</p>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <button
                onClick={() => setNotifPrefs((prev) => ({ ...prev, [key]: !prev[key] }))}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${notifPrefs[key] ? "bg-[#0B3D91]" : "bg-gray-300"}`}
              >
                <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${notifPrefs[key] ? "translate-x-6" : "translate-x-1"}`} />
              </button>
            </div>
          ))}
          <div className="flex justify-end pt-2">
            <Button className="bg-[#0B3D91]" onClick={handleSave}>Save Preferences</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl">Security & Authentication</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">DigiLocker Integration</p>
              <p className="text-sm text-gray-500">Linked for automated e-KYC</p>
            </div>
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Connected</Badge>
          </div>
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <div>
              <p className="font-medium text-gray-900">Digital Signature Certificate (DSC)</p>
              <p className="text-sm text-gray-500">Class 3 DSC required for bid submission</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => alert("DSC Update: Please insert your Class 3 Digital Signature Certificate USB token.")}>Update DSC</Button>
          </div>
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="font-medium text-gray-900">Two-Factor Authentication (2FA)</p>
              <p className="text-sm text-gray-500">App-based authenticator</p>
            </div>
            <Button variant="outline" size="sm" className="text-red-600 border-red-200 hover:bg-red-50" onClick={() => { if (confirm("Are you sure you want to disable 2FA?")) alert("2FA has been disabled.") }}>Disable</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

/* ────────────────────────── HELP TAB (P3.19) ────────────────────────── */
function HelpTab() {
  const [ticketSubject, setTicketSubject] = useState("")
  const [ticketMessage, setTicketMessage] = useState("")

  const faqs = [
    { q: "How do I submit a bid?", a: "Navigate to the tender detail page and click 'Submit Bid'. Follow the 4-step wizard to enter bid details, upload documents, confirm EMD, and submit your encrypted bid to the blockchain." },
    { q: "What is EMD and how does it work?", a: "Earnest Money Deposit (EMD) is a security deposit locked in a smart contract when you submit a bid. It is automatically refunded if you are not awarded the tender, or adjusted against the contract value if you win." },
    { q: "How do I complete my KYC?", a: "Go to your Profile page, navigate to the Documents tab, and upload the required documents (PAN, GSTIN, ITR, etc.). KYC is verified in 4 levels. Each level requires specific documents." },
    { q: "How can I file a dispute?", a: "From the tender detail page, click 'File Dispute'. Provide the dispute type, grounds, and supporting evidence. All disputes are recorded on-chain for transparency." },
    { q: "What happens when I withdraw a bid?", a: "Withdrawing a bid before the deadline cancels your submission. Your EMD is refunded within 2-3 business days. This action is recorded on the blockchain and cannot be undone." },
  ]

  const handleSubmitTicket = () => {
    if (!ticketSubject || !ticketMessage) {
      alert("Please fill in both subject and message.")
      return
    }
    alert(`Support ticket submitted successfully!\nSubject: ${ticketSubject}\nYou will receive a response within 24-48 hours.`)
    setTicketSubject("")
    setTicketMessage("")
  }

  return (
    <div className="max-w-4xl space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><HelpCircle className="h-5 w-5 text-[#0B3D91]" />Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="border rounded-lg">
              <summary className="px-4 py-3 cursor-pointer font-medium text-gray-900 hover:bg-gray-50">{faq.q}</summary>
              <div className="px-4 pb-4 text-sm text-gray-600">{faq.a}</div>
            </details>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2"><MessageCircle className="h-5 w-5 text-[#0B3D91]" />Raise a Support Ticket</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Subject *</label>
            <Input placeholder="Brief description of your issue" value={ticketSubject} onChange={(e) => setTicketSubject(e.target.value)} className="mt-1" />
          </div>
          <div>
            <label className="text-sm font-medium text-gray-700">Message *</label>
            <textarea
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#0B3D91] focus:outline-none focus:ring-1 focus:ring-[#0B3D91]"
              rows={4}
              placeholder="Describe your issue in detail..."
              value={ticketMessage}
              onChange={(e) => setTicketMessage(e.target.value)}
            />
          </div>
          <Button className="bg-[#0B3D91]" onClick={handleSubmitTicket}>Submit Ticket</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle className="text-xl">Contact Information</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start gap-3">
              <Mail className="h-5 w-5 text-[#0B3D91] mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Email Support</p>
                <p className="text-sm text-gray-600">support@tenderchain.gov.in</p>
                <p className="text-xs text-gray-500 mt-1">Response within 24 hours</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="h-5 w-5 text-[#0B3D91] mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Phone Support</p>
                <p className="text-sm text-gray-600">1800-XXX-XXXX (Toll Free)</p>
                <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9 AM - 6 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <HelpCircle className="h-5 w-5 text-[#0B3D91] mt-0.5" />
              <div>
                <p className="font-medium text-gray-900">Documentation</p>
                <Link href="/how-it-works" className="text-sm text-[#0B3D91] hover:underline">View User Guide</Link>
                <p className="text-xs text-gray-500 mt-1">Step-by-step tutorials</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
