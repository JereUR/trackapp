import { Metadata } from 'next'
import { Suspense } from 'react'

import Loader from '@/components/Loader'
import RecoverForm from '@/components/session/RecoverForm'

export const metadata: Metadata = {
  title: 'TrackApp - Recuperar contraseña'
}

const RecoverPage = () => {
  return (
    <Suspense fallback={<Loader />}>
      <RecoverForm />
    </Suspense>
  )
}

export default RecoverPage
