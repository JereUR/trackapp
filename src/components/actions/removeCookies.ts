'use server'

import { cookies } from 'next/headers'

export async function removeCookies() {
  cookies().delete('session')
}
