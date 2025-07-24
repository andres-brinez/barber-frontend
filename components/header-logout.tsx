"use client"

import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { LogoutButton } from "@/components/logout-button"
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog"

export function HeaderLogout() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <LogoutButton />
      
      </AlertDialogTrigger>
      
    </AlertDialog>
  )
}
