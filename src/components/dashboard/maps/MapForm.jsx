'use client'

import React, { useState, useEffect } from 'react'
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import MarkerClusterGroup from 'react-leaflet-cluster'

import {
  destinationIcon,
  destinationOnEditIcon,
  ZOOM_LEVEL_FORM
} from './MapsInfo'

const MapForm = ({
  dataShipment,
  dataDeliveryPoint,
  setDataDeliveryPoint,
  mapRef
}) => {
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
      setDataDeliveryPoint({
        ...dataDeliveryPoint,
        destination: { lat: position.lat, lng: position.lng }
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
      {dataDeliveryPoint.destination && (
        <Marker
          icon={destinationOnEditIcon}
          position={[
            dataDeliveryPoint.destination.lat,
            dataDeliveryPoint.destination.lng
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
              {dataDeliveryPoint?.name}
            </div>
          </Popup>
        </Marker>
      )}
      <MarkerClusterGroup>
        {dataShipment.delivery_points.map((point) => {
          const pointPosition = [point.destination.lat, point.destination.lng]
          return (
            <Marker
              key={point.id}
              icon={destinationIcon}
              position={pointPosition}
            >
              <Popup>
                <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                  {point.name}
                </div>
                {point.cargo.length > 0 && (
                  <div style={{ marginTop: '0.5rem' }}>
                    <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                      Cargos:
                    </div>
                    <ul
                      style={{
                        listStyleType: 'disc',
                        paddingLeft: '1.25rem',
                        marginTop: '0.25rem'
                      }}
                    >
                      {point.cargo.map((cargo, index) => (
                        <li
                          key={index}
                          style={{ fontSize: '0.875rem', color: '#2d3748' }}
                        >
                          <span style={{ fontWeight: 'bold' }}>
                            {cargo.product}
                          </span>
                          : {cargo.quantity}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </Popup>
            </Marker>
          )
        })}
      </MarkerClusterGroup>
    </MapContainer>
  )
}

export default MapForm
