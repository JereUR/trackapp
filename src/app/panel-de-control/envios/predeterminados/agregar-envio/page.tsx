import { Metadata } from 'next'

import CustomShipmentForm from '@/components/dashboard/shipments/custom/CustomShipmentForm'

export const metadata: Metadata = {
  title: 'TrackApp - Agregar envío predeterminado'
}

export default function AddCustomShipmentPage() {
  return (
    <div className="m-10">
      {/* <CustomShipmentForm type="add" shipment={[]} /> */}
    </div>
  )
}
