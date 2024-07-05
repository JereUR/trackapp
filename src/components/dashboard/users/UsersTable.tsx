'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { FaEdit, FaTrash } from 'react-icons/fa'
import useUser from '@/components/hooks/useUser'
import Search from '@/components/search/Search'
import SelectItemsPerPage from '../SelectedItemsPerPage'
import { Button } from '@/components/ui/button'
import { CgAdd } from 'react-icons/cg'
import SelectedUsersActions from './SelectedUsersActions'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import Loader from '@/components/Loader'
import Pagination from '@/components/pagination/Pagination'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

const UsersTable = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(5)
  const [showConfirmDeleteMap, setShowConfirmDeleteMap] = useState<{
    [key: number]: boolean
  }>({})

  const router = useRouter()

  const searchParams = useSearchParams()
  const { token, getUsers, users, deleteUsersById, loadingUsers, count } =
    useUser()

  useEffect(() => {
    if (token) {
      const q = searchParams.get('q') || ''
      const page = searchParams.get('page') || '1'
      getUsers({
        q,
        page,
        ITEMS_PER_PAGE: selectedItemsPerPage
      })
    }
  }, [searchParams, token, selectedItemsPerPage])

  const handleDelete = async (user: number) => {
    const usersToDelete = [user]

    const res = await deleteUsersById({ users: usersToDelete })

    if (res) {
      setShowConfirmDeleteMap((prevState) => ({
        ...prevState,
        [user]: false
      }))
      window.location.reload()
    }
  }

  const handleConfirmDelete = (userId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [userId]: true
    }))
  }

  const handleCancelDelete = (userId: number) => {
    setShowConfirmDeleteMap((prevState) => ({
      ...prevState,
      [userId]: false
    }))
  }

  const handleSelectAllChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked
    setSelectAll(checked)

    if (checked) {
      setSelectedUsers(users.map((user) => user.id))
    } else {
      setSelectedUsers([])
    }
  }

  const handleCheckboxChange = (
    userId: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const checked = event.target.checked
    const newSelectedUsers = checked
      ? [...selectedUsers, userId]
      : selectedUsers.filter((id) => id !== userId)

    setSelectedUsers(newSelectedUsers)
  }

  return (
    <div className="container bg-background p-1 rounded-lg mt-10">
      <div className="flex items-center justify-between my-4">
        <div className="flex justify-center gap-2">
          <Search placeholder="Buscar un usuario..." />
          <SelectItemsPerPage
            selectedItemsPerPage={selectedItemsPerPage}
            setSelectedItemsPerPage={setSelectedItemsPerPage}
          />
        </div>
        <div className="flex justify-center gap-4">
          <Button className="bg-green-500 mx-8 md:mr-8 transition duration-300 ease-in-out hover:bg-green-600 hover:scale-[1.05] text-foreground">
            <Link href={'/panel-de-control/usuarios/agregar'}>
              <p className="flex gap-2 items-center text-lg font-semibold">
                <CgAdd className="h-6 w-6" />
                Agregar
              </p>
            </Link>
          </Button>
          {selectedUsers.length > 0 && (
            <SelectedUsersActions
              selectedUsers={selectedUsers}
              setSelectedUsers={setSelectedUsers}
            />
          )}
        </div>
      </div>

      {loadingUsers && users ? (
        <TableSkeleton />
      ) : (
        <table className="transactions-table w-full mb-4 mt-8">
          <thead className="font-bold text-center text-muted bg-foreground text-xs xl:text-sm">
            <tr>
              <td className="px-2 py-5">
                <input
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAllChange}
                  className="cursor-pointer h-5 w-5"
                />
              </td>
              <td className="px-2 py-5">Nombre</td>
              <td className="px-2 py-5">Apellido</td>
              <td className="px-2 py-5">Email</td>
              <td className="px-2 py-5">Teléfono</td>

              <td className="px-2 py-5">Género</td>

              <td className="px-2 py-5">Fecha de nacimiento</td>

              <td className="px-2 py-5">Rol</td>

              <td className="px-2 py-5">Acción</td>
            </tr>
          </thead>
          {users.length > 0 ? (
            <tbody className="text-foreground text-xs xl:text-sm font-light">
              {users.map((user) => (
                <tr
                  key={user.id}
                  className={`my-4 transition duration-300 ease-in-out hover:bg-muted cursor-pointer items-center text-center ${
                    selectedUsers.includes(user.id) &&
                    'bg-gray-300 dark:bg-gray-700'
                  }`}
                >
                  <td className="border-b border-foreground px-2 py-5">
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(event) => handleCheckboxChange(user.id, event)}
                      className="cursor-pointer h-5 w-5"
                    />
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(`/panel-de-control/usuarios/${user.id}`)
                    }
                  >
                    {user.first_name}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(`/panel-de-control/usuarios/${user.id}`)
                    }
                  >
                    {user.last_name}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(`/panel-de-control/usuarios/${user.id}`)
                    }
                  >
                    {user.email}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(`/panel-de-control/usuarios/${user.id}`)
                    }
                  >
                    {user.phone ? user.phone : '-'}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(`/panel-de-control/usuarios/${user.id}`)
                    }
                  >
                    {user.gender ? user.gender : '-'}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(`/panel-de-control/usuarios/${user.id}`)
                    }
                  >
                    {user.date ? user.date : '-'}
                  </td>
                  <td
                    className="border-b border-foreground px-2 py-5"
                    onClick={() =>
                      router.push(`/panel-de-control/usuarios/${user.id}`)
                    }
                  >
                    {user.role}
                  </td>
                  <td className="border-b border-foreground px-2 py-5">
                    <div className="flex justify-center gap-2">
                      <div>
                        <Link
                          href={`/panel-de-control/usuarios/editar/${user.id}`}
                        >
                          <button className="p-2 rounded-lg text-white bg-sky-600 border-none cursor-pointer transitiopn duration-300 ease-in-out hover:scale-105 hover:shadow-md">
                            <FaEdit />
                          </button>
                        </Link>
                      </div>
                      <div>
                        <button
                          className="p-2 rounded-lg text-white bg-red-600 border-none cursor-pointer transitiopn duration-300 ease-in-out  hover:scale-105 hover:shadow-md"
                          onClick={() => handleConfirmDelete(user.id)}
                        >
                          <FaTrash />
                        </button>
                        {showConfirmDeleteMap[user.id] && (
                          <div className="fixed top-0 left-0 w-full h-full bg-black/30 z-50 flex justify-center items-center">
                            <div className="flex flex-col gap-4 justify-center items-center bg-background border border-blue-600 p-8 rounded-lg shadow-md">
                              <p>
                                {`¿Está seguro de que desea eliminar la actividad '
                                ${user.first_name}'?`}
                              </p>
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="secondary"
                                  onClick={() => handleCancelDelete(user.id)}
                                >
                                  Cancelar
                                </Button>
                                <Button onClick={() => handleDelete(user.id)}>
                                  {loadingUsers ? <Loader /> : 'Confirmar'}
                                </Button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className="text-center">
              <tr>
                <td className="py-4 text-lg font-light italic border-b">
                  Sin usuarios.
                </td>
              </tr>
            </tbody>
          )}
        </table>
      )}
      <Pagination count={count} ITEMS_PER_PAGE={selectedItemsPerPage} />
    </div>
  )
}

export default UsersTable
