import Link from 'next/link'
import { CustomShipment } from '@/components/types/Shipment'
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const CustomShipmentItem = ({
  shipment,
  handleDelete
}: {
  shipment: CustomShipment
  handleDelete: (shipment: CustomShipment) => void
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
        {shipment.delivery_points.map((deliveryPoint) => (
          <div key={deliveryPoint.id} className="flex flex-col gap-2">
            <p className="text-gray-600 dark:text-gray-400 text-lg font-bold">
              Punto de entrega: {deliveryPoint.name}
            </p>
            <div className="ml-4 mb-4">
              <p className="font-medium text-gray-400 dark:text-gray-300">
                Cargas:
              </p>
              {deliveryPoint.cargo.map((cargo, index) => (
                <p
                  key={index}
                  className="text-gray-600 dark:text-gray-400 ml-2"
                >
                  {cargo.quantity} uds. - {cargo.product}
                </p>
              ))}
            </div>
          </div>
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
