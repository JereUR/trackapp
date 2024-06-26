'use client'

import { FaEdit } from 'react-icons/fa'
import { RxPinBottom, RxPinTop } from 'react-icons/rx'
import { useState } from 'react'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

import { Fleet, initialDataUpdate, PropsUpdateFleet } from '../types/Fleet'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { Button } from '../ui/button'
import useUser from '../hooks/useUser'
import ErrorText from '../ErrorText'

interface Props {
  fleet: Fleet
}

const FleetItem: React.FC<Props> = ({ fleet }) => {
  const [dataFleet, setDataFleet] =
    useState<PropsUpdateFleet>(initialDataUpdate)
  const [errorEdit, setErrorEdit] = useState<string | null>(null)
  const [showEditForm, setShowEditForm] = useState<boolean>(false)

  const { updateWorkingFleet, updateFleet } = useUser()

  const handleEditClick = () => {
    setDataFleet({
      id: fleet.id,
      name: fleet.name,
      description: fleet?.description
    })
    setShowEditForm(!showEditForm)
  }

  const handleSave = async () => {
    if (dataFleet.name != '') {
      const res = await updateFleet({ dataFleet })
      if (res) setShowEditForm(false)
    } else {
      setErrorEdit('El nombre no puede ser vacio')
    }
  }

  return (
    <Card
      className={`flex flex-col md:flex-row justify-between bg-card m-2 md:m-8 p-2 md:p-4  border-gray-400 dark:border-accent shadow-md ${
        !fleet.gps && 'opacity-60'
      }`}
    >
      <div>
        <CardHeader>
          <CardTitle className="flex gap-6 items-center">
            <p className="text-lg md:text-2xl font-bold">{fleet.name}</p>
            {fleet.on_working_area ? (
              <p className="text-sm md:text-base text-foreground font-normal py-2 px-4 rounded-full bg-orange-500 opacity-90">
                Area de trabajo activa
              </p>
            ) : (
              <p
                className="text-sm md:text-base text-foreground font-normal py-2 px-4 rounded-full bg-gray-500 opacity-90"
                style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.3)' }}
              >
                Area de trabajo inactiva
              </p>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex">
          <div className="flex flex-col gap-6 justify-start">
            <p className="text-sm italic text-gray-400">
              {fleet.description ? fleet.description : 'Sin descripción'}
            </p>
            <span className="py-2 underline w-fit rounded-full text-foreground font-semibold">
              Estado: {fleet.gps ? 'Activo' : 'Sin GPS asignado'}
            </span>
          </div>
        </CardContent>
      </div>
      <div className="flex flex-col gap-4 md:gap-6 mx-4 mb-2 md:my-auto md:mr-10">
        <Button
          className="text-sm md:text-base flex items-center gap-2 border-none bg-sky-500 hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-700  text-foreground font-bold"
          disabled={!fleet.gps}
          onClick={handleEditClick}
        >
          <FaEdit /> Editar{' '}
          {showEditForm ? (
            <MdExpandLess className="h-5 w-5" />
          ) : (
            <MdExpandMore className="h-5 w-5" />
          )}
        </Button>
        {showEditForm && (
          <div className="absolute mt-12 bg-card border rounded-lg shadow-md p-4 w-72 z-10">
            <div className="flex flex-col gap-4">
              <label className="font-semibold text-sm">
                Nombre{'  '}
                {errorEdit && <ErrorText text={errorEdit} />}
                <input
                  className="mt-1 p-2 border rounded w-full"
                  name="name"
                  value={dataFleet.name}
                  onChange={(e) =>
                    setDataFleet({ ...dataFleet, name: e.target.value })
                  }
                />
              </label>
              <label className="font-semibold text-sm">
                Descripción
                <textarea
                  className="mt-1 p-2 border rounded w-full"
                  value={dataFleet.description}
                  onChange={(e) =>
                    setDataFleet({ ...dataFleet, description: e.target.value })
                  }
                />
              </label>
              <Button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
                onClick={handleSave}
              >
                Guardar
              </Button>
            </div>
          </div>
        )}
        <Button
          className={`border-none text-sm md:text-base font-bold text-foreground ${
            fleet.on_working_area
              ? 'transition duration-300 ease-in-out bg-red-500 hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700'
              : 'transition duration-300 ease-in-out bg-green-500 hover:bg-green-600 dark:bg-green-600  dark:hover:bg-green-700'
          }`}
          disabled={!fleet.gps}
          onClick={() => updateWorkingFleet({ id: fleet.id })}
        >
          {fleet.on_working_area ? (
            <RxPinBottom className="h-5 w-5 mr-2" />
          ) : (
            <RxPinTop className="h-5 w-5 mr-2" />
          )}
          {fleet.on_working_area
            ? 'Salir de area de trabajo'
            : 'Ingresar a area de trabajo'}
        </Button>
      </div>
    </Card>
  )
}

export default FleetItem
