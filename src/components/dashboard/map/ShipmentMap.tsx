import { Shipment } from '@/components/types/Shipment'
import { LatLngExpression } from 'leaflet'
import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'

const ShipmentMap = ({ shipment }: { shipment: Shipment }) => {
  if (!shipment.origin) return null

  return (
    <MapContainer
      center={[shipment.origin.lat, shipment.origin.lng] as LatLngExpression}
      zoom={13}
      className="h-48 w-full"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker
        position={
          [shipment.origin.lat, shipment.origin.lng] as LatLngExpression
        }
      >
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
