'use client'

import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'

import { destinationIcon, ZOOM_LEVEL_FORM } from './MapsInfo'

const MapForm = ({ dataCustomPoint, setDataCustomPoint, mapRef }) => {
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize()
      }, 100)
    }
  }, [map])

  const handleMarkerDragEnd = (event) => {
    const marker = event.target
    const position = marker.getLatLng()
    if (position) {
      setDataCustomPoint({
        ...dataCustomPoint,
        location: { lat: position.lat, lng: position.lng }
      })
    }
  }

  return (
    <MapContainer
      center={[-34.88644565879525, -57.91434285964627]}
      zoom={ZOOM_LEVEL_FORM}
      style={{ height: '80vh', width: '100%' }}
      whenCreated={setMap}
      className="z-20"
      ref={mapRef}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {dataCustomPoint.location && (
        <Marker
          icon={destinationIcon}
          position={[
            dataCustomPoint.location.lat,
            dataCustomPoint.location.lng
          ]}
          draggable={true}
          eventHandlers={{ dragend: handleMarkerDragEnd }}
        >
          <Popup>
            <div
              style={{
                fontSize: '1.125rem',
                fontWeight: 'bold',
                marginBottom: '0.5rem'
              }}
            >
              {dataCustomPoint?.name}
            </div>
          </Popup>
        </Marker>
      )}
    </MapContainer>
  )
}

export default MapForm
