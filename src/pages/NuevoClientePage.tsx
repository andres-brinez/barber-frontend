"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { NuevoClienteForm } from "@/components/nuevo-cliente-form"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function NuevoClientePage() {
  const navigate = useNavigate()

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" onClick={() => navigate("/dashboard/clientes")}>
            <ArrowLeft className="h-4 w-4" />
            Volver
          </Button>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Nuevo Cliente</h1>
            <p className="text-muted-foreground">Agrega un nuevo cliente a tu base de datos</p>
          </div>
        </div>

        <NuevoClienteForm />
      </div>
    </DashboardLayout>
  )
}
