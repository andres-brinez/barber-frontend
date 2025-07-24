import { DashboardLayout } from "@/components/dashboard-layout"
import { NuevoUsuarioForm } from "@/components/nuevo-usuario-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NuevoUsuarioPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/usuarios">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nuevo Usuario</h1>
            <p className="text-muted-foreground">Agrega un nuevo usuario al sistema</p>
          </div>
        </div>

        <NuevoUsuarioForm />
      </div>
    </DashboardLayout>
  )
}
