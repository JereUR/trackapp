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
    <div className="flex gap-8 m-10">
      <div className=" w-3/4 flex flex-col gap-8">
        <p className="text-3xl font-bold">Mis flotas</p>

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
