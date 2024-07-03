import { Metadata } from 'next'

import EditShipment from '@/components/dashboard/shipments/EditShipment'

export const metadata: Metadata = {
  title: 'TrackApp - Editar envío'
}

const EditShipmentPage = () => {
  return <EditShipment />
}

export default EditShipmentPage
