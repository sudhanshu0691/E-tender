import { NextResponse } from "next/server"

type LiveNewsArticle = {
  title: string
  url: string
  source: string
  publishedAt: string
  summary: string
}

const fallbackArticles: LiveNewsArticle[] = [
  {
    title: "Tender transparency and digital procurement tools continue to expand across Indian agencies",
    url: "/tenders",
    source: "TenderChain Desk",
    publishedAt: new Date().toISOString(),
    summary: "Track recent procurement activity, blockchain verification, and public spending updates across the portal.",
  },
  {
    title: "Infrastructure and public works programs see increased digitization in tender workflows",
    url: "/public-analytics",
    source: "TenderChain Desk",
    publishedAt: new Date().toISOString(),
    summary: "Live analytics and tender records help surface procurement trends for ministries, vendors, and the public.",
  },
  {
    title: "Governance platforms push for stronger auditability and immutable record keeping",
    url: "/ledger",
    source: "TenderChain Desk",
    publishedAt: new Date().toISOString(),
    summary: "Use the transparency ledger to verify public tender events and review on-chain actions in real time.",
  },
]

export async function GET() {
  const query = encodeURIComponent("India procurement tender infrastructure healthcare energy")
  const endpoint = `https://api.gdeltproject.org/api/v2/doc/doc?query=${query}&mode=ArtList&format=json&maxrecords=6&sort=HybridRel`

  try {
    const response = await fetch(endpoint, {
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error("Failed to fetch live news")
    }

    const payload = (await response.json()) as {
      articles?: Array<{
        title?: string
        url?: string
        domain?: string
        seendate?: string
        snippet?: string
      }>
    }

    const articles =
      payload.articles
        ?.filter((article) => Boolean(article.title && article.url))
        .slice(0, 4)
        .map((article) => ({
          title: article.title ?? "Untitled story",
          url: article.url ?? "/",
          source: article.domain ?? "GDELT",
          publishedAt: article.seendate ?? new Date().toISOString(),
          summary: article.snippet ?? "Latest live update from the public news feed.",
        })) ?? []

    if (articles.length === 0) {
      return NextResponse.json({ articles: fallbackArticles })
    }

    return NextResponse.json({ articles })
  } catch {
    return NextResponse.json({ articles: fallbackArticles })
  }
}