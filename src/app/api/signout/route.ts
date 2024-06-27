import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import axios from 'axios'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

export async function DELETE(request: Request) {
  const token = await request.json()
  console.log(token)
  try {
    const response = await axios.delete(`${BASE_URL}logout`, {
      headers: {
        Authorization: token
      }
    })

    if (response.status === 200 || response.status === 204) {
      cookies().delete('session')
      return NextResponse.json({ status: true, error: null })
    } else {
      return NextResponse.json({ status: false, error: response.statusText })
    }
  } catch (error: any) {
    if (error.response && error.response.status === 401) {
      return NextResponse.json({ status: false, error: error.statusText })
    } else {
      return NextResponse.json({ status: false, error: error.message })
    }
  }
}
