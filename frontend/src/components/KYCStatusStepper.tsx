"use client"

import { useMemo } from "react"

type Step = { id: number; label: string }

export function KYCStatusStepper({ level }: { level: number }) {
  const steps: Step[] = useMemo(
    () => [
      { id: 0, label: "Submitted" },
      { id: 1, label: "Under Review" },
      { id: 2, label: "Verified" },
    ],
    [],
  )

  return (
    <div className="flex items-center gap-4">
      {steps.map((s) => {
        const active = s.id <= level
        return (
          <div key={s.id} className="flex items-center gap-3">
            <div className={`h-7 w-7 flex items-center justify-center rounded-full ${active ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
              {s.id + 1}
            </div>
            <div className="text-sm text-slate-700">{s.label}</div>
          </div>
        )
      })}
    </div>
  )
}

export default KYCStatusStepper
