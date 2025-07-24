"use client"

import { useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { User, Mail, Phone, MapPin, Calendar, Edit, Trash2, ZoomIn, X } from "lucide-react"
import Image from "next/image"
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
  realizaDeporte: boolean
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
  tienePlagiosefalia: string
  texturaCabello: string
  densidadCabello: string
  tipoRostro: string
  tipoPerfil: string
  corteCorrectivo: string
  productoAdecuadoMantenimiento: string
  urlsImagenesCortes: string[]
  direccion: string
  notas: string
}

interface ClienteDetailsDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  idCliente: number | null
  onEdit?: (cliente: any) => void
  onDelete?: (cliente: Cliente) => void
}

export function ClienteDetailsDialog({ open, onOpenChange, idCliente, onEdit, onDelete }: ClienteDetailsDialogProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [cliente, setCliente] = useState<Cliente | null>(null);

  useEffect(() => {
    if (idCliente !== null) {
      console.log("obteniendo los datos");
      fetch(`http://localhost:8080/api/perfiles-cliente/${idCliente}`)
        .then(response => response.json())
        .then(data => {
          console.log(data);
          setCliente(data);
          idCliente = null
        })
        .catch(error => {
          console.error(error);
        });
    }
  }, [idCliente]);

  if (idCliente === null || idCliente === undefined || !cliente) return null;


  // const handleEdit = () => {
  //   if (onEdit) {
  //     onEdit(cliente)
  //   }
  //   onOpenChange(false)
  // }

  // const handleDelete = () => {
  //   setDeleteDialogOpen(true)
  // }

  // const confirmDelete = () => {
  //   if (onDelete) {
  //     onDelete(cliente)
  //   }
  //   setDeleteDialogOpen(false)
  //   onOpenChange(false)
  // }

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <div className="flex items-center justify-between">
              <DialogTitle>Información Completa del Cliente</DialogTitle>
              <div className="flex gap-2">
                {/* // Esto parece que no deb ir ahi */}
                {/* <Button onClick={handleEdit} size="sm" className="bg-amber-600 hover:bg-amber-700">
                  <Edit className="h-4 w-4 mr-2" />
                  Editar
                </Button>
                <Button onClick={handleDelete} size="sm" variant="destructive">
                  <Trash2 className="h-4 w-4 mr-2" />
                  Eliminar
                </Button> */}
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
                      {/* <Badge
                        variant={cliente.estado === "Activo" ? "default" : "secondary"}
                        className={cliente.estado === "Activo" ? "bg-green-100 text-green-800" : ""}
                      >
                        {cliente.estado}
                      </Badge> */}
                      <span className="text-sm text-muted-foreground">
                        {cliente.edad} años -  {cliente.ocupacion}
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
                      <span className="text-muted-foreground">{cliente.email || "No disponible"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{cliente.telefono || "No disponible"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                      <span className="text-muted-foreground">{cliente.direccion || "No disponible"}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="flex items-center gap-2">
                        Última Visita: {"30/08/2004"}

                        {/* {new Date(cliente.ultimaVisita).toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })} */}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fotos del cliente */}
              <div className="space-y-3">
                <h4 className="font-medium">Fotos del Cliente</h4>
                <div className="grid gap-2 grid-cols-3">

                  {cliente.urlsImagenesCortes && cliente.urlsImagenesCortes.map((foto, index) => (
                    <div key={index} className="relative group cursor-pointer" onClick={() => setSelectedImage(foto)}>
                      <Image
                        src={foto || "/placeholder.svg"}
                        alt={`Foto ${index + 1}`}
                        width={100}
                        height={100}
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

            {/* Información Personal */}
            <div className="space-y-4">
              <h4 className="font-medium text-amber-700">Información Personal</h4>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div>
                  <span className="font-medium">Estado Civil:</span>
                  <p className="text-muted-foreground capitalize">{cliente.estadoCivil}</p>
                </div>
                <div>
                  <span className="font-medium">Personalidad:</span>
                  <p className="text-muted-foreground capitalize">{cliente.personalidad}</p>
                </div>
                <div>
                  <span className="font-medium">Estilo de Ropa:</span>
                  <p className="text-muted-foreground capitalize">{cliente.gustosRopa}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Medidas del Cabello */}
            <div className="space-y-4">
              <h4 className="font-medium text-amber-700">Medidas del Cabello (cm)</h4>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div>
                  <span className="font-medium">Frente:</span>
                  <p className="text-muted-foreground">{cliente.medidasFrente} cm</p>
                </div>
                <div>
                  <span className="font-medium">Lateral 1:</span>
                  <p className="text-muted-foreground">{cliente.medidasLateral1} cm</p>
                </div>
                <div>
                  <span className="font-medium">Nuca:</span>
                  <p className="text-muted-foreground">{cliente.medidasNuca} cm</p>
                </div>
                <div>
                  <span className="font-medium">Lateral 2:</span>
                  <p className="text-muted-foreground">{cliente.medidasLateral2} cm</p>
                </div>
                <div>
                  <span className="font-medium">Barba:</span>
                  <p className="text-muted-foreground">{cliente.medidasBarba} cm</p>
                </div>
                <div>
                  <span className="font-medium">Longitud General:</span>
                  <p className="text-muted-foreground">{cliente.medidasLongitudGeneral} cm</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Hábitos y Preferencias */}
            <div className="space-y-4">
              <h4 className="font-medium text-amber-700">Hábitos y Preferencias</h4>
              <div className="grid gap-4 md:grid-cols-2 text-sm">
                <div>
                  <span className="font-medium">Realiza Deporte:</span>
                  <p className="text-muted-foreground">
                    {cliente.realizaDeporte ? 'Si' : 'No'}
                  </p>
                  {cliente.deporteEspecifico && (
                    <p className="text-xs text-muted-foreground">Deporte: {cliente.deporteEspecifico}</p>
                  )}
                </div>
                <div>
                  <span className="font-medium">Tiempo para Peinarse:</span>
                  <p className="text-muted-foreground">{cliente.tiempoPeinarseMin} minutos</p>
                </div>
                <div>
                  <span className="font-medium">Tiempo entre Cortes:</span>
                  <p className="text-muted-foreground">{cliente.tiempoEntreCortesDias} días</p>
                </div>
              </div>
              {cliente.corteReferencia && (
                <div>
                  <span className="font-medium">Corte de Referencia:</span>
                  <p className="text-muted-foreground">
                    {cliente.corteReferencia}
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Preferencias de Estilo */}
            <div className="space-y-4">
              <h4 className="font-medium text-amber-700">Preferencias de Estilo</h4>
              <div className="grid gap-4 md:grid-cols-2 text-sm">
                <div>
                  <span className="font-medium">Longitud Superior:</span>
                  <p className="text-muted-foreground capitalize">{cliente.gustoLongitudSuperior}</p>
                </div>
                <div>
                  <span className="font-medium">Tono Desvanecido:</span>
                  <p className="text-muted-foreground capitalize">{cliente.gustoTonoDesvanecido}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Características Físicas */}
            <div className="space-y-4">
              <h4 className="font-medium text-amber-700">Características Físicas</h4>
              <div className="grid gap-4 md:grid-cols-3 text-sm">
                <div>
                  <span className="font-medium">Tipo de Cráneo:</span>
                  <p className="text-muted-foreground capitalize">{cliente.tipoCraneo}</p>
                </div>
                <div>
                  <span className="font-medium">Tipo de Rostro:</span>
                  <p className="text-muted-foreground capitalize">{cliente.tipoRostro}</p>
                </div>
                <div>
                  <span className="font-medium">Tipo de Perfil:</span>
                  <p className="text-muted-foreground capitalize">{cliente.tipoPerfil}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="font-medium">Desea Disimular Algo:</span>
                  <p className="text-muted-foreground capitalize">{cliente.deseaDisimularAlgoDeSuRostro}</p>
                  {cliente.zonasDisimular && (
                    <p className="text-muted-foreground">
                      Zonas: {cliente.zonasDisimular}
                    </p>
                  )}
                </div>

                <div>
                  <span className="font-medium">Tiene Arrugas/Protuberancias:</span> <p className="text-muted-foreground capitalize">{cliente.tieneArrugasProtuberancias ? 'Si' : 'No'}</p>
                  {cliente.zonasArrugasProtuberancias && (
                    <p className="text-xs text-muted-foreground bg-gray-50 p-2 rounded mt-1">
                      Zonas: {cliente.zonasArrugasProtuberancias}
                    </p>
                  )}
                </div>

                <div>
                  <span className="font-medium">Tiene Plagiocefalia:</span>
                  <p className="text-muted-foreground">
                  {cliente.tienePlagiosefalia ? 'Si' : 'No'}
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Características del Cabello */}
            <div className="space-y-4">
              <h4 className="font-medium text-amber-700">Características del Cabello</h4>
              <div className="grid gap-4 md:grid-cols-2 text-sm">
                <div>
                  <span className="font-medium">Textura:</span>
                  <p className="text-muted-foreground capitalize">{cliente.texturaCabello}</p>
                </div>
                <div>
                  <span className="font-medium">Densidad:</span>
                  <p className="text-muted-foreground capitalize">{cliente.densidadCabello}</p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Recomendaciones Profesionales */}
            <div className="space-y-4">
              <h4 className="font-medium text-amber-700">Recomendaciones Profesionales</h4>
              <div className="space-y-3">
                <div>
                  <span className="font-medium">Corte Correctivo:</span>

                  <p className="text-muted-foreground capitalize">
                    {cliente.corteCorrectivo ? 'Si' : 'No'}
                  </p>
                </div>
                <div>
                  <span className="font-medium">Producto para Mantenimiento:</span>
                  <p className="text-muted-foreground capitalize">
                    {cliente.productoAdecuadoMantenimiento}
                  </p>
                </div>
              </div>
            </div>

            {/* Notas adicionales */}
            {cliente.notas && (
              <>
                <Separator />
                <div className="space-y-2">
                  <h4 className="font-medium">Notas Adicionales</h4>
                  <p className="text-sm text-muted-foreground bg-gray-50 p-3 rounded-lg">{cliente.notas}</p>
                </div>
              </>
            )}
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
              <Image
                src={selectedImage || "/placeholder.svg"}
                alt="Foto ampliada"
                width={600}
                height={600}
                className="rounded-lg object-contain max-h-[70vh]"
              />
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Diálogo de confirmación para eliminar
      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="¿Eliminar cliente?"
        description={`¿Estás seguro de que deseas eliminar al cliente "${cliente.nombreCompleto}"? Esta acción no se puede deshacer y se perderá todo su historial y información detallada.`}
      /> */}
    </>
  )
}
