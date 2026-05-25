import { RoleGuard } from "@/components/RoleGuard"
import { VendorSidebar } from "@/components/VendorSidebar"

export default function VendorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <RoleGuard requiredRole="vendor">
      <div className="flex h-screen overflow-hidden">
        <VendorSidebar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </RoleGuard>
  )
}
