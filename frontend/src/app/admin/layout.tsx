import { RoleGuard } from "@/components/RoleGuard"
import { OfficerSidebar } from "@/components/OfficerSidebar"

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <RoleGuard requiredRole="officer">
      <div className="flex h-screen overflow-hidden">
        <OfficerSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </RoleGuard>
  )
}