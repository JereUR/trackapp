import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ShipmentGroup, times, ShipmentItem } from '@/components/types/Shipment'
import { BiEdit, BiTrash } from 'react-icons/bi'

interface CalendarProps {
  shipmentGroup: ShipmentGroup
}

const Calendar: React.FC<CalendarProps> = ({ shipmentGroup }) => {
  const fleetIdToColor: Record<number, string> = {
    1: 'bg-red-500 border-none',
    2: 'bg-green-500 border-none'
  }

  const [shipmentToDelete, setShipmentToDelete] = useState<ShipmentItem | null>(
    null
  )
  const [showConfirmDelete, setShowConfirmDelete] = useState<boolean>(false)

  const router = useRouter()

  const closeModal = () => {
    setShowConfirmDelete(false)
  }

  const handleClickDelete = ({ shipment }: { shipment: ShipmentItem }) => {
    setShipmentToDelete(shipment)
    setShowConfirmDelete(true)
  }

  const handleDelete = () => {
    console.log('Deleting shipment:', shipmentToDelete?.name)
    closeModal()
  }

  return (
    <div className="p-2 md:p-6 my-4 md:my-8 bg-gray-50 dark:bg-slate-800 shadow-lg rounded-lg">
      <div className="mb-4">
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {shipmentGroup.date}
        </p>
      </div>
      <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-track-rounded scrollbar-thumb-gray-400 dark:scrollbar-thumb-gray-700">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-100 dark:bg-slate-900">
            <tr>
              <th className="sticky left-0 z-10 bg-gray-200 dark:bg-slate-900 py-3 md:px-2 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider max-w-[90px] md:max-w-xs whitespace-normal">
                <span className="block md:hidden">Envio \ Horario</span>
                <span className="hidden md:block">
                  Nombre del Envio \ Horario
                </span>
              </th>
              {times.map((time) => (
                <th
                  key={time}
                  className="md:px-2 py-3 text-left text-xs font-medium bg-gray-200 dark:bg-slate-900 text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  {time}
                </th>
              ))}
              <th className="sticky right-0 z-10 bg-gray-200 dark:bg-slate-900 md:px-2 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider max-w-[90px] md:max-w-xs whitespace-normal">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            {shipmentGroup.shipments.map((shipment) => {
              let paintCell = false
              let lastPaint = false

              return (
                <tr key={shipment.id}>
                  <td className="sticky left-0 z-10 bg-gray-200 dark:bg-slate-900  md:px-1 py-4 text-sm font-medium text-gray-900 dark:text-gray-300 tracking-wider max-w-[90px] md:max-w-xs whitespace-normal">
                    {shipment.name}
                  </td>
                  {times.map((time) => {
                    if (lastPaint) paintCell = false
                    if (shipment.time_start === time) {
                      paintCell = true
                      lastPaint = false
                    }
                    if (shipment.time_end === time) lastPaint = true

                    return (
                      <td
                        key={time}
                        className={`${
                          paintCell
                            ? fleetIdToColor[shipment.fleet_id]
                            : 'bg-background'
                        }  md:px-1 py-4 whitespace-nowrap`}
                      ></td>
                    )
                  })}
                  <td className="sticky right-0 z-10 bg-gray-200 dark:bg-slate-900 md:px-1 tracking-wider max-w-[90px] md:max-w-xs whitespace-normal">
                    <div className="flex justify-center gap-2">
                      <button
                        className="bg-transparent text-white py-2 rounded"
                        onClick={() =>
                          router.push(
                            `/panel-de-control/envios/editar/${shipment.id}`
                          )
                        }
                      >
                        <BiEdit className="h-4 w-4 md:h-5 md:w-5 text-blue-600 dark:text-blue-500 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-blue-800 dark:hover:text-blue-700" />
                      </button>
                      <button
                        className="bg-transparent text-white py-2 rounded"
                        onClick={() => handleClickDelete({ shipment })}
                      >
                        <BiTrash className="h-4 w-4 md:h-5 md:w-5 text-red-600 dark:text-red-500 transition duration-300 ease-in-out hover:scale-[1.07] hover:text-red-800 dark:hover:text-red-700" />
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-card text-foreground p-6 rounded-lg shadow-lg w-3/4 md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">
              Confirmar eliminación
            </h4>
            <p>
              ¿Estás seguro de que deseas eliminar el envío{' '}
              {`'${shipmentToDelete?.name}'`}?
            </p>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded"
                onClick={() => setShowConfirmDelete(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={handleDelete}
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
