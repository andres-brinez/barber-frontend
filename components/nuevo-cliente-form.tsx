"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, Plus } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"

export function NuevoClienteForm() {
  const [uploadedImages, setUploadedImages] = useState<string[]>([])
  const [realizaDeporte, setRealizaDeporte] = useState<string>("")
  const [deseaDisimular, setDeseaDisimular] = useState<string>("")
  const [tieneArrugas, setTieneArrugas] = useState<string>("")
  const [tienePlagiocefalia, setTienePlagiocefalia] = useState<string>("")

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (e) => {
          setUploadedImages((prev) => [...prev, e.target?.result as string])
        }
        reader.readAsDataURL(file)
      })
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Información Completa del Cliente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <form className="space-y-8">
            {/* Información Personal Básica */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Información Personal</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombreCompleto">Nombre completo *</Label>
                  <Input id="nombreCompleto" placeholder="Ingresa el nombre completo" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edad">Edad *</Label>
                  <Input id="edad" type="number" placeholder="25" required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ocupacion">Ocupación</Label>
                  <Input id="ocupacion" placeholder="Ej: Ingeniero, Estudiante, etc." />
                </div>
                <div className="space-y-2">
                  <Label>Estado Civil</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soltero">Soltero/a</SelectItem>
                      <SelectItem value="casado">Casado/a</SelectItem>
                      <SelectItem value="divorciado">Divorciado/a</SelectItem>
                      <SelectItem value="viudo">Viudo/a</SelectItem>
                      <SelectItem value="union-libre">Unión libre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Personalidad</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona personalidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="extrovertido">Extrovertido</SelectItem>
                      <SelectItem value="introvertido">Introvertido</SelectItem>
                      <SelectItem value="conservador">Conservador</SelectItem>
                      <SelectItem value="aventurero">Aventurero</SelectItem>
                      <SelectItem value="clasico">Clásico</SelectItem>
                      <SelectItem value="moderno">Moderno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Gustos en Ropa</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Estilo de vestir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="deportivo">Deportivo</SelectItem>
                      <SelectItem value="elegante">Elegante</SelectItem>
                      <SelectItem value="urbano">Urbano</SelectItem>
                      <SelectItem value="clasico">Clásico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Medidas del Cabello */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Medidas del Cabello (cm)</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="medidasFrente">Medidas Frente</Label>
                  <Input id="medidasFrente" type="number" step="0.1" placeholder="5.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medidasLateral1">Medidas Lateral 1</Label>
                  <Input id="medidasLateral1" type="number" step="0.1" placeholder="3.0" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medidasNuca">Medidas Nuca</Label>
                  <Input id="medidasNuca" type="number" step="0.1" placeholder="2.0" />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="medidasLateral2">Medidas Lateral 2</Label>
                  <Input id="medidasLateral2" type="number" step="0.1" placeholder="3.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medidasBarba">Medidas Barba</Label>
                  <Input id="medidasBarba" type="number" step="0.1" placeholder="1.5" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medidasLongitudGeneral">Longitud General</Label>
                  <Input id="medidasLongitudGeneral" type="number" step="0.1" placeholder="8.0" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Hábitos y Preferencias */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Hábitos y Preferencias</h3>

              <div className="space-y-3">
                <Label>¿Realiza deporte?</Label>
                <RadioGroup value={realizaDeporte} onValueChange={setRealizaDeporte}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="deporte-si" />
                    <Label htmlFor="deporte-si">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="deporte-no" />
                    <Label htmlFor="deporte-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {realizaDeporte === "si" && (
                <div className="space-y-2">
                  <Label htmlFor="deporteEspecifico">¿Qué deporte específico?</Label>
                  <Input id="deporteEspecifico" placeholder="Ej: Fútbol, Natación, Gimnasio..." />
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tiempoPeinarseMin">Tiempo para peinarse (minutos)</Label>
                  <Input id="tiempoPeinarseMin" type="number" placeholder="10" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tiempoEntreCortesDias">Tiempo entre cortes (días)</Label>
                  <Input id="tiempoEntreCortesDias" type="number" placeholder="30" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="corteReferencia">Corte de referencia</Label>
                <Textarea
                  id="corteReferencia"
                  placeholder="Describe el corte que prefiere o menciona referencias..."
                  className="min-h-[60px]"
                />
              </div>
            </div>

            <Separator />

            {/* Preferencias de Estilo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Preferencias de Estilo</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Gusto longitud superior</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona longitud" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="muy-corto">Muy corto</SelectItem>
                      <SelectItem value="corto">Corto</SelectItem>
                      <SelectItem value="medio">Medio</SelectItem>
                      <SelectItem value="largo">Largo</SelectItem>
                      <SelectItem value="muy-largo">Muy largo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Gusto tono desvanecido</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tono" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alto">Alto</SelectItem>
                      <SelectItem value="medio">Medio</SelectItem>
                      <SelectItem value="bajo">Bajo</SelectItem>
                      <SelectItem value="sin-desvanecido">Sin desvanecido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Características Físicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Características Físicas</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tipo de cráneo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="redondo">Redondo</SelectItem>
                      <SelectItem value="ovalado">Ovalado</SelectItem>
                      <SelectItem value="cuadrado">Cuadrado</SelectItem>
                      <SelectItem value="triangular">Triangular</SelectItem>
                      <SelectItem value="alargado">Alargado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de rostro</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="redondo">Redondo</SelectItem>
                      <SelectItem value="ovalado">Ovalado</SelectItem>
                      <SelectItem value="cuadrado">Cuadrado</SelectItem>
                      <SelectItem value="triangular">Triangular</SelectItem>
                      <SelectItem value="corazon">Corazón</SelectItem>
                      <SelectItem value="diamante">Diamante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tipo de perfil</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recto">Recto</SelectItem>
                    <SelectItem value="convexo">Convexo</SelectItem>
                    <SelectItem value="concavo">Cóncavo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Preguntas Sí/No */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>¿Desea disimular algo de su rostro?</Label>
                  <RadioGroup value={deseaDisimular} onValueChange={setDeseaDisimular}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="disimular-si" />
                      <Label htmlFor="disimular-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="disimular-no" />
                      <Label htmlFor="disimular-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {deseaDisimular === "si" && (
                  <div className="space-y-2">
                    <Label htmlFor="zonasDisimular">¿Qué zonas desea disimular?</Label>
                    <Textarea
                      id="zonasDisimular"
                      placeholder="Describe las zonas que desea disimular..."
                      className="min-h-[60px]"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <Label>¿Tiene arrugas o protuberancias?</Label>
                  <RadioGroup value={tieneArrugas} onValueChange={setTieneArrugas}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="arrugas-si" />
                      <Label htmlFor="arrugas-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="arrugas-no" />
                      <Label htmlFor="arrugas-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {tieneArrugas === "si" && (
                  <div className="space-y-2">
                    <Label htmlFor="zonasArrugasProtuberancias">¿En qué zonas?</Label>
                    <Textarea
                      id="zonasArrugasProtuberancias"
                      placeholder="Describe las zonas con arrugas o protuberancias..."
                      className="min-h-[60px]"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <Label>¿Tiene plagiocefalia?</Label>
                  <RadioGroup value={tienePlagiocefalia} onValueChange={setTienePlagiocefalia}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="plagiocefalia-si" />
                      <Label htmlFor="plagiocefalia-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="plagiocefalia-no" />
                      <Label htmlFor="plagiocefalia-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <Separator />

            {/* Características del Cabello */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Características del Cabello</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Textura del cabello</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona textura" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="liso">Liso</SelectItem>
                      <SelectItem value="ondulado">Ondulado</SelectItem>
                      <SelectItem value="rizado">Rizado</SelectItem>
                      <SelectItem value="crespo">Crespo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Densidad del cabello</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona densidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Recomendaciones Profesionales */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Recomendaciones Profesionales</h3>

              <div className="space-y-2">
                <Label htmlFor="corteCorrectivo">Corte correctivo recomendado</Label>
                <Textarea
                  id="corteCorrectivo"
                  placeholder="Describe el corte correctivo recomendado..."
                  className="min-h-[80px]"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="productoAdecuadoMantenimiento">Producto adecuado para mantenimiento</Label>
                <Textarea
                  id="productoAdecuadoMantenimiento"
                  placeholder="Recomienda productos para el mantenimiento..."
                  className="min-h-[80px]"
                />
              </div>
            </div>

            <Separator />

            {/* Fotos del Cliente */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Fotos del Cliente</h3>
              <p className="text-sm text-muted-foreground">
                Sube múltiples fotos del perfil del cliente (cabeza, diferentes ángulos)
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label htmlFor="fotos" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">Haz clic para subir fotos</span>
                      <span className="mt-1 block text-xs text-gray-500">PNG, JPG hasta 10MB cada una</span>
                    </Label>
                    <Input
                      id="fotos"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>

              {/* Mostrar fotos subidas */}
              {uploadedImages.length > 0 && (
                <div className="grid gap-4 md:grid-cols-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
                    <Label htmlFor="fotos-adicionales" className="cursor-pointer text-center">
                      <Plus className="mx-auto h-8 w-8 text-gray-400" />
                      <span className="mt-2 block text-xs text-gray-500">Agregar más</span>
                    </Label>
                    <Input
                      id="fotos-adicionales"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                Guardar Cliente
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
