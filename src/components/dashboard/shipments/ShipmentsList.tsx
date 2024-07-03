'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import useShipments from '@/components/hooks/useShipments'
import useUser from '@/components/hooks/useUser'
import ShipmentCalendar from './ShipmentCalendar'
import {
  Shipment,
  ShipmentGroup,
  ShipmentItem
} from '@/components/types/Shipment'
import FleetLegend from './FleetLegend'
import { Button } from '@/components/ui/button'
import { CgAdd } from 'react-icons/cg'
import Link from 'next/link'
import { MdOutlineDashboardCustomize } from 'react-icons/md'

const groupShipmentsByDate = (shipments: Shipment[]): ShipmentGroup[] => {
  const shipmentGroups: { [date: string]: ShipmentGroup } = {}

  shipments.forEach((shipment) => {
    const {
      date,
      id,
      fleet_id,
      name,
      time_start,
      time_end,
      assigned_driver,
      delivery_points
    } = shipment
    const shipmentItem: ShipmentItem = {
      id,
      fleet_id,
      assigned_driver: {
        first_name: assigned_driver.first_name,
        last_name: assigned_driver.last_name
      },
      delivery_points,
      name,
      time_start,
      time_end
    }

    if (!shipmentGroups[date]) {
      shipmentGroups[date] = { date, shipments: [] }
    }

    shipmentGroups[date].shipments.push(shipmentItem)
  })

  return Object.values(shipmentGroups)
}

const ShipmentsList = () => {
  const [shipmentsToShow, setShipmentsToShow] = useState<ShipmentGroup[]>([])
  const { shipments, getShipments } = useShipments()
  const { token, getFleets, fleets } = useUser()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (token) {
      getFleets()
    }
  }, [token])

  useEffect(() => {
    if (token && fleets.length > 0) {
      let fleets_id: number[] = []
      fleets.forEach((fleet) => {
        fleets_id.push(fleet.id)
      })
      const q = searchParams.get('q') || ''
      getShipments({ q, fleets_id })
    }
  }, [token, fleets])

  useEffect(() => {
    if (shipments.length > 0) {
      const groupedShipments = groupShipmentsByDate(shipments)
      setShipmentsToShow(groupedShipments)
    }
  }, [shipments])

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Próximos envios</h1>
      <div className="flex justify-between">
        <FleetLegend />
        <div className="flex flex-col gap-4">
          <Button className="bg-green-500 mr-8 transition duration-300 ease-in-out hover:bg-green-600 hover:scale-[1.05] text-foreground">
            <Link href={'/panel-de-control/envios/agregar'}>
              <p className="flex gap-2 items-center text-lg font-semibold">
                <CgAdd className="h-6 w-6" />
                Agregar
              </p>
            </Link>
          </Button>
          <Button className="bg-purple-500 mr-8 transition duration-300 ease-in-out hover:bg-purple-600 hover:scale-[1.05] text-foreground">
            <Link href={'/panel-de-control/envios/predeterminados'}>
              <p className="flex gap-2 items-center text-lg font-semibold">
                <MdOutlineDashboardCustomize className="h-6 w-6" />
                Envíos predeterminados{' '}
              </p>
            </Link>
          </Button>
        </div>
      </div>
      <ShipmentCalendar shipments={shipmentsToShow} />
    </div>
  )
}

export default ShipmentsList
