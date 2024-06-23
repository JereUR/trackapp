'use client'

import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import { IoContract } from 'react-icons/io5'
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

const ModalMap = ({ shipment, onClose }) => {
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
  }, [shipment.actual_position, shipment.delivery_points, onClose])

  if (!shipment.origin) return null

  const position = [shipment.actual_position.lat, shipment.actual_position.lng]
  return (
    <div
      id="modalBackdrop"
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
    >
      <div className="bg-white dark:bg-gray-800 p-4  m-8 rounded shadow-lg w-full max-w-lg mx-2">
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <IoContract />
          </button>
        </div>
        <MapContainer
          center={position}
          zoom={ZOOM_LEVEL}
          style={{ height: '80vh', width: '100%' }}
          whenCreated={setMap}
          className="z-50"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker icon={sendIcon} position={position}>
            <Popup>
              {shipment.name} - {shipment.actual_position.time}hs
              <br />
              {shipment.description}
            </Popup>
          </Marker>
          <MarkerClusterGroup>
            {shipment.delivery_points.map((point) => {
              const pointPosition = [
                point.destination.lat,
                point.destination.lng
              ]
              let icon = destinationIcon
              if (point.status === 'Completado') {
                icon = destinationCompletedIcon
              } else if (point.status === 'Rechazado') {
                icon = destinationRefuseIcon
              }
              return (
                <Marker key={point.id} icon={icon} position={pointPosition}>
                  <Popup>
                    {point.name}
                    <br />
                    {point.status}
                  </Popup>
                </Marker>
              )
            })}
          </MarkerClusterGroup>
          {routes.map((route, index) => (
            <Polyline key={index} positions={route} color="blue" />
          ))}
        </MapContainer>
      </div>
    </div>
  )
}

export default ModalMap
