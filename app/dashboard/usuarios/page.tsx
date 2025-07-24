import { DashboardLayout } from "@/components/dashboard-layout"
import { UsuariosTable } from "@/components/usuarios-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function UsuariosPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Usuarios</h1>
            <p className="text-muted-foreground">Administra los usuarios del sistema</p>
          </div>
          <Button asChild className="bg-amber-600 hover:bg-amber-700">
            <Link href="/dashboard/usuarios/nuevo">
              <Plus className="mr-2 h-4 w-4" />
              Agregar Usuario
            </Link>
          </Button>
        </div>

        <UsuariosTable />
      </div>
    </DashboardLayout>
  )
}
