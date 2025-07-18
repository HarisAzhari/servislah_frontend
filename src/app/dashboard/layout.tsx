import { DashboardLayout } from "@/components/dashboard-layout"
import { Suspense } from "react"

export default function DashboardLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <DashboardLayout>
      <Suspense fallback={<div>Loading...</div>}>
        {children}
      </Suspense>
    </DashboardLayout>
  )
} 