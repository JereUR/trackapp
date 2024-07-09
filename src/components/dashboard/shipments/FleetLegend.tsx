import React from 'react'

const FleetLegend: React.FC<{
  fleets: { id: number; name: string }[]
  selectedFleets: number[] // Array to store selected fleet IDs
  onFleetSelection: (selectedFleets: number[]) => void
}> = ({ fleets, selectedFleets, onFleetSelection }) => {
  const fleetColors: Record<number, string> = {
    1: 'bg-red-500',
    2: 'bg-green-500'
    // Add more colors here as needed
  }

  const handleFleetSelection = (fleetId: number) => {
    const newSelectedFleets = [...selectedFleets] // Create a copy to avoid mutation

    if (selectedFleets.includes(fleetId)) {
      // Deselect the fleet if already selected
      const index = newSelectedFleets.indexOf(fleetId)
      newSelectedFleets.splice(index, 1)
    } else {
      // Select the fleet if not already selected
      newSelectedFleets.push(fleetId)
    }

    onFleetSelection(newSelectedFleets)
  }

  return (
    <div className="md:m-4">
      <h3 className="text-lg font-semibold mb-2 text-center md:text-left">
        Indique la(s) flota(s)
      </h3>
      <div className="flex gap-4 items-center ml-4">
        {fleets.map((fleet) => (
          <div key={fleet.id} className="flex items-center">
            <div
              className={`w-4 h-4 ${
                selectedFleets.includes(fleet.id)
                  ? fleetColors[fleet.id]
                  : 'bg-gray-500'
              } rounded-full mr-2`}
            />
            <span>{fleet.name}</span>
            <input
              type="checkbox" // Use checkbox for multiple selections
              className="ml-2 cursor-pointer"
              checked={selectedFleets.includes(fleet.id)}
              onChange={() => handleFleetSelection(fleet.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FleetLegend
