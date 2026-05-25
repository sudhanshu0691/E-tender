"use client"

import React from "react"
import Link from "next/link"
import {
  FileText,
  Scale,
  MessageSquareWarning,
  BarChart3,
  UserCog,
  Bell,
  Plus,
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Edit2,
  Save,
  X,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import tenders from "@/data/tenders.json"
import disputesData from "@/data/disputes.json"
import notificationsData from "@/data/notifications.json"
import tenderBidsData from "@/data/tenderBids.json"
import officersData from "@/data/officers.json"

interface AdminPageContentProps {
  page?: string
}

interface Dispute {
  id: string
  tenderId: string
  tenderTitle: string
  claimantId: string
  claimantName: string
  reason: string
  evidenceIPFSHash: string
  submittedAt: string
  status: string
  resolutionText: string | null
  resolutionIPFSHash: string | null
  resolvedAt: string | null
}

interface NotifItem {
  id: string
  type: string
  title: string
  message: string
  timestamp: string
  read: boolean
  tenderId: string | null
}

const pages = {
  tenders: {
    title: "My Tenders",
    description: "Manage all tenders created by you",
    icon: FileText,
  },
  bids: {
    title: "Bid Evaluation",
    description: "Evaluate and score vendor bids",
    icon: Scale,
  },
  disputes: {
    title: "Dispute Management",
    description: "Manage and resolve vendor disputes",
    icon: MessageSquareWarning,
  },
  reports: {
    title: "Reports & Analytics",
    description: "View procurement reports and analytics",
    icon: BarChart3,
  },
  profile: {
    title: "Officer Profile",
    description: "Manage your profile and settings",
    icon: UserCog,
  },
  notifications: {
    title: "Notifications",
    description: "View all notifications",
    icon: Bell,
  },
}

const statusBadgeStyles: Record<string, string> = {
  "under-review": "bg-amber-100 text-amber-800 border-amber-200",
  open: "bg-blue-100 text-blue-800 border-blue-200",
  resolved: "bg-green-100 text-green-800 border-green-200",
  rejected: "bg-red-100 text-red-800 border-red-200",
}

export function AdminPageContent({ page = "dashboard" }: AdminPageContentProps) {
  const [searchQuery, setSearchQuery] = React.useState("")
  const [disputeStatuses, setDisputeStatuses] = React.useState<Record<string, string>>({})
  const [readNotifs, setReadNotifs] = React.useState<Set<string>>(new Set())
  const [isEditing, setIsEditing] = React.useState(false)
  const [profileData, setProfileData] = React.useState({
    name: "Anita Deshmukh",
    email: "anita.deshmukh@gov.in",
    mobile: "+91 9876543210",
    designation: "Procurement Officer",
    ministry: "Ministry of Road Transport",
    department: "Public Works Department",
  })
  const [savedToast, setSavedToast] = React.useState(false)

  const pageConfig = pages[page as keyof typeof pages]

  if (!pageConfig) {
    return null
  }

  // My Tenders Content
  if (page === "tenders") {
    const filteredTenders = tenders.filter(
      (t) =>
        t.tenderTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.department.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{pageConfig.title}</h1>
            <p className="text-gray-600 mt-1">{pageConfig.description}</p>
          </div>
          <Link href="/admin/tender/create">
            <Button className="bg-[#138808] hover:bg-[#138808]/90">
              <Plus className="h-4 w-4 mr-2" />
              Create New Tender
            </Button>
          </Link>
        </div>

        <div className="relative">
          <Input
            placeholder="Search by NIT No. or title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="grid gap-4">
          {filteredTenders.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600">No tenders found</p>
            </div>
          ) : (
            filteredTenders.map((tender) => (
              <Link key={tender.id} href={`/admin/tender/${tender.id}`}>
                <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm font-mono text-gray-500">{tender.id}</span>
                        <span className="text-xs font-semibold px-2 py-1 rounded bg-blue-100 text-blue-700">
                          {tender.status}
                        </span>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{tender.tenderTitle}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Budget</p>
                          <p className="font-semibold text-gray-900">₹ {(tender.budget / 10000000).toFixed(1)} Cr</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">State</p>
                          <p className="font-semibold text-gray-900">{tender.state}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Bids Received</p>
                          <p className="font-semibold text-gray-900">{tender.bidsReceived || 0}</p>
                        </div>
                        <div>
                          <p className="text-gray-500 text-xs">Deadline</p>
                          <p className="font-semibold text-gray-900">
                            {new Date(tender.deadline).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 mt-1" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    )
  }

  // Bid Evaluation Content
  if (page === "bids") {
    const bidEntries = Object.entries(tenderBidsData as Record<string, { tenderId?: string; tenderTitle?: string; bids?: { companyName: string; totalScore: number; status: string }[] }>)
      .filter(([, val]) => val && typeof val === "object" && "bids" in val && Array.isArray(val.bids) && val.bids.length > 0)

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pageConfig.title}</h1>
          <p className="text-gray-600 mt-1">{pageConfig.description}</p>
        </div>
        {bidEntries.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No bids to evaluate</p>
            <p className="text-gray-500 text-sm mt-1">Select a tender from &quot;My Tenders&quot; to evaluate bids</p>
            <Link href="?page=tenders" className="mt-4 inline-block">
              <Button variant="outline">View My Tenders</Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {bidEntries.map(([tenderId, data]) => (
              <Card key={tenderId}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-lg">{data.tenderTitle || tenderId}</CardTitle>
                      <CardDescription className="font-mono">{tenderId}</CardDescription>
                    </div>
                    <Link href={`/admin/tender/${tenderId}`}>
                      <Button size="sm" variant="outline" className="border-[#0B3D91] text-[#0B3D91]">
                        Evaluate
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-gray-600">
                    {data.bids?.length || 0} bids received
                    {data.bids && data.bids.length > 0 && (
                      <span className="ml-2">
                        — Top scorer: <span className="font-semibold">{data.bids.reduce((best, b) => b.totalScore > best.totalScore ? b : best, data.bids[0]).companyName}</span>
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    )
  }

  // Dispute Management Content
  if (page === "disputes") {
    const allDisputes: Dispute[] = Object.values(disputesData as Record<string, Dispute[]>).flat()

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pageConfig.title}</h1>
          <p className="text-gray-600 mt-1">{pageConfig.description}</p>
        </div>
        {allDisputes.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
            <MessageSquareWarning className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 font-medium">No Active Disputes</p>
            <p className="text-gray-500 text-sm mt-1">Vendor disputes will appear here when submitted</p>
          </div>
        ) : (
          <div className="space-y-4">
            {allDisputes.map((dispute) => {
              const effectiveStatus = disputeStatuses[dispute.id] ?? dispute.status
              return (
                <Card key={dispute.id} className="border-l-4 border-l-amber-400">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-semibold text-gray-500">{dispute.id}</span>
                          <Badge
                            variant="outline"
                            className={statusBadgeStyles[effectiveStatus] ?? "bg-gray-100 text-gray-700"}
                          >
                            {effectiveStatus.replace("-", " ")}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{dispute.tenderTitle}</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Claimant:</span> {dispute.claimantName}
                        </p>
                        <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg border border-gray-100">
                          {dispute.reason}
                        </p>
                        <div className="mt-3 flex gap-4 text-xs text-gray-500">
                          <span>Filed: {new Date(dispute.submittedAt).toLocaleDateString("en-IN")}</span>
                          <span>Tender: {dispute.tenderId}</span>
                        </div>
                      </div>
                      {effectiveStatus !== "resolved" && effectiveStatus !== "rejected" && (
                        <div className="flex gap-2 shrink-0">
                          <Button
                            size="sm"
                            className="bg-[#138808] hover:bg-[#138808]/90"
                            onClick={() => {
                              setDisputeStatuses((prev) => ({ ...prev, [dispute.id]: "resolved" }))
                            }}
                          >
                            <CheckCircle2 className="mr-1 h-4 w-4" />
                            Resolve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-red-200 text-red-700 hover:bg-red-50"
                            onClick={() => {
                              setDisputeStatuses((prev) => ({ ...prev, [dispute.id]: "rejected" }))
                            }}
                          >
                            <X className="mr-1 h-4 w-4" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        )}
      </div>
    )
  }

  // Reports Content
  if (page === "reports") {
    const totalTenders = tenders.length
    const openTenders = tenders.filter((t) => t.status === "Open").length
    const closedTenders = tenders.filter((t) => t.status === "Closed").length
    const awardedTenders = tenders.filter((t) => t.status === "Awarded").length
    const totalBudget = tenders.reduce((sum, t) => sum + Number(t.budget), 0)
    const totalBids = tenders.reduce((sum, t) => sum + (t.bidsReceived || 0), 0)
    const avgBidsPerTender = totalTenders > 0 ? (totalBids / totalTenders).toFixed(1) : "0"

    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pageConfig.title}</h1>
          <p className="text-gray-600 mt-1">{pageConfig.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
          <Card className="border-l-4 border-l-[#0B3D91]">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">Total Tenders</p>
              <h3 className="text-3xl font-bold text-gray-900 mt-1">{totalTenders}</h3>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-green-500">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">Open Tenders</p>
              <h3 className="text-3xl font-bold text-green-700 mt-1">{openTenders}</h3>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-amber-500">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">Under Evaluation</p>
              <h3 className="text-3xl font-bold text-amber-700 mt-1">{closedTenders}</h3>
            </CardContent>
          </Card>
          <Card className="border-l-4 border-l-purple-500">
            <CardContent className="p-6">
              <p className="text-sm text-gray-500">Awarded</p>
              <h3 className="text-3xl font-bold text-purple-700 mt-1">{awardedTenders}</h3>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Procurement Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Published Value</span>
                <span className="font-semibold">₹ {(totalBudget / 10000000).toFixed(1)} Cr</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Total Bids Received</span>
                <span className="font-semibold">{totalBids}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-100">
                <span className="text-sm text-gray-600">Avg Bids per Tender</span>
                <span className="font-semibold">{avgBidsPerTender}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-sm text-gray-600">Award Rate</span>
                <span className="font-semibold text-[#138808]">
                  {totalTenders > 0 ? Math.round((awardedTenders / totalTenders) * 100) : 0}%
                </span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tender Status Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { label: "Open", count: openTenders, total: totalTenders, color: "bg-green-500" },
                  { label: "Closed", count: closedTenders, total: totalTenders, color: "bg-amber-500" },
                  { label: "Awarded", count: awardedTenders, total: totalTenders, color: "bg-purple-500" },
                ].map((item) => (
                  <div key={item.label}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">{item.label}</span>
                      <span className="font-medium">{item.count} ({item.total > 0 ? Math.round((item.count / item.total) * 100) : 0}%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${item.color} rounded-full`}
                        style={{ width: `${item.total > 0 ? (item.count / item.total) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Tender Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-4 py-3">Tender</th>
                    <th className="px-4 py-3">Department</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Budget</th>
                    <th className="px-4 py-3">Bids</th>
                    <th className="px-4 py-3">Deadline</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {tenders.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900">{t.tenderTitle}</p>
                        <p className="text-xs text-gray-500">{t.id}</p>
                      </td>
                      <td className="px-4 py-3 text-gray-600">{t.department}</td>
                      <td className="px-4 py-3">
                        <Badge variant="outline" className={
                          t.status === "Open" ? "bg-green-100 text-green-700" :
                          t.status === "Closed" ? "bg-amber-100 text-amber-700" :
                          "bg-purple-100 text-purple-700"
                        }>
                          {t.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 font-mono">₹ {(t.budget / 10000000).toFixed(1)} Cr</td>
                      <td className="px-4 py-3">{t.bidsReceived || 0}</td>
                      <td className="px-4 py-3 text-gray-600">{new Date(t.deadline).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Officer Profile Content
  if (page === "profile") {
    const officer = (officersData as Record<string, unknown>[])[0] ?? {}

    const handleSave = () => {
      setIsEditing(false)
      setSavedToast(true)
      setTimeout(() => setSavedToast(false), 3000)
    }

    return (
      <div className="space-y-6">
        {savedToast && (
          <div className="fixed right-4 top-4 z-50 rounded-lg border border-green-200 bg-green-50 px-4 py-3 shadow-lg">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-green-700" />
              <p className="text-sm font-medium text-green-900">Profile updated successfully</p>
            </div>
          </div>
        )}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{pageConfig.title}</h1>
            <p className="text-gray-600 mt-1">{pageConfig.description}</p>
          </div>
          <Button
            variant={isEditing ? "destructive" : "outline"}
            onClick={() => {
              if (isEditing) {
                setIsEditing(false)
              } else {
                setIsEditing(true)
              }
            }}
          >
            {isEditing ? (
              <><X className="mr-2 h-4 w-4" /> Cancel</>
            ) : (
              <><Edit2 className="mr-2 h-4 w-4" /> Edit Profile</>
            )}
          </Button>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="max-w-2xl space-y-8">
            <div className="pb-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                {([
                  ["name", "Officer Name"],
                  ["email", "Email"],
                  ["designation", "Designation"],
                  ["ministry", "Ministry"],
                  ["department", "Department"],
                  ["mobile", "Mobile"],
                ] as const).map(([field, label]) => (
                  <div key={field}>
                    <p className="text-sm text-gray-500 font-medium">{label}</p>
                    {isEditing ? (
                      <Input
                        value={profileData[field]}
                        onChange={(e) => setProfileData((prev) => ({ ...prev, [field]: e.target.value }))}
                        className="mt-1"
                      />
                    ) : (
                      <p className="text-gray-900 font-medium mt-1">{profileData[field]}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
            {isEditing && (
              <div className="flex justify-end">
                <Button className="bg-[#0B3D91]" onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            )}
            {!isEditing && (
              <div className="pb-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Blockchain Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Wallet Address</p>
                    <p className="text-gray-900 font-mono text-sm mt-1">{String(officer.walletAddress ?? "Not connected")}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">DSC Status</p>
                    <Badge className={String(officer.dscStatus) === "connected" ? "bg-green-100 text-green-800 mt-1" : "bg-amber-100 text-amber-800 mt-1"}>
                      {String(officer.dscStatus ?? "Unknown")}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">KYC Status</p>
                    <Badge className="bg-green-100 text-green-800 mt-1">
                      {String(officer.kycStatus ?? "Unknown")}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 font-medium">Employee ID</p>
                    <p className="text-gray-900 font-medium mt-1">{String(officer.employeeId ?? "N/A")}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // Notifications Content
  if (page === "notifications") {
    const notifs = notificationsData as NotifItem[]
    const unreadCount = notifs.filter((n) => !n.read && !readNotifs.has(n.id)).length

    const handleMarkRead = (id: string) => {
      setReadNotifs((prev) => new Set(prev).add(id))
    }

    const handleMarkAllRead = () => {
      setReadNotifs(new Set(notifs.map((n) => n.id)))
    }

    const formatDate = (dateStr: string) => {
      const date = new Date(dateStr)
      const now = new Date()
      const diffMs = now.getTime() - date.getTime()
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
      const diffDays = Math.floor(diffHours / 24)
      if (diffHours < 1) return "Just now"
      if (diffHours < 24) return `${diffHours}h ago`
      if (diffDays === 1) return "Yesterday"
      if (diffDays < 7) return `${diffDays}d ago`
      return date.toLocaleDateString("en-IN")
    }

    const iconMap: Record<string, React.ReactNode> = {
      tender_published: <Bell className="h-4 w-4 text-blue-600" />,
      bid_confirmed: <CheckCircle2 className="h-4 w-4 text-teal-600" />,
      deadline_reminder: <Clock className="h-4 w-4 text-amber-600" />,
      winner_declared: <CheckCircle2 className="h-4 w-4 text-yellow-600" />,
      dispute_update: <AlertTriangle className="h-4 w-4 text-red-600" />,
      dispute_raised: <AlertTriangle className="h-4 w-4 text-red-600" />,
      kyc_approved: <CheckCircle2 className="h-4 w-4 text-green-600" />,
      system_alert: <AlertTriangle className="h-4 w-4 text-gray-600" />,
    }

    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{pageConfig.title}</h1>
            <p className="text-gray-600 mt-1">{pageConfig.description}</p>
          </div>
          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <Badge className="bg-red-100 text-red-700">{unreadCount} unread</Badge>
            )}
            <Button variant="outline" size="sm" onClick={handleMarkAllRead}>
              Mark all as read
            </Button>
          </div>
        </div>
        <div className="space-y-3">
          {notifs.map((notif) => {
            const isRead = notif.read || readNotifs.has(notif.id)
            return (
              <div
                key={notif.id}
                className={`bg-white border rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer ${
                  isRead ? "border-gray-200" : "border-l-4 border-l-[#0B3D91] border-gray-200"
                }`}
                onClick={() => handleMarkRead(notif.id)}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1 shrink-0">
                    {iconMap[notif.type] ?? <Bell className="h-4 w-4 text-gray-400" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className={`font-medium ${isRead ? "text-gray-600" : "text-gray-900"}`}>
                        {notif.title}
                      </p>
                      {!isRead && (
                        <span className="h-2 w-2 rounded-full bg-[#0B3D91] shrink-0" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{notif.message}</p>
                    <p className="text-xs text-gray-500 mt-2">{formatDate(notif.timestamp)}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  return null
}
