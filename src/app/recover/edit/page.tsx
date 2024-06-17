import RecoverForm from '@/components/session/RecoverForm'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrackApp - Recuperar contraseña'
}

const RecoverPage = () => {
  return <RecoverForm />
}

export default RecoverPage
