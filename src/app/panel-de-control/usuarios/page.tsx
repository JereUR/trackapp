import { Metadata } from 'next'

import UsersTable from '@/components/dashboard/users/UsersTable'

export const metadata: Metadata = {
  title: 'TrackApp - Usuarios'
}

const UsersPage = () => {
  return (
    <div className="m-4 md:m-10">
      <UsersTable />
    </div>
  )
}

export default UsersPage
