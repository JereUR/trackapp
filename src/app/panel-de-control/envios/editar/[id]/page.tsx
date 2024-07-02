import ShipmentForm from '@/components/dashboard/shipments/ShipmentForm'
import { initialDataEdit } from '@/components/types/Shipment'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrackApp - Editar envío'
}

const EditShipmentPage = () => {
  return (
    <div className="m-10">
      <ShipmentForm type="edit" shipment={initialDataEdit} />
    </div>
  )
}

export default EditShipmentPage
