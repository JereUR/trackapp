import { Metadata } from 'next'
import { Suspense } from 'react'

import CustomShipmentsList from '@/components/dashboard/shipments/custom/CustomShipmentsList'

export const metadata: Metadata = {
  title: 'TrackApp - Envios predeterminados'
}

const CustomShipmentsPage = () => {
  return (
    <div className="m-4 md:m-10">
      <Suspense fallback={<div>Loading...</div>}>
        <CustomShipmentsList />
      </Suspense>
    </div>
  )
}

export default CustomShipmentsPage
