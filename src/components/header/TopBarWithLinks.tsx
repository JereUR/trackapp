import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import ThemeSwitcher from '@/components/global/ThemeSwitcher'
import { RxHamburgerMenu } from 'react-icons/rx'
import { GrClose } from 'react-icons/gr'
import useUser from '../hooks/useUser'
import UserMenu from './UserMenu'

export default function TopBarWithLinks() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useUser()

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <div className="relative w-full flex flex-col md:flex-row justify-between items-center p-6 text-white shadow-md bg-slate-600 dark:bg-slate-800">
      <div className="flex justify-between items-center w-full md:w-auto">
        <p
          className="text-3xl font-semibold cursor-pointer"
          onClick={() => router.replace('/')}
        >
          TrackApp
        </p>
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <GrClose className="h-6 w-6" />
          ) : (
            <RxHamburgerMenu className="h-7 w-7" />
          )}
        </button>
      </div>

      <div
        className={`md:flex md:items-center md:justify-end ${
          isMenuOpen ? 'flex flex-col' : 'hidden'
        } absolute md:static top-full left-0 w-full bg-slate-600 dark:bg-slate-800 md:bg-transparent md:dark:bg-transparent z-40`}
      >
        <div className="flex flex-col md:flex-row gap-1 md:gap-4 items-center w-full md:w-auto p-4 md:p-0">
          {user?.role === 'admin' || user?.role === 'staff' ? (
            <>
              <Link
                href="/panel-de-control"
                className={`hover:bg-blue-800 hover:opacity-70 px-4 py-2 rounded-lg transition duration-300 ${
                  pathname === '/panel-de-control' && 'bg-blue-800'
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/panel-de-control/envios"
                className={`hover:bg-blue-800 hover:opacity-70 px-4 py-2 rounded-lg transition duration-300 ${
                  pathname === '/panel-de-control/envios' && 'bg-blue-800'
                }`}
              >
                Envios
              </Link>
              {user.role === 'admin' && (
                <>
                  <Link
                    href="/panel-de-control/registros"
                    className={`hover:bg-blue-800 hover:opacity-70 px-4 py-2 rounded-lg transition duration-300 ${
                      pathname === '/panel-de-control/registros' &&
                      'bg-blue-800'
                    }`}
                  >
                    Registros
                  </Link>
                  <Link
                    href="/panel-de-control/usuarios"
                    className={`hover:bg-blue-800 hover:opacity-70 px-4 py-2 rounded-lg transition duration-300 ${
                      pathname === '/panel-de-control/usuarios' && 'bg-blue-800'
                    }`}
                  >
                    Usuarios
                  </Link>
                </>
              )}
            </>
          ) : (
            <>
              <Link
                href="/inicio"
                className={`hover:bg-blue-800 hover:opacity-70 px-4 py-2 rounded-lg transition duration-300 ${
                  pathname === '/inicio' && 'bg-blue-800'
                }`}
              >
                Inicio
              </Link>
              <Link
                href="/mis-envios"
                className={`hover:bg-blue-800 hover:opacity-70 px-4 py-2 rounded-lg transition duration-300 ${
                  pathname === '/mis-envios' && 'bg-blue-800'
                }`}
              >
                Mis envios
              </Link>
            </>
          )}
        </div>
        <div className="flex justify-end items-center gap-4 mt-0 md:ml-4 p-4 md:p-0">
          {user && <UserMenu user={user} />}
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  )
}
