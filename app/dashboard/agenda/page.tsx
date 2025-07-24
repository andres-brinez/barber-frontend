import { DashboardLayout } from "@/components/dashboard-layout"
import { AgendaCalendar } from "@/components/agenda-calendar"
import { Button } from "@/components/ui/button"
import { Calendar } from "lucide-react"
import Link from "next/link"

export default function AgendaPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Agenda</h1>
            <p className="text-muted-foreground">Gestiona las citas y horarios de la barbería</p>
          </div>
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href="/dashboard/agenda/completa">
              <Calendar className="mr-2 h-4 w-4" />
              Ver Agenda Completa
            </Link>
          </Button>
        </div>

        <AgendaCalendar />
      </div>
    </DashboardLayout>
  )
}
