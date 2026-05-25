"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, CheckCircle2, ShieldCheck, FileText, Blocks, Lock, Loader2, Radio, RefreshCw, Search, FileLock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import tendersData from "@/data/tenders.json"

type LiveNewsArticle = {
  title: string
  url: string
  source: string
  publishedAt: string
  summary: string
}

function formatNewsTimestamp(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return "Just now"
  }

  return date.toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  })
}

export default function Home() {
  const [newsItems, setNewsItems] = useState<LiveNewsArticle[]>([])
  const [newsLoading, setNewsLoading] = useState(true)
  const [newsRefreshing, setNewsRefreshing] = useState(false)
  const [newsError, setNewsError] = useState<string | null>(null)

  const loadNews = async (mode: "initial" | "refresh" = "initial") => {
    if (mode === "initial") {
      setNewsLoading(true)
    } else {
      setNewsRefreshing(true)
    }

    try {
      const response = await fetch("/api/live-news", {
        cache: "no-store",
      })

      if (!response.ok) {
        throw new Error("Unable to load live news")
      }

      const data = (await response.json()) as { articles?: LiveNewsArticle[] }
      setNewsItems(Array.isArray(data.articles) ? data.articles : [])
      setNewsError(null)
    } catch {
      setNewsError("Live news is temporarily unavailable.")
    } finally {
      if (mode === "initial") {
        setNewsLoading(false)
      } else {
        setNewsRefreshing(false)
      }
    }
  }

  useEffect(() => {
    void loadNews("initial")

    const intervalId = window.setInterval(() => {
      void loadNews("refresh")
    }, 5 * 60 * 1000)

    return () => window.clearInterval(intervalId)
  }, [])

  const topStory = newsItems[0]
  const supportingStories = newsItems.slice(1, 4)

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D91]/5 to-transparent"></div>
        <div className="container relative mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-14 md:grid-cols-2 lg:gap-10">
            <div className="space-y-8">
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

      {/* Recent Tenders */}
      <section className="border-y border-gray-200 bg-[#F8F9FC] py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl">
              <h2 className="font-poppins text-3xl font-bold text-gray-900">Recent Live Tenders</h2>
              <p className="mt-3 text-gray-600">Browse the latest public procurement requests with the most important details up front.</p>
            </div>
            <Link href="/tenders" className="hidden md:inline-flex text-[#0B3D91] font-semibold hover:underline items-center">
              View All Tenders <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {tendersData.slice(0, 3).map((tender) => (
              <Card key={tender.id} className="flex flex-col border border-gray-200">
                <CardHeader className="pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-mono font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded">{tender.id}</span>
                    <Badge variant={tender.status === 'Open' ? 'default' : tender.status === 'Closed' ? 'destructive' : 'success'}>
                      {tender.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg line-clamp-2 leading-tight">{tender.tenderTitle}</CardTitle>
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

      {/* Trust Stats Strip */}
      <section className="border-y border-gray-200 bg-white py-14 md:py-16">
        <div className="container mx-auto max-w-7xl px-4">
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
      <section className="border-y border-gray-200 bg-white py-16 md:py-20">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-14 text-center">
            <h2 className="font-poppins text-3xl font-bold text-gray-900 md:text-4xl">How TenderChain Works</h2>
            <p className="mt-4 text-lg text-gray-600">A clear four-step process with enough space to read each action without visual clutter.</p>
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

      {/* Live News */}
      <section className="border-y border-gray-200 bg-[#F8F9FC] py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div className="max-w-2xl space-y-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#0B3D91]/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.35em] text-[#0B3D91] shadow-sm">
                <Radio className="h-3.5 w-3.5 animate-pulse" />
                Live News
              </div>
              <div className="space-y-2">
                <h2 className="font-poppins text-3xl font-bold text-gray-900 md:text-4xl">TenderChain Live News</h2>
                <p className="max-w-xl text-base leading-7 text-gray-600">
                  Fresh procurement, governance, and infrastructure updates pulled from a public news API and refreshed automatically.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-white px-3 py-2 text-xs font-semibold text-emerald-700 shadow-sm">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                Updated live
              </div>
              <Button
                type="button"
                variant="outline"
                onClick={() => void loadNews("refresh")}
                disabled={newsRefreshing}
                className="border-gray-300 bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                <RefreshCw className={`mr-2 h-4 w-4 ${newsRefreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>
            </div>
          </div>

          {newsLoading ? (
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
              <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="animate-pulse space-y-4">
                  <div className="h-4 w-28 rounded bg-gray-200" />
                  <div className="h-8 w-4/5 rounded bg-gray-200" />
                  <div className="h-4 w-full rounded bg-gray-200" />
                  <div className="h-4 w-11/12 rounded bg-gray-200" />
                  <div className="h-4 w-2/3 rounded bg-gray-200" />
                  <div className="h-10 w-40 rounded-full bg-gray-200" />
                </div>
              </div>
              <div className="space-y-4">
                {[0, 1, 2].map((index) => (
                  <div key={index} className="rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
                    <div className="animate-pulse space-y-3">
                      <div className="h-3 w-24 rounded bg-gray-200" />
                      <div className="h-5 w-full rounded bg-gray-200" />
                      <div className="h-4 w-5/6 rounded bg-gray-200" />
                      <div className="h-4 w-2/5 rounded bg-gray-200" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : newsError && newsItems.length === 0 ? (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-gray-500">Live feed</p>
              <h3 className="mt-3 text-xl font-bold text-gray-900">News feed unavailable</h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-600">{newsError}</p>
              <Button type="button" className="mt-6 bg-[#0B3D91] hover:bg-[#0B3D91]/90" onClick={() => void loadNews("refresh")}>
                Try Again
              </Button>
            </div>
          ) : topStory ? (
            <div className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
              <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">
                <CardHeader className="border-b border-gray-100 bg-gradient-to-br from-[#0B3D91]/5 to-transparent p-6">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="space-y-2">
                      <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gray-500">Top Story</p>
                      <CardTitle className="max-w-2xl text-2xl leading-tight text-gray-900">{topStory.title}</CardTitle>
                    </div>
                    <span className="inline-flex items-center rounded-full bg-[#138808]/10 px-3 py-1 text-xs font-semibold text-[#138808]">
                      Live
                    </span>
                  </div>
                  <CardDescription className="mt-4 text-sm leading-6 text-gray-600">
                    {topStory.summary || "Latest governance and procurement coverage from the live feed."}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-5 p-6">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="rounded-full bg-gray-100 px-3 py-1 font-semibold text-gray-700">{topStory.source}</span>
                    <span>{formatNewsTimestamp(topStory.publishedAt)}</span>
                    {newsRefreshing ? (
                      <span className="inline-flex items-center gap-2 text-[#0B3D91]">
                        <Loader2 className="h-3.5 w-3.5 animate-spin" /> Refreshing
                      </span>
                    ) : null}
                  </div>
                  <a
                    href={topStory.url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-[#0B3D91] hover:underline"
                  >
                    Read full story
                    <ArrowRight className="h-4 w-4" />
                  </a>
                </CardContent>
              </Card>

              <div className="space-y-4">
                {supportingStories.length > 0 ? (
                  supportingStories.map((article) => (
                    <Card key={`${article.title}-${article.publishedAt}`} className="border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between gap-3">
                          <div className="space-y-2">
                            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-gray-500">{article.source}</p>
                            <h3 className="text-base font-semibold leading-snug text-gray-900">{article.title}</h3>
                            <p className="line-clamp-3 text-sm leading-6 text-gray-600">{article.summary}</p>
                          </div>
                          <span className="rounded-full bg-gray-100 px-2.5 py-1 text-[11px] font-semibold text-gray-600">
                            News
                          </span>
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-3 text-xs text-gray-500">
                          <span>{formatNewsTimestamp(article.publishedAt)}</span>
                          <a href={article.url} target="_blank" rel="noreferrer" className="font-semibold text-[#0B3D91] hover:underline">
                            Open
                          </a>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card className="border border-gray-200 bg-white shadow-sm">
                    <CardContent className="p-5 text-sm text-gray-600">
                      News items are loading. Please check back in a moment.
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          ) : (
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-gray-600">No live news items are available right now.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
