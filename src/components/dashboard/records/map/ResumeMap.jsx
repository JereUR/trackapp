import 'leaflet/dist/leaflet.css'
import { useState, useEffect } from 'react'
import { MapContainer, Marker, Popup, TileLayer, Polyline } from 'react-leaflet'
import MarkerClusterGroup from 'react-leaflet-cluster'
import 'tailwindcss/tailwind.css'

import {
  freezeTimeIcon,
  sendIcon,
  ZOOM_LEVEL_FORM,
  destinationCompletedIcon,
  destinationRefuseIcon,
  destinationIcon
} from '../../maps/MapsInfo'
import { Cross1Icon } from '@radix-ui/react-icons'

const ResumeMap = ({ resume, onClose }) => {
  const [map, setMap] = useState(null)

  useEffect(() => {
    if (map) {
      setInterval(function () {
        map.invalidateSize()
      }, 100)
    }
  }, [map])

  if (!resume.route) return null

  const position = [resume.route[0].lat, resume.route[0].lng]
  const fecha = resume.route[0].timestamp.getHours()
  const minutos = resume.route[0].timestamp.getMinutes()
  const segundos = resume.route[0].timestamp.getSeconds()

  const initialResumeTime = `${fecha.toString().padStart(2, '0')}:${minutos
    .toString()
    .padStart(2, '0')}:${segundos.toString().padStart(2, '0')}`

  const formatTime = (timeString) => {
    const dateObject = new Date(timeString)
    const hours = dateObject.getHours()
    const minutes = dateObject.getMinutes()
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`
  }

  const calculateDuration = (startTime, endTime) => {
    const startDate = new Date(startTime)
    const endDate = new Date(endTime)
    const durationMs = endDate.getTime() - startDate.getTime()
    return (durationMs / 1000 / 60).toFixed(1)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-background dark:bg-gray-800 p-2 md:p-4 m-2 md:m-8 rounded shadow-lg w-full mx-2">
        <div className="flex justify-end mb-2">
          <button
            onClick={onClose}
            className="bg-gray-700 text-gray-200 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
          >
            <Cross1Icon className="text-red-600 h-6 w-6" />
          </button>
        </div>
        <MapContainer
          center={position}
          zoom={ZOOM_LEVEL_FORM}
          style={{ height: '80vh', width: '100%' }}
          whenCreated={setMap}
          className="z-20"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker icon={sendIcon} position={position}>
            <Popup>
              <div
                style={{
                  fontSize: '1.125rem',
                  fontWeight: 'bold',
                  marginBottom: '0.5rem'
                }}
              >
                Inicio de recorrido
              </div>
              <div style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                Horario inicial - {initialResumeTime}
              </div>
            </Popup>
          </Marker>
          <MarkerClusterGroup>
            {resume.freeze_times.map((point, index) => {
              const pointPosition = [point.lat, point.lng]
              return (
                <Marker
                  key={point.id}
                  icon={freezeTimeIcon}
                  position={pointPosition}
                >
                  <Popup>
                    <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                      {`Tiempo de espera ${index + 1}`}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                      <span style={{ fontWeight: 'bold' }}>Inicio:</span>{' '}
                      {formatTime(point.start_time)} hs
                    </div>
                    <div style={{ fontSize: '0.875rem', color: '#4a5568' }}>
                      <span style={{ fontWeight: 'bold' }}>Duración:</span>{' '}
                      {calculateDuration(point.start_time, point.end_time)}
                      minutos
                    </div>
                  </Popup>
                </Marker>
              )
            })}
          </MarkerClusterGroup>
          <MarkerClusterGroup>
            {resume.delivery_points.map((point) => {
              const pointPosition = [
                point.destination.lat,
                point.destination.lng
              ]
              let icon = destinationIcon
              let statusColor = '#d69e2e'
              if (point.status === 'Completado') {
                icon = destinationCompletedIcon
                statusColor = '#48bb78'
              } else if (
                point.status === 'Rechazado' ||
                point.status === 'Cancelado'
              ) {
                icon = destinationRefuseIcon
                statusColor = '#f56565'
              }
              return (
                <Marker key={point.id} icon={icon} position={pointPosition}>
                  <Popup>
                    <div style={{ fontSize: '1.125rem', fontWeight: 'bold' }}>
                      {point.name}
                    </div>
                    <div style={{ fontSize: '0.875rem', color: statusColor }}>
                      Estado: {point.status}
                    </div>
                    {point.cargo.length > 0 && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <div style={{ fontSize: '1rem', fontWeight: 'bold' }}>
                          Cargos:
                        </div>
                        <ul
                          style={{
                            listStyleType: 'disc',
                            paddingLeft: '1.25rem',
                            marginTop: '0.25rem'
                          }}
                        >
                          {point.cargo.map((cargo, index) => (
                            <li
                              key={index}
                              style={{ fontSize: '0.875rem', color: '#2d3748' }}
                            >
                              <span style={{ fontWeight: 'bold' }}>
                                {cargo.product}:
                              </span>{' '}
                              {cargo.quantity} -{' '}
                              <span
                                style={{
                                  fontWeight: '500',
                                  fontStyle: 'italic',
                                  textDecoration: 'underline'
                                }}
                              >
                                Entregado:
                              </span>{' '}
                              {cargo.delivered_quantity}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </Popup>
                </Marker>
              )
            })}
          </MarkerClusterGroup>
          <Polyline
            positions={resume.route.map((point) => [point.lat, point.lng])}
            color="blue"
          />
        </MapContainer>
      </div>
    </div>
  )
}

export default ResumeMap
