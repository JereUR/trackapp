import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

import getSession from './components/actions/getSession'

export async function middleware(request: NextRequest) {
  const session = await getSession(request)

  if (session === null) {
    if (
      request.nextUrl.pathname.startsWith('/panel-de-control') ||
      request.nextUrl.pathname.startsWith('/inicio') ||
      request.nextUrl.pathname.startsWith('/mis-envios')
    ) {
      return NextResponse.redirect(new URL('/iniciar-sesion', request.url))
    }
  } else {
    if (request.nextUrl.pathname.startsWith('/panel-de-control')) {
      if (session.user.role === 'driver') {
        console.log('User is not admin, redirecting to /inicio')
        return NextResponse.redirect(new URL('/inicio', request.url))
      }

      if (
        request.nextUrl.pathname.startsWith('/panel-de-control/usuarios') ||
        request.nextUrl.pathname.startsWith('/panel-de-control/registros')
      ) {
        if (session.user.role !== 'admin') {
          return NextResponse.redirect(
            new URL('/panel-de-control', request.url)
          )
        }
      }
    }

    if (
      request.nextUrl.pathname.startsWith('/inicio') ||
      request.nextUrl.pathname.startsWith('/mis-envios')
    ) {
      if (session.user.role === 'admin' || session.user.role === 'staff') {
        return NextResponse.redirect(new URL('/panel-de-control', request.url))
      }
    }

    if (
      request.nextUrl.pathname.startsWith('/iniciar-sesion') ||
      request.nextUrl.pathname.startsWith('/recover/edit')
    ) {
      if (session.user.role === 'driver') {
        return NextResponse.redirect(new URL('/inicio', request.url))
      }

      if (session.user.role === 'admin' || session.user.role === 'staff') {
        return NextResponse.redirect(new URL('/panel-de-control', request.url))
      }
    }
  }
}
