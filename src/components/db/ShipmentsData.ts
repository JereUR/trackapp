import { Shipment } from '../types/Shipment'

export const initialShipments: Shipment[] = [
  {
    id: 1,
    fleet_id: 2,
    assigned_driver: {
      id: 2,
      email: 'leanlibutti@gmail.com',
      first_name: 'Leandro',
      last_name: 'Libutti'
    },
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
        status: 'Completado'
      },
      {
        id: 3,
        name: 'Punto 3',
        destination: { lat: -34.88173718620799, lng: -57.91377614984685 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 4, product: 'Vianda especial' }
        ],
        status: 'Completado'
      }
    ],
    name: 'Envío 1 con un nombre mas largo',
    description: 'Descripción de envío',
    status: 'Completado',
    created_at: '19-06-2024',
    updated_at: '19-06-2024',
    date: '20-07-2024',
    time_start: '07:30',
    time_end: '10:30',
    origin: { lat: -34.872314829415, lng: -58.02926980686927 },
    actual_position: {
      lat: -34.88177239112451,
      lng: -57.91270326622338,
      time: '12:30:30'
    }
  },
  {
    id: 2,
    fleet_id: 1,
    assigned_driver: {
      id: 1,
      email: 'jeremias.jdv@gmail.com',
      first_name: 'Jeremías',
      last_name: 'Dominguez Vega'
    },
    delivery_points: [
      {
        id: 1,
        name: 'Punto 1',
        destination: { lat: -34.88204962931506, lng: -57.91417848120565 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'En progreso'
      },
      {
        id: 2,
        name: 'Punto 2',
        destination: { lat: -34.88183840030232, lng: -57.91396390448096 },
        cargo: [
          { quantity: 3, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'Pendiente'
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
    name: 'Envío 2',
    description: 'Descripción de envío',
    status: 'En progreso',
    created_at: '20-06-2024',
    updated_at: '20-06-2024',
    date: '21-07-2024',
    time_start: '20:30',
    time_end: '23:30',
    origin: { lat: -34.872314829415, lng: -58.02926980686927 },
    actual_position: {
      lat: -34.88788927113821,
      lng: -57.9997714415257,
      time: '10:21:30'
    }
  },
  {
    id: 3,
    fleet_id: 2,
    assigned_driver: {
      id: 2,
      email: 'leanlibutti@gmail.com',
      first_name: 'Leandro',
      last_name: 'Libutti'
    },
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
    status: 'En progreso',
    created_at: '20-06-2024',
    updated_at: '20-06-2024',
    date: '21-07-2024',
    time_start: '19:30',
    time_end: '21:15',
    origin: { lat: -34.872314829415, lng: -58.02926980686927 },
    actual_position: {
      lat: -34.900053983042916,
      lng: -57.95588709709627,
      time: '10:21:30'
    }
  },
  {
    id: 4,
    fleet_id: 2,
    assigned_driver: {
      id: 2,
      email: 'jeremias.jdv@gmail.com',
      first_name: 'Jeremias',
      last_name: 'Dominguez Vega'
    },
    delivery_points: [
      {
        id: 1,
        name: 'Punto 1',
        destination: { lat: -34.88204962931506, lng: -57.91417848120565 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'Programado'
      },
      {
        id: 2,
        name: 'Punto 2',
        destination: { lat: -34.88183840030232, lng: -57.91396390448096 },
        cargo: [
          { quantity: 3, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'Programado'
      },
      {
        id: 3,
        name: 'Punto 3',
        destination: { lat: -34.88173718620799, lng: -57.91377614984685 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 4, product: 'Vianda especial' }
        ],
        status: 'Programado'
      }
    ],
    name: 'Envío 4',
    description: 'Descripción de envío',
    status: 'Programado',
    created_at: '20-06-2024',
    updated_at: '20-06-2024',
    date: '22-07-2024',
    time_start: '08:30',
    time_end: '10:30',
    origin: { lat: -34.872314829415, lng: -58.02926980686927 },
    actual_position: undefined
  }
]

export const onProgressShipments: Shipment[] = [
  {
    id: 2,
    fleet_id: 1,
    assigned_driver: {
      id: 1,
      email: 'jeremias.jdv@gmail.com',
      first_name: 'Jeremías',
      last_name: 'Dominguez Vega'
    },
    delivery_points: [
      {
        id: 1,
        name: 'Punto 1',
        destination: { lat: -34.88204962931506, lng: -57.91417848120565 },
        cargo: [
          { quantity: 2, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'En progreso'
      },
      {
        id: 2,
        name: 'Punto 2',
        destination: { lat: -34.88183840030232, lng: -57.91396390448096 },
        cargo: [
          { quantity: 3, product: 'Vianda normal' },
          { quantity: 2, product: 'Vianda especial' }
        ],
        status: 'Pendiente'
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
    name: 'Envío 2',
    description: 'Descripción de envío',
    status: 'En progreso',
    created_at: '20-06-2024',
    updated_at: '20-06-2024',
    date: '21-06-2024',
    time_start: '08:30',
    time_end: '12:30',
    origin: { lat: -34.872314829415, lng: -58.02926980686927 },
    actual_position: {
      lat: -34.88788927113821,
      lng: -57.9997714415257,
      time: '10:21:30'
    }
  },
  {
    id: 3,
    fleet_id: 2,
    assigned_driver: {
      id: 2,
      email: 'leanlibutti@gmail.com',
      first_name: 'Leandro',
      last_name: 'Libutti'
    },
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
    status: 'En progreso',
    created_at: '20-06-2024',
    updated_at: '20-06-2024',
    date: '21-06-2024',
    time_start: '08:30',
    time_end: '12:30',
    origin: { lat: -34.872314829415, lng: -58.02926980686927 },
    actual_position: {
      lat: -34.900053983042916,
      lng: -57.95588709709627,
      time: '10:21:30'
    }
  }
]
