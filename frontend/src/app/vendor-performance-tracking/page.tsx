import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import vendorsData from "@/data/vendors.json"

type KycStatus = "approved" | "under-review" | "pending" | "rejected"

type VendorRow = {
  id: string
  companyName: string
  orgType: string
  kycStatus: KycStatus
  state: string
  msme: boolean
  registeredAt: string
}

const statusTone: Record<KycStatus, string> = {
  approved: "bg-emerald-100 text-emerald-800",
  "under-review": "bg-amber-100 text-amber-800",
  pending: "bg-slate-100 text-slate-700",
  rejected: "bg-red-100 text-red-800",
}

export default function VendorPerformanceTrackingPage() {
  const rows = [...(vendorsData as VendorRow[])].sort(
    (left, right) => new Date(right.registeredAt).getTime() - new Date(left.registeredAt).getTime(),
  )

  const approved = rows.filter((row) => row.kycStatus === "approved").length
  const underReview = rows.filter((row) => row.kycStatus === "under-review").length
  const msmeCount = rows.filter((row) => row.msme).length

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="inline-flex items-center rounded-full border border-[#0B3D91]/15 bg-[#0B3D91]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B3D91]">
          Vendor Performance
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Vendor Performance Tracking</h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Vendor onboarding and readiness indicators based on KYC progression, organization profile, and registration cadence.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Total Vendors</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{rows.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">KYC Approved</p>
            <p className="mt-2 text-3xl font-bold text-[#138808]">{approved}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">MSME Participation</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{msmeCount}</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vendor Onboarding Register</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Vendor</th>
                  <th className="px-4 py-3">Org Type</th>
                  <th className="px-4 py-3">State</th>
                  <th className="px-4 py-3">KYC Status</th>
                  <th className="px-4 py-3">MSME</th>
                  <th className="px-4 py-3">Registered</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((row) => (
                  <tr key={row.id}>
                    <td className="px-4 py-3">
                      <p className="font-medium text-slate-900">{row.companyName}</p>
                      <p className="text-xs text-slate-500">{row.id}</p>
                    </td>
                    <td className="px-4 py-3">{row.orgType}</td>
                    <td className="px-4 py-3">{row.state}</td>
                    <td className="px-4 py-3">
                      <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusTone[row.kycStatus]}`}>
                        {row.kycStatus}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.msme ? "Yes" : "No"}</td>
                    <td className="px-4 py-3">{new Date(row.registeredAt).toLocaleDateString("en-IN")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-4 text-xs text-slate-500">
            Under-review vendors: <span className="font-semibold text-slate-700">{underReview}</span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
