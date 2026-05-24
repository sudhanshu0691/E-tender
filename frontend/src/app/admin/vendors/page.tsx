'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowLeft, CheckCircle2, XCircle, Ban, Search, FileText, Shield } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import KYCStatusBadge from '@/components/KYCStatusBadge'
import kycQueueData from '@/data/kycQueue.json'

type Tab = 'kyc-queue' | 'all-vendors' | 'blacklisted'

interface Vendor {
  vendorId: string
  companyName: string
  orgType: string
  gstin: string
  kycLevel: string
  kycStatus: string
  submittedAt: string
  daysWaiting: number
  state: string
  city: string
  isMSME: boolean
  msmeCategory?: string
  udyamNumber?: string
  annualTurnover: number
  walletAddress: string
  docs?: Array<{ name: string; type: string; ipfsHash: string }>
}

export default function VendorsManagementPage() {
  const [activeTab, setActiveTab] = useState<Tab>('kyc-queue')
  const [vendors, setVendors] = useState<Vendor[]>(kycQueueData as Vendor[])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null)
  const [showApproveModal, setShowApproveModal] = useState(false)
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [kycLevelSelect, setKycLevelSelect] = useState('Level 1')
  const [rejectReason, setRejectReason] = useState('')

  const kycQueueVendors = vendors.filter((v) => v.kycStatus === 'pending' || v.kycStatus === 'under-review')
  const allVendors = vendors.filter((v) => v.kycStatus !== 'rejected')
  const blacklistedVendors = vendors.filter((v) => v.kycStatus === 'rejected')

  const filtered =
    activeTab === 'kyc-queue'
      ? kycQueueVendors
      : activeTab === 'all-vendors'
        ? allVendors
        : blacklistedVendors.filter((v) => !v.companyName.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleApprove = (vendorId: string) => {
    setSelectedVendor(vendorId)
    setShowApproveModal(true)
  }

  const confirmApprove = () => {
    if (selectedVendor) {
      setVendors((prev) =>
        prev.map((v) =>
          v.vendorId === selectedVendor
            ? { ...v, kycStatus: 'approved', kycLevel }
            : v
        )
      )
      setShowApproveModal(false)
      setSelectedVendor(null)
      setKycLevelSelect('Level 1')
    }
  }

  const handleReject = (vendorId: string) => {
    setSelectedVendor(vendorId)
    setShowRejectModal(true)
  }

  const confirmReject = () => {
    if (selectedVendor) {
      setVendors((prev) =>
        prev.map((v) =>
          v.vendorId === selectedVendor
            ? { ...v, kycStatus: 'rejected', kycLevel: 'rejected' }
            : v
        )
      )
      setShowRejectModal(false)
      setSelectedVendor(null)
      setRejectReason('')
    }
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
        <Link href="/admin" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 mb-8 font-medium">
          <ArrowLeft className="h-4 w-4" />
          Back to Dashboard
        </Link>

        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Vendor Management</h1>
          <p className="text-slate-600 dark:text-slate-300">Manage KYC approvals, vendor profiles, and vendor status</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Pending KYC</p>
              <p className="text-3xl font-bold">{kycQueueVendors.length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Approved</p>
              <p className="text-3xl font-bold text-green-600">{allVendors.filter((v) => v.kycStatus === 'approved').length}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">Blacklisted</p>
              <p className="text-3xl font-bold text-red-600">{blacklistedVendors.length}</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b border-slate-200 dark:border-slate-700">
          <div className="flex gap-8">
            {(['kyc-queue', 'all-vendors', 'blacklisted'] as Tab[]).map((tab) => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab)
                  setSearchQuery('')
                }}
                className={`py-3 px-1 font-medium border-b-2 transition-colors ${
                  activeTab === tab
                    ? 'border-[#0B3D91] text-[#0B3D91]'
                    : 'border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400'
                }`}
              >
                {tab === 'kyc-queue' && `KYC Queue (${kycQueueVendors.length})`}
                {tab === 'all-vendors' && `All Vendors (${allVendors.length})`}
                {tab === 'blacklisted' && `Blacklisted (${blacklistedVendors.length})`}
              </button>
            ))}
          </div>
        </div>

        {/* Search */}
        <div className="mb-6 flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search vendors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Vendor List */}
        <Card>
          <CardContent className="p-0">
            <div className="divide-y">
              {filtered.map((vendor) => (
                <div key={vendor.vendorId} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-bold text-lg">{vendor.companyName}</p>
                        <KYCStatusBadge status={vendor.kycStatus} />
                        {vendor.isMSME && <Badge className="bg-amber-100 text-amber-800 text-xs">MSME</Badge>}
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-3 text-sm text-slate-600 dark:text-slate-400">
                        <div>
                          <label className="text-xs font-medium text-slate-500">Vendor ID</label>
                          <p className="font-mono">{vendor.vendorId}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-500">Type</label>
                          <p>{vendor.orgType}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-500">Location</label>
                          <p>{vendor.city}, {vendor.state}</p>
                        </div>
                        <div>
                          <label className="text-xs font-medium text-slate-500">Turnover</label>
                          <p>₹ {(vendor.annualTurnover / 10000000).toFixed(1)} Cr</p>
                        </div>
                      </div>

                      {vendor.kycStatus !== 'approved' && vendor.kycStatus !== 'rejected' && (
                        <p className="text-xs text-amber-600 dark:text-amber-400 mt-2">
                          ⏱️ Waiting {vendor.daysWaiting} days
                        </p>
                      )}

                      {vendor.docs && vendor.docs.length > 0 && (
                        <div className="mt-3 flex gap-2">
                          {vendor.docs.map((doc) => (
                            <Badge key={doc.type} variant="outline" className="text-xs">
                              <FileText className="h-3 w-3 mr-1" />
                              {doc.name}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    {activeTab === 'kyc-queue' && vendor.kycStatus !== 'approved' && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleReject(vendor.vendorId)}
                          className="border-red-200 text-red-700 hover:bg-red-50"
                        >
                          <XCircle className="h-4 w-4 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          className="bg-green-600 text-white hover:bg-green-700"
                          onClick={() => handleApprove(vendor.vendorId)}
                        >
                          <CheckCircle2 className="h-4 w-4 mr-1" />
                          Approve
                        </Button>
                      </div>
                    )}

                    {activeTab === 'all-vendors' && vendor.kycStatus === 'approved' && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleReject(vendor.vendorId)}
                        className="border-red-200 text-red-700 hover:bg-red-50"
                      >
                        <Ban className="h-4 w-4 mr-1" />
                        Blacklist
                      </Button>
                    )}

                    {activeTab === 'blacklisted' && (
                      <Button
                        size="sm"
                        className="bg-green-600 text-white hover:bg-green-700"
                        onClick={() => handleApprove(vendor.vendorId)}
                      >
                        <CheckCircle2 className="h-4 w-4 mr-1" />
                        Reinstate
                      </Button>
                    )}
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <div className="text-center py-12">
                  <Shield className="h-12 w-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-slate-500">No vendors to display</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Approve Modal */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Approve Vendor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">KYC Level</label>
                <select
                  value={kycLevelSelect}
                  onChange={(e) => setKycLevelSelect(e.target.value)}
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-600"
                >
                  <option>Level 1</option>
                  <option>Level 2</option>
                  <option>Level 3</option>
                  <option>Level 4</option>
                </select>
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowApproveModal(false)}>
                  Cancel
                </Button>
                <Button className="bg-green-600 text-white hover:bg-green-700" onClick={confirmApprove}>
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Reject Modal */}
      {showRejectModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-md w-full">
            <CardHeader>
              <CardTitle>Reject/Blacklist Vendor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Reason</label>
                <textarea
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  placeholder="Provide reason for rejection"
                  rows={3}
                  className="w-full px-3 py-2 border rounded-md dark:bg-slate-800 dark:border-slate-600"
                />
              </div>
              <div className="flex gap-2 justify-end">
                <Button variant="outline" onClick={() => setShowRejectModal(false)}>
                  Cancel
                </Button>
                <Button className="bg-red-600 text-white hover:bg-red-700" onClick={confirmReject}>
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}