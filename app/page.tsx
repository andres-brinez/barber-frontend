"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { use, useState } from "react"
import axios from 'axios';

export default function LoginPages() {

  // Estados para almacenar el valor de los campos del formulario
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // Estado para manejar mensajes de error o éxito
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);

  // navigate

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Datos que se enviarán al backend
    const loginData = {
      email: email, // O 'username' si tu backend lo espera así
      password: password
    };

    try {
      // Realiza la petición POST a tu endpoint de login en Spring Boot
      // ASUME: Tu backend tiene un endpoint de login en http://localhost:8080/api/auth/login
      // Ajusta la URL si tu endpoint es diferente
      const response = await axios.post('http://localhost:8080/api/auth/login', loginData);

//      console.log('Login exitoso:', response.data);
      // redireccionando a dashboard con la url
      setIsError(false);
      setMessage('Inicio de sesión exitoso. Redirigiendo...');
      window.location.href = '/dashboard';


      // Aquí puedes redirigir al usuario a otra página,
      // guardar el token JWT (si lo devuelve el backend) en localStorage/sessionStorage, etc.
      // Ejemplo: localStorage.setItem('jwtToken', response.data.token);
      // window.location.href = '/dashboard'; // Redirigir

    } catch (error) {
      // Si hay un error en la petición (ej. credenciales incorrectas, error de red)
      setIsError(true);
      setMessage('Error al iniciar sesión. Por favor, verifica tus credenciales.');
      console.error('Error al iniciar sesión:', error);
    }
  }

 

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-2">
      {/* Lado izquierdo - Imagen */}
      <div className="relative hidden lg:block">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Interior de barbería moderna"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Lado derecho - Formulario */}
      <div className="flex items-center justify-center p-8 lg:p-12">
        <div className="mx-auto w-full max-w-md space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">              BarberShop Ibagué
            </h1>
            <h2 className="text-2xl font-semibold text-foreground">Iniciar sesión</h2>
            <p className="text-muted-foreground">Accede a tu panel de administración</p>
          </div>

          {/* Formulario */}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  Correo electrónico
                </Label>
                <Input id="email" type="email" placeholder="tu@email.com" className="h-11" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Contraseña
                </Label>
                <Input id="password" type="password" placeholder="••••••••" className="h-11" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
            </div>


            <div className="text-right">
              <Link href="/forgot-password" className="text-sm text-amber-600 hover:text-amber-700 hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>

            <div>
              {/* formulario */}
              {isError && (
                <p className="text-sm text-red-700 italic mt-2">
                  {message}
                </p>
              )}
            </div>

            {!isError && message && (
              <p className="text-sm text-green-700 italic mt-2">
                {message}
              </p>
            )}

            <div className="space-y-4">

              <Button type="submit" className="w-full h-11 bg-amber-600 hover:bg-amber-700">
                Iniciar sesión
              </Button>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">O continúa con</span>
                </div>
              </div>

              <Button variant="outline" className="w-full h-11 border-2 hover:bg-gray-50 bg-transparent" type="button">
                <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Iniciar con Google
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
