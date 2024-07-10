import { Resume } from '../types/Record'

export const exampleResume: Resume = {
  id: 1,
  fleet_id: 1,
  date: 'Mon Jul 01 2024 23:30:00 GMT-0300 (hora estándar de Argentina)',
  delivery_points: [
    {
      id: 1,
      name: 'Puerto A',
      destination: { lat: 19.4326, lng: -99.1332 },
      cargo: [
        {
          quantity: 2,
          product: 'Vianda',
          delivered_quantity: 2
        },
        {
          quantity: 1,
          product: 'Vianda especial',
          delivered_quantity: 1
        }
      ],
      status: 'Completado'
    },
    {
      id: 2,
      name: 'Puerto B',
      destination: { lat: 19.4326, lng: -99.1332 },
      cargo: [
        {
          quantity: 2,
          product: 'Vianda',
          delivered_quantity: 2
        },
        {
          quantity: 1,
          product: 'Vianda especial',
          delivered_quantity: 1
        }
      ],
      status: 'Completado'
    }
  ],
  route: [
    {
      id: 1,
      lat: 19.4326,
      lng: -99.1332,
      timestamp: new Date(
        'Mon Jul 01 2024 23:30:00 GMT-0300 (hora estándar de Argentina)'
      ),
      speed: 50
    },
    {
      id: 2,
      lat: 19.4326,
      lng: -99.1332,
      timestamp: new Date(
        'Mon Jul 01 2024 23:45:00 GMT-0300 (hora estándar de Argentina)'
      ),
      speed: 60
    },
    {
      id: 3,
      lat: 19.4326,
      lng: -99.1332,
      timestamp: new Date(
        'Mon Jul 01 2024 23:55:00 GMT-0300 (hora estándar de Argentina)'
      ),
      speed: 70
    }
  ],
  freeze_times: [
    {
      id: 1,
      start_time: new Date(
        'Mon Jul 01 2024 21:20:00 GMT-0300 (hora estándar de Argentina)'
      ),
      end_time: new Date(
        'Mon Jul 01 2024 21:45:00 GMT-0300 (hora estándar de Argentina)'
      ),
      lat: 19.4326,
      lng: -99.1332
    },
    {
      id: 2,
      start_time: new Date(
        'Mon Jul 01 2024 23:15:00 GMT-0300 (hora estándar de Argentina)'
      ),
      end_time: new Date(
        'Mon Jul 01 2024 23:25:00 GMT-0300 (hora estándar de Argentina)'
      ),
      lat: 19.4326,
      lng: -99.1332
    }
  ],
  total_distance: 100,
  drivers_id: [1, 2]
}
