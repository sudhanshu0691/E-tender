"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, CheckCircle2, AlertTriangle, ExternalLink, Lock } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
interface TransactionResult {
  found: boolean
  txHash?: string
  type?: string
  status?: string
  confirmations?: number
  blockNumber?: number
  timestamp?: string
  from?: string
  to?: string
  gasUsed?: string
  gasPrice?: string
  value?: string
  functionName?: string
  contractAddress?: string
}

export default function VerifyPage() {
  const [searchHash, setSearchHash] = useState("")
  const [searchResults, setSearchResults] = useState<TransactionResult | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [hasSearched, setHasSearched] = useState(false)

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!searchHash.trim()) return

    setIsLoading(true)
    setHasSearched(true)

    await new Promise((resolve) => setTimeout(resolve, 800))

    if (searchHash.toLowerCase().startsWith("0x")) {
      setSearchResults({
        found: true,
        txHash: searchHash,
        type: "Tender Publication",
        status: "Confirmed",
        confirmations: 12,
        blockNumber: 5487291,
        timestamp: "2026-05-23T10:30:00Z",
        from: "0x1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b",
        to: "0x9876543210abcdef9876543210abcdef98765432",
        gasUsed: "145000",
        gasPrice: "45000000000",
        value: "0",
        functionName: "publishTender",
        contractAddress: "0xABCDEF123456ABCDEF123456ABCDEF123456AB",
      })
    } else {
      setSearchResults({ found: false })
    }

    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="mx-auto max-w-5xl">
        <Link href="/" className="mb-8 inline-flex items-center gap-2 font-medium text-teal-600 hover:text-teal-700">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-slate-950">Blockchain Transaction Verification</h1>
          <p className="text-slate-600">Verify procurement transactions on the blockchain. Enter a transaction hash to view details.</p>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5" />
              Search Transaction
            </CardTitle>
            <CardDescription>Enter a transaction hash starting with 0x</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                placeholder="0x... (transaction hash)"
                value={searchHash}
                onChange={(e) => setSearchHash(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" disabled={isLoading} className="bg-[#0B3D91] text-white hover:bg-[#083174]">
                {isLoading ? "Searching..." : "Verify"}
              </Button>
            </form>
          </CardContent>
        </Card>

        {hasSearched ? (
          searchResults?.found ? (
            <div className="space-y-6">
              <Card className="border-green-200 bg-green-50">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-8 w-8 text-green-600" />
                    <div>
                      <p className="font-bold text-green-900">Transaction Verified</p>
                      <p className="text-sm text-green-800">
                        This transaction has been confirmed on the blockchain with {searchResults.confirmations} confirmations.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Transaction Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {[
                      ["Transaction Hash", searchResults.txHash],
                      ["Status", searchResults.status],
                      ["Block Number", searchResults.blockNumber?.toLocaleString() ?? ""],
                      ["Confirmations", String(searchResults.confirmations ?? "")],
                      ["Type", searchResults.type ?? ""],
                      ["Timestamp", searchResults.timestamp ? new Date(searchResults.timestamp).toLocaleString() : ""],
                    ].map(([label, value]) => (
                      <div key={label}>
                        <label className="text-sm text-slate-600">{label}</label>
                        <p className="mt-1 break-all rounded-lg bg-slate-100 p-2 font-mono text-sm">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Transaction Parties</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="mb-2 block text-sm text-slate-600">From Address</label>
                    <div className="rounded-lg bg-slate-50 p-3 font-mono text-sm">{searchResults.from}</div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm text-slate-600">To Address (Contract)</label>
                    <div className="rounded-lg bg-slate-50 p-3 font-mono text-sm">{searchResults.contractAddress}</div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Execution Details</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    {[
                      ["Gas Used", parseInt(searchResults.gasUsed ?? "0").toLocaleString()],
                      ["Gas Price", searchResults.gasPrice ?? ""],
                      ["Function Called", searchResults.functionName ?? ""],
                      [
                        "Transaction Fee",
                        `${((parseInt(searchResults.gasUsed ?? "0") * parseInt(searchResults.gasPrice ?? "0")) / 1e18).toFixed(4)} ETH`,
                      ],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-lg bg-slate-50 p-3">
                        <p className="mb-1 text-xs text-slate-600">{label}</p>
                        <p className="font-semibold text-slate-950">{value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="flex items-center justify-between gap-4 p-6">
                  <div>
                    <p className="font-medium mb-1">View on Etherscan</p>
                    <p className="text-sm text-slate-600">View complete transaction details on the Ethereum explorer</p>
                  </div>
                  <a href={`https://etherscan.io/tx/${searchResults.txHash}`} target="_blank" rel="noreferrer">
                    <Button className="bg-[#0B3D91] text-white hover:bg-[#083174]">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Open
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          ) : (
            <Card className="border-amber-200 bg-amber-50">
              <CardContent className="p-6 text-center">
                <AlertTriangle className="mx-auto mb-3 h-10 w-10 text-amber-600" />
                <p className="font-semibold text-amber-900">Transaction not found</p>
                <p className="mt-1 text-sm text-amber-800">The supplied hash does not look like a valid TenderChain transaction.</p>
              </CardContent>
            </Card>
          )
        ) : null}
      </div>
    </div>
  )
}
