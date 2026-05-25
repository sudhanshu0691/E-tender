'use client'

import Link from 'next/link'
import { ArrowLeft, AlertTriangle, Clock, FileText, BarChart3, Gavel, CheckCircle2, Bell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AuditTimeline } from '@/components/AuditTimeline'
import { BidCountdown } from '@/components/BidCountdown'
import IPFSHashPill from '@/components/IPFSHashPill'
import tendersData from '@/data/tenders.json'
import tenderBidsData from '@/data/tenderBids.json'
import auditEventsData from '@/data/auditEvents.json'

interface TenderItem {
  id: string
  tenderTitle: string
  nitNo: string
  department: string
  budget: number
  emrAmount: number
  deadline: string
  status: string
  category: string
  state: string
  verified: boolean
  bidsReceived: number
  hash: string
  deadlinePassed: boolean
  ipfsDocuments?: { name: string; type: string; ipfsHash: string }[]
  evaluationWeights: Record<string, number>
  winnerDeclaredAt: string | null
}

interface BidItem {
  bidderId: string
  companyName: string
  walletAddress: string
  bidHash: string
  submittedAt: string
  price: number
  scores: Record<string, number>
  totalScore: number
  status: string
  isWinner?: boolean
  documents?: { name: string; ipfsHash: string }[]
}

interface BidsData {
  tenderId: string
  tenderTitle: string
  deadline: string
  deadlinePassed: boolean
  evaluationWeights: Record<string, number>
  bids: BidItem[]
}

interface AuditEventItem {
  type: string
  label: string
  timestamp: string
  txHash: string
  data?: Record<string, unknown>
}

