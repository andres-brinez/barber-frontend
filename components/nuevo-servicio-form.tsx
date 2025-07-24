"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function NuevoServicioForm() {
  const [isActive, setIsActive] = useState(true)

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Información del Servicio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-6">
            {/* Información Básica */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre del servicio *</Label>
                <Input id="nombre" placeholder="Ej: Corte Clásico" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="categoria">Categoría *</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cortes">Cortes</SelectItem>
                    <SelectItem value="afeitado">Afeitado</SelectItem>
                    <SelectItem value="barba">Barba</SelectItem>
                    <SelectItem value="tratamientos">Tratamientos</SelectItem>
                    <SelectItem value="combo">Combo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="descripcion">Descripción</Label>
              <Textarea id="descripcion" placeholder="Describe el servicio que ofreces" className="min-h-[80px]" />
            </div>

            {/* Precio y Duración */}
            <div className="grid gap-4 md:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="precio">Precio *</Label>
                <Input id="precio" type="number" placeholder="25.00" step="0.01" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duracion">Duración (minutos) *</Label>
                <Input id="duracion" type="number" placeholder="30" required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="comision">Comisión (%)</Label>
                <Input id="comision" type="number" placeholder="15" step="0.01" />
              </div>
            </div>

            {/* Estado */}
            <div className="flex items-center space-x-2">
              <Switch id="activo" checked={isActive} onCheckedChange={setIsActive} />
              <Label htmlFor="activo">Servicio activo</Label>
            </div>

            {/* Configuración Adicional */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Configuración Adicional</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="preparacion">Tiempo de preparación (min)</Label>
                  <Input id="preparacion" type="number" placeholder="5" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="limpieza">Tiempo de limpieza (min)</Label>
                  <Input id="limpieza" type="number" placeholder="10" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="notas">Notas especiales</Label>
                <Textarea
                  id="notas"
                  placeholder="Instrucciones especiales, materiales necesarios, etc."
                  className="min-h-[60px]"
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                Guardar Servicio
              </Button>
              <Button type="button" variant="outline">
                Cancelar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
