'use client'
import {
  initialCustomPoints,
  initialCustomShipments,
  initialShipments,
  onProgressShipments
} from '../db/ShipmentsData'

import { createContext, ReactNode, useState } from 'react'
import axios from 'axios'

import {
  Shipment,
  PropsAddShipment,
  CustomPoint,
  PropsAddCustomPoint,
  CustomShipment,
  PropsAddCustomShipment
} from '../types/Shipment'
import { useToast } from '../ui/use-toast'
import useUser from '../hooks/useUser'

type ShipmentsContextType = {
  shipments: Shipment[] | []
  loadingShipment: boolean
  countShipment: number
  getAllShipments: (fleet_id: number) => Promise<Shipment[] | []>
  getShipments: ({
    q,
    fleets_id
  }: {
    q: string
    fleets_id: number[]
  }) => Promise<void>
  getShipmentById: ({ id }: { id: string }) => Promise<Shipment | null>
  getOnProgressShipments: () => Promise<Shipment[]>
  addShipment: ({
    dataShipment
  }: {
    dataShipment: PropsAddShipment
  }) => Promise<boolean>
  updateShipment: ({
    dataShipment
  }: {
    dataShipment: PropsAddShipment
  }) => Promise<boolean>
  deleteShipmentById: (id: number) => Promise<boolean>
  customShipments: CustomShipment[]
  loadingCustomShipment: boolean
  countCustomShipment: number
  getCustomShipments: ({ q }: { q: string }) => Promise<void>
  getCustomShipmentById: ({
    id
  }: {
    id: string
  }) => Promise<CustomShipment | null>
  addCustomShipment: ({
    dataCustomShipment
  }: {
    dataCustomShipment: PropsAddCustomShipment
  }) => Promise<boolean>
  updateCustomShipment: ({
    dataCustomShipment
  }: {
    dataCustomShipment: PropsAddCustomShipment
  }) => Promise<boolean>
  deleteCustomShipmentById: (id: number) => Promise<boolean>
  customPoints: CustomPoint[]
  loadingCustomPoint: boolean
  countCustomPoint: number
  getCustomPoints: () => Promise<void>
  getCustomPointById: ({ id }: { id: string }) => Promise<CustomPoint | null>
  addCustomPoint: ({
    dataCustomPoint
  }: {
    dataCustomPoint: PropsAddCustomPoint
  }) => Promise<boolean>
  updateCustomPoint: ({
    dataCustomPoint
  }: {
    dataCustomPoint: PropsAddCustomPoint
  }) => Promise<boolean>
  deleteCustomPointById: (id: number) => Promise<boolean>
}

export const ShipmentsContext = createContext<ShipmentsContextType | null>(null)

