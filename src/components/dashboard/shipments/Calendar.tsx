import React, { useState } from 'react'
import { ShipmentGroup, times, ShipmentItem } from '@/components/types/Shipment'
import { Cross1Icon } from '@radix-ui/react-icons'
import ModalShipment from './ModalShipment'

interface CalendarProps {
  shipmentGroup: ShipmentGroup
}

const Calendar: React.FC<CalendarProps> = ({ shipmentGroup }) => {
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

  return (
    <div className="w-full ml-8 mr-12 p-4">
      <div className="border border-gray-300 dark:border-gray-500 p-4 rounded-lg shadow-lg bg-card">
        <h3 className="text-xl font-semibold mb-4 text-gray-500 dark:text-white">
          {shipmentGroup.date}
        </h3>
        <div className="flex border-b border-gray-300 dark:border-gray-500 mb-2">
          {times.map((time, index) => (
            <div
              key={time}
              className="flex-1 text-center py-2"
              style={{ height: `${timeSlotHeight}px` }}
            >
              <div
                className={`text-sm font-semibold text-gray-500 dark:text-white ${
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
                      isInTimeRange
                        ? fleetColor
                        : 'border-gray-300 dark:border-gray-500'
                    }`}
                    style={{
                      marginRight: marginRight,
                      marginLeft: marginLeft,
                      height: `${timeSlotHeight}px`
                    }}
                  ></div>
                )
              })}
              {span > 0 && (
                <div
                  className="absolute top-1/2 transform -translate-y-1/2 flex items-center justify-center cursor-pointer"
                  style={{
                    left: `${(startIndex * 100) / times.length}%`,
                    width: `${(span * 100) / times.length}%`
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

export default Calendar
