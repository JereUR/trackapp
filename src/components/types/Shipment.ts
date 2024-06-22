import { User } from './User'

export type DeliveryPoint = {
  id: number
  name: string
  destination: { lat: number; lng: number }
  cargo: { quantity: number; product: string }[]
  status: string
}

export type Shipment = {
  id: number
  fleet_id: number
  assigned_driver: User
  delivery_points: DeliveryPoint[]
  name: string
  description?: string
  status: string
  created_at?: string
  updated_at?: string
  date: string
  time_start: string
  time_end: string
  origin?: { lat: number; lng: number }
  actual_position?: { lat: number; lng: number; time: string }
}

export interface PropsAddShipment {
  id?: number
  fleet_id?: number
  assigned_driver: User
  delivery_points: DeliveryPoint[]
  name: string
  description?: string
  date: Date
  time_start: string
  time_end: string
  origin?: { lat: number; lng: number }
}

export const posibleStatus = [
  'Programado',
  'Pendiente',
  'En progreso',
  'Completado',
  'Rechazado',
  'Cancelado'
]
