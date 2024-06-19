import React from 'react'
import { Fleet } from '../types/Fleet'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'

interface Props {
  fleet: Fleet
}

const FleetItem: React.FC<Props> = ({ fleet }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-4 items-center">
          <p className="text-2xl font-bold">{fleet.name} - </p>
          {fleet.on_working_area ? (
            <p className="text-lg font-bold py-2 px-4 rounded-full bg-orange-500 opacity-90">
              Area de trabajo activa
            </p>
          ) : (
            <p className="text-lg font-bold p-2 rounded-full bg-gray-500 opacity-90">
              Area de trabajo inactiva
            </p>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p>{fleet.description ? fleet.description : 'Sin descripción'}</p>
        <span>Estado: {fleet.gps ? 'Activo' : 'Inactivo'}</span>
      </CardContent>
    </Card>
  )
}

export default FleetItem
