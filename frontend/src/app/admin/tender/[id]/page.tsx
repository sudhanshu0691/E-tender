"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, ChevronRight, Clock3, FileText, Gavel } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { BlockchainTxModal } from "@/components/BlockchainTxModal"
import { WinnerBanner } from "@/components/WinnerBanner"
import { AuditTimeline } from "@/components/AuditTimeline"
import { EncryptedBidBadge } from "@/components/EncryptedBidBadge"
import { IPFSHashPill } from "@/components/IPFSHashPill"
import tendersData from "@/data/tenders.json"
import tenderBidsData from "@/data/tenderBids.json"
import auditEventsData from "@/data/auditEvents.json"

type TenderBid = {
  bidderId: string
  walletAddress: string
  submittedAt: string
  encrypted: boolean
  price: number
  scores: Record<string, number>
}

type AuditEvent = {
  type: string
  label: string
  timestamp: string
  txHash: string
  data?: Record<string, unknown>
}

const scoreFields = [
  { key: "price", label: "Price" },
  { key: "financial", label: "Financial" },
  { key: "experience", label: "Experience" },
  { key: "performance", label: "Performance" },
  { key: "technical", label: "Technical" },
  { key: "compliance", label: "Compliance" },
  { key: "proposal", label: "Proposal" },
] as const

const scoreWeights = {
  price: 40,
  financial: 15,
  experience: 15,
  performance: 10,
  technical: 10,
  compliance: 5,
  proposal: 5,
}

function truncateWallet(wallet: string) {
  return `${wallet.slice(0, 8)}…${wallet.slice(-6)}`
}

function calculateTotal(scores: Record<string, number | null>) {
  return scoreFields.reduce((total, field) => {
    const value = scores[field.key] ?? 0
    return total + (value * scoreWeights[field.key]) / 10
  }, 0)
}

