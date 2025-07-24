import { DashboardLayout } from "@/components/dashboard-layout"
import { ClientesTable } from "@/components/clientes-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function ClientesPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="text-muted-foreground">Gestiona la información de tus clientes</p>
          </div>
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href="/dashboard/clientes/nuevo">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Cliente
            </Link>
          </Button>
        </div>

        <ClientesTable />
      </div>
    </DashboardLayout>
  )
}
