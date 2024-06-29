import React from 'react'
import { ShipmentGroup, times } from '@/components/types/Shipment'

interface CalendarProps {
  shipmentGroup: ShipmentGroup
}

const Calendar: React.FC<CalendarProps> = ({ shipmentGroup }) => {
  const fleetIdToColor: Record<number, string> = {
    1: 'bg-red-500 border-gray-400',
    2: 'bg-green-500 border-gray-400'
  }

  return (
    <div className="w-full ml-8 mr-12 p-4 space-y-8">
      <div className="border border-gray-500 p-4 rounded-lg shadow-lg bg-card">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          {shipmentGroup.date}
        </h3>
        <div className="flex border-b border-gray-500 mb-2">
          {times.map((time, index) => (
            <div key={time} className="flex-1 text-center py-2">
              <div
                className={`text-sm font-semibold text-foreground ${
                  index === 12 ? 'mr-6' : ''
                }${index === 13 ? 'ml-6' : ''}`}
              >
                {time}
              </div>
            </div>
          ))}
        </div>
        {shipmentGroup.shipments.map((shipment) => {
          let hasPrintedName = false
          return (
            <div key={shipment.id} className="flex mt-2">
              {times.map((time, index) => {
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

                const prevTime = times[index - 1]
                const nextTime = times[index + 1]
                const isPrevInTimeRange =
                  prevTime &&
                  ((isMorningSlot &&
                    prevTime >= shipment.time_start &&
                    prevTime < shipment.time_end) ||
                    (isEveningSlot &&
                      prevTime >= shipment.time_start &&
                      prevTime < shipment.time_end))
                const isNextInTimeRange =
                  nextTime &&
                  ((isMorningSlot &&
                    nextTime >= shipment.time_start &&
                    nextTime < shipment.time_end) ||
                    (isEveningSlot &&
                      nextTime >= shipment.time_start &&
                      nextTime < shipment.time_end))

                // Aplicar borde redondeado solo cuando el casillero anterior o el siguiente no estén coloreados
                const borderRadiusLeft =
                  isInTimeRange && !isPrevInTimeRange ? 'rounded-l-lg' : ''
                const borderRadiusRight =
                  isInTimeRange && !isNextInTimeRange ? 'rounded-r-lg' : ''

                // Restaurar el margen entre 10:30 y 19:30
                const marginRight = time === '10:30' ? '16px' : '0px'
                const marginLeft = time === '19:30' ? '16px' : '0px'

                const shouldPrintName = !hasPrintedName && isInTimeRange

                if (shouldPrintName) {
                  hasPrintedName = true // Marca que el nombre ya se imprimió
                }

                return (
                  <div
                    key={time}
                    className={`flex-1 text-center py-2 border ${
                      isInTimeRange ? fleetColor : 'border-gray-500'
                    } ${borderRadiusLeft} ${borderRadiusRight}`}
                    style={{
                      marginRight: marginRight,
                      marginLeft: marginLeft
                    }}
                  >
                    {shouldPrintName ? (
                      <p className="text-card font-medium p-1">
                        {shipment.name}
                      </p>
                    ) : (
                      ''
                    )}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
