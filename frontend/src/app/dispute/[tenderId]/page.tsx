'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, AlertTriangle, Upload, CheckCircle2, Lock, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { BlockchainTxModal } from '@/components/BlockchainTxModal'
import IPFSHashPill from '@/components/IPFSHashPill'
import tendersData from '@/data/tenders.json'
import disputesData from '@/data/disputes.json'
import { useBlockchainTx } from '@/lib/useBlockchainTx'

interface Dispute {
  id: string
  tenderId: string
  tenderTitle: string
  tenderNitNo?: string
  claimantId: string
  claimantName: string
  reason: string
  evidenceIPFSHash: string
  submittedAt: string
  status: string
  resolutionText?: string | null
  resolutionIPFSHash?: string | null
  resolvedAt?: string | null
}

export default function DisputePage({ params }: { params: { tenderId: string } }) {
  const { tenderId } = params
  const tender = (tendersData as { id: string; tenderTitle?: string; nit?: string; nitNo?: string; status?: string; category?: string }[]).find((t) => t.id === tenderId)
  const disputesByTender = disputesData as Record<string, Dispute[]>
  const existingDispute = (disputesByTender[tenderId] ?? []).find((d) => d.status !== 'resolved')

  const { isOpen, title, openTx, closeTx, setTxHash } = useBlockchainTx()

  const [formData, setFormData] = useState({
    type: 'Eligibility Violation',
    grounds: '',
    clauseRef: '',
    declareAccepted: false,
  })
  const [uploadedDocs, setUploadedDocs] = useState<{ name: string; hash: string }[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [disputeId] = useState(`DSP-2026-${Math.floor(Math.random() * 999) + 100}`)

  const disputeTypes = [
    'Eligibility Violation',
    'Evaluation Error',
    'Specification Bias',
    'Procedural Violation',
    'Other',
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleDocumentUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const mockHash = 'Qm' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setUploadedDocs((prev) => [...prev, { name: file.name, hash: mockHash }])
    setIsUploading(false)
  }

  const handleRemoveDoc = (hash: string) => {
    setUploadedDocs((prev) => prev.filter((d) => d.hash !== hash))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.grounds.trim() || !formData.declareAccepted) {
      alert('Please fill all required fields and accept the declaration')
      return
    }

    openTx('Recording Dispute on Blockchain')

    setTimeout(() => {
      const mockTxHash = '0x' + Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('')
      setTxHash(mockTxHash)
      
      setTimeout(() => {
        closeTx()
        setSubmitted(true)
      }, 3500)
    }, 100)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
        <div className="max-w-2xl mx-auto">
          <Link href={`/tenders/${tenderId}`} className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Tender
          </Link>

          <Card className="border-green-200 bg-green-50 dark:border-green-900 dark:bg-green-900/20">
            <CardContent className="pt-8 pb-8 text-center">
              <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400 mx-auto mb-6" />
              <h2 className="text-2xl font-bold text-green-900 dark:text-green-300 mb-2">Dispute Submitted Successfully</h2>
              <p className="text-green-800 dark:text-green-400 mb-6">
                Your dispute has been permanently recorded on the blockchain.
              </p>

              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-6 text-left">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Dispute ID</label>
                    <p className="text-lg font-mono font-bold text-slate-900 dark:text-white">{disputeId}</p>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Tender ID</label>
                    <p className="text-lg font-mono font-bold text-slate-900 dark:text-white">{tenderId}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Dispute Type</label>
                    <p className="text-slate-900 dark:text-white">{formData.type}</p>
                  </div>
                </div>
              </div>

              <p className="text-sm text-green-800 dark:text-green-400 mb-6">
                The Tender Inviting Authority will review and respond within 7 business days.
              </p>

              <div className="flex gap-3 justify-center">
                <Link href={`/tenders/${tenderId}`}>
                  <Button className="bg-green-600 text-white hover:bg-green-700">View Tender</Button>
                </Link>
                <Link href="/dashboard">
                  <Button variant="outline">Back to Dashboard</Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (existingDispute) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
        <div className="max-w-2xl mx-auto">
          <Link href={`/tenders/${tenderId}`} className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 font-medium">
            <ArrowLeft className="h-4 w-4" />
            Back to Tender
          </Link>

          <Card>
            <CardHeader>
              <CardTitle>Dispute Already Filed</CardTitle>
              <CardDescription>A dispute has already been submitted for this tender</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium">Dispute ID</label>
                <p className="font-mono text-sm bg-slate-100 dark:bg-slate-800 p-2 rounded">{existingDispute.id}</p>
              </div>
              <div>
                <label className="text-sm font-medium">Status</label>
                <Badge className="bg-amber-500">{existingDispute.status}</Badge>
              </div>
              <div>
                <label className="text-sm font-medium">Your Reason</label>
                <p className="text-slate-700 dark:text-slate-300">{existingDispute.reason}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-3xl mx-auto">
        <Link href={`/tenders/${tenderId}`} className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to Tender
        </Link>

        <div className="space-y-6">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold">Raise Dispute / Appeal</h1>
            <p className="text-slate-600 dark:text-slate-300 mt-2">
              Tender: <span className="font-mono font-medium">{tender?.tenderTitle || tenderId}</span>
            </p>
          </div>

          {/* Warning Banner */}
          <Card className="border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-900/20">
            <CardContent className="flex gap-4 pt-6">
              <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium text-amber-900 dark:text-amber-300 mb-1">Important Notice</p>
                <p className="text-sm text-amber-800 dark:text-amber-400">
                  Disputes are recorded permanently on the blockchain. Once submitted, they cannot be deleted. Ensure your claim is factual and
                  supported by evidence.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tender Info Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tender Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400">NIT No.</label>
                  <p className="font-mono text-sm font-medium">{tender?.nit || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Title</label>
                  <p className="text-sm font-medium truncate">{tender?.tenderTitle || 'N/A'}</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Status</label>
                  <Badge variant="secondary" className="text-xs">{tender?.status || 'N/A'}</Badge>
                </div>
                <div>
                  <label className="text-xs font-medium text-slate-600 dark:text-slate-400">Category</label>
                  <p className="text-sm font-medium">{tender?.category || 'N/A'}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Dispute Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dispute Type */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Dispute Type</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {disputeTypes.map((type) => (
                    <label key={type} className="flex items-center gap-3 p-3 border rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-700">
                      <input
                        type="radio"
                        name="type"
                        value={type}
                        checked={formData.type === type}
                        onChange={handleInputChange}
                        className="w-4 h-4"
                      />
                      <span className="text-sm font-medium">{type}</span>
                    </label>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Grounds */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center justify-between">
                  Grounds for Dispute
                  <span className="text-xs font-normal text-slate-600 dark:text-slate-400">
                    {formData.grounds.length} / 100 minimum
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <textarea
                  name="grounds"
                  value={formData.grounds}
                  onChange={handleInputChange}
                  placeholder="Explain in detail why you believe the evaluation was incorrect, citing specific clauses from the NIT..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 dark:bg-slate-800 dark:border-slate-600"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">Minimum 100 characters required</p>
              </CardContent>
            </Card>

            {/* NIT Clause Reference */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">NIT Clause Reference (Optional)</CardTitle>
              </CardHeader>
              <CardContent>
                <input
                  type="text"
                  name="clauseRef"
                  value={formData.clauseRef}
                  onChange={handleInputChange}
                  placeholder="e.g., Section 4.2, Clause 3.1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 dark:bg-slate-800 dark:border-slate-600"
                />
              </CardContent>
            </Card>

            {/* Evidence Documents */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Evidence Documents (Up to 3 files)
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {uploadedDocs.length < 3 && (
                  <label className="flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800">
                    <input
                      type="file"
                      onChange={handleDocumentUpload}
                      disabled={isUploading}
                      className="hidden"
                    />
                    <div className="text-center">
                      <Upload className={`h-8 w-8 mx-auto mb-2 ${isUploading ? 'animate-spin' : 'text-teal-600'}`} />
                      <p className="text-sm font-medium">{isUploading ? 'Uploading...' : 'Click to upload evidence'}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">PDF, JPG, PNG (Max 10MB)</p>
                    </div>
                  </label>
                )}

                {uploadedDocs.map((doc) => (
                  <div key={doc.hash} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <div className="flex items-center gap-3">
                      <FileText className="h-5 w-5 text-teal-600" />
                      <div>
                        <p className="text-sm font-medium">{doc.name}</p>
                        <IPFSHashPill hash={doc.hash} />
                      </div>
                    </div>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveDoc(doc.hash)}
                      className="text-red-500 hover:text-red-600"
                    >
                      Remove
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Declaration */}
            <Card className="border-l-4 border-l-red-500">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Lock className="h-5 w-5" />
                  Declaration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="declareAccepted"
                    checked={formData.declareAccepted}
                    onChange={handleInputChange}
                    className="w-4 h-4 mt-1"
                  />
                  <span className="text-sm text-slate-700 dark:text-slate-300">
                    I declare that the information provided above is true and factual to the best of my knowledge. I understand that false disputes
                    may result in legal penalties and loss of bidding rights.
                  </span>
                </label>
              </CardContent>
            </Card>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!formData.declareAccepted || formData.grounds.length < 100}
              className="w-full bg-red-600 text-white hover:bg-red-700 h-12 text-base gap-2"
            >
              <Lock className="h-5 w-5" />
              Submit Dispute on Blockchain
            </Button>
          </form>
        </div>
      </div>

      {/* Blockchain TX Modal */}
      <BlockchainTxModal
        open={isOpen}
        onClose={closeTx}
        title={title}
        actionLabel="Dispute Submission"
        onComplete={(hash) => {
          console.log('Dispute submitted with tx:', hash)
        }}
      />
    </div>
  )
}
