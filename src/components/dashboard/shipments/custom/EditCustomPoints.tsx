'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import CustomPointForm from './CustomPointForm'
import useUser from '@/components/hooks/useUser'
import useShipments from '@/components/hooks/useShipments'
import {
  initialCustomPoint,
  PropsAddCustomPoint
} from '@/components/types/Shipment'

const EditCustomPoint = () => {
  const pathname = usePathname()
  const [point, setPoint] = useState<PropsAddCustomPoint>(initialCustomPoint)

  const id = pathname.split('/')[4]
  const { getCustomPointById } = useShipments()
  const { token } = useUser()

  useEffect(() => {
    async function fetchPoint() {
      const p = await getCustomPointById({
        id
      })
      if (p) {
        setPoint({
          id: p.id,
          name: p.name,
          description: p.description,
          location: { lat: p.location.lat, lng: p.location.lng }
        })
      }
    }

    if (token) {
      fetchPoint()
    }
  }, [id, token])

  return (
    <div className="m-10">
      <CustomPointForm type="edit" point={point} />
    </div>
  )
}

export default EditCustomPoint
