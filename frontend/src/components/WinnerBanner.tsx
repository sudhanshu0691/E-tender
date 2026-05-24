"use client"

import { motion } from "framer-motion"
import { Crown } from "lucide-react"

interface WinnerBannerProps {
  winnerName: string
  score: number
}

export function WinnerBanner({ winnerName, score }: WinnerBannerProps) {
  const confettiPieces = Array.from({ length: 12 }, (_, index) => ({
    left: `${6 + index * 7}%`,
    delay: `${index * 90}ms`,
    duration: `${1300 + index * 80}ms`,
    hue: (index * 29) % 360,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl border border-[#138808]/30 bg-gradient-to-r from-[#0B3D91] via-[#0F4AA9] to-[#138808] px-6 py-6 text-white shadow-xl"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.2),_transparent_36%)]" />
      <div className="relative flex items-center gap-4">
        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-[#FF9933] shadow-lg">
          <Crown className="h-8 w-8" />
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.35em] text-slate-200">Winner Declared</p>
          <h3 className="mt-1 text-2xl font-semibold">{winnerName}</h3>
          <p className="mt-1 text-sm text-slate-100/90">Top weighted score: {score.toFixed(2)}</p>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {confettiPieces.map((piece) => (
          <span
            key={`${piece.left}-${piece.delay}`}
            className="animate-confetti-fall absolute top-4 block h-2 w-3 rounded-sm"
            style={{
              left: piece.left,
              animationDelay: piece.delay,
              animationDuration: piece.duration,
              backgroundColor: `hsl(${piece.hue} 90% 65%)`,
              ["--confetti-x" as string]: `${Math.random() > 0.5 ? 1 : -1} ${18 + Math.random() * 36}px`,
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}

export default WinnerBanner