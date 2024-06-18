import React, { useRef, useState } from 'react'
import { Button } from '../ui/button'
import Image from 'next/image'
import { BsMailboxFlag } from 'react-icons/bs'
import useUser from '../hooks/useUser'
import Loader from '../Loader'

interface Props {
  handleCloseModal: () => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  email: string
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ModalRecover: React.FC<Props> = ({
  handleCloseModal,
  handleSubmit,
  email,
  handleChange
}) => {
  const modalRef = useRef<HTMLDivElement>(null)
  const { recoverState, setRecoverState, loadingUser } = useUser()

  const handleClickOutside = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseModal()
    }
  }

  return (
    <div
      className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-background p-8 rounded-lg m-10 lg:w-[50vw] xl:w-[30vw] h-fit"
      >
        <div className="flex justify-end">
          <button
            onClick={handleCloseModal}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            X
          </button>
        </div>
        {recoverState ? (
          <div className="grid place-items-center text-center">
            <BsMailboxFlag className="h-20 w-20 mb-6 text-blue-600 animate-bounce" />
            <span className="flex flex-col">
              Acabamos de enviarle un correo electrónico con instrucciones para
              restablecer su contraseña. Si no recibe un correo electrónico,{' '}
              <a
                className="italic font-extralight cursor-pointer underline"
                onClick={() => setRecoverState(false)}
              >
                intente nuevamente con una dirección de correo electrónico
                diferente
              </a>
            </span>
          </div>
        ) : (
          <div className="flex flex-col justify-center">
            <p className="text-xl font-semibold mb-4">Restablecer Contraseña</p>
            <span className="flex justify-start my-2">
              Ingrese si correo electrónico y recibirá un mail con la
              información necesaria para reestablecer su contraseña.
            </span>
            <form onSubmit={handleSubmit}>
              <div className="relative mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={handleChange}
                  className="w-full p-2 border-2 rounded-lg text-foreground focus:outline-none focus:border-blue-600"
                  placeholder="Email"
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full mt-6 bg-blue-600 text-white hover:bg-blue-700"
              >
                {loadingUser ? <Loader /> : 'Enviar'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}

export default ModalRecover
