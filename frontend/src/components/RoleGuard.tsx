"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth, type UserRole } from "@/components/AuthProvider"

function getDashboardPath(role: UserRole) {
  return role === "officer" ? "/admin" : "/vendor"
}

export function RoleGuard({
  requiredRole,
  children,
}: {
  requiredRole: UserRole
  children: React.ReactNode
}) {
  const router = useRouter()
  const { user, isReady } = useAuth()

  useEffect(() => {
    if (!isReady) {
      return
    }

    if (!user) {
      router.replace("/login")
      return
    }

    if (user.role !== requiredRole) {
      router.replace(getDashboardPath(user.role))
    }
  }, [isReady, requiredRole, router, user])

  if (!isReady || !user || user.role !== requiredRole) {
    return <div className="min-h-[60vh] bg-[#F8F9FC]" />
  }

  return <>{children}</>
}