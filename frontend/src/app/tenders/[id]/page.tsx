"use client"

import Link from "next/link"
import { ShieldCheck, Clock, Download, ArrowLeft, Building2, MapPin, Copy, CheckCircle2, FileText, Lock, Blocks } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import tendersData from "@/data/tenders.json"

export default function TenderDetail({ params }: { params: { id: string } }) {
  const tender = tendersData.find(t => t.id === params.id) || tendersData[0]

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 flex items-center space-x-2 text-sm text-gray-500">
        <Link href="/tenders" className="flex items-center hover:text-[#0B3D91]">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Tenders
        </Link>
        <span>/</span>
        <span className="text-gray-900 font-medium truncate">{tender.id}</span>
      </div>

      {/* Header Section */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
          <div className="space-y-4 flex-grow">
            <div className="flex items-center space-x-3">
              <span className="text-sm font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{tender.id}</span>
              <Badge variant={tender.status === 'Open' ? 'default' : tender.status === 'Closed' ? 'destructive' : 'success'}>
                {tender.status}
              </Badge>
            </div>
            
            <h1 className="font-poppins text-2xl md:text-3xl font-bold text-[#0B3D91] leading-tight">
              {tender.title}
            </h1>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Building2 className="mr-2 h-4 w-4 text-gray-400" />
                {tender.department}
              </div>
              <div className="flex items-center">
                <MapPin className="mr-2 h-4 w-4 text-gray-400" />
                {tender.state}
              </div>
            </div>
          </div>
          
          <div className="flex flex-col items-end gap-2 min-w-[200px]">
            <Link href={`/ledger?search=${tender.hash}`}>
              <Button variant="outline" className="w-full border-[#138808] text-[#138808] hover:bg-[#138808]/10">
                <ShieldCheck className="mr-2 h-4 w-4" />
                View on Blockchain
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Details */}
        <div className="lg:col-span-2 space-y-8">
          {/* Tabs Navigation (Visual only for mockup) */}
          <div className="border-b border-gray-200 flex space-x-8">
            <button className="border-b-2 border-[#0B3D91] pb-3 text-sm font-medium text-[#0B3D91]">Overview</button>
            <button className="border-b-2 border-transparent pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">Documents</button>
            <button className="border-b-2 border-transparent pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">Audit Trail</button>
            <button className="border-b-2 border-transparent pb-3 text-sm font-medium text-gray-500 hover:text-gray-700">Bidders (Hash)</button>
          </div>

          <div className="space-y-6">
            <section>
              <h3 className="font-poppins font-semibold text-lg mb-3">Scope of Work</h3>
              <div className="bg-white p-5 rounded-md border border-gray-200 text-sm text-gray-700 space-y-4">
                <p>The {tender.department} invites encrypted electronic bids for the {tender.title}. This project involves end-to-end execution including design, procurement, and implementation.</p>
                <p>All bids must be submitted through the TenderChain platform and will be locked in the Smart Contract until the official bid opening time.</p>
              </div>
            </section>

            <section>
              <h3 className="font-poppins font-semibold text-lg mb-3">Eligibility Criteria</h3>
              <ul className="list-disc pl-5 space-y-2 text-sm text-gray-700 bg-white p-5 rounded-md border border-gray-200">
                <li>Must be a registered vendor on TenderChain with verified e-KYC.</li>
                <li>Minimum average annual turnover of ₹ 50 Cr in the last 3 financial years.</li>
                <li>ISO 9001:2015 Certification mandatory.</li>
                <li>No prior blacklisting by any Central/State Government department.</li>
              </ul>
            </section>

            <section>
              <h3 className="font-poppins font-semibold text-lg mb-3">Tender Documents</h3>
              <div className="space-y-3">
                {[
                  { name: "Notice Inviting Tender (NIT)", size: "2.4 MB" },
                  { name: "Technical Specifications", size: "5.1 MB" },
                  { name: "Financial Bid Format (BoQ)", size: "1.2 MB" }
                ].map((doc, i) => (
                  <div key={i} className="flex items-center justify-between bg-white p-4 rounded-md border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-6 w-6 text-gray-400" />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{doc.name}.pdf</p>
                        <p className="text-xs text-gray-500">{doc.size} • SHA256 Verified</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="text-[#0B3D91]">
                      <Download className="h-4 w-4 mr-1" /> Download
                    </Button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Right Column - Key Info & Actions */}
        <div className="space-y-6">
          <Card className="border-[#0B3D91]/20 shadow-md">
            <CardHeader className="bg-[#0B3D91]/5 pb-4 border-b border-[#0B3D91]/10">
              <CardTitle className="text-lg">Key Information</CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-5">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Estimated Budget</p>
                <p className="text-xl font-bold text-gray-900">{tender.budget}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">EMD Amount</p>
                  <p className="font-medium">₹ 5,00,000</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase font-semibold">Tender Fee</p>
                  <p className="font-medium">₹ 5,000</p>
                </div>
              </div>
              
              <div className="bg-red-50 p-3 rounded-md border border-red-100 flex items-start space-x-3">
                <Clock className="h-5 w-5 text-red-600 mt-0.5" />
                <div>
                  <p className="text-xs text-red-800 uppercase font-semibold">Bid Deadline</p>
                  <p className="font-bold text-red-600">{new Date(tender.deadline).toLocaleString()}</p>
                  <p className="text-xs text-red-600 mt-1">Countdown: 14d 05h 23m</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Bids Received (Encrypted)</p>
                <div className="flex items-center justify-between bg-gray-50 px-3 py-2 rounded border border-gray-200">
                  <span className="font-bold text-lg">{tender.bidsReceived}</span>
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
              </div>

              <div className="pt-4 border-t border-gray-200">
                <Link href="/dashboard" className="w-full">
                  <Button className="w-full bg-[#0B3D91] hover:bg-[#0B3D91]/90 h-12 text-lg">
                    Submit Bid
                  </Button>
                </Link>
                <p className="text-center text-xs text-gray-500 mt-2 flex items-center justify-center">
                  <ShieldCheck className="h-3 w-3 mr-1" />
                  Requires Wallet Signature
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Blockchain Proof Card */}
          <Card className="border-[#138808]/30 bg-green-50/30">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-poppins flex items-center text-[#138808]">
                <Blocks className="mr-2 h-4 w-4" />
                Blockchain Proof
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-xs">
              <div>
                <p className="text-gray-500 mb-1">Transaction Hash</p>
                <div className="flex items-center justify-between bg-white px-2 py-1.5 rounded border border-gray-200 font-mono text-gray-600">
                  <span className="truncate">{tender.hash}</span>
                  <button className="text-gray-400 hover:text-[#0B3D91] ml-2"><Copy className="h-3 w-3" /></button>
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Block Number</span>
                <span className="font-mono font-medium">14589201</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Smart Contract</span>
                <span className="font-mono font-medium text-[#0B3D91] hover:underline cursor-pointer">0xTender...Reg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Timestamp</span>
                <span className="font-mono">{new Date().toISOString()}</span>
              </div>
              <div className="mt-2 text-center text-[#138808] font-medium flex items-center justify-center">
                <CheckCircle2 className="h-3 w-3 mr-1" /> Immutably Recorded
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
