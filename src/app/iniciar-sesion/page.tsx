import type { Metadata } from 'next'

import LoginForm from '@/components/session/LoginForm'

export const metadata: Metadata = {
  title: 'TrackApp - Iniciar sesión'
}

const LoginPage = () => {
  return <LoginForm />
}

export default LoginPage
