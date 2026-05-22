"use client"

import { Link as LinkIcon, Zap, Database, Lock } from "lucide-react"
import systemHealthData from "@/data/systemHealth.json"

const statusColors = {
  green: "text-emerald-600 bg-emerald-50",
  yellow: "text-amber-600 bg-amber-50",
  red: "text-red-600 bg-red-50",
}

const statusDots = {
  green: "bg-emerald-500",
  yellow: "bg-amber-500",
  red: "bg-red-500",
}

interface HealthIndicatorProps {
  icon: React.ReactNode
  label: string
  status: "green" | "yellow" | "red"
  details: string
  link?: string
}

function HealthIndicator({ icon, label, status, details, link }: HealthIndicatorProps) {
  const content = (
    <div className={`rounded-lg border p-4 ${statusColors[status]} hover:shadow-md transition-shadow`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="flex-shrink-0">{icon}</div>
        <div>
          <div className="flex items-center gap-2">
            <span className={`h-2.5 w-2.5 rounded-full ${statusDots[status]} animate-pulse`}></span>
            <p className="font-semibold text-sm">{label}</p>
          </div>
          <p className="text-xs opacity-75 mt-0.5">{details}</p>
        </div>
      </div>
      {link && (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs underline hover:no-underline font-medium mt-2 inline-block opacity-80 hover:opacity-100"
        >
          View on Etherscan →
        </a>
      )}
    </div>
  )

  return content
}

export function SystemHealthPanel() {
  const blockchain = systemHealthData.blockchain
  const ipfs = systemHealthData.ipfs
  const database = systemHealthData.database
  const smartContract = systemHealthData.smartContract

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-sm text-gray-900">System Health</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <HealthIndicator
          icon={<LinkIcon className="h-5 w-5" />}
          label="Blockchain (Sepolia)"
          status={blockchain.status as "green" | "yellow" | "red"}
          details={`Block ${blockchain.blockHeight} • ${blockchain.latency}ms`}
        />
        <HealthIndicator
          icon={<Zap className="h-5 w-5" />}
          label="IPFS Gateway"
          status={ipfs.status as "green" | "yellow" | "red"}
          details={`${ipfs.gateway} • ${ipfs.latency}ms`}
        />
        <HealthIndicator
          icon={<Database className="h-5 w-5" />}
          label="Database"
          status={database.status as "green" | "yellow" | "red"}
          details={`Operational • ${database.latency}ms`}
        />
        <HealthIndicator
          icon={<Lock className="h-5 w-5" />}
          label="Smart Contract"
          status={smartContract.status as "green" | "yellow" | "red"}
          details={`Verified • ${smartContract.address.slice(0, 8)}...${smartContract.address.slice(-6)}`}
          link={smartContract.etherscanUrl}
        />
      </div>
    </div>
  )
}
