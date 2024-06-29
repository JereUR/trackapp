'use server'
import { session } from '../db/SessionData'

import { NextRequest } from 'next/server'

import { cookies } from 'next/headers'
import { setCookies } from './setCookies'
import { Session } from '../types/User'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

let sessionCache: {
  [key: string]: { session: Session | null; timestamp: number }
} = {}

export default async function getSession(
  req: NextRequest
): Promise<Session | null> {
  const sessionToken = cookies().get('session')?.value

  /* if (!sessionToken) {
    return null
  } */
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
  console.log(sessionToken)

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
