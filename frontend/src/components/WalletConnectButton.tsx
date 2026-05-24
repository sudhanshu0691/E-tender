"use client"

import { useState } from "react"
import { Link } from "lucide-react"

export function WalletConnectButton({ defaultAddress }: { defaultAddress?: string }) {
  const [connected, setConnected] = useState<boolean>(false)
  const [address, setAddress] = useState<string | null>(defaultAddress ?? null)

  const connect = async () => {
    // simulate wallet connection
    const mock = address ?? `0x${Math.random().toString(16).slice(2, 10)}${Math.random().toString(16).slice(2, 6)}`
    setAddress(mock)
    setConnected(true)
  }

  const disconnect = () => {
    setConnected(false)
    setAddress(null)
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={connected ? disconnect : connect}
        className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition ${
          connected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-800'
        }`}
      >
        <Link className="h-4 w-4" />
        {connected ? 'Disconnect' : 'Connect Wallet'}
      </button>
      {connected && address ? (
        <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-mono text-slate-700">{address}</span>
      ) : null}
    </div>
  )
}

export default WalletConnectButton
