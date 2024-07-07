'use client'
import { initialFleets } from '../db/FleetsData'
import { initialDrivers, initialUser, initialUsers } from '../db/UsersData'

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

import { PropsAddUser, PropsUpdateProfile, User } from '../types/User'
import { useToast } from '../ui/use-toast'
import { removeCookies } from '../actions/removeCookies'
import { Fleet, PropsUpdateFleet } from '../types/Fleet'

type UserContextType = {
  user: User | null
  token: string | null
  count: number
  recoverState: boolean
  loadingUser: boolean
  setLoadingUser: Dispatch<SetStateAction<boolean>>
  setRecoverState: Dispatch<SetStateAction<boolean>>
  userLogin: ({
    user,
    authToken,
    error
  }: {
    user: User
    authToken: string
    error: string | null
  }) => void
  userLogout: () => void
  recover: ({ email }: { email: string }) => Promise<void>
  updateProfile: ({
    dataUser
  }: {
    dataUser: PropsUpdateProfile
  }) => Promise<boolean>
  users: User[]
  loadingUsers: boolean
  getUsers: ({
    q,
    page,
    ITEMS_PER_PAGE,
    role
  }: {
    q: string
    page: string
    ITEMS_PER_PAGE: number
    role?: string
  }) => void
  getAllUsers: () => Promise<User[] | null>
  getUsersToChat: ({ q }: { q: string }) => Promise<User[] | null>
  getUserById: ({ id }: { id: string }) => Promise<User | null>
  addUser: ({ dataUser }: { dataUser: PropsAddUser }) => Promise<boolean>
  updateUser: ({ dataUser }: { dataUser: PropsAddUser }) => Promise<boolean>
  deleteUsersById: ({ users }: { users: number[] }) => Promise<boolean>
  fleets: Fleet[]
  loadingFleet: boolean
  getFleets: () => void
  getFleetById: ({ id }: { id: string }) => Promise<Fleet | null>
  updateFleet: ({
    dataFleet
  }: {
    dataFleet: PropsUpdateFleet
  }) => Promise<boolean>
  getDrivers: () => Promise<User[]>
}

export const UserContext = createContext<UserContextType | null>(null)

