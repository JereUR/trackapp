import React from 'react'
import { ShipmentGroup, times } from '@/components/types/Shipment'

interface CalendarProps {
  shipmentGroup: ShipmentGroup
}

const Calendar: React.FC<CalendarProps> = ({ shipmentGroup }) => {
  const fleetIdToColor: Record<number, string> = {
    1: 'bg-red-500 border-none',
    2: 'bg-green-500 border-none'
  }

  const timeSlotHeight = 40 // Altura deseada para cada slot de tiempo

  return (
    <div className="w-full ml-8 mr-12 p-4 space-y-8">
      <div className="border border-gray-500 p-4 rounded-lg shadow-lg bg-card">
        <h3 className="text-xl font-semibold mb-4 text-foreground">
          {shipmentGroup.date}
        </h3>
        <div className="flex border-b border-gray-500 mb-2">
          {times.map((time, index) => (
            <div
              key={time}
              className="flex-1 text-center py-2"
              style={{ height: `${timeSlotHeight}px` }}
            >
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
          const startIndex = times.findIndex(
            (time) => time === shipment.time_start
          )
          const endIndex = times.findIndex((time) => time === shipment.time_end)
          const span = endIndex - startIndex
          const fleetColor = fleetIdToColor[shipment.fleet_id]

          return (
            <div key={shipment.id} className="relative flex mt-2">
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

                // Restaurar el margen entre 10:30 y 19:30
                const marginRight = time === '10:30' ? '16px' : '0px'
                const marginLeft = time === '19:30' ? '16px' : '0px'

                return (
                  <div
                    key={time}
                    className={`flex-1 text-center py-2 border ${
                      isInTimeRange ? fleetColor : 'border-gray-500'
                    }`}
                    style={{
                      marginRight: marginRight,
                      marginLeft: marginLeft,
                      height: `${timeSlotHeight}px` // Establecer altura del contenedor
                    }}
                  ></div>
                )
              })}
              {span > 0 && (
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center"
                  style={{
                    left: `${Math.max(
                      (startIndex + span / 2) * (100 / times.length) -
                        (span / 2) * (100 / times.length),
                      0
                    )}%`,
                    width: `${Math.min(
                      span * (100 / times.length),
                      100 - (startIndex + span / 2) * (100 / times.length)
                    )}%`
                  }}
                >
                  <p className="text-card font-medium p-1 bg-gray-200 bg-opacity-75 rounded">
                    {shipment.name}
                  </p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Calendar
