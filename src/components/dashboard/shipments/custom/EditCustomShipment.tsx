'use client'

import useShipments from '@/components/hooks/useShipments'
import useUser from '@/components/hooks/useUser'
import {
  initialDataCustomShipment,
  PropsAddCustomShipment
} from '@/components/types/Shipment'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import CustomShipmentForm from './CustomShipmentForm'

const EditCustomShipment = () => {
  const pathname = usePathname()
  const [shipment, setShipment] = useState<PropsAddCustomShipment>(
    initialDataCustomShipment
  )

  const id = pathname.split('/')[4]
  const { getCustomShipmentById } = useShipments()
  const { token } = useUser()

  console.log(shipment)

  useEffect(() => {
    async function fetchShipment() {
      const ship = await getCustomShipmentById({
        id
      })
      if (ship) {
        setShipment({
          id: ship.id ? ship.id : null,
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
          description: ship.description
        })
      }
    }

    if (token) {
      fetchShipment()
    }
  }, [id, token])

  return (
    <div className="m-10">
      <CustomShipmentForm type="edit" shipment={shipment} />
    </div>
  )
}

export default EditCustomShipment
