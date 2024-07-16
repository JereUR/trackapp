import { DeliveryPoint } from './Shipment'

interface Route {
  id: number
  lat: number
  lng: number
  timestamp: Date
  altitude?: number
  accuracy?: number
  speed?: number
  heading?: number
}

interface FreezeTime {
  id: number
  start_time: Date
  end_time: Date
  lat: number
  lng: number
}

export type Resume = {
  id: number
  fleet_id: number
  date: string
  delivery_points: DeliveryPoint[]
  route: Route[]
  freeze_times: FreezeTime[]
  total_distance: number
  drivers_id: number[]
}

export interface PropsGetResume {
  fleet_id: number | null
  date: Date
  [key: string]: number | Date | null
}

export const initialDataGetResume: PropsGetResume = {
  fleet_id: null,
  date: new Date()
}

export interface FormErrorsGetResume {
  fleet_id?: string
  date?: string
  [key: string]: string | undefined
}

export const initialErrorsGetResume: FormErrorsGetResume = {
  fleet_id: '',
  date: ''
}
