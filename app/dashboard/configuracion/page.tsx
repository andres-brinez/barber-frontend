import { DashboardLayout } from "@/components/dashboard-layout"
import { ConfiguracionGeneral } from "@/components/configuracion-general"
import { ConfiguracionNotificaciones } from "@/components/configuracion-notificaciones"
import { ConfiguracionHorarios } from "@/components/configuracion-horarios"

export default function ConfiguracionPage() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
          <p className="text-muted-foreground">Administra la configuración de tu barbería</p>
        </div>

        <div className="grid gap-6">
          <ConfiguracionGeneral />
          <ConfiguracionHorarios />
          <ConfiguracionNotificaciones />
        </div>
      </div>
    </DashboardLayout>
  )
}
