'use client'

import React, { useState, useEffect } from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { CgAdd } from 'react-icons/cg'
import { useRouter, useSearchParams } from 'next/navigation'

import useUser from '@/components/hooks/useUser'
import Search from '@/components/search/Search'
import SelectItemsPerPage from '../SelectedItemsPerPage'
import { Button } from '@/components/ui/button'
import SelectedUsersActions from './SelectedUsersActions'
import TableSkeleton from '@/components/skeletons/TableSkeleton'
import Pagination from '@/components/pagination/Pagination'
import { initialDataAddUser, PropsAddUser, User } from '@/components/types/User'
import UserForm from './UserForm'

const UsersTable = () => {
  const [selectedUsers, setSelectedUsers] = useState<number[]>([])
  const [selectAll, setSelectAll] = useState<boolean>(false)
  const [selectedItemsPerPage, setSelectedItemsPerPage] = useState<number>(5)
  const [showConfirmDeleteMap, setShowConfirmDeleteMap] = useState<{
    [key: number]: boolean
  }>({})
  const [showForm, setShowForm] = useState<boolean>(false)
  const [typeForm, setTypeForm] = useState<'add' | 'edit' | ''>('')

  const [dataUser, setDataUser] = useState<PropsAddUser>(initialDataAddUser)

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
      window.location.reload() // Esta línea puede no ser necesaria y deberías considerar otras formas de actualizar los datos después de eliminar.
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

  const handleAdd = () => {
    setShowForm(true)
    setTypeForm('add')
  }

  const handleEdit = async (u: User) => {
    setDataUser({
      id: u.id,
      first_name: u.first_name,
      last_name: u.last_name,
      email: u.email,
      phone: u.phone,
      gender: u.gender ? u.gender : '',
      date: u.date ? new Date(u.date) : new Date(),
      role: u.role
    })
    setShowForm(true)
    setTypeForm('edit')
  }

  return (
    <div className="relative container bg-background p-1 rounded-lg mt-10">
      <div className="mb-8">
        <p className="text-4xl font-light">Usuarios</p>
      </div>
      <div className="flex flex-col md:flex-row md:items-center justify-start md:justify-between my-4">
        <div className="flex flex-col md:flex-row md:justify-center gap-2">
          <Search placeholder="Buscar un usuario..." />
          <SelectItemsPerPage
            selectedItemsPerPage={selectedItemsPerPage}
            setSelectedItemsPerPage={setSelectedItemsPerPage}
          />
        </div>
        <div className="flex justify-end md:justify-center gap-4 -mb-4 md:my-0">
          <Button
            className="bg-green-500 mx-8 md:mr-8 transition duration-300 ease-in-out hover:bg-green-600 hover:scale-[1.05] text-foreground"
            onClick={handleAdd}
          >
            <p className="flex gap-2 items-center text-lg font-semibold">
              <CgAdd className="h-6 w-6" />
              Agregar
            </p>
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
        <div className="max-w-screen overflow-x-auto">
          <table className="transactions-table w-full mb-4 mt-8">
            <thead className="font-bold text-center text-muted bg-foreground text-xs xl:text-sm">
              <tr>
                <th className="px-2 py-5">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAllChange}
                    className="cursor-pointer h-5 w-5"
                  />
                </th>
                <th className="px-2 py-5">Nombre</th>
                <th className="px-2 py-5">Apellido</th>
                <th className="px-2 py-5">Email</th>
                <th className="px-2 py-5">Teléfono</th>
                <th className="px-2 py-5">Género</th>
                <th className="px-2 py-5">Fecha de nacimiento</th>
                <th className="px-2 py-5">Rol</th>
                <th className="px-2 py-5">Acción</th>
              </tr>
            </thead>
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
                      <button
                        className="p-2 rounded-lg text-white bg-sky-600 border-none cursor-pointer transitiopn duration-300 ease-in-out hover:scale-[1.1]"
                        onClick={() => handleEdit(user)}
                      >
                        <FaEdit className="h-4 w-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg text-white bg-red-600 border-none cursor-pointer transitiopn duration-300 ease-in-out hover:scale-[1.1]"
                        onClick={() => handleConfirmDelete(user.id)}
                      >
                        <FaTrash className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination count={count} ITEMS_PER_PAGE={selectedItemsPerPage} />
        </div>
      )}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-left bg-gray-900 bg-opacity-50 z-50">
          <div
            className={`absolute h-screen overflow-y-auto md:h-[870px] top-0 md:bottom-0 md:top-auto bg-background p-4 shadow-lg transform translate-x-0 transition duration-300 ease-in-out w-screen md:w-full max-w-lg ${
              showForm && 'slide-in-right'
            }`}
          >
            <UserForm
              typeForm={typeForm}
              dataUser={dataUser}
              setDataUser={setDataUser}
              setShowForm={setShowForm}
              selectedItemsPerPage={selectedItemsPerPage}
            />
          </div>
        </div>
      )}
      {Object.keys(showConfirmDeleteMap).map((key: string) => (
        <div
          key={key}
          className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 transition-opacity duration-300 ${
            showConfirmDeleteMap[parseInt(key)]
              ? 'opacity-100'
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="bg-background rounded-lg p-4 shadow-lg transform translate-x-0 transition duration-300 ease-in-out">
            <p className="text-lg font-semibold mb-4">
              ¿Seguro que deseas eliminar este usuario?
            </p>
            <div className="flex justify-center gap-4">
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-red-600"
                onClick={() => handleDelete(parseInt(key))}
              >
                Eliminar
              </button>
              <button
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg shadow-md transition duration-300 ease-in-out hover:bg-gray-400"
                onClick={() => handleCancelDelete(parseInt(key))}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default UsersTable
