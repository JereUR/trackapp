import { Resume } from '@/components/types/Record'
import { Button } from '@/components/ui/button'
import dynamic from 'next/dynamic'
import { useState } from 'react'

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
  const [showMap, setShowMap] = useState<boolean>(false)

  const onClose = () => {
    setShowMap(false)
  }

  if (!requestDone) return null
  return (
    <div>
      {requestDone && resume ? (
        <div>
          <div>Resume</div>
          <Button onClick={() => setShowMap(true)}>Mostrar Recorrido</Button>
          {showMap && <ResumeMap resume={resume} onClose={onClose} />}
        </div>
      ) : (
        <div>No existen registros para el día seleccionado</div>
      )}
    </div>
  )
}

export default RecordsResume
