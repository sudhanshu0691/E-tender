import { Clock3, ExternalLink } from "lucide-react"

export interface AuditEvent {
  type: string
  label: string
  timestamp: string
  txHash: string
  data?: Record<string, unknown>
}

export function AuditTimeline({ events }: { events: AuditEvent[] }) {
  return (
    <div className="relative space-y-5 pl-2">
      <div className="absolute left-[14px] top-2 h-[calc(100%-1rem)] w-px bg-slate-200" />
      {events.map((event) => (
        <div key={`${event.timestamp}-${event.type}`} className="relative flex gap-4">
          <div className="relative z-10 mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-[#0B3D91]/10 text-[#0B3D91]">
            <Clock3 className="h-4 w-4" />
          </div>
          <div className="flex-1 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#0B3D91]/10 px-2.5 py-1 text-xs font-semibold uppercase tracking-wide text-[#0B3D91]">
                {event.type}
              </span>
              <p className="text-sm font-semibold text-slate-900">{event.label}</p>
            </div>
            <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-slate-500">
              <span>{new Date(event.timestamp).toLocaleString()}</span>
              <span className="font-mono text-slate-600">{event.txHash}</span>
              <span className="inline-flex items-center gap-1 text-[#0B3D91]">
                <ExternalLink className="h-3.5 w-3.5" />
                On-chain proof
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}