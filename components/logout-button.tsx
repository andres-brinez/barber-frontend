"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { LogOut } from "lucide-react"

export function LogoutButton() {
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setIsLoggingOut(true)

    // Simular proceso de logout
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Aquí puedes agregar la lógica real de logout
    // Por ejemplo: await signOut() si usas NextAuth
    // O limpiar tokens, cookies, etc.

    // Redirigir al login
    router.push("/")
    setIsLoggingOut(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex items-center w-full cursor-pointer">
          <LogOut className="mr-2 h-4 w-4" />
          <span>Salir</span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
          <AlertDialogDescription>
            Estás a punto de cerrar tu sesión. Tendrás que iniciar sesión nuevamente para acceder al sistema.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout} disabled={isLoggingOut} className="bg-red-600 hover:bg-red-700">
            {isLoggingOut ? "Cerrando sesión..." : "Cerrar Sesión"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
