import React from 'react'

import { ShipmentGroup } from '@/components/types/Shipment'
import Calendar from './Calendar'
import CalendarResponsive from './CalendarResponsive'

interface ShipmentCalendarProps {
  shipments: ShipmentGroup[]
}

const ShipmentCalendar: React.FC<ShipmentCalendarProps> = ({ shipments }) => {
  return (
    <div>
      {shipments.map((shipmentGroup) => (
        <div key={shipmentGroup.date}>
          <Calendar shipmentGroup={shipmentGroup} />
        </div>
      ))}
    </div>
  )
}

export default ShipmentCalendar
