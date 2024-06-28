import { Metadata } from 'next'
import React from 'react'

import ShipmentsList from '@/components/dashboard/shipments/ShipmentsList'

export const metadata: Metadata = {
  title: 'TrackApp - Envios'
}

const ShipmentsPage = () => {
  return <div className="m-10"><ShipmentsList/></div>
}

export default ShipmentsPage
