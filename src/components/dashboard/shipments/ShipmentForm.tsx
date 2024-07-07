'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { BsCheck2 } from 'react-icons/bs'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

import ErrorText from '@/components/ErrorText'
import useUser from '@/components/hooks/useUser'
import {
  FormErrorsShipment,
  initialData,
  initialDeliveryData,
  initialErrorsShipment,
  PropsAddDeliveryPoint,
  PropsAddShipment,
  times
} from '@/components/types/Shipment'
import { User } from '@/components/types/User'
import { Button } from '@/components/ui/button'
import DeliveryPointsForm from './DeliveryPointsForm'
import useShipments from '@/components/hooks/useShipments'
import Loader from '@/components/Loader'
import { useToast } from '@/components/ui/use-toast'

const MapForm = dynamic(() => import('@/components/dashboard/maps/MapForm'), {
  ssr: false
})

interface Props {
  type: string
  shipment: PropsAddShipment
}

const ShipmentForm: React.FC<Props> = ({ type, shipment }) => {
  const [dataShipment, setDataShipment] = useState<PropsAddShipment>(shipment)
  const [dataDeliveryPoint, setDataDeliveryPoint] =
    useState<PropsAddDeliveryPoint>(initialDeliveryData)
  const [formErrors, setFormErrors] = useState<FormErrorsShipment>(
    initialErrorsShipment
  )
  const [drivers, setDrivers] = useState<User[]>([])
  const [selectedDeliveryPoint, setSelectedDeliveryPoint] = useState<
    number | null
  >(null)

  const { token, getDrivers, fleets, getFleets } = useUser()
  const {
    addShipment,
    updateShipment,
    loadingShipment,
    customShipments,
    getCustomShipments
  } = useShipments()

  const today = new Date().toISOString().split('T')[0]
  const filteredStartTimes = times.filter((time) => time !== '23:30')
  const filteredEndTimes = times.filter((time) => time !== '07:30')
  const mapRef = useRef()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    setDataShipment(shipment)
  }, [shipment])

  useEffect(() => {
    const getDataDrivers = async () => {
      const drivers = await getDrivers()
      setDrivers(drivers)
    }

    if (token) {
      getDataDrivers()
      getFleets()
      getCustomShipments({ q: '' })
    }
  }, [token])

  const validations = () => {
    const errors: FormErrorsShipment = {}

    if (!dataShipment.fleet_id) {
      errors.fleet_id = 'Debe seleccionar una flota.'
    }

    if (!dataShipment.assigned_driver_id) {
      errors.assigned_driver_id = 'Debe seleccionar un conductor.'
    }

    if (!dataShipment.name.trim()) {
      errors.name = 'Este campo no puede ser vacío.'
    } else {
      if (dataShipment.name.length > 20) {
        errors.name = 'El nombre no puede tener más de 20 caracteres.'
      }
    }

    if (!dataShipment.time_start.trim()) {
      errors.time_start = 'Debe seleccionar una hora de inicio.'
    }

    if (!dataShipment.time_end.trim()) {
      errors.time_end = 'Debe seleccionar una hora estimada de finalización.'
    }

    if (!dataShipment.date) {
      errors.date = 'Debe seleccionar una fecha'
    }

    if (dataShipment.delivery_points.length === 0) {
      errors.delivery_points = 'Debe agregar al menos un punto de entrega.'
    }

    return errors
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
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

  const handleTextAreaChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target
    setDataShipment({ ...dataShipment, [name]: value })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'date') {
      setDataShipment({ ...dataShipment, [name]: new Date(value) })
    } else {
      setDataShipment({ ...dataShipment, [name]: value })
    }
    if (value) setFormErrors({ ...formErrors, [name]: '' })
  }

  const handleClose = () => {
    if (
      window.confirm(
        '¿Estás seguro que quieres cerrar el formulario? Se perderán todos los cambios'
      )
    ) {
      router.push('/panel-de-control/envios')
    }
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const err = validations()
    setFormErrors(err)

    if (Object.keys(err).length === 0) {
      if (type === 'add') {
        const res = await addShipment({ dataShipment })
        if (res) {
          toast({
            title: 'Envío agregado.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/envios')
          }, 1000)
        }
      } else {
        const res = await updateShipment({ dataShipment })
        if (res) {
          toast({
            title: 'Envío actualizado.',
            description: 'Redireccionando...',
            className: 'bg-green-600'
          })

          setTimeout(() => {
            router.replace('/panel-de-control/envios')
          }, 1000)
        }
      }
      setDataShipment(initialData)
      setDataDeliveryPoint(initialDeliveryData)
      setFormErrors(initialErrorsShipment)
    }
  }

  return (
    <div className="">
      <div className="flex">
        <div className="flex-1 pr-4">
          <h1 className="text-2xl font-bold mb-6">Agregar Envío</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex gap-2 items-center">
                  <label htmlFor="fleet" className="font-light text-foreground">
                    Flota
                  </label>
                  {formErrors.fleet_id && (
                    <ErrorText text={formErrors.fleet_id} />
                  )}
                </div>
                <select
                  id="fleet"
                  name="fleet_id"
                  onChange={handleSelectChange}
                  className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                >
                  <option value="" selected={dataShipment.fleet_id === null}>
                    -- Seleccione flota --
                  </option>
                  {fleets.map((fleet) => (
                    <option
                      key={fleet.id}
                      value={fleet.id}
                      selected={dataShipment.fleet_id === fleet.id}
                    >
                      {fleet.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <label
                    htmlFor="driver"
                    className="font-light text-foreground"
                  >
                    Conductor
                  </label>
                  {formErrors.assigned_driver_id && (
                    <ErrorText text={formErrors.assigned_driver_id} />
                  )}
                </div>
                <select
                  id="driver"
                  name="assigned_driver_id"
                  onChange={handleSelectChange}
                  className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                >
                  <option
                    value=""
                    selected={dataShipment.assigned_driver_id === null}
                  >
                    -- Seleccione conductor --
                  </option>
                  {drivers.map((driver) => (
                    <option
                      key={driver.id}
                      value={driver.id}
                      selected={dataShipment.assigned_driver_id === driver.id}
                    >
                      {driver.first_name} {driver.last_name}
                    </option>
                  ))}
                </select>
              </div>
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
                <div className="flex gap-2 items-center">
                  <label htmlFor="date" className="font-light text-foreground">
                    Fecha
                  </label>
                  {formErrors.date && <ErrorText text={formErrors.date} />}
                </div>
                {formErrors.date && <ErrorText text={formErrors.date} />}
                <input
                  type="date"
                  name="date"
                  className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                  min={today}
                  value={dataShipment.date.toISOString().split('T')[0]}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <label
                    htmlFor="time_start"
                    className="font-light text-foreground"
                  >
                    Hora de inicio
                  </label>
                  {formErrors.time_start && (
                    <ErrorText text={formErrors.time_start} />
                  )}
                </div>
                <select
                  id="time_start"
                  name="time_start"
                  onChange={handleSelectChange}
                  className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                >
                  <option value="" selected={dataShipment.time_start === ''}>
                    -- Seleccione hora de inicio --
                  </option>
                  {filteredStartTimes.map((time) => (
                    <option
                      key={time}
                      value={time}
                      selected={dataShipment.time_start === time}
                    >
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <div className="flex gap-2 items-center">
                  <label
                    htmlFor="time_end"
                    className="font-light text-foreground"
                  >
                    Hora estimada de fin
                  </label>
                  {formErrors.time_end && (
                    <ErrorText text={formErrors.time_end} />
                  )}
                </div>
                <select
                  id="time_end"
                  name="time_end"
                  onChange={handleSelectChange}
                  className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
                >
                  <option value="" selected={dataShipment.time_end === ''}>
                    -- Seleccione hora estimada de fin --
                  </option>
                  {filteredEndTimes.map((time) => (
                    <option
                      key={time}
                      value={time}
                      selected={dataShipment.time_end === time}
                    >
                      {time}
                    </option>
                  ))}
                </select>
              </div>
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
            <DeliveryPointsForm
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
                {loadingShipment ? (
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

export default ShipmentForm
