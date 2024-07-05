import React from 'react'

const FleetLegend: React.FC<{
  fleets: { id: number; name: string }[]
  selectedFleet: number | null
  onFleetSelection: (fleetId: number | null) => void
}> = ({ fleets, selectedFleet, onFleetSelection }) => {
  const fleetColors: Record<number, string> = {
    1: 'bg-red-500',
    2: 'bg-green-500'
    // Agrega aquí más colores según tus flotas
  }

  return (
    <div className="md:m-4">
      <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
        Indique la flota
      </h3>
      <div className="flex gap-4 items-center ml-4">
        {fleets.map((fleet) => (
          <div key={fleet.id} className="flex items-center">
            <div
              className={`w-4 h-4 ${
                fleetColors[fleet.id] || 'bg-gray-500'
              } rounded-full mr-2`}
            />
            <span>{fleet.name}</span>
            <input
              type="radio"
              className="ml-2 cursor-pointer"
              checked={selectedFleet === fleet.id}
              onChange={() =>
                onFleetSelection(selectedFleet === fleet.id ? null : fleet.id)
              }
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FleetLegend
