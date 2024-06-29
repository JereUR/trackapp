import { PropsAddShipment } from '@/components/types/Shipment'
import React from 'react'

interface Props {
  type: string
  shipment: PropsAddShipment
}

const ShipmentForm: React.FC<Props> = ({ type, shipment }) => {
  return <div>ShipmentForm</div>
}

export default ShipmentForm
