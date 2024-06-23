'use client'

import { useEffect } from 'react'

import useUser from '../hooks/useUser'
import FleetItem from './FleetItem'

const ShowFleets = () => {
  const { token, fleets, getFleets } = useUser()

  useEffect(() => {
    if (token) getFleets()
  }, [token])

  return (
    <div className="flex flex-col gap-8">
      <p className="text-3xl font-bold">Mis flotas</p>

      <div className="justify-around">
        {fleets.length > 0 ? (
          fleets.map((fleet) => <FleetItem key={fleet.id} fleet={fleet} />)
        ) : (
          <p>Sin flotas disponibles</p>
        )}
      </div>
    </div>
  )
}

export default ShowFleets
