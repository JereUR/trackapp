'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import Link from 'next/link'

import { destinationIcon, ZOOM_LEVEL_FORM } from './MapsInfo'
import { Button } from '@/components/ui/button'
import useShipments from '@/components/hooks/useShipments'

const CustomPointsMap = ({ points }) => {
  const [map, setMap] = useState(null)
  const { deleteCustomPointById } = useShipments()

  useEffect(() => {
    if (map) {
      setInterval(() => {
        map.invalidateSize()
      }, 100)
    }
  }, [map])

  const handleDelete = async (point) => {
    if (
      window.confirm(
        `¿Estás seguro de que deseas eliminar el punto '${point.name}'?`
      )
    ) {
      await deleteCustomPointById(point.id)
    }
  }

  return (
    <MapContainer
      center={[-34.88644565879525, -57.91434285964627]}
      zoom={ZOOM_LEVEL_FORM}
      style={{
        height: '80vh',
        width: '90%',
        margin: 'auto',
        borderRadius: '10px',
        padding: '8px',
        backgroundColor: '#f0f0f0', 
        boxShadow: '0 10px 15px rgba(0, 0, 0, 0.1)',
        border: '1px solid #e0e0e0'
      }}
      whenCreated={setMap}
      className="z-20"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {points.length > 0 &&
        points.map((point) => (
          <Marker
            key={point.id}
            icon={destinationIcon}
            position={[point.lat, point.lng]}
          >
            <Popup>
              <div>
                <p className="text-lg font-semibold">{point?.name}</p>
                <div className="flex gap-2">
                  <Link
                    href={
                      '/panel-de-control/envios/predeterminados/editar-punto'
                    }
                  >
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white px-3 py-1 rounded">
                      Editar
                    </Button>
                  </Link>
                  <Button
                    className="bg-red-500 hover:bg-red-700 text-white px-3 py-1 rounded"
                    onClick={() => handleDelete(point)}
                  >
                    Borrar
                  </Button>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  )
}

export default CustomPointsMap
