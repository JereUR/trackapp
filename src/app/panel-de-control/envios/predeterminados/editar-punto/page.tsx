import { Metadata } from 'next'

import EditCustomPoint from '@/components/dashboard/shipments/custom/EditCustomPoints'

export const metadata: Metadata = {
  title: 'TrackApp - Editar punto clave'
}

const EditCustomPointPage = () => {
  return <EditCustomPoint />
}

export default EditCustomPointPage
