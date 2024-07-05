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
          <div className="hidden md:block">
            <Calendar shipmentGroup={shipmentGroup} />
          </div>
          <div className="md:hidden">
            <CalendarResponsive shipmentGroup={shipmentGroup} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ShipmentCalendar
