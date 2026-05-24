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
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import tenders from "@/data/tenders.json"

interface AdminPageContentProps {
  page?: string
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

export function AdminPageContent({ page = "dashboard" }: AdminPageContentProps) {
  const [searchQuery, setSearchQuery] = React.useState("")

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
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{tender.title}</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500 text-xs">Budget</p>
                          <p className="font-semibold text-gray-900">{tender.budget}</p>
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
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pageConfig.title}</h1>
          <p className="text-gray-600 mt-1">{pageConfig.description}</p>
        </div>
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <Scale className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Bid Evaluation Module</p>
          <p className="text-gray-500 text-sm mt-1">Select a tender from &quot;My Tenders&quot; to evaluate bids</p>
          <Link href="?page=tenders" className="mt-4 inline-block">
            <Button variant="outline">View My Tenders</Button>
          </Link>
        </div>
      </div>
    )
  }

  // Dispute Management Content
  if (page === "disputes") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pageConfig.title}</h1>
          <p className="text-gray-600 mt-1">{pageConfig.description}</p>
        </div>
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <MessageSquareWarning className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No Active Disputes</p>
          <p className="text-gray-500 text-sm mt-1">Vendor disputes will appear here when submitted</p>
        </div>
      </div>
    )
  }

  // Reports Content
  if (page === "reports") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pageConfig.title}</h1>
          <p className="text-gray-600 mt-1">{pageConfig.description}</p>
        </div>
        <div className="text-center py-12 bg-gray-50 rounded-lg border border-gray-200">
          <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">Reports & Analytics</p>
          <p className="text-gray-500 text-sm mt-1">Comprehensive reports will be available soon</p>
        </div>
      </div>
    )
  }

  // Officer Profile Content
  if (page === "profile") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pageConfig.title}</h1>
          <p className="text-gray-600 mt-1">{pageConfig.description}</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-8">
          <div className="max-w-2xl space-y-8">
            <div className="pb-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Personal Information</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 font-medium">Officer Name</p>
                  <p className="text-gray-900 font-medium mt-1">Anita Deshmukh</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Email</p>
                  <p className="text-gray-900 font-medium mt-1">anita.deshmukh@gov.in</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Designation</p>
                  <p className="text-gray-900 font-medium mt-1">Procurement Officer</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 font-medium">Ministry</p>
                  <p className="text-gray-900 font-medium mt-1">Ministry of Road Transport</p>
                </div>
              </div>
            </div>
            <div>
              <Button variant="outline">Edit Profile</Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // Notifications Content
  if (page === "notifications") {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{pageConfig.title}</h1>
          <p className="text-gray-600 mt-1">{pageConfig.description}</p>
        </div>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-start gap-4">
                <div className="h-2 w-2 rounded-full bg-blue-500 mt-2 flex-shrink-0" />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">New bid received on Tender NIT/2026/00{i}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    A new bid has been submitted by vendor for your tender
                  </p>
                  <p className="text-xs text-gray-500 mt-2">{i} hours ago</p>
                </div>
                <button className="text-gray-400 hover:text-gray-600">×</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return null
}
