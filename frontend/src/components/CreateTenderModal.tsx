"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createTender } from "@/lib/tenderStore"
import { toast } from "sonner"
import { Check, ArrowLeft, ArrowRight, FileText, DollarSign, Calendar, Shield } from "lucide-react"

interface CreateTenderModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const steps = [
  { id: 1, label: "Basic Info", icon: FileText },
  { id: 2, label: "Financial Details", icon: DollarSign },
  { id: 3, label: "Timeline", icon: Calendar },
  { id: 4, label: "Review & Publish", icon: Shield },
]

const categories = [
  "Infrastructure",
  "Healthcare",
  "Energy",
  "IT & Telecommunications",
  "Defense",
  "Education",
  "Agriculture",
  "Transportation",
  "Water Resources",
  "Urban Development",
]

const states = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Delhi", "Goa", "Gujarat", "Haryana", "Himachal Pradesh",
  "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra",
  "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha",
  "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana",
  "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal",
]

const departments = [
  "Ministry of Road Transport and Highways",
  "Ministry of Health and Family Welfare",
  "Ministry of New and Renewable Energy",
  "Ministry of Defence",
  "Ministry of Education",
  "Ministry of Agriculture and Farmers Welfare",
  "Ministry of Housing and Urban Affairs",
  "Ministry of Electronics and Information Technology",
  "Ministry of Railways",
  "Ministry of Petroleum and Natural Gas",
]

