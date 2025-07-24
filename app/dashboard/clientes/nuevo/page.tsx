import { DashboardLayout } from "@/components/dashboard-layout"
import { NuevoClienteForm } from "@/components/nuevo-cliente-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function NuevoClientePage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/dashboard/clientes">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nuevo Cliente</h1>
            <p className="text-muted-foreground">Agrega un nuevo cliente a tu base de datos</p>
          </div>
        </div>

        <NuevoClienteForm />
      </div>
    </DashboardLayout>
  )
}
