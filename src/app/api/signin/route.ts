import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

export async function POST(request: Request) {
  const dataLogin = await request.json()
  console.log(dataLogin)
  try {
    const response = await axios.post(
      `${BASE_URL}login`,
      {
        user: {
          email: dataLogin.email,
          password: dataLogin.password
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )

    if (response.status === 200 || response.status === 204) {
      const authToken = response.headers.authorization
      cookies().set('session', 'authToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      })
      return NextResponse.json({ authToken, data: response.data, error: null })
    } else {
      return NextResponse.json({
        authToken: null,
        data: null,
        error: response.statusText
      })
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return NextResponse.json({
        authToken: null,
        data: null,
        error: error.message
      })
    } else {
      return NextResponse.json({
        authToken: null,
        data: null,
        error: error.message
      })
    }
  }
}
