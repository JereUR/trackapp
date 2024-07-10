import { Metadata } from 'next'

import RecordsInterface from '@/components/dashboard/records/RecordsInterface'

export const metadata: Metadata = {
  title: 'TrackApp - Registros'
}

const RecordsPage = () => {
  return (
    <div className="m-4 md:m-10">
      <RecordsInterface />
    </div>
  )
}

export default RecordsPage
