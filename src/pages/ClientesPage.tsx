"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { ClientesTable } from "@/components/clientes-table"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ClientesPage() {
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Clientes</h1>
            <p className="text-muted-foreground">Gestiona la información de tus clientes</p>
          </div>
          <Button onClick={() => navigate("/dashboard/clientes/nuevo")} className="bg-amber-600 hover:bg-amber-700">
            <Plus className="mr-2 h-4 w-4" />
            Agregar Cliente
          </Button>
        </div>

        <ClientesTable />
      </div>
    </DashboardLayout>
  )
}
