import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import ThemeSwitcher from '@/components/global/ThemeSwitcher'
import { RxHamburgerMenu } from 'react-icons/rx'
import { GrClose } from 'react-icons/gr'
import useUser from '../hooks/useUser'

export default function TopBarWithLinks() {
  const pathname = usePathname()
  const router = useRouter()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user } = useUser()

  // Cerrar el menú cuando se cambia de página
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  return (
    <div className="relative flex flex-col md:flex-row justify-between items-center p-6 text-white shadow-md bg-slate-600 dark:bg-slate-800">
      <div className="flex justify-between items-center w-full md:w-auto">
        <div>
          <p
            className="text-3xl font-semibold cursor-pointer"
            onClick={() => router.replace('/')}
          >
            TrackApp
          </p>
        </div>
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
      {user?.role === 'admin' ? (
        <div
          className={`${
            isMenuOpen ? 'h-auto' : 'h-0'
          } md:h-auto md:flex flex-col md:flex-row gap-1 md:gap-16 items-center w-full md:w-auto absolute md:static top-16 left-0 md:top-auto md:left-auto bg-slate-600 dark:bg-slate-800 md:bg-transparent md:dark:bg-transparent p-4 md:p-0 z-10 transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div
            className={`${
              isMenuOpen ? 'flex flex-col' : 'hidden'
            } md:flex w-full gap-1 md:gap-2 md:w-auto`}
          >
            <Link
              href={'/panel-de-control'}
              className={`rounded-r-full mr-20 md:mr-0 md:rounded-r-lg hover:bg-blue-800 hover:opacity-70 px-4 py-1 rounded-lg flex items-center transition duration-300 ${
                pathname === '/panel-de-control' && 'bg-blue-800'
              }`}
            >
              <span className="w-full truncate">Inicio</span>
            </Link>
            <Link
              href={'/panel-de-control/envios'}
              className={`rounded-r-full mr-20 md:mr-0 md:rounded-r-lg hover:bg-blue-800 hover:opacity-70 px-4 py-1 rounded-lg flex items-center transition duration-300 ${
                pathname === '/panel-de-control/envios' && 'bg-blue-800'
              }`}
            >
              <span className="w-full truncate">Envios</span>
            </Link>
            <Link
              href={'/panel-de-control/registros'}
              className={`rounded-r-full mr-20 md:mr-0 md:rounded-r-lg hover:bg-blue-800 hover:opacity-70 px-4 py-1 rounded-lg flex items-center transition duration-300 ${
                pathname === '/panel-de-control/registros' && 'bg-blue-800'
              }`}
            >
              <span className="w-full truncate">Registros</span>
            </Link>
            <Link
              href={'/panel-de-control/usuarios'}
              className={`rounded-r-full mr-20 md:mr-0 md:rounded-r-lg hover:bg-blue-800 hover:opacity-70 px-4 py-1 rounded-lg flex items-center transition duration-300 ${
                pathname === '/panel-de-control/usuarios' && 'bg-blue-800'
              }`}
            >
              <span className="w-full truncate">Usuarios</span>
            </Link>
          </div>
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:block ml-auto`}>
            <ThemeSwitcher className="ml-auto mt-4 md:mt-0" />
          </div>
        </div>
      ) : (
        <div
          className={`${
            isMenuOpen ? 'h-auto' : 'h-0'
          } md:h-auto md:flex flex-col md:flex-row gap-1 md:gap-16 items-center w-full md:w-auto absolute md:static top-16 left-0 md:top-auto md:left-auto bg-slate-600 dark:bg-slate-800 md:bg-transparent md:dark:bg-transparent p-4 md:p-0 z-10 transition-all duration-300 ease-in-out overflow-hidden`}
        >
          <div
            className={`${
              isMenuOpen ? 'flex flex-col' : 'hidden'
            } md:flex w-full gap-1 md:gap-2 md:w-auto`}
          >
            <Link
              href={'/inicio'}
              className={`rounded-r-full mr-20 md:mr-0 md:rounded-r-lg hover:bg-blue-800 hover:opacity-70 px-4 py-1 rounded-lg flex items-center transition duration-300 ${
                pathname === '/inicio' && 'bg-blue-800'
              }`}
            >
              <span className="w-full truncate">Inicio</span>
            </Link>
            <Link
              href={'/mis-envios'}
              className={`rounded-r-full mr-20 md:mr-0 md:rounded-r-lg hover:bg-blue-800 hover:opacity-70 px-4 py-1 rounded-lg flex items-center transition duration-300 ${
                pathname === '/panel-de-control/mis-envios' && 'bg-blue-800'
              }`}
            >
              <span className="w-full truncate">Mis envios</span>
            </Link>
          </div>
          <div className={`${isMenuOpen ? 'flex' : 'hidden'} md:block ml-auto`}>
            <ThemeSwitcher className="ml-auto mt-4 md:mt-0" />
          </div>
        </div>
      )}
    </div>
  )
}