export default function AdminTenderPage() {
  const params = useParams<{ id: string }>()
  const tenderId = Array.isArray(params.id) ? params.id[0] : params.id
  const tender = tendersData.find((item) => item.id === tenderId) ?? tendersData[0]
  const bids = useMemo(() => (tenderBidsData as Record<string, TenderBid[]>)[tender.id] ?? [], [tender.id])
  const auditEvents = useMemo(() => (auditEventsData as Record<string, AuditEvent[]>)[tender.id] ?? [], [tender.id])
  const deadlinePassed = Boolean(tender.deadlinePassed)

  const [activeTab, setActiveTab] = useState<"bids" | "audit" | "info">("bids")
  const [scoreMap, setScoreMap] = useState<Record<string, Record<string, number | null>>>({})
  const [txOpen, setTxOpen] = useState(false)
  const [winner, setWinner] = useState<{ name: string; score: number } | null>(null)

  useEffect(() => {
    const initialScores = bids.reduce((accumulator, bid) => {
      accumulator[bid.bidderId] = scoreFields.reduce(
        (scoreAccumulator, field) => ({
          ...scoreAccumulator,
          [field.key]: bid.scores?.[field.key] > 0 ? bid.scores[field.key] : null,
        }),
        {},
      )
      return accumulator
    }, {} as Record<string, Record<string, number | null>>)

    setScoreMap(initialScores)
    setWinner(null)
  }, [bids, tender.id])

  const budgetRange =
    {
      "TC-MH-2024-883": "₹ 4,200 Cr - ₹ 4,500 Cr",
      "TC-DL-2024-102": "₹ 110 Cr - ₹ 125 Cr",
      "TC-RJ-2024-405": "₹ 1,950 Cr - ₹ 2,100 Cr",
    }[tender.id] ?? tender.budget

  const documentHash =
    {
      "TC-MH-2024-883": "ipfs://QmTenderSpec883",
      "TC-DL-2024-102": "ipfs://QmTenderSpec102",
      "TC-RJ-2024-405": "ipfs://QmTenderSpec405",
    }[tender.id] ?? tender.hash

  const countdownLabel =
    {
      "TC-MH-2024-883": "14d 05h 23m",
      "TC-DL-2024-102": "Deadline passed",
      "TC-RJ-2024-405": "Deadline passed",
    }[tender.id] ?? (deadlinePassed ? "Deadline passed" : "Open for bidding")

  const allScoresFilled = bids.every((bid) =>
    scoreFields.every((field) => scoreMap[bid.bidderId]?.[field.key] !== null),
  )

  const bidResults = bids.map((bid) => {
    const scores = scoreMap[bid.bidderId] ?? {}
    return {
      ...bid,
      scores,
      total: calculateTotal(scores),
    }
  })

  const handleScoreChange = (bidderId: string, fieldKey: string, value: string) => {
    setScoreMap((current) => ({
      ...current,
      [bidderId]: {
        ...(current[bidderId] ?? {}),
        [fieldKey]: value === "" ? null : Number(value),
      },
    }))
  }

  const declareWinner = () => {
    setTxOpen(true)
  }

  const handleWinnerDeclared = () => {
    const topBid = bidResults.reduce(
      (best, current) => (current.total > best.total ? current : best),
      bidResults[0],
    )
    setWinner({ name: topBid?.bidderId ?? "Winner", score: topBid?.total ?? 0 })
    setTxOpen(false)
  }

  const statusStyles: Record<string, string> = {
    Open: "bg-emerald-100 text-emerald-800 border-emerald-200",
    Closed: "bg-slate-100 text-slate-700 border-slate-200",
    Awarded: "bg-[#138808]/10 text-[#138808] border-[#138808]/20",
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[linear-gradient(180deg,#F8F9FC_0%,#EEF3FA_100%)]">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/admin" className="inline-flex items-center gap-1.5 font-medium text-[#0B3D91] hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <span>/</span>
          <span className="truncate text-slate-700">Manage Tender</span>
        </div>

        <Card className="mb-6 border-slate-200 shadow-sm">
          <CardContent className="space-y-5 p-6 lg:p-8">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className={statusStyles[tender.status] ?? "bg-slate-100 text-slate-700 border-slate-200"}>
                    {tender.status}
                  </Badge>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-mono text-slate-600">{tender.id}</span>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-950 md:text-4xl">{tender.title}</h1>
                  <p className="mt-2 max-w-3xl text-sm text-slate-600">{tender.department}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                    <Gavel className="h-4 w-4 text-[#0B3D91]" />
                    Budget range: {budgetRange}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                    <Clock3 className="h-4 w-4 text-[#0B3D91]" />
                    {countdownLabel}
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1.5">
                    <FileText className="h-4 w-4 text-[#0B3D91]" />
                    <IPFSHashPill hash={documentHash} />
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-3 lg:items-end">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Tender budget</p>
                  <p className="mt-2 text-xl font-bold text-slate-950">{tender.budget}</p>
                </div>
                {deadlinePassed && activeTab === "bids" ? (
                  <Button disabled={!allScoresFilled || Boolean(winner)} onClick={declareWinner} className="bg-[#138808] hover:bg-[#0f6b06]">
                    Declare Winner
                  </Button>
                ) : null}
              </div>
            </div>
          </CardContent>
        </Card>

        {winner ? <WinnerBanner winnerName={winner.name} score={winner.score} /> : null}

        <div className="mb-6 flex flex-wrap gap-2 rounded-2xl border border-slate-200 bg-white p-2 shadow-sm">
          {[
            { key: "bids", label: "Bids" },
            { key: "audit", label: "Audit Trail" },
            { key: "info", label: "Tender Info" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key as typeof activeTab)}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold transition ${activeTab === tab.key ? "bg-[#0B3D91] text-white shadow" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "bids" ? (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-2xl text-slate-950">Bid evaluation</CardTitle>
              <CardDescription>
                {deadlinePassed
                  ? "Reveal the price, score every bidder, and declare the winner once all fields are filled."
                  : "The bid vault is still encrypted until the deadline passes."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-5 p-6 lg:p-8">
              {!deadlinePassed ? (
                <div className="overflow-x-auto rounded-2xl border border-slate-200">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
                      <tr>
                        <th className="px-5 py-4">Bidder Wallet</th>
                        <th className="px-5 py-4">Submitted</th>
                        <th className="px-5 py-4">State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {bids.map((bid) => (
                        <tr key={bid.bidderId} className="hover:bg-slate-50/70">
                          <td className="px-5 py-4 font-mono text-slate-700">{truncateWallet(bid.walletAddress)}</td>
                          <td className="px-5 py-4 text-slate-600">{new Date(bid.submittedAt).toLocaleString("en-IN")}</td>
                          <td className="px-5 py-4">
                            <EncryptedBidBadge />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="space-y-4">
                  {bidResults.map((bid) => (
                    <Card key={bid.bidderId} className="border-slate-200 shadow-sm">
                      <CardContent className="space-y-5 p-5">
                        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                          <div>
                            <div className="flex flex-wrap items-center gap-2">
                              <p className="font-semibold text-slate-950">{truncateWallet(bid.walletAddress)}</p>
                              <Badge variant="outline" className="bg-[#0B3D91]/10 text-[#0B3D91] border-[#0B3D91]/20">
                                Revealed
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-slate-500">Submitted {new Date(bid.submittedAt).toLocaleString("en-IN")}</p>
                          </div>
                          <div className="rounded-2xl bg-slate-50 px-4 py-3 text-sm text-slate-600">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Bid price</p>
                            <p className="mt-1 font-mono text-base font-semibold text-slate-950">₹ {Number(bid.price).toLocaleString("en-IN")}</p>
                          </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                          {scoreFields.map((field) => (
                            <label key={field.key} className="space-y-2 rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm">
                              <span className="block font-medium text-slate-700">{field.label}</span>
                              <input
                                type="number"
                                min={0}
                                max={10}
                                value={scoreMap[bid.bidderId]?.[field.key] ?? ""}
                                onChange={(event) => handleScoreChange(bid.bidderId, field.key, event.target.value)}
                                className="h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm"
                              />
                            </label>
                          ))}
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white p-4">
                          <p className="text-sm font-semibold text-slate-950">Weighted total</p>
                          <p className="text-2xl font-bold text-[#0B3D91]">{bid.total.toFixed(2)}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-4">
                    <p className="text-sm text-slate-500">
                      {allScoresFilled ? "All bid scores are filled and the winner can be declared." : "Complete every score field before declaring the winner."}
                    </p>
                    <Button disabled={!allScoresFilled || Boolean(winner)} onClick={declareWinner} className="bg-[#138808] hover:bg-[#0f6b06]">
                      Declare Winner <ChevronRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ) : null}

        {activeTab === "audit" ? (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-2xl text-slate-950">Audit Trail</CardTitle>
              <CardDescription>Immutable lifecycle events attached to this tender.</CardDescription>
            </CardHeader>
            <CardContent className="p-6 lg:p-8">
              <AuditTimeline events={auditEvents} />
            </CardContent>
          </Card>
        ) : null}

        {activeTab === "info" ? (
          <Card className="border-slate-200 shadow-sm">
            <CardHeader className="border-b border-slate-100 pb-4">
              <CardTitle className="text-2xl text-slate-950">Tender Information</CardTitle>
              <CardDescription>Summary of the tender metadata and controls.</CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 p-6 lg:grid-cols-2 lg:p-8">
              {[
                { label: "Tender ID", value: tender.id },
                { label: "Department", value: tender.department },
                { label: "Category", value: tender.category },
                { label: "State", value: tender.state },
                { label: "Budget", value: tender.budget },
                { label: "Status", value: tender.status },
                { label: "Deadline", value: new Date(tender.deadline).toLocaleString("en-IN") },
                { label: "Bids Received", value: String(tender.bidsReceived) },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                  <p className="mt-2 text-sm font-semibold text-slate-950">{item.value}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        ) : null}
      </div>

      <BlockchainTxModal
        open={txOpen}
        title="Declare winner"
        actionLabel="winner declaration"
        onClose={() => setTxOpen(false)}
        onComplete={handleWinnerDeclared}
      />
    </div>
  )
}