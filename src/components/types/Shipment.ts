import { User } from './User'

export type DeliveryPoint = {
  id: number
  name: string
  destination: { lat: number; lng: number }
  cargo: { quantity: number; product: string }[]
  description?: string
  status: string
  observations?: string
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
  assigned_driver: { first_name: string; last_name: string }
  delivery_points: DeliveryPoint[]
  name: string
  time_start: string
  time_end: string
}

export type ShipmentGroup = {
  date: string
  shipments: ShipmentItem[]
}

interface Cargo {
  quantity: number
  product: string
}

interface Coords {
  lat: number
  lng: number
}

export interface PropsAddCargo {
  quantity: number
  product: string
}

export const initialCargo: PropsAddCargo = {
  quantity: 0,
  product: ''
}

export interface PropsAddDeliveryPoint {
  id?: number | null
  name: string
  destination: Coords | null
  description?: string
  cargo: Cargo[]
  [key: string]: number | null | Coords | string | Cargo[] | undefined
}

export interface PropsAddShipment {
  id?: number | null
  fleet_id?: number | null
  assigned_driver_id: number | null
  delivery_points: PropsAddDeliveryPoint[]
  name: string
  description?: string
  date: Date
  time_start: string
  time_end: string
  [key: string]:
    | number
    | null
    | PropsAddDeliveryPoint[]
    | string
    | Date
    | undefined
}

export const initialDeliveryData = {
  id: null,
  name: '',
  destination: null,
  cargo: [],
  description: ''
}

export const initialData: PropsAddShipment = {
  id: null,
  fleet_id: null,
  assigned_driver_id: null,
  delivery_points: [],
  name: '',
  description: '',
  date: new Date(),
  time_start: '',
  time_end: ''
}

export const initialDataEdit: PropsAddShipment = {
  id: 3,
  fleet_id: 2,
  assigned_driver_id: 2,
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
  date: new Date(
    'Mon Jul 01 2024 21:13:44 GMT-0300 (hora estándar de Argentina)'
  ),
  time_start: '19:30',
  time_end: '21:15'
}

export interface FormErrorsShipment {
  fleet_id?: string
  assigned_driver_id?: string
  delivery_points?: string
  name?: string
  description?: string
  date?: string
  time_start?: string
  time_end?: string
  [key: string]: string | undefined
}

export interface FormErrorsDeliveryPoint {
  delivery_point?: string
  name?: string
  destination?: string
}

export const initialErrorsDeliveryPoint: FormErrorsDeliveryPoint = {
  delivery_point: '',
  name: '',
  destination: ''
}

export interface FormErrorsCargo {
  quantity?: string
  product?: string
}

export const initialErrorsCargo: FormErrorsCargo = {
  quantity: '',
  product: ''
}

export const initialErrorsShipment: FormErrorsShipment = {
  fleet_id: '',
  assigned_driver_id: '',
  delivery_points: '',
  name: '',
  description: '',
  date: '',
  time_start: '',
  time_end: ''
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
