'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { CgAdd } from 'react-icons/cg'
import dynamic from 'next/dynamic'

import useShipments from '@/components/hooks/useShipments'
import useUser from '@/components/hooks/useUser'
import { Button } from '@/components/ui/button'
import Search from '@/components/search/Search'
import CustomShipmentItem from './CustomShipmentItem'
import { CustomShipment } from '@/components/types/Shipment'

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

  console.log(customPoints)

  return (
    <div>
      <div>
        <h1 className="text-3xl font-bold mb-4">Envíos predeterminados</h1>
        <div className="flex justify-between gap-4">
          <Search placeholder="Buscar un envío..." />
          <div>
            <Button className="bg-green-500 mr-8 transition duration-300 ease-in-out hover:bg-green-600 hover:scale-[1.05] text-foreground">
              <Link
                href={'/panel-de-control/envios/predeterminados/agregar-envio'}
              >
                <p className="flex gap-2 items-center text-lg font-semibold">
                  <CgAdd className="h-6 w-6" />
                  Agregar envios
                </p>
              </Link>
            </Button>
            <Button className="bg-green-500 mr-8 transition duration-300 ease-in-out hover:bg-green-600 hover:scale-[1.05] text-foreground">
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
        <div className="flex gap-8 m-10">
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
        <div className="my-4">
          <h1 className="text-3xl font-bold mb-10">Puntos claves</h1>
          <CustomPointsMap points={customPoints} />
        </div>
      </div>
    </div>
  )
}

export default CustomShipmentsList
