"use client"

import { useEffect, useState } from "react"
import { Clock } from "lucide-react"

interface BidCountdownProps {
  deadline: string
  onExpired?: () => void
}

export function BidCountdown({ deadline, onExpired }: BidCountdownProps) {
  const [timeLeft, setTimeLeft] = useState<{
    days: number
    hours: number
    minutes: number
    seconds: number
    isExpired: boolean
  } | null>(null)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const targetDate = new Date(deadline).getTime()
      const now = new Date().getTime()
      const diff = targetDate - now

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isExpired: true,
        })
        onExpired?.()
        return
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24))
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24)
      const minutes = Math.floor((diff / 1000 / 60) % 60)
      const seconds = Math.floor((diff / 1000) % 60)

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isExpired: false,
      })
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)
    return () => clearInterval(interval)
  }, [deadline, onExpired])

  if (!timeLeft) {
    return null
  }

  const { days, hours, minutes, seconds, isExpired } = timeLeft
  const hoursRemaining = days * 24 + hours
  const isWarning = hoursRemaining < 48
  const isCritical = hoursRemaining < 24

  if (isExpired) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-sm font-medium">
        <Clock className="h-4 w-4" />
        Bid Submission Closed
      </div>
    )
  }

  const bgColor = isCritical ? "bg-red-100" : isWarning ? "bg-amber-100" : "bg-blue-100"
  const textColor = isCritical ? "text-red-700" : isWarning ? "text-amber-700" : "text-blue-700"
  const dotColor = isCritical ? "bg-red-500" : isWarning ? "bg-amber-500" : "bg-blue-500"

  return (
    <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full ${bgColor} ${textColor} text-sm font-medium font-mono`}>
      <span className={`h-2 w-2 rounded-full ${dotColor} animate-pulse`}></span>
      {String(days).padStart(2, "0")}:{String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </div>
  )
}

export default BidCountdown
