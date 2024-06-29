'use client'
/* import { initialShipments, onProgressShipments } from '../db/ShipmentsData' */

import { createContext, ReactNode, useState } from 'react'
import axios from 'axios'

import { Shipment, PropsAddShipment } from '../types/Shipment'
import { useToast } from '../ui/use-toast'
import useUser from '../hooks/useUser'

type ShipmentsContextType = {
  shipments: Shipment[] | []
  loadingShipment: boolean
  count: number
  getAllShipments: (fleet_id: number) => Promise<Shipment[] | []>
  getShipments: ({
    q,
    fleets_id
  }: {
    q: string
    fleets_id: number[]
  }) => Promise<void>
  getShipmentById: ({
    id,
    fleet_id
  }: {
    id: string
    fleet_id: number
  }) => Promise<Shipment | null>
  getOnProgressShipments: () => Promise<Shipment[]>
  addShipment: ({
    dataShipment,
    fleet_id
  }: {
    dataShipment: PropsAddShipment
    fleet_id: number
  }) => Promise<boolean>
  updateShipment: ({
    dataShipment,
    fleet_id
  }: {
    dataShipment: PropsAddShipment
    fleet_id: number
  }) => Promise<boolean>
  deleteShipmentsById: (Shipments: number[]) => Promise<boolean>
}

export const ShipmentsContext = createContext<ShipmentsContextType | null>(null)

export default function ShipmentsContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [shipments, setShipments] = useState<Shipment[] | []>([])
  const [loadingShipment, setLoadingShipment] = useState<boolean>(true)
  const [count, setCount] = useState(0)
  const { toast } = useToast()
  const { token } = useUser()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  async function getAllShipments(fleet_id: number): Promise<Shipment[] | []> {
    setLoadingShipment(true)
    const url = `${BASE_URL}api/v1/all_shipments?fleet_id=${fleet_id}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return []
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return []
    } finally {
      setLoadingShipment(false)
      /* return initialShipments */
    }
  }

  async function getShipments({
    q,
    fleets_id
  }: {
    q: string
    fleets_id: number[]
  }): Promise<void> {
    setLoadingShipment(true)
    const params = new URLSearchParams()
    params.append('regex', q)
    params.append('fleet_ids', fleets_id.toString())
    const url = `${BASE_URL}api/v1/shipments?${params.toString()}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        setShipments(response.data.shipments)
        setCount(response.data.count)
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } finally {
      setLoadingShipment(false)
      /* setShipments(initialShipments) */
    }
  }

  async function getOnProgressShipments(): Promise<Shipment[]> {
    setLoadingShipment(true)
    const url = `${BASE_URL}api/v1/on_progress_shipments`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data.shipments
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return []
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return []
    } finally {
      setLoadingShipment(false)
      /* return onProgressShipments */
    }
  }

  async function getShipmentById({
    id,
    fleet_id
  }: {
    id: string
    fleet_id: number
  }): Promise<Shipment | null> {
    setLoadingShipment(true)
    const params = new URLSearchParams()
    params.append('id', id)
    params.append('fleet_id', fleet_id.toString())
    const url = `${BASE_URL}api/v1/shipment?${params.toString()}`
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return null
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return null
    } finally {
      setLoadingShipment(false)
    }
  }

  async function addShipment({
    dataShipment,
    fleet_id
  }: {
    dataShipment: PropsAddShipment
    fleet_id: number
  }): Promise<boolean> {
    setLoadingShipment(true)

    const newShipment = {
      fleet_id,
      assigned_driver: dataShipment.assigned_driver,
      delivery_points: dataShipment.delivery_points,
      name: dataShipment.name,
      description: dataShipment.description,
      date: dataShipment.date,
      time_start: dataShipment.time_start,
      time_end: dataShipment.time_end
    }

    const url = `${BASE_URL}api/v1/shipment`
    try {
      const response = await axios.post(
        url,
        {
          shipment: newShipment
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 201) {
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingShipment(false)
    }
  }

  async function updateShipment({
    dataShipment,
    fleet_id
  }: {
    dataShipment: PropsAddShipment
    fleet_id: number
  }): Promise<boolean> {
    setLoadingShipment(true)
    const newShipment = {
      id: dataShipment.id,
      fleet_id,
      assigned_driver: dataShipment.assigned_driver,
      delivery_points: dataShipment.delivery_points,
      name: dataShipment.name,
      description: dataShipment.description,
      date: dataShipment.date,
      time_start: dataShipment.time_start,
      time_end: dataShipment.time_end
    }

    const url = `${BASE_URL}api/v1/shipment`
    try {
      const response = await axios.put(
        url,
        {
          shipment: newShipment
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 200 || response.status === 204) {
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingShipment(false)
    }
  }

  async function deleteShipmentsById(shipments: number[]): Promise<boolean> {
    setLoadingShipment(true)
    const url = `${BASE_URL}api/v1/shipment`
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: token
        },
        data: {
          ids: shipments
        }
      })

      if (response.status === 200 || response.status === 204) {
        toast({
          title: `Envíos con id:'${shipments.map(
            (shipment) => shipment
          )}' eliminado.`,
          className: 'bg-green-600'
        })
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingShipment(false)
    }
  }

  return (
    <ShipmentsContext.Provider
      value={{
        shipments,
        loadingShipment,
        count,
        getAllShipments,
        getShipments,
        getOnProgressShipments,
        getShipmentById,
        addShipment,
        updateShipment,
        deleteShipmentsById
      }}
    >
      {children}
    </ShipmentsContext.Provider>
  )
}
