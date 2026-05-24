"use client"

import { useState } from "react"
import { Check, Copy, ExternalLink } from "lucide-react"

function normalizeHash(hash: string) {
  return hash.replace(/^ipfs:\/\//, "")
}

export function IPFSHashPill({ hash }: { hash: string }) {
  const [copied, setCopied] = useState(false)
  const normalized = normalizeHash(hash)
  const displayValue = normalized.length > 18 ? `${normalized.slice(0, 8)}…${normalized.slice(-6)}` : normalized

  const handleCopy = async () => {
    await navigator.clipboard.writeText(hash)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-mono text-slate-700 shadow-sm">
      <span title={hash}>{displayValue}</span>
      <button type="button" onClick={handleCopy} className="rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-slate-700">
        {copied ? <Check className="h-3.5 w-3.5 text-[#138808]" /> : <Copy className="h-3.5 w-3.5" />}
      </button>
      <a
        href={`https://ipfs.io/ipfs/${normalized}`}
        target="_blank"
        rel="noreferrer"
        className="rounded-full p-1 text-slate-400 transition hover:bg-slate-200 hover:text-[#0B3D91]"
      >
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}

export default IPFSHashPill