export default function UserContextProvider({
  children
}: {
  children: ReactNode
}) {
  const [user, setUser] = useState<User | null>(initialUser)
  const [users, setUsers] = useState<User[]>([])
  const [fleets, setFleets] = useState<Fleet[]>(initialFleets)
  const [token, setToken] = useState<string | null>('1234')
  const [count, setCount] = useState<number>(0)
  const [recoverState, setRecoverState] = useState<boolean>(false)
  const [loadingUser, setLoadingUser] = useState(false)
  const [loadingFleet, setLoadingFleet] = useState(true)
  const [loadingUsers, setLoadingUsers] = useState(false)

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

  async function userLogin({
    user,
    authToken,
    error
  }: {
    user: User
    authToken: string
    error: string | null
  }) {
    if (error) {
      toast({
        variant: 'destructive',
        title: 'Oh no! Algo salió mal.',
        description: error
      })
      return
    }

    localStorage.setItem('token', authToken)
    localStorage.setItem('user', JSON.stringify(user))

    setToken(authToken)
    setUser(user)
    setTimeout(() => {
      console.log('test')
      router.push('/panel-de-control')
    }, 100)
  }

  async function userLogout() {
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

  async function updateProfile({
    dataUser
  }: {
    dataUser: PropsUpdateProfile
  }): Promise<boolean> {
    setLoadingUser(true)

    const newProfile = {
      first_name: dataUser.first_name,
      last_name: dataUser.last_name,
      phone: dataUser.phone,
      gender: dataUser.gender,
      date: dataUser.date,
      password: dataUser.password
    }

    try {
      const response = await axios.post(
        `${BASE_URL}api/v1/user`,
        {
          user: newProfile
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 201) {
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
      setLoadingUser(false)
    }
  }

  async function getUsers({
    q,
    page,
    ITEMS_PER_PAGE,
    role
  }: {
    q: string
    page: string
    ITEMS_PER_PAGE: number
    role?: string
  }): Promise<void> {
    setUsers(initialUsers)
    setCount(initialUsers.length)
    return
    setLoadingUsers(true)
    const params = new URLSearchParams()
    params.append('regex', q)
    params.append('page', page)
    params.append('items_per_page', ITEMS_PER_PAGE.toString())
    params.append('role', role || '')
    const url = `${BASE_URL}api/v1/users?${params.toString()}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        setUsers(response.data.users)
        setCount(response.data.count)
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
      setLoadingUsers(false)
    }
  }

  async function getAllUsers(): Promise<User[] | null> {
    return initialUsers
    setLoadingUsers(true)
    const params = new URLSearchParams()
    const url = `${BASE_URL}api/v1/users`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token
        }
      })

      if (response.status === 200 || response.status === 204) {
        return response.data.users
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
      setLoadingUsers(false)
    }
  }

  async function getUsersToChat({
    q = ''
  }: {
    q?: string
  }): Promise<User[] | null> {
    return initialUsers
    setLoadingUsers(true)
    const params = new URLSearchParams()
    params.append('regex', q)
    const url = `${BASE_URL}api/v1/users?${params.toString()}`

    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
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
      setLoadingUsers(false)
    }
  }

  async function getUserById({ id }: { id: string }): Promise<User | null> {
    return initialUsers[0]
    setLoadingUsers(true)
    const params = new URLSearchParams()
    params.append('id', id)
    const url = `${BASE_URL}api/v1/user?${params.toString()}`
    try {
      const response = await axios.get(url, {
        headers: {
          'Content-Type': 'application/json',
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
      setLoadingUsers(false)
    }
  }

  async function addUser({
    dataUser
  }: {
    dataUser: PropsAddUser
  }): Promise<boolean> {
    setLoadingUsers(true)

    const newUser = {
      first_name: dataUser.first_name,
      last_name: dataUser.last_name,
      email: dataUser.email,
      phone: dataUser.phone,
      gender: dataUser.gender,
      date: dataUser.date,
      password: dataUser.password,
      role: dataUser.role
    }

    try {
      const response = await axios.post(
        `${BASE_URL}api/v1/users`,
        {
          user: newUser
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 201) {
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
      setLoadingUsers(false)
    }
  }

  async function updateUser({
    dataUser
  }: {
    dataUser: PropsAddUser
  }): Promise<boolean> {
    setLoadingUsers(true)
    const updateUser = {
      id: dataUser.id,
      first_name: dataUser.first_name,
      last_name: dataUser.last_name,
      email: dataUser.email,
      phone: dataUser.phone,
      gender: dataUser.gender,
      date: dataUser.date,
      password: dataUser.password,
      role: dataUser.role
    }

    const url = `${BASE_URL}api/v1/user`
    try {
      const response = await axios.put(
        url,
        {
          user: updateUser
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )

      if (response.status === 200 || response.status === 204) {
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
      setLoadingUsers(false)
    }
  }

  async function deleteUsersById({
    users
  }: {
    users: number[]
  }): Promise<boolean> {
    setLoadingUsers(true)
    const url = `${BASE_URL}api/v1/user`
    try {
      const response = await axios.delete(url, {
        headers: {
          Authorization: token
        },
        data: {
          ids: users
        }
      })

      if (response.status === 200 || response.status === 204) {
        toast({
          title: `Actividades con id:'${users.map((user) => user)}' eliminado.`,
          className: 'bg-green-600'
        })
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
      setLoadingUsers(false)
    }
  }

  async function getDrivers() {
    return initialDrivers
    setLoadingUsers(true)
    try {
      const response = await axios.get(`${BASE_URL}drivers`)

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
      setLoadingUsers(false)
    }
  }

  async function getFleets() {
    setFleets(initialFleets)
    return
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

  async function updateFleet({
    dataFleet
  }: {
    dataFleet: PropsUpdateFleet
  }): Promise<boolean> {
    setLoadingFleet(true)

    const data = {
      id: dataFleet.id,
      name: dataFleet.name,
      description: dataFleet.description
    }

    console.log(data)

    let url = `${BASE_URL}api/v1/fleet?id=${dataFleet.id}`
    try {
      const response = await axios.put(
        url,
        {
          data
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )
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
        users,
        count,
        fleets,
        token,
        recoverState,
        updateProfile,
        loadingUser,
        setLoadingUser,
        loadingUsers,
        loadingFleet,
        setRecoverState,
        userLogin,
        userLogout,
        recover,
        getFleets,
        getFleetById,
        updateFleet,
        getUsers,
        getAllUsers,
        getUsersToChat,
        getDrivers,
        getUserById,
        addUser,
        updateUser,
        deleteUsersById
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
