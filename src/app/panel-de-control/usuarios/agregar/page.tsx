import UserForm from '@/components/dashboard/users/UserForm'
import { initialDataAddUser } from '@/components/types/User'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrackApp - Agregar usuario'
}

const AddUsersPage = () => {
  return (
    <div className="m-4 md:m-10">
      <UserForm type="add" user={initialDataAddUser} />
    </div>
  )
}

export default AddUsersPage
