import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import getSession from './components/actions/getSession'

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/panel-de-control')) {
    const session = await getSession(request)

    if (!session) {
      return NextResponse.redirect(new URL('/iniciar-sesion', request.url))
    }
  }
}
