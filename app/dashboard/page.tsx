import { DashboardLayout } from "@/components/dashboard-layout"
import { StatsCards } from "@/components/stats-cards"
import { RecentActivity } from "@/components/recent-activity"
import { QuickActions } from "@/components/quick-actions"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Bienvenido a tu panel de administración</p>
        </div>

        <StatsCards />

        <div className="grid gap-6 md:grid-cols-2">
          <RecentActivity />
          <QuickActions />
        </div>
      </div>
    </DashboardLayout>
  )
}
