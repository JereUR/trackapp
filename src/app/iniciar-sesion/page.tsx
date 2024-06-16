import LoginForm from '@/components/Login/LoginForm'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TrackApp - Iniciar sesión'
}

const LoginPage = () => {
  return <LoginForm />
}

export default LoginPage
