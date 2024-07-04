import { Metadata } from 'next'

import CustomShipmentForm from '@/components/dashboard/shipments/custom/CustomShipmentForm'
import { initialDataCustomShipment } from '@/components/types/Shipment'

export const metadata: Metadata = {
  title: 'TrackApp - Agregar envío predeterminado'
}

export default function AddCustomShipmentPage() {
  return (
    <div className="m-10">
      <CustomShipmentForm type="add" shipment={initialDataCustomShipment} />
    </div>
  )
}
