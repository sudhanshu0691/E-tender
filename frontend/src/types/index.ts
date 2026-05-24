export interface TenderBidScores {
  price: number
  financial: number
  experience: number
  performance: number
  technical: number
  compliance: number
  proposal: number
}

export interface TenderBid {
  bidderId: string
  companyName: string
  walletAddress: string
  bidHash: string
  submittedAt: string
  price?: number
  scores?: TenderBidScores
  totalScore?: number
  status?: 'submitted' | 'evaluated' | 'winner' | 'disqualified'
  disqualificationReason?: string
  documents?: { name: string; ipfsHash: string }[]
}

export interface AuditEvent {
  id: string
  eventType: string
  tenderId: string
  tenderTitle?: string
  actor: string
  timestamp: string
  txHash?: string
  ipfsHash?: string
  description?: string
}

export interface KYCDocument {
  name: string
  ipfsHash: string
  uploadDate: string
  expiryDate?: string | null
  status: 'pending' | 'verified' | 'rejected'
  rejectionReason?: string
}

export interface KYCVendor {
  id: string
  companyName: string
  ownerName: string
  email: string
  phone: string
  orgType: string
  walletAddress: string
  submittedDate: string
  kycLevel: number
  msmeCategory?: string | null
  udyamNumber?: string | null
  gstin?: string | null
  state: string
  city: string
  documents: KYCDocument[]
  annualTurnover: number[]
}

export interface Officer {
  id: string
  name: string
  email: string
  role: string
  department: string
  state: string
  city: string
  walletAddress: string
  kycLevel: number
  dscExpiry?: string
  lastLogin?: string
  tendersCreated?: number
  geomId?: string
}

export interface SystemHealth {
  blockchain: {
    status: string
    latency: string
    blockHeight: number
    network: string
    lastBlock: string
    nodeVersion?: string
  }
  ipfs: {
    status: string
    latency: string
    gateway: string
    uptime: string
    pinnedFiles?: number
    storageUsed?: string
  }
  database: {
    status: string
    latency: string
    operational: boolean
    queryCount: number
    region?: string
    tableName?: string
  }
  smartContract: {
    status: string
    address: string
    verified: boolean
    version?: string
    etherscanUrl?: string
    lastDeployed?: string
  }
}

export interface NotificationItem {
  id: string
  type: 'tender' | 'bid' | 'kyc' | 'system'
  title: string
  message: string
  timestamp: string
  read: boolean
  tenderId?: string | null
}
