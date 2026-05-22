"use client"

import { useState } from "react"
import { Search, Blocks, Activity, CheckCircle2, Copy, ArrowRightLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import blockchainData from "@/data/blockchain.json"

export default function LedgerPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredLogs = blockchainData.filter(log => 
    log.txHash.toLowerCase().includes(searchTerm.toLowerCase()) || 
    log.tenderId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    log.event.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero */}
      <div className="bg-[#0B3D91] text-white rounded-xl p-8 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          <Blocks className="h-64 w-64 -mt-12 -mr-12" />
        </div>
        <div className="relative z-10">
          <h1 className="font-poppins text-3xl md:text-4xl font-bold mb-4">Public Transparency Ledger</h1>
          <p className="text-blue-100 max-w-2xl text-lg mb-8">
            Every action on TenderChain is immutably recorded on a public blockchain. Verify any tender, bid, or award instantly. Trust through mathematics.
          </p>
          
          <div className="relative max-w-3xl">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search by Tender ID, Tx Hash, Block #, or Vendor Hash..." 
              className="pl-12 h-14 text-base rounded-lg bg-white text-gray-900 border-none shadow-lg focus-visible:ring-[#FF9933]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button className="absolute right-2 top-2 h-10 bg-[#FF9933] hover:bg-[#FF9933]/90 text-white font-semibold">
              Search Ledger
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content - Table */}
        <div className="lg:col-span-3 space-y-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-poppins text-xl font-bold text-gray-900 flex items-center">
              <Activity className="mr-2 h-5 w-5 text-[#0B3D91]" />
              Recent Blockchain Transactions
            </h2>
            <div className="text-sm text-gray-500 font-medium animate-pulse flex items-center">
              <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span> Live Feed
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 border-b border-gray-200 text-gray-600 uppercase text-xs font-semibold">
                  <tr>
                    <th className="px-6 py-4">Block #</th>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">Event Type</th>
                    <th className="px-6 py-4">Tender ID</th>
                    <th className="px-6 py-4">Tx Hash</th>
                    <th className="px-6 py-4 text-center">Verified</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredLogs.map((log, index) => (
                    <tr key={index} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-mono font-medium text-[#0B3D91]">{log.block}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-600">{new Date(log.timestamp).toLocaleString()}</td>
                      <td className="px-6 py-4 font-medium text-gray-900">{log.event}</td>
                      <td className="px-6 py-4 font-mono text-gray-600 text-xs">{log.tenderId}</td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono text-gray-500 text-xs">{log.txHash}</span>
                          <button className="text-gray-400 hover:text-[#0B3D91]"><Copy className="h-3 w-3" /></button>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center">
                        {log.verified && <CheckCircle2 className="h-5 w-5 text-[#138808] mx-auto" />}
                      </td>
                    </tr>
                  ))}
                  {filteredLogs.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                        No transactions found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            {/* Pagination Mock */}
            <div className="bg-gray-50 border-t border-gray-200 px-6 py-3 flex items-center justify-between">
              <Button variant="outline" size="sm" disabled>Previous</Button>
              <span className="text-xs text-gray-500">Page 1 of 420</span>
              <Button variant="outline" size="sm">Next</Button>
            </div>
          </div>
        </div>

        {/* Sidebar Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader className="pb-3 border-b border-gray-100">
              <CardTitle className="text-lg font-poppins">Network Stats</CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-4">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Latest Block Height</p>
                <p className="font-mono text-2xl font-bold text-[#0B3D91]">14,589,205</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Avg Block Time</p>
                <p className="font-medium text-gray-900">3.2 Seconds</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Total Transactions</p>
                <p className="font-medium text-gray-900">1.2 Million+</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold">Nodes Active</p>
                <p className="font-medium text-gray-900">128 (Govt + NIC)</p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-[#F8F9FC] border-blue-100">
            <CardContent className="pt-6">
              <ArrowRightLeft className="h-8 w-8 text-[#0B3D91] mb-3" />
              <h3 className="font-semibold text-gray-900 mb-2">Need to verify a specific document?</h3>
              <p className="text-sm text-gray-600 mb-4">Upload a tender document to instantly verify its cryptographic signature against the blockchain.</p>
              <Button variant="outline" className="w-full bg-white text-[#0B3D91] border-[#0B3D91]">Verify Document</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
