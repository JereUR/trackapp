'use client'

import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'tailwindcss/tailwind.css'
import mapboxSdk from '@mapbox/mapbox-sdk'
import directions from '@mapbox/mapbox-sdk/services/directions'
import polyline from '@mapbox/polyline'

import {
  destinationCompletedIcon,
  destinationIcon,
  destinationRefuseIcon,
  sendIcon,
  ZOOM_LEVEL
} from './MapsInfo'

const API_KEY = process.env.NEXT_PUBLIC_MAPBOX_KEY_API
const mapboxClient = mapboxSdk({ accessToken: API_KEY })
const directionsClient = directions(mapboxClient)

const ShipmentMap = ({ shipment }) => {
  const [routes, setRoutes] = useState([])
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize()
      }, 100)
    }
  }, [map])

  useEffect(() => {
    if (shipment.origin && shipment.delivery_points.length > 0) {
      const fetchRoutes = async () => {
        try {
          const routesPromises = shipment.delivery_points.map((marker) =>
            directionsClient
              .getDirections({
                profile: 'driving',
                waypoints: [
                  {
                    coordinates: [
                      shipment.actual_position.lng,
                      shipment.actual_position.lat
                    ]
                  },
                  {
                    coordinates: [
                      marker.destination.lng,
                      marker.destination.lat
                    ]
                  }
                ]
              })
              .send()
          )

          const routesResults = await Promise.all(routesPromises)

          const newRoutes = routesResults.map((result) => {
            const route = result.body.routes[0]
            const decodedGeometry = polyline.decode(route.geometry)
            return decodedGeometry.map(([lat, lng]) => ({ lat, lng }))
          })

          setRoutes(newRoutes)
        } catch (error) {
          console.error('Error fetching routes', error)
        }
      }

      fetchRoutes()
    }
  }, [shipment.actual_position, shipment.delivery_points])

  if (!shipment.origin) return null

  const position = [shipment.actual_position.lat, shipment.actual_position.lng]

  return (
    <MapContainer
      center={position}
      zoom={ZOOM_LEVEL}
      style={{ height: '350px', width: '100%' }}
      whenCreated={setMap}
      className="z-10"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker icon={sendIcon} position={position}>
        <Popup>
          <div
            style={{
              fontSize: '1.125rem',
              fontWeight: 'bold',
              marginBottom: '0.5rem'
            }}
          >
            {shipment.name}
          </div>
          <div style={{ fontSize: '0.875rem', color: '#4a5568' }}>
            Última actualización - {shipment.actual_position.time}hs
          </div>
        </Popup>
      </Marker>
      <MarkerClusterGroup>
        {shipment.delivery_points.map((point) => {
          const pointPosition = [point.destination.lat, point.destination.lng]
          let icon = destinationIcon
          let statusColor = '#d69e2e'
          if (point.status === 'Completado') {
            icon = destinationCompletedIcon
            statusColor = '#48bb78'
          } else if (point.status === 'Rechazado') {
            icon = destinationRefuseIcon
            statusColor = '#f56565'
          }
          return (
            <Marker key={point.id} icon={icon} position={pointPosition}>
              <Popup>
                <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                  {point.name}
                </div>
                <div style={{ fontSize: '0.875rem', color: statusColor }}>
                  Estado: {point.status}
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
      {routes.map((route, index) => (
        <Polyline key={index} positions={route} color="blue" />
      ))}
    </MapContainer>
  )
}

export default ShipmentMap
