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

export type ShipmentItem = {
  id: number
  fleet_id: number
  name: string
  time_start: string
  time_end: string
}

export type ShipmentGroup = {
  date: string
  shipments: ShipmentItem[]
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
}

export const posibleStatus = [
  'Programado',
  'Pendiente',
  'En progreso',
  'Completado',
  'Rechazado',
  'Cancelado'
]

export const times = [
  '07:30',
  '07:45',
  '08:00',
  '08:15',
  '08:30',
  '08:45',
  '09:00',
  '09:15',
  '09:30',
  '09:45',
  '10:00',
  '10:15',
  '10:30',
  '19:30',
  '19:45',
  '20:00',
  '20:15',
  '20:30',
  '20:45',
  '21:00',
  '21:15',
  '21:30',
  '21:45',
  '22:00',
  '22:15',
  '22:30',
  '22:45',
  '23:00',
  '23:15',
  '23:30'
]
