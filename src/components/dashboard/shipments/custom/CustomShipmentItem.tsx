import Link from 'next/link'
import { DeliveryPoint } from '@/components/types/Shipment'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const CustomShipmentItem = ({
  shipment,
  handleDelete
}: {
  shipment: DeliveryPoint
  handleDelete: (shipment: DeliveryPoint) => void
}) => {
  return (
    <Card
      key={shipment.id}
      className="p-4 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 bg-card"
    >
      <CardTitle className="text-xl font-semibold text-foreground mb-2">
        {shipment.name}
      </CardTitle>
      <p className="text-gray-500 italic">{shipment.description}</p>
      <CardContent className="mt-4">
        <p className="text-lg font-bold text-gray-400 dark:text-gray-300">
          Cargas:
        </p>
        {shipment.cargo.map((cargo, index) => (
          <p key={index} className="text-gray-600 dark:text-gray-400 ml-2">
            {cargo.quantity} uds. - {cargo.product}
          </p>
        ))}
      </CardContent>
      <CardFooter className="flex gap-2 justify-end">
        <Link
          href={`/panel-de-control/envios/predeterminados/editar-envio/${shipment.id}`}
        >
          <Button className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded">
            Editar
          </Button>
        </Link>
        <Button
          className="bg-red-500 text-white hover:bg-red-700 px-4 py-2 rounded"
          onClick={() => handleDelete(shipment)}
        >
          Borrar
        </Button>
      </CardFooter>
    </Card>
  )
}

export default CustomShipmentItem
