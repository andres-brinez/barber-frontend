"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { LogoutButton } from "@/components/logout-button"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export function HeaderLogout() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-600">
          <LogOut className="h-4 w-4 mr-2" />
          Salir
        </Button>
      </AlertDialogTrigger>
      <LogoutButton />
    </AlertDialog>
  )
}
