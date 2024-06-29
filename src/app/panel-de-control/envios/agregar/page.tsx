import { Metadata } from 'next'

import ShipmentForm from '@/components/dashboard/shipments/ShipmentForm'
import { initialData } from '@/components/types/Shipment'

export const metadata: Metadata = {
  title: 'TrackApp - Agregar envío'
}

export default function AddShipmentPage() {
  return (
    <div className="m-10">
      <ShipmentForm type="add" shipment={initialData} />
    </div>
  )
}
