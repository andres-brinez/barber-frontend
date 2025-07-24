import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, User } from "lucide-react"

export function AgendaCalendar() {
  const citas = [
    {
      id: 1,
      cliente: "Juan Pérez",
      servicio: "Corte + Barba",
      hora: "09:00",
      duracion: "45 min",
      estado: "confirmada",
    },
    {
      id: 2,
      cliente: "María García",
      servicio: "Corte de cabello",
      hora: "10:30",
      duracion: "30 min",
      estado: "pendiente",
    },
    {
      id: 3,
      cliente: "Carlos López",
      servicio: "Afeitado",
      hora: "12:00",
      duracion: "20 min",
      estado: "confirmada",
    },
    {
      id: 4,
      cliente: "Ana Martínez",
      servicio: "Tratamiento capilar",
      hora: "14:00",
      duracion: "60 min",
      estado: "confirmada",
    },
  ]

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Citas de Hoy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {citas.map((cita) => (
              <div key={cita.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                    <User className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-medium">{cita.cliente}</p>
                    <p className="text-sm text-muted-foreground">{cita.servicio}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-4 w-4" />
                    {cita.hora}
                  </div>
                  <Badge
                    variant={cita.estado === "confirmada" ? "default" : "secondary"}
                    className={cita.estado === "confirmada" ? "bg-green-100 text-green-800" : ""}
                  >
                    {cita.estado}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Resumen del Día</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
              <span className="font-medium">Total de citas</span>
              <span className="text-2xl font-bold text-blue-600">8</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
              <span className="font-medium">Completadas</span>
              <span className="text-2xl font-bold text-green-600">3</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-amber-50 rounded-lg">
              <span className="font-medium">Pendientes</span>
              <span className="text-2xl font-bold text-amber-600">4</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="font-medium">Canceladas</span>
              <span className="text-2xl font-bold text-red-600">1</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
