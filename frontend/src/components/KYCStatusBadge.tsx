import { Badge } from "@/components/ui/badge"

type KYCStatus = "pending" | "under-review" | "approved" | "rejected" | string

const variants: Record<string, string> = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  "under-review": "bg-blue-100 text-blue-800 border-blue-200",
  approved: "bg-emerald-100 text-emerald-800 border-emerald-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
}

export function KYCStatusBadge({ status }: { status: KYCStatus }) {
  const normalized = String(status).toLowerCase()

  return (
    <Badge variant="outline" className={`capitalize ${variants[normalized] ?? "bg-slate-100 text-slate-700 border-slate-200"}`}>
      {String(status).replace(/-/g, " ")}
    </Badge>
  )
}

export default KYCStatusBadge