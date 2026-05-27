/**
 * 404 Not Found Page
 * Global error page for non-existent routes
 */

/* eslint-disable react/no-unescaped-entities */
import Link from 'next/link'
import { Home, Eye, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4">
      <div className="text-center max-w-md">
        {/* Large 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#0B3D91]">404</h1>
          <div className="text-2xl font-semibold text-slate-900 mt-4">Page Not Found</div>
        </div>

        {/* Description */}
        <p className="text-slate-600 mb-8 text-lg">
          The page you are looking for doesn't exist or has been moved. Let&#39;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button className="bg-[#0B3D91] text-white hover:bg-[#082860] w-full sm:w-auto" size="lg">
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>
          <Link href="/tenders">
            <Button variant="outline" size="lg" className="border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white w-full sm:w-auto">
              <Eye className="mr-2 h-5 w-5" />
              View Tenders
            </Button>
          </Link>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center mt-8 text-[#0B3D91] hover:text-[#082860] font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Link>
      </div>
    </div>
  )
}