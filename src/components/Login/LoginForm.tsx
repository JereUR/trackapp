'use client'

import { useState } from 'react'
import Image from 'next/image'

import imgLogin from '@public/img/login-image.jpg'
import { FocusState, initialData, initialFocus, Login } from '../types/User'
import { Button } from '../ui/button'
import ModalRecover from './ModalRecover'

const LoginForm = () => {
  const [dataLogin, setDataLogin] = useState<Login>(initialData)
  const [focus, setFocus] = useState<FocusState>(initialFocus)
  const [showModal, setShowModal] = useState<boolean>(false)

  const handleFocus = (inputName: keyof Login) =>
    setFocus({ ...focus, [inputName]: true })

  const handleBlur = (inputName: keyof Login) =>
    setFocus({ ...focus, [inputName]: !!dataLogin[inputName] })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataLogin({ ...dataLogin, [name]: value })
  }

  const handleForgotPasswordClick = () => {
    setShowModal(true) //
  }

  const handleCloseModal = () => {
    setShowModal(false)
  }

  const handleEmailSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log('Email submitted:', dataLogin.email)
    setShowModal(false)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log(dataLogin)
  }

  return (
    <div className="flex justify-center items-center min-h-screen overflow-y-auto">
      <div className="flex gap-12 max-h-screen">
        <div className="flex-1">
          <Image
            src={imgLogin}
            alt="Login"
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <div className="flex-1 flex-col justify-center items-center mt-6">
          <p className="text-3xl font-extralight">Iniciar Sesión</p>
          <form onSubmit={handleSubmit} className="w-full max-w-md">
            <div className="relative mt-10">
              <input
                type="text"
                name="email"
                value={dataLogin.email}
                onChange={handleChange}
                onFocus={() => handleFocus('email')}
                onBlur={() => handleBlur('email')}
                className={`w-full p-2 border-2 rounded-lg text-foreground transition duration-300 ease-in-out focus:outline-none ${
                  focus.email || dataLogin.email
                    ? 'pt-4 mt-1 border-blue-600'
                    : 'pt-2 border-gray-300'
                } focus:border-blue-600`}
                placeholder=" "
              />
              <label
                className={`absolute left-2 top-2 transition-all ${
                  focus.email || dataLogin.email
                    ? 'text-xs top-0 text-blue-600'
                    : 'text-base text-gray-500'
                }`}
              >
                Email
              </label>
            </div>
            <div className="relative mt-6">
              <input
                type="password"
                name="password"
                value={dataLogin.password}
                onChange={handleChange}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                className={`w-full p-2 border-2 rounded-lg text-foreground transition duration-300 ease-in-out focus:outline-none ${
                  focus.password || dataLogin.password
                    ? 'pt-4 mt-1 border-blue-600'
                    : 'pt-2 border-gray-300'
                } focus:border-blue-600`}
                placeholder=" "
              />
              <label
                className={`absolute left-2 top-2 transition-all ${
                  focus.password || dataLogin.password
                    ? 'text-xs top-0 text-blue-600'
                    : 'text-base text-gray-500'
                }`}
              >
                Contraseña
              </label>
            </div>
            <div className="flex justify-end mt-6">
              <span
                className="text-sm cursor-pointer transition duration-300 ease-in-out hover:scale-[1.02]"
                onClick={handleForgotPasswordClick}
              >
                ¿Olvidaste tu contraseña?
              </span>
            </div>
            <div className="relative mt-10">
              <Button
                type="submit"
                className="w-full text-lg text-foreground font-semibold bg-blue-600 transition duration-300 ease-in-out hover:bg-blue-700"
              >
                Iniciar Sesión
              </Button>
            </div>
          </form>
        </div>
      </div>
      {showModal && (
        <ModalRecover
          handleCloseModal={handleCloseModal}
          handleSubmit={handleEmailSubmit}
          email={dataLogin.email}
          handleChange={handleChange}
        />
      )}
    </div>
  )
}

export default LoginForm
