"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ConfiguracionNotificaciones() {
  const [notificaciones, setNotificaciones] = useState({
    emailCitas: true,
    smsRecordatorios: false,
    emailReportes: true,
    notificacionesPush: true,
  })

  const [recordatorioTiempo, setRecordatorioTiempo] = useState("24")

  const updateNotificacion = (key: string, value: boolean) => {
    setNotificaciones((prev) => ({
      ...prev,
      [key]: value,
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notificaciones</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones por email de nuevas citas</Label>
              <p className="text-sm text-muted-foreground">Recibe un email cuando se agende una nueva cita</p>
            </div>
            <Switch
              checked={notificaciones.emailCitas}
              onCheckedChange={(checked) => updateNotificacion("emailCitas", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Recordatorios por SMS</Label>
              <p className="text-sm text-muted-foreground">Envía recordatorios automáticos por SMS a los clientes</p>
            </div>
            <Switch
              checked={notificaciones.smsRecordatorios}
              onCheckedChange={(checked) => updateNotificacion("smsRecordatorios", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Reportes por email</Label>
              <p className="text-sm text-muted-foreground">Recibe reportes semanales por email</p>
            </div>
            <Switch
              checked={notificaciones.emailReportes}
              onCheckedChange={(checked) => updateNotificacion("emailReportes", checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Notificaciones push</Label>
              <p className="text-sm text-muted-foreground">Recibe notificaciones en tiempo real en el navegador</p>
            </div>
            <Switch
              checked={notificaciones.notificacionesPush}
              onCheckedChange={(checked) => updateNotificacion("notificacionesPush", checked)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Tiempo de recordatorio</Label>
          <Select value={recordatorioTiempo} onValueChange={setRecordatorioTiempo}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 hora antes</SelectItem>
              <SelectItem value="2">2 horas antes</SelectItem>
              <SelectItem value="24">24 horas antes</SelectItem>
              <SelectItem value="48">48 horas antes</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-4 pt-4">
          <Button className="bg-amber-600 hover:bg-amber-700">Guardar Configuración</Button>
          <Button variant="outline">Restaurar Predeterminados</Button>
        </div>
      </CardContent>
    </Card>
  )
}
