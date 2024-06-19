'use client'

import { useEffect } from 'react'

import useUser from '../hooks/useUser'
import FleetItem from './FleetItem'
import { Card, CardContent } from '../ui/card'

const ShowFleets = () => {
  const { token, fleets, getFleets } = useUser()

  useEffect(() => {
    if (token) getFleets()
  }, [token])

  return (
    <div className="flex gap-8 m-8">
      <div className=" w-3/4 flex flex-col gap-8">
        <Card className="max-w-sm mx-auto py-4 px-6 shadow-lg rounded-lg border-none dark:border-solid">
          <CardContent className="bg-gray-200 dark:bg-gray-800 text-center py-4 px-6 rounded-lg">
            <p className="text-2xl font-bold mb-2 text-foreground">
              Flotas Disponibles
            </p>
            <p className="text-6xl font-bold text-blue-600">{fleets.length}</p>
          </CardContent>
        </Card>

        <div className="justify-around">
          {fleets.length > 0 ? (
            fleets.map((fleet) => <FleetItem key={fleet.id} fleet={fleet} />)
          ) : (
            <p>Sin flotas disponibles</p>
          )}
        </div>
      </div>

      <div className="w-1/4">Aside</div>
    </div>
  )
}

export default ShowFleets
