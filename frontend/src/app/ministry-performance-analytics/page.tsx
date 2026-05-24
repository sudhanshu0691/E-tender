import { Building2, TrendingUp } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import tendersData from "@/data/tenders.json"

type MinistrySummary = {
  department: string
  total: number
  open: number
  awarded: number
  bids: number
}

export default function MinistryPerformanceAnalyticsPage() {
  const departmentMap = new Map<string, MinistrySummary>()

  for (const tender of tendersData) {
    const current = departmentMap.get(tender.department) ?? {
      department: tender.department,
      total: 0,
      open: 0,
      awarded: 0,
      bids: 0,
    }

    current.total += 1
    if (tender.status === "Open") current.open += 1
    if (tender.status === "Awarded") current.awarded += 1
    current.bids += Number(tender.bidsReceived ?? 0)

    departmentMap.set(tender.department, current)
  }

  const rows = Array.from(departmentMap.values()).sort((left, right) => right.total - left.total)

  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#0B3D91]/15 bg-[#0B3D91]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B3D91]">
          <TrendingUp className="h-3.5 w-3.5" />
          Ministry Analytics
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Ministry Performance Analytics</h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Ministry-wise performance indicators derived from published tenders and bid participation.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Department Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[760px] text-left text-sm">
              <thead className="border-y bg-slate-50 text-xs uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-4 py-3">Department</th>
                  <th className="px-4 py-3">Total Tenders</th>
                  <th className="px-4 py-3">Open</th>
                  <th className="px-4 py-3">Awarded</th>
                  <th className="px-4 py-3">Bid Participation</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {rows.map((row) => (
                  <tr key={row.department}>
                    <td className="px-4 py-3 font-medium text-slate-900">{row.department}</td>
                    <td className="px-4 py-3">{row.total}</td>
                    <td className="px-4 py-3 text-[#0B3D91]">{row.open}</td>
                    <td className="px-4 py-3 text-[#138808]">{row.awarded}</td>
                    <td className="px-4 py-3">{row.bids}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Participating Ministries</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">{rows.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Avg Bids per Tender</p>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {rows.length === 0
                ? "0"
                : (rows.reduce((sum, row) => sum + row.bids, 0) / rows.reduce((sum, row) => sum + row.total, 0)).toFixed(1)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Award Conversion</p>
            <p className="mt-2 text-3xl font-bold text-[#138808]">
              {tendersData.length === 0
                ? "0%"
                : `${Math.round((tendersData.filter((tender) => tender.status === "Awarded").length / tendersData.length) * 100)}%`}
            </p>
          </CardContent>
        </Card>
      </div>

      <p className="flex items-center gap-2 text-xs text-slate-500">
        <Building2 className="h-4 w-4" />
        Metrics are currently generated from local mock procurement data.
      </p>
    </div>
  )
}
