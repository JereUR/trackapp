import { Fleet } from '../types/Fleet'

export const initialFleets: Fleet[] = [
  {
    id: 1,
    name: 'Fleet 1',
    description: 'Fleet 1 description',
    gps: 1,
    on_working_area: true
  },
  {
    id: 2,
    name: 'Fleet 2',
    description: 'Fleet 2 description',
    gps: 2,
    on_working_area: false
  }
]
