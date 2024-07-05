'use client'

import useUser from '@/components/hooks/useUser'
import Loader from '@/components/Loader'
import { Button } from '@/components/ui/button'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FaTrash } from 'react-icons/fa'
import { MdExpandLess, MdExpandMore } from 'react-icons/md'

interface Props {
  selectedUsers: number[]
  setSelectedUsers: Dispatch<SetStateAction<number[]>>
}

const SelectedUsersActions: React.FC<Props> = ({
  selectedUsers,
  setSelectedUsers
}) => {
  const [showConfirmMultipleDelete, setShowConfirmMultipleDelete] =
    useState<boolean>(false)

  const { deleteUsersById, loadingUsers } = useUser()

  const handleConfirmMultipleDelete = () => {
    setShowConfirmMultipleDelete(true)
  }

  const handleCancelMultipleDelete = () => {
    setShowConfirmMultipleDelete(false)
  }

  const handleDelete = async () => {
    const res = await deleteUsersById({ users: selectedUsers })

    if (res) {
      setShowConfirmMultipleDelete(false)
      setSelectedUsers([])
      window.location.reload()
    }
  }

  return (
    <div className="flex gap-4">
      <div>
        <Button
          className="flex items-center text-foreground font-semibold gap-2 py-2 px-4 h-10 rounded-lg border-none bg-red-600 transition duration-300 ease-in-out hover:bg-red-700"
          onClick={handleConfirmMultipleDelete}
        >
          ({selectedUsers.length}) <FaTrash />
        </Button>
        {showConfirmMultipleDelete && (
          <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex justify-center items-center">
            <div className="flex flex-col gap-4 justify-center items-center bg-background border border-blue-600 p-8 rounded-lg shadow-md">
              <p>
                {`¿Está seguro de que desea eliminar las ${selectedUsers.length} actividades seleccionadas?`}
              </p>
              <div className="flex justify-end gap-2">
                <Button
                  variant="secondary"
                  onClick={handleCancelMultipleDelete}
                >
                  Cancelar
                </Button>
                <Button onClick={handleDelete}>
                  {loadingUsers ? <Loader /> : 'Confirmar'}
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default SelectedUsersActions
