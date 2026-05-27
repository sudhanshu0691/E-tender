"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

// --- Types ---
export interface TenderDocument {
  name: string
  type: string
  ipfsHash: string
}

export interface EvaluationWeights {
  price: number
  financial: number
  experience: number
  performance: number
  technical: number
  compliance: number
  proposal: number
}

export interface Corrigendum {
  id: string
  date: string
  description: string
  ipfsHash: string
}

export interface Tender {
  id: string
  tenderTitle: string
  nitNo: string
  department: string
  category: string
  state: string
  budget: number
  emrAmount: number
  deadline: string
  bidOpeningDate: string
  status: "Open" | "Closed" | "Awarded"
  verified: boolean
  bidsReceived: number
  hash: string
  deadlinePassed: boolean
  ipfsDocuments: TenderDocument[]
  evaluationWeights: EvaluationWeights
  corrigendums: Corrigendum[]
  winnerDeclaredAt: string | null
  createdBy?: string
  createdAt?: string
}

export interface Bid {
  bidderId: string
  companyName: string
  walletAddress: string
  bidHash: string
  submittedAt: string
  price?: number
  scores?: {
    price: number
    financial: number
    experience: number
    performance: number
    technical: number
    compliance: number
    proposal: number
  }
  totalScore?: number
  status: "submitted" | "evaluated" | "winner" | "disqualified"
  disqualificationReason?: string
  documents?: { name: string; ipfsHash: string }[]
  encrypted?: boolean
}

export type UserRole = "officer" | "vendor"

// --- Global Store ---
type Listener = () => void

let tenders: Tender[] = []
let bids: Record<string, Bid[]> = {}
let currentRole: UserRole = "vendor"
let officerName = "Rajesh Kumar, IAS"
let officerDepartment = "Ministry of Road Transport and Highways"
let vendorCompanyName = "Demo Infra Pvt Ltd"
let vendorId = "VEN-001"
let walletAddress = "0x7F8E...2C3d"
let notificationCount = 0

const listeners = new Set<Listener>()

function notify() {
  listeners.forEach((l) => l())
}

