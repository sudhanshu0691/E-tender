import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/components/AuthProvider"
import { TenderStoreProvider } from "@/lib/tenderStore"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import { Toaster } from "@/components/ui/toast"

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })
const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "TenderChain | Blockchain-Powered Public Tendering",
  description:
    "India's first blockchain-powered tendering platform ensuring corruption-free governance.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans min-h-screen flex flex-col`}>
        <AuthProvider>
          <TenderStoreProvider>
            <Navbar />
            <main className="flex-grow bg-[#F8F9FC]">{children}</main>
            <Footer />
            <Toaster />
          </TenderStoreProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
