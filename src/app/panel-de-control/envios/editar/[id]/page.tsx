import EditShipment from '@/components/dashboard/shipments/EditShipment'
import ShipmentForm from '@/components/dashboard/shipments/ShipmentForm'
import { initialDataEdit } from '@/components/types/Shipment'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrackApp - Editar envío'
}

const EditShipmentPage = () => {
  return <EditShipment />
}

export default EditShipmentPage
