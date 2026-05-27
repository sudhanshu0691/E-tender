"use client"

import { Suspense, useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { AlertTriangle, ArrowRight, Blocks, Building2, CheckCircle2, Clock3, FileText, Plus, Server, ShieldCheck, Users, XCircle, Gavel, Eye } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { AdminPageContent } from "@/components/AdminPageContent"
import { KYCStatusBadge } from "@/components/KYCStatusBadge"
import CreateTenderModal from "@/components/CreateTenderModal"
import { subscribe, getTenders, getBids, getOfficerInfo, type Tender } from "@/lib/tenderStore"
import kycQueueData from "@/data/kycQueue.json"
import vendorsData from "@/data/vendors.json"
import tenderBidsData from "@/data/tenderBids.json"
import systemHealthData from "@/data/systemHealth.json"

const statusStyles: Record<string, string> = {
  Open: "bg-emerald-100 text-emerald-800 border-emerald-200",
  Closed: "bg-slate-100 text-slate-700 border-slate-200",
  Awarded: "bg-[#138808]/10 text-[#138808] border-[#138808]/20",
}

const healthPalette: Record<string, string> = {
  green: "bg-emerald-500",
  yellow: "bg-amber-500",
  red: "bg-red-500",
}

function formatBudget(budget: number): string {
  const cr = budget / 10000000
  return `₹ ${cr.toFixed(1)} Cr`
}

function getTimeRemaining(deadline: string): string {
  const diff = new Date(deadline).getTime() - Date.now()
  if (diff <= 0) return "Deadline passed"
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
  if (days > 0) return `${days}d ${hours}h remaining`
  return `${hours}h remaining`
}

function AdminDashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentPage = searchParams.get("page")
  const [queueItems, setQueueItems] = useState(kycQueueData.map((vendor) => ({ ...vendor })))
  const [showToast, setShowToast] = useState(false)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [liveTenders, setLiveTenders] = useState<Tender[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const officer = getOfficerInfo()

  useEffect(() => {
    if (currentPage === "profile") { router.replace("/admin/profile"); return }
    if (searchParams.get("published") !== "1") return
    setShowToast(true)
    const timer = window.setTimeout(() => setShowToast(false), 4200)
    return () => window.clearTimeout(timer)
  }, [currentPage, router, searchParams])

  useEffect(() => {
    setLiveTenders(getTenders())
    const unsub = subscribe(() => setLiveTenders(getTenders()))
    return unsub
  }, [])

  const activeBids = (() => {
    const entries = Object.values(tenderBidsData as Record<string, unknown>)
    const staticCount = entries.reduce((total: number, bidEntry: unknown) => {
      if (Array.isArray(bidEntry)) return total + bidEntry.length
      if (bidEntry && typeof bidEntry === "object" && "bids" in (bidEntry as Record<string, unknown>) && Array.isArray((bidEntry as Record<string, unknown>).bids)) {
        return total + ((bidEntry as Record<string, unknown>).bids as unknown[]).length
      }
      return total
    }, 0)
    const liveCount = liveTenders.reduce((sum, t) => sum + getBids(t.id).length, 0)
    return staticCount + liveCount
  })()
  const pendingKyc = queueItems.filter((vendor) => vendor.kycLevel === "pending").length
  const vendorsRegistered = vendorsData.length

  const previewQueue = useMemo(
    () => queueItems.filter((vendor) => vendor.kycLevel === "pending" || vendor.kycLevel === "under-review")
      .sort((left, right) => right.daysWaiting - left.daysWaiting).slice(0, 5), [queueItems])

  const filteredLiveTenders = liveTenders.filter(t =>
    !searchQuery || t.tenderTitle.toLowerCase().includes(searchQuery.toLowerCase()) || t.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleQueueAction = (vendorId: string, nextStatus: "approved" | "rejected") => {
    setQueueItems((current) => current.map((vendor) => (vendor.vendorId === vendorId ? { ...vendor, kycLevel: nextStatus } : vendor)))
  }

  const renderRequestedPage = currentPage && ["tenders", "bids", "disputes", "reports", "profile", "notifications"].includes(currentPage)

  if (renderRequestedPage) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#F8F9FC_0%,#EEF3FA_100%)] p-8">
        <div className="mx-auto max-w-7xl">
          <AdminPageContent page={currentPage} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[linear-gradient(180deg,#F8F9FC_0%,#EEF3FA_100%)]">
      {showToast && (
        <div className="fixed right-4 top-4 z-50 rounded-2xl border border-emerald-200 bg-white px-4 py-3 shadow-xl">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 rounded-full bg-emerald-100 p-2 text-emerald-700">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">Tender published</p>
              <p className="text-xs text-slate-500">The blockchain transaction was confirmed successfully.</p>
            </div>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0B3D91]/15 bg-[#0B3D91]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#0B3D91]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Officer Portal
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">Tender operations command center</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">Authoritative control surface for tender publishing, bid oversight, and vendor verification.</p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                  <Building2 className="h-4 w-4 text-[#0B3D91]" /> {officer.department || "Department"}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                  <Users className="h-4 w-4 text-[#0B3D91]" /> {officer.name || "Officer"}
                </span>
              </div>
            </div>
            <Button onClick={() => setShowCreateModal(true)} className="h-12 rounded-2xl bg-[#0B3D91] px-6 text-base shadow-lg shadow-[#0B3D91]/20 hover:bg-[#083174]">
              <Plus className="mr-2 h-5 w-5" /> Create New Tender
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
          {[
            { label: "Total Tenders", value: liveTenders.length, icon: FileText, accent: "border-[#0B3D91]" },
            { label: "Active Bids", value: activeBids, icon: Blocks, accent: "border-[#FF9933]" },
            { label: "Live Open Tenders", value: liveTenders.filter(t => t.status === "Open").length, icon: Gavel, accent: "border-emerald-500" },
            { label: "Pending KYC", value: pendingKyc, icon: Clock3, accent: "border-[#138808]" },
            { label: "Vendors Registered", value: vendorsRegistered, icon: Users, accent: "border-slate-500" },
          ].map((item) => (
            <Card key={item.label} className={`border-l-4 ${item.accent} shadow-sm`}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-sm font-medium text-slate-500">{item.label}</p>
                    <h3 className="mt-3 text-3xl font-bold text-slate-950">{item.value}</h3>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-3 text-slate-600">
                    <item.icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Live Real-time Tenders Section */}
        <Card className="mb-8 border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <CardTitle className="text-xl text-slate-950 flex items-center gap-2">
                <Gavel className="h-5 w-5 text-[#0B3D91]" />
                Live Tenders (Real-time)
                <span className="flex items-center gap-1 text-xs text-emerald-600 font-normal">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live
                </span>
              </CardTitle>
              <CardDescription>Tenders created in real-time with bid tracking. New bids appear instantly.</CardDescription>
            </div>
            <div className="relative max-w-xs w-full">
              <Input placeholder="Search live tenders..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="h-9 text-sm" />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <AnimatePresence mode="popLayout">
              {filteredLiveTenders.length === 0 ? (
                <div className="p-8 text-center text-sm text-slate-500">
                  <FileText className="h-10 w-10 mx-auto mb-2 text-slate-300" />
                  No live tenders yet. Click Create New Tender to publish one.
                </div>
              ) : (
                <div className="divide-y divide-slate-100">
                  {filteredLiveTenders.map((tender) => {
                    const tenderBids = getBids(tender.id)
                    const winnerBid = tenderBids.find(b => b.status === "winner")
                    const isNew = Date.now() - new Date(tender.createdAt || "").getTime() < 60000
                    return (
                      <motion.div key={tender.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, height: 0 }}
                        className={`p-5 hover:bg-slate-50/70 transition-colors ${isNew ? "bg-blue-50/50" : ""}`}>
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-xs text-[#0B3D91] font-bold">{tender.id}</span>
                              <Badge variant="outline" className={statusStyles[tender.status] || ""}>{tender.status}</Badge>
                              {isNew && <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-1.5 py-0.5 rounded animate-pulse">NEW</span>}
                            </div>
                            <p className="font-semibold text-slate-950">{tender.tenderTitle}</p>
                            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-xs text-slate-500">
                              <span>{tender.department}</span>
                              <span>·</span>
                              <span>{formatBudget(tender.budget)}</span>
                              {tender.status === "Open" && (
                                <><span>·</span><span className="text-amber-600">{getTimeRemaining(tender.deadline)}</span></>
                              )}
                            </div>
                            {tenderBids.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-1.5">
                                {tenderBids.slice(-3).map(bid => (
                                  <span key={bid.bidHash} className={`text-xs px-2 py-0.5 rounded-full ${bid.status === "winner" ? "bg-green-100 text-green-700" : "bg-slate-100 text-slate-600"}`}>
                                    {bid.companyName} {bid.status === "winner" && "🏆"}
                                  </span>
                                ))}
                              </div>
                            )}
                            {tender.status === "Awarded" && winnerBid && (
                              <div className="mt-2 text-xs text-green-700 bg-green-50 rounded p-2 border border-green-200">
                                <strong>Winner:</strong> {winnerBid.companyName} · Score: {winnerBid.totalScore?.toFixed(1)}% · {formatBudget(winnerBid.price || 0)}
                              </div>
                            )}
                          </div>
                          <div className="flex items-center gap-3 shrink-0">
                            <div className="text-right text-sm">
                              <p className="text-xs text-slate-500">Bids</p>
                              <p className="font-bold text-slate-900">{tenderBids.length}</p>
                            </div>
                            <Link href={`/tenders/${tender.id}`}>
                              <Button size="sm" variant="outline" className="border-[#0B3D91] text-[#0B3D91]"><Eye className="h-3.5 w-3.5 mr-1" /> View</Button>
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* System Health */}
        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-4">
          {Object.entries(systemHealthData.services).map(([service, details]) => {
            const Icon = service === "blockchainNode" ? Blocks : service === "ipfs" ? Server : service === "kycService" ? ShieldCheck : service === "emailService" ? FileText : AlertTriangle
            const statusColor = details.status === "ok" ? "green" : details.status === "degraded" ? "yellow" : "red"
            return (
              <Card key={service} className="border-slate-200 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-100 p-3 text-[#0B3D91]"><Icon className="h-5 w-5" /></div>
                      <div>
                        <p className="text-sm font-semibold text-slate-950 capitalize">{service.replace(/([A-Z])/g, " $1")}</p>
                        <p className="text-xs text-slate-500">{details.status}</p>
                      </div>
                    </div>
                    <span className={`mt-1 h-3 w-3 rounded-full ${healthPalette[statusColor] ?? "bg-slate-400"}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* KYC + Recent Tenders */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2 border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <CardTitle className="text-xl text-slate-950">KYC Queue Preview</CardTitle>
                <CardDescription>Top pending vendors awaiting officer action.</CardDescription>
              </div>
              <Link href="/admin/vendors"><Button variant="outline" className="border-[#0B3D91] text-[#0B3D91]">View All <ArrowRight className="ml-2 h-4 w-4" /></Button></Link>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y divide-slate-100">
                {previewQueue.map((vendor) => (
                  <div key={vendor.vendorId} className="flex flex-col gap-4 p-5 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-950">{vendor.companyName}</p>
                        <KYCStatusBadge status={vendor.kycLevel} />
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{vendor.orgType} · Waiting {vendor.daysWaiting} days</p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button size="sm" variant="outline" onClick={() => handleQueueAction(vendor.vendorId, "rejected")} className="border-red-200 text-red-700 hover:bg-red-50">
                        <XCircle className="mr-1 h-4 w-4" /> Reject
                      </Button>
                      <Button size="sm" className="bg-[#138808] text-white hover:bg-[#0f6b06]" onClick={() => handleQueueAction(vendor.vendorId, "approved")}>
                        <CheckCircle2 className="mr-1 h-4 w-4" /> Approve
                      </Button>
                    </div>
                  </div>
                ))}
                {previewQueue.length === 0 && <div className="p-5 text-sm text-slate-500 text-center">No pending KYC requests.</div>}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-950">System Health</CardTitle>
              <CardDescription>Current state of platform services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {Object.entries(systemHealthData.services).map(([service, details]) => {
                const statusColor = details.status === "ok" ? "green" : details.status === "degraded" ? "yellow" : "red"
                return (
                  <div key={service} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-semibold text-slate-900 capitalize">{service.replace(/([A-Z])/g, " $1")}</p>
                        <p className="text-xs text-slate-500 capitalize">{details.status}</p>
                      </div>
                      <span className={`h-3 w-3 rounded-full ${healthPalette[statusColor] ?? "bg-slate-400"}`} />
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        </div>
      </div>

      <CreateTenderModal open={showCreateModal} onOpenChange={setShowCreateModal} />
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F8F9FC] flex items-center justify-center" />}>
      <AdminDashboardContent />
    </Suspense>
  )
}