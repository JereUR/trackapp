import { Metadata } from 'next'
import React, { Suspense } from 'react'

import ShipmentsList from '@/components/dashboard/shipments/ShipmentsList'

export const metadata: Metadata = {
  title: 'TrackApp - Envios'
}

const ShipmentsPage = () => {
  return (
    <div className="m-4 md:m-10">
      <Suspense fallback={<div>Loading...</div>}>
        <ShipmentsList />
      </Suspense>
    </div>
  )
}

export default ShipmentsPage