function loadInitialData() {
  // Load from localStorage if available
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem("tenderchain-store")
      if (stored) {
        const parsed = JSON.parse(stored)
        if (parsed.tenders) tenders = parsed.tenders
        if (parsed.bids) bids = parsed.bids
        if (parsed.currentRole) currentRole = parsed.currentRole
        if (parsed.officerName) officerName = parsed.officerName
        if (parsed.officerDepartment) officerDepartment = parsed.officerDepartment
        if (parsed.vendorCompanyName) vendorCompanyName = parsed.vendorCompanyName
        if (parsed.vendorId) vendorId = parsed.vendorId
        if (parsed.walletAddress) walletAddress = parsed.walletAddress
        if (parsed.notificationCount !== undefined) notificationCount = parsed.notificationCount
      }
    } catch (e) {
      console.error("Failed to load store from localStorage", e)
    }
  }

  // If no tenders loaded, initialize with mock data
  if (tenders.length === 0) {
    tenders = [
      {
        id: "TNDR-2026-001",
        tenderTitle: "Construction of 4-Lane Highway from Pune to Nashik",
        nitNo: "MH/PWD/2026/NIT/883",
        department: "Ministry of Road Transport and Highways",
        budget: 450000000,
        emrAmount: 9000000,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        bidOpeningDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString(),
        status: "Open",
        category: "Infrastructure",
        state: "Maharashtra",
        verified: true,
        bidsReceived: 3,
        hash: "0x8f3c...4a12",
        deadlinePassed: false,
        ipfsDocuments: [
          { name: "NIT Document", type: "nit", ipfsHash: "QmNIT123..." },
          { name: "Technical Specification", type: "techSpec", ipfsHash: "QmTech456..." },
          { name: "BOQ", type: "boq", ipfsHash: "QmBOQ789..." },
        ],
        evaluationWeights: { price: 0.4, financial: 0.15, experience: 0.15, performance: 0.1, technical: 0.1, compliance: 0.05, proposal: 0.05 },
        corrigendums: [],
        winnerDeclaredAt: null,
        createdBy: "Rajesh Kumar, IAS",
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "TNDR-2026-002",
        tenderTitle: "Supply of Medical Equipment for AIIMS Delhi Extension",
        nitNo: "DL/MOH/2026/NIT/102",
        department: "Ministry of Health and Family Welfare",
        budget: 120000000,
        emrAmount: 2400000,
        deadline: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        bidOpeningDate: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        status: "Open",
        category: "Healthcare",
        state: "Delhi",
        verified: true,
        bidsReceived: 5,
        hash: "0x2a1b...9c3d",
        deadlinePassed: false,
        ipfsDocuments: [
          { name: "NIT Document", type: "nit", ipfsHash: "QmNIT234..." },
          { name: "Technical Specification", type: "techSpec", ipfsHash: "QmTech567..." },
        ],
        evaluationWeights: { price: 0.4, financial: 0.15, experience: 0.15, performance: 0.1, technical: 0.1, compliance: 0.05, proposal: 0.05 },
        corrigendums: [],
        winnerDeclaredAt: null,
        createdBy: "Ananya Sharma, IFS",
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: "TNDR-2026-003",
        tenderTitle: "Installation of 500MW Solar Park in Jaisalmer",
        nitNo: "RJ/MNRE/2026/NIT/405",
        department: "Ministry of New and Renewable Energy",
        budget: 210000000,
        emrAmount: 4200000,
        deadline: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
        bidOpeningDate: new Date(Date.now() + 17 * 24 * 60 * 60 * 1000).toISOString(),
        status: "Open",
        category: "Energy",
        state: "Rajasthan",
        verified: true,
        bidsReceived: 2,
        hash: "0x7d4e...1b9f",
        deadlinePassed: false,
        ipfsDocuments: [
          { name: "NIT Document", type: "nit", ipfsHash: "QmNIT345..." },
          { name: "Environmental Report", type: "other", ipfsHash: "QmENV901..." },
        ],
        evaluationWeights: { price: 0.4, financial: 0.15, experience: 0.15, performance: 0.1, technical: 0.1, compliance: 0.05, proposal: 0.05 },
        corrigendums: [],
        winnerDeclaredAt: null,
        createdBy: "Rajesh Kumar, IAS",
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ]

    bids = {
      "TNDR-2026-001": [
        {
          bidderId: "VEN-001",
          companyName: "Demo Infra Pvt Ltd",
          walletAddress: "0xAbCd...0011",
          bidHash: "QmDemoBid001",
          submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          price: 425000000,
          scores: { price: 85, financial: 78, experience: 82, performance: 74, technical: 80, compliance: 90, proposal: 70 },
          totalScore: 81.6,
          status: "submitted",
          documents: [{ name: "Technical Proposal", ipfsHash: "QmTechProposal1" }],
          encrypted: false,
        },
        {
          bidderId: "VEN-002",
          companyName: "BuildRight Constructions",
          walletAddress: "0xBbCc...2233",
          bidHash: "QmBuildRightBid002",
          submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
          price: 435000000,
          scores: { price: 80, financial: 75, experience: 80, performance: 72, technical: 78, compliance: 85, proposal: 68 },
          totalScore: 78.9,
          status: "submitted",
          documents: [{ name: "Technical Proposal", ipfsHash: "QmBRDoc1" }],
          encrypted: false,
        },
        {
          bidderId: "VEN-003",
          companyName: "Skyline Engineers",
          walletAddress: "0xCcDd...3344",
          bidHash: "QmSkylineBid003",
          submittedAt: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString(),
          price: 440000000,
          scores: { price: 78, financial: 70, experience: 76, performance: 70, technical: 75, compliance: 80, proposal: 65 },
          totalScore: 75.8,
          status: "submitted",
          documents: [{ name: "Technical Proposal", ipfsHash: "QmSkyDoc1" }],
          encrypted: false,
        },
      ],
      "TNDR-2026-002": [
        {
          bidderId: "VEN-004",
          companyName: "MedTech Solutions Ltd",
          walletAddress: "0xDdEe...4455",
          bidHash: "QmMedTechBid004",
          submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
          price: 110000000,
          scores: { price: 88, financial: 82, experience: 90, performance: 85, technical: 92, compliance: 95, proposal: 80 },
          totalScore: 87.4,
          status: "submitted",
          documents: [],
          encrypted: false,
        },
      ],
    }

    saveToDisk()
  }
}

function saveToDisk() {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        "tenderchain-store",
        JSON.stringify({
          tenders,
          bids,
          currentRole,
          officerName,
          officerDepartment,
          vendorCompanyName,
          vendorId,
          walletAddress,
          notificationCount,
        }),
      )
    } catch (e) {
      console.error("Failed to save store to localStorage", e)
    }
  }
}

// Initialize
loadInitialData()

// --- Public API ---

export function getTenders(): Tender[] {
  return [...tenders]
}

