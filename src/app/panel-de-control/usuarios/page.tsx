import { Metadata } from 'next'

import UsersTable from '@/components/dashboard/users/UsersTable'
import { Suspense } from 'react'

export const metadata: Metadata = {
  title: 'TrackApp - Usuarios'
}

const UsersPage = () => {
  return (
    <div className="m-4 md:m-10">
      <Suspense fallback={<div>Loading...</div>}>
        <UsersTable />
      </Suspense>
    </div>
  )
}

export default UsersPage
