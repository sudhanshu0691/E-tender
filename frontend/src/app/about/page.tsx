"use client"

import { Shield, Target, Award, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="text-center mb-10">
        <h1 className="font-poppins text-4xl font-bold text-[#0B3D91] mb-4">About TenderChain</h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Empowering Digital India with a transparent, immutable, and trustless public procurement infrastructure.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
        <div>
          <h2 className="font-poppins text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
          <p className="text-gray-600 mb-4 leading-relaxed">
            Public procurement accounts for nearly 20% of India&apos;s GDP. Historically, the tendering process has faced challenges related to transparency, cartels, and information asymmetry.
          </p>
          <p className="text-gray-600 leading-relaxed">
            TenderChain was born out of a collaboration between the Ministry of Electronics & IT and leading blockchain researchers. Our mission is to eliminate corruption mathematically by enforcing procurement rules through smart contracts on a distributed ledger.
          </p>
        </div>
        <div className="bg-[#F8F9FC] p-8 rounded-2xl border border-gray-200 shadow-inner relative">
          <div className="absolute top-0 right-0 -mt-6 -mr-6 text-9xl text-[#0B3D91] opacity-5 font-serif">&quot;</div>
          <p className="text-xl font-medium text-[#0B3D91] italic leading-relaxed relative z-10">
            &quot;Sunlight is said to be the best of disinfectants. Blockchain brings the ultimate sunlight to government spending.&quot;
          </p>
          <p className="mt-6 font-semibold text-gray-900">- Vision Document, Digital India 2.0</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {[
          { icon: Shield, title: "Zero Trust Architecture", desc: "Trust the math, not the middleman." },
          { icon: Target, title: "100% Auditability", desc: "Every action tracked in real-time." },
          { icon: Award, title: "Fair Competition", desc: "Level playing field for SMEs and large infra." },
          { icon: Users, title: "Citizen Oversight", desc: "Public access to the Transparency Ledger." }
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-gray-200 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="mx-auto w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center mb-4">
              <item.icon className="h-6 w-6 text-[#0B3D91]" />
            </div>
            <h3 className="font-poppins font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-[#0B3D91] rounded-2xl text-white p-10 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/connected.png')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="font-poppins text-3xl font-bold mb-6">Government Partnerships</h2>
          <p className="text-blue-100 max-w-2xl mx-auto mb-10">
            TenderChain operates as a sovereign consortium chain. Node operators include major central ministries and state IT departments, ensuring network resilience and democratic consensus.
          </p>
          <div className="flex flex-wrap justify-center gap-8 text-blue-200 font-medium">
            <span>National Informatics Centre (NIC)</span>
            <span>•</span>
            <span>C-DAC</span>
            <span>•</span>
            <span>STQC Directorate</span>
            <span>•</span>
            <span>Gov.in</span>
          </div>
        </div>
      </div>
    </div>
  )
}
