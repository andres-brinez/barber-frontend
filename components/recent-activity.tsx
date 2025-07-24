import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User, Calendar } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      type: "cita",
      description: "Nueva cita agendada con Juan Pérez",
      time: "Hace 5 minutos",
      icon: Calendar,
    },
    {
      id: 2,
      type: "cliente",
      description: "Cliente María García actualizado",
      time: "Hace 15 minutos",
      icon: User,
    },
    {
      id: 3,
      type: "cita",
      description: "Cita completada con Carlos López",
      time: "Hace 1 hora",
      icon: Calendar,
    },
    {
      id: 4,
      type: "cliente",
      description: "Nuevo cliente Ana Martínez registrado",
      time: "Hace 2 horas",
      icon: User,
    },
  ]

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="h-5 w-5" />
          Actividad Reciente
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                <activity.icon className="h-4 w-4 text-amber-600" />
              </div>
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium">{activity.description}</p>
                <p className="text-xs text-muted-foreground">{activity.time}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {activity.type}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
