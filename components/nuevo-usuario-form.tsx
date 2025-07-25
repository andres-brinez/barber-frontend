"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X } from "lucide-react"

export function NuevoUsuarioForm() {
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([])
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)

  const [correo, setCorreo] = useState('');
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [rol, setRol] = useState('');
  const [telefono, setTelefono] = useState('');
  const [direccion, setDireccion] = useState('');
  const [estaActivo, setEstaActivo] = useState(true);


  const permissions = [
    "Gestionar clientes",
    "Gestionar usuarios",
    "Ver agenda",
    "Modificar agenda",
    "Gestionar servicios",
    "Ver reportes",
    "Configuración del sistema",
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usuario = {
      correo,
      nombreCompleto,
      contrasena: contrasena,
      rol,
      telefono,
      direccion,
      estaActivo,
    };

    try {
      const response = await fetch('http://localhost:8080/api/usuarios', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        console.log('Usuario creado con éxito');
        alert('Usuario creado con éxito');
        window.location.href = '/dashboard/usuarios'; // Redirigir a la lista de usuarios

      } else {
        alert('Error al crear el usuario. Por favor, inténtalo de nuevo.');
        console.error( response  );
      }
    } catch (error) {
      alert('Error al crear el usuario. Por favor, inténtalo de nuevo.');
      console.error('Error al crear usuario:', error);
    }
  };

  const handlePermissionChange = (permission: string, checked: boolean) => {
    if (checked) {
      setSelectedPermissions([...selectedPermissions, permission])
    } else {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== permission))
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-2xl">
      <Card>
        <CardHeader>
          <CardTitle>Información del Usuario</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Información Personal */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="nombre">Nombre completo *</Label>
                <Input id="nombre" placeholder="Ingresa el nombre completo" required  value={nombreCompleto} onChange={(e) => setNombreCompleto(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Correo electrónico *</Label>
                <Input id="email" type="email" placeholder="usuario@barbershop.com" required value={correo} onChange={(e) => setCorreo(e.target.value)} />
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="telefono">TeléfonoS</Label>
                <Input id="telefono" placeholder="+1 234 567 8900"  value={telefono} onChange={(e) => setTelefono(e.target.value)} />
              </div>

              <div className="space-y-2">
                <Label>Rol del usuario *</Label>
                <Select value={rol} onValueChange={setRol}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el rol"  />
                  </SelectTrigger>
                  <SelectContent >
                    <SelectItem value="ADMIN">Administrador</SelectItem>
                    <SelectItem value="BARBERO">Barbero</SelectItem>
                    {/* <SelectItem value="recepcionista">Recepcionista</SelectItem> */}
                    {/* <SelectItem value="gerente">Gerente</SelectItem> */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Credenciales */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña *</Label>
                <Input id="password" type="password" placeholder="••••••••" required value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
              </div>

             {/* TODO : Implementar confirmacion de contrasena */}
              {/* <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar contraseña *</Label>
                <Input id="confirm-password" type="password" placeholder="••••••••" required  value={contrasena} onChange={(e) => setContrasena(e.target.value)} />
              </div> */}
            </div>

            {/* Estado */}
            <div className="space-y-2">
              <Label>Estado del usuario</Label>
              <Select defaultValue="activo" value={estaActivo ? "true" : "false"} onValueChange={(value) => setEstaActivo(value === "true")}>
                <SelectTrigger>
                  {estaActivo ? "Activo" : "Inactivo"}
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="activo">Activo</SelectItem>
                  <SelectItem value="inactivo">Inactivo</SelectItem>
                  {/* <SelectItem value="suspendido">Suspendido</SelectItem> */}
                </SelectContent>
              </Select>
            </div>

            {/* Permisos */}
            <div className="space-y-3">
              <Label>Permisos del usuario (selección múltiple)</Label>
              <div className="grid gap-3 md:grid-cols-2">
                {permissions.map((permission) => (
                  <div key={permission} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission}
                      checked={selectedPermissions.includes(permission)}
                      onCheckedChange={(checked) => handlePermissionChange(permission, checked as boolean)}
                    />
                    <Label htmlFor={permission} className="text-sm font-normal">
                      {permission}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Foto de Perfil */}
            <div className="space-y-3">
              <Label>Foto de perfil</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {uploadedImage ? (
                  <div className="relative">
                    <img
                      src={uploadedImage || "/placeholder.svg"}
                      alt="Perfil"
                      className="w-32 h-32 object-cover rounded-full mx-auto"
                    />
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                      onClick={() => setUploadedImage(null)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Label htmlFor="foto-perfil" className="cursor-pointer">
                        <span className="mt-2 block text-sm font-medium text-gray-900">
                          Haz clic para subir una foto
                        </span>
                        <span className="mt-1 block text-xs text-gray-500">PNG, JPG hasta 5MB</span>
                      </Label>
                      <Input
                        id="foto-perfil"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-4">
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                Crear Usuario
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
