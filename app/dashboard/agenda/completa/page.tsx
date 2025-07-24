import { DashboardLayout } from "@/components/dashboard-layout"
import { AgendaCompleta } from "@/components/agenda-completa"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

export default function AgendaCompletaPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard/agenda">
                <ArrowLeft className="h-4 w-4" />
                Volver
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Agenda Completa</h1>
              <p className="text-muted-foreground">Vista completa del calendario y todas las citas</p>
            </div>
          </div>
          <Button className="bg-amber-600 hover:bg-amber-700">
            <Plus className="mr-2 h-4 w-4" />
            Nueva Cita
          </Button>
        </div>

        <AgendaCompleta />
      </div>
    </DashboardLayout>
  )
}
