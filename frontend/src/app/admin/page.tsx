"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { AlertTriangle, ArrowRight, Blocks, Building2, CheckCircle2, Clock3, Database, FileText, Plus, Server, ShieldCheck, Users, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AdminPageContent } from "@/components/AdminPageContent"
import { KYCStatusBadge } from "@/components/KYCStatusBadge"
import tendersData from "@/data/tenders.json"
import kycQueueData from "@/data/kycQueue.json"
import vendorsData from "@/data/vendors.json"
import tenderBidsData from "@/data/tenderBids.json"
import systemHealthData from "@/data/systemHealth.json"
import officersData from "@/data/officers.json"

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

function formatDeadline(deadline: string) {
  return new Date(deadline).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export default function AdminDashboardPage() {
  const searchParams = useSearchParams()
  const currentPage = searchParams.get("page")
  const [queueItems, setQueueItems] = useState(kycQueueData.map((vendor) => ({ ...vendor })))
  const [showToast, setShowToast] = useState(false)

  // Default dashboard view
  useEffect(() => {
    if (searchParams.get("published") !== "1") {
      return
    }

    setShowToast(true)
    const timer = window.setTimeout(() => setShowToast(false), 4200)
    return () => window.clearTimeout(timer)
  }, [searchParams])

  const totalTenders = tendersData.length
  const activeBids = Object.values(tenderBidsData).reduce((total, bids) => total + bids.length, 0)
  const pendingKyc = queueItems.filter((vendor) => vendor.kycLevel === "pending").length
  const vendorsRegistered = vendorsData.length

  const previewQueue = useMemo(
    () =>
      queueItems
        .filter((vendor) => vendor.kycLevel === "pending" || vendor.kycLevel === "under-review")
        .sort((left, right) => right.daysWaiting - left.daysWaiting)
        .slice(0, 5),
    [queueItems],
  )

  const recentTenders = useMemo(
    () =>
      [...tendersData].sort(
        (left, right) => new Date(right.deadline).getTime() - new Date(left.deadline).getTime(),
      ),
    [],
  )

  const handleQueueAction = (vendorId: string, nextStatus: "approved" | "rejected") => {
    setQueueItems((current) =>
      current.map((vendor) =>
        vendor.vendorId === vendorId ? { ...vendor, kycLevel: nextStatus } : vendor,
      ),
    )
  }

  const officer = officersData[0]
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
      {showToast ? (
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
      ) : null}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0B3D91]/15 bg-[#0B3D91]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#0B3D91]">
                <ShieldCheck className="h-3.5 w-3.5" />
                Officer Portal
              </div>
              <div>
                <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">Tender operations command center</h1>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                  Authoritative control surface for tender publishing, bid oversight, and vendor verification.
                </p>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                  <Building2 className="h-4 w-4 text-[#0B3D91]" />
                  {officer.department}
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                  <Users className="h-4 w-4 text-[#0B3D91]" />
                  {officer.name}
                </span>
              </div>
            </div>

            <Link href="/admin/tender/create">
              <Button className="h-12 rounded-2xl bg-[#0B3D91] px-6 text-base shadow-lg shadow-[#0B3D91]/20 hover:bg-[#083174]">
                <Plus className="mr-2 h-5 w-5" />
                Create New Tender
              </Button>
            </Link>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { label: "Total Tenders", value: totalTenders, icon: FileText, accent: "border-[#0B3D91]" },
            { label: "Active Bids", value: activeBids, icon: Blocks, accent: "border-[#FF9933]" },
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

        <div className="mb-8 grid grid-cols-1 gap-4 lg:grid-cols-4">
          {Object.entries(systemHealthData).map(([service, details]) => {
            const Icon =
              service === "blockchain"
                ? Blocks
                : service === "ipfs"
                  ? Server
                  : service === "database"
                    ? Database
                    : AlertTriangle

            return (
              <Card key={service} className="border-slate-200 shadow-sm">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-slate-100 p-3 text-[#0B3D91]">
                        <Icon className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-950 capitalize">{service.replace(/([A-Z])/g, " $1")}</p>
                        <p className="text-xs text-slate-500">
                          {service === "blockchain"
                            ? (() => {
                                const blockchainDetails = details as typeof systemHealthData.blockchain
                                return `Block ${blockchainDetails.blockHeight} • ${blockchainDetails.latency}ms`
                              })()
                            : service === "ipfs"
                              ? (() => {
                                  const ipfsDetails = details as typeof systemHealthData.ipfs
                                  return `${ipfsDetails.gateway} • ${ipfsDetails.latency}ms`
                                })()
                              : service === "database"
                                ? (() => {
                                    const databaseDetails = details as typeof systemHealthData.database
                                    return `Operational • ${databaseDetails.latency}ms`
                                  })()
                                : (() => {
                                    const smartContractDetails = details as typeof systemHealthData.smartContract
                                    return `Verified • ${smartContractDetails.address.slice(0, 8)}...${smartContractDetails.address.slice(-6)}`
                                  })()}
                        </p>
                      </div>
                    </div>
                    <span className={`mt-1 h-3 w-3 rounded-full ${healthPalette[details.status] ?? "bg-slate-400"}`} />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <Card className="xl:col-span-2 border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div>
                <CardTitle className="text-xl text-slate-950">KYC Queue Preview</CardTitle>
                <CardDescription>Top pending vendors awaiting officer action.</CardDescription>
              </div>
              <Link href="/admin/vendors">
                <Button variant="outline" className="border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91]/5">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
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
                      <p className="mt-1 text-sm text-slate-500">
                        {vendor.orgType} · Waiting {vendor.daysWaiting} days · Submitted {new Date(vendor.submittedAt).toLocaleDateString("en-IN")}
                      </p>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleQueueAction(vendor.vendorId, "rejected")}
                        className="border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <XCircle className="mr-1 h-4 w-4" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        className="bg-[#138808] text-white hover:bg-[#0f6b06]"
                        onClick={() => handleQueueAction(vendor.vendorId, "approved")}
                      >
                        <CheckCircle2 className="mr-1 h-4 w-4" />
                        Approve
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-xl text-slate-950">System Health</CardTitle>
              <CardDescription>Current state of platform services.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {Object.entries(systemHealthData).map(([service, details]) => (
                <div key={service} className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-900 capitalize">{service.replace(/([A-Z])/g, " $1")}</p>
                      <p className="text-xs text-slate-500">
                        {service === "blockchain"
                          ? (() => {
                              const blockchainDetails = details as typeof systemHealthData.blockchain
                              return `Latency ${blockchainDetails.latency}ms`
                            })()
                          : service === "ipfs"
                            ? (() => {
                                const ipfsDetails = details as typeof systemHealthData.ipfs
                                return `Latency ${ipfsDetails.latency}ms`
                              })()
                            : service === "database"
                              ? (() => {
                                  const databaseDetails = details as typeof systemHealthData.database
                                  return `Latency ${databaseDetails.latency}ms`
                                })()
                              : (() => {
                                  const smartContractDetails = details as typeof systemHealthData.smartContract
                                  return `Verified • ${smartContractDetails.address.slice(0, 8)}...${smartContractDetails.address.slice(-6)}`
                                })()}
                      </p>
                    </div>
                    <span className={`h-3 w-3 rounded-full ${healthPalette[details.status] ?? "bg-slate-400"}`} />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        <Card className="mt-6 border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div>
              <CardTitle className="text-xl text-slate-950">Recent Tenders</CardTitle>
              <CardDescription>Most recent procurement notices currently on the ledger.</CardDescription>
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                  <tr>
                    <th className="px-6 py-4">Title</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4">Deadline</th>
                    <th className="px-6 py-4 text-right">Manage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {recentTenders.map((tender) => (
                    <tr key={tender.id} className="hover:bg-slate-50/70">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-semibold text-slate-950">{tender.title}</p>
                          <p className="mt-1 text-xs text-slate-500">{tender.department}</p>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Badge variant="outline" className={statusStyles[tender.status] ?? "bg-slate-100 text-slate-700 border-slate-200"}>
                          {tender.status}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-slate-600">{formatDeadline(tender.deadline)}</td>
                      <td className="px-6 py-4 text-right">
                        <Link href={`/admin/tender/${tender.id}`}>
                          <Button variant="outline" size="sm" className="border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91]/5">
                            Manage
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}