export default function ShipmentsContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [shipments, setShipments] = useState<Shipment[]>([])
  const [customShipments, setCustomShipments] = useState<CustomShipment[]>([])
  const [customPoints, setCustomPoints] = useState<CustomPoint[]>([])
  const [loadingShipment, setLoadingShipment] = useState<boolean>(true)
  const [loadingCustomShipment, setLoadingCustomShipment] =
    useState<boolean>(true)
  const [loadingCustomPoint, setLoadingCustomPoint] = useState<boolean>(true)
  const [countShipment, setCountShipment] = useState<number>(0)
  const [countCustomShipment, setCountCustomShipment] = useState<number>(0)
  const [countCustomPoint, setCountCustomPoint] = useState<number>(0)
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
    setShipments(initialShipments)
    return
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
        setCountShipment(response.data.count)
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
    return onProgressShipments
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
    }
  }

  async function getShipmentById({
    id
  }: {
    id: string
  }): Promise<Shipment | null> {
    return initialShipments[0]
    setLoadingShipment(true)
    const params = new URLSearchParams()
    params.append('id', id)
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
    dataShipment
  }: {
    dataShipment: PropsAddShipment
  }): Promise<boolean> {
    setLoadingShipment(true)

    const newShipment = {
      fleet_id: dataShipment.fleet_id,
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
    dataShipment
  }: {
    dataShipment: PropsAddShipment
  }): Promise<boolean> {
    setLoadingShipment(true)
    const newShipment = {
      id: dataShipment.id,
      fleet_id: dataShipment.fleet_id,
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

  async function deleteShipmentById(id: number): Promise<boolean> {
    setLoadingShipment(true)
    const url = `${BASE_URL}api/v1/shipment`
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: token
        },
        data: {
          id
        }
      })

      if (response.status === 200 || response.status === 204) {
        toast({
          title: `Envíos con id:'${id}' eliminado.`,
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

  async function getCustomShipments({ q }: { q: string }): Promise<void> {
    setCustomShipments(initialCustomShipments)
    return
    setLoadingCustomShipment(true)
    const params = new URLSearchParams()
    params.append('regex', q)
    const url = `${BASE_URL}api/v1/custom-shipments?${params.toString()}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        setCustomShipments(response.data.shipments)
        setCountCustomShipment(response.data.count)
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
      setLoadingCustomShipment(false)
    }
  }

  async function getCustomShipmentById({
    id
  }: {
    id: string
  }): Promise<CustomShipment | null> {
    return initialCustomShipments[0]
    setLoadingCustomShipment(true)
    const params = new URLSearchParams()
    params.append('id', id)
    const url = `${BASE_URL}api/v1/custom-shipment?${params.toString()}`
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
      setLoadingCustomShipment(false)
    }
  }

  async function addCustomShipment({
    dataCustomShipment
  }: {
    dataCustomShipment: PropsAddCustomShipment
  }): Promise<boolean> {
    setLoadingCustomShipment(true)

    const newCustomShipment = {
      name: dataCustomShipment.name,
      delivery_points: dataCustomShipment.delivery_points,
      description: dataCustomShipment.description
    }

    const url = `${BASE_URL}api/v1/custom-shipment`
    try {
      const response = await axios.post(
        url,
        {
          customShipment: newCustomShipment
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
      setLoadingCustomShipment(false)
    }
  }

  async function updateCustomShipment({
    dataCustomShipment
  }: {
    dataCustomShipment: PropsAddCustomShipment
  }): Promise<boolean> {
    setLoadingCustomShipment(true)
    const newCustomShipment = {
      id: dataCustomShipment.id,
      name: dataCustomShipment.name,
      delivery_points: dataCustomShipment.delivery_points,
      description: dataCustomShipment.description
    }

    const url = `${BASE_URL}api/v1/custom-shipment`
    try {
      const response = await axios.put(
        url,
        {
          customShipment: newCustomShipment
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
      setLoadingCustomShipment(false)
    }
  }

  async function deleteCustomShipmentById(id: number): Promise<boolean> {
    setLoadingCustomShipment(true)
    const url = `${BASE_URL}api/v1/custom-shipment`
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: token
        },
        data: {
          id
        }
      })

      if (response.status === 200 || response.status === 204) {
        toast({
          title: `Envíos con id:'${id}' eliminado.`,
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
      setLoadingCustomShipment(false)
    }
  }

  async function getCustomPoints(): Promise<void> {
    setCustomPoints(initialCustomPoints)
    return
    setLoadingCustomPoint(true)
    const url = `${BASE_URL}api/v1/custom-points`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        setCustomPoints(response.data.points)
        setCountCustomPoint(response.data.count)
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
      setLoadingCustomPoint(false)
    }
  }

  async function getCustomPointById({
    id
  }: {
    id: string
  }): Promise<CustomPoint | null> {
    return initialCustomPoints[0]
    setLoadingCustomPoint(true)
    const params = new URLSearchParams()
    params.append('id', id)
    const url = `${BASE_URL}api/v1/custom-point?${params.toString()}`
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
      setLoadingCustomPoint(false)
    }
  }

  async function addCustomPoint({
    dataCustomPoint
  }: {
    dataCustomPoint: PropsAddCustomPoint
  }): Promise<boolean> {
    setLoadingCustomPoint(true)

    const newCustomPoint = {
      name: dataCustomPoint.name,
      lat: dataCustomPoint.lat,
      lng: dataCustomPoint.lng
    }

    const url = `${BASE_URL}api/v1/custom-point`
    try {
      const response = await axios.post(
        url,
        {
          customPoint: newCustomPoint
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
      setLoadingCustomPoint(false)
    }
  }

  async function updateCustomPoint({
    dataCustomPoint
  }: {
    dataCustomPoint: PropsAddCustomPoint
  }): Promise<boolean> {
    setLoadingCustomPoint(true)
    const newCustomPoint = {
      id: dataCustomPoint.id,
      name: dataCustomPoint.name,
      lat: dataCustomPoint.lat,
      lng: dataCustomPoint.lng
    }

    const url = `${BASE_URL}api/v1/custom-point`
    try {
      const response = await axios.put(
        url,
        {
          customPoint: newCustomPoint
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
      setLoadingCustomPoint(false)
    }
  }

  async function deleteCustomPointById(id: number): Promise<boolean> {
    setLoadingCustomPoint(true)
    const url = `${BASE_URL}api/v1/custom-point`
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: token
        },
        data: {
          id
        }
      })

      if (response.status === 200 || response.status === 204) {
        toast({
          title: `Punto con id:'${id}' eliminado.`,
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
      setLoadingCustomPoint(false)
    }
  }

  return (
    <ShipmentsContext.Provider
      value={{
        shipments,
        loadingShipment,
        countShipment,
        getAllShipments,
        getShipments,
        getOnProgressShipments,
        getShipmentById,
        addShipment,
        updateShipment,
        deleteShipmentById,
        customShipments,
        loadingCustomShipment,
        countCustomShipment,
        getCustomShipments,
        getCustomShipmentById,
        addCustomShipment,
        updateCustomShipment,
        deleteCustomShipmentById,
        customPoints,
        loadingCustomPoint,
        countCustomPoint,
        getCustomPoints,
        getCustomPointById,
        addCustomPoint,
        updateCustomPoint,
        deleteCustomPointById
      }}
    >
      {children}
    </ShipmentsContext.Provider>
  )
}
