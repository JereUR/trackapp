export type User = {
  id: number
  first_name: string
  last_name: string
  email: string
  phone?: string
  gender?: string
  date?: string
  password?: string
  created_at?: string
  updated_at?: string
  role?: string
}

/* Login info */

export interface Login {
  email: string
  password: string
  remember_me?: boolean
}

export const initialData: Login = {
  email: '',
  password: '',
  remember_me: false
}

export interface FocusStateLogin {
  email: boolean
  password: boolean
}

export const initialFocusLogin: FocusStateLogin = {
  email: false,
  password: false
}

export interface FormErrorsLogin {
  email?: string
  password?: string
  [key: string]: string | undefined
}

export const initialErrors: FormErrorsLogin = {
  email: '',
  password: ''
}

/* Register info */

export interface Register {
  first_name: string
  last_name: string
  email: string
  gender: string
  date: string
  password: string
  password_confirmation: string
}

export const initialDataRegister: Register = {
  first_name: '',
  last_name: '',
  email: '',
  gender: '',
  date: '',
  password: '',
  password_confirmation: ''
}

export interface FormErrorsRegister {
  first_name?: string
  last_name?: string
  email?: string
  gender?: string
  date?: string
  password?: string
  password_confirmation?: string
  [key: string]: string | undefined
}

export const initialErrorsRegister: FormErrorsRegister = {
  first_name: '',
  last_name: '',
  email: '',
  gender: '',
  date: '',
  password: '',
  password_confirmation: ''
}

/* Recover info */

export interface Recover {
  password: string
  confirm_password: string
}

export const initialDataRecover: Recover = {
  password: '',
  confirm_password: ''
}

export interface FormErrorsRecover {
  password?: string
  confirm_password?: string
  [key: string]: string | undefined
}

export const initialErrorsRecover: FormErrorsRecover = {
  password: '',
  confirm_password: ''
}

export interface FocusStateRecover {
  password: boolean
  confirm_password: boolean
}

export const initialFocusRecover: FocusStateRecover = {
  password: false,
  confirm_password: false
}
