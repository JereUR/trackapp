import { Resume } from '../types/Record'

function generateRoute(
  start: { lat: number; lng: number },
  end: { lat: number; lng: number },
  numPoints: number
) {
  const route = []
  const latStep = (end.lat - start.lat) / (numPoints - 1)
  const lngStep = (end.lng - start.lng) / (numPoints - 1)

  for (let i = 0; i < numPoints; i++) {
    const lat = start.lat + i * latStep
    const lng = start.lng + i * lngStep
    const timestamp = new Date(Date.now() + i * 60000) // 1-minute intervals
    const speed = Math.floor(Math.random() * 31) + 50 // Random speed between 50 and 80

    route.push({
      id: i + 1,
      lat: lat,
      lng: lng,
      timestamp: timestamp,
      speed: speed
    })
  }

  return route
}

const startPoint = { lat: -34.89947572575007, lng: -57.95506625199881 }
const endPoint = { lat: -34.88004450506076, lng: -57.91232257035356 }
const numPoints = 200

export const exampleResume: Resume = {
  id: 1,
  fleet_id: 1,
  date: 'Mon Jul 01 2024 23:30:00 GMT-0300 (hora estándar de Argentina)',
  delivery_points: [
    {
      id: 1,
      name: 'Puerto A',
      destination: { lat: -34.882598687863755, lng: -57.91423600696487 },
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
      destination: { lat: -34.88188820357385, lng: -57.90975215272063 },
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
      id: 1,
      name: 'Puerto C',
      destination: { lat: -34.877558557119144, lng: -57.907217015735895 },
      cargo: [
        {
          quantity: 2,
          product: 'Vianda',
          delivered_quantity: 0
        },
        {
          quantity: 1,
          product: 'Vianda especial',
          delivered_quantity: 0
        }
      ],
      status: 'Cancelado'
    }
  ],
  route: generateRoute(startPoint, endPoint, numPoints),
  freeze_times: [
    {
      id: 1,
      start_time: new Date(
        'Mon Jul 01 2024 21:20:00 GMT-0300 (hora estándar de Argentina)'
      ),
      end_time: new Date(
        'Mon Jul 01 2024 21:45:00 GMT-0300 (hora estándar de Argentina)'
      ),
      lat: -34.89498408679676,
      lng: -57.94518580297528
    },
    {
      id: 2,
      start_time: new Date(
        'Mon Jul 01 2024 23:15:00 GMT-0300 (hora estándar de Argentina)'
      ),
      end_time: new Date(
        'Mon Jul 01 2024 23:25:00 GMT-0300 (hora estándar de Argentina)'
      ),
      lat: -34.89830399384921,
      lng: -57.952488743557886
    }
  ],
  total_distance: 100,
  drivers_id: [1, 2]
}
