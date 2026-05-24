"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Check, Blocks, ShieldCheck, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/components/AuthProvider"
import { VendorForm } from "./vendor-form"
import { OfficerForm } from "./officer-form"

type UserType = "vendor" | "officer"

export default function RegisterPage() {
  const [userType, setUserType] = useState<UserType>("vendor")
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [successData, setSuccessData] = useState<{ id: string; name: string; email: string }>()
  const router = useRouter()
  const { user, isReady } = useAuth()

  useEffect(() => {
    if (!isReady || !user) {
      return
    }

    router.replace(user.role === "officer" ? "/admin" : "/vendor")
  }, [isReady, router, user])

  const handleNext = () => setStep(prev => Math.min(prev + 1, userType === "vendor" ? 4 : 4))
  const handlePrev = () => setStep(prev => Math.max(prev - 1, 1))
  
  const handleSubmit = () => {
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setSuccessData({
        id: userType === "vendor" ? "VEND-2026-00142" : "OFC-2026-MP-00142",
        name: "Test User",
        email: userType === "vendor" ? "vendor@test.in" : "officer@gov.in"
      })
      setSuccess(true)
    }, 2000)
  }

  if (isReady && user) {
    return <div className="min-h-[70vh] bg-[#F8F9FC]" />
  }

  if (success && successData) {
    return (
      <div className="container mx-auto px-4 py-10 flex justify-center min-h-[60vh]">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg border border-gray-200 p-8 text-center animate-in fade-in zoom-in duration-500">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <Blocks className="h-10 w-10 text-[#138808]" />
          </div>
          <h2 className="font-poppins text-2xl font-bold text-gray-900 mb-2">Registration Successful</h2>
          
          {userType === "vendor" ? (
            <>
              <p className="text-gray-600 mb-6">Your details have been verified via DigiLocker. A cryptographic identity has been generated for you on TenderChain.</p>
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 mb-8 text-left">
                <p className="text-xs text-gray-500 uppercase font-semibold mb-1">Vendor Hash ID</p>
                <p className="font-mono text-sm text-[#0B3D91] break-all">{successData.id}</p>
                <div className="mt-3 flex items-center text-xs text-[#138808] font-medium">
                  <ShieldCheck className="mr-1 h-4 w-4" /> Immutably Recorded
                </div>
              </div>
            </>
          ) : (
            <>
              <p className="text-gray-600 mb-6">Your officer account has been submitted for verification. NIC/Admin will review your documents and credentials.</p>
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-8">
                <p className="text-xs text-blue-700 font-semibold mb-2">Officer ID</p>
                <p className="font-mono text-sm text-blue-900 break-all font-bold">{successData.id}</p>
                <p className="text-xs text-blue-600 mt-3">Status: <span className="font-semibold">Pending Verification</span></p>
                <p className="text-xs text-blue-600 mt-1">You will receive email confirmation once approved.</p>
              </div>
            </>
          )}

          <Link href="/login">
            <Button className="w-full bg-[#0B3D91] hover:bg-[#0B3D91]/90">Go to Login</Button>
          </Link>
        </div>
      </div>
    )
  }

  const progressWidth = userType === "vendor" ? ((step - 1) / 3) * 100 : ((step - 1) / 3) * 100

  return (
    <div className="container mx-auto px-4 py-12 flex justify-center min-h-[70vh]">
      <div className="max-w-2xl w-full bg-white rounded-xl shadow-md border border-gray-200 p-6 md:p-10">
        {/* Header with Tabs */}
        <div className="text-center mb-8">
          <h1 className="font-poppins text-2xl font-bold text-[#0B3D91] mb-4">Registration Portal</h1>
          <div className="flex bg-gray-100 p-1 rounded-lg inline-flex">
            <button
              onClick={() => { setUserType("vendor"); setStep(1); }}
              className={`flex-1 py-2 px-6 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
                userType === "vendor"
                  ? "bg-white shadow-sm text-[#0B3D91]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <Building2 className="h-4 w-4" />
              Vendor
            </button>
            <button
              onClick={() => { setUserType("officer"); setStep(1); }}
              className={`flex-1 py-2 px-6 text-sm font-medium rounded-md transition-all flex items-center justify-center gap-2 ${
                userType === "officer"
                  ? "bg-white shadow-sm text-[#0B3D91]"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              <ShieldCheck className="h-4 w-4" />
              Government Officer
            </button>
          </div>
          <p className="text-gray-600 mt-4">
            {userType === "vendor" 
              ? "Complete your e-KYC to bid on public tenders" 
              : "Register as a Government Procurement Officer"}
          </p>
        </div>

        {/* Stepper */}
        <div className="mb-10">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200 z-0"></div>
            <div className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-[#138808] z-0 transition-all duration-300" style={{ width: `${progressWidth}%` }}></div>
            
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm border-2 ${step > s ? 'bg-[#138808] border-[#138808] text-white' : step === s ? 'bg-white border-[#0B3D91] text-[#0B3D91]' : 'bg-white border-gray-300 text-gray-400'}`}>
                {step > s ? <Check className="h-4 w-4" /> : s}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs font-medium text-gray-500 px-1">
            {userType === "vendor" ? (
              <>
                <span>Details</span>
                <span>Address</span>
                <span>e-KYC</span>
                <span>Review</span>
              </>
            ) : (
              <>
                <span>Identity</span>
                <span>Official</span>
                <span>Documents</span>
                <span>Review</span>
              </>
            )}
          </div>
        </div>

        {/* Form Steps */}
        <div className="min-h-[300px]">
          {userType === "vendor" ? (
            <VendorForm 
              step={step}
              onNext={handleNext}
              onPrev={handlePrev}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          ) : (
            <OfficerForm 
              step={step}
              onNext={handleNext}
              onPrev={handlePrev}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          )}
        </div>
      </div>
    </div>
  )
}
