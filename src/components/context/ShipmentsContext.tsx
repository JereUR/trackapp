'use client'

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
    page,
    fleet_id,
    ITEMS_PER_PAGE
  }: {
    q: string
    page: string
    fleet_id: number
    ITEMS_PER_PAGE: number
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

export const initialShipments: Shipment[] = [
  {
    id: 1,
    fleet_id: 2,
    assigned_driver: {
      id: 2,
      email: 'leanlibutti@gmail.com',
      first_name: 'Leandro',
      last_name: 'Libutti'
    },
    delivery_points: [
      {
        id: 1,
        name: 'Punto 1',
        destination: { lat: -34.88204962931506, lng: -57.91417848120565 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'Completado'
      },
      {
        id: 2,
        name: 'Punto 2',
        destination: { lat: -34.88183840030232, lng: -57.91396390448096 },
        cargo: [
          { quantity: 3, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'Completado'
      },
      {
        id: 3,
        name: 'Punto 3',
        destination: { lat: -34.88173718620799, lng: -57.91377614984685 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 4, product: 'Vianda especial' }
        ],
        status: 'Completado'
      }
    ],
    name: 'Envío 1',
    description: 'Descripción de envío',
    status: 'Completado',
    created_at: '19-06-2024',
    updated_at: '19-06-2024',
    date: '20-06-2024',
    time_start: '08:30',
    time_end: '12:30',
    origin: { lat: -34.872314829415, lng: -58.02926980686927 },
    actual_position: {
      lat: -34.88177239112451,
      lng: -57.91270326622338,
      time: '12:30:30'
    }
  },
  {
    id: 2,
    fleet_id: 1,
    assigned_driver: {
      id: 1,
      email: 'jeremias.jdv@gmail.com',
      first_name: 'Jeremías',
      last_name: 'Dominguez Vega'
    },
    delivery_points: [
      {
        id: 1,
        name: 'Punto 1',
        destination: { lat: -34.88204962931506, lng: -57.91417848120565 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'En progreso'
      },
      {
        id: 2,
        name: 'Punto 2',
        destination: { lat: -34.88183840030232, lng: -57.91396390448096 },
        cargo: [
          { quantity: 3, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'Pendiente'
      },
      {
        id: 3,
        name: 'Punto 3',
        destination: { lat: -34.88173718620799, lng: -57.91377614984685 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 4, product: 'Vianda especial' }
        ],
        status: 'Pendiente'
      }
    ],
    name: 'Envío 2',
    description: 'Descripción de envío',
    status: 'En progreso',
    created_at: '20-06-2024',
    updated_at: '20-06-2024',
    date: '21-06-2024',
    time_start: '08:30',
    time_end: '12:30',
    origin: { lat: -34.872314829415, lng: -58.02926980686927 },
    actual_position: {
      lat: -34.88788927113821,
      lng: -57.9997714415257,
      time: '10:21:30'
    }
  },
  {
    id: 3,
    fleet_id: 2,
    assigned_driver: {
      id: 2,
      email: 'leanlibutti@gmail.com',
      first_name: 'Leandro',
      last_name: 'Libutti'
    },
    delivery_points: [
      {
        id: 1,
        name: 'Punto 1',
        destination: { lat: -34.88204962931506, lng: -57.91417848120565 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'Completado'
      },
      {
        id: 2,
        name: 'Punto 2',
        destination: { lat: -34.88183840030232, lng: -57.91396390448096 },
        cargo: [
          { quantity: 3, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'En progreso'
      },
      {
        id: 3,
        name: 'Punto 3',
        destination: { lat: -34.88173718620799, lng: -57.91377614984685 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 4, product: 'Vianda especial' }
        ],
        status: 'Pendiente'
      }
    ],
    name: 'Envío 3',
    description: 'Descripción de envío',
    status: 'En progreso',
    created_at: '20-06-2024',
    updated_at: '20-06-2024',
    date: '21-06-2024',
    time_start: '08:30',
    time_end: '12:30',
    origin: { lat: -34.872314829415, lng: -58.02926980686927 },
    actual_position: {
      lat: -34.882076032903484,
      lng: -57.91418921004188,
      time: '10:21:30'
    }
  },
  {
    id: 4,
    fleet_id: 2,
    assigned_driver: {
      id: 2,
      email: 'jeremias.jdv@gmail.com',
      first_name: 'Jeremias',
      last_name: 'Dominguez Vega'
    },
    delivery_points: [
      {
        id: 1,
        name: 'Punto 1',
        destination: { lat: -34.88204962931506, lng: -57.91417848120565 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'Programado'
      },
      {
        id: 2,
        name: 'Punto 2',
        destination: { lat: -34.88183840030232, lng: -57.91396390448096 },
        cargo: [
          { quantity: 3, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'Programado'
      },
      {
        id: 3,
        name: 'Punto 3',
        destination: { lat: -34.88173718620799, lng: -57.91377614984685 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 4, product: 'Vianda especial' }
        ],
        status: 'Programado'
      }
    ],
    name: 'Envío 4',
    description: 'Descripción de envío',
    status: 'Programado',
    created_at: '20-06-2024',
    updated_at: '20-06-2024',
    date: '22-06-2024',
    time_start: '08:30',
    time_end: '12:30',
    origin: { lat: -34.872314829415, lng: -58.02926980686927 },
    actual_position: undefined
  }
]

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
    }
  }

  async function getShipments({
    q,
    page,
    fleet_id,
    ITEMS_PER_PAGE
  }: {
    q: string
    page: string
    fleet_id: number
    ITEMS_PER_PAGE: number
  }): Promise<void> {
    setLoadingShipment(true)
    const params = new URLSearchParams()
    params.append('regex', q)
    params.append('page', page)
    params.append('items_per_page', ITEMS_PER_PAGE.toString())
    params.append('fleet_id', fleet_id.toString())
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
      return [initialShipments[1], initialShipments[2]]
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
      time_end: dataShipment.time_end,
      origin: dataShipment.origin ? dataShipment.origin : undefined
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
      time_end: dataShipment.time_end,
      origin: dataShipment.origin ? dataShipment.origin : undefined
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
