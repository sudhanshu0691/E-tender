import { redirect } from "next/navigation"

export default function PortalTenderDetailPage({ params }: { params: { id: string } }) {
  redirect(`/tenders/${params.id}`)
}
