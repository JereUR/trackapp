import { useState, Dispatch, SetStateAction } from 'react'
import { Button } from '@/components/ui/button'
import { CgAdd } from 'react-icons/cg'
import { BiEdit, BiTrash } from 'react-icons/bi'
import { Cross1Icon } from '@radix-ui/react-icons'

import {
  FormErrorsCargo,
  FormErrorsDeliveryPoint,
  initialCargo,
  initialDeliveryData,
  initialErrorsCargo,
  initialErrorsDeliveryPoint,
  PropsAddCargo,
  PropsAddDeliveryPoint,
  PropsAddShipment
} from '@/components/types/Shipment'
import ErrorText from '@/components/ErrorText'
import { MdEditLocationAlt } from 'react-icons/md'
import { TbMapPinCheck } from 'react-icons/tb'

interface Props {
  dataShipment: PropsAddShipment
  setDataShipment: Dispatch<SetStateAction<PropsAddShipment>>
  dataDeliveryPoint: PropsAddDeliveryPoint
  setDataDeliveryPoint: Dispatch<SetStateAction<PropsAddDeliveryPoint>>
  mapRef: React.RefObject<any>
}

const DeliveryPointsForm: React.FC<Props> = ({
  dataShipment,
  setDataShipment,
  dataDeliveryPoint,
  setDataDeliveryPoint,
  mapRef
}) => {
  const [dataCargo, setDataCargo] = useState<PropsAddCargo>(initialCargo)
  const [editIndex, setEditIndex] = useState<number | null>(null)
  const [editCargoIndex, setEditCargoIndex] = useState<number | null>(null)
  const [showDeliveryForm, setShowDeliveryForm] = useState<boolean>(false)
  const [showCargoForm, setShowCargoForm] = useState<boolean>(false)
  const [markerOnEdit, setMarkerOnEdit] = useState<boolean>(false)
  const [locationConfirm, setLocationConfirm] = useState<boolean>(false)

  const [formErrorsDeliveryPoint, setFormErrorsDeliveryPoint] =
    useState<FormErrorsDeliveryPoint>(initialErrorsDeliveryPoint)
  const [formErrorsCargo, setFormErrorsCargo] =
    useState<FormErrorsCargo>(initialErrorsCargo)

  /* Cargo handlers */

  const validationsCargo = () => {
    const errorsForm: FormErrorsCargo = {}

    if (!dataCargo.product.trim()) {
      errorsForm.product = 'Debe ingresar un producto.'
    }

    if (!dataCargo.quantity) {
      errorsForm.quantity = `Este campo no debe ser vacío o igual a 0.`
    } else if (dataCargo.quantity <= 0) {
      errorsForm.quantity = 'Este valor debe ser mayor a 0.'
    }

    return errorsForm
  }

  const handleCargoInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataCargo({ ...dataCargo, [name]: value })
    setFormErrorsCargo({ ...formErrorsCargo, [name]: '' })
  }

  const handleAddCargoToDeliveryPoint = () => {
    const err = validationsCargo()
    setFormErrorsCargo(err)

    if (Object.keys(err).length === 0) {
      if (editCargoIndex !== null) {
        const updatedCargo = [...dataDeliveryPoint.cargo]
        updatedCargo[editCargoIndex] = dataCargo

        setDataDeliveryPoint({
          ...dataDeliveryPoint,
          cargo: updatedCargo
        })
      } else {
        setDataDeliveryPoint({
          ...dataDeliveryPoint,
          cargo: [...dataDeliveryPoint.cargo, dataCargo]
        })
      }

      setDataCargo(initialCargo)
      setShowCargoForm(false)
      setEditCargoIndex(null)
      setFormErrorsDeliveryPoint({
        ...formErrorsDeliveryPoint,
        delivery_point: ''
      })
    }
  }

  const handleEditCargo = (index: number) => {
    setDataCargo(dataDeliveryPoint.cargo[index])
    setShowCargoForm(true)
    setEditCargoIndex(index)
  }

  const handleDeleteCargo = (index: number) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar la carga del producto '${dataDeliveryPoint.cargo[index].product}'?`
      )
    ) {
      setDataDeliveryPoint({
        ...dataDeliveryPoint,
        cargo: dataDeliveryPoint.cargo.filter((_, i) => i !== index)
      })
    }
  }

  /* Delivery point handlers */

  const validationsDeliveryPoint = () => {
    const errorsForm: FormErrorsDeliveryPoint = {}

    if (!dataDeliveryPoint.name.trim()) {
      errorsForm.name = 'Debe ingresar un nombre.'
    }

    if (!locationConfirm || !dataDeliveryPoint.destination) {
      errorsForm.destination = 'Debe seleccionar una ubicación.'
    }

    return errorsForm
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataDeliveryPoint({ ...dataDeliveryPoint, [name]: value })
    setFormErrorsDeliveryPoint({ ...formErrorsDeliveryPoint, [name]: '' })
  }

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setDataDeliveryPoint({ ...dataDeliveryPoint, [name]: value })
  }

  const handleEditDeliveryPoint = (index: number) => {
    setDataDeliveryPoint(dataShipment.delivery_points[index])
    setShowDeliveryForm(true)
    setEditIndex(index)
    setLocationConfirm(true)
  }

  const handleDeleteDeliveryPoint = (index: number) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar el punto de entrega '${dataShipment.delivery_points[index].name}'?`
      )
    ) {
      setDataShipment({
        ...dataShipment,
        delivery_points: dataShipment.delivery_points.filter(
          (_, i) => i !== index
        )
      })
    }
  }

  const handleAddMarker = () => {
    setDataDeliveryPoint({
      ...dataDeliveryPoint,
      destination: mapRef.current.getCenter()
    })
    setMarkerOnEdit(true)
  }

  const handleCancel = () => {
    setMarkerOnEdit(false)
    setLocationConfirm(false)
    setDataDeliveryPoint({ ...dataDeliveryPoint, destination: null })
  }

  const handleConfirm = () => {
    setMarkerOnEdit(false)
    setLocationConfirm(true)
    setFormErrorsDeliveryPoint({ ...formErrorsDeliveryPoint, destination: '' })
  }

  const handleAddDeliveryPoint = () => {
    const err = validationsDeliveryPoint()
    setFormErrorsDeliveryPoint(err)

    if (Object.keys(err).length === 0) {
      if (dataDeliveryPoint.cargo.length === 0) {
        setFormErrorsDeliveryPoint({
          ...formErrorsDeliveryPoint,
          delivery_point: 'No se puede agregar un punto de entrega sin cargas.'
        })
        return
      }

      if (editIndex !== null) {
        const updatedDeliveryPoints = [...dataShipment.delivery_points]
        updatedDeliveryPoints[editIndex] = dataDeliveryPoint

        setDataShipment({
          ...dataShipment,
          delivery_points: updatedDeliveryPoints
        })
      } else {
        setDataShipment({
          ...dataShipment,
          delivery_points: [...dataShipment.delivery_points, dataDeliveryPoint]
        })
      }

      setDataDeliveryPoint(initialDeliveryData)
      setShowDeliveryForm(false)
      setFormErrorsDeliveryPoint(initialErrorsDeliveryPoint)
      setEditIndex(null)
      setMarkerOnEdit(false)
      setLocationConfirm(false)
    }
  }

  return (
    <div>
      {!showDeliveryForm ? (
        <div
          className="w-full border border-gray-400 dark:border-gray-700 mb-2 p-2 rounded-md cursor-pointer animate-custom-pulse transition ease-in-out duration-700 hover:scale-[1.02]"
          onClick={() => setShowDeliveryForm(true)}
        >
          <div className="flex items-center justify-center">
            <p>
              <CgAdd className="h-8 w-8" />
            </p>
            <p className="ml-2">Agregar punto de entrega</p>
          </div>
        </div>
      ) : (
        <div className="p-4 border border-gray-400 dark:border-gray-700 w-full rounded-md ">
          <div className="flex justify-end">
            <Cross1Icon
              className="h-5 w-5 text-red-700 cursor-pointer"
              onClick={() => setShowDeliveryForm(false)}
            />
          </div>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="flex gap-4 items-center">
                <label htmlFor="name" className="font-light text-foreground">
                  Nombre
                </label>
                {formErrorsDeliveryPoint.name && (
                  <ErrorText text={formErrorsDeliveryPoint.name} />
                )}
              </div>
              <input
                type="text"
                id="name"
                name="name"
                value={dataDeliveryPoint.name}
                onChange={handleInputChange}
                className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="font-light text-foreground"
              >
                Descripción
              </label>
              <textarea
                id="description"
                name="description"
                value={dataDeliveryPoint.description}
                onChange={handleTextAreaChange}
                rows={1}
                className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
            </div>
          </div>
          <div className="flex gap-4 items-center">
            <label htmlFor="destination" className="font-light text-foreground">
              Ubicación destino
            </label>
            {formErrorsDeliveryPoint.destination && (
              <ErrorText text={formErrorsDeliveryPoint.destination} />
            )}
          </div>
          <div className="flex w-full justify-between items-center mt-2 mb-6">
            <div className="flex gap-4">
              <Button
                type="button"
                disabled={markerOnEdit}
                className="flex gap-2 items-center bg-sky-500 text-foreground transition duration-300 ease-in-out hover:bg-sky-600"
                onClick={handleAddMarker}
              >
                <MdEditLocationAlt className="h-5 w-5" /> Marcar en el mapa
              </Button>
              {markerOnEdit && (
                <div className="flex gap-2">
                  <Button
                    type="button"
                    onClick={handleCancel}
                    className="p-2 bg-red-600 text-foreground mb-4 transition duration-300 ease-in-out hover:bg-red-700"
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="button"
                    className="bg-green-500 text-foreground mb-4 transition duration-300 ease-in-out hover:bg-green-600"
                    onClick={handleConfirm}
                  >
                    Confirmar
                  </Button>
                </div>
              )}
            </div>

            {locationConfirm && (
              <div className="flex items-center gap-2 p-4 border border-gray-400 dark:border-gray-700 rounded-md">
                <TbMapPinCheck className="h-5 w-5 text-green-500" />
                <p>Ubicación agregada</p>
              </div>
            )}
          </div>
          <div className="p-4 border border-gray-400 dark:border-gray-700 rounded-lg mb-4">
            <div className="mb-4">
              <div className="flex gap-4 items-center mb-4">
                <p className="font-light text-foreground">Cargas</p>
                {formErrorsDeliveryPoint.delivery_point && (
                  <ErrorText text={formErrorsDeliveryPoint.delivery_point} />
                )}
              </div>
              <div className="flex flex-col gap-2">
                {dataDeliveryPoint.cargo.map((cargo, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center border border-green-200 dark:border-green-900 p-2 mx-8 rounded-md mb-2"
                  >
                    <p>
                      {cargo.product} - {cargo.quantity}
                    </p>
                    <div className="flex gap-2 max-w-fit mr-4">
                      <BiEdit
                        className="h-5 w-5 cursor-pointer text-blue-500 transition duration-300 ease-in-out hover:text-blue-700"
                        onClick={() => handleEditCargo(index)}
                      />
                      <BiTrash
                        className="h-5 w-5 cursor-pointer text-red-500 transition duration-300 ease-in-out hover:text-red-700"
                        onClick={() => handleDeleteCargo(index)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="mb-4">
              {!showCargoForm ? (
                <div
                  className="w-full border border-gray-400 dark:border-gray-700 mb-2 p-2 rounded-md cursor-pointer animate-custom-pulse transition ease-in-out duration-700 hover:scale-[1.02]"
                  onClick={() => setShowCargoForm(true)}
                >
                  <div className="flex items-center justify-center">
                    <p>
                      <CgAdd className="h-8 w-8" />
                    </p>
                    <p className="ml-2">Agregar carga</p>
                  </div>
                </div>
              ) : (
                <div className="p-4 border border-gray-400 dark:border-gray-700 w-full rounded-md">
                  <div className="flex justify-end">
                    <Cross1Icon
                      className="h-5 w-5 text-red-700 cursor-pointer"
                      onClick={() => setShowCargoForm(false)}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="mb-2">
                      <div className="flex gap-4 items-center">
                        <label
                          htmlFor="quantity"
                          className="font-light text-foreground"
                        >
                          Cantidad
                        </label>
                        {formErrorsCargo.quantity && (
                          <ErrorText text={formErrorsCargo.quantity} />
                        )}
                      </div>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={dataCargo.quantity}
                        onChange={handleCargoInputChange}
                        className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                    <div className="mb-2">
                      <div className="flex gap-4 items-center">
                        <label
                          htmlFor="cargo"
                          className="font-light text-foreground"
                        >
                          Tipo de carga (producto)
                        </label>
                        {formErrorsCargo.product && (
                          <ErrorText text={formErrorsCargo.product} />
                        )}
                      </div>
                      <input
                        type="text"
                        id="cargo"
                        name="product"
                        value={dataCargo.product}
                        onChange={handleCargoInputChange}
                        className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <Button
                      onClick={handleAddCargoToDeliveryPoint}
                      className="text-foreground bg-green-500 transition duration-300 ease-in-out hover:bg-green-600"
                    >
                      Agregar carga
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-start">
            <Button
              onClick={handleAddDeliveryPoint}
              className="text-foreground bg-green-500 transition duration-300 ease-in-out hover:bg-green-600"
            >
              Agregar punto de entrega
            </Button>
          </div>
        </div>
      )}
      {dataShipment.delivery_points.length > 0 && (
        <div className="mt-4">
          {dataShipment.delivery_points.map((point, index) => (
            <div
              key={index}
              className="flex justify-between items-center border p-2 rounded-md mb-2"
            >
              <div className="flex flex-col gap-2">
                <p className="flex gap-1 items-center">
                  <p className="text-green-600">{index + 1}.</p>
                  <p className="text-lg font-medium">{point.name}</p>
                </p>
                <p className="text-gray-500 italic text-sm">
                  {point.description}
                </p>
                <p className="underline font-semibold ml-2">Cargas:</p>
                {point.cargo.map((cargo, i) => (
                  <p key={i} className="text-sm ml-4">
                    {i + 1}. {cargo.product} - {cargo.quantity}
                  </p>
                ))}
              </div>
              <div className="flex flex-col gap-2 max-w-fit mr-4">
                <Button
                  className="text-white bg-blue-500 transition duration-300 ease-in-out hover:bg-blue-700"
                  onClick={() => handleEditDeliveryPoint(index)}
                >
                  <BiEdit className="h-5 w-5" />
                </Button>
                <Button
                  className="text-white bg-red-500 transition duration-300 ease-in-out hover:bg-red-700"
                  onClick={() => handleDeleteDeliveryPoint(index)}
                >
                  <BiTrash className="h-5 w-5" />
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
