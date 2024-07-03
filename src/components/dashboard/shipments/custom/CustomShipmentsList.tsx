'use client'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { CgAdd } from 'react-icons/cg'

import useShipments from '@/components/hooks/useShipments'
import useUser from '@/components/hooks/useUser'
import { Button } from '@/components/ui/button'
import Search from '@/components/search/Search'

const CustomShipmentsList = () => {
  const { token } = useUser()
  const { customShipments, getCustomShipments } = useShipments()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (token) {
      const q = searchParams.get('q') || ''
      getCustomShipments({ q })
    }
  }, [searchParams, token])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Envíos predeterminados</h1>
      <div className="flex justify-between gap-4">
        <Search placeholder="Buscar un envío..." />
        <Button className="bg-green-500 mr-8 transition duration-300 ease-in-out hover:bg-green-600 hover:scale-[1.05] text-foreground">
          <Link href={'/panel-de-control/envios/predeterminados/agregar'}>
            <p className="flex gap-2 items-center text-lg font-semibold">
              <CgAdd className="h-6 w-6" />
              Agregar
            </p>
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default CustomShipmentsList
