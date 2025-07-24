"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { ClienteDetailsDialog } from "@/components/cliente-details-dialog"
import { toast } from "@/hooks/use-toast"

const clientes = [
  {
    id: 1,
    nombreCompleto: "Juan Pérez García",
    email: "juan@email.com",
    telefono: "+1 234 567 8900",
    ultimaVisita: "2024-01-15",
    estado: "Activo",
    edad: 28,
    ocupacion: "Ingeniero",
    estadoCivil: "soltero",
    personalidad: "extrovertido",
    gustosRopa: "formal",
    medidasFrente: 5.0,
    medidasLateral1: 3.0,
    medidasNuca: 2.0,
    medidasLateral2: 3.5,
    medidasBarba: 1.5,
    medidasLongitudGeneral: 8.0,
    realizaDeporte: "si",
    deporteEspecifico: "Fútbol",
    tiempoPeinarseMin: 10,
    tiempoEntreCortesDias: 30,
    corteReferencia: "Corte clásico con desvanecido bajo, manteniendo longitud en la parte superior",
    gustoLongitudSuperior: "medio",
    gustoTonoDesvanecido: "bajo",
    tipoCraneo: "ovalado",
    deseaDisimularAlgoDeSuRostro: "no",
    tieneArrugasProtuberancias: "no",
    tienePlagiocefalia: "no",
    texturaCabello: "liso",
    densidadCabello: "media",
    tipoRostro: "ovalado",
    tipoPerfil: "recto",
    corteCorrectivo: "Mantener proporciones actuales, ajustar solo los laterales para equilibrar el rostro",
    productoAdecuadoMantenimiento: "Pomada de fijación media, aplicar en cabello húmedo y peinar hacia atrás",
    direccion: "Calle Principal 123, Ciudad",
    fotos: [
      "/placeholder.svg?height=200&width=200&text=Frente",
      "/placeholder.svg?height=200&width=200&text=Perfil",
      "/placeholder.svg?height=200&width=200&text=Lateral",
      "/placeholder.svg?height=200&width=200&text=Nuca",
    ],
    notas: "Cliente regular, muy puntual. Prefiere cortes conservadores pero está abierto a sugerencias.",
  },
  {
    id: 2,
    nombreCompleto: "María García López",
    email: "maria@email.com",
    telefono: "+1 234 567 8901",
    ultimaVisita: "2024-01-10",
    estado: "Activo",
    edad: 32,
    ocupacion: "Diseñadora",
    estadoCivil: "casado",
    personalidad: "aventurero",
    gustosRopa: "moderno",
    medidasFrente: 4.5,
    medidasLateral1: 2.5,
    medidasNuca: 1.5,
    medidasLateral2: 3.0,
    medidasBarba: 0,
    medidasLongitudGeneral: 12.0,
    realizaDeporte: "si",
    deporteEspecifico: "Yoga",
    tiempoPeinarseMin: 15,
    tiempoEntreCortesDias: 45,
    corteReferencia: "Corte en capas con flequillo lateral, estilo moderno y versátil",
    gustoLongitudSuperior: "largo",
    gustoTonoDesvanecido: "sin-desvanecido",
    tipoCraneo: "redondo",
    deseaDisimularAlgoDeSuRostro: "si",
    zonasDisimular: "Frente amplia",
    tieneArrugasProtuberancias: "no",
    tienePlagiocefalia: "no",
    texturaCabello: "ondulado",
    densidadCabello: "alta",
    tipoRostro: "redondo",
    tipoPerfil: "convexo",
    corteCorrectivo: "Flequillo lateral para disimular frente amplia, capas para dar movimiento",
    productoAdecuadoMantenimiento: "Mousse para cabello rizado, aplicar en cabello húmedo y difuminar",
    direccion: "Avenida Central 456, Ciudad",
    fotos: ["/placeholder.svg?height=200&width=200&text=Frente", "/placeholder.svg?height=200&width=200&text=Perfil"],
    notas: "Le gusta experimentar con estilos nuevos. Muy cuidadosa con el mantenimiento.",
  },
  {
    id: 3,
    nombreCompleto: "Carlos López Martínez",
    email: "carlos@email.com",
    telefono: "+1 234 567 8902",
    ultimaVisita: "2023-12-20",
    estado: "Inactivo",
    edad: 45,
    ocupacion: "Contador",
    estadoCivil: "divorciado",
    personalidad: "conservador",
    gustosRopa: "clasico",
    medidasFrente: 3.0,
    medidasLateral1: 1.5,
    medidasNuca: 1.0,
    medidasLateral2: 2.0,
    medidasBarba: 2.0,
    medidasLongitudGeneral: 4.0,
    realizaDeporte: "no",
    tiempoPeinarseMin: 5,
    tiempoEntreCortesDias: 21,
    corteReferencia: "Corte ejecutivo, muy corto y prolijo",
    gustoLongitudSuperior: "muy-corto",
    gustoTonoDesvanecido: "alto",
    tipoCraneo: "cuadrado",
    deseaDisimularAlgoDeSuRostro: "si",
    zonasDisimular: "Entradas pronunciadas",
    tieneArrugasProtuberancias: "si",
    zonasArrugasProtuberancias: "Frente con arrugas de expresión",
    tienePlagiocefalia: "no",
    texturaCabello: "liso",
    densidadCabello: "baja",
    tipoRostro: "cuadrado",
    tipoPerfil: "recto",
    corteCorrectivo: "Corte muy corto para disimular calvicie incipiente, barba bien definida",
    productoAdecuadoMantenimiento: "Gel de fijación fuerte, aplicar en cabello seco",
    direccion: "Plaza Mayor 789, Ciudad",
    fotos: [
      "/placeholder.svg?height=200&width=200&text=Frente",
      "/placeholder.svg?height=200&width=200&text=Lateral",
      "/placeholder.svg?height=200&width=200&text=Barba",
    ],
    notas: "Cliente ocasional. Prefiere cortes muy conservadores y rápidos.",
  },
]

