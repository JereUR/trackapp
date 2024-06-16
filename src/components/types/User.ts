export type User = {
  id: number
  name: string
  email: string
  password: string
  created_at: string
  updated_at: string
  role: string
}

/* Login info */

export interface Login {
  email: string
  password: string
  remember_me: boolean
}

export const initialData = {
  email: '',
  password: '',
  remember_me: false
}

export const initialFocus = { email: false, password: false }

export interface FocusState {
  email: boolean
  password: boolean
}
