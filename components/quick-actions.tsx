import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, Calendar, Users, Settings } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  const actions = [
    {
      title: "Nueva Cita",
      description: "Agendar una nueva cita",
      icon: Calendar,
      href: "/dashboard/agenda",
      color: "bg-blue-500 hover:bg-blue-600",
    },
    {
      title: "Agregar Cliente",
      description: "Registrar nuevo cliente",
      icon: Users,
      href: "/dashboard/clientes/nuevo",
      color: "bg-green-500 hover:bg-green-600",
    },
    {
      title: "Nuevo Usuario",
      description: "Crear cuenta de usuario",
      icon: Plus,
      href: "/dashboard/usuarios/nuevo",
      color: "bg-purple-500 hover:bg-purple-600",
    },
    {
      title: "Configuración",
      description: "Ajustar configuraciones",
      icon: Settings,
      href: "/dashboard/configuracion",
      color: "bg-gray-500 hover:bg-gray-600",
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle>Acciones Rápidas</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3">
          {actions.map((action) => (
            <Button key={action.title} variant="outline" className="h-auto p-4 justify-start bg-transparent" asChild>
              <Link href={action.href}>
                <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${action.color} mr-3`}>
                  <action.icon className="h-5 w-5 text-white" />
                </div>
                <div className="text-left">
                  <div className="font-medium">{action.title}</div>
                  <div className="text-xs text-muted-foreground">{action.description}</div>
                </div>
              </Link>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
