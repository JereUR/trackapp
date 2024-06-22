'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'

import useUser from '../hooks/useUser'

interface User {
  first_name: string
  last_name: string
}

interface UserMenuProps {
  user: User
}

export default function UserMenu({ user }: UserMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const { logout } = useUser()

  const initials = user.first_name.charAt(0) + user.last_name.charAt(0)

  const handleLogout = () => {
    console.log('Cerrar sesión')
    logout()
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuRef])

  return (
    <div className="relative" ref={menuRef}>
      <div
        className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center cursor-pointer"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {initials}
      </div>
      {menuOpen && (
        <div className="absolute right-0 mt-2 px-2 rounded-lg w-48 bg-gray-100 dark:bg-gray-700 border dark:border-none shadow-lg  py-2">
          <Link
            href="/panel-de-control/mi-perfil"
            className="block px-4 py-2 text-foreground rounded-lg dark:text-gray-200 transition duration-300 ease-in-out hover:bg-blue-500 dark:hover:bg-blue-800"
          >
            Mi Perfil
          </Link>
          <button
            onClick={handleLogout}
            className="block w-full text-left px-4 py-2 text-foreground rounded-lg dark:text-gray-200 transition duration-300 ease-in-out hover:bg-blue-500 dark:hover:bg-blue-800"
          >
            Cerrar Sesión
          </button>
        </div>
      )}
    </div>
  )
}
