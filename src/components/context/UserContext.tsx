'use client'

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState
} from 'react'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'
import axios from 'axios'

import { Login, Register, User } from '../types/User'
import { useToast } from '../ui/use-toast'
import { setCookies } from '../actions/setCookies'
import { removeCookies } from '../actions/removeCookies'
import { Fleet } from '../types/Fleet'

type UserContextType = {
  user: User | null
  token: string | null
  recoverState: boolean
  loadingUser: boolean
  setRecoverState: Dispatch<SetStateAction<boolean>>
  login: ({ dataLogin }: { dataLogin: Login }) => Promise<void>
  logout: () => Promise<void>
  signUp: ({ dataRegister }: { dataRegister: Register }) => Promise<void>
  recover: ({ email }: { email: string }) => Promise<void>
  fleets: Fleet[]
  loadingFleet: boolean
  getFleets: () => void
  getFleetById: ({ id }: { id: string }) => Promise<Fleet | null>
  getWorkingFleet: () => Promise<Fleet>
  updateWorkingFleet: ({ id }: { id: number }) => Promise<boolean>
}

export const UserContext = createContext<UserContextType | null>(null)

const initialUser = {
  id: 1,
  email: 'jeremias.jdv@gmail.com',
  first_name: 'Jeremias',
  last_name: 'Dominguez Vega',
  gender: 'male',
  role: 'admin'
}

const initialFleets: Fleet[] = [
  {
    id: 1,
    name: 'Fleet 1',
    description: 'Fleet 1 description',
    gps: 1,
    on_working_area: true
  },
  {
    id: 2,
    name: 'Fleet 2',
    description: 'Fleet 2 description',
    gps: 2,
    on_working_area: false
  }
]

export default function UserContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [fleets, setFleets] = useState<Fleet[]>(initialFleets)
  const [token, setToken] = useState<string | null>(null)
  const [recoverState, setRecoverState] = useState<boolean>(false)
  const [loadingUser, setLoadingUser] = useState(false)
  const [loadingFleet, setLoadingFleet] = useState(true)

  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_BACKEND_URL

  useEffect(() => {
    const storedToken = localStorage.getItem('token')
    let userFromStorage

    try {
      userFromStorage = JSON.parse(localStorage.getItem('user') || 'null')
    } catch (error) {
      console.error('Error parsing user data from localStorage:', error)
    }

    if (storedToken && userFromStorage) {
      setToken(storedToken)
      setUser(userFromStorage)
    }
  }, [])

  async function login({ dataLogin }: { dataLogin: Login }) {
    setLoadingUser(true)
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
        const userToken = response.headers.Userorization
        setCookies(userToken)
        localStorage.setItem('token', userToken)
        localStorage.setItem('user', JSON.stringify(response.data.user))

        setToken(userToken)
        setUser(response.data.user)
        setTimeout(() => {
          router.push('/panel-de-control')
        }, 100)
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: 'Credenciales incorrectas.'
        })
      } else {
        toast({
          variant: 'destructive',
          title: 'Oh no! Algo salió mal.',
          description: error.message
        })
      }
    } finally {
      setLoadingUser(false)
    }
  }

  async function logout() {
    setLoadingUser(true)
    try {
      const response = await axios.delete(`${BASE_URL}logout`, {
        headers: {
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        removeCookies()
        setUser(null)
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        if (pathname === '/') {
          window.location.reload()
          return
        }
        localStorage.setItem('isLoggedOut', 'true')
        router.push('/')
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } finally {
      setLoadingUser(false)
    }
  }

  async function signUp({
    dataRegister
  }: {
    dataRegister: Register
  }): Promise<void> {
    setLoadingUser(true)
    const user = {
      first_name: dataRegister.first_name,
      last_name: dataRegister.last_name,
      email: dataRegister.email,
      gender: dataRegister.gender,
      date: dataRegister.date,
      password: dataRegister.password
    }
    try {
      const response = await axios.post(
        `${BASE_URL}signup`,
        {
          user
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (
        response.status === 200 ||
        response.status === 204 ||
        response.status === 401
      ) {
        toast({
          title: 'Usuario creado con éxito.',
          description:
            'Se te ha enviado un mail a tu correo electrónico para verificar tu cuenta.'
        })
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } finally {
      setLoadingUser(false)
    }
  }

  async function recover({ email }: { email: string }): Promise<void> {
    setLoadingUser(true)
    try {
      const response = await axios.post(
        `${BASE_URL}recover`,
        {
          user: { email }
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      )

      if (response.status === 200 || response.status === 204) {
        setRecoverState(true)
      } else {
        setRecoverState(false)
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } finally {
      setLoadingUser(false)
    }
  }

  async function getFleets() {
    setLoadingFleet(true)
    try {
      const response = await axios.get(`${BASE_URL}fleets`)

      if (response.status === 200 || response.status === 204) {
        setFleets(response.data)
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
    } finally {
      setLoadingFleet(false)
    }
  }

  async function getFleetById({ id }: { id: string }): Promise<Fleet | null> {
    setLoadingFleet(true)
    try {
      const response = await axios.get(`${BASE_URL}api/v1/fleet?id=${id}`, {
        headers: {
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return null
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return null
    } finally {
      setLoadingFleet(false)
    }
  }

  async function getWorkingFleet() {
    setLoadingFleet(true)
    try {
      const response = await axios.get(`${BASE_URL}api/v1/fleet_working`, {
        headers: {
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return null
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return null
    } finally {
      setLoadingFleet(false)
      /* return initialFleets[0] */
    }
  }

  async function updateWorkingFleet({ id }: { id: number }): Promise<boolean> {
    setLoadingFleet(true)
    let url = `${BASE_URL}api/v1/activate_fleet_working_status?id=${id}`
    try {
      const response = await axios.put(url, null, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200) {
        return true
      } else {
        toast({
          title: 'Oh no! Algo salió mal.',
          description: response.statusText
        })
        return false
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error.message
      })
      return false
    } finally {
      setLoadingFleet(false)
    }
  }

  return (
    <UserContext.Provider
      value={{
        user,
        fleets,
        token,
        recoverState,
        loadingUser,
        loadingFleet,
        setRecoverState,
        login,
        logout,
        signUp,
        recover,
        getFleets,
        getFleetById,
        getWorkingFleet,
        updateWorkingFleet
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
