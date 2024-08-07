'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { BsCheck2 } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import ErrorText from '@/components/ErrorText'
import useUser from '@/components/hooks/useUser'
import {
  FormErrorsCustomShipment,
  initialDataCustomShipment,
  initialDeliveryData,
  initialErrorsCustomShipment,
  PropsAddCustomShipment,
  PropsAddDeliveryPoint,
  times
} from '@/components/types/Shipment'
import { Button } from '@/components/ui/button'
import useShipments from '@/components/hooks/useShipments'
import Loader from '@/components/Loader'
import { useToast } from '@/components/ui/use-toast'
import CustomDeliveryPointsForm from './CustomDeliveryPointsForm'

const MapForm = dynamic(() => import('@/components/dashboard/maps/MapForm'), {
  ssr: false
})

interface Props {
  type: string
  shipment: PropsAddCustomShipment
}

const CustomShipmentForm: React.FC<Props> = ({ type, shipment }) => {
  const [dataShipment, setDataShipment] =
    useState<PropsAddCustomShipment>(shipment)
  const [dataDeliveryPoint, setDataDeliveryPoint] =
    useState<PropsAddDeliveryPoint>(initialDeliveryData)
  const [formErrors, setFormErrors] = useState<FormErrorsCustomShipment>(
    initialErrorsCustomShipment
  )
  const [selectedDeliveryPoint, setSelectedDeliveryPoint] = useState<
    number | null
  >(null)

  const { token } = useUser()
  const {
    addCustomShipment,
    updateCustomShipment,
    loadingCustomShipment,
    customShipments,
    getCustomShipments
  } = useShipments()

  const mapRef = useRef()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setDataShipment(shipment)
  }, [shipment])

  useEffect(() => {
    if (token) getCustomShipments({ q: '' })
  }, [token])

  const validations = () => {
    const errors: FormErrorsCustomShipment = {}

    if (!dataShipment.name.trim()) {
      errors.name = 'Este campo no puede ser vacío.'
    } else {
      if (dataShipment.name.length > 20) {
        errors.name = 'El nombre no puede tener más de 20 caracteres.'
      }
    }

    if (dataShipment.delivery_points.length === 0) {
      errors.delivery_points = 'Debe agregar al menos un punto de entrega.'
    }

    return errors
  }

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setDataShipment({ ...dataShipment, [name]: value })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    setDataShipment({ ...dataShipment, [name]: value })
    if (value) setFormErrors({ ...formErrors, [name]: '' })
  }

  const handleSelectDeliveryPoint = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const { value } = e.target

    if (value) {
      const id = parseInt(value)
      setSelectedDeliveryPoint(id)

      const selectedDeliveryPoints =
        customShipments.find((shipment) => shipment.id === id)
          ?.delivery_points || []

      const updatedDeliveryPoints = [
        ...dataShipment.delivery_points,
        ...selectedDeliveryPoints
      ]

      setDataShipment({
        ...dataShipment,
        delivery_points: updatedDeliveryPoints
      })
    } else {
      setSelectedDeliveryPoint(null)
    }
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
        const res = await addCustomShipment({
          dataCustomShipment: dataShipment
        })
        if (res) {
          toast({
            title: 'Envío predeterminado agregado.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/envios/predeterminados')
          }, 1000)
        }
      } else {
        const res = await updateCustomShipment({
          dataCustomShipment: dataShipment
        })
        if (res) {
          toast({
            title: 'Envío predeterminado actualizado.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/envios/predeterminados')
          }, 1000)
        }
      }
      setDataShipment(initialDataCustomShipment)
      setDataDeliveryPoint(initialDeliveryData)
      setFormErrors(initialErrorsCustomShipment)
    }
  }

  return (
    <div className="">
      <div className="flex">
        <div className="flex-1 pr-4">
          <h1 className="text-2xl font-bold mb-6">
            Agregar Envío Predeterminado
          </h1>
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
                  value={dataShipment.name}
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
                  value={dataShipment.description}
                  onChange={handleTextAreaChange}
                  className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-lg font-light">Puntos de entrega</p>
                {formErrors.delivery_points && (
                  <ErrorText text={formErrors.delivery_points} />
                )}
              </div>
              <div>
                <select
                  id="delivery_points"
                  name="delivery_points"
                  onChange={handleSelectDeliveryPoint}
                  className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                >
                  <option value="" selected={selectedDeliveryPoint === null}>
                    -- Cargar envio predeterminado --
                  </option>
                  {customShipments.map((shipment) => (
                    <option
                      key={shipment.id}
                      value={shipment.id}
                      selected={selectedDeliveryPoint === shipment.id}
                    >
                      {shipment.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <span className="flex justify-center">ó</span>
            <CustomDeliveryPointsForm
              dataShipment={dataShipment}
              setDataShipment={setDataShipment}
              dataDeliveryPoint={dataDeliveryPoint}
              setDataDeliveryPoint={setDataDeliveryPoint}
              mapRef={mapRef}
            />
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
                {loadingCustomShipment ? (
                  <p className="flex gap-2 items-center">
                    <BsCheck2 className="h-5 w-5" /> Agregar envío
                  </p>
                ) : (
                  <Loader color="border-t-green-500" />
                )}
              </Button>
            </div>
          </form>
        </div>
        <div className="flex-1 pl-4">
          <MapForm
            dataShipment={dataShipment}
            dataDeliveryPoint={dataDeliveryPoint}
            setDataDeliveryPoint={setDataDeliveryPoint}
            mapRef={mapRef}
          />
        </div>
      </div>
    </div>
  )
}

export default CustomShipmentForm
