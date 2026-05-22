import { Lock } from "lucide-react"

export function EncryptedBidBadge() {
  return (
    <span
      title="Encrypted bid. Price stays hidden until the deadline passes."
      className="inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-800"
    >
      <Lock className="h-3.5 w-3.5" />
      Encrypted
    </span>
  )
}