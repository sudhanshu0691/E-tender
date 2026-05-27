import type { ReactNode } from "react"
import { TenderStoreProvider } from "@/lib/tenderStore"
import NewHeader from "@/components/NewHeader"
import { Toaster } from "@/components/ui/toast"

export default function PortalLayout({ children }: { children: ReactNode }) {
  return (
    <TenderStoreProvider>
      <NewHeader />
      <main>{children}</main>
      <Toaster />
    </TenderStoreProvider>
  )
}
