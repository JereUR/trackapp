'use client'

import React, { useEffect, useRef, useState } from 'react'
import { Cross2Icon } from '@radix-ui/react-icons'
import { BsCheck2 } from 'react-icons/bs'

import ErrorText from '@/components/ErrorText'
import useUser from '@/components/hooks/useUser'
import {
  FormErrorsShipment,
  initialErrorsShipment,
  PropsAddShipment,
  times
} from '@/components/types/Shipment'
import { User } from '@/components/types/User'
import { Button } from '@/components/ui/button'
import DeliveryPointsForm from './DeliveryPointsForm'

interface Props {
  type: string
  shipment: PropsAddShipment
}

const ShipmentForm: React.FC<Props> = ({ type, shipment }) => {
  const [dataShipment, setDataShipment] = useState<PropsAddShipment>(shipment)
  const [formErrors, setFormErrors] = useState<FormErrorsShipment>(
    initialErrorsShipment
  )
  const [drivers, setDrivers] = useState<User[]>([])
  const { token, getDrivers, fleets, getFleets } = useUser()

  const today = new Date().toISOString().split('T')[0]
  const filteredStartTimes = times.filter((time) => time !== '23:30')
  const filteredEndTimes = times.filter((time) => time !== '07:30')
  const mapRef = useRef()

  useEffect(() => {
    setDataShipment(shipment)
  }, [])

  useEffect(() => {
    const getDataDrivers = async () => {
      const drivers = await getDrivers()
      setDrivers(drivers)
    }

    if (token) {
      getDataDrivers()
      getFleets()
    }
  }, [token])

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setDataShipment({ ...dataShipment, [name]: value })
    setFormErrors({ ...formErrors, [name]: '' })
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
    setFormErrors({ ...formErrors, [name]: '' })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Submit form
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Agregar Envío</h1>
      <div className="flex">
        <div className="flex-1 pr-4">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fleet" className="font-light text-foreground">
                  Flota
                </label>
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
                <label htmlFor="driver" className="font-light text-foreground">
                  Conductor
                </label>
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
                <label htmlFor="name" className="font-light text-foreground">
                  Nombre
                </label>
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
                <label htmlFor="date" className="font-light text-foreground">
                  Fecha
                </label>
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
                <label
                  htmlFor="time_start"
                  className="font-light text-foreground"
                >
                  Hora de inicio
                </label>
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
                <label
                  htmlFor="time_end"
                  className="font-light text-foreground"
                >
                  Hora estimada de fin
                </label>
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
            <DeliveryPointsForm
              dataShipment={dataShipment}
              setDataShipment={setDataShipment}
              mapRef={mapRef}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button
                type="button"
                className="flex gap-2 items-center text-foreground bg-red-500 hover:bg-red-600"
              >
                <Cross2Icon className="h-5 w-5" /> Cerrar
              </Button>
              <Button
                type="submit"
                className="flex gap-2 items-center text-foreground bg-green-500 hover:bg-green-600"
              >
                <BsCheck2 className="h-5 w-5" /> Agregar envío
              </Button>
            </div>
          </form>
        </div>
        <div className="flex-1 pl-4">
          {/* Aquí va el mapa */}
          <div
            id="map"
            className="h-full w-full border border-gray-400 dark:border-gray-700 rounded-md"
          ></div>
        </div>
      </div>
    </div>
  )
}

export default ShipmentForm
