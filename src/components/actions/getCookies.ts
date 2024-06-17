'use server'

import { cookies } from 'next/headers'

export async function getCookies(cookie: string) {
  return cookies().get(cookie)
}
