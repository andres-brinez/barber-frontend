import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { Toaster } from "@/components/ui/toaster"
import LoginPage from "./pages/LoginPage"
import DashboardPage from "./pages/DashboardPage"
import ClientesPage from "./pages/ClientesPage"
import NuevoClientePage from "./pages/NuevoClientePage"
import UsuariosPage from "./pages/UsuariosPage"
import NuevoUsuarioPage from "./pages/NuevoUsuarioPage"
import ServiciosPage from "./pages/ServiciosPage"
import NuevoServicioPage from "./pages/NuevoServicioPage"
import ConfiguracionPage from "./pages/ConfiguracionPage"
import AgendaPage from "./pages/AgendaPage"
import AgendaCompletaPage from "./pages/AgendaCompletaPage"
import "./App.css"
import LoginPages from "@/app/page"

function App() {
  
  return (
    <Router>
      <div className="App">
        <Routes>
          
          <Route path="/prieba" element={<LoginPage />} />
          <Route path="/" element={<LoginPages />} />
        
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/clientes" element={<ClientesPage />} />
          <Route path="/dashboard/clientes/nuevo" element={<NuevoClientePage />} />
          <Route path="/dashboard/usuarios" element={<UsuariosPage />} />
          <Route path="/dashboard/usuarios/nuevo" element={<NuevoUsuarioPage />} />
          <Route path="/dashboard/servicios" element={<ServiciosPage />} />
          <Route path="/dashboard/servicios/nuevo" element={<NuevoServicioPage />} />
          <Route path="/dashboard/configuracion" element={<ConfiguracionPage />} />
          <Route path="/dashboard/agenda" element={<AgendaPage />} />
          <Route path="/dashboard/agenda/completa" element={<AgendaCompletaPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
        <Toaster />
      </div>
    </Router>
  )
}

export default App