export default function PublicTenderDetailPage({ params }: { params: { id: string } }) {
  const { id } = params
  const tender = (tendersData as TenderItem[]).find((t) => t.id === id)
  const bidsData = (tenderBidsData as unknown as Record<string, BidsData>)[id]
  const auditEvents: AuditEventItem[] = (auditEventsData as unknown as Record<string, AuditEventItem[]>)[id] || []

  if (!tender) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/tenders" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8">
            <ArrowLeft className="h-4 w-4" />
            Back to Tenders
          </Link>
          <div className="text-center py-12">
            <AlertTriangle className="h-16 w-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Tender Not Found</h2>
          </div>
        </div>
      </div>
    )
  }

  const winnerBid = bidsData?.bids?.find((b) => b.isWinner)
  const totalBids = bidsData?.bids?.length || 0

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        <Link href="/tenders" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to Tenders
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{tender.tenderTitle}</h1>
              <p className="text-slate-600 dark:text-slate-300">NIT: {tender.nitNo}</p>
            </div>
            <Badge
              className={`${
                tender.status === 'Open'
                  ? 'bg-green-100 text-green-800'
                  : tender.status === 'Closed'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-purple-100 text-purple-800'
              }`}
            >
              {tender.status}
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Budget</p>
                <p className="text-2xl font-bold">₹ {(tender.budget / 10000000).toFixed(1)} Cr</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">Bids Received</p>
                <p className="text-2xl font-bold">{totalBids}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <p className="text-xs text-slate-600 dark:text-slate-400 mb-1">EMR Amount</p>
                <p className="text-2xl font-bold">₹ {(tender.emrAmount / 10000000).toFixed(2)} Cr</p>
              </CardContent>
            </Card>
          </div>

          {!bidsData?.deadlinePassed && <BidCountdown deadline={tender.deadline} />}

          {tender.status === 'Open' && !tender.deadlinePassed && (
            <div className="mt-6 bg-[#0B3D91]/5 border border-[#0B3D91]/20 rounded-lg p-6 flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-[#0B3D91]">Interested in this tender?</h3>
                <p className="text-sm text-slate-600 mt-1">Submit your encrypted bid before the deadline.</p>
              </div>
              <Link href={`/tenders/${id}/bid`}>
                <Button className="bg-[#138808] hover:bg-[#138808]/90 font-semibold">
                  <Gavel className="mr-2 h-4 w-4" />
                  Submit Bid
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Winner Card */}
        {winnerBid && (
          <Card className="mb-8 border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-green-900 dark:text-green-300 mb-1">Winner Declared</p>
                  <p className="text-green-800 dark:text-green-400">
                    <span className="font-bold">{winnerBid.companyName}</span> with a score of{' '}
                    <span className="font-bold">{winnerBid.totalScore.toFixed(2)}/100</span>
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Tender Documents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Tender Documents
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {tender.ipfsDocuments?.map((doc) => (
                <div key={doc.ipfsHash} className="p-3 border rounded-lg flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-blue-600" />
                    <div>
                      <p className="font-medium">{doc.name}</p>
                      <p className="text-xs text-slate-500">{doc.type}</p>
                    </div>
                  </div>
                  <div>
                    <IPFSHashPill hash={doc.ipfsHash} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Evaluation Criteria */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Evaluation Criteria
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">Price</p>
                <p className="text-2xl font-bold">{(tender.evaluationWeights.price * 100).toFixed(0)}%</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">Financial</p>
                <p className="text-2xl font-bold">{(tender.evaluationWeights.financial * 100).toFixed(0)}%</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">Experience</p>
                <p className="text-2xl font-bold">{(tender.evaluationWeights.experience * 100).toFixed(0)}%</p>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <p className="text-sm text-slate-600 dark:text-slate-400">Technical</p>
                <p className="text-2xl font-bold">{(tender.evaluationWeights.technical * 100).toFixed(0)}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Corrigendums / Amendments (P2.7) */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-amber-500" />
              Corrigendums &amp; Amendments
            </CardTitle>
          </CardHeader>
          <CardContent>
            {tender.status === 'Open' ? (
              <div className="space-y-3">
                <div className="border border-amber-200 bg-amber-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-amber-100 text-amber-800">Corrigendum #1</Badge>
                    <span className="text-xs text-gray-500">Published: {new Date(new Date(tender.deadline).getTime() - 7 * 86400000).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">Deadline Extended</p>
                  <p className="text-sm text-gray-600 mt-1">The bid submission deadline has been extended by 7 days to allow for additional queries from prospective bidders.</p>
                </div>
                <div className="border border-blue-200 bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className="bg-blue-100 text-blue-800">Amendment #1</Badge>
                    <span className="text-xs text-gray-500">Published: {new Date(new Date(tender.deadline).getTime() - 14 * 86400000).toLocaleDateString()}</span>
                  </div>
                  <p className="text-sm text-gray-700 font-medium">Updated Technical Specifications</p>
                  <p className="text-sm text-gray-600 mt-1">Section 4.2 of the technical requirements has been updated. Revised document available in the documents section above.</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No corrigendums were issued for this tender.</p>
            )}
          </CardContent>
        </Card>

        {/* Bid Scorecards */}
        {winnerBid && (
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Bid Evaluation Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-slate-100 dark:bg-slate-800">
                    <tr>
                      <th className="px-4 py-2 text-left">Company</th>
                      <th className="px-4 py-2 text-right">Price Score</th>
                      <th className="px-4 py-2 text-right">Financial</th>
                      <th className="px-4 py-2 text-right">Experience</th>
                      <th className="px-4 py-2 text-right">Total Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bidsData?.bids?.map((bid) => (
                      <tr key={bid.bidderId} className={bid.isWinner ? 'bg-green-50 dark:bg-green-900/20 font-bold' : ''}>
                        <td className="px-4 py-3">{bid.companyName}</td>
                        <td className="px-4 py-3 text-right">{bid.scores.price}</td>
                        <td className="px-4 py-3 text-right">{bid.scores.financial}</td>
                        <td className="px-4 py-3 text-right">{bid.scores.experience}</td>
                        <td className="px-4 py-3 text-right text-teal-600">{bid.totalScore.toFixed(2)} {bid.isWinner && '🏆'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Audit Timeline */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Blockchain Audit Trail
            </CardTitle>
          </CardHeader>
          <CardContent>
            {auditEvents.length > 0 ? (
              <AuditTimeline events={auditEvents} />
            ) : (
              <p className="text-slate-500">No events recorded yet.</p>
            )}
          </CardContent>
        </Card>

        {/* Raise Dispute */}
        {tender.status !== 'Open' && (
          <Card className="border-amber-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Gavel className="h-5 w-5" />
                Dispute or Appeal
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
                If you believe the evaluation or bidding process was conducted incorrectly, you may file a dispute.
              </p>
              <Link href={`/dispute/${id}`}>
                <Button className="bg-amber-600 text-white hover:bg-amber-700">
                  Raise Dispute
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
