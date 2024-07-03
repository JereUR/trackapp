'use client'

import useShipments from '@/components/hooks/useShipments'
import useUser from '@/components/hooks/useUser'
import { initialData, PropsAddShipment } from '@/components/types/Shipment'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import ShipmentForm from './ShipmentForm'

const EditShipment = () => {
  const pathname = usePathname()
  const [shipment, setShipment] = useState<PropsAddShipment>(initialData)

  const id = pathname.split('/')[4]
  const { getShipmentById } = useShipments()
  const { token } = useUser()

  console.log(shipment)

  useEffect(() => {
    async function fetchShipment() {
      const ship = await getShipmentById({
        id
      })
      console.log(ship)
      if (ship) {
        setShipment({
          id: ship.id ? ship.id : null,
          fleet_id: ship.fleet_id ? ship.fleet_id : null,
          assigned_driver_id: ship.assigned_driver
            ? ship.assigned_driver.id
            : null,
          delivery_points: ship.delivery_points.map((dp) => {
            return {
              id: dp.id,
              name: dp.name,
              destination: { lat: dp.destination.lat, lng: dp.destination.lng },
              description: dp.description,
              cargo: dp.cargo.map((c) => {
                return { quantity: c.quantity, product: c.product }
              })
            }
          }),
          name: ship.name,
          description: ship.description,
          date: new Date(ship.date),
          time_start: ship.time_start,
          time_end: ship.time_end
        })
      }
    }

    if (token) {
      fetchShipment()
    }
  }, [id, token])

  return (
    <div className="m-10">
      <ShipmentForm type="edit" shipment={shipment} />
    </div>
  )
}

export default EditShipment
