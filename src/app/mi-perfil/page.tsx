import Profile from '@/components/profile/Profile'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrackApp - Mi perfil'
}

const ProfilePage = () => {
  return (
    <div className="m-4 md:m-10">
      <Profile />
    </div>
  )
}

export default ProfilePage
