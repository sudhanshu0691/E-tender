/**
 * Global Loading Skeleton UI
 * Displays while page is loading
 */

export default function Loading() {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header skeleton */}
        <div className="mb-8 space-y-4">
          <div className="h-10 w-3/4 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
          <div className="h-4 w-1/2 animate-pulse rounded-md bg-gray-200 dark:bg-gray-700" />
        </div>

        {/* Content grid skeleton */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {/* Main content */}
          <div className="md:col-span-2 space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="space-y-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
                <div className="h-6 w-1/4 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="space-y-2">
                  <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                  <div className="h-4 w-5/6 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                </div>
              </div>
            ))}
          </div>

          {/* Sidebar skeleton */}
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="space-y-3 rounded-lg border border-gray-200 p-6 dark:border-gray-700"
              >
                <div className="h-6 w-1/3 animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
                <div className="h-4 w-full animate-pulse rounded bg-gray-200 dark:bg-gray-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
