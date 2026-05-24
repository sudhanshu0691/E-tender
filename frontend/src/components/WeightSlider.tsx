"use client"

import { cn } from "@/lib/utils"

interface WeightSliderProps {
  label: string
  value: number
  onChange: (value: number) => void
  className?: string
}

export function WeightSlider({ label, value, onChange, className }: WeightSliderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-4">
        <label className="text-sm font-medium text-slate-700">{label}</label>
        <span className="rounded-full bg-[#0B3D91]/10 px-3 py-1 text-sm font-semibold text-[#0B3D91]">
          {value}%
        </span>
      </div>
      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-[#0B3D91]"
      />
    </div>
  )
}

export default WeightSlider