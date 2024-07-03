const FleetLegend: React.FC<{
  fleets: { id: number; name: string }[]
  selectedFleets: number[]
  onFleetSelection: (fleetId: number) => void
}> = ({ fleets, selectedFleets, onFleetSelection }) => {
  const fleetColors: Record<number, string> = {
    1: 'bg-red-500',
    2: 'bg-green-500'
  }

  return (
    <div className="m-4">
      <h3 className="text-lg font-semibold mb-2">
        Índice de colores por flota
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
              type="checkbox"
              className="ml-2 cursor-pointer"
              checked={selectedFleets.includes(fleet.id)}
              onChange={() => onFleetSelection(fleet.id)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

export default FleetLegend
