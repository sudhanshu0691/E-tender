"use client"

import { Mail, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="text-center mb-10">
        <h1 className="font-poppins text-4xl font-bold text-gray-900 mb-4">Contact Support</h1>
        <p className="text-lg text-gray-600">Need help with TenderChain? Our dedicated grievance redressal and technical support teams are here.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-poppins font-semibold text-lg mb-4 text-[#0B3D91]">Central Helpdesk</h3>
            <div className="space-y-4">
              <div className="flex items-start">
                <Phone className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">1800-111-2222</p>
                  <p className="text-sm text-gray-500">Toll-free (Mon-Sat, 9AM-6PM)</p>
                </div>
              </div>
              <div className="flex items-start">
                <Mail className="h-5 w-5 text-gray-400 mt-0.5 mr-3" />
                <div>
                  <p className="font-medium text-gray-900">support@tenderchain.gov.in</p>
                  <p className="text-sm text-gray-500">For technical queries</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-poppins font-semibold text-lg mb-4 text-[#0B3D91]">Nodal Office</h3>
            <div className="flex items-start">
              <MapPin className="h-5 w-5 text-gray-400 mt-0.5 mr-3 shrink-0" />
              <div>
                <p className="font-medium text-gray-900">Ministry of Electronics & IT</p>
                <p className="text-sm text-gray-600 mt-1">Electronics Niketan, 6, CGO Complex,<br/>Lodhi Road, New Delhi - 110003</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2 bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
          <h2 className="font-poppins text-2xl font-bold mb-6">Raise a Ticket / Grievance</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <Input placeholder="Enter your name" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <Input type="email" placeholder="Enter official email" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role / Department</label>
                <select className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3D91] focus-visible:ring-offset-2">
                  <option>Vendor</option>
                  <option>Government Officer</option>
                  <option>Auditor</option>
                  <option>Citizen</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Related Tender ID (Optional)</label>
                <Input placeholder="e.g. TC-MH-2024-883" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
              <textarea 
                className="w-full h-32 rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B3D91]" 
                placeholder="Describe your issue or grievance..."
              ></textarea>
            </div>
            <Button className="bg-[#0B3D91] hover:bg-[#0B3D91]/90">
              <Send className="mr-2 h-4 w-4" /> Submit Grievance
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}
