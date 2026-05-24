'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowLeft, Edit2, Save, X, CheckCircle2, Clock, Shield, Wallet, FileText } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import IPFSHashPill from '@/components/IPFSHashPill'
import KYCStatusBadge from '@/components/KYCStatusBadge'
import officersData from '@/data/officers.json'

interface Officer {
  id: string
  name: string
  email: string
  mobile: string
  designation: string
  employeeId: string
  ministry: string
  department: string
  orgType: string
  orgName: string
  officeUnit: string
  state: string
  city: string
  pinCode: string
  roleType: string
  kycStatus: string
  dscStatus: string
  walletAddress: string
  authLetterIPFS: string
  createdAt: string
  role: string
}

export default function AdminProfilePage() {
  const officer = (officersData as unknown as Officer[])[0]
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: officer.name,
    email: officer.email,
    mobile: officer.mobile,
    officeUnit: officer.officeUnit,
    city: officer.city,
    state: officer.state,
    pinCode: officer.pinCode,
  })
  const [dscConnected, setDscConnected] = useState(officer.dscStatus === 'connected')
  const [connectingDSC, setConnectingDSC] = useState(false)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    setIsEditing(false)
    console.log('Saving profile:', formData)
  }

  const handleConnectDSC = async () => {
    setConnectingDSC(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setDscConnected(true)
    setConnectingDSC(false)
  }

  const logins = [
    { date: '2026-05-22T09:15:00Z', ip: '192.168.1.100', device: 'Chrome on Windows' },
    { date: '2026-05-20T14:30:00Z', ip: '192.168.1.100', device: 'Chrome on Windows' },
    { date: '2026-05-18T11:45:00Z', ip: '203.0.113.45', device: 'Safari on macOS' },
    { date: '2026-05-15T08:20:00Z', ip: '192.168.1.100', device: 'Chrome on Windows' },
    { date: '2026-05-12T16:10:00Z', ip: '203.0.113.45', device: 'Firefox on Linux' },
  ]

  const initials = officer.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()

  return (
    <div className="space-y-6 p-6">
      <Link href="/admin" className="inline-flex items-center gap-2 text-[#0B3D91] hover:text-[#082860] font-medium">
        <ArrowLeft className="h-4 w-4" />
        Back to Dashboard
      </Link>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* LEFT: Profile Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card className="border-l-4 border-l-[#0B3D91]">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  <div className="w-20 h-20 rounded-full bg-[#0B3D91] text-white flex items-center justify-center text-2xl font-bold">
                    {initials}
                  </div>
                  <div>
                    <CardTitle className="text-2xl">{officer.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className="bg-[#0B3D91] text-white">{officer.designation}</Badge>
                      <Badge variant="outline">{officer.roleType}</Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-300 mt-2">
                      {officer.department}
                    </p>
                  </div>
                </div>
                <Button
                  variant={isEditing ? 'destructive' : 'outline'}
                  size="sm"
                  onClick={() => setIsEditing(!isEditing)}
                  className="gap-2"
                >
                  {isEditing ? (
                    <>
                      <X className="h-4 w-4" />
                      Cancel
                    </>
                  ) : (
                    <>
                      <Edit2 className="h-4 w-4" />
                      Edit
                    </>
                  )}
                </Button>
              </div>
            </CardHeader>
          </Card>

          {/* Profile Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Official Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Email</label>
                  {isEditing ? (
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0B3D91] dark:bg-slate-800"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-slate-600">{formData.email}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Employee ID</label>
                  <p className="mt-1 text-sm text-slate-600">{officer.employeeId}</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Mobile</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0B3D91] dark:bg-slate-800"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-slate-600">+91-{formData.mobile}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">Office/Unit</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="officeUnit"
                      value={formData.officeUnit}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0B3D91] dark:bg-slate-800"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-slate-600">{formData.officeUnit}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">City</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0B3D91] dark:bg-slate-800"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-slate-600">{formData.city}</p>
                  )}
                </div>

                <div>
                  <label className="text-sm font-medium">State</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full mt-1 px-3 py-2 border rounded-md focus:ring-2 focus:ring-[#0B3D91] dark:bg-slate-800"
                    />
                  ) : (
                    <p className="mt-1 text-sm text-slate-600">{formData.state}</p>
                  )}
                </div>
              </div>

              {isEditing && (
                <div className="pt-4 flex gap-3">
                  <Button onClick={handleSave} className="bg-[#0B3D91] text-white gap-2">
                    <Save className="h-4 w-4" />
                    Save
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Activity Log */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recent Login Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {logins.map((login, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800">
                    <Clock className="h-4 w-4 text-[#0B3D91]" />
                    <div>
                      <p className="text-sm font-medium">
                        {new Date(login.date).toLocaleDateString('en-IN')} •{' '}
                        {new Date(login.date).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-xs text-slate-500">{login.device}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* RIGHT: Security */}
        <div className="space-y-6">
          {/* DSC Status */}
          <Card className="border-t-4 border-t-amber-500">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5" />
                DSC Token
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {dscConnected ? (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 dark:bg-green-900/20">
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900 dark:text-green-300">DSC Connected ✓</p>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-3 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20">
                  <Clock className="h-5 w-5 text-amber-600" />
                  <div>
                    <p className="font-medium text-amber-900 dark:text-amber-300">DSC Not Connected</p>
                  </div>
                </div>
              )}
              <Button
                onClick={handleConnectDSC}
                disabled={dscConnected || connectingDSC}
                className="w-full bg-[#0B3D91] text-white"
              >
                {connectingDSC && <Clock className="h-4 w-4 animate-spin mr-2" />}
                {dscConnected ? 'Connected' : 'Connect DSC'}
              </Button>
            </CardContent>
          </Card>

          {/* Wallet */}
          <Card className="border-t-4 border-t-cyan-500">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Wallet
              </CardTitle>
            </CardHeader>
            <CardContent>
              <IPFSHashPill hash={officer.walletAddress} />
            </CardContent>
          </Card>

          {/* KYC */}
          <Card className="border-t-4 border-t-green-500">
            <CardHeader>
              <CardTitle className="text-lg">KYC Status</CardTitle>
            </CardHeader>
            <CardContent>
              <KYCStatusBadge status={officer.kycStatus} />
            </CardContent>
          </Card>

          {/* Auth Letter */}
          <Card className="border-t-4 border-t-purple-500">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Auth Letter
              </CardTitle>
            </CardHeader>
            <CardContent>
              <IPFSHashPill hash={officer.authLetterIPFS} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
