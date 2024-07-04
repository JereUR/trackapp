import { Metadata } from 'next'

import {
  initialCustomPoint,
  initialDataCustomShipment
} from '@/components/types/Shipment'
import CustomPointForm from '@/components/dashboard/shipments/custom/CustomPointForm'

export const metadata: Metadata = {
  title: 'TrackApp - Agregar punto clave'
}

export default function AddCustomPointPage() {
  return (
    <div className="m-10">
      <CustomPointForm type="add" point={initialCustomPoint} />
    </div>
  )
}
