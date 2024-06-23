import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import { LatLngExpression } from 'leaflet'
import { Shipment } from '@/components/types/Shipment'
import { sendIcon } from './MapsInfo'

interface ShipmentMapProps {
  shipment: Shipment
}

const ShipmentMap: React.FC<ShipmentMapProps> = ({ shipment }) => {
  if (!shipment.origin) return null

  const position: LatLngExpression = [shipment.origin.lat, shipment.origin.lng]

  return (
    <MapContainer center={position} zoom={13} className="h-48 w-full">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker icon={sendIcon} position={position}>
        <Popup>
          {shipment.name}
          <br />
          {shipment.description}
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default ShipmentMap
