"use client"

import { Check, UploadCloud, ShieldCheck, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface VendorFormProps {
  step: number
  onNext: () => void
  onPrev: () => void
  onSubmit: () => void
  isSubmitting: boolean
}

export function VendorForm({ step, onNext, onPrev, onSubmit, isSubmitting }: VendorFormProps) {
  return (
    <>
      {/* Step 1: Company Details */}
      {step === 1 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="font-semibold text-lg border-b pb-2 mb-4">Company Details</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Company/Entity Name <span className="text-red-500">*</span></label>
            <Input placeholder="As per PAN Card" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number <span className="text-red-500">*</span></label>
              <Input placeholder="ABCDE1234F" className="uppercase" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GSTIN <span className="text-red-500">*</span></label>
              <Input placeholder="27ABCDE1234F1Z5" className="uppercase" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">CIN / Registration No.</label>
            <Input placeholder="Optional for Proprietorship" />
          </div>
        </div>
      )}

      {/* Step 2: Contact & Address */}
      {step === 2 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="font-semibold text-lg border-b pb-2 mb-4">Contact & Address</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Authorized Person Name <span className="text-red-500">*</span></label>
            <Input placeholder="Full Name" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email <span className="text-red-500">*</span></label>
              <Input type="email" placeholder="official@company.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No. <span className="text-red-500">*</span></label>
              <Input placeholder="Will be verified via OTP" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Registered Address <span className="text-red-500">*</span></label>
            <textarea className="w-full border border-gray-300 rounded-md p-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0B3D91]" rows={3}></textarea>
          </div>
        </div>
      )}

      {/* Step 3: e-KYC & Document Upload */}
      {step === 3 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="font-semibold text-lg border-b pb-2 mb-4">e-KYC & Document Upload</h3>
          <p className="text-sm text-gray-600 mb-4 flex items-center bg-blue-50 p-3 rounded text-blue-800">
            <ShieldCheck className="h-4 w-4 mr-2" /> Documents will be hashed and verified via DigiLocker.
          </p>
          
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer">
            <UploadCloud className="h-10 w-10 text-[#0B3D91] mx-auto mb-3" />
            <p className="text-sm font-medium text-gray-900">Click to upload or drag & drop</p>
            <p className="text-xs text-gray-500 mt-1">Upload PAN, GST Certificate, and Cancelled Cheque (PDF, max 5MB)</p>
          </div>
          
          <div className="space-y-2 mt-4">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded border border-gray-200">
              <div className="flex items-center text-sm">
                <FileText className="h-4 w-4 text-gray-400 mr-2" /> PAN_Card.pdf
              </div>
              <Check className="h-4 w-4 text-[#138808]" />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Review & Submit */}
      {step === 4 && (
        <div className="space-y-4 animate-in fade-in slide-in-from-right-4 duration-300">
          <h3 className="font-semibold text-lg border-b pb-2 mb-4">Review & Submit</h3>
          <div className="bg-gray-50 rounded-md p-4 space-y-3 text-sm">
            <div className="grid grid-cols-3 border-b pb-2">
              <span className="text-gray-500">Entity Name:</span>
              <span className="col-span-2 font-medium">Demo Infra Pvt Ltd</span>
            </div>
            <div className="grid grid-cols-3 border-b pb-2">
              <span className="text-gray-500">PAN:</span>
              <span className="col-span-2 font-medium uppercase">ABCDE1234F</span>
            </div>
            <div className="grid grid-cols-3">
              <span className="text-gray-500">Documents:</span>
              <span className="col-span-2 text-[#138808] flex items-center"><Check className="h-3 w-3 mr-1"/> 3 Uploaded & Hash Verified</span>
            </div>
          </div>
          
          <div className="flex items-start mt-4">
            <input type="checkbox" className="mt-1 mr-2" id="terms" />
            <label htmlFor="terms" className="text-xs text-gray-600 leading-tight">
              I hereby declare that the information provided is true and correct. I authorize TenderChain to create my cryptographic identity on the public ledger. I agree to the Terms & Conditions.
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
            {isSubmitting ? "Generating Hash..." : "Submit & Generate ID"}
          </Button>
        )}
      </div>
    </>
  )
}
