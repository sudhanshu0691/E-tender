"use client"

import { createContext, useContext, useEffect, useMemo, useState } from "react"

export type UserRole = "vendor" | "officer"

export interface AuthUser {
  id: string
  name: string
  email: string
  role: UserRole
  department?: string
  walletAddress?: string
  designation?: string
  ministry?: string
  orgName?: string
  dscStatus?: "connected" | "not_connected"
}

interface AuthContextValue {
  user: AuthUser | null
  isReady: boolean
  login: (user: AuthUser) => void
  logout: () => void
  setUser: React.Dispatch<React.SetStateAction<AuthUser | null>>
}

const STORAGE_KEY = "tenderchain-auth-user"

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    try {
      const storedUser = window.localStorage.getItem(STORAGE_KEY)
      if (storedUser) {
        setUser(JSON.parse(storedUser) as AuthUser)
      }
    } catch {
      setUser(null)
    } finally {
      setIsReady(true)
    }
  }, [])

  useEffect(() => {
    if (!isReady) {
      return
    }

    try {
      if (user) {
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
      } else {
        window.localStorage.removeItem(STORAGE_KEY)
      }
    } catch {
      // Local storage can be disabled in restrictive browser contexts.
    }
  }, [isReady, user])

  const value = useMemo(
    () => ({
      user,
      isReady,
      login: setUser,
      logout: () => setUser(null),
      setUser,
    }),
    [isReady, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}