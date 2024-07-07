export type Fleet = {
  id: number
  name: string
  description?: string
  gps: number | null
  
}

export interface PropsUpdateFleet {
  id: number
  name: string
  description: string | undefined
}

export const initialDataUpdate = {
  id: 0,
  name: '',
  description: ''
}
