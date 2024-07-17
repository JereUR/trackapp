import { PropsGetResume, Resume } from '@/components/types/Record'
import { days, months } from '@/components/types/Shipment'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { FaMapMarkedAlt } from 'react-icons/fa'
import { Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions
} from 'chart.js'
import useUser from '@/components/hooks/useUser'
import { User } from '@/components/types/User'

ChartJS.register(ArcElement, Tooltip, Legend)

interface Props {
  resume: Resume | null
  requestDone: boolean
}

const ResumeMap = dynamic(
  () => import('@/components/dashboard/records/map/ResumeMap'),
  {
    ssr: false
  }
)

const RecordsResume: React.FC<Props> = ({ resume, requestDone }) => {
  const [drivers, setDrivers] = useState<User[]>([])
  const [showMap, setShowMap] = useState<boolean>(false)
  const { getDrivers } = useUser()

  useEffect(() => {
    async function getData() {
      const res = await getDrivers()
      if (res) {
        const filteredDrivers = res.filter((driver: User) =>
          resume?.drivers_id.includes(driver.id)
        )
        setDrivers(filteredDrivers)
      }
    }
    if (resume) {
      getData()
    }
  }, [resume, getDrivers])

  const formatDate = (dateString: string) => {
    const dateObject = new Date(dateString)
    const day = dateObject.getDate()
    const month = dateObject.getMonth() + 1
    const year = dateObject.getFullYear()
    const dayOfWeek = days[dateObject.getDay()]
    const monthName = months[month - 1]
    return `${dayOfWeek} ${day} de ${monthName} de ${year}`
  }

  const onClose = () => {
    setShowMap(false)
  }

  if (!requestDone) return null

  // Contar los estados de los puntos de entrega
  const completedCount =
    resume?.delivery_points.filter((dp) => dp.status === 'Completado').length ||
    0
  const canceledCount =
    resume?.delivery_points.filter(
      (dp) => dp.status === 'Cancelado' || dp.status === 'Rechazado'
    ).length || 0
  const totalCount = resume?.delivery_points.length || 0

  const data: ChartData<'pie'> = {
    labels: ['Envíos completados', 'Envíos cancelados/rechazados'],
    datasets: [
      {
        data: [completedCount, canceledCount],
        backgroundColor: ['#4caf50', '#f44336'],
        hoverBackgroundColor: ['#66bb6a', '#e57373']
      }
    ]
  }

  const options: ChartOptions<'pie'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            const label = context.label || ''
            const value = (context.raw as number) || 0
            const percentage = ((value / totalCount) * 100).toFixed(1)
            return `${label}: ${value} (${percentage}%)`
          }
        }
      }
    }
  }

  // Calcular los productos entregados y no entregados
  const deliveredProducts: { [product: string]: number } = {}
  const undeliveredProducts: { [product: string]: number } = {}

  resume?.delivery_points.forEach((dp) => {
    dp.cargo.forEach((item) => {
      if (item.delivered_quantity && item.delivered_quantity > 0) {
        if (deliveredProducts[item.product]) {
          deliveredProducts[item.product] += item.delivered_quantity
        } else {
          deliveredProducts[item.product] = item.delivered_quantity
        }
      }
      const undeliveredQuantity =
        item.quantity - (item.delivered_quantity ? item.delivered_quantity : 0)
      if (undeliveredQuantity > 0) {
        if (undeliveredProducts[item.product]) {
          undeliveredProducts[item.product] += undeliveredQuantity
        } else {
          undeliveredProducts[item.product] = undeliveredQuantity
        }
      }
    })
  })

  return (
    <div className="p-4">
      {requestDone && resume ? (
        <div className="flex flex-col items-center mx-auto gap-4 p-4 border w-full max-w-6xl border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
          <p className="text-2xl font-semibold text-center">
            Registro del día {formatDate(resume.date)}:
          </p>
          <div className="flex w-full flex-col md:flex-row gap-8 m-6">
            <div className="flex-1 flex flex-col gap-4 justify-center items-center">
              <Pie data={data} options={options} />
              <p className="text-lg font-semibold text-center">
                Envíos realizados: {resume.delivery_points.length}
              </p>
            </div>
            <div className="flex-1 flex flex-col gap-6 md:justify-center md:items-start ml-4 md:ml-12">
              <div className="flex gap-2 items-center">
                <p className="text-lg font-medium">Distancia recorrida:</p>
                <p className="text-gray-500 dark:text-gray-400 italic">
                  {resume.total_distance} km
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-2 items-center">
                <p className="text-lg font-medium">
                  Consumo de combustible aproximado:
                </p>
                <p className="text-gray-500 dark:text-gray-400 italic">
                  {(15 / 100) * resume.total_distance} Litros
                </p>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Conductores:</p>
                <ul className="ml-4 list-disc">
                  {drivers.map((driver) => (
                    <li
                      key={driver.id}
                      className="text-gray-500 dark:text-gray-400 italic"
                    >
                      {driver.first_name} {driver.last_name}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Cargas entregadas:</p>
                <ul className="ml-4 list-disc">
                  {Object.entries(deliveredProducts).map(
                    ([product, quantity]) => (
                      <li
                        key={product}
                        className="text-gray-500 dark:text-gray-400 italic"
                      >
                        {product}: {quantity}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-lg font-medium">Cargas no entregadas:</p>
                <ul className="ml-4 list-disc">
                  {Object.entries(undeliveredProducts).map(
                    ([product, quantity]) => (
                      <li
                        key={product}
                        className="text-gray-500 dark:text-gray-400 italic"
                      >
                        {product}: {quantity}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <Button
                onClick={() => setShowMap(true)}
                className="w-fit bg-sky-500 transition duration-300 ease-in-out hover:bg-sky-600 mx-auto md:mx-0"
              >
                <p className="flex gap-2 items-center">
                  <FaMapMarkedAlt className="h-5 w-5" />
                  Mostrar Recorrido
                </p>
              </Button>
            </div>
          </div>
          {showMap && <ResumeMap resume={resume} onClose={onClose} />}
        </div>
      ) : (
        <div className="text-center">
          No existen registros para el día seleccionado
        </div>
      )}
    </div>
  )
}

export default RecordsResume
