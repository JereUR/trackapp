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
