'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

import useUser from '@/components/hooks/useUser'
import { initialDataAddUser, PropsAddUser } from '@/components/types/User'
import UserForm from './UserForm'

const EditUser = () => {
  const pathname = usePathname()
  const [user, setUser] = useState<PropsAddUser>(initialDataAddUser)

  const id = pathname.split('/')[4]
  const { getUserById, token } = useUser()

  useEffect(() => {
    async function fetchUser() {
      const u = await getUserById({
        id
      })
      if (u) {
        setUser({
          id: u.id,
          first_name: u.first_name,
          last_name: u.last_name,
          email: u.email,
          phone: u.phone,
          gender: u.gender ? u.gender : '',
          date: u.date ? new Date(u.date) : new Date(),
          role: u.role
        })
      }
    }

    if (token) {
      fetchUser()
    }
  }, [id, token])

  return (
    <div className="m-10">
      <UserForm type="edit" user={user} />
    </div>
  )
}

export default EditUser
