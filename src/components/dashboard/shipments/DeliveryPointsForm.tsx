import { useState, Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { CgAdd } from 'react-icons/cg'

import {
  initialCargo,
  initialDeliveryData,
  PropsAddCargo,
  PropsAddDeliveryPoint,
  PropsAddShipment
} from '@/components/types/Shipment'

interface Props {
  dataShipment: PropsAddShipment
  setDataShipment: Dispatch<SetStateAction<PropsAddShipment>>
  mapRef: React.RefObject<undefined>
}

const DeliveryPointsForm: React.FC<Props> = ({
  dataShipment,
  setDataShipment,
  mapRef
}) => {
  const [dataDeliveryPoint, setDataDeliveryPoint] =
    useState<PropsAddDeliveryPoint>(initialDeliveryData)
  const [dataCargo, setDataCargo] = useState<PropsAddCargo>(initialCargo)
  const [showDeliveryForm, setShowDeliveryForm] = useState<boolean>(false)
  const [showCargoForm, setShowCargoForm] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  const handleCargoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataCargo({ ...dataCargo, [name]: value })
  }

  const handleAddCargoToDeliveryPoint = () => {
    setDataDeliveryPoint({
      ...dataDeliveryPoint,
      cargo: [...dataDeliveryPoint.cargo, dataCargo]
    })
    setDataCargo(initialCargo)
    setShowCargoForm(false)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataDeliveryPoint({ ...dataDeliveryPoint, [name]: value })
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDataDeliveryPoint({ ...dataDeliveryPoint, [name]: value })
  }

  const handleAddDeliveryPoint = () => {
    if (dataDeliveryPoint.cargo.length === 0) {
      setError('No se puede agregar un punto de entrega sin cargas.')
      return
    }

    setDataShipment({
      ...dataShipment,
      delivery_points: [...dataShipment.delivery_points, dataDeliveryPoint]
    })
    setDataDeliveryPoint(initialDeliveryData)
    setShowDeliveryForm(false)
    setError('')
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-6">Puntos de entrega</h1>
      <div
        className="w-full border mb-4 p-4 rounded-md cursor-pointer"
        onClick={() => setShowDeliveryForm(true)}
      >
        <div className="flex items-center justify-center">
          <p>
            <CgAdd className="h-8 w-8" />
          </p>
          <p className="ml-2">Agregar punto de entrega</p>
        </div>
      </div>
      {showDeliveryForm && (
        <div className="p-4 border w-full rounded-md">
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Nombre
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={dataDeliveryPoint.name}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={dataDeliveryPoint.description}
                onChange={handleTextAreaChange}
                className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="mb-4">
            <p className="block text-sm font-medium text-gray-700">Cargas:</p>
            <ul className="list-disc list-inside">
              {dataDeliveryPoint.cargo.map((cargo, index) => (
                <li key={index}>
                  {cargo.product} - {cargo.quantity}
                </li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <div
              className="w-full border mb-2 p-2 rounded-md cursor-pointer"
              onClick={() => setShowCargoForm(true)}
            >
              <div className="flex items-center justify-center">
                <p>
                  <CgAdd className="h-8 w-8" />
                </p>
                <p className="ml-2">Agregar carga</p>
              </div>
            </div>
            {showCargoForm && (
              <div className="p-4 border w-full rounded-md">
                <div className="grid grid-cols-2 gap-4">
                  <div className="mb-2">
                    <label
                      htmlFor="cargo"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Tipo de carga
                    </label>
                    <input
                      type="text"
                      id="cargo"
                      name="product"
                      value={dataCargo.product}
                      onChange={handleCargoInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  <div className="mb-2">
                    <label
                      htmlFor="quantity"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Cantidad
                    </label>
                    <input
                      type="number"
                      id="quantity"
                      name="quantity"
                      value={dataCargo.quantity}
                      onChange={handleCargoInputChange}
                      className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
                <div>
                  <Button
                    onClick={handleAddCargoToDeliveryPoint}
                    className="w-full"
                  >
                    Agregar carga
                  </Button>
                </div>
              </div>
            )}
          </div>
          {error && <p className="text-red-500 mb-2">{error}</p>}
          <div>
            <Button onClick={handleAddDeliveryPoint} className="w-full">
              Agregar punto de entrega
            </Button>
          </div>
        </div>
      )}
      {dataShipment.delivery_points.length > 0 && (
        <div className="mt-4">
          {dataShipment.delivery_points.map((point, index) => (
            <div key={index} className="border p-2 rounded-md mb-2">
              <p>
                {index + 1}. {point.name}
              </p>
              <div>
                <Button
                  className="text-white bg-red-500 hover:bg-red-700"
                  onClick={() => {
                    setDataShipment({
                      ...dataShipment,
                      delivery_points: dataShipment.delivery_points.filter(
                        (p, i) => i !== index
                      )
                    })
                  }}
                >
                  Eliminar
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default DeliveryPointsForm
