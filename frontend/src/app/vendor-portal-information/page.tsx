import Link from "next/link"
import { BookOpenCheck, Building2, CircleCheck, LockKeyhole, Scale } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const onboardingSteps = [
  "Create your vendor account with PAN and GST profile details.",
  "Complete e-KYC and upload mandatory compliance documents.",
  "Connect wallet and configure bid-signature preferences.",
  "Track active tenders, submit encrypted bids, and monitor outcomes.",
]

const controls = [
  "Immutable bid submission and deadline enforcement",
  "On-chain audit timeline for key tender events",
  "Role-based access with officer/vendor segregation",
  "Dispute filing trail with evidence hash references",
]

export default function VendorPortalInformationPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 px-4 py-10 sm:px-6 lg:px-8">
      <div className="space-y-3">
        <p className="inline-flex items-center gap-2 rounded-full border border-[#0B3D91]/15 bg-[#0B3D91]/5 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#0B3D91]">
          <Building2 className="h-3.5 w-3.5" />
          Vendor Portal Information
        </p>
        <h1 className="text-3xl font-bold text-slate-900">How the Vendor Portal Works</h1>
        <p className="max-w-3xl text-sm text-slate-600">
          Understand onboarding, bid lifecycle controls, and transparency features before participating in tenders.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <BookOpenCheck className="h-5 w-5 text-[#0B3D91]" />
              Onboarding Journey
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-3 text-sm text-slate-700">
              {onboardingSteps.map((step, index) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-[#0B3D91]/10 text-xs font-semibold text-[#0B3D91]">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <LockKeyhole className="h-5 w-5 text-[#0B3D91]" />
              Compliance and Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm text-slate-700">
              {controls.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CircleCheck className="mt-0.5 h-4 w-4 text-[#138808]" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Scale className="h-5 w-5 text-[#0B3D91]" />
            Recommended Next Steps
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-3 text-sm">
          <Link href="/register" className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">
            Register as Vendor
          </Link>
          <Link href="/vendor-performance-tracking" className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">
            View Vendor Performance
          </Link>
          <Link href="/tenders" className="rounded-lg border border-slate-300 px-3 py-2 hover:bg-slate-50">
            Browse Live Tenders
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
