'use client'

import { useEffect, useState } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardTitle } from '../ui/card'
import useUser from '../hooks/useUser'
import useShipments from '../hooks/useShipments'
import { Shipment } from '../types/Shipment'

// Carga dinámica del componente ShipmentMap sin SSR
const ShipmentMap = dynamic(() => import('./maps/ShipmentMap'), {
  ssr: false
})

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
            <Card key={fleet.id} className="bg-card p-4">
              <CardTitle className="text-xl font-light">{fleet.name}</CardTitle>
              <CardContent>
                {fleetShipments.length > 0 ? (
                  fleetShipments.map((shipment) => (
                    <div
                      key={shipment.id}
                      className="my-2 py-4 px-6 bg-gray-100 dark:bg-gray-800 rounded-lg"
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
