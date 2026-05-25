"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search, Filter, ShieldCheck, Clock, FileText, RotateCcw, Bookmark, BookmarkCheck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import tendersData from "@/data/tenders.json"

const ITEMS_PER_PAGE = 5

export default function TendersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilters, setStatusFilters] = useState<Record<string, boolean>>({
    Open: true,
    Closed: false,
    Awarded: false,
  })
  const [categoryFilter, setCategoryFilter] = useState("All Categories")
  const [stateFilter, setStateFilter] = useState("All States")
  const [currentPage, setCurrentPage] = useState(1)
  const [bookmarked, setBookmarked] = useState<string[]>([])

  const toggleBookmark = (id: string) => {
    setBookmarked((prev) =>
      prev.includes(id) ? prev.filter((b) => b !== id) : [...prev, id]
    )
  }

  const categories = useMemo(() => {
    const cats = new Set(tendersData.map((t) => t.category))
    return ["All Categories", ...Array.from(cats)]
  }, [])

  const states = useMemo(() => {
    const sts = new Set(tendersData.map((t) => t.state))
    return ["All States", ...Array.from(sts)]
  }, [])

  const activeStatusCount = Object.values(statusFilters).filter(Boolean).length

  const filteredTenders = useMemo(() => {
    return tendersData.filter((t) => {
      const matchesSearch =
        searchTerm === "" ||
        t.tenderTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.department.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = activeStatusCount === 0 || statusFilters[t.status]

      const matchesCategory =
        categoryFilter === "All Categories" || t.category === categoryFilter

      const matchesState =
        stateFilter === "All States" || t.state === stateFilter

      return matchesSearch && matchesStatus && matchesCategory && matchesState
    })
  }, [searchTerm, statusFilters, activeStatusCount, categoryFilter, stateFilter])

  const totalPages = Math.max(1, Math.ceil(filteredTenders.length / ITEMS_PER_PAGE))
  const safePage = Math.min(currentPage, totalPages)
  const paginatedTenders = filteredTenders.slice(
    (safePage - 1) * ITEMS_PER_PAGE,
    safePage * ITEMS_PER_PAGE
  )

  const handleStatusChange = (status: string) => {
    setStatusFilters((prev) => ({ ...prev, [status]: !prev[status] }))
    setCurrentPage(1)
  }

  const handleResetFilters = () => {
    setStatusFilters({ Open: true, Closed: false, Awarded: false })
    setCategoryFilter("All Categories")
    setStateFilter("All States")
    setSearchTerm("")
    setCurrentPage(1)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-8 text-sm text-gray-500">
        <Link href="/" className="hover:text-[#0B3D91]">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900 font-medium">Live Tenders</span>
      </div>

      <div className="mb-8 md:flex md:items-end md:justify-between">
        <div>
          <h1 className="font-poppins text-3xl font-bold text-gray-900">National Tenders Portal</h1>
          <p className="mt-2 text-gray-600">Browse and bid on government procurement requests.</p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <Card className="sticky top-24">
            <CardHeader className="pb-4 border-b">
              <CardTitle className="text-lg flex items-center">
                <Filter className="mr-2 h-5 w-5" />
                Filters
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900">Status</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#0B3D91] focus:ring-[#0B3D91]"
                      checked={statusFilters.Open}
                      onChange={() => handleStatusChange("Open")}
                    />
                    <span>Open for Bidding</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#0B3D91] focus:ring-[#0B3D91]"
                      checked={statusFilters.Closed}
                      onChange={() => handleStatusChange("Closed")}
                    />
                    <span>Closed / Under Evaluation</span>
                  </label>
                  <label className="flex items-center space-x-2 text-sm text-gray-700 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-[#0B3D91] focus:ring-[#0B3D91]"
                      checked={statusFilters.Awarded}
                      onChange={() => handleStatusChange("Awarded")}
                    />
                    <span>Awarded</span>
                  </label>
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900">Category</h4>
                <select
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#0B3D91] focus:outline-none focus:ring-1 focus:ring-[#0B3D91]"
                  value={categoryFilter}
                  onChange={(e) => { setCategoryFilter(e.target.value); setCurrentPage(1) }}
                >
                  {categories.map((cat) => (
                    <option key={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-900">State</h4>
                <select
                  className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-[#0B3D91] focus:outline-none focus:ring-1 focus:ring-[#0B3D91]"
                  value={stateFilter}
                  onChange={(e) => { setStateFilter(e.target.value); setCurrentPage(1) }}
                >
                  {states.map((st) => (
                    <option key={st}>{st}</option>
                  ))}
                </select>
              </div>
              
              <Button
                className="w-full"
                variant="outline"
                onClick={handleResetFilters}
              >
                <RotateCcw className="mr-2 h-4 w-4" />
                Reset Filters
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 space-y-6">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <Input 
              type="text" 
              placeholder="Search by Tender ID, Title, or Department..." 
              className="pl-10 h-12 text-base shadow-sm"
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1) }}
            />
          </div>

          {/* Tender List */}
          <div className="space-y-4">
            {paginatedTenders.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                <FileText className="mx-auto h-12 w-12 text-gray-300 mb-3" />
                <h3 className="text-lg font-medium text-gray-900">No tenders found</h3>
                <p className="text-gray-500">Try adjusting your search or filters.</p>
              </div>
            ) : (
              paginatedTenders.map((tender) => (
                <Card key={tender.id} className="hover:shadow-md transition-shadow border border-gray-200">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                      <div className="space-y-3 flex-grow">
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{tender.id}</span>
                          <Badge variant={tender.status === 'Open' ? 'default' : tender.status === 'Closed' ? 'destructive' : 'success'}>
                            {tender.status}
                          </Badge>
                          {tender.verified && (
                            <span className="flex items-center text-xs font-medium text-[#138808] bg-[#138808]/10 px-2 py-1 rounded">
                              <ShieldCheck className="mr-1 h-3 w-3" />
                              On-Chain
                            </span>
                          )}
                        </div>
                        
                        <div>
                          <Link href={`/tenders/${tender.id}`}>
                            <h3 className="text-xl font-bold text-[#0B3D91] hover:underline leading-tight">
                              {tender.tenderTitle}
                            </h3>
                          </Link>
                          <p className="text-sm text-gray-600 mt-1">{tender.department}</p>
                        </div>
                        
                        <div className="flex flex-wrap gap-y-2 gap-x-6 text-sm">
                          <div>
                            <span className="text-gray-500 uppercase tracking-wider text-xs">Budget: </span>
                            <span className="font-semibold text-gray-900">₹ {(tender.budget / 10000000).toFixed(1)} Cr</span>
                          </div>
                          <div>
                            <span className="text-gray-500 uppercase tracking-wider text-xs">Location: </span>
                            <span className="font-semibold text-gray-900">{tender.state}</span>
                          </div>
                          <div className="flex items-center text-[#DC2626]">
                            <Clock className="mr-1 h-4 w-4" />
                            <span className="font-medium">Ends: {new Date(tender.deadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-row md:flex-col gap-3 min-w-[140px]">
                        <Link href={`/tenders/${tender.id}`} className="w-full">
                          <Button className="w-full font-semibold">View Details</Button>
                        </Link>
                        <Link href={`/ledger?search=${tender.hash}`} className="w-full">
                          <Button variant="outline" className="w-full text-xs h-9">Verify Hash</Button>
                        </Link>
                        <Button
                          variant="outline"
                          className={`w-full text-xs h-9 ${bookmarked.includes(tender.id) ? "bg-amber-50 border-amber-300 text-amber-700" : ""}`}
                          onClick={() => toggleBookmark(tender.id)}
                        >
                          {bookmarked.includes(tender.id) ? (
                            <><BookmarkCheck className="h-4 w-4 mr-1" /> Saved</>
                          ) : (
                            <><Bookmark className="h-4 w-4 mr-1" /> Watch</>
                          )}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
          
          {/* Pagination */}
          {filteredTenders.length > 0 && (
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 rounded-lg mt-6 shadow-sm">
              <div className="flex flex-1 justify-between sm:hidden">
                <Button
                  variant="outline"
                  disabled={safePage <= 1}
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                >
                  Previous
                </Button>
                <Button
                  variant="outline"
                  disabled={safePage >= totalPages}
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                >
                  Next
                </Button>
              </div>
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing{' '}
                    <span className="font-medium">{(safePage - 1) * ITEMS_PER_PAGE + 1}</span>{' '}
                    to{' '}
                    <span className="font-medium">{Math.min(safePage * ITEMS_PER_PAGE, filteredTenders.length)}</span>{' '}
                    of <span className="font-medium">{filteredTenders.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <Button
                      variant="outline"
                      className="rounded-l-md rounded-r-none border-r-0 focus:z-20"
                      disabled={safePage <= 1}
                      onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    >
                      Previous
                    </Button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        variant="outline"
                        className={`rounded-none focus:z-20 ${
                          page === safePage ? "bg-[#0B3D91] text-white hover:bg-[#0B3D91]/90" : ""
                        }`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant="outline"
                      className="rounded-l-none rounded-r-md focus:z-20"
                      disabled={safePage >= totalPages}
                      onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    >
                      Next
                    </Button>
                  </nav>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
