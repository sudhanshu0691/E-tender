import { ShieldCheck } from "lucide-react"

export function ImmutableBadge() {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-[#071A3A]/10 px-3 py-1 text-xs font-semibold text-[#0B3D91]">
      <ShieldCheck className="h-3.5 w-3.5 text-[#0B3D91]" />
      Immutable
    </span>
  )
}

export default ImmutableBadge
