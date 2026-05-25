"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Building2, FileText, Wallet, CheckCircle2, Clock, ShieldCheck, Edit3, Save, Upload, X, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const kycLevels = [
  { level: 1, name: "Basic Verification", desc: "PAN, Company Incorporation", status: "completed" },
  { level: 2, name: "Financial Verification", desc: "Bank Accounts, ITR", status: "completed" },
  { level: 3, name: "Operational Verification", desc: "Factory Inspection, Certifications", status: "in-progress" },
  { level: 4, name: "Performance History", desc: "Previous Projects, References", status: "pending" },
]

const DOC_TYPES = [
  "GST Certificate",
  "PAN Card",
  "Udyam Certificate",
  "ITR (Latest FY)",
  "Bank Statement",
  "ISO Certificate",
  "Company Incorporation",
  "Board Resolution",
  "Power of Attorney",
  "Other",
]

interface VendorDoc {
  name: string
  hash: string
  uploadedAt: string
}

const pastProjects = [
  { name: "Highway Construction - NH-52", value: "45 Cr", status: "Completed", year: "2024" },
  { name: "Bridge Construction - River Project", value: "28 Cr", status: "Completed", year: "2023" },
  { name: "Water Facility Project", value: "12 Cr", status: "Completed", year: "2022" },
]

