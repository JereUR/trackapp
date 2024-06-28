'use client'

import { useEffect, useState } from 'react'
import 'leaflet/dist/leaflet.css'
import 'tailwindcss/tailwind.css'

import { Card, CardContent, CardTitle } from '../../ui/card'
import useUser from '../../hooks/useUser'
import useShipments from '../../hooks/useShipments'
import { Shipment } from '../../types/Shipment'
import ShipmentMap from '../maps/ShipmentMap'
import { IoContract, IoExpand } from 'react-icons/io5'
import ModalMap from '../maps/ModalMap'

const AsideSection = () => {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [expandMap, setExpandMap] = useState<
    { shipment_id: number; state: boolean }[]
  >([])
  const [modalShipment, setModalShipment] = useState<Shipment | null>(null)
  const { token, fleets, getFleets, loadingFleet } = useUser()
  const { getOnProgressShipments, loadingShipment } = useShipments()

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

  useEffect(() => {
    if (shipments.length > 0) {
      setExpandMap(
        shipments.map((shipment) => ({
          shipment_id: shipment.id,
          state: false
        }))
      )
    }
  }, [shipments])

  const changeState = (id: number | undefined) => {
    if (id !== undefined) {
      const newExpandMap = expandMap.map((item) => {
        if (item.shipment_id === id) {
          if (!item.state) {
            const selectedShipment = shipments.find(
              (shipment) => shipment.id === id
            )
            setModalShipment(selectedShipment || null)
          } else {
            setModalShipment(null)
          }
          return {
            shipment_id: item.shipment_id,
            state: !item.state
          }
        } else {
          return item
        }
      })
      setExpandMap(newExpandMap)
    }
  }

  const isAnyMapExpanded = expandMap.some((item) => item.state)

  return (
    <div className="flex flex-col gap-6">
      <p className="text-2xl font-bold">Envios en progreso</p>
      {fleets &&
        fleets.map((fleet) => {
          const fleetShipments = shipments.filter(
            (shipment) => shipment.fleet_id === fleet.id
          )
          return (
            <Card
              key={fleet.id}
              className="bg-card p-4 border-gray-400 dark:border-accent shadow-md"
            >
              <CardTitle className="text-2xl font-semibold">
                {fleet.name}
              </CardTitle>
              <CardContent className="p-0 ">
                {fleetShipments.length > 0 ? (
                  fleetShipments.map((shipment) => {
                    const expand = expandMap.find(
                      (item) => item.shipment_id === shipment.id
                    )
                    return (
                      <div
                        key={shipment.id}
                        className="mt-2 mb-4 py-4 px-6 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-inner"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-lg font-medium text-gray-800 dark:text-gray-200">
                              Envío: {shipment.name}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Descripción: {shipment.description}
                            </p>
                          </div>
                          <button
                            onClick={() => changeState(expand?.shipment_id)}
                            className="text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-gray-100 transition-colors"
                          >
                            {expand?.state ? (
                              <IoContract size={24} />
                            ) : (
                              <IoExpand size={24} />
                            )}
                          </button>
                        </div>
                        {shipment.origin && !isAnyMapExpanded && (
                          <div className="mt-4">
                            <ShipmentMap shipment={shipment} />
                          </div>
                        )}
                      </div>
                    )
                  })
                ) : (
                  <p>Sin envíos en progreso</p>
                )}
              </CardContent>
            </Card>
          )
        })}
      {modalShipment && (
        <ModalMap
          shipment={modalShipment}
          onClose={() => {
            setModalShipment(null)
            setExpandMap(
              expandMap.map((item) => ({
                ...item,
                state:
                  item.shipment_id === modalShipment.id ? false : item.state
              }))
            )
          }}
        />
      )}
    </div>
  )
}

export default AsideSection
