"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Calendar, Edit, Trash2, ZoomIn, X } from "lucide-react"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

interface Cliente {
  id: number
  nombreCompleto: string
  email: string
  telefono: string
  ultimaVisita: string
  estado: string
  edad: number
  ocupacion: string
  estadoCivil: string
  personalidad: string
  gustosRopa: string
  medidasFrente: number
  medidasLateral1: number
  medidasNuca: number
  medidasLateral2: number
  medidasBarba: number
  medidasLongitudGeneral: number
  realizaDeporte: string
  deporteEspecifico?: string
  tiempoPeinarseMin: number
  tiempoEntreCortesDias: number
  corteReferencia: string
  gustoLongitudSuperior: string
  gustoTonoDesvanecido: string
  tipoCraneo: string
  deseaDisimularAlgoDeSuRostro: string
  zonasDisimular?: string
  tieneArrugasProtuberancias: string
  zonasArrugasProtuberancias?: string
  tienePlagiocefalia: string
  texturaCabello: string
  densidadCabello: string
  tipoRostro: string
  tipoPerfil: string
  corteCorrectivo: string
  productoAdecuadoMantenimiento: string
  fotos: string[]
  direccion: string
  notas: string
}

interface ClienteDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  cliente: Cliente | null
  onEdit?: (cliente: Cliente) => void
  onDelete?: (cliente: Cliente) => void
}

export function ClienteDetailsDialog({ open, onOpenChange, cliente, onEdit, onDelete }: ClienteDetailsDialogProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)

  if (!cliente) return null

  const handleEdit = () => {
    if (onEdit) {
      onEdit(cliente)
    }
    onOpenChange(false)
  }

  const handleDelete = () => {
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    if (onDelete) {
      onDelete(cliente)
    }
    setDeleteDialogOpen(false)
    onOpenChange(false)
  }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Información Completa del Cliente</DialogTitle>
              <div className="flex gap-2">
                <Button onClick={handleEdit} size="sm" className="bg-amber-600 hover:bg-amber-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button onClick={handleDelete} size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button>
              </div>
            </div>
          </DialogHeader>

          <div className="space-y-6">
            {/* Información básica y fotos */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="space-y-2">
                    <h3 className="text-xl font-semibold">{cliente.nombreCompleto}</h3>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={cliente.estado === "Activo" ? "default" : "secondary"}
                        className={cliente.estado === "Activo" ? "bg-green-100 text-green-800" : ""}
                      >
                        {cliente.estado}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {cliente.edad} años • {cliente.ocupacion}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Información de contacto */}
                <div className="space-y-3">
                  <h4 className="font-medium flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Información de Contacto
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{cliente.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{cliente.telefono}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span>{cliente.direccion}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Última visita:{" "}
                        {new Date(cliente.ultimaVisita).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fotos del cliente */}
              <div className="space-y-3">
                <h4 className="font-medium">Fotos del Cliente</h4>
                <div className="grid gap-2 grid-cols-3">
                  {cliente.fotos.map((foto, index) => (
                    <div key={index} className="relative group cursor-pointer" onClick={() => setSelectedImage(foto)}>
                      <img
                        src={foto || "/placeholder.svg"}
                        alt={`Foto ${index + 1}`}
                        className="rounded-lg object-cover w-full h-24 hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <ZoomIn className="h-5 w-5 text-white" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            {/* Resto del contenido igual que antes pero adaptado para React */}
            {/* ... (mantener toda la estructura de información del cliente) ... */}
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal para imagen ampliada */}
      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Foto del Cliente</DialogTitle>
              <Button variant="ghost" size="sm" onClick={() => setSelectedImage(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </DialogHeader>
          {selectedImage && (
            <div className="flex justify-center">
              <img
                src={selectedImage || "/placeholder.svg"}
                alt="Foto ampliada"
                className="rounded-lg object-contain max-h-[70vh] max-w-full"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar */}
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="¿Eliminar cliente?"
        description={`¿Estás seguro de que deseas eliminar al cliente "${cliente.nombreCompleto}"? Esta acción no se puede deshacer y se perderá todo su historial y información detallada.`}
      />
    </>
  )
}
