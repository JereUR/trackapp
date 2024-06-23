'use client'

import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import 'tailwindcss/tailwind.css'

import { Card, CardContent, CardTitle } from '../ui/card'
import useUser from '../hooks/useUser'
import useShipments from '../hooks/useShipments'
import { Shipment } from '../types/Shipment'
import ShipmentMap from './maps/ShipmentMap'

const AsideSection = () => {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const { token, fleets, getFleets, loadingFleet } = useUser()
  const { getOnProgressShipments, loadingShipment } = useShipments()

  useEffect(() => {
    async function getShipments() {
      const onProgressShipments = await getOnProgressShipments()
      setShipments(onProgressShipments)
    }

    if (token) {
      getFleets()
      getShipments()
    }
  }, [token])

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-bold">Envios en progreso</p>
      {fleets &&
        fleets.map((fleet) => {
          const fleetShipments = shipments.filter(
            (shipment) => shipment.fleet_id === fleet.id
          )
          return (
            <Card
              key={fleet.id}
              className="bg-card p-4 border-gray-400 dark:border-accent shadow-md"
            >
              <CardTitle className="text-2xl font-semibold">
                {fleet.name}
              </CardTitle>
              <CardContent>
                {fleetShipments.length > 0 ? (
                  fleetShipments.map((shipment) => (
                    <div
                      key={shipment.id}
                      className="mt-2 -mb-4 py-4 px-6 bg-gray-200 dark:bg-gray-800 rounded-lg"
                    >
                      <p>Envío: {shipment.name}</p>
                      <p>Descripción: {shipment.description}</p>
                      {shipment.origin && <ShipmentMap shipment={shipment} />}
                    </div>
                  ))
                ) : (
                  <p>Sin envíos en progreso</p>
                )}
              </CardContent>
            </Card>
          )
        })}
    </div>
  )
}

export default AsideSection
