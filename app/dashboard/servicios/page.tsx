import { DashboardLayout } from "@/components/dashboard-layout"
import { ServiciosTable } from "@/components/servicios-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ServiciosPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Servicios</h1>
            <p className="text-muted-foreground">Gestiona los servicios de tu barbería</p>
          </div>
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href="/dashboard/servicios/nuevo">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Servicio
            </Link>
          </Button>
        </div>

        <ServiciosTable />
      </div>
    </DashboardLayout>
  )
}
