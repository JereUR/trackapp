import { Metadata } from 'next'

import HomePage from '@/components/dashboard/HomePage'

export const metadata: Metadata = {
  title: 'TrackApp - Panel de control'
}

const AdminHomePage = () => {
  return <HomePage />
}

export default AdminHomePage
