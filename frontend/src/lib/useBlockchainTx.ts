/**
 * useBlockchainTx Hook
 * Custom hook wrapping BlockchainTxModal state management
 * Returns: { isOpen, title, openTx, closeTx, txHash }
 */

'use client'

import { useState } from 'react'

interface UseBlockchainTxReturn {
  isOpen: boolean
  title: string
  txHash: string | null
  openTx: (title: string) => void
  closeTx: () => void
  setTxHash: (hash: string) => void
}

export function useBlockchainTx(): UseBlockchainTxReturn {
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [txHash, setTxHash] = useState<string | null>(null)

  const openTx = (newTitle: string) => {
    setTitle(newTitle)
    setTxHash(null)
    setIsOpen(true)
  }

  const closeTx = () => {
    setIsOpen(false)
    setTxHash(null)
  }

  return {
    isOpen,
    title,
    txHash,
    openTx,
    closeTx,
    setTxHash,
  }
}

export default useBlockchainTx
