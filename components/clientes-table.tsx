"use client"

import { useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MoreHorizontal, Edit, Trash2, Eye } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog"
import { ClienteDetailsDialog } from "@/components/cliente-details-dialog"
import { toast } from "@/hooks/use-toast"



export function ClientesTable() {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false)
  const [idSelect, setIdSelet] = useState(null);

  const [selectedCliente, setSelectedCliente] = useState<(typeof perfilesCliente)[0] | null>(null)

  const [perfilesCliente, setPerfilesCliente] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const fetchPerfilesCliente = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/perfiles-cliente');
        const data = await response.json();
        const perfilesClienteSimplificados = data.map((perfil) => ({
          id: perfil.id,
          nombre: perfil.nombreCompleto,
          edad: perfil.edad,
          ocupacion: perfil.ocupacion,
          ultimaVisita: perfil.ultimaVisita,
        }));
        setPerfilesCliente(perfilesClienteSimplificados);
        setCargando(false);
      } catch (error) {
        console.error(error);
        setCargando(false);
      }
    };
    fetchPerfilesCliente();
  }, []);



  const handleViewDetails = (id: number) => {
    // Aquí puedes implementar la lógica para editar el cliente
    setIdSelet(id); // Guarda el ID del cliente a editar
    setDetailsDialogOpen(true); // Abre el diálogo de detalles
    // Por ejemplo, redirigir a una página de edición o abrir un formulario de edición
  }

  const handleDelete = (id: number) => {
    console.log("Intentando eliminar cliente con ID:", id); // Puedes dejar un console.log para ver el ID
    setIdSelet(id); // Guarda el ID del cliente a eliminar
    setDeleteDialogOpen(true); // Abre el diálogo de confirmación
  }



  const confirmDelete = () => {

    // Peticion a http://localhost:8080/api/perfiles-cliente/id para eliminar el cliente
    fetch(`http://localhost:8080/api/perfiles-cliente/${idSelect}`, {
      method: 'DELETE',
    })
      .then(() => {
        // Mostrar confirmDelete
        alert(`Cliente eliminado.`); // Muestra un alert de confirmación
        setIdSelet(null); // Resetea el ID a eliminar
        // toast({
        //   title: "Cliente eliminado",
        //   description: "El cliente ha sido eliminado exitosamente.",
        //   variant: "destructive",
        // });
        setPerfilesCliente(perfilesCliente.filter(cliente => cliente.id !== idSelect));

      })
      .catch((error) => {
        console.error(error);
      });
  };



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
              {/* <TableHead>Email</TableHead> */}
              {/* <TableHead>Teléfono</TableHead> */}
              <TableHead>Edad</TableHead>
              <TableHead>Ocupación</TableHead>
              <TableHead>Última Visita</TableHead>
              {/* <TableHead>Estado</TableHead> */}
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {perfilesCliente.map((perfil) => (
              <TableRow key={perfil.id}>
                <TableCell className="font-medium">{perfil.nombre}</TableCell>
                <TableCell>{perfil.edad}</TableCell>
                <TableCell>{perfil.ocupacion}</TableCell>
                <TableCell>{"03-02-2023"}</TableCell>
                {/* <TableCell>
                    <Badge
                      variant={cliente.estado === "Activo" ? "default" : "secondary"}
                      className={cliente.estado === "Activo" ? "bg-green-100 text-green-800" : ""}
                    >
                      {cliente.estado}
                    </Badge>
                  </TableCell> */}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleViewDetails(perfil.id)}>
                        <Eye className="mr-2 h-4 w-4" />
                        Ver detalles
                      </DropdownMenuItem>
                      
                      <DropdownMenuItem /* onClick={() => handleEdit(perfil.id)} */>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </DropdownMenuItem>
                      {/* Pasar solo el ID a handleDelete, que ahora solo muestra el alert */}
                      <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(perfil.id)}>
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
        {cargando && (
          <div className="text-center mt-4">
            <span>Cargando datos...</span>
            <div className="border-4 border-gray-300 border-t-blue-500 rounded-full w-8 h-8 animate-spin"></div>
          </div>
        )}
      </CardContent>
    </Card>

    <DeleteConfirmDialog
      open={deleteDialogOpen}
      onOpenChange={setDeleteDialogOpen}
      onConfirm={confirmDelete}
      title="¿Eliminar cliente?"
      description={`¿Estás seguro de que deseas eliminar al cliente? Esta acción no se puede deshacer y se perderá todo su historial y información detallada.`}
    />


    <ClienteDetailsDialog
        open={detailsDialogOpen}
        onOpenChange={setDetailsDialogOpen}
        idCliente={idSelect}
        // onEdit={handleEdit}
        //onDelete={handleDelete}
      />

  </>
)}
