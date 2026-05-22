"use client"

import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, ShieldCheck, FileText, Blocks, Users, FileLock, Search, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import tendersData from "@/data/tenders.json"

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-16 md:py-24">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D91]/5 to-transparent"></div>
        <div className="container relative mx-auto px-4">
          <div className="grid gap-12 md:grid-cols-2 lg:gap-8 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center space-x-2 rounded-full border border-[#0B3D91]/20 bg-[#0B3D91]/5 px-3 py-1 text-sm font-medium text-[#0B3D91]">
                <ShieldCheck className="h-4 w-4" />
                <span>Government Approved Platform</span>
              </div>
              <h1 className="font-poppins text-4xl font-bold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                Transparent. <span className="text-[#0B3D91]">Immutable.</span> Trusted Public Procurement.
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                India&apos;s first blockchain-powered tendering platform ensuring corruption-free governance. Every action is recorded on an immutable ledger, bringing unprecedented transparency to public spending.
              </p>
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
                <Link href="/tenders">
                  <Button size="lg" className="w-full sm:w-auto font-semibold">
                    Explore Live Tenders
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/ledger">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto font-semibold">
                    Verify a Tender
                  </Button>
                </Link>
              </div>
              <div className="pt-4 flex items-center space-x-4 text-sm text-gray-500 font-medium">
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="h-4 w-4 text-[#138808]" />
                  <span>ISO Certified</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle2 className="h-4 w-4 text-[#138808]" />
                  <span>MeitY Empanelled</span>
                </div>
              </div>
            </div>
            
            <div className="relative mx-auto w-full max-w-lg lg:max-w-none">
              {/* Abstract Illustration representation using standard icons */}
              <div className="relative aspect-square w-full rounded-full border border-gray-100 bg-gray-50/50 p-8 shadow-2xl flex items-center justify-center">
                 <div className="absolute inset-0 rounded-full border border-dashed border-[#0B3D91]/20 animate-spin-slow" style={{ animationDuration: '30s' }}></div>
                 <div className="relative z-10 grid grid-cols-2 gap-8">
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="rounded-xl bg-white p-6 shadow-lg flex flex-col items-center text-center">
                       <FileLock className="h-10 w-10 text-[#0B3D91] mb-2" />
                       <span className="text-xs font-bold text-gray-700">Encrypted Bids</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="rounded-xl bg-[#0B3D91] p-6 shadow-lg flex flex-col items-center text-center mt-12">
                       <Blocks className="h-10 w-10 text-white mb-2" />
                       <span className="text-xs font-bold text-white">Immutable Ledger</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                      className="rounded-xl bg-white p-6 shadow-lg flex flex-col items-center text-center -mt-8">
                       <CheckCircle2 className="h-10 w-10 text-[#138808] mb-2" />
                       <span className="text-xs font-bold text-gray-700">Smart Contracts</span>
                    </motion.div>
                    <motion.div 
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.8 }}
                      className="rounded-xl bg-white p-6 shadow-lg flex flex-col items-center text-center mt-4">
                       <Search className="h-10 w-10 text-[#FF9933] mb-2" />
                       <span className="text-xs font-bold text-gray-700">Public Audit</span>
                    </motion.div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Stats Strip */}
      <section className="border-y border-gray-200 bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 text-center md:grid-cols-4 md:divide-x md:divide-gray-200">
            <div className="space-y-1">
              <h3 className="font-poppins text-2xl font-bold text-[#0B3D91] lg:text-3xl">₹12,400 Cr</h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Tenders Tracked</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-poppins text-2xl font-bold text-[#0B3D91] lg:text-3xl">8,500+</h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Verified Vendors</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-poppins text-2xl font-bold text-[#0B3D91] lg:text-3xl">100%</h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">Immutable Records</p>
            </div>
            <div className="space-y-1">
              <h3 className="font-poppins text-2xl font-bold text-[#0B3D91] lg:text-3xl">28</h3>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider">States Connected</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-[#F8F9FC] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-poppins text-3xl font-bold text-gray-900 md:text-4xl">How TenderChain Works</h2>
            <p className="mt-4 text-lg text-gray-600">A seamless, trustless 4-step process powered by smart contracts.</p>
          </div>
          
          <div className="relative">
            <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 -translate-y-1/2 z-0"></div>
            <div className="grid gap-8 md:grid-cols-4 relative z-10">
              {[
                { step: "01", title: "Tender Created", desc: "Government officer publishes tender to the blockchain.", icon: FileText },
                { step: "02", title: "Bids Submitted", desc: "Vendors submit encrypted bids locked in a smart contract.", icon: Lock },
                { step: "03", title: "Auto Evaluation", desc: "Smart contract evaluates eligibility objectively.", icon: Blocks },
                { step: "04", title: "Winner Recorded", desc: "Contract awarded and recorded immutably on-chain.", icon: CheckCircle2 }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md border-4 border-[#F8F9FC] group-hover:border-[#0B3D91] transition-colors relative">
                    <item.icon className="h-8 w-8 text-[#0B3D91]" />
                    <div className="absolute -top-2 -right-2 bg-[#FF9933] text-white text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="mb-2 font-poppins text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600 px-4">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-poppins text-3xl font-bold text-gray-900 md:text-4xl">Why TenderChain?</h2>
            <p className="mt-4 text-lg text-gray-600">Built for scale, secured by mathematics, designed for the public.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Immutable Ledger", desc: "Once a document is on TenderChain, it cannot be altered or deleted. Perfect transparency.", icon: Blocks },
              { title: "Smart Contracts", desc: "Automated bid opening and eligibility checking eliminates human bias.", icon: FileLock },
              { title: "Public Auditability", desc: "Citizens and journalists can verify any tender allocation without RTI requests.", icon: Search },
              { title: "e-KYC Verified Vendors", desc: "All contractors are thoroughly vetted through DigiLocker & GST networks.", icon: Users },
              { title: "Anti-Corruption", desc: "End-to-end encryption ensures bids remain secret until the exact opening time.", icon: ShieldCheck },
              { title: "Real-time Tracking", desc: "Track fund disbursement and project milestones directly on the dashboard.", icon: ArrowRight }
            ].map((feature, i) => (
              <Card key={i} className="border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0B3D91]/10">
                    <feature.icon className="h-6 w-6 text-[#0B3D91]" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Tenders */}
      <section className="bg-[#F8F9FC] py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="font-poppins text-3xl font-bold text-gray-900">Recent Live Tenders</h2>
              <p className="mt-2 text-gray-600">Browse the latest public procurement requests.</p>
            </div>
            <Link href="/tenders" className="hidden md:flex text-[#0B3D91] font-semibold hover:underline items-center">
              View All Tenders <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {tendersData.slice(0, 3).map((tender) => (
              <Card key={tender.id} className="flex flex-col border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{tender.id}</span>
                    <Badge variant={tender.status === 'Open' ? 'default' : tender.status === 'Closed' ? 'destructive' : 'success'}>
                      {tender.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 leading-tight">{tender.title}</CardTitle>
                  <CardDescription className="text-sm font-medium text-gray-600">{tender.department}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="grid grid-cols-2 gap-4 text-sm mt-2">
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">Budget</p>
                      <p className="font-semibold text-gray-900">{tender.budget}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-xs uppercase tracking-wide">State</p>
                      <p className="font-semibold text-gray-900">{tender.state}</p>
                    </div>
                  </div>
                  {tender.verified && (
                    <div className="mt-4 flex items-center space-x-1 text-xs text-[#138808] font-medium bg-[#138808]/10 w-fit px-2 py-1 rounded">
                      <ShieldCheck className="h-3 w-3" />
                      <span>Verified on Blockchain</span>
                    </div>
                  )}
                </CardContent>
                <div className="p-6 pt-0 mt-auto border-t border-gray-100 bg-gray-50/50 flex justify-between items-center rounded-b-lg">
                  <span className="text-xs font-mono text-gray-500 truncate w-32" title={tender.hash}>{tender.hash}</span>
                  <Link href={`/tenders/${tender.id}`}>
                    <Button variant="outline" size="sm" className="font-semibold">View Details</Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Link href="/tenders">
              <Button variant="outline" className="w-full">View All Tenders</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
