"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Upload, X } from "lucide-react"

export function ConfiguracionGeneral() {
  const [logo, setLogo] = useState<string | null>(null)
  const [mantenimiento, setMantenimiento] = useState(false)

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogo(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Configuración General</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form className="space-y-6">
          {/* Información de la barbería */}
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="nombre-barberia">Nombre de la barbería</Label>
              <Input id="nombre-barberia" defaultValue="BarberShop Pro" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefono-barberia">Teléfono</Label>
              <Input id="telefono-barberia" defaultValue="+1 234 567 8900" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="direccion-barberia">Dirección</Label>
            <Textarea
              id="direccion-barberia"
              defaultValue="Calle Principal 123, Ciudad, Estado 12345"
              className="min-h-[60px]"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="descripcion">Descripción</Label>
            <Textarea id="descripcion" placeholder="Describe tu barbería..." className="min-h-[80px]" />
          </div>

          {/* Logo */}
          <div className="space-y-3">
            <Label>Logo de la barbería</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
              {logo ? (
                <div className="relative">
                  <img
                    src={logo || "/placeholder.svg"}
                    alt="Logo"
                    className="w-32 h-32 object-cover rounded-lg mx-auto"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    onClick={() => setLogo(null)}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ) : (
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label htmlFor="logo" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">Haz clic para subir el logo</span>
                      <span className="mt-1 block text-xs text-gray-500">PNG, JPG hasta 5MB</span>
                    </Label>
                    <Input id="logo" type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Configuraciones adicionales */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label>Modo mantenimiento</Label>
                <p className="text-sm text-muted-foreground">
                  Activa el modo mantenimiento para realizar actualizaciones
                </p>
              </div>
              <Switch checked={mantenimiento} onCheckedChange={setMantenimiento} />
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
              Guardar Cambios
            </Button>
            <Button type="button" variant="outline">
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
