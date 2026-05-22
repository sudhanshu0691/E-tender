import { RoleGuard } from "@/components/RoleGuard"

export default function VendorLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <RoleGuard requiredRole="vendor">{children}</RoleGuard>
}