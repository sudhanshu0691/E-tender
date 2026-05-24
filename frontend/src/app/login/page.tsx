"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { Shield, Fingerprint, RefreshCw, AlertTriangle, Lock, Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/components/AuthProvider"

export default function LoginPage() {
  const [role, setRole] = useState<"vendor" | "officer">("vendor")
  const [otpSent, setOtpSent] = useState(false)
  const [dscDetected, setDscDetected] = useState(false)
  const [showPasswordReset, setShowPasswordReset] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const { user, login, isReady } = useAuth()

  useEffect(() => {
    if (!isReady || !user) {
      return
    }

    router.replace(user.role === "officer" ? "/admin" : "/vendor")
  }, [isReady, router, user])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    const nextUser =
      role === "officer"
        ? {
            id: "officer-001",
            name: "Anita Deshmukh",
            email: "anita.deshmukh@gov.in",
            role: "officer" as const,
            department: "Public Works Department",
            designation: "Procurement Officer",
            ministry: "Ministry of Road Transport and Highways",
            orgName: "Public Works Department, Government of India",
            walletAddress: "0x41b2d3e4f5a6c7d8e9f00112233445566778899a",
            dscStatus: "connected" as const,
          }
        : {
            id: "vendor-001",
            name: "Demo Infra Pvt Ltd",
            email: "vendor@demo.in",
            role: "vendor" as const,
          }

    login(nextUser)
    router.push(role === "officer" ? "/admin" : "/vendor")
  }

  const handleDSCLogin = () => {
    setDscDetected(true)
    setTimeout(() => {
      const nextUser = {
        id: "officer-002",
        name: "Rohit Verma",
        email: "rohit.verma@gov.in",
        role: "officer" as const,
        department: "National e-Procurement Cell",
        designation: "Nodal Officer",
        ministry: "Ministry of Commerce and Industry",
        orgName: "National e-Procurement Cell",
        walletAddress: "0xaabbccddeeff0011223344556677889900112233",
        dscStatus: "connected" as const,
      }
      login(nextUser)
      router.push("/admin")
    }, 2000)
  }

  if (isReady && user) {
    return <div className="min-h-[75vh] bg-[#F8F9FC]" />
  }

  const isUnauthorized = searchParams.get("unauthorized") === "true"

  return (
    <div className="container mx-auto px-4 py-10 flex justify-center min-h-[70vh] items-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] bg-opacity-50">
      {isUnauthorized && (
        <div className="fixed top-4 left-4 right-4 z-50 rounded-lg border border-red-200 bg-red-50 px-4 py-3 shadow-lg max-w-md mx-auto">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">Access Denied</p>
              <p className="text-sm text-red-700 mt-1">You do not have permission to access this page. Please login with the correct account.</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="max-w-md w-full bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-[#0B3D91] p-6 text-center text-white relative">
          <div className="absolute top-0 right-0 opacity-10">
            <Shield className="h-32 w-32 -mt-8 -mr-8" />
          </div>
          <Shield className="h-10 w-10 mx-auto mb-3 relative z-10" />
          <h1 className="font-poppins text-2xl font-bold relative z-10">Secure Login</h1>
          <p className="text-blue-200 text-sm mt-1 relative z-10">TenderChain National Portal</p>
        </div>

        <div className="p-6">
          {/* Role Tabs */}
          <div className="flex bg-gray-100 p-1 rounded-lg mb-6">
            {[
              { label: "Vendor", value: "vendor" as const },
              { label: "Officer", value: "officer" as const },
            ].map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  setRole(option.value)
                  setOtpSent(false)
                  setShowPasswordReset(false)
                }}
                className={`flex-1 py-1.5 text-sm font-medium rounded-md transition-all ${role === option.value ? "bg-white shadow-sm text-[#0B3D91]" : "text-gray-500 hover:text-gray-700"}`}
              >
                {option.label}
              </button>
            ))}
          </div>

          {showPasswordReset ? (
            // Password Reset Flow
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email / Employee ID</label>
                <Input type="text" placeholder="Enter your official email" />
              </div>
              <Button type="button" className="w-full bg-[#0B3D91] hover:bg-[#0B3D91]/90">
                Send Reset OTP
              </Button>
              <button 
                type="button"
                onClick={() => setShowPasswordReset(false)}
                className="w-full text-sm text-[#0B3D91] hover:underline"
              >
                Back to Login
              </button>
            </div>
          ) : (
            <>
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    {role === "vendor" ? "Vendor ID / Email" : "Official Email ID"}
                  </label>
                  <Input type="text" placeholder={role === "vendor" ? "Enter ID" : "name@dept.gov.in"} required />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-sm font-medium text-gray-700">Password</label>
                    <button
                      type="button"
                      onClick={() => setShowPasswordReset(true)}
                      className="text-xs text-[#0B3D91] hover:underline"
                    >
                      Forgot?
                    </button>
                  </div>
                  <Input type="password" placeholder="••••••••" required />
                </div>

                {/* Officer 2FA - Mobile OTP */}
                {role === "officer" && (
                  <div>
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Smartphone className="h-4 w-4" />
                        Mobile OTP
                      </label>
                      <button
                        type="button"
                        onClick={() => setOtpSent(true)}
                        className="text-xs text-[#0B3D91] hover:underline"
                      >
                        {otpSent ? "Resend" : "Send OTP"}
                      </button>
                    </div>
                    <Input 
                      type="text" 
                      placeholder="6-digit OTP" 
                      maxLength={6}
                      required={role === "officer"}
                      disabled={!otpSent}
                      className={!otpSent ? "bg-gray-50 cursor-not-allowed" : ""}
                    />
                    {otpSent && (
                      <p className="text-xs text-[#138808] mt-1 flex items-center gap-1">
                        <Lock className="h-3 w-3" /> OTP sent to registered mobile
                      </p>
                    )}
                  </div>
                )}

                {/* Captcha Mock */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Security Code</label>
                  <div className="flex gap-3">
                    <div className="bg-gray-100 flex-1 rounded border border-gray-200 flex items-center justify-center font-mono font-bold text-lg tracking-widest text-gray-700 relative overflow-hidden select-none">
                      <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')]"></div>
                      5X8N2
                    </div>
                    <Button type="button" variant="outline" size="icon" className="shrink-0 text-gray-500">
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Input className="w-24 text-center font-mono" placeholder="Enter" required />
                  </div>
                </div>

                <Button type="submit" className="w-full bg-[#0B3D91] hover:bg-[#0B3D91]/90 h-11 text-base mt-2">
                  Secure Login
                </Button>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="bg-white px-2 text-gray-500">Or login with</span>
                  </div>
                </div>

                {role === "officer" ? (
                  <Button 
                    type="button" 
                    variant="outline" 
                    className="w-full mt-4 flex items-center justify-center border-[#138808] text-[#138808] hover:bg-green-50"
                    onClick={handleDSCLogin}
                  >
                    <Lock className="mr-2 h-5 w-5" />
                    {dscDetected ? "DSC Token Detected ✓" : "Login with DSC"}
                  </Button>
                ) : (
                  <Button type="button" variant="outline" className="w-full mt-4 flex items-center justify-center border-[#138808] text-[#138808] hover:bg-green-50">
                    <Fingerprint className="mr-2 h-5 w-5" />
                    DigiLocker / Aadhaar
                  </Button>
                )}
              </div>
              
              {role === "vendor" && (
                <p className="text-center text-sm text-gray-600 mt-6">
                  Don&apos;t have an account? <Link href="/register" className="text-[#0B3D91] font-semibold hover:underline">Register Here</Link>
                </p>
              )}

              {role === "officer" && (
                <p className="text-center text-sm text-gray-600 mt-6">
                  New officer? <Link href="/register?role=officer" className="text-[#0B3D91] font-semibold hover:underline">Register Here</Link>
                </p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
