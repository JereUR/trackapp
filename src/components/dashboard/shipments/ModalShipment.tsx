import { Cross1Icon } from '@radix-ui/react-icons'
import { useRouter } from 'next/navigation'
import React, { Dispatch, SetStateAction } from 'react'

import { ShipmentItem } from '@/components/types/Shipment'

interface Props {
  activeShipment: ShipmentItem | null
  closeModal: () => void
  showConfirmDelete: boolean
  setShowConfirmDelete: Dispatch<SetStateAction<boolean>>
  handleDelete: () => void
}

const ModalShipment: React.FC<Props> = ({
  activeShipment,
  closeModal,
  showConfirmDelete,
  setShowConfirmDelete,
  handleDelete
}) => {
  const router = useRouter()

  return (
    <div>
      {activeShipment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-card text-foreground p-6 rounded-lg shadow-lg w-3/4 md:w-1/2 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h4 className="text-xl font-semibold">Detalles de envío</h4>
              <button onClick={closeModal} className="text-red-500">
                <Cross1Icon className="h-5 w-5" />
              </button>
            </div>
            <p>
              <strong>Conductor asignado:</strong>{' '}
              {activeShipment.assigned_driver.first_name}{' '}
              {activeShipment.assigned_driver.last_name}
            </p>
            <div>
              <strong>Puntos de entrega:</strong>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                {activeShipment.delivery_points.map((point, index) => (
                  <div
                    key={index}
                    className="bg-gray-300 dark:bg-gray-700 text-foreground p-4 rounded-lg shadow"
                  >
                    <p>
                      <strong>Nombre:</strong> {point.name}
                    </p>
                    <p>
                      <strong>Carga:</strong>
                    </p>
                    <ul className="list-disc list-inside">
                      {point.cargo.map((item, idx) => (
                        <li key={idx}>
                          {item.quantity} x {item.product}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-end space-x-4 mt-4">
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded"
                onClick={() =>
                  router.push(
                    `/panel-de-control/envios/editar/${activeShipment.id}`
                  )
                }
              >
                Editar
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded"
                onClick={() => setShowConfirmDelete(true)}
              >
                Borrar
              </button>
            </div>
          </div>
        </div>
      )}
      {showConfirmDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75">
          <div className="bg-card text-foreground p-6 rounded-lg shadow-lg w-3/4 md:w-1/3">
            <h4 className="text-lg font-semibold mb-4">
              Confirmar eliminación
            </h4>
            <p>
              ¿Estás seguro de que deseas eliminar el envío{' '}
              {`'${activeShipment?.name}'`}?
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

export default ModalShipment
