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

    /* if (token) {
      getFleets()
      getShipments()
    } */

    getFleets()
    getShipments()
  }, [token])

  return (
    <div className="flex flex-col gap-4">
      <p>Envios en progreso</p>
      {fleets &&
        fleets.map((fleet) => {
          const fleetShipments = shipments.filter(
            (shipment) => shipment.fleet_id === fleet.id
          )
          return (
            <Card key={fleet.id} className="bg-card p-4">
              <CardTitle>{fleet.name}</CardTitle>
              <CardContent>
                {fleetShipments.length > 0 ? (
                  fleetShipments.map((shipment) => (
                    <div key={shipment.id} className="mb-4">
                      <p>Envío ID: {shipment.id}</p>
                      <p>Descripción: {shipment.description}</p>
                      <p>Status: {shipment.status}</p>
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
