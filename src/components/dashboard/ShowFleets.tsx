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
    <div className="flex">
      <div className="flex-1 justify-around">
        {fleets.length > 0 ? (
          fleets.map((fleet) => <FleetItem key={fleet.id} fleet={fleet} />)
        ) : (
          <p>No fleets found</p>
        )}
      </div>
      <div className="flex-1">Aside</div>
    </div>
  )
}

export default ShowFleets
