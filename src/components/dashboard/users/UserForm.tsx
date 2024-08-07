'use client'

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState
} from 'react'
import {
  Cross1Icon,
  Cross2Icon,
  EyeClosedIcon,
  EyeOpenIcon
} from '@radix-ui/react-icons'
import { BsCheck2 } from 'react-icons/bs'
import { useSearchParams } from 'next/navigation'

import ErrorText from '@/components/ErrorText'
import useUser from '@/components/hooks/useUser'
import {
  initialDataAddUser,
  initialErrorsAddUser,
  posibleGenders,
  posibleRoles,
  PropsAddUser
} from '@/components/types/User'
import { Button } from '@/components/ui/button'
import Loader from '@/components/Loader'
import { useToast } from '@/components/ui/use-toast'
import { FormErrorsAddUser } from './../../types/User'

interface Props {
  dataUser: PropsAddUser
  setDataUser: Dispatch<SetStateAction<PropsAddUser>>
  typeForm: string
  setShowForm: Dispatch<SetStateAction<boolean>>
  selectedItemsPerPage: number
}

const UserForm: React.FC<Props> = ({
  dataUser,
  setDataUser,
  typeForm,
  setShowForm,
  selectedItemsPerPage
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [formErrors, setFormErrors] =
    useState<FormErrorsAddUser>(initialErrorsAddUser)

  const { addUser, updateUser, loadingUsers, getUsers } = useUser()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const validations = () => {
    const errors: FormErrorsAddUser = {}
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/i

    if (!dataUser.first_name.trim()) {
      errors.first_name = 'Este campo es obligatorio.'
    } else {
      if (dataUser.first_name.length > 20) {
        errors.first_name = 'El nombre no puede tener más de 20 caracteres.'
      }
    }

    if (!dataUser.last_name.trim()) {
      errors.last_name = 'Este campo es obligatorio.'
    } else {
      if (dataUser.last_name.length > 20) {
        errors.last_name = 'El apellido no puede tener más de 20 caracteres.'
      }
    }

    if (!dataUser.email.trim()) {
      errors.email = 'Este campo no puede ser vacío.'
    } else {
      if (!emailRegex.test(dataUser.email)) {
        errors.email = 'Debe ingresar un email válido.'
      }
    }

    if (dataUser.phone) {
      if (dataUser.phone.toString().length > 20) {
        errors.phone =
          'El número de teléfono no puede tener más de 20 caracteres.'
      }
    }

    if (!dataUser.role.trim()) {
      errors.role = 'Este campo es obligatorio.'
    }

    if (typeForm === 'add') {
      if (dataUser.password != undefined) {
        if (!dataUser.password.trim()) {
          errors.password = 'Este campo es obligatorio.'
        }

        if (dataUser.password.length < 8) {
          errors.password = 'La contraseña debe tener al menos 8 caracteres.'
        }
      }

      if (dataUser.password !== dataUser.password_confirmation) {
        errors.password = 'La contraseña y su confirmación no coinciden.'
        errors.password_confirmation =
          'La contraseña y su confirmación no coinciden.'
      }
    }

    return errors
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target
    setDataUser({ ...dataUser, [name]: value })
    if (value) setFormErrors({ ...formErrors, [name]: '' })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    if (name === 'date') {
      setDataUser({ ...dataUser, [name]: new Date(value) })
    } else {
      setDataUser({ ...dataUser, [name]: value })
    }
    if (value) setFormErrors({ ...formErrors, [name]: '' })
  }

  const handleClose = () => {
    setShowForm(false)
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const err = validations()
    setFormErrors(err)

    if (Object.keys(err).length === 0) {
      if (typeForm === 'add') {
        const res = await addUser({ dataUser })
        if (res) {
          toast({
            title: 'Usuario agregado.',
            className: 'bg-green-600'
          })
          const q = searchParams.get('q') || ''
          const page = searchParams.get('page') || '1'
          getUsers({
            q,
            page,
            ITEMS_PER_PAGE: selectedItemsPerPage
          })
          setShowForm(false)
          setDataUser(initialDataAddUser)
          setFormErrors(initialErrorsAddUser)
        }
      } else {
        const res = await updateUser({ dataUser })
        if (res) {
          toast({
            title: 'Usuario actualizado.',
            className: 'bg-green-600'
          })
          const q = searchParams.get('q') || ''
          const page = searchParams.get('page') || '1'
          getUsers({
            q,
            page,
            ITEMS_PER_PAGE: selectedItemsPerPage
          })
          setShowForm(false)
          setDataUser(initialDataAddUser)
          setFormErrors(initialErrorsAddUser)
        }
      }
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4 bg-card">
      <div
        className="absolute cursor-pointer top-0 right-0 mt-4 mr-4 trasition duration-300 ease-in-out hover:scale-[1.03]"
        onClick={() => setShowForm(false)}
      >
        <Cross1Icon className="text-red-600 h-5 w-5" />
      </div>
      <h2 className="text-2xl mb-4">
        {typeForm === 'add' ? 'Agregar Usuario' : 'Editar Usuario'}
      </h2>
      <form onSubmit={handleSubmit} className="my-16">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="first_name"
                className="font-light text-foreground"
              >
                Nombre
              </label>
              {formErrors.first_name && (
                <ErrorText text={formErrors.first_name} />
              )}
            </div>
            <input
              type="text"
              id="first_name"
              name="first_name"
              value={dataUser.first_name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label htmlFor="last_name" className="font-light text-foreground">
                Apellido
              </label>
              {formErrors.last_name && (
                <ErrorText text={formErrors.last_name} />
              )}
            </div>
            <input
              type="text"
              id="last_name"
              name="last_name"
              value={dataUser.last_name}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label htmlFor="email" className="font-light text-foreground">
                Email
              </label>
              {formErrors.email && <ErrorText text={formErrors.email} />}
            </div>
            <input
              type="text"
              id="email"
              name="email"
              value={dataUser.email}
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label htmlFor="phone" className="font-light text-foreground">
                Teléfono
              </label>
              {formErrors.phone && <ErrorText text={formErrors.phone} />}
            </div>
            <input
              type="number"
              id="phone"
              name="phone"
              value={dataUser.phone}
              inputMode="numeric"
              onChange={handleInputChange}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label htmlFor="gender" className="font-light text-foreground">
                Género
              </label>
              {formErrors.gender && <ErrorText text={formErrors.gender} />}
            </div>
            <select
              id="gender"
              name="gender"
              onChange={handleSelectChange}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
            >
              <option value="" selected={dataUser.gender === ''}>
                -- Seleccione género --
              </option>
              {posibleGenders.map((gender) => (
                <option
                  key={gender}
                  value={gender}
                  selected={dataUser.gender === gender}
                >
                  {gender}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label htmlFor="role" className="font-light text-foreground">
                Rol
              </label>
              {formErrors.role && <ErrorText text={formErrors.role} />}
            </div>
            <select
              id="role"
              name="role"
              onChange={handleSelectChange}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
            >
              <option value="" selected={dataUser.role === ''}>
                -- Seleccione rol --
              </option>
              {posibleRoles.map((role) => (
                <option
                  key={role}
                  value={role}
                  selected={dataUser.role === role}
                >
                  {role}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label htmlFor="date" className="font-light text-foreground">
                Fecha de nacimiento
              </label>
              {formErrors.date && <ErrorText text={formErrors.date} />}
            </div>
            {formErrors.date && <ErrorText text={formErrors.date} />}
            <input
              type="date"
              name="date"
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm cursor-pointer"
              value={
                dataUser.date
                  ? dataUser.date.toISOString().split('T')[0]
                  : new Date().toISOString().split('T')[0]
              }
              onChange={handleInputChange}
            />
          </div>
        </div>
        {typeForm === 'add' && (
          <div className="flex gap-8 my-8">
            <div className="flex flex-col gap-4 mb-[5vh]">
              <div className="flex gap-2 items-center">
                <label
                  htmlFor="password"
                  className="font-light text-foreground"
                >
                  Contraseña
                </label>
                {formErrors.password && (
                  <ErrorText text={formErrors.password} />
                )}
              </div>
              <div className="relative">
                <input
                  type={`${showPassword ? 'text' : 'password'}`}
                  name="password"
                  className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={dataUser.password}
                  onChange={handleInputChange}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center mr-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOpenIcon className="h-5 w-5" />
                  ) : (
                    <EyeClosedIcon className="h-5 w-5" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-4 mb-[5vh]">
              <div className="flex gap-2 items-center">
                <label
                  htmlFor="password_confirmation"
                  className="font-light text-foreground"
                >
                  Confirmar contraseña
                </label>
                {formErrors.password_confirmation && (
                  <ErrorText text={formErrors.password_confirmation} />
                )}
              </div>
              <div className="relative">
                <input
                  type={`${showPassword ? 'text' : 'password'}`}
                  name="password_confirmation"
                  className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={dataUser.password_confirmation}
                  onChange={handleInputChange}
                />
                <div
                  className="absolute inset-y-0 right-0 flex items-center mr-5 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOpenIcon className="h-5 w-5" />
                  ) : (
                    <EyeClosedIcon className="h-5 w-5" />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-end gap-2 mt-4">
          <Button
            type="button"
            className="flex gap-2 items-center text-foreground bg-red-500 hover:bg-red-600"
            onClick={handleClose}
          >
            <Cross2Icon className="h-5 w-5" /> Cerrar
          </Button>
          <Button
            type="submit"
            className=" text-foreground bg-green-500 hover:bg-green-600"
          >
            {loadingUsers ? (
              <Loader color="border-t-green-500" />
            ) : (
              <p className="flex gap-2 items-center">
                <BsCheck2 className="h-5 w-5" />{' '}
                {typeForm === 'add' ? 'Agregar usuario' : 'Actualizar usuario'}
              </p>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}

export default UserForm