export function getTender(id: string): Tender | undefined {
  return tenders.find((t) => t.id === id)
}

export function getBids(tenderId: string): Bid[] {
  return bids[tenderId] || []
}

export function getCurrentRole(): UserRole {
  return currentRole
}

export function setCurrentRole(role: UserRole) {
  currentRole = role
  saveToDisk()
  notify()
}

export function getOfficerInfo() {
  return { name: officerName, department: officerDepartment }
}

export function getVendorInfo() {
  return { companyName: vendorCompanyName, vendorId, walletAddress }
}

export function getNotificationCount() {
  return notificationCount
}

export function clearNotificationCount() {
  notificationCount = 0
  saveToDisk()
  notify()
}

export function createTender(tender: Omit<Tender, "id" | "hash" | "verified" | "createdAt" | "createdBy" | "bidsReceived" | "winnerDeclaredAt" | "corrigendums">) {
  const id = `TNDR-2026-${String(tenders.length + 1).padStart(3, "0")}`
  const newTender: Tender = {
    ...tender,
    id,
    hash: `0x${Math.random().toString(16).slice(2, 6)}...${Math.random().toString(16).slice(2, 6)}`,
    verified: true,
    bidsReceived: 0,
    winnerDeclaredAt: null,
    corrigendums: [],
    createdBy: officerName,
    createdAt: new Date().toISOString(),
  }
  tenders = [newTender, ...tenders]
  bids[id] = []
  notificationCount = tenders.filter((t) => t.status === "Open").length
  saveToDisk()
  notify()
  return newTender
}

export function submitBid(tenderId: string, bidData: {
  price: number
  documents?: { name: string; ipfsHash: string }[]
}) {
  const tender = tenders.find((t) => t.id === tenderId)
  if (!tender) return null

  const bid: Bid = {
    bidderId: vendorId,
    companyName: vendorCompanyName,
    walletAddress,
    bidHash: `QmBid${Math.random().toString(36).slice(2, 10)}`,
    submittedAt: new Date().toISOString(),
    price: bidData.price,
    status: "submitted",
    documents: bidData.documents || [],
    encrypted: true,
  }

  if (!bids[tenderId]) bids[tenderId] = []
  bids[tenderId] = [...bids[tenderId], bid]
  tender.bidsReceived = bids[tenderId].length
  saveToDisk()
  notify()
  return bid
}

export function declareWinner(tenderId: string, bidderId: string) {
  const tender = tenders.find((t) => t.id === tenderId)
  if (!tender) return

  const tenderBids = bids[tenderId] || []
  const winningBid = tenderBids.find((b) => b.bidderId === bidderId)
  if (!winningBid) return

  tenderBids.forEach((b) => {
    if (b.bidderId === bidderId) {
      b.status = "winner"
    } else if (b.status === "submitted") {
      b.status = "evaluated"
    }
  })

  tender.status = "Awarded"
  tender.winnerDeclaredAt = new Date().toISOString()
  saveToDisk()
  notify()
}

export function addBidReply(_tenderId: string, _bidderId: string, _message: string) {
  void _tenderId
  void _bidderId
  void _message
  // For officer-vendor communication
  // This is a simplified version - in real app would be more complex
  notify()
}

export function subscribe(listener: Listener): () => void {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

// --- React Context for use in components ---

interface StoreContextValue {
  tenders: Tender[]
  bids: Record<string, Bid[]>
  role: UserRole
  notificationCount: number
  officerName: string
  officerDepartment: string
  vendorCompanyName: string
  vendorId: string
  walletAddress: string
}

const StoreContext = createContext<StoreContextValue>({
  tenders: [],
  bids: {},
  role: "vendor",
  notificationCount: 0,
  officerName: "",
  officerDepartment: "",
  vendorCompanyName: "",
  vendorId: "",
  walletAddress: "",
})

export function TenderStoreProvider({ children }: { children: ReactNode }) {
  const [, forceUpdate] = useState(0)

  useEffect(() => {
    const unsub = subscribe(() => forceUpdate((n) => n + 1))
    return unsub
  }, [])

  const value: StoreContextValue = {
    tenders: getTenders(),
    bids,
    role: getCurrentRole(),
    notificationCount: getNotificationCount(),
    officerName: getOfficerInfo().name,
    officerDepartment: getOfficerInfo().department,
    vendorCompanyName: getVendorInfo().companyName,
    vendorId: getVendorInfo().vendorId,
    walletAddress: getVendorInfo().walletAddress,
  }

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useTenderStore() {
  return useContext(StoreContext)
}