export function ClientesTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [selectedCliente, setSelectedCliente] = useState<(typeof clientes)[0] | null>(null)

  const handleDelete = (cliente: (typeof clientes)[0]) => {
    setSelectedCliente(cliente)
    setDeleteDialogOpen(true)
  }

  const handleViewDetails = (cliente: (typeof clientes)[0]) => {
    setSelectedCliente(cliente)
    setDetailsDialogOpen(true)
  }

  const handleEdit = (cliente: (typeof clientes)[0]) => {
    toast({
      title: "Función en desarrollo",
      description: `Editando cliente: ${cliente.nombreCompleto}`,
    })
  }

  const confirmDelete = () => {
    if (selectedCliente) {
      toast({
        title: "Cliente eliminado",
        description: `El cliente ${selectedCliente.nombreCompleto} ha sido eliminado exitosamente.`,
        variant: "destructive",
      })
    }
    setDeleteDialogOpen(false)
    setSelectedCliente(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Clientes</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Teléfono</TableHead>
                <TableHead>Última Visita</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell className="font-medium">{cliente.nombreCompleto}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.telefono}</TableCell>
                  <TableCell>{cliente.ultimaVisita}</TableCell>
                  <TableCell>
                    <Badge
                      variant={cliente.estado === "Activo" ? "default" : "secondary"}
                      className={cliente.estado === "Activo" ? "bg-green-100 text-green-800" : ""}
                    >
                      {cliente.estado}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(cliente)}>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(cliente)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(cliente)}>
                          <Trash2 className="mr-2 h-4 w-4" />
                          Eliminar
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <DeleteConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={confirmDelete}
        title="¿Eliminar cliente?"
        description={`¿Estás seguro de que deseas eliminar al cliente "${selectedCliente?.nombreCompleto}"? Esta acción no se puede deshacer y se perderá todo su historial y información detallada.`}
      />

      <ClienteDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        cliente={selectedCliente}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </>
  )
}
