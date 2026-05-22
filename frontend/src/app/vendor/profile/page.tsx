"use client"

import Link from "next/link"
import { ArrowLeft, CheckCircle2, XCircle, Clock, Wallet, Upload, FileText, Link as LinkIcon, ShieldAlert } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function VendorProfile() {
  return (
    <div className="min-h-screen bg-[#F8F9FC] py-8">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="mb-6 flex items-center space-x-2 text-sm text-gray-500">
          <Link href="/dashboard" className="flex items-center hover:text-[#0B3D91]">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Link>
          <span>/</span>
          <span className="text-gray-900 font-medium">KYC & Profile Vault</span>
        </div>

        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="font-poppins text-3xl font-bold text-gray-900">Demo Infra Pvt Ltd</h1>
              <Badge className="bg-[#0B3D91]">MSME Certified</Badge>
            </div>
            <p className="text-gray-600 flex items-center text-sm">
              <Wallet className="w-4 h-4 mr-2" />
              Connected Wallet: <span className="font-mono ml-1 text-gray-900 font-medium">0x7F8E...2C3d</span>
            </p>
          </div>
          <div className="bg-green-50 border border-green-200 px-4 py-3 rounded-lg flex items-center space-x-3">
            <div className="bg-green-100 p-2 rounded-full">
              <CheckCircle2 className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-xs text-green-800 font-bold uppercase">KYC Status</p>
              <p className="text-sm font-medium text-green-900">Fully Verified</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KYC Status Stepper */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verification Steps</CardTitle>
                <CardDescription>Status of your on-chain identity verification.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex space-x-4 relative">
                  <div className="absolute top-8 bottom-0 left-[11px] w-0.5 bg-gray-200"></div>
                  
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center border-2 border-white">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="pb-6">
                    <p className="font-medium text-gray-900 text-sm">Company Registration (MCA)</p>
                    <p className="text-xs text-gray-500 mt-1">Verified via MCA API on 10 Oct 2024</p>
                  </div>
                </div>

                <div className="flex space-x-4 relative">
                  <div className="absolute top-8 bottom-0 left-[11px] w-0.5 bg-gray-200"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center border-2 border-white">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                  <div className="pb-6">
                    <p className="font-medium text-gray-900 text-sm">PAN/GST Verification</p>
                    <p className="text-xs text-gray-500 mt-1">Matched with GSTIN 27ABCDE1234F1Z5</p>
                  </div>
                </div>

                <div className="flex space-x-4 relative">
                  <div className="absolute top-8 bottom-0 left-[11px] w-0.5 bg-gray-200"></div>
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-yellow-100 flex items-center justify-center border-2 border-white">
                      <Clock className="w-4 h-4 text-yellow-600" />
                    </div>
                  </div>
                  <div className="pb-6">
                    <p className="font-medium text-gray-900 text-sm">Bank Account Details</p>
                    <p className="text-xs text-yellow-600 mt-1">Pending Nodal Officer Approval</p>
                  </div>
                </div>

                <div className="flex space-x-4 relative">
                  <div className="relative z-10 flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center border-2 border-white">
                      <XCircle className="w-4 h-4 text-red-600" />
                    </div>
                  </div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">Digital Signature (DSC)</p>
                    <p className="text-xs text-red-600 mt-1">Expired on 15 Oct 2024. Renewal required.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-red-50 border-red-100">
              <CardContent className="p-4 flex items-start space-x-3">
                <ShieldAlert className="w-5 h-5 text-red-600 mt-0.5" />
                <div>
                  <h4 className="text-sm font-medium text-red-900">Action Required</h4>
                  <p className="text-xs text-red-700 mt-1">Your Class 3 DSC has expired. You cannot submit new bids until it is updated.</p>
                  <Button size="sm" variant="outline" className="mt-3 text-red-700 border-red-200 hover:bg-red-100 bg-white">
                    Update DSC
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Document Vault */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl">Document Vault (IPFS)</CardTitle>
                  <CardDescription>Your verified documents secured on decentralized storage.</CardDescription>
                </div>
                <Button className="bg-[#0B3D91] hover:bg-[#0B3D91]/90">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload New
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { name: "Certificate of Incorporation", type: "MCA PDF", hash: "QmYwAP...d3E1", status: "Active", date: "10 Oct 2024" },
                    { name: "GST Registration Certificate", type: "Tax Doc", hash: "QmX8zP...b2R9", status: "Active", date: "10 Oct 2024" },
                    { name: "MSME / Udyam Certificate", type: "Registration", hash: "QmK9wQ...c4T1", status: "Active", date: "11 Oct 2024" },
                    { name: "Cancelled Cheque", type: "Bank Auth", hash: "QmM3eR...a5Y2", status: "Pending", date: "16 Oct 2024" },
                    { name: "ISO 9001:2015 Certificate", type: "Compliance", hash: "QmN1bP...x7W3", status: "Expired", date: "01 Jan 2022" },
                  ].map((doc, i) => (
                    <div key={i} className={`p-4 border rounded-lg flex flex-col md:flex-row md:items-center justify-between ${doc.status === 'Expired' ? 'bg-gray-50 border-gray-200 opacity-70' : 'bg-white border-gray-200 hover:border-[#0B3D91]/30'} transition-colors`}>
                      <div className="flex items-start space-x-3 mb-3 md:mb-0">
                        <div className="bg-blue-50 p-2 rounded-md">
                          <FileText className="w-6 h-6 text-[#0B3D91]" />
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium text-gray-900">{doc.name}</h4>
                            <Badge variant="outline" className={`text-[10px] h-5 ${
                              doc.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200' : 
                              doc.status === 'Pending' ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
                              'bg-red-50 text-red-700 border-red-200'
                            }`}>
                              {doc.status}
                            </Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{doc.type} • Uploaded {doc.date}</p>
                          <div className="flex items-center mt-2 text-xs font-mono text-gray-400 bg-gray-50 px-2 py-1 rounded max-w-fit">
                            <LinkIcon className="w-3 h-3 mr-1 text-[#0B3D91]" />
                            ipfs://{doc.hash}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 w-full md:w-auto">
                        {doc.status === 'Expired' ? (
                          <Button size="sm" className="w-full md:w-auto bg-[#0B3D91]">
                            <Upload className="w-4 h-4 mr-1" /> Re-upload
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="w-full md:w-auto text-[#0B3D91]">
                            View on IPFS
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
