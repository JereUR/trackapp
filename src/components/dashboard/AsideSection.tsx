'use client'

import { useEffect, useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import 'leaflet/dist/leaflet.css'
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'tailwindcss/tailwind.css'

import { Card, CardContent, CardTitle } from '../ui/card'
import useUser from '../hooks/useUser'
import useShipments from '../hooks/useShipments'
import { Shipment } from '../types/Shipment'
import {
  destinationCompletedIcon,
  destinationIcon,
  destinationRefuseIcon,
  sendIcon
} from './maps/MapsInfo'

const AsideSection = () => {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const { token, fleets, getFleets, loadingFleet } = useUser()
  const { getOnProgressShipments, loadingShipment } = useShipments()
  const [routes, setRoutes] = useState([])

  useEffect(() => {
    async function getShipments() {
      const onProgressShipments = await getOnProgressShipments()
      setShipments(onProgressShipments)
    }

    if (token) {
      getFleets()
      getShipments()
    }
  }, [token])

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-bold">Envios en progreso</p>
      {fleets &&
        fleets.map((fleet) => {
          const fleetShipments = shipments.filter(
            (shipment) => shipment.fleet_id === fleet.id
          )
          return (
            <Card key={fleet.id} className="bg-card p-4">
              <CardTitle className="text-xl font-light">{fleet.name}</CardTitle>
              <CardContent>
                {fleetShipments.length > 0 ? (
                  fleetShipments.map((shipment) => (
                    <div
                      key={shipment.id}
                      className="my-2 py-4 px-6 bg-gray-100 dark:bg-gray-800 rounded-lg"
                    >
                      <p>Envío: {shipment.name}</p>
                      <p>Descripción: {shipment.description}</p>
                      {shipment.origin && (
                        <MapContainer
                          center={[shipment.origin.lat, shipment.origin.lng]}
                          zoom={11}
                          className="h-48 w-full z-10"
                        >
                          <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                          />
                          <Marker
                            icon={sendIcon}
                            position={[
                              shipment.origin.lat,
                              shipment.origin.lng
                            ]}
                          >
                            <Popup>
                              {shipment.name}
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
                                <Marker
                                  key={point.id}
                                  icon={icon}
                                  position={[
                                    point.destination.lat,
                                    point.destination.lng
                                  ]}
                                >
                                  <Popup>
                                    {point.name}
                                    <br />
                                    {point.status}
                                  </Popup>
                                </Marker>
                              )
                            })}
                          </MarkerClusterGroup>
                        </MapContainer>
                      )}
                    </div>
                  ))
                ) : (
                  <p>Sin envíos en progreso</p>
                )}
              </CardContent>
            </Card>
          )
        })}
    </div>
  )
}

export default AsideSection
