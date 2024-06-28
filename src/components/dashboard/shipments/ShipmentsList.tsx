'use client'

import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

import useShipments from '@/components/hooks/useShipments'
import useUser from '@/components/hooks/useUser'
import ShipmentCalendar from './ShipmentCalendar'
import { Shipment, ShipmentGroup, ShipmentItem } from '@/components/types/Shipment'

const groupShipmentsByDate = (shipments: Shipment[]): ShipmentGroup[] => {
  const shipmentGroups: { [date: string]: ShipmentGroup } = {};

  shipments.forEach(shipment => {
    const { date, id, fleet_id, name, time_start, time_end } = shipment;
    const shipmentItem: ShipmentItem = { id, fleet_id, name, time_start, time_end };

    if (!shipmentGroups[date]) {
      shipmentGroups[date] = { date, shipments: [] };
    }

    shipmentGroups[date].shipments.push(shipmentItem);
  });

  return Object.values(shipmentGroups);
};

const ShipmentsList = () => {
  const [shipmentsToShow, setShipmentsToShow] = useState<ShipmentGroup[]>([])
  const { shipments, getShipments } = useShipments()
  const { token } = useUser()
  const searchParams = useSearchParams()

  useEffect(() => {
    if (token) {
      const q = searchParams.get('q') || ''
      getShipments({ q })
    }
  }, [])

  useEffect(() => {
    if (shipments.length > 0) {
      const groupedShipments = groupShipmentsByDate(shipments);
      setShipmentsToShow(groupedShipments);
    }
  }, [shipments]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Próximos envios</h1>
      <ShipmentCalendar shipments={shipmentsToShow} />
    </div>
  )
}

export default ShipmentsList
