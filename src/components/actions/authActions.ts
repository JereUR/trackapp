'use server'

import axios from 'axios'

import { Login } from '../types/User'
import { setCookies } from './setCookies'
import { removeCookies } from './removeCookies'

const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

export async function signIn({ dataLogin }: { dataLogin: Login }) {
  'use server'
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
      setCookies(authToken)
      return { authToken, data: response.data, error: null }
    } else {
      return { authToken: null, data: null, error: response.statusText }
    }
  } catch (error: any) {
    console.error('Error in signIn:', error)
    if (error.response && error.response.status === 401) {
      return { authToken: null, data: null, error: error.response.statusText }
    } else {
      return { authToken: null, data: null, error: error.message }
    }
  }
}

export async function signOut({ token }: { token: string }) {
  try {
    const response = await axios.delete(`${BASE_URL}logout`, {
      headers: {
        Authorization: token
      }
    })

    if (response.status === 200 || response.status === 204) {
      removeCookies()
      return true
    } else {
      return false
    }
  } catch (error: any) {
    return false
  }
}
