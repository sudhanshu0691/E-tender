"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, FileText, Search, XCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { KYCStatusBadge } from "@/components/KYCStatusBadge"
import { IPFSHashPill } from "@/components/IPFSHashPill"
import kycQueueData from "@/data/kycQueue.json"
import vendorsData from "@/data/vendors.json"

type QueueItem = (typeof kycQueueData)[number]
type VendorItem = (typeof vendorsData)[number]

export default function AdminVendorsPage() {
  const [activeTab, setActiveTab] = useState<"queue" | "all">("queue")
  const [queueItems, setQueueItems] = useState<QueueItem[]>(kycQueueData.map((vendor) => ({ ...vendor })))
  const [vendors, setVendors] = useState<VendorItem[]>(vendorsData.map((vendor) => ({ ...vendor })))
  const [search, setSearch] = useState("")
  const [kycFilter, setKycFilter] = useState("all")
  const [msmeFilter, setMsmeFilter] = useState("all")
  const [stateFilter, setStateFilter] = useState("all")
  const [docsModal, setDocsModal] = useState<QueueItem | null>(null)
  const [confirmAction, setConfirmAction] = useState<{ vendorId: string; companyName: string; action: "approved" | "rejected" } | null>(null)
  const [selectedVendor, setSelectedVendor] = useState<VendorItem | null>(null)

  const queueList = useMemo(
    () =>
      queueItems
        .filter((vendor) => vendor.kycLevel === "pending" || vendor.kycLevel === "under-review")
        .sort((left, right) => right.daysWaiting - left.daysWaiting),
    [queueItems],
  )

  const filteredVendors = useMemo(() => {
    return vendors.filter((vendor) => {
      const matchesSearch =
        vendor.companyName.toLowerCase().includes(search.toLowerCase()) ||
        vendor.orgType.toLowerCase().includes(search.toLowerCase()) ||
        vendor.state.toLowerCase().includes(search.toLowerCase())

      const matchesKyc = kycFilter === "all" || vendor.kycStatus === kycFilter
      const matchesMsme = msmeFilter === "all" || String(vendor.msme) === msmeFilter
      const matchesState = stateFilter === "all" || vendor.state === stateFilter

      return matchesSearch && matchesKyc && matchesMsme && matchesState
    })
  }, [kycFilter, msmeFilter, search, stateFilter, vendors])

  const stateOptions = useMemo(() => Array.from(new Set(vendors.map((vendor) => vendor.state))).sort(), [vendors])

  const handleQueueDecision = () => {
    if (!confirmAction) {
      return
    }

    setQueueItems((current) => current.filter((vendor) => vendor.vendorId !== confirmAction.vendorId))
    setVendors((current) =>
      current.map((vendor) =>
        vendor.id === confirmAction.vendorId ? { ...vendor, kycStatus: confirmAction.action } : vendor,
      ),
    )
    setConfirmAction(null)
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[linear-gradient(180deg,#F8F9FC_0%,#EEF3FA_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/admin" className="inline-flex items-center gap-1.5 font-medium text-[#0B3D91] hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <span>/</span>
          <span className="text-slate-700">Vendor Management</span>
        </div>

        <div className="mb-6 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0B3D91]">Officer controls</p>
              <h1 className="mt-2 text-3xl font-bold text-slate-950 md:text-4xl">Vendor verification console</h1>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
                Clear the KYC queue, inspect document hashes, and review the registered vendor inventory with strict RBAC controls.
              </p>
            </div>
            <div className="flex rounded-2xl border border-slate-200 bg-slate-50 p-1">
              {[
                { key: "queue", label: "KYC Queue" },
                { key: "all", label: "All Vendors" },
              ].map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key as typeof activeTab)}
                  className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeTab === tab.key ? "bg-[#0B3D91] text-white shadow" : "text-slate-600 hover:bg-white"}`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {activeTab === "queue" ? (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-2xl text-slate-950">KYC Queue</CardTitle>
              <CardDescription>Review incoming registrations and inspect their document hashes.</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Org Type</th>
                      <th className="px-6 py-4">KYC Level</th>
                      <th className="px-6 py-4">Days Waiting</th>
                      <th className="px-6 py-4">Documents</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {queueList.map((vendor) => (
                      <tr key={vendor.vendorId} className="hover:bg-slate-50/70">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-950">{vendor.companyName}</p>
                          <p className="mt-1 text-xs text-slate-500">{new Date(vendor.submittedAt).toLocaleDateString("en-IN")}</p>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{vendor.orgType}</td>
                        <td className="px-6 py-4">
                          <KYCStatusBadge status={vendor.kycLevel} />
                        </td>
                        <td className="px-6 py-4 text-slate-600">{vendor.daysWaiting}</td>
                        <td className="px-6 py-4">
                          <Button variant="outline" size="sm" className="border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91]/5" onClick={() => setDocsModal(vendor)}>
                            <FileText className="mr-1 h-4 w-4" />
                            View Docs
                          </Button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="border-red-200 text-red-700 hover:bg-red-50"
                              onClick={() => setConfirmAction({ vendorId: vendor.vendorId, companyName: vendor.companyName, action: "rejected" })}
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              className="bg-[#138808] hover:bg-[#0f6b06]"
                              onClick={() => setConfirmAction({ vendorId: vendor.vendorId, companyName: vendor.companyName, action: "approved" })}
                            >
                              <CheckCircle2 className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : null}

        {activeTab === "all" ? (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div>
                  <CardTitle className="text-2xl text-slate-950">All Vendors</CardTitle>
                  <CardDescription>Search and filter the full vendor directory.</CardDescription>
                </div>
                <div className="grid gap-3 lg:grid-cols-4">
                  <div className="relative lg:min-w-72">
                    <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input value={search} onChange={(event) => setSearch(event.target.value)} className="pl-9" placeholder="Search company, type, or state" />
                  </div>
                  <select value={kycFilter} onChange={(event) => setKycFilter(event.target.value)} className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm">
                    <option value="all">All KYC</option>
                    <option value="pending">Pending</option>
                    <option value="under-review">Under Review</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                  <select value={msmeFilter} onChange={(event) => setMsmeFilter(event.target.value)} className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm">
                    <option value="all">All MSME</option>
                    <option value="true">MSME Only</option>
                    <option value="false">Non-MSME</option>
                  </select>
                  <select value={stateFilter} onChange={(event) => setStateFilter(event.target.value)} className="h-10 rounded-md border border-slate-300 bg-white px-3 text-sm">
                    <option value="all">All States</option>
                    {stateOptions.map((state) => (
                      <option key={state} value={state}>
                        {state}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                    <tr>
                      <th className="px-6 py-4">Company</th>
                      <th className="px-6 py-4">Type</th>
                      <th className="px-6 py-4">KYC Badge</th>
                      <th className="px-6 py-4">MSME</th>
                      <th className="px-6 py-4">Registered</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredVendors.map((vendor) => (
                      <tr key={vendor.id} className="hover:bg-slate-50/70">
                        <td className="px-6 py-4">
                          <p className="font-semibold text-slate-950">{vendor.companyName}</p>
                          <p className="mt-1 text-xs text-slate-500">{vendor.state}</p>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{vendor.orgType}</td>
                        <td className="px-6 py-4">
                          <KYCStatusBadge status={vendor.kycStatus} />
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className={vendor.msme ? "border-emerald-200 bg-emerald-50 text-emerald-800" : "border-slate-200 bg-slate-100 text-slate-700"}>
                            {vendor.msme ? "MSME" : "Standard"}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{new Date(vendor.registeredAt).toLocaleDateString("en-IN")}</td>
                        <td className="px-6 py-4 text-right">
                          <Button variant="outline" size="sm" className="border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91]/5" onClick={() => setSelectedVendor(vendor)}>
                            Review
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>

      {docsModal ? (
        <ModalShell title={`${docsModal.companyName} documents`} onClose={() => setDocsModal(null)}>
          <div className="space-y-4">
            {docsModal.docs.map((doc) => (
              <div key={doc.ipfsHash} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-950">{doc.name}</p>
                <div className="mt-3">
                  <IPFSHashPill hash={doc.ipfsHash} />
                </div>
              </div>
            ))}
          </div>
        </ModalShell>
      ) : null}

      {confirmAction ? (
        <ModalShell title={`${confirmAction.action === "approved" ? "Approve" : "Reject"} ${confirmAction.companyName}?`} onClose={() => setConfirmAction(null)}>
          <p className="text-sm leading-6 text-slate-600">
            {confirmAction.action === "approved"
              ? "This will move the vendor into the approved state and remove them from the active KYC queue."
              : "This will mark the vendor as rejected and remove them from the active KYC queue."}
          </p>
          <div className="mt-6 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setConfirmAction(null)} className="border-slate-300 text-slate-700">
              Cancel
            </Button>
            <Button
              onClick={handleQueueDecision}
              className={confirmAction.action === "approved" ? "bg-[#138808] hover:bg-[#0f6b06]" : "bg-red-600 hover:bg-red-700"}
            >
              Confirm
            </Button>
          </div>
        </ModalShell>
      ) : null}

      {selectedVendor ? (
        <ModalShell title={selectedVendor.companyName} onClose={() => setSelectedVendor(null)}>
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { label: "Org Type", value: selectedVendor.orgType },
              { label: "State", value: selectedVendor.state },
              { label: "KYC Status", value: selectedVendor.kycStatus },
              { label: "Registered", value: new Date(selectedVendor.registeredAt).toLocaleDateString("en-IN") },
            ].map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                <p className="mt-2 text-sm font-semibold text-slate-950">{item.value}</p>
              </div>
            ))}
          </div>
        </ModalShell>
      ) : null}
    </div>
  )
}

function ModalShell({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: React.ReactNode
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm">
      <div className="w-full max-w-2xl rounded-3xl border border-white/10 bg-white p-6 shadow-2xl">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0B3D91]">Officer modal</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950">{title}</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full px-2 py-1 text-slate-500 hover:bg-slate-100 hover:text-slate-700">
            ×
          </button>
        </div>
        {children}
      </div>
    </div>
  )
}