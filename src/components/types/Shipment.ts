import { User } from './User'

export type Shipment = {
  id: number
  name: string
  description?: string
  status:
    | 'Programado'
    | 'Pendiente'
    | 'En progreso'
    | 'Completado'
    | 'Rechazado'
    | 'Cancelado'
  created_at?: string
  updated_at?: string
  assigned_driver: User | null
  destination: { lat: number; lng: number }
  date: string
  time: string
  origin?: { lat: number; lng: number }
  actual_position?: { lat: number; lng: number; time: string }
  fleet_id: number | null
  cargo: { quantity: number; product: string }[]
}
