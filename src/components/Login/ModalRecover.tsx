import React from 'react'
import { Button } from '../ui/button'

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
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-background p-8 rounded-lg w-[30vw] h-[30vh]">
        <div className="flex justify-end">
          <button
            onClick={handleCloseModal}
            className="text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            X
          </button>
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-xl font-semibold mb-4">Restablecer Contraseña</p>
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
              Enviar
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ModalRecover
