import React from 'react'

import { ShipmentGroup } from '@/components/types/Shipment'
import Calendar from './Calendar'
import FleetLegend from './FleetLegend'

interface ShipmentCalendarProps {
  shipments: ShipmentGroup[]
}

const ShipmentCalendar: React.FC<ShipmentCalendarProps> = ({ shipments }) => {
  return (
    <div>
      <FleetLegend />
      {shipments.map((shipmentGroup) => (
        <div key={shipmentGroup.date}>
          <Calendar shipmentGroup={shipmentGroup} />
        </div>
      ))}
    </div>
  )
}

export default ShipmentCalendar
