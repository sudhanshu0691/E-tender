"use client"

import { useState } from "react"
import { Check, UploadCloud, ShieldCheck, AlertCircle, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { IPFSHashPill } from "@/components/IPFSHashPill"
import ministries from "@/data/ministries.json"
import designations from "@/data/designations.json"

interface OfficerFormProps {
  step: number
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

export function OfficerForm({ step, onNext, onPrev, onSubmit, isSubmitting }: OfficerFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [aadhaarVerified, setAadhaarVerified] = useState(false)
  const [mobileVerified, setMobileVerified] = useState(false)
  const [dscConnected, setDscConnected] = useState(false)
  const [uploadedDocs, setUploadedDocs] = useState<Record<string, string>>({})

  const handleDocumentUpload = (docType: string) => {
    setTimeout(() => {
      setUploadedDocs(prev => ({
        ...prev,
        [docType]: `Qm${Math.random().toString(16).slice(2, 10).toUpperCase()}${Math.random().toString(16).slice(2, 10).toUpperCase()}`
      }))
    }, 1500)
  }

  const orgTypes = [
    "Central Ministry",
    "State Department",
    "PSU",
    "Autonomous Body",
    "Local Body",
    "Defence",
    "Railways"
  ]

  const roleTypes = [
    "Nodal Officer",
    "Procurement Officer Admin",
    "Publisher",
    "Bid Opener",
    "Bid Evaluator",
    "Technical Evaluator"
  ]

  return (
    <>
      {/* Step 1: Personal & Identity Verification */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="font-semibold text-lg border-b pb-2 mb-4">Personal & Identity Verification</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name (as per Aadhaar) <span className="text-red-500">*</span></label>
            <Input placeholder="Exact name from Aadhaar card" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Aadhaar Number <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <Input placeholder="12-digit Aadhaar" className="uppercase" maxLength={12} />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setAadhaarVerified(!aadhaarVerified)}
                  className={aadhaarVerified ? "bg-[#138808]/10 border-[#138808] text-[#138808]" : ""}
                >
                  {aadhaarVerified ? "✓ Verified" : "Verify OTP"}
                </Button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number <span className="text-red-500">*</span></label>
              <Input placeholder="ABCDE1234F" className="uppercase" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
              <Input type="date" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Official Mobile Number <span className="text-red-500">*</span></label>
              <div className="flex gap-2">
                <Input placeholder="+91-XXXXXXXXXX" />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setMobileVerified(!mobileVerified)}
                  className={mobileVerified ? "bg-[#138808]/10 border-[#138808] text-[#138808]" : ""}
                >
                  {mobileVerified ? "✓ Verified" : "Verify OTP"}
                </Button>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <Input 
                type={showPassword ? "text" : "password"} 
                placeholder="Min 10 chars, include uppercase, lowercase, number, special" 
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Must be at least 10 characters with uppercase, lowercase, number, and special character</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password <span className="text-red-500">*</span></label>
            <div className="relative">
              <Input 
                type={showConfirmPassword ? "text" : "password"} 
                placeholder="Re-enter your password" 
              />
              <button 
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Step 2: Official Details */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="font-semibold text-lg border-b pb-2 mb-4">Official Details</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Official Email ID <span className="text-red-500">*</span></label>
            <Input type="email" placeholder="name@dept.gov.in or @nic.in" />
            <p className="text-xs text-amber-700 mt-1 flex items-center"><AlertCircle className="h-3 w-3 mr-1" /> Government domain preferred (@gov.in / @nic.in)</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Employee ID / Service Number <span className="text-red-500">*</span></label>
              <Input placeholder="Unique govt employee identifier" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation <span className="text-red-500">*</span></label>
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91]">
                <option value="">Select designation</option>
                {designations.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Type <span className="text-red-500">*</span></label>
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91]">
                <option value="">Select type</option>
                {orgTypes.map(type => <option key={type} value={type}>{type}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Ministry / Department <span className="text-red-500">*</span></label>
              <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91] max-h-48">
                <option value="">Search ministries...</option>
                {ministries.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Organisation Name <span className="text-red-500">*</span></label>
            <Input placeholder="Full legal name of procuring entity" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Office / Tender Floating Unit <span className="text-red-500">*</span></label>
            <Input placeholder="e.g., PWD Division Indore" />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Office Address <span className="text-red-500">*</span></label>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="Address Line 1" />
              <Input placeholder="Address Line 2" />
            </div>
            <div className="grid grid-cols-3 gap-4 mt-2">
              <Input placeholder="City" />
              <Input placeholder="State" />
              <Input placeholder="PIN Code" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Role Type <span className="text-red-500">*</span></label>
            <select className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91]">
              <option value="">Select role type</option>
              {roleTypes.map(role => <option key={role} value={role}>{role}</option>)}
            </select>
            <p className="text-xs text-gray-500 mt-1">Nodal Officer is the master account; others are sub-officer roles.</p>
          </div>
        </div>
      )}

      {/* Step 3: Documents Upload */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="font-semibold text-lg border-b pb-2 mb-4">Documents Upload</h3>
          <p className="text-sm text-gray-600 mb-4 flex items-center bg-blue-50 p-3 rounded text-blue-800">
            <ShieldCheck className="h-4 w-4 mr-2" /> Documents will be hashed and immutably stored on IPFS.
          </p>

          {/* Authorization Letter */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleDocumentUpload('auth-letter')}
          >
            <UploadCloud className="h-10 w-10 text-[#0B3D91] mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-900">Authorization Letter (PDF)</p>
            <p className="text-xs text-gray-500 mt-1">Signed by competent authority authorizing this officer to publish tenders</p>
          </div>
          {uploadedDocs['auth-letter'] && (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
              <div className="flex items-center text-sm"><Check className="h-4 w-4 text-[#138808] mr-2" /> Authorization Letter</div>
              <IPFSHashPill hash={uploadedDocs['auth-letter']} />
            </div>
          )}

          {/* Financial Sanction Authority */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleDocumentUpload('sanction-proof')}
          >
            <UploadCloud className="h-10 w-10 text-[#0B3D91] mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-900">Financial Sanction Authority Proof (PDF)</p>
            <p className="text-xs text-gray-500 mt-1">Office order mentioning officer&apos;s financial powers</p>
          </div>
          {uploadedDocs['sanction-proof'] && (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
              <div className="flex items-center text-sm"><Check className="h-4 w-4 text-[#138808] mr-2" /> Financial Sanction Proof</div>
              <IPFSHashPill hash={uploadedDocs['sanction-proof']} />
            </div>
          )}

          {/* DSC Certificate */}
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">Digital Signature Certificate (DSC)</p>
                <p className="text-xs text-gray-500 mt-1">Class III Digital Signature Certificate</p>
              </div>
              <Button 
                variant="outline"
                size="sm"
                onClick={() => setDscConnected(!dscConnected)}
                className={dscConnected ? "bg-[#138808]/10 border-[#138808] text-[#138808]" : ""}
              >
                {dscConnected ? "✓ Connected" : "Connect DSC Token"}
              </Button>
            </div>
          </div>

          {/* Government ID */}
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => handleDocumentUpload('gov-id')}
          >
            <UploadCloud className="h-10 w-10 text-[#0B3D91] mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-900">Government ID / Service Book (PDF)</p>
            <p className="text-xs text-gray-500 mt-1">Service book page or government ID card</p>
          </div>
          {uploadedDocs['gov-id'] && (
            <div className="flex items-center justify-between p-3 bg-green-50 rounded border border-green-200">
              <div className="flex items-center text-sm"><Check className="h-4 w-4 text-[#138808] mr-2" /> Government ID</div>
              <IPFSHashPill hash={uploadedDocs['gov-id']} />
            </div>
          )}
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {step === 4 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="font-semibold text-lg border-b pb-2 mb-4">Review & Submit</h3>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800 mb-6">
            <p className="font-medium mb-1">Officer Account Verification Pending</p>
            <p className="text-xs">Your account will be verified by NIC/Admin before you can start publishing tenders. You will receive email confirmation once approved.</p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 space-y-3 text-sm border border-gray-200">
            <div className="grid grid-cols-3 border-b pb-3">
              <span className="text-gray-500">Full Name:</span>
              <span className="col-span-2 font-medium">Officer Name</span>
            </div>
            <div className="grid grid-cols-3 border-b pb-3">
              <span className="text-gray-500">Email:</span>
              <span className="col-span-2 font-medium">officer@gov.in</span>
            </div>
            <div className="grid grid-cols-3 border-b pb-3">
              <span className="text-gray-500">Mobile (Verified):</span>
              <span className="col-span-2 font-medium text-[#138808]">✓ +91-XXXXXXXXXX</span>
            </div>
            <div className="grid grid-cols-3 border-b pb-3">
              <span className="text-gray-500">Designation:</span>
              <span className="col-span-2 font-medium">Procurement Officer</span>
            </div>
            <div className="grid grid-cols-3 border-b pb-3">
              <span className="text-gray-500">Ministry:</span>
              <span className="col-span-2 font-medium">Ministry of Road Transport</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-gray-500">Documents:</span>
              <span className="col-span-2 text-[#138808] flex items-center"><Check className="h-3 w-3 mr-1"/> 4 Uploaded & IPFS Hashed</span>
            </div>
          </div>

          <div className="flex items-start mt-4">
            <input type="checkbox" className="mt-1 mr-2" id="integrity" />
            <label htmlFor="integrity" className="text-xs text-gray-600 leading-tight">
              I confirm this registration is accurate and complete. All documents are authentic and authorized by competent authorities. I agree to the terms of service and will use my credentials responsibly.
            </label>
          </div>
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8 pt-4 border-t border-gray-200">
        <Button 
          variant="outline" 
          onClick={onPrev} 
          disabled={step === 1 || isSubmitting}
        >
          Back
        </Button>
        
        {step < 4 ? (
          <Button className="bg-[#0B3D91] hover:bg-[#0B3D91]/90" onClick={onNext}>
            Next Step
          </Button>
        ) : (
          <Button 
            className="bg-[#138808] hover:bg-[#138808]/90" 
            onClick={onSubmit}
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit for Verification"}
          </Button>
        )}
      </div>
    </>
  )
}
