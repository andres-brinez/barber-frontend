"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const diasSemana = [
  { id: "lunes", nombre: "Lunes" },
  { id: "martes", nombre: "Martes" },
  { id: "miercoles", nombre: "Miércoles" },
  { id: "jueves", nombre: "Jueves" },
  { id: "viernes", nombre: "Viernes" },
  { id: "sabado", nombre: "Sábado" },
  { id: "domingo", nombre: "Domingo" },
]

export function ConfiguracionHorarios() {
  const [horarios, setHorarios] = useState({
    lunes: { activo: true, apertura: "09:00", cierre: "18:00" },
    martes: { activo: true, apertura: "09:00", cierre: "18:00" },
    miercoles: { activo: true, apertura: "09:00", cierre: "18:00" },
    jueves: { activo: true, apertura: "09:00", cierre: "18:00" },
    viernes: { activo: true, apertura: "09:00", cierre: "19:00" },
    sabado: { activo: true, apertura: "08:00", cierre: "17:00" },
    domingo: { activo: false, apertura: "10:00", cierre: "16:00" },
  })

  const updateHorario = (dia: string, campo: string, valor: any) => {
    setHorarios((prev) => ({
      ...prev,
      [dia]: {
        ...prev[dia as keyof typeof prev],
        [campo]: valor,
      },
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Horarios de Atención</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {diasSemana.map((dia) => {
            const horario = horarios[dia.id as keyof typeof horarios]
            return (
              <div key={dia.id} className="flex items-center gap-4 p-4 border rounded-lg">
                <div className="w-24">
                  <Switch
                    checked={horario.activo}
                    onCheckedChange={(checked) => updateHorario(dia.id, "activo", checked)}
                  />
                </div>
                <div className="w-20 font-medium">{dia.nombre}</div>
                <div className="flex items-center gap-2 flex-1">
                  <div className="space-y-1">
                    <Label className="text-xs">Apertura</Label>
                    <Input
                      type="time"
                      value={horario.apertura}
                      onChange={(e) => updateHorario(dia.id, "apertura", e.target.value)}
                      disabled={!horario.activo}
                      className="w-24"
                    />
                  </div>
                  <span className="text-muted-foreground">a</span>
                  <div className="space-y-1">
                    <Label className="text-xs">Cierre</Label>
                    <Input
                      type="time"
                      value={horario.cierre}
                      onChange={(e) => updateHorario(dia.id, "cierre", e.target.value)}
                      disabled={!horario.activo}
                      className="w-24"
                    />
                  </div>
                </div>
                {!horario.activo && <span className="text-sm text-muted-foreground">Cerrado</span>}
              </div>
            )
          })}
        </div>

        <div className="flex gap-4 pt-4">
          <Button className="bg-amber-600 hover:bg-amber-700">Guardar Horarios</Button>
          <Button variant="outline">Restaurar Predeterminados</Button>
        </div>
      </CardContent>
    </Card>
  )
}
