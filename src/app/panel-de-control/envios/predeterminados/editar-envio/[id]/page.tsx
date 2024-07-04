import { Metadata } from 'next'

import EditCustomShipment from '@/components/dashboard/shipments/custom/EditCustomShipment'

export const metadata: Metadata = {
  title: 'TrackApp - Editar envío predeterminado'
}

const EditCustomShipmentPage = () => {
  return <EditCustomShipment />
}

export default EditCustomShipmentPage
