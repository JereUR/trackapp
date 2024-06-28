import React from 'react'
import { ShipmentGroup, times } from '@/components/types/Shipment'

interface CalendarProps {
  shipmentGroup: ShipmentGroup
}

const Calendar: React.FC<CalendarProps> = ({ shipmentGroup }) => {
  // Mapeo de fleet_id a colores
  const fleetIdToColor: Record<number, string> = {
    1: 'bg-red-500 text-white', // Rojo para fleet_id: 1
    2: 'bg-green-500 text-white' // Verde para fleet_id: 2
    // Añadir más colores para otros fleet_id según sea necesario
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="border border-gray-300 p-4 rounded-lg shadow-lg bg-card">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          {shipmentGroup.date}
        </h3>
        <div className="flex border-b border-gray-300 mb-2">
          {times.map((time, index) => (
            <div key={time} className="flex-1 text-center py-2">
              <div
                className={`text-sm font-semibold text-foreground ${
                  index === 12 ? '-mr-4' : ''
                }${index === 13 ? 'ml-8' : ''}`}
              >
                {time}
              </div>
            </div>
          ))}
        </div>
        {shipmentGroup.shipments.map((shipment) => (
          <div key={shipment.id} className="flex mt-2">
            {times.map((time) => {
              const isMorningSlot = time >= '07:30' && time < '10:30'
              const isEveningSlot = time >= '19:30' && time < '23:30'

              const isInMorningRange =
                isMorningSlot &&
                time >= shipment.time_start &&
                time < shipment.time_end
              const isInEveningRange =
                isEveningSlot &&
                time >= shipment.time_start &&
                time < shipment.time_end

              const isInTimeRange = isInMorningRange || isInEveningRange
              const fleetColor = fleetIdToColor[shipment.fleet_id]

              const shouldApplyMarginRight = time === '10:30'
              const shouldApplyMarginLeft = time === '19:30'

              return (
                <div
                  key={time}
                  className={`flex-1 text-center py-2 border ${
                    isInTimeRange ? fleetColor : 'border-gray-300'
                  } rounded-lg`}
                  style={{
                    marginRight: shouldApplyMarginRight ? '16px' : '0px',
                    marginLeft: shouldApplyMarginLeft ? '16px' : '0px'
                  }}
                >
                  {isInTimeRange && time === shipment.time_start
                    ? shipment.name
                    : ''}
                </div>
              )
            })}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Calendar
