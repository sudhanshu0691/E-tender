"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Building2, FileText, Wallet, CheckCircle2, Clock, ShieldCheck } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

const kycLevels = [
  { level: 1, name: "Basic Verification", desc: "PAN, Company Incorporation", status: "completed" },
  { level: 2, name: "Financial Verification", desc: "Bank Accounts, ITR", status: "completed" },
  { level: 3, name: "Operational Verification", desc: "Factory Inspection, Certifications", status: "in-progress" },
  { level: 4, name: "Performance History", desc: "Previous Projects, References", status: "pending" },
]

const vendorData = {
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
}

const documents = [
  { name: "GST Certificate", hash: "QmGST123...", uploadedAt: "2026-05-15" },
  { name: "PAN Card", hash: "QmPAN456...", uploadedAt: "2026-05-15" },
  { name: "Udyam Certificate", hash: "QmUDY789...", uploadedAt: "2026-05-16" },
  { name: "ITR FY24-25", hash: "QmITR012...", uploadedAt: "2026-05-16" },
  { name: "Bank Statement", hash: "QmBNK345...", uploadedAt: "2026-05-17" },
  { name: "ISO 9001 Certificate", hash: "QmISO678...", uploadedAt: "2026-05-17" },
]

const pastProjects = [
  { name: "Highway Construction - NH-52", value: "45 Cr", status: "Completed", year: "2024" },
  { name: "Bridge Construction - River Project", value: "28 Cr", status: "Completed", year: "2023" },
  { name: "Water Facility Project", value: "12 Cr", status: "Completed", year: "2022" },
]

export default function VendorProfilePage() {
  const [activeTab, setActiveTab] = useState<"overview" | "kyc" | "documents">("overview")

  return (
    <div className="min-h-screen bg-slate-50 p-6">
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

        {activeTab === "overview" ? (
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  Company Information
                </CardTitle>
                <CardDescription>Verified legal and contact details for this vendor.</CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {[
                  ["GSTIN", vendorData.gstin],
                  ["PAN", vendorData.pan],
                  ["Registration Number", vendorData.registrationNumber],
                  ["Website", vendorData.website],
                  ["Email", vendorData.email],
                  ["Phone", vendorData.phone],
                  ["Office Address", vendorData.officeAddress],
                  ["Factory Address", vendorData.factoryAddress],
                ].map(([label, value]) => (
                  <div key={label}>
                    <label className="text-sm text-slate-600">{label}</label>
                    <p className="font-medium text-slate-950">{value}</p>
                  </div>
                ))}
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

        {activeTab === "documents" ? (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Document Vault
              </CardTitle>
              <CardDescription>Documents are stored with IPFS-style hashes for auditability.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {documents.map((doc) => (
                  <div key={doc.hash} className="rounded-xl border border-slate-200 p-4">
                    <div className="mb-3 flex items-start gap-3">
                      <FileText className="h-5 w-5 flex-shrink-0 text-blue-600" />
                      <div>
                        <p className="font-semibold text-slate-950">{doc.name}</p>
                        <p className="text-xs text-slate-500">Uploaded: {doc.uploadedAt}</p>
                      </div>
                    </div>
                    <p className="font-mono text-xs text-slate-600">{doc.hash}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : null}
      </div>
    </div>
  )
}
