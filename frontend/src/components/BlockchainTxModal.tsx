"use client"

import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import { CheckCircle2, Loader2, ShieldCheck, X } from "lucide-react"
import { Button } from "@/components/ui/button"

type TxStage = "broadcasting" | "confirming" | "confirmed"

interface BlockchainTxModalProps {
  open: boolean
  title: string
  actionLabel: string
  onComplete?: (txHash: string) => void
  onClose?: () => void
}

function createTxHash() {
  const randomBytes = Array.from({ length: 32 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
  return `0x${randomBytes}`
}

export function BlockchainTxModal({ open, title, actionLabel, onComplete, onClose }: BlockchainTxModalProps) {
  const [stage, setStage] = useState<TxStage>("broadcasting")
  const [txHash, setTxHash] = useState("")

  const stageCopy = useMemo(
    () => ({
      broadcasting: {
        title: "Broadcasting transaction",
        description: `Submitting ${actionLabel} to the blockchain network.`,
      },
      confirming: {
        title: "Waiting for confirmations",
        description: "Network validators are finalizing the record.",
      },
      confirmed: {
        title: "Transaction confirmed",
        description: "The operation is now immutably recorded.",
      },
    }),
    [actionLabel],
  )

  useEffect(() => {
    if (!open) {
      return
    }

    const hash = createTxHash()
    setTxHash(hash)
    setStage("broadcasting")

    const confirmTimer = window.setTimeout(() => setStage("confirming"), 1200)
    const completeTimer = window.setTimeout(() => {
      setStage("confirmed")
      window.setTimeout(() => onComplete?.(hash), 650)
    }, 2600)

    return () => {
      window.clearTimeout(confirmTimer)
      window.clearTimeout(completeTimer)
    }
  }, [onComplete, open])

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/60 px-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-[#071A3A] text-white shadow-2xl"
            initial={{ scale: 0.95, y: 16 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.96, y: 12 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.12),_transparent_42%)]" />
            <div className="relative flex items-center justify-between border-b border-white/10 px-6 py-4">
              <div>
                <p className="text-xs uppercase tracking-[0.35em] text-slate-300">On-Chain Action</p>
                <h3 className="mt-1 text-xl font-semibold text-white">{title}</h3>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="relative space-y-6 px-6 py-8">
              <div className="flex items-start gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#0B3D91]/30 text-[#FF9933]">
                  {stage === "confirmed" ? <CheckCircle2 className="h-7 w-7 text-[#138808]" /> : <Loader2 className="h-7 w-7 animate-spin" />}
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold">{stageCopy[stage].title}</p>
                  <p className="mt-1 text-sm leading-6 text-slate-300">{stageCopy[stage].description}</p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-900/70 p-4">
                <div className="mb-2 flex items-center justify-between text-xs uppercase tracking-[0.3em] text-slate-400">
                  <span>Status</span>
                  <span>{stage}</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${stage === "broadcasting" ? "w-1/3 bg-[#FF9933]" : stage === "confirming" ? "w-2/3 bg-[#0B3D91]" : "w-full bg-[#138808]"}`}
                  />
                </div>
              </div>

              {stage === "confirmed" ? (
                <div className="rounded-2xl border border-[#138808]/40 bg-[#138808]/10 p-4 text-sm text-slate-100">
                  <div className="mb-2 flex items-center gap-2 text-[#8DF09A]">
                    <ShieldCheck className="h-4 w-4" />
                    <span className="font-medium">Transaction hash</span>
                  </div>
                  <p className="break-all font-mono text-xs text-slate-200">{txHash}</p>
                </div>
              ) : (
                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-300">
                  Please keep this modal open until the blockchain confirmation completes.
                </div>
              )}

              <div className="flex justify-end gap-3">
                {stage === "confirmed" ? (
                  <Button onClick={onClose} className="bg-[#138808] hover:bg-[#138808]/90">
                    Continue
                  </Button>
                ) : (
                  <Button variant="outline" onClick={onClose} className="border-white/20 bg-transparent text-white hover:bg-white/10">
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default BlockchainTxModal