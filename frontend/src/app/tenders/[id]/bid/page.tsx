"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowLeft,
  Upload,
  CheckCircle2,
  Lock,
  ShieldCheck,
  AlertTriangle,
  FileText,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { BlockchainTxModal } from "@/components/BlockchainTxModal"
import tendersData from "@/data/tenders.json"

interface TenderData {
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
  deadlinePassed: boolean
  evaluationWeights: Record<string, number>
}

export default function BidSubmissionPage({ params }: { params: { id: string } }) {
  const { id } = params
  const tender = (tendersData as TenderData[]).find((t) => t.id === id)

  const [step, setStep] = useState(1)
  const [bidAmount, setBidAmount] = useState("")
  const [technicalScore, setTechnicalScore] = useState("")
  const [experience, setExperience] = useState("")
  const [documents, setDocuments] = useState<{ name: string; hash: string }[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [emdConfirmed, setEmdConfirmed] = useState(false)
  const [declarationAccepted, setDeclarationAccepted] = useState(false)
  const [txOpen, setTxOpen] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [bidHash] = useState(
    "0x" + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join("")
  )

  if (!tender) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
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

  if (tender.status !== "Open" || tender.deadlinePassed) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/tenders/${id}`}
            className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Tender
          </Link>
          <div className="text-center py-12">
            <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Bidding Closed</h2>
            <p className="text-gray-600">This tender is no longer accepting bids.</p>
          </div>
        </div>
      </div>
    )
  }

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const hash = "Qm" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 10)
    setDocuments((prev) => [...prev, { name: file.name, hash }])
    setIsUploading(false)
    e.target.value = ""
  }

  const handleSubmitBid = () => {
    if (!bidAmount || !declarationAccepted || !emdConfirmed) {
      alert("Please fill all required fields and accept the declaration.")
      return
    }
    setTxOpen(true)
  }

  const handleTxComplete = () => {
    setTxOpen(false)
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-2xl mx-auto">
          <Card className="border-green-200 bg-green-50">
            <CardContent className="pt-8 pb-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-green-900 mb-2">Bid Submitted Successfully</h2>
              <p className="text-green-800 mb-6">
                Your encrypted bid has been recorded on the blockchain.
              </p>
              <div className="bg-white rounded-lg p-6 mb-6 text-left space-y-3">
                <div>
                  <label className="text-xs font-medium text-slate-600">Tender</label>
                  <p className="text-sm font-medium">{tender.tenderTitle}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">Bid Hash</label>
                  <p className="font-mono text-xs text-slate-700 break-all">{bidHash}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600">Bid Amount</label>
                  <p className="font-semibold">₹ {Number(bidAmount).toLocaleString("en-IN")}</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-green-700 pt-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Immutably recorded on Sepolia testnet</span>
                </div>
              </div>
              <div className="flex gap-3 justify-center">
                <Link href={`/tenders/${id}`}>
                  <Button variant="outline">View Tender</Button>
                </Link>
                <Link href="/vendor">
                  <Button className="bg-[#0B3D91]">Go to Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const steps = ["Bid Details", "Documents", "EMD & Declaration", "Review & Submit"]

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-4xl mx-auto">
        <Link
          href={`/tenders/${id}`}
          className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Tender
        </Link>

        {/* Header */}
        <div className="mb-6">
          <Badge className="bg-[#0B3D91]/10 text-[#0B3D91] mb-2">Bid Submission</Badge>
          <h1 className="text-2xl font-bold text-slate-900 mb-1">{tender.tenderTitle}</h1>
          <p className="text-sm text-slate-600">NIT: {tender.nitNo} | {tender.department}</p>
        </div>

        {/* Steps */}
        <div className="mb-8 grid grid-cols-4 gap-2">
          {steps.map((s, i) => (
            <div
              key={s}
              className={`text-center p-3 rounded-lg text-xs font-medium ${
                step === i + 1
                  ? "bg-[#0B3D91] text-white"
                  : step > i + 1
                    ? "bg-green-100 text-green-800"
                    : "bg-gray-100 text-gray-500"
              }`}
            >
              {step > i + 1 ? <CheckCircle2 className="h-4 w-4 mx-auto mb-1" /> : null}
              {s}
            </div>
          ))}
        </div>

        {/* Step 1: Bid Details */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Bid Details</CardTitle>
              <CardDescription>Enter your bid amount and qualification details.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-gray-700">Bid Amount (₹) *</label>
                <Input
                  type="number"
                  placeholder="Enter bid amount in INR"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Budget: ₹ {(tender.budget / 10000000).toFixed(1)} Cr | EMR: ₹ {(tender.emrAmount / 10000000).toFixed(2)} Cr
                </p>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Technical Capability Summary</label>
                <textarea
                  className="w-full mt-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-[#0B3D91] focus:outline-none focus:ring-1 focus:ring-[#0B3D91]"
                  rows={3}
                  placeholder="Describe your technical capability for this project..."
                  value={technicalScore}
                  onChange={(e) => setTechnicalScore(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Years of Experience</label>
                <Input
                  type="number"
                  placeholder="e.g. 10"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-end">
                <Button onClick={() => setStep(2)} disabled={!bidAmount} className="bg-[#0B3D91]">
                  Next: Documents
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Documents */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Supporting Documents</CardTitle>
              <CardDescription>Upload documents to IPFS. All files are encrypted and stored immutably.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-sm text-gray-600 mb-3">Upload bid documents (PDF, XLSX, DOCX)</p>
                <label className="cursor-pointer">
                  <Button variant="outline" className="pointer-events-none" disabled={isUploading}>
                    {isUploading ? "Uploading to IPFS..." : "Choose File"}
                  </Button>
                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.xlsx,.docx,.doc"
                    onChange={handleDocUpload}
                  />
                </label>
              </div>

              {documents.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-gray-700">Uploaded Documents</h4>
                  {documents.map((doc) => (
                    <div
                      key={doc.hash}
                      className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-600" />
                        <div>
                          <p className="text-sm font-medium">{doc.name}</p>
                          <p className="text-xs text-gray-500 font-mono">{doc.hash}</p>
                        </div>
                      </div>
                      <Badge className="bg-green-100 text-green-800">IPFS Pinned</Badge>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button onClick={() => setStep(3)} className="bg-[#0B3D91]">
                  Next: EMD & Declaration
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: EMD & Declaration */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>EMD & Declaration</CardTitle>
              <CardDescription>Confirm Earnest Money Deposit and accept terms.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-blue-900">EMD Required</p>
                    <p className="text-sm text-blue-700 mt-1">
                      ₹ {(tender.emrAmount / 10000000).toFixed(2)} Cr will be locked in a smart
                      contract until tender conclusion.
                    </p>
                  </div>
                </div>
              </div>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#0B3D91] focus:ring-[#0B3D91] mt-1"
                  checked={emdConfirmed}
                  onChange={(e) => setEmdConfirmed(e.target.checked)}
                />
                <span className="text-sm text-gray-700">
                  I confirm that the EMD amount will be deducted from my wallet and locked in the
                  TenderChain smart contract.
                </span>
              </label>

              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-[#0B3D91] focus:ring-[#0B3D91] mt-1"
                  checked={declarationAccepted}
                  onChange={(e) => setDeclarationAccepted(e.target.checked)}
                />
                <span className="text-sm text-gray-700">
                  I declare that all information provided is accurate, and I accept the terms of the
                  tender. I understand that submitting false information may lead to disqualification
                  and blacklisting.
                </span>
              </label>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button
                  onClick={() => setStep(4)}
                  disabled={!emdConfirmed || !declarationAccepted}
                  className="bg-[#0B3D91]"
                >
                  Next: Review
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 4: Review & Submit */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Review & Submit</CardTitle>
              <CardDescription>Review your bid details before submitting to the blockchain.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Tender</p>
                  <p className="text-sm font-medium mt-1">{tender.tenderTitle}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Bid Amount</p>
                  <p className="text-lg font-bold mt-1">
                    ₹ {Number(bidAmount).toLocaleString("en-IN")}
                  </p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase font-semibold">Documents</p>
                  <p className="text-sm font-medium mt-1">{documents.length} file(s) uploaded</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-500 uppercase font-semibold">EMD Lock</p>
                  <p className="text-sm font-medium mt-1">
                    ₹ {(tender.emrAmount / 10000000).toFixed(2)} Cr
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-amber-900">Important</p>
                    <p className="text-sm text-amber-700 mt-1">
                      Once submitted, your bid cannot be modified or withdrawn. The bid will be
                      encrypted and stored on-chain until the evaluation period.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex justify-between">
                <Button variant="outline" onClick={() => setStep(3)}>
                  Back
                </Button>
                <Button onClick={handleSubmitBid} className="bg-[#138808] hover:bg-[#138808]/90">
                  <Lock className="mr-2 h-4 w-4" />
                  Submit Encrypted Bid
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <BlockchainTxModal
          open={txOpen}
          title="Submit Encrypted Bid"
          actionLabel="Bid Submission"
          onComplete={handleTxComplete}
          onClose={() => setTxOpen(false)}
        />
      </div>
    </div>
  )
}
