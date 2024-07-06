import { Metadata } from 'next'

import EditUser from '@/components/dashboard/users/EditUser'

export const metadata: Metadata = {
  title: 'TrackApp - Editar usuario'
}

const EditUserPage = () => {
  return <EditUser />
}

export default EditUserPage
