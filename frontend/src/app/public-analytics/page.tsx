import Link from "next/link"
import { BarChart3, FileCheck2, Landmark, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import tendersData from "@/data/tenders.json"
import vendorsData from "@/data/vendors.json"

const currencyFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
})

export default function PublicAnalyticsPage() {
  const totalTenders = tendersData.length
  const openTenders = tendersData.filter((tender) => tender.status === "Open").length
  const awardedTenders = tendersData.filter((tender) => tender.status === "Awarded").length
  const totalBudget = tendersData.reduce((sum, tender) => sum + Number(tender.budget), 0)
  const approvedVendors = vendorsData.filter((vendor) => vendor.kycStatus === "approved").length

  return (
    <div className="mx-auto max-w-7xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#0B3D91]/15 bg-[#0B3D91]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B3D91]">
          <BarChart3 className="h-3.5 w-3.5" />
          Public Analytics
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Procurement Transparency Metrics</h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Snapshot of tender activity, procurement volume, and onboarding quality across TenderChain.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Total Tenders</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-slate-900">{totalTenders}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Open</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-[#0B3D91]">{openTenders}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Awarded</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-[#138808]">{awardedTenders}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Registered Vendors</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-slate-900">{vendorsData.length}</CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-slate-500">Approved KYC</CardTitle>
          </CardHeader>
          <CardContent className="text-3xl font-bold text-[#138808]">{approvedVendors}</CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Tender Value and Verification</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Total Published Value</p>
            <p className="mt-2 text-xl font-semibold text-slate-900">{currencyFormatter.format(totalBudget)}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Blockchain Verifiable</p>
            <p className="mt-2 flex items-center gap-2 text-xl font-semibold text-slate-900">
              <ShieldCheck className="h-5 w-5 text-[#0B3D91]" />
              100%
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Procurement Integrity</p>
            <p className="mt-2 flex items-center gap-2 text-xl font-semibold text-[#138808]">
              <FileCheck2 className="h-5 w-5" />
              Auditable
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="rounded-2xl border border-[#0B3D91]/15 bg-white p-6">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-slate-900">
          <Landmark className="h-5 w-5 text-[#0B3D91]" />
          Explore More Insights
        </h2>
        <div className="mt-4 flex flex-wrap gap-3 text-sm">
          <Link href="/ministry-performance-analytics" className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">
            Ministry Performance
          </Link>
          <Link href="/vendor-performance-tracking" className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">
            Vendor Performance
          </Link>
          <Link href="/ledger" className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">
            Transparency Ledger
          </Link>
        </div>
      </div>
    </div>
  )
}