export default function VendorProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "kyc" | "documents">("overview")
  const [isEditing, setIsEditing] = useState(false)
  const [saved, setSaved] = useState(false)

  const [vendorData, setVendorData] = useState({
    id: "VND-2026-001",
    companyName: "Sharma Construction Pvt Ltd",
    gstin: "23AABCS1429B1ZB",
    pan: "AABCS1429B",
    registrationNumber: "CIR-001234/2015",
    website: "www.sharmaconstruction.in",
    email: "contact@sharmaconstruction.in",
    phone: "+91 9876543210",
    city: "Indore",
    state: "Madhya Pradesh",
    pinCode: "452001",
    officeAddress: "123 Construction Complex, Indore",
    factoryAddress: "Plot 42, Industrial Estate, Indore",
    ownerName: "Rajendra Sharma",
    ownerEmail: "rajendra@sharmaconstruction.in",
    walletAddress: "0xabc...def",
    registeredAt: "2026-05-15T10:30:00Z",
    kycStatus: "under-review",
    kycLevel: 3,
  })

  const [editFields, setEditFields] = useState({
    email: vendorData.email,
    phone: vendorData.phone,
    website: vendorData.website,
    officeAddress: vendorData.officeAddress,
    factoryAddress: vendorData.factoryAddress,
  })

  const [documents, setDocuments] = useState<VendorDoc[]>([
    { name: "GST Certificate", hash: "QmGST123...abc", uploadedAt: "2026-05-15" },
    { name: "PAN Card", hash: "QmPAN456...def", uploadedAt: "2026-05-15" },
    { name: "Udyam Certificate", hash: "QmUDY789...ghi", uploadedAt: "2026-05-16" },
    { name: "ITR FY24-25", hash: "QmITR012...jkl", uploadedAt: "2026-05-16" },
    { name: "Bank Statement", hash: "QmBNK345...mno", uploadedAt: "2026-05-17" },
    { name: "ISO 9001 Certificate", hash: "QmISO678...pqr", uploadedAt: "2026-05-17" },
  ])
  const [showUpload, setShowUpload] = useState(false)
  const [uploadDocType, setUploadDocType] = useState(DOC_TYPES[0])
  const [isUploading, setIsUploading] = useState(false)

  const handleSave = () => {
    setVendorData((prev) => ({
      ...prev,
      email: editFields.email,
      phone: editFields.phone,
      website: editFields.website,
      officeAddress: editFields.officeAddress,
      factoryAddress: editFields.factoryAddress,
    }))
    setIsEditing(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handleCancelEdit = () => {
    setEditFields({
      email: vendorData.email,
      phone: vendorData.phone,
      website: vendorData.website,
      officeAddress: vendorData.officeAddress,
      factoryAddress: vendorData.factoryAddress,
    })
    setIsEditing(false)
  }

  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    setIsUploading(true)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    const hash = "Qm" + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setDocuments((prev) => [
      ...prev,
      { name: uploadDocType === "Other" ? file.name : uploadDocType, hash, uploadedAt: new Date().toISOString().split("T")[0] },
    ])
    setIsUploading(false)
    setShowUpload(false)
    e.target.value = ""
  }

  const handleDeleteDoc = (hash: string) => {
    if (confirm("Are you sure you want to remove this document?")) {
      setDocuments((prev) => prev.filter((d) => d.hash !== hash))
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      {saved && (
        <div className="fixed right-4 top-4 z-50 rounded-lg border border-green-200 bg-green-50 px-4 py-3 shadow-lg">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-green-700" />
            <p className="text-sm font-medium text-green-900">Profile updated successfully</p>
          </div>
        </div>
      )}

      <div className="mx-auto max-w-6xl">
        <Link href="/vendor" className="mb-8 inline-flex items-center gap-2 font-medium text-teal-600 hover:text-teal-700">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:flex-row md:items-start md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-3xl font-bold text-slate-950">{vendorData.companyName}</h1>
              <Badge className="bg-blue-100 text-blue-800">{vendorData.id}</Badge>
              <Badge className="bg-amber-100 text-amber-800">KYC Level {vendorData.kycLevel}/4</Badge>
              <Badge className="bg-blue-100 text-blue-800">
                {vendorData.kycStatus === "under-review" ? "Under Review" : "Approved"}
              </Badge>
            </div>
            <p className="mt-3 text-sm text-slate-600">Registered on {new Date(vendorData.registeredAt).toLocaleDateString("en-IN")}</p>
          </div>

          <Card className="border-slate-200">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Wallet className="h-5 w-5 text-teal-600" />
                <div>
                  <p className="text-xs text-slate-600">Wallet Address</p>
                  <p className="font-mono text-sm font-semibold">{vendorData.walletAddress}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mb-8 flex gap-3 border-b border-slate-200 pb-2">
          {([
            ["overview", "Company Overview"],
            ["kyc", "KYC Status"],
            ["documents", "Documents"],
          ] as const).map(([tab, label]) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${activeTab === tab ? "bg-[#0B3D91] text-white" : "text-slate-600 hover:bg-white"}`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── OVERVIEW TAB ── */}
        {activeTab === "overview" ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Building2 className="h-5 w-5" />
                    Company Information
                  </CardTitle>
                  {!isEditing ? (
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(true)}>
                      <Edit3 className="h-4 w-4 mr-1" /> Edit Profile
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" onClick={handleCancelEdit}>
                        <X className="h-4 w-4 mr-1" /> Cancel
                      </Button>
                      <Button size="sm" className="bg-[#138808]" onClick={handleSave}>
                        <Save className="h-4 w-4 mr-1" /> Save
                      </Button>
                    </div>
                  )}
                </div>
                <CardDescription>Verified legal and contact details for this vendor.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Read-only fields */}
                {[
                  ["GSTIN", vendorData.gstin, false],
                  ["PAN", vendorData.pan, false],
                  ["Registration Number", vendorData.registrationNumber, false],
                ].map(([label, value]) => (
                  <div key={label as string}>
                    <label className="text-sm text-slate-600">{label as string}</label>
                    <p className="font-medium text-slate-950">{value as string}</p>
                  </div>
                ))}

                {/* Editable fields */}
                <div>
                  <label className="text-sm text-slate-600">Website</label>
                  {isEditing ? (
                    <Input value={editFields.website} onChange={(e) => setEditFields((p) => ({ ...p, website: e.target.value }))} className="mt-1" />
                  ) : (
                    <p className="font-medium text-slate-950">{vendorData.website}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-slate-600">Email</label>
                  {isEditing ? (
                    <Input value={editFields.email} onChange={(e) => setEditFields((p) => ({ ...p, email: e.target.value }))} className="mt-1" />
                  ) : (
                    <p className="font-medium text-slate-950">{vendorData.email}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-slate-600">Phone</label>
                  {isEditing ? (
                    <Input value={editFields.phone} onChange={(e) => setEditFields((p) => ({ ...p, phone: e.target.value }))} className="mt-1" />
                  ) : (
                    <p className="font-medium text-slate-950">{vendorData.phone}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-slate-600">Office Address</label>
                  {isEditing ? (
                    <Input value={editFields.officeAddress} onChange={(e) => setEditFields((p) => ({ ...p, officeAddress: e.target.value }))} className="mt-1" />
                  ) : (
                    <p className="font-medium text-slate-950">{vendorData.officeAddress}</p>
                  )}
                </div>
                <div>
                  <label className="text-sm text-slate-600">Factory Address</label>
                  {isEditing ? (
                    <Input value={editFields.factoryAddress} onChange={(e) => setEditFields((p) => ({ ...p, factoryAddress: e.target.value }))} className="mt-1" />
                  ) : (
                    <p className="font-medium text-slate-950">{vendorData.factoryAddress}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Authorized Representative</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <p className="text-sm text-slate-600">Name</p>
                  <p className="font-semibold">{vendorData.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Email</p>
                  <p>{vendorData.ownerEmail}</p>
                </div>
                <div>
                  <p className="text-sm text-slate-600">Location</p>
                  <p>{vendorData.city}, {vendorData.state}</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Past Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {pastProjects.map((project) => (
                  <div key={project.name} className="flex items-center justify-between rounded-xl border border-slate-200 p-4">
                    <div>
                      <p className="font-semibold text-slate-950">{project.name}</p>
                      <p className="text-sm text-slate-600">{project.year}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-950">₹ {project.value}</p>
                      <Badge className="mt-1 bg-green-100 text-green-800">{project.status}</Badge>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        ) : null}

        {/* ── KYC TAB ── */}
        {activeTab === "kyc" ? (
          <div className="space-y-6">
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="pt-6">
                <p className="text-sm text-blue-900">
                  Current KYC Level: <span className="font-bold">{vendorData.kycLevel} of 4</span>
                </p>
                <div className="mt-4 h-2 rounded-full bg-blue-200">
                  <div className="h-2 rounded-full bg-blue-600" style={{ width: `${(vendorData.kycLevel / 4) * 100}%` }} />
                </div>
              </CardContent>
            </Card>

            <div className="space-y-3">
              {kycLevels.map((level) => (
                <Card key={level.level} className={level.level <= vendorData.kycLevel ? "border-emerald-200" : "border-slate-200"}>
                  <CardContent className="flex items-start gap-3 p-5">
                    <div className="mt-0.5 rounded-full bg-slate-100 p-2 text-slate-600">
                      {level.status === "completed" ? <CheckCircle2 className="h-4 w-4 text-emerald-600" /> : level.status === "in-progress" ? <Clock className="h-4 w-4 text-amber-600" /> : <ShieldCheck className="h-4 w-4 text-slate-400" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-semibold text-slate-950">Level {level.level}: {level.name}</p>
                        <Badge className={level.status === "completed" ? "bg-emerald-100 text-emerald-800" : level.status === "in-progress" ? "bg-amber-100 text-amber-800" : "bg-slate-100 text-slate-700"}>
                          {level.status}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-600">{level.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ) : null}

        {/* ── DOCUMENTS TAB ── */}
        {activeTab === "documents" ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Document Vault
                    </CardTitle>
                    <CardDescription>Documents are stored with IPFS-style hashes for auditability.</CardDescription>
                  </div>
                  <Button className="bg-[#0B3D91]" onClick={() => setShowUpload(true)}>
                    <Upload className="h-4 w-4 mr-2" /> Upload Document
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {/* Upload Form */}
                {showUpload && (
                  <div className="mb-6 rounded-lg border-2 border-dashed border-blue-300 bg-blue-50 p-6">
                    <h4 className="font-semibold text-blue-900 mb-4">Upload New Document</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <label className="text-sm font-medium text-gray-700">Document Type *</label>
                        <select
                          className="mt-1 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm"
                          value={uploadDocType}
                          onChange={(e) => setUploadDocType(e.target.value)}
                        >
                          {DOC_TYPES.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700">Select File *</label>
                        <input
                          type="file"
                          className="mt-1 w-full text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[#0B3D91] file:px-4 file:py-2 file:text-sm file:text-white hover:file:bg-blue-800"
                          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                          onChange={handleDocUpload}
                          disabled={isUploading}
                        />
                      </div>
                    </div>
                    {isUploading && (
                      <div className="flex items-center gap-3">
                        <div className="h-2 flex-1 bg-blue-200 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-600 rounded-full animate-pulse" style={{ width: "60%" }} />
                        </div>
                        <span className="text-sm text-blue-700">Uploading to IPFS...</span>
                      </div>
                    )}
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm" onClick={() => setShowUpload(false)} disabled={isUploading}>Cancel</Button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {documents.map((doc) => (
                    <div key={doc.hash} className="rounded-xl border border-slate-200 p-4 group">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-start gap-3">
                          <FileText className="h-5 w-5 flex-shrink-0 text-blue-600" />
                          <div>
                            <p className="font-semibold text-slate-950">{doc.name}</p>
                            <p className="text-xs text-slate-500">Uploaded: {doc.uploadedAt}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteDoc(doc.hash)}
                          className="opacity-0 group-hover:opacity-100 transition-opacity p-1 rounded hover:bg-red-50"
                          title="Remove document"
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                      </div>
                      <p className="font-mono text-xs text-slate-600">{doc.hash}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        ) : null}
      </div>
    </div>
  )
}
