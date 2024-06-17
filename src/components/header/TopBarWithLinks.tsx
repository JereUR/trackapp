'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import ThemeSwitcher from '@/components/global/ThemeSwitcher'

export default function TopBarWithLinks() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex justify-between items-center p-6 text-white shadow-md bg-slate-600 dark:bg-slate-800">
      <div className="flex gap-16 items-center">
        <div>
          <p
            className="text-3xl font-semibold cursor-pointer"
            onClick={() => router.replace('/panel-de-control')}
          >
            TrackApp
          </p>
        </div>
        <div className="flex space-x-6 ">
          <Link
            href={'/panel-de-control'}
            className={`hover:bg-blue-800 hover:opacity-70 px-4 py-1 rounded-lg transition duration-300 ${
              pathname === '/panel-de-control' && 'bg-blue-800'
            }`}
          >
            Inicio
          </Link>
          <Link
            href={'/panel-de-control/envios'}
            className={`hover:bg-blue-800 hover:opacity-70 px-4 py-1 rounded-lg transition duration-300 ${
              pathname === '/panel-de-control/envios' && 'bg-blue-800'
            }`}
          >
            Envios
          </Link>
          <Link
            href={'/panel-de-control/registros'}
            className={`hover:bg-blue-800 hover:opacity-70 px-4 py-1 rounded-lg transition duration-300 ${
              pathname === '/panel-de-control/registros' && 'bg-blue-800'
            }`}
          >
            Registros
          </Link>
          <Link
            href={'/panel-de-control/usuarios'}
            className={`hover:bg-blue-800 hover:opacity-70 px-4 py-1 rounded-lg transition duration-300 ${
              pathname === '/panel-de-control/usuarios' && 'bg-blue-800'
            }`}
          >
            Usuarios
          </Link>
        </div>
      </div>
      <ThemeSwitcher />
    </div>
  )
}
