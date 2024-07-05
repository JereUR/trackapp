'use client'

import React, { useEffect, useRef } from 'react'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { CgAdd } from 'react-icons/cg'
import dynamic from 'next/dynamic'

import useShipments from '@/components/hooks/useShipments'
import useUser from '@/components/hooks/useUser'
import { Button } from '@/components/ui/button'
import Search from '@/components/search/Search'
import CustomShipmentItem from './CustomShipmentItem'
import { CustomShipment } from '@/components/types/Shipment'
import { RiScrollToBottomFill } from 'react-icons/ri'

const CustomPointsMap = dynamic(
  () => import('@/components/dashboard/maps/CustomPointsMap'),
  {
    ssr: false
  }
)

const CustomShipmentsList = () => {
  const { token } = useUser()
  const {
    customShipments,
    getCustomShipments,
    customPoints,
    getCustomPoints,
    deleteCustomPointById
  } = useShipments()
  const searchParams = useSearchParams()
  const mapRef = useRef<HTMLDivElement>(null) // Referencia para el mapa

  useEffect(() => {
    if (token) {
      const q = searchParams.get('q') || ''
      getCustomShipments({ q })
      getCustomPoints()
    }
  }, [searchParams, token])

  const handleDelete = async (shipment: CustomShipment) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar el envío '${shipment.name}'?`
      )
    ) {
      await deleteCustomPointById(shipment.id)
      console.log('Envío eliminado:', shipment.id)
    }
  }

  const scrollToMap = () => {
    if (mapRef.current) {
      mapRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div>
      <div>
      <div className="flex flex-col justify-center gap-4 mb-6 md:flex-row md:justify-between">
          <div className='flex justify-center'>
            <Button
              className="bg-orange-500 transition duration-300 ease-in-out hover:bg-orange-600 hover:scale-[1.05] text-foreground"
              onClick={scrollToMap}
            >
              <p className="flex gap-2 items-center text-lg font-semibold">
                <RiScrollToBottomFill className="h-6 w-6" />
                Deslizar a puntos claves
              </p>
            </Button>
          </div>
          <div className="flex flex-col gap-4 md:flex-row">
            <Button className="bg-green-500 mx-8 md:mx-0 transition duration-300 ease-in-out hover:bg-green-600 hover:scale-[1.05] text-foreground">
              <Link
                href={'/panel-de-control/envios/predeterminados/agregar-envio'}
              >
                <p className="flex gap-2 items-center text-lg font-semibold">
                  <CgAdd className="h-6 w-6" />
                  Agregar envíos
                </p>
              </Link>
            </Button>
            <Button className="bg-green-500 mx-8 md:mx-0 transition duration-300 ease-in-out hover:bg-green-600 hover:scale-[1.05] text-foreground">
              <Link
                href={'/panel-de-control/envios/predeterminados/agregar-punto'}
              >
                <p className="flex gap-2 items-center text-lg font-semibold">
                  <CgAdd className="h-6 w-6" />
                  Agregar puntos claves
                </p>
              </Link>
            </Button>
          </div>
        </div>
        <h1 className="text-3xl font-bold mb-4">Envíos predeterminados</h1>
        
        <div className="ml-2">
          <Search placeholder="Buscar un envío..." />
        </div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-8 m-4 md:mx-10 md:my-4">
          {customShipments.length > 0 ? (
            customShipments.map((shipment) => (
              <CustomShipmentItem
                key={shipment.id}
                shipment={shipment}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <div>
              <p className="text-foreground text-2xl font-bold italic">
                No hay envíos predeterminados aún.
              </p>
            </div>
          )}
        </div>
        <div ref={mapRef} className="my-4">
          <h1 className="text-3xl font-bold mb-10">Puntos claves</h1>
          <CustomPointsMap points={customPoints} />
        </div>
      </div>
    </div>
  )
}

export default CustomShipmentsList
