/**
 * 404 Not Found Page
 * Global error page for non-existent routes
 */

import Link from 'next/link'
import { Home, Eye, ArrowLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 px-4">
      <div className="text-center max-w-md">
        {/* Large 404 */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-[#0B3D91] dark:text-blue-400">404</h1>
          <div className="text-2xl font-semibold text-slate-900 dark:text-white mt-4">Page Not Found</div>
        </div>

        {/* Description */}
        <p className="text-slate-600 dark:text-slate-300 mb-8 text-lg">
          The page you are looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <Button
              className="bg-[#0B3D91] text-white hover:bg-[#082860] w-full sm:w-auto"
              size="lg"
            >
              <Home className="mr-2 h-5 w-5" />
              Go Home
            </Button>
          </Link>

          <Link href="/tenders">
            <Button
              variant="outline"
              size="lg"
              className="border-[#0B3D91] text-[#0B3D91] hover:bg-[#0B3D91] hover:text-white w-full sm:w-auto"
            >
              <Eye className="mr-2 h-5 w-5" />
              View Tenders
            </Button>
          </Link>
        </div>

        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center mt-8 text-[#0B3D91] hover:text-[#082860] dark:text-blue-400 dark:hover:text-blue-300 font-medium"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Go Back
        </Link>
      </div>

      {/* Decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 dark:bg-blue-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-green-200 dark:bg-green-900/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
      </div>
    </div>
  )
}
