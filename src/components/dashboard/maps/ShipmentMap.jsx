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
  sendIcon
} from './MapsInfo'

const API_KEY = process.env.NEXT_PUBLIC_MAPBOX_KEY_API
const mapboxClient = mapboxSdk({ accessToken: API_KEY })
const directionsClient = directions(mapboxClient)

const ShipmentMap = ({ shipment }) => {
  const [routes, setRoutes] = useState([])

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
                    coordinates: [shipment.origin.lng, shipment.origin.lat]
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
  }, [shipment.origin, shipment.delivery_points])

  if (!shipment.origin) return null

  const position = [shipment.origin.lat, shipment.origin.lng]

  return (
    <MapContainer center={position} zoom={11} className="h-48 w-full z-10">
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
      <MarkerClusterGroup>
        {shipment.delivery_points.map((point) => {
          const pointPosition = [point.destination.lat, point.destination.lng]
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
  )
}

export default ShipmentMap
