'use client'

import React, { useState } from 'react'
import { MdExpandLess, MdExpandMore, MdOutlineNumbers } from 'react-icons/md'

import { Button } from '../ui/button'

interface Props {
  selectedItemsPerPage: number
  setSelectedItemsPerPage: React.Dispatch<React.SetStateAction<number>>
}

const numbersOptions = [5, 10, 15, 20, 30, 40, 50]

const SelectItemsPerPage: React.FC<Props> = ({
  selectedItemsPerPage,
  setSelectedItemsPerPage
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const [partialOption, setPartialOption] = useState(selectedItemsPerPage)

  const handleButtonClick = () => {
    setIsOpen(!isOpen)
  }

  const handleCloseMenu = () => {
    setSelectedItemsPerPage(partialOption)
    setIsOpen(false)

    const url = new URL(window.location.href)
    url.searchParams.set('page', '1')
    window.history.pushState({}, '', url)
  }

  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation()
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="flex items-center gap-2 bg-card"
        onClick={handleButtonClick}
      >
        <MdOutlineNumbers className="w-4 h-4" />
        Resultados ({selectedItemsPerPage})
        {isOpen ? (
          <MdExpandLess className="w-5 h-5" />
        ) : (
          <MdExpandMore className="w-5 h-5" />
        )}
      </Button>
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="absolute w-[60vw] md:w-[20vw] xl:w-[15vw] bg-card mt-3 mr-5 rounded shadow-lg"
        >
          <div className="p-4" onClick={handleMenuClick}>
            <p className="text-lg font-medium text-foreground">
              Nro de elementos a mostrar
            </p>
            <hr className="my-2 border-gray-200 dark:border-gray-500" />
            {numbersOptions.map((n) => (
              <label key={n} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  className="mr-2 cursor-pointer"
                  name="itemsPerPage"
                  value={n}
                  checked={partialOption === n}
                  onChange={(e) => setPartialOption(Number(e.target.value))}
                />
                {n}
              </label>
            ))}
            <hr className="my-2 border-gray-200 dark:border-gray-500" />

            <div className="flex justify-center">
              <Button
                className="font-semibold text-foreground bg-blue-600 transition duration-300 ease-in-out hover:bg-blue-800 w-full mx-4 mb-1 mt-2 p-1"
                onClick={handleCloseMenu}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SelectItemsPerPage
