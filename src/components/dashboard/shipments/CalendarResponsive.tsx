import React, { useState } from 'react'
import { ShipmentGroup, times, ShipmentItem } from '@/components/types/Shipment'
import ModalShipment from './ModalShipment'

interface CalendarResponsiveProps {
  shipmentGroup: ShipmentGroup
}

const CalendarResponsive: React.FC<CalendarResponsiveProps> = ({
  shipmentGroup
}) => {
  const fleetIdToColor: Record<number, string> = {
    1: 'bg-red-500 border-none',
    2: 'bg-green-500 border-none'
  }

  const timeSlotHeight = 40 // Altura deseada para cada slot de tiempo
  const [activeShipment, setActiveShipment] = useState<ShipmentItem | null>(
    null
  )
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)

  const handleShipmentClick = (shipment: ShipmentItem) => {
    setActiveShipment(shipment)
  }

  const closeModal = () => {
    setActiveShipment(null)
    setShowConfirmDelete(false)
  }

  const handleDelete = () => {
    // Lógica para borrar el envío
    console.log('Deleting shipment:', activeShipment?.name)
    closeModal()
  }

  // Crear una matriz para organizar los envíos por tiempo
  const timeSlots = times.map((time) => ({
    time,
    shipments: [] as ShipmentItem[]
  }))

  shipmentGroup.shipments.forEach((shipment) => {
    const startIndex = times.findIndex((time) => time === shipment.time_start)
    const endIndex = times.findIndex((time) => time === shipment.time_end)

    for (let i = startIndex; i < endIndex; i++) {
      timeSlots[i].shipments.push(shipment)
    }
  })

  // Obtener el número máximo de envíos en cualquier intervalo de tiempo
  const maxColumns = Math.max(...timeSlots.map((slot) => slot.shipments.length))

  return (
    <div className="w-full">
      <div className="border border-gray-300 dark:border-gray-500 p-4 rounded-lg shadow-lg bg-card m-1">
        <h3 className="text-xl font-semibold mb-4 text-gray-500 dark:text-white">
          {shipmentGroup.date}
        </h3>
        <div className={`grid grid-cols-${maxColumns + 1} gap-2`}>
          <div>
            {times.map((time) => (
              <div
                key={time}
                className="text-center py-2 text-sm font-semibold text-gray-500 dark:text-white"
                style={{ height: `${timeSlotHeight}px` }}
              >
                {time}
              </div>
            ))}
          </div>
          {Array.from({ length: maxColumns }).map((_, columnIndex) => (
            <div key={columnIndex} className="relative">
              {times.map((time, index) => {
                const shipment = timeSlots[index].shipments[columnIndex]
                const isInTimeRange =
                  shipment &&
                  time >= shipment.time_start &&
                  time < shipment.time_end
                const fleetColor = shipment
                  ? fleetIdToColor[shipment.fleet_id]
                  : ''

                return (
                  <div
                    key={time}
                    className={`flex border ${
                      isInTimeRange
                        ? fleetColor
                        : 'border-gray-300 dark:border-gray-500'
                    }`}
                    style={{ height: `${timeSlotHeight}px` }}
                  >
                    {isInTimeRange &&
                      index ===
                        times.findIndex((t) => t === shipment.time_start) && (
                        <div
                          className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center cursor-pointer"
                          style={{
                            top: `${index * timeSlotHeight}px`,
                            height: `${
                              (times.findIndex((t) => t === shipment.time_end) -
                                index) *
                              timeSlotHeight
                            }px`,
                            width: '100%'
                          }}
                          onClick={() => handleShipmentClick(shipment)}
                        >
                          <p className="text-[15px] text-gray-900 font-medium p-1 bg-gray-200 bg-opacity-75 rounded">
                            {shipment.name}
                          </p>
                        </div>
                      )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      <ModalShipment
        activeShipment={activeShipment}
        closeModal={closeModal}
        showConfirmDelete={showConfirmDelete}
        setShowConfirmDelete={setShowConfirmDelete}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default CalendarResponsive
