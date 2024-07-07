'use client'

import React, { useState } from 'react'
import useUser from '../hooks/useUser'
import { useToast } from '../ui/use-toast'
import Loader from '../Loader'
import { Button } from '../ui/button'
import { CgLogOut } from 'react-icons/cg'
import { initialDataUpdateProfile, PropsUpdateProfile } from '../types/User'
import { BiEdit } from 'react-icons/bi'
import ProfileForm from './ProfileForm'

const Profile = () => {
  const [dataUser, setDataUser] = useState<PropsUpdateProfile>(
    initialDataUpdateProfile
  )
  const [showForm, setShowForm] = useState<boolean>(false)

  const { user, token, loadingUser, setLoadingUser, userLogout } = useUser()
  const { toast } = useToast()
  let gender = ''

  if (user?.gender?.toLowerCase() === 'male') {
    gender = 'Masculino'
  } else if (user?.gender?.toLowerCase() === 'female') {
    gender = 'Femenino'
  } else {
    gender = 'Otros'
  }

  const handleEdit = async () => {
    setDataUser({
      ...dataUser,
      id: user?.id,
      first_name: user?.first_name ? user?.first_name : '',
      last_name: user?.last_name ? user?.last_name : '',
      phone: user?.phone,
      gender: user?.gender ? user?.gender : '',
      date: user?.date ? new Date(user?.date) : new Date()
    })
    setShowForm(true)
  }

  async function handleLogout() {
    if (token) {
      setLoadingUser(true)
      try {
        const response = await fetch('/api/signout', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(token)
        })

        const result = await response.json()
        console.log(result)
        if (result.status) {
          userLogout()
        } else {
          toast({
            variant: 'destructive',
            title: 'Oh no! Algo salió mal.',
            description: result.error
          })
        }
      } catch (error: any) {
        console.error('Error during sign out:', error)
        toast({
          variant: 'destructive',
          title: 'Oh no! Algo salió mal.',
          description: error
        })
        return false
      } finally {
        setLoadingUser(false)
      }
    }
  }

  return (
    <div className="p-1 md:p-6">
      <h1 className="text-3xl font-semibold mb-6 text-foreground">Mi Perfil</h1>
      <div className="space-y-6 max-w-lg m-4 md:m-10">
        <div className="flex flex-col md:flex-row justify-between items-start text-xl text-foreground w-full">
          <p className="font-bold">Nombre:</p>
          <p className="text-lg py-2 px-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full md:w-2/3 text-left">
            {user?.first_name}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start text-xl text-foreground w-full">
          <p className="font-bold">Apellido:</p>
          <p className="text-lg py-2 px-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full md:w-2/3 text-left">
            {user?.last_name}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start text-xl text-foreground w-full">
          <p className="font-bold">Email:</p>
          <p className="text-lg py-2 px-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full md:w-2/3 text-left">
            {user?.email}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start text-xl text-foreground w-full">
          <p className="font-bold">Teléfono:</p>
          <p className="text-lg py-2 px-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full md:w-2/3 text-left">
            {user?.phone ? user.phone : 'Sin especificar'}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start text-xl text-foreground w-full">
          <p className="font-bold">Género:</p>
          <p className="text-lg py-2 px-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full md:w-2/3 text-left">
            {gender}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start text-xl text-foreground w-full">
          <div>
            <p className="font-bold">Fecha de</p>
            <p className="font-bold">nacimiento:</p>
          </div>
          <p className="text-lg py-2 px-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full md:w-2/3 text-left">
            {user?.date
              ? new Date(user.date).toLocaleDateString()
              : 'Sin especificar'}
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start text-xl text-foreground w-full">
          <p className="font-bold">Rol:</p>
          <p className="text-lg py-2 px-6 bg-gray-200 dark:bg-gray-700 rounded-md w-full md:w-2/3 text-left">
            {user?.role}
          </p>
        </div>
      </div>
      <div className="flex flex-col gap-4 my-10 md:mx-4 w-full max-w-sm md:max-w-lg">
        <Button
          className="flex gap-2 w-full items-center text-left px-4 py-2 text-white text-sm md:text-lg bg-sky-500 rounded-lg transition duration-300 ease-in-out hover:bg-sky-600 dark:hover:bg-sky-800"
          onClick={handleEdit}
        >
          <BiEdit className="h-5 w-5" /> Editar perfil / Actualizar contraseña
        </Button>
        <Button
          onClick={handleLogout}
          className="flex gap-2 w-full items-center text-left px-4 py-2 text-white text-sm md:text-lg bg-red-500 rounded-lg transition duration-300 ease-in-out hover:bg-red-600 dark:hover:bg-red-800"
        >
          {!loadingUser ? (
            <p className="flex gap-2 items-center">
              <CgLogOut className="h-5 w-5" />
              Cerrar Sesión
            </p>
          ) : (
            <Loader color="border-t-red-600" />
          )}
        </Button>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-end bg-gray-900 bg-opacity-50 z-50">
          <div
            className={`absolute h-screen md:h-[870px] bottom-0 right-0 bg-background p-4 shadow-lg transform translate-x-0 transition duration-300 ease-in-out w-full max-w-lg ${
              showForm && 'slide-in-left'
            }`}
          >
            <ProfileForm
              dataUser={dataUser}
              setDataUser={setDataUser}
              setShowForm={setShowForm}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Profile
