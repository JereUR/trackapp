import { Metadata } from 'next'

import CustomShipmentsList from '@/components/dashboard/shipments/custom/CustomShipmentsList'

export const metadata: Metadata = {
  title: 'TrackApp - Envios predeterminados'
}

const CustomShipmentsPage = () => {
  return <CustomShipmentsList />
}

export default CustomShipmentsPage
