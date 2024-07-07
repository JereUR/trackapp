'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { BsCheck2 } from 'react-icons/bs'
import dynamic from 'next/dynamic'
import { MdEditLocationAlt } from 'react-icons/md'
import { TbMapPinCheck } from 'react-icons/tb'
import { Map } from 'leaflet'
import { useRouter } from 'next/navigation'

import ErrorText from '@/components/ErrorText'
import {
  FormErrorsCustomPoint,
  FormErrorsCustomShipment,
  initialCustomPoint,
  initialErrorsCustomPoint,
  PropsAddCustomPoint
} from '@/components/types/Shipment'
import { Button } from '@/components/ui/button'
import useShipments from '@/components/hooks/useShipments'
import Loader from '@/components/Loader'
import { useToast } from '@/components/ui/use-toast'

const MapPointForm = dynamic(
  () => import('@/components/dashboard/maps/MapPointForm'),
  {
    ssr: false
  }
)

interface Props {
  type: string
  point: PropsAddCustomPoint
}

const CustomPointForm: React.FC<Props> = ({ type, point }) => {
  const [dataCustomPoint, setDataCustomPoint] =
    useState<PropsAddCustomPoint>(initialCustomPoint)
  const [formErrors, setFormErrors] = useState<FormErrorsCustomPoint>(
    initialErrorsCustomPoint
  )
  const [markerOnEdit, setMarkerOnEdit] = useState<boolean>(false)
  const [locationConfirm, setLocationConfirm] = useState<boolean>(false)

  const { addCustomPoint, updateCustomPoint, loadingCustomPoint } =
    useShipments()

  const mapRef = useRef<Map | null>(null)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setDataCustomPoint(point)
  }, [point])

  const validations = () => {
    const errors: FormErrorsCustomShipment = {}

    if (!dataCustomPoint.name.trim()) {
      errors.name = 'Este campo no puede ser vacío.'
    } else {
      if (dataCustomPoint.name.length > 20) {
        errors.name = 'El nombre no puede tener más de 20 caracteres.'
      }
    }

    if (!dataCustomPoint.location) {
      errors.location = 'Debe seleccionar un punto en el mapa.'
    }

    return errors
  }

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setDataCustomPoint({ ...dataCustomPoint, [name]: value })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDataCustomPoint({ ...dataCustomPoint, [name]: value })
    if (value) setFormErrors({ ...formErrors, [name]: '' })
  }

  const handleAddMarker = () => {
    if (mapRef.current) {
      setDataCustomPoint({
        ...dataCustomPoint,
        location: mapRef.current.getCenter()
      })
      setMarkerOnEdit(true)
    } else {
      toast({
        title: 'Oh no! Algo salió mal.',
        description: 'El mapa no está cargado correctamente.'
      })
    }
  }

  const handleCancel = () => {
    setMarkerOnEdit(false)
    setLocationConfirm(false)
    setDataCustomPoint({ ...dataCustomPoint, location: null })
  }

  const handleConfirm = () => {
    setMarkerOnEdit(false)
    setLocationConfirm(true)
    setFormErrors({ ...formErrors, location: '' })
  }

  const handleClose = () => {
    if (
      window.confirm(
        '¿Estás seguro que quieres cerrar el formulario? Se perderán todos los cambios'
      )
    ) {
      router.push('/panel-de-control/envios/predeterminados')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const err = validations()
    setFormErrors(err)

    if (Object.keys(err).length === 0) {
      if (type === 'add') {
        const res = await addCustomPoint({
          dataCustomPoint
        })
        if (res) {
          toast({
            title: 'Punto clave agregado.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/envios/predeterminados')
          }, 1000)
        }
      } else {
        const res = await updateCustomPoint({
          dataCustomPoint
        })
        if (res) {
          toast({
            title: 'Punto clave actualizado.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/envios/predeterminados')
          }, 1000)
        }
      }
      setDataCustomPoint(initialCustomPoint)
      setFormErrors(initialErrorsCustomPoint)
    }
  }

  return (
    <div className="">
      <div className="flex">
        <div className="flex-1 pr-4">
          <h1 className="text-2xl font-bold mb-6">Agregar Punto Clave</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="name" className="font-light text-foreground">
                    Nombre
                  </label>
                  {formErrors.name && <ErrorText text={formErrors.name} />}
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={dataCustomPoint.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>

              <div>
                <label
                  htmlFor="description"
                  className="font-light text-foreground"
                >
                  Descripción
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={dataCustomPoint.description}
                  onChange={handleTextAreaChange}
                  className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
              <div>
                <div className="flex gap-4 items-center">
                  <label
                    htmlFor="destination"
                    className="font-light text-foreground"
                  >
                    Ubicación destino
                  </label>
                  {formErrors.location && (
                    <ErrorText text={formErrors.location} />
                  )}
                </div>
                <div className="flex w-full justify-between items-center mt-2 mb-6">
                  <div className="flex gap-4">
                    <Button
                      type="button"
                      disabled={markerOnEdit}
                      className="flex gap-2 items-center bg-sky-500 text-foreground transition duration-300 ease-in-out hover:bg-sky-600"
                      onClick={handleAddMarker}
                    >
                      <MdEditLocationAlt className="h-5 w-5" /> Marcar en el
                      mapa
                    </Button>
                    {markerOnEdit && (
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          onClick={handleCancel}
                          className="p-2 bg-red-600 text-foreground mb-4 transition duration-300 ease-in-out hover:bg-red-700"
                        >
                          Cancelar
                        </Button>
                        <Button
                          type="button"
                          className="bg-green-500 text-foreground mb-4 transition duration-300 ease-in-out hover:bg-green-600"
                          onClick={handleConfirm}
                        >
                          Confirmar
                        </Button>
                      </div>
                    )}
                  </div>
                  {locationConfirm && (
                    <div className="flex items-center gap-2 p-4 border border-gray-400 dark:border-gray-700 rounded-md">
                      <TbMapPinCheck className="h-5 w-5 text-green-500" />
                      <p>Ubicación agregada</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                className="flex gap-2 items-center text-foreground bg-red-500 hover:bg-red-600"
                onClick={handleClose}
              >
                <Cross2Icon className="h-5 w-5" /> Cerrar
              </Button>
              <Button
                type="submit"
                className=" text-foreground bg-green-500 hover:bg-green-600"
              >
                {loadingCustomPoint ? (
                  <p className="flex gap-2 items-center">
                    <BsCheck2 className="h-5 w-5" /> Agregar punto
                  </p>
                ) : (
                  <Loader color="border-t-green-500" />
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="flex-1 pl-4">
          <MapPointForm
            dataCustomPoint={dataCustomPoint}
            setDataCustomPoint={setDataCustomPoint}
            mapRef={mapRef}
          />
        </div>
      </div>
    </div>
  )
}

export default CustomPointForm
