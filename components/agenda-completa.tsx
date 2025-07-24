"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, User, ChevronLeft, ChevronRight, Filter } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Datos de ejemplo para la agenda completa
const citasCompletas = [
  {
    id: 1,
    fecha: "2024-01-15",
    hora: "09:00",
    cliente: "Juan Pérez",
    servicio: "Corte + Barba",
    barbero: "Carlos",
    duracion: 45,
    estado: "confirmada",
    telefono: "+1 234 567 8900",
    notas: "Cliente regular",
  },
  {
    id: 2,
    fecha: "2024-01-15",
    hora: "10:30",
    cliente: "María García",
    servicio: "Corte de cabello",
    barbero: "Ana",
    duracion: 30,
    estado: "pendiente",
    telefono: "+1 234 567 8901",
    notas: "",
  },
  {
    id: 3,
    fecha: "2024-01-15",
    hora: "12:00",
    cliente: "Carlos López",
    servicio: "Afeitado",
    barbero: "Carlos",
    duracion: 20,
    estado: "confirmada",
    telefono: "+1 234 567 8902",
    notas: "Prefiere navaja tradicional",
  },
  {
    id: 4,
    fecha: "2024-01-16",
    hora: "09:30",
    cliente: "Ana Martínez",
    servicio: "Tratamiento capilar",
    barbero: "Ana",
    duracion: 60,
    estado: "confirmada",
    telefono: "+1 234 567 8903",
    notas: "Cabello graso",
  },
  {
    id: 5,
    fecha: "2024-01-16",
    hora: "11:00",
    cliente: "Pedro Rodríguez",
    servicio: "Corte Clásico",
    barbero: "Carlos",
    duracion: 30,
    estado: "cancelada",
    telefono: "+1 234 567 8904",
    notas: "Canceló por enfermedad",
  },
  {
    id: 6,
    fecha: "2024-01-17",
    hora: "14:00",
    cliente: "Laura Sánchez",
    servicio: "Peinado especial",
    barbero: "Ana",
    duracion: 45,
    estado: "pendiente",
    telefono: "+1 234 567 8905",
    notas: "Evento especial",
  },
]

const barberos = ["Todos", "Carlos", "Ana", "María"]
const estados = ["Todos", "confirmada", "pendiente", "cancelada", "completada"]

export function AgendaCompleta() {
  const [fechaSeleccionada, setFechaSeleccionada] = useState("2024-01-15")
  const [barberoFiltro, setBarberoFiltro] = useState("Todos")
  const [estadoFiltro, setEstadoFiltro] = useState("Todos")
  const [vistaActual, setVistaActual] = useState<"dia" | "semana" | "mes">("semana")

  // Filtrar citas
  const citasFiltradas = citasCompletas.filter((cita) => {
    const cumpleBarbero = barberoFiltro === "Todos" || cita.barbero === barberoFiltro
    const cumpleEstado = estadoFiltro === "Todos" || cita.estado === estadoFiltro
    return cumpleBarbero && cumpleEstado
  })

  // Agrupar citas por fecha
  const citasPorFecha = citasFiltradas.reduce(
    (acc, cita) => {
      if (!acc[cita.fecha]) {
        acc[cita.fecha] = []
      }
      acc[cita.fecha].push(cita)
      return acc
    },
    {} as Record<string, typeof citasCompletas>,
  )

  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case "confirmada":
        return "bg-green-100 text-green-800"
      case "pendiente":
        return "bg-yellow-100 text-yellow-800"
      case "cancelada":
        return "bg-red-100 text-red-800"
      case "completada":
        return "bg-blue-100 text-blue-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const formatearFecha = (fecha: string) => {
    return new Date(fecha).toLocaleDateString("es-ES", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      {/* Controles y filtros */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              Agenda Completa
            </CardTitle>
            <div className="flex items-center gap-2">
              <Button
                variant={vistaActual === "dia" ? "default" : "outline"}
                size="sm"
                onClick={() => setVistaActual("dia")}
              >
                Día
              </Button>
              <Button
                variant={vistaActual === "semana" ? "default" : "outline"}
                size="sm"
                onClick={() => setVistaActual("semana")}
              >
                Semana
              </Button>
              <Button
                variant={vistaActual === "mes" ? "default" : "outline"}
                size="sm"
                onClick={() => setVistaActual("mes")}
              >
                Mes
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-4">
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span className="text-sm font-medium">Filtros:</span>
            </div>
            <Select value={barberoFiltro} onValueChange={setBarberoFiltro}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Barbero" />
              </SelectTrigger>
              <SelectContent>
                {barberos.map((barbero) => (
                  <SelectItem key={barbero} value={barbero}>
                    {barbero}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={estadoFiltro} onValueChange={setEstadoFiltro}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                {estados.map((estado) => (
                  <SelectItem key={estado} value={estado}>
                    {estado === "Todos" ? "Todos" : estado.charAt(0).toUpperCase() + estado.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Navegación de fechas */}
          <div className="flex items-center justify-between mb-6">
            <Button variant="outline" size="sm">
              <ChevronLeft className="h-4 w-4" />
              Anterior
            </Button>
            <h3 className="text-lg font-semibold">Enero 2024</h3>
            <Button variant="outline" size="sm">
              Siguiente
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de citas por fecha */}
      <div className="space-y-4">
        {Object.entries(citasPorFecha)
          .sort(([a], [b]) => a.localeCompare(b))
          .map(([fecha, citas]) => (
            <Card key={fecha}>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg capitalize">{formatearFecha(fecha)}</CardTitle>
                <p className="text-sm text-muted-foreground">{citas.length} citas programadas</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {citas
                    .sort((a, b) => a.hora.localeCompare(b.hora))
                    .map((cita) => (
                      <div
                        key={cita.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-lg font-semibold">{cita.hora}</div>
                            <div className="text-xs text-muted-foreground">{cita.duracion} min</div>
                          </div>
                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100">
                            <User className="h-5 w-5 text-amber-600" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{cita.cliente}</div>
                            <div className="text-sm text-muted-foreground">{cita.servicio}</div>
                            <div className="text-xs text-muted-foreground">Barbero: {cita.barbero}</div>
                            {cita.notas && <div className="text-xs text-blue-600 mt-1">{cita.notas}</div>}
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge className={getEstadoColor(cita.estado)}>{cita.estado}</Badge>
                          <div className="text-right">
                            <div className="text-sm font-medium">{cita.telefono}</div>
                            <div className="flex gap-1 mt-1">
                              <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                                Editar
                              </Button>
                              <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                                Llamar
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>

      {/* Resumen estadístico */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              <span className="text-sm font-medium">Confirmadas</span>
            </div>
            <div className="text-2xl font-bold mt-1">
              {citasFiltradas.filter((c) => c.estado === "confirmada").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
              <span className="text-sm font-medium">Pendientes</span>
            </div>
            <div className="text-2xl font-bold mt-1">
              {citasFiltradas.filter((c) => c.estado === "pendiente").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              <span className="text-sm font-medium">Canceladas</span>
            </div>
            <div className="text-2xl font-bold mt-1">
              {citasFiltradas.filter((c) => c.estado === "cancelada").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Horas</span>
            </div>
            <div className="text-2xl font-bold mt-1">
              {Math.round(citasFiltradas.reduce((acc, cita) => acc + cita.duracion, 0) / 60)}h
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