export default function CreateTenderModal({ open, onOpenChange }: CreateTenderModalProps) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    tenderTitle: "",
    nitNo: "",
    department: "",
    category: "",
    state: "",
    budget: "",
    emrAmount: "",
    deadline: "",
    bidOpeningDate: "",
    description: "",
  })

  const updateField = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.tenderTitle || !formData.nitNo || !formData.department || !formData.category || !formData.state) {
        toast.error("Please fill in all required fields")
        return
      }
    }
    if (step === 2) {
      if (!formData.budget || !formData.emrAmount) {
        toast.error("Please fill in financial details")
        return
      }
    }
    if (step === 3) {
      if (!formData.deadline || !formData.bidOpeningDate) {
        toast.error("Please fill in timeline details")
        return
      }
    }
    setStep((s) => Math.min(s + 1, 4))
  }

  const handleBack = () => setStep((s) => Math.max(s - 1, 1))

  const handlePublish = () => {
    const budgetNum = Number.parseFloat(formData.budget)
    const emrNum = Number.parseFloat(formData.emrAmount)

    if (Number.isNaN(budgetNum) || budgetNum <= 0) {
      toast.error("Please enter a valid budget amount")
      return
    }
    if (Number.isNaN(emrNum) || emrNum <= 0) {
      toast.error("Please enter a valid EMD amount")
      return
    }

    const newTender = createTender({
      tenderTitle: formData.tenderTitle,
      nitNo: formData.nitNo,
      department: formData.department,
      category: formData.category,
      state: formData.state,
      budget: budgetNum,
      emrAmount: emrNum,
      deadline: new Date(formData.deadline).toISOString(),
      bidOpeningDate: new Date(formData.bidOpeningDate).toISOString(),
      status: "Open",
      deadlinePassed: false,
      ipfsDocuments: [],
      evaluationWeights: {
        price: 0.4,
        financial: 0.15,
        experience: 0.15,
        performance: 0.1,
        technical: 0.1,
        compliance: 0.05,
        proposal: 0.05,
      },
    })

    toast.success("Tender Published Successfully!", {
      description: `${newTender.tenderTitle} is now live on the blockchain. Vendors can view and bid.`,
      duration: 5000,
    })

    onOpenChange(false)
    setStep(1)
    setFormData({
      tenderTitle: "",
      nitNo: "",
      department: "",
      category: "",
      state: "",
      budget: "",
      emrAmount: "",
      deadline: "",
      bidOpeningDate: "",
      description: "",
    })
  }

  const handleClose = () => {
    onOpenChange(false)
    setStep(1)
  }

  const formatBudget = (val: string) => {
    const num = Number.parseFloat(val)
    if (Number.isNaN(num)) return ""
    const cr = num / 10000000
    if (cr >= 1) return `₹ ${cr.toFixed(2)} Cr`
    const lakh = num / 100000
    return `₹ ${lakh.toFixed(2)} L`
  }

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto p-0">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-100 px-6 py-4">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-gray-900">Create New Tender</DialogTitle>
            <DialogDescription>
              Publish a new tender on the blockchain. All fields marked with * are required.
            </DialogDescription>
          </DialogHeader>

          {/* Steps Indicator */}
          <div className="flex items-center justify-between mt-4">
            {steps.map((s, i) => (
              <div key={s.id} className="flex items-center gap-2">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all ${
                    step > s.id
                      ? "bg-green-500 text-white"
                      : step === s.id
                        ? "bg-[#0B3D91] text-white ring-2 ring-[#0B3D91]/30"
                        : "bg-gray-100 text-gray-400"
                  }`}
                >
                  {step > s.id ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                </div>
                <span
                  className={`hidden sm:inline text-xs font-medium ${
                    step === s.id ? "text-[#0B3D91]" : "text-gray-400"
                  }`}
                >
                  {s.label}
                </span>
                {i < steps.length - 1 && <div className="hidden sm:block w-8 h-px bg-gray-200 mx-1" />}
              </div>
            ))}
          </div>
        </div>

        <div className="px-6 py-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {/* Step 1: Basic Info */}
              {step === 1 && (
                <div className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="title">
                      Tender Title <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="title"
                      placeholder="e.g., Construction of 4-Lane Highway from Pune to Nashik"
                      value={formData.tenderTitle}
                      onChange={(e) => updateField("tenderTitle", e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="nitNo">
                        NIT Number <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="nitNo"
                        placeholder="e.g., MH/PWD/2026/NIT/883"
                        value={formData.nitNo}
                        onChange={(e) => updateField("nitNo", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="department">
                        Department <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.department}
                        onValueChange={(v) => updateField("department", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map((d) => (
                            <SelectItem key={d} value={d}>
                              {d}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">
                        Category <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.category}
                        onValueChange={(v) => updateField("category", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((c) => (
                            <SelectItem key={c} value={c}>
                              {c}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">
                        State <span className="text-red-500">*</span>
                      </Label>
                      <Select
                        value={formData.state}
                        onValueChange={(v) => updateField("state", v)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent>
                          {states.map((s) => (
                            <SelectItem key={s} value={s}>
                              {s}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      placeholder="Brief description of the tender scope..."
                      rows={3}
                      value={formData.description}
                      onChange={(e) => updateField("description", e.target.value)}
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Financial Details */}
              {step === 2 && (
                <div className="space-y-5">
                  <div className="rounded-lg bg-blue-50 border border-blue-200 p-4 text-sm text-blue-700">
                    <p className="font-medium">Budget Guidelines</p>
                    <p className="mt-1 text-blue-600">
                      Enter the total estimated budget for this tender. EMD (Earnest Money Deposit) is typically 1-3% of the budget.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="budget">
                        Total Budget (in ₹) <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                        <Input
                          id="budget"
                          type="number"
                          placeholder="e.g., 450000000"
                          value={formData.budget}
                          onChange={(e) => updateField("budget", e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      {formData.budget && (
                        <p className="text-xs text-gray-500 mt-1">Estimated: {formatBudget(formData.budget)}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emrAmount">
                        EMD Amount (in ₹) <span className="text-red-500">*</span>
                      </Label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">₹</span>
                        <Input
                          id="emrAmount"
                          type="number"
                          placeholder="e.g., 9000000"
                          value={formData.emrAmount}
                          onChange={(e) => updateField("emrAmount", e.target.value)}
                          className="pl-8"
                        />
                      </div>
                      {formData.emrAmount && (
                        <p className="text-xs text-gray-500 mt-1">EMD: {formatBudget(formData.emrAmount)}</p>
                      )}
                    </div>
                  </div>

                  {formData.budget && formData.emrAmount && (
                    <div className="rounded-lg bg-gray-50 p-4 text-sm">
                      <p className="text-gray-600">
                        EMD as % of Budget:{" "}
                        <span className="font-bold text-gray-900">
                          {((Number.parseFloat(formData.emrAmount) / Number.parseFloat(formData.budget)) * 100).toFixed(2)}%
                        </span>
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Step 3: Timeline */}
              {step === 3 && (
                <div className="space-y-5">
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-4 text-sm text-amber-700">
                    <p className="font-medium">Important</p>
                    <p className="mt-1 text-amber-600">
                      Bids must be submitted before the deadline. Bid opening happens automatically via smart contract after the deadline.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deadline">
                        Bid Submission Deadline <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="deadline"
                        type="datetime-local"
                        value={formData.deadline}
                        onChange={(e) => updateField("deadline", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bidOpeningDate">
                        Bid Opening Date <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="bidOpeningDate"
                        type="datetime-local"
                        value={formData.bidOpeningDate}
                        onChange={(e) => updateField("bidOpeningDate", e.target.value)}
                      />
                    </div>
                  </div>

                  {formData.deadline && formData.bidOpeningDate && (
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="flex items-center gap-3 text-sm">
                        <Calendar className="h-5 w-5 text-[#0B3D91]" />
                        <div>
                          <p className="text-gray-600">
                            Submission Period:{" "}
                            <span className="font-medium text-gray-900">
                              {new Date(formData.deadline).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}{" "}
                              →{" "}
                              {new Date(formData.bidOpeningDate).toLocaleDateString("en-IN", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 4: Review & Publish */}
              {step === 4 && (
                <div className="space-y-5">
                  <div className="rounded-lg border border-gray-200 bg-white divide-y divide-gray-100">
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm text-gray-500">Title</span>
                      <span className="text-sm font-medium text-gray-900 text-right max-w-[400px]">
                        {formData.tenderTitle}
                      </span>
                    </div>
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm text-gray-500">NIT No.</span>
                      <span className="text-sm font-medium text-gray-900 font-mono">{formData.nitNo}</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm text-gray-500">Department</span>
                      <span className="text-sm font-medium text-gray-900">{formData.department}</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm text-gray-500">Category</span>
                      <span className="text-sm font-medium text-gray-900">{formData.category}</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm text-gray-500">State</span>
                      <span className="text-sm font-medium text-gray-900">{formData.state}</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm text-gray-500">Budget</span>
                      <span className="text-sm font-bold text-gray-900">{formatBudget(formData.budget)}</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm text-gray-500">EMD Amount</span>
                      <span className="text-sm font-medium text-gray-900">{formatBudget(formData.emrAmount)}</span>
                    </div>
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm text-gray-500">Deadline</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(formData.deadline).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                    <div className="px-4 py-3 flex justify-between">
                      <span className="text-sm text-gray-500">Bid Opening</span>
                      <span className="text-sm font-medium text-gray-900">
                        {new Date(formData.bidOpeningDate).toLocaleString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 border border-green-200 p-4 flex items-start gap-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5 shrink-0" />
                    <div className="text-sm text-green-700">
                      <p className="font-medium">Ready for Blockchain Publication</p>
                      <p className="mt-1 text-green-600">
                        This tender will be recorded on the TenderChain ledger with an immutable hash. All connected vendors will see it instantly.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Footer Actions */}
        <div className="sticky bottom-0 bg-white border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <div className="flex gap-2">
            {step > 1 && (
              <Button variant="ghost" onClick={handleBack}>
                <ArrowLeft className="h-4 w-4 mr-1" /> Back
              </Button>
            )}
            {step < 4 ? (
              <Button onClick={handleNext} className="bg-[#0B3D91] hover:bg-[#0B3D91]/90">
                Next <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            ) : (
              <Button onClick={handlePublish} className="bg-green-600 hover:bg-green-700 gap-2">
                <Shield className="h-4 w-4" />
                Publish to Blockchain
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}