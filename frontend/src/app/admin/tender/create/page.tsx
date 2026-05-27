"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { AlertCircle, ArrowLeft, Check, ChevronRight, UploadCloud } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { BlockchainTxModal } from "@/components/BlockchainTxModal"
import { IPFSHashPill } from "@/components/IPFSHashPill"
import { WeightSlider } from "@/components/WeightSlider"
import { createTender } from "@/lib/tenderStore"

const STEPS = [
  "Basic Info",
  "Specifications",
  "Budget & Deadline",
  "Eligibility",
  "Evaluation Weights",
]

const DEFAULT_WEIGHTS = {
  price: 40,
  financial: 15,
  experience: 15,
  performance: 10,
  technical: 10,
  compliance: 5,
  proposal: 5,
}

const departments = [
  "Ministry of Road Transport and Highways",
  "Ministry of Defence",
  "Ministry of Railways",
  "Ministry of Health and Family Welfare",
]

const categories = ["Civil Works", "IT & Software", "Energy", "Healthcare", "Consulting"]

export default function CreateTenderPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [reviewMode, setReviewMode] = useState(false)
  const [txOpen, setTxOpen] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [ipfsHash, setIpfsHash] = useState("")
  const [title, setTitle] = useState("")
  const [department, setDepartment] = useState(departments[0])
  const [category, setCategory] = useState(categories[0])
  const [description, setDescription] = useState("")
  const [minBudget, setMinBudget] = useState("")
  const [maxBudget, setMaxBudget] = useState("")
  const [deadline, setDeadline] = useState("")
  const [minTurnover, setMinTurnover] = useState("")
  const [minExperience, setMinExperience] = useState("")
  const [msmeEnabled, setMsmeEnabled] = useState(true)
  const [msmeQuota, setMsmeQuota] = useState(25)
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS)

  const totalWeight = useMemo(() => Object.values(weights).reduce((sum, value) => sum + value, 0), [weights])
  const weightValid = totalWeight === 100

  const handleNext = () => {
    if (currentStep < STEPS.length) {
      setCurrentStep((step) => step + 1)
      setReviewMode(false)
    }
  }

  const handleBack = () => {
    if (reviewMode) {
      setReviewMode(false)
      return
    }

    setCurrentStep((step) => Math.max(step - 1, 1))
  }

  const simulateIpfsUpload = () => {
    if (uploadProgress > 0 && uploadProgress < 100) {
      return
    }

    setUploadProgress(12)
    const timer = window.setInterval(() => {
      setUploadProgress((progress) => {
        const next = Math.min(progress + 18, 100)
        if (next === 100) {
          window.clearInterval(timer)
          setIpfsHash(`ipfs://Qm${Math.random().toString(36).slice(2, 10).toUpperCase()}TenderSpec`)
        }
        return next
      })
    }, 350)
  }

  const handlePublishSuccess = () => {
    createTender({
      tenderTitle: title || "Untitled Tender",
      nitNo: `NIT-${Date.now()}`,
      department,
      category,
      state: "Maharashtra",
      budget: Number(maxBudget || minBudget || 0) || 0,
      emrAmount: Math.max(1, Math.round((Number(maxBudget || minBudget || 0) || 0) * 0.02)),
      deadline: deadline ? new Date(deadline).toISOString() : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      bidOpeningDate: deadline ? new Date(new Date(deadline).getTime() + 7 * 24 * 60 * 60 * 1000).toISOString() : new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
      status: "Open",
      deadlinePassed: false,
      ipfsDocuments: ipfsHash ? [{ name: "Tender Specification", type: "spec", ipfsHash }] : [],
      evaluationWeights: {
        price: weights.price / 100,
        financial: weights.financial / 100,
        experience: weights.experience / 100,
        performance: weights.performance / 100,
        technical: weights.technical / 100,
        compliance: weights.compliance / 100,
        proposal: weights.proposal / 100,
      },
    })
    setTxOpen(false)
    router.push("/admin?published=1")
  }

  return (
    <div className="min-h-[calc(100vh-6rem)] bg-[linear-gradient(180deg,#F8F9FC_0%,#EEF3FA_100%)]">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="mb-6 flex items-center gap-2 text-sm text-slate-500">
          <Link href="/admin" className="inline-flex items-center gap-1.5 font-medium text-[#0B3D91] hover:underline">
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>
          <span>/</span>
          <span className="text-slate-700">Create New Tender</span>
        </div>

        <div className="mb-8 rounded-3xl border border-slate-200 bg-white/90 p-6 shadow-sm backdrop-blur">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#0B3D91]">Officer workflow</p>
            <h1 className="mt-2 text-3xl font-bold text-slate-950 md:text-4xl">Publish a new tender on the blockchain</h1>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Follow the five-step wizard to author tender details, pin specifications to IPFS, and lock the evaluation configuration before publication.
            </p>
          </div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-3 md:grid-cols-5">
          {STEPS.map((step, index) => {
            const active = currentStep === index + 1
            const complete = currentStep > index + 1

            return (
              <div key={step} className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl text-sm font-bold ${complete ? "bg-[#138808] text-white" : active ? "bg-[#0B3D91] text-white" : "bg-slate-100 text-slate-500"}`}
                >
                  {complete ? <Check className="h-5 w-5" /> : index + 1}
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Step {index + 1}</p>
                  <p className="text-sm font-semibold text-slate-950">{step}</p>
                </div>
              </div>
            )
          })}
        </div>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="border-b border-slate-100 pb-5">
            <CardTitle className="text-2xl text-slate-950">{reviewMode ? "Final Review" : STEPS[currentStep - 1]}</CardTitle>
            <CardDescription>
              {reviewMode
                ? "Confirm every detail before broadcasting the tender contract."
                : "Complete the current step before moving to the next stage."}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8 p-6 lg:p-8">
            {!reviewMode && currentStep === 1 ? (
              <div className="grid gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Tender Title</label>
                  <Input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. Construction of a 4-Lane Highway" />
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Department</label>
                    <select
                      value={department}
                      onChange={(event) => setDepartment(event.target.value)}
                      className="flex h-10 w-full items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                      {departments.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Category</label>
                    <select
                      value={category}
                      onChange={(event) => setCategory(event.target.value)}
                      className="flex h-10 w-full items-center rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                    >
                      {categories.map((option) => (
                        <option key={option}>{option}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Description</label>
                  <textarea
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    rows={5}
                    className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm"
                    placeholder="Describe the scope, quality expectations, and any special terms..."
                  />
                </div>
              </div>
            ) : null}

            {!reviewMode && currentStep === 2 ? (
              <div className="space-y-6">
                <div className="grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                  <div className="rounded-3xl border-2 border-dashed border-slate-300 bg-slate-50 p-8 text-center">
                    <UploadCloud className="mx-auto h-11 w-11 text-[#0B3D91]" />
                    <p className="mt-4 text-sm font-semibold text-slate-900">Upload the tender specification PDF</p>
                    <p className="mt-1 text-xs text-slate-500">The file will be simulated into an IPFS hash for the blockchain record.</p>
                    <Button type="button" className="mt-5 bg-[#0B3D91] hover:bg-[#083174]" onClick={simulateIpfsUpload}>
                      Simulate IPFS Upload
                    </Button>
                  </div>

                  <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
                    <p className="text-sm font-semibold text-slate-900">Upload progress</p>
                    <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                      <div className="h-full rounded-full bg-[#0B3D91] transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
                    </div>
                    <p className="mt-3 text-sm text-slate-500">{uploadProgress}% complete</p>
                    <div className="mt-6 space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">IPFS Hash</p>
                      {ipfsHash ? <IPFSHashPill hash={ipfsHash} /> : <p className="text-sm text-slate-500">Hash will appear after upload simulation completes.</p>}
                    </div>
                  </div>
                </div>
              </div>
            ) : null}

            {!reviewMode && currentStep === 3 ? (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Minimum Budget (₹)</label>
                  <Input value={minBudget} onChange={(event) => setMinBudget(event.target.value)} placeholder="e.g. 250000000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Maximum Budget (₹)</label>
                  <Input value={maxBudget} onChange={(event) => setMaxBudget(event.target.value)} placeholder="e.g. 450000000" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-sm font-medium text-slate-700">Deadline</label>
                  <Input type="date" value={deadline} onChange={(event) => setDeadline(event.target.value)} />
                </div>
              </div>
            ) : null}

            {!reviewMode && currentStep === 4 ? (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Minimum Turnover (₹)</label>
                  <Input value={minTurnover} onChange={(event) => setMinTurnover(event.target.value)} placeholder="e.g. 100000000" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700">Minimum Experience (years)</label>
                  <Input value={minExperience} onChange={(event) => setMinExperience(event.target.value)} placeholder="e.g. 5" />
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 md:col-span-2">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">MSME quota</p>
                      <p className="text-xs text-slate-500">Reserve a percentage of evaluation preference for MSME vendors.</p>
                    </div>
                    <label className="inline-flex items-center gap-2 text-sm font-medium text-slate-700">
                      <input type="checkbox" checked={msmeEnabled} onChange={(event) => setMsmeEnabled(event.target.checked)} />
                      Enable quota
                    </label>
                  </div>
                  <div className="mt-4 max-w-xs">
                    <label className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">Quota percentage</label>
                    <Input
                      type="number"
                      value={msmeQuota}
                      onChange={(event) => setMsmeQuota(Number(event.target.value) || 0)}
                      disabled={!msmeEnabled}
                      className="mt-2"
                    />
                  </div>
                </div>
              </div>
            ) : null}

            {!reviewMode && currentStep === 5 ? (
              <div className="space-y-6">
                <div className={`rounded-3xl border p-5 ${weightValid ? "border-emerald-200 bg-emerald-50/60" : "border-red-200 bg-red-50/60"}`}>
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold text-slate-950">Evaluation weight total</p>
                      <p className="text-xs text-slate-500">The total must equal exactly 100 before you can review the tender.</p>
                    </div>
                    <p className={`text-2xl font-bold ${weightValid ? "text-emerald-700" : "text-red-600"}`}>{totalWeight}%</p>
                  </div>
                </div>

                <div className="grid gap-5">
                  <WeightSlider label="Price" value={weights.price} onChange={(value) => setWeights((current) => ({ ...current, price: value }))} />
                  <WeightSlider label="Financial Strength" value={weights.financial} onChange={(value) => setWeights((current) => ({ ...current, financial: value }))} />
                  <WeightSlider label="Experience" value={weights.experience} onChange={(value) => setWeights((current) => ({ ...current, experience: value }))} />
                  <WeightSlider label="Past Performance" value={weights.performance} onChange={(value) => setWeights((current) => ({ ...current, performance: value }))} />
                  <WeightSlider label="Technical" value={weights.technical} onChange={(value) => setWeights((current) => ({ ...current, technical: value }))} />
                  <WeightSlider label="Compliance" value={weights.compliance} onChange={(value) => setWeights((current) => ({ ...current, compliance: value }))} />
                  <WeightSlider label="Proposal Quality" value={weights.proposal} onChange={(value) => setWeights((current) => ({ ...current, proposal: value }))} />
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className={`text-sm font-semibold ${weightValid ? "text-emerald-700" : "text-red-600"}`}>
                    {weightValid ? "Weight total is valid." : "Adjust the sliders until the total reaches 100."}
                  </p>
                  <Button disabled={!weightValid} className="bg-[#0B3D91] hover:bg-[#083174]" onClick={() => setReviewMode(true)}>
                    Review Summary
                  </Button>
                </div>
              </div>
            ) : null}

            {reviewMode ? (
              <div className="space-y-6">
                <div className="grid gap-4 md:grid-cols-2">
                  {[
                    { label: "Title", value: title || "—" },
                    { label: "Department", value: department },
                    { label: "Category", value: category },
                    { label: "Budget Range", value: minBudget && maxBudget ? `₹ ${minBudget} - ₹ ${maxBudget}` : "—" },
                    { label: "Deadline", value: deadline || "—" },
                    { label: "MSME Quota", value: msmeEnabled ? `${msmeQuota}%` : "Disabled" },
                  ].map((item) => (
                    <div key={item.label} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                      <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">{item.label}</p>
                      <p className="mt-2 text-sm font-semibold text-slate-950">{item.value}</p>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <p className="text-sm font-semibold text-slate-950">Evaluation weights</p>
                  <div className="mt-4 grid gap-3 md:grid-cols-2">
                    {Object.entries(weights).map(([key, value]) => (
                      <div key={key} className="rounded-2xl bg-white px-4 py-3 shadow-sm">
                        <div className="flex items-center justify-between gap-4 text-sm">
                          <span className="capitalize text-slate-600">{key}</span>
                          <span className="font-semibold text-[#0B3D91]">{value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
                    <p className="font-semibold text-slate-950">Specification hash</p>
                    <div className="mt-2">{ipfsHash ? <IPFSHashPill hash={ipfsHash} /> : "No IPFS hash generated yet."}</div>
                    <p className="mt-4 font-semibold text-slate-950">Description</p>
                    <p className="mt-2 leading-6 text-slate-600">{description || "—"}</p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                  <Button variant="outline" onClick={() => setReviewMode(false)} className="border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91]/5">
                    Edit Weights
                  </Button>
                  <Button onClick={() => setTxOpen(true)} className="bg-[#138808] hover:bg-[#0f6b06]">
                    Publish on Blockchain
                  </Button>
                </div>
              </div>
            ) : null}

            {!reviewMode && currentStep < 5 ? (
              <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                <Button variant="outline" onClick={handleBack} disabled={currentStep === 1} className="border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91]/5">
                  Back
                </Button>
                <Button onClick={handleNext} className="bg-[#0B3D91] hover:bg-[#083174]">
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            ) : null}

            {reviewMode ? (
              <div className="flex items-center justify-between border-t border-slate-200 pt-6">
                <Button variant="outline" onClick={handleBack} className="border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91]/5">
                  Back
                </Button>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <AlertCircle className="h-4 w-4 text-[#FF9933]" />
                  Confirm all entries before broadcasting.
                </div>
              </div>
            ) : null}
          </CardContent>
        </Card>
      </div>

      <BlockchainTxModal
        open={txOpen}
        title="Publish tender contract"
        actionLabel="tender deployment"
        onClose={() => setTxOpen(false)}
        onComplete={handlePublishSuccess}
      />
    </div>
  )
}
