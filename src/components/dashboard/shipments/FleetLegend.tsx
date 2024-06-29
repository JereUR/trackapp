const FleetLegend: React.FC = () => {
  const fleetColors: Record<number, string> = {
    1: 'bg-red-500',
    2: 'bg-green-500'
  }

  return (
    <div className="m-4">
      <h3 className="text-lg font-semibold mb-2">
        Índice de colores por flota
      </h3>
      <div className="flex space-x-2">
        {Object.entries(fleetColors).map(([fleetId, color]) => (
          <div key={fleetId} className="flex items-center">
            <div className={`w-4 h-4 ${color} rounded-full mr-2`} />
            <span>Fleet {fleetId}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FleetLegend
