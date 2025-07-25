"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Upload, X, Plus } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import axios from "axios"

export function NuevoClienteForm() {
  const [uploadedImages, setUploadedImages] = useState<File[]>([])
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [edad, setEdad] = useState('');
  const [ocupacion, setOcupacion] = useState('');
  const [estadoCivil, setEstadoCivil] = useState('');
  const [personalidad, setPersonalidad] = useState('');
  const [gustosRopa, setGustosRopa] = useState('');
  const [medidasFrente, setMedidasFrente] = useState('');
  const [medidasLateral1, setMedidasLateral1] = useState('');
  const [medidasNuca, setMedidasNuca] = useState('');
  const [medidasLateral2, setMedidasLateral2] = useState('');
  const [medidasBarba, setMedidasBarba] = useState('');
  const [medidasLongitudGeneral, setMedidasLongitudGeneral] = useState('');
  const [realizaDeporte, setRealizaDeporte] = useState(false);
  const [deporteEspecifico, setDeporteEspecifico] = useState('');
  const [tiempoPeinarseMin, setTiempoPeinarseMin] = useState('');
  const [tiempoEntreCortesDias, setTiempoEntreCortesDias] = useState('');
  const [corteReferencia, setCorteReferencia] = useState('');
  const [gustoLongitudSuperior, setGustoLongitudSuperior] = useState('');
  const [gustoTonoDesvanecido, setGustoTonoDesvanecido] = useState('');
  const [tipoCraneo, setTipoCraneo] = useState('');
  const [deseaDisimularAlgoDeSuRostro, setDeseaDisimularAlgoDeSuRostro] = useState(false);
  const [zonasDisimular, setZonasDisimular] = useState('');
  const [tieneArrugasProtuberancias, setTieneArrugasProtuberancias] = useState(false);
  const [zonasArrugasProtuberancias, setZonasArrugasProtuberancias] = useState('');
  const [tienePlagiosefalia, setTienePlagiosefalia] = useState(false);
  const [texturaCabello, setTexturaCabello] = useState('');
  const [densidadCabello, setDensidadCabello] = useState('');
  const [tipoRostro, setTipoRostro] = useState('');
  const [tipoPerfil, setTipoPerfil] = useState('');
  const [corteCorrectivo, setCorteCorrectivo] = useState(false);
  const [productoAdecuadoMantenimiento, setProductoAdecuadoMantenimiento] = useState('');

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        setUploadedImages((prev) => [...prev, file])
      })
    }
  }

  const removeImage = (index: number) => {
    setUploadedImages((prev) => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Crear el objeto perfilCliente
    const perfilCliente = {
      nombreCompleto,
      edad,
      ocupacion,
      estadoCivil,
      personalidad,
      gustosRopa,
      medidasFrente,
      medidasLateral1,
      medidasNuca,
      medidasLateral2,
      medidasBarba,
      medidasLongitudGeneral,
      realizaDeporte,
      deporteEspecifico,
      tiempoPeinarseMin,
      tiempoEntreCortesDias,
      corteReferencia,
      gustoLongitudSuperior,
      gustoTonoDesvanecido,
      tipoCraneo,
      deseaDisimularAlgoDeSuRostro,
      zonasDisimular,
      tieneArrugasProtuberancias,
      zonasArrugasProtuberancias,
      tienePlagiosefalia,
      texturaCabello,
      densidadCabello,
      tipoRostro,
      tipoPerfil,
      corteCorrectivo,
      productoAdecuadoMantenimiento,
    };

    // // Verificar que la imagen sea un archivo válido
    // if (imagenFiles && !imagenFiles.type.startsWith('image/')) {
    //   alert('Por favor, seleccione un archivo de imagen válido');
    //   return;
    // }

    const formData = new FormData();
    // Agregar los datos del perfil al FormData
    formData.append('perfilCliente', JSON.stringify(perfilCliente));
    // Iterar sobre la lista uploadedImages para añadir cada archivo al FormData
    if (uploadedImages.length > 0) {
      console.log("Imágenes a subir:", uploadedImages);
      uploadedImages.forEach((image, index) => {
        // Asegúrate de que el nombre del campo coincida con lo que espera tu backend
        // Si tu backend espera una lista de archivos bajo un mismo nombre, usa el mismo nombre de campo
        formData.append(`imageFiles`, image); // 'imagenFiles' como un array en el backend
      });
    } else {
      console.log("No hay imágenes seleccionadas para subir.");
    }
    console.log('Enviando perfilCliente:', formData);
    console.log(formData.getAll('perfilCliente')); // devuelve un array con los datos
    console.log(formData.getAll('imagenFiles')); // devuelve un array con los archivos de imagen


    // Enviar la solicitud POST a la API
    try {
      const response = await axios.post('http://localhost:8080/api/perfiles-cliente', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Verificar si la respuesta es exitosa
      if (response.status === 201) {
        alert('Perfil creado con éxito');
        // redirecciona a dashboaientes
        window.location.href = '/dashboard/clientes';

      } else {
        alert('Error al crear el perfil');
        console.error(response);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      alert('Error al enviar la solicitud');
    }
  };

  return (
    <div className="max-w-4xl">
      <Card>
        <CardHeader>
          <CardTitle>Información Completa del Cliente</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          <form className="space-y-8" onSubmit={handleSubmit}>
            {/* Información Personal Básica */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Información Personal</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="nombreCompleto">Nombre completo *</Label>
                  <Input id="nombreCompleto" placeholder="Ingresa el nombre completo" value={nombreCompleto} onChange={(event) => setNombreCompleto(event.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edad">Edad *</Label>
                  <Input id="edad" type="number" placeholder="25" value={edad} onChange={(e) => setEdad(e.target.value)} required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="ocupacion">Ocupación</Label>
                  <Input id="ocupacion" placeholder="Ej: Ingeniero, Estudiante, etc." value={ocupacion} onChange={(e) => setOcupacion(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label>Estado Civil</Label>
                  <Select value={estadoCivil} onValueChange={setEstadoCivil}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona estado civil" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="soltero">Soltero/a</SelectItem>
                      <SelectItem value="casado">Casado/a</SelectItem>
                      <SelectItem value="divorciado">Divorciado/a</SelectItem>
                      <SelectItem value="viudo">Viudo/a</SelectItem>
                      <SelectItem value="union-libre">Unión libre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Personalidad</Label>
                  <Select value={personalidad} onValueChange={setPersonalidad}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona personalidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="extrovertido">Extrovertido</SelectItem>
                      <SelectItem value="introvertido">Introvertido</SelectItem>
                      <SelectItem value="conservador">Conservador</SelectItem>
                      <SelectItem value="aventurero">Aventurero</SelectItem>
                      <SelectItem value="clasico">Clásico</SelectItem>
                      <SelectItem value="moderno">Moderno</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Gustos en Ropa</Label>
                  <Select value={gustosRopa} onValueChange={setGustosRopa}>
                    <SelectTrigger>
                      <SelectValue placeholder="Estilo de vestir" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="formal">Formal</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                      <SelectItem value="deportivo">Deportivo</SelectItem>
                      <SelectItem value="elegante">Elegante</SelectItem>
                      <SelectItem value="urbano">Urbano</SelectItem>
                      <SelectItem value="clasico">Clásico</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Medidas del Cabello */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Medidas del Cabello (cm)</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="medidasFrente">Medidas Frente</Label>
                  <Input id="medidasFrente" type="string" step="0.1" placeholder="5.0" value={medidasFrente} onChange={(event) => setMedidasFrente((event.target.value))} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medidasLateral1">Medidas Lateral 1</Label>
                  <Input id="medidasLateral1" type="string" step="0.1" placeholder="3.0" value={medidasLateral1} onChange={(event) => setMedidasLateral1((event.target.value))} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medidasNuca">Medidas Nuca</Label>
                  <Input id="medidasNuca" type="string" step="0.1" placeholder="2.0" value={medidasNuca} onChange={(event) => setMedidasNuca((event.target.value))} required />
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="medidasLateral2">Medidas Lateral 2</Label>
                  <Input id="medidasLateral2" type="string" step="0.1" placeholder="3.5" value={medidasLateral2} onChange={(event) => setMedidasLateral2((event.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medidasBarba">Medidas Barba</Label>
                  <Input id="medidasBarba" type="string" step="0.1" placeholder="1.5" value={medidasBarba} onChange={(event) => setMedidasBarba((event.target.value))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="medidasLongitudGeneral">Longitud General</Label>
                  <Input id="medidasLongitudGeneral" type="string" step="0.1" placeholder="8.0" value={medidasLongitudGeneral} onChange={(event) => setMedidasLongitudGeneral((event.target.value))} />
                </div>
              </div>
            </div>

            <Separator />

            {/* Hábitos y Preferencias */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Hábitos y Preferencias</h3>

              <div className="space-y-3">
                <Label>¿Realiza deporte?</Label>
                <RadioGroup value={realizaDeporte} onValueChange={(value) => setRealizaDeporte(value === 'si' ? true : false)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="deporte-si" checked={realizaDeporte === true} />
                    <Label htmlFor="deporte-si">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="deporte-no" checked={realizaDeporte === false} />
                    <Label htmlFor="deporte-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              {realizaDeporte === true && (
                <div className="space-y-2">
                  <Label htmlFor="deporteEspecifico">¿Qué deporte específico?</Label>
                  <Input id="deporteEspecifico" placeholder="Ej: Fútbol, Natación, Gimnasio..." value={deporteEspecifico} onChange={(event) => setDeporteEspecifico((event.target.value))} required />
                </div>
              )}

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="tiempoPeinarseMin">Tiempo para peinarse (minutos)</Label>
                  <Input id="tiempoPeinarseMin" max="30" type="number" placeholder="10" value={tiempoPeinarseMin} onChange={(event) => setTiempoPeinarseMin((event.target.value))} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="tiempoEntreCortesDias">Tiempo entre cortes (días)</Label>
                  <Input id="tiempoEntreCortesDias" min="7" type="number" placeholder="30" value={tiempoEntreCortesDias} onChange={(event) => setTiempoEntreCortesDias((event.target.value))} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="corteReferencia">Corte de referencia</Label>
                <Textarea
                  id="corteReferencia"
                  placeholder="Describe el corte que prefiere o menciona referencias..."
                  className="min-h-[60px]"
                  value={corteReferencia}
                  onChange={(event) => setCorteReferencia((event.target.value))}
                  required
                />
              </div>
            </div>

            <Separator />

            {/* Preferencias de Estilo */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Preferencias de Estilo</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Gusto longitud superior</Label>
                  <Select value={gustoLongitudSuperior} onValueChange={setGustoLongitudSuperior}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona longitud" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="muy-corto">Muy corto</SelectItem>
                      <SelectItem value="corto">Corto</SelectItem>
                      <SelectItem value="medio">Medio</SelectItem>
                      <SelectItem value="largo">Largo</SelectItem>
                      <SelectItem value="muy-largo">Muy largo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Gusto tono desvanecido</Label>
                  <Select value={gustoTonoDesvanecido} onValueChange={setGustoTonoDesvanecido}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tono" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="alto">Alto</SelectItem>
                      <SelectItem value="medio">Medio</SelectItem>
                      <SelectItem value="bajo">Bajo</SelectItem>
                      <SelectItem value="sin-desvanecido">Sin desvanecido</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Características Físicas */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Características Físicas</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Tipo de cráneo</Label>
                  <Select value={tipoCraneo} onValueChange={setTipoCraneo}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="redondo">Redondo</SelectItem>
                      <SelectItem value="ovalado">Ovalado</SelectItem>
                      <SelectItem value="cuadrado">Cuadrado</SelectItem>
                      <SelectItem value="triangular">Triangular</SelectItem>
                      <SelectItem value="alargado">Alargado</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Tipo de rostro</Label>
                  <Select value={tipoRostro} onValueChange={setTipoRostro}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="redondo">Redondo</SelectItem>
                      <SelectItem value="ovalado">Ovalado</SelectItem>
                      <SelectItem value="cuadrado">Cuadrado</SelectItem>
                      <SelectItem value="triangular">Triangular</SelectItem>
                      <SelectItem value="corazon">Corazón</SelectItem>
                      <SelectItem value="diamante">Diamante</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Tipo de perfil</Label>
                <Select value={tipoPerfil} onValueChange={setTipoPerfil}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona perfil" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recto">Recto</SelectItem>
                    <SelectItem value="convexo">Convexo</SelectItem>
                    <SelectItem value="concavo">Cóncavo</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Preguntas Sí/No */}
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label>¿Desea disimular algo de su rostro?</Label>
                  <RadioGroup value={deseaDisimularAlgoDeSuRostro} onValueChange={(value) => setDeseaDisimularAlgoDeSuRostro(value === 'si' ? true : false)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="disimular-si" checked={deseaDisimularAlgoDeSuRostro} />
                      <Label htmlFor="disimular-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="disimular-no" checked={!deseaDisimularAlgoDeSuRostro} />
                      <Label htmlFor="disimular-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {deseaDisimularAlgoDeSuRostro === true && (
                  <div className="space-y-2">
                    <Label htmlFor="zonasDisimular">¿Qué zonas desea disimular?</Label>
                    <Textarea
                      id="zonasDisimular"
                      placeholder="Describe las zonas que desea disimular..."
                      className="min-h-[60px]"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <Label>¿Tiene arrugas o protuberancias?</Label>
                  <RadioGroup value={tieneArrugasProtuberancias} onValueChange={(value) => setTieneArrugasProtuberancias(value === 'si' ? true : false)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="arrugas-si" checked={tieneArrugasProtuberancias} />
                      <Label htmlFor="arrugas-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="arrugas-no" checked={!tieneArrugasProtuberancias} />
                      <Label htmlFor="arrugas-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>

                {tieneArrugasProtuberancias === true && (
                  <div className="space-y-2">
                    <Label htmlFor="zonasArrugasProtuberancias">¿En qué zonas?</Label>
                    <Textarea
                      id="zonasArrugasProtuberancias"
                      placeholder="Describe las zonas con arrugas o protuberancias..."
                      className="min-h-[60px]"
                    />
                  </div>
                )}

                <div className="space-y-3">
                  <Label>¿Tiene plagiocefalia?</Label>
                  <RadioGroup value={tienePlagiosefalia} onValueChange={(value) => setTienePlagiosefalia(value === 'si' ? true : false)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="si" id="plagiocefalia-si" checked={tienePlagiosefalia} />
                      <Label htmlFor="plagiocefalia-si">Sí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="no" id="plagiocefalia-no" checked={!tienePlagiosefalia} />
                      <Label htmlFor="plagiocefalia-no">No</Label>
                    </div>
                  </RadioGroup>
                </div>
              </div>
            </div>

            <Separator />

            {/* Características del Cabello */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Características del Cabello</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Textura del cabello</Label>
                  <Select value={texturaCabello} onValueChange={setTexturaCabello}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona textura" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="liso">Liso</SelectItem>
                      <SelectItem value="ondulado">Ondulado</SelectItem>
                      <SelectItem value="rizado">Rizado</SelectItem>
                      <SelectItem value="crespo">Crespo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Densidad del cabello</Label>
                  <Select value={densidadCabello} onValueChange={setDensidadCabello}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona densidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="baja">Baja</SelectItem>
                      <SelectItem value="media">Media</SelectItem>
                      <SelectItem value="alta">Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <Separator />

            {/* Recomendaciones Profesionales */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Recomendaciones Profesionales</h3>

              <div className="space-y-2">
                <Label htmlFor="corteCorrectivo">Corte correctivo </Label>
                <RadioGroup value={corteCorrectivo} onValueChange={(value) => setCorteCorrectivo(value === 'si' ? true : false)}>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="si" id="corte-correctivo-si" checked={corteCorrectivo} />
                    <Label htmlFor="corte-correctivo-si">Sí</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="no" id="corte-correctivo-no" checked={!corteCorrectivo} />
                    <Label htmlFor="corte-correctivo-no">No</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="productoAdecuadoMantenimiento">Producto adecuado para mantenimiento</Label>
                <Textarea
                  id="productoAdecuadoMantenimiento"
                  placeholder="Recomienda productos para el mantenimiento..."
                  className="min-h-[80px]"
                  value={productoAdecuadoMantenimiento}
                  onChange={(event) => setProductoAdecuadoMantenimiento((event.target.value))}
                  required

                />
              </div>
            </div>

            <Separator />

            {/* Fotos del Cliente */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-amber-700">Fotos del Cliente</h3>
              <p className="text-sm text-muted-foreground">
                Sube múltiples fotos del perfil del cliente (cabeza, diferentes ángulos)
              </p>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                <div className="text-center">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div className="mt-4">
                    <Label htmlFor="fotos" className="cursor-pointer">
                      <span className="mt-2 block text-sm font-medium text-gray-900">Haz clic para subir fotos</span>
                      <span className="mt-1 block text-xs text-gray-500">PNG, JPG hasta 10MB cada una</span>
                    </Label>
                    <Input
                      id="fotos"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              </div>

              {/* Mostrar fotos subidas */}
              {uploadedImages.length > 0 && (
                <div className="grid gap-4 md:grid-cols-4">
                  {uploadedImages.map((image, index) => (
                    <div key={index} className="relative">
                      <img
                        src={URL.createObjectURL(image) || "/placeholder.svg"}
                        alt={`Foto ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                  <div className="flex items-center justify-center h-32 border-2 border-dashed border-gray-300 rounded-lg">
                    <Label htmlFor="fotos-adicionales" className="cursor-pointer text-center">
                      <Plus className="mx-auto h-8 w-8 text-gray-400" />
                      <span className="mt-2 block text-xs text-gray-500">Agregar más</span>
                    </Label>
                    <Input
                      id="fotos-adicionales"
                      type="file"
                      accept="image/*"
                      multiple
                      className="hidden"
                      onChange={handleImageUpload}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Botones */}
            <div className="flex gap-4 pt-6">
              <Button type="submit" className="bg-amber-600 hover:bg-amber-700">
                Guardar Cliente
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
