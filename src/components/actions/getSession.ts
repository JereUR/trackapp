'use server'

import { NextRequest } from 'next/server'
import { cookies } from 'next/headers'
/* import { Session } from '../types/User' */
import { setCookies } from './setCookies'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

/* let sessionCache: {
  [key: string]: { session: Session | null; timestamp: number }
} = {} */

export default async function getSession(req: NextRequest) {
  const sessionToken = cookies().get('session')?.value
  let session = null

  /* if (!sessionToken) {
    return null
  } */

  session = {
    user: {
      id: 4,
      email: 'jeremias.jdv@gmail.com',
      first_name: 'Jeremias',
      last_name: 'DV',
      gender: 'male',
      birthdate: 'string',
      role: 'admin',
      photo: 'string | null',
      created_at: ''
    }
  }

  return session

  /* const CACHE_EXPIRATION_TIME = 5 * 60 * 1000
  const currentTime = Date.now()

  if (
    sessionCache[sessionToken] &&
    currentTime - sessionCache[sessionToken].timestamp < CACHE_EXPIRATION_TIME
  ) {
    return sessionCache[sessionToken].session
  }

  const headers = {
    'X-Requested-With': 'XMLHttpRequest',
    Authorization: sessionToken
  }

  try {
    const response = await fetch(`${BASE_URL}api/v1/currentuser`, {
      credentials: 'include',
      headers: headers
    })
    const data = await response.json()
    const session = data || null

    setCookies(data.token)

    sessionCache[sessionToken] = {
      session: session,
      timestamp: Date.now()
    }

    return session
  } catch (error) {
    console.error('Error validating session:', error)
    return null
  } */
}
