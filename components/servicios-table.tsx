"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"

const servicios = [
  {
    id: 1,
    nombre: "Corte Clásico",
    descripcion: "Corte tradicional de cabello",
    precio: "$25.00",
    duracion: "30 min",
    categoria: "Cortes",
    estado: "Activo",
  },
  {
    id: 2,
    nombre: "Corte + Barba",
    descripcion: "Corte de cabello y arreglo de barba",
    precio: "$40.00",
    duracion: "45 min",
    categoria: "Combo",
    estado: "Activo",
  },
  {
    id: 3,
    nombre: "Afeitado Clásico",
    descripcion: "Afeitado tradicional con navaja",
    precio: "$20.00",
    duracion: "25 min",
    categoria: "Afeitado",
    estado: "Activo",
  },
  {
    id: 4,
    nombre: "Tratamiento Capilar",
    descripcion: "Tratamiento nutritivo para el cabello",
    precio: "$35.00",
    duracion: "40 min",
    categoria: "Tratamientos",
    estado: "Inactivo",
  },
]

export function ServiciosTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<(typeof servicios)[0] | null>(null)

  const handleDelete = (servicio: (typeof servicios)[0]) => {
    setSelectedService(servicio)
    setDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    console.log("Eliminando servicio:", selectedService?.nombre)
    setDeleteDialogOpen(false)
    setSelectedService(null)
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Lista de Servicios</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Categoría</TableHead>
                <TableHead>Precio</TableHead>
                <TableHead>Duración</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {servicios.map((servicio) => (
                <TableRow key={servicio.id}>
                  <TableCell>
                    <div>
                      <div className="font-medium">{servicio.nombre}</div>
                      <div className="text-sm text-muted-foreground">{servicio.descripcion}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{servicio.categoria}</Badge>
                  </TableCell>
                  <TableCell className="font-medium">{servicio.precio}</TableCell>
                  <TableCell>{servicio.duracion}</TableCell>
                  <TableCell>
                    <Badge
                      variant={servicio.estado === "Activo" ? "default" : "secondary"}
                      className={servicio.estado === "Activo" ? "bg-green-100 text-green-800" : ""}
                    >
                      {servicio.estado}
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
                        <DropdownMenuItem>
                          <Eye className="mr-2 h-4 w-4" />
                          Ver detalles
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(servicio)}>
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
        title="¿Eliminar servicio?"
        description={`¿Estás seguro de que deseas eliminar el servicio "${selectedService?.nombre}"? Esta acción no se puede deshacer.`}
      />
    </>
  )
}
