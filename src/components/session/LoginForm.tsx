'use client'

import { useState } from 'react'
import Image from 'next/image'

import imgLogin from '@public/img/login-image.jpg'
import {
  FocusStateLogin,
  FormErrorsLogin,
  initialData,
  initialErrors,
  initialFocusLogin,
  Login
} from '../types/User'
import { Button } from '../ui/button'
import ModalRecover from './ModalRecover'
import ErrorText from '../ErrorText'
import useUser from '../hooks/useUser'
import Loader from '../Loader'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { useToast } from '../ui/use-toast'

const LoginForm = () => {
  const [dataLogin, setDataLogin] = useState<Login>(initialData)
  const [showPassword, setShowPassword] = useState(false)
  const [focus, setFocus] = useState<FocusStateLogin>(initialFocusLogin)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<FormErrorsLogin>(initialErrors)

  const { userLogin, loadingUser, setLoadingUser } = useUser()
  const { toast } = useToast()

  const validations = () => {
    const errorsForm: FormErrorsLogin = {}

    const regexEmail = /^(\w+[/./-]?){1,}@[a-z]+[/.]\w{2,}$/

    if (!dataLogin.email.trim()) {
      errorsForm.email = `Este campo no debe ser vacío.`
    } else if (!regexEmail.test(dataLogin.email)) {
      errorsForm.email = 'Correo no válido.'
    }

    if (!dataLogin.password.trim()) {
      errorsForm.password = `Ingrese su contraseña.`
    }

    return errorsForm
  }

  const handleFocus = (inputName: keyof Login) =>
    setFocus({ ...focus, [inputName]: true })

  const handleBlur = (inputName: keyof Login) =>
    setFocus({ ...focus, [inputName]: !!dataLogin[inputName] })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataLogin({ ...dataLogin, [name]: value })
    if (value) setFormErrors({ ...formErrors, [name]: '' })
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
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const err = validations()
    setFormErrors(err)

    if (Object.keys(err).length === 0) {
      setLoadingUser(true)

      try {
        const response = await fetch('/api/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(dataLogin)
        })
        const result = await response.json()

        if (response.ok) {
          userLogin({
            authToken: result.authToken,
            user: result.data.user,
            error: null
          })
          setDataLogin(initialData)
          setFormErrors(initialErrors)
        } else {
          toast({
            variant: 'destructive',
            title: 'Error al iniciar sesión',
            description: result.error || 'Error desconocido'
          })
        }
      } catch (error: any) {
        toast({
          variant: 'destructive',
          title: 'Oh no! Algo salió mal.',
          description: error.message
        })
      } finally {
        setLoadingUser(false)
      }
    }
  }

  return (
    <div className="flex justify-center h-full items-center">
      <div className="flex gap-12 max-h-full">
        <div className="hidden lg:flex lg:flex-1">
          <Image
            src={imgLogin}
            alt="Login"
            className="object-cover rounded-lg shadow-md"
            priority
          />
        </div>
        <div className="shadow-md p-10 rounded-lg lg:shadow-none flex-1 flex-col justify-center items-center mt-6">
          <p className="text-3xl font-extralight">Iniciar sesión</p>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mt-6">
              <div className="relative">
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
              <div>
                {formErrors.email && <ErrorText text={formErrors.email} />}
              </div>
            </div>
            <div className="mt-6">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={dataLogin.password}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  onChange={handleChange}
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
              <div>
                {formErrors.password && (
                  <ErrorText text={formErrors.password} />
                )}
              </div>
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
                {loadingUser ? <Loader /> : 'Iniciar sesión'}
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
