'use client'

import { useState } from 'react'
import axios from 'axios'
import { useRouter, useSearchParams } from 'next/navigation'
import { EyeClosedIcon, EyeOpenIcon } from '@radix-ui/react-icons'

import {
  FocusStateRecover,
  FormErrorsRecover,
  initialDataRecover,
  initialErrorsRecover,
  initialFocusRecover,
  Recover
} from '../types/User'
import ErrorText from '../ErrorText'
import { useToast } from '../ui/use-toast'
import { Button } from '../ui/button'
import Loader from '../Loader'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

const RecoverForm = () => {
  const [dataRecover, setDataRecover] = useState<Recover>(initialDataRecover)
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [focus, setFocus] = useState<FocusStateRecover>(initialFocusRecover)
  const [loading, setLoading] = useState(false)
  const [formErrors, setFormErrors] =
    useState<FormErrorsRecover>(initialErrorsRecover)

  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()

  const validations = () => {
    const errorsForm: FormErrorsRecover = {}

    if (dataRecover.password.length < 8) {
      errorsForm.password = `La contraseña debe tener más de 8 caracteres.`
    }

    if (dataRecover.password !== dataRecover.confirm_password) {
      errorsForm.password = `La contraseña y su confirmación no coinciden.`
      errorsForm.confirm_password = `La contraseña y su confirmación no coinciden.`
    }

    return errorsForm
  }

  const handleFocus = (inputName: keyof Recover) =>
    setFocus({ ...focus, [inputName]: true })

  const handleBlur = (inputName: keyof Recover) =>
    setFocus({ ...focus, [inputName]: !!dataRecover[inputName] })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setDataRecover({ ...dataRecover, [name]: value })
  }

  async function updatePassword() {
    const token = searchParams.get('reset_password_token')
    setLoading(true)

    const user = {
      user: {
        password: dataRecover.password,
        password_confirmation: dataRecover.confirm_password,
        reset_password_token: token
      }
    }

    try {
      const response = await axios.post(`${BASE_URL}recover`, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.status === 200 || response.status === 204) {
        router.push('/iniciar-sesion')
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    }

    setLoading(false)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const err = validations()
    setFormErrors(err)

    if (Object.keys(err).length === 0) {
      await updatePassword()
      setFormErrors(initialErrorsRecover)
    }
  }

  return (
    <div className="flex justify-center h-full items-center rounded-lg p-10 m-10 shadow-md">
      <div className="flex-1 flex-col justify-center items-center mt-6">
        <p className="text-3xl font-extralight">Reestablecer contraseña</p>
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mt-10">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={dataRecover.password}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                onChange={handleChange}
                className={`w-full p-2 border-2 rounded-lg text-foreground transition duration-300 ease-in-out focus:outline-none ${
                  focus.password || dataRecover.password
                    ? 'pt-4 mt-1 border-blue-600'
                    : 'pt-2 border-gray-300'
                } focus:border-blue-600`}
                placeholder=" "
              />

              <label
                className={`absolute left-2 top-2 transition-all ${
                  focus.password || dataRecover.password
                    ? 'text-xs top-0 text-blue-600'
                    : 'text-base text-gray-500'
                }`}
              >
                Nueva contraseña
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
              {formErrors.password && <ErrorText text={formErrors.password} />}
            </div>
          </div>
          <div className="mt-10">
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirm_password"
                value={dataRecover.confirm_password}
                onChange={handleChange}
                onFocus={() => handleFocus('confirm_password')}
                onBlur={() => handleBlur('confirm_password')}
                className={`w-full p-2 border-2 rounded-lg text-foreground transition duration-300 ease-in-out focus:outline-none ${
                  focus.confirm_password || dataRecover.confirm_password
                    ? 'pt-4 mt-1 border-blue-600'
                    : 'pt-2 border-gray-300'
                } focus:border-blue-600`}
                placeholder=" "
              />
              <label
                className={`absolute left-2 top-2 transition-all ${
                  focus.confirm_password || dataRecover.confirm_password
                    ? 'text-xs top-0 text-blue-600'
                    : 'text-base text-gray-500'
                }`}
              >
                Confirmar contraseña
              </label>
            </div>
            <div>
              {formErrors.confirm_password && (
                <ErrorText text={formErrors.confirm_password} />
              )}
            </div>
          </div>
          <div className="relative mt-10">
            <Button
              type="submit"
              className="w-full text-lg text-foreground font-medium bg-blue-600 transition duration-300 ease-in-out hover:bg-blue-700"
            >
              {loading ? <Loader /> : 'Enviar'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RecoverForm
