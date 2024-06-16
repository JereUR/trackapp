'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import ThemeSwitcher from '@components/global/ThemeSwitcher'
import { useTheme } from 'next-themes'

const TopBarWithLinks = () => {
  const pathname = usePathname()
  const router = useRouter()
  const [previousClassName, setPreviousClassName] =
    useState<string>('bg-slate-800')
  const { theme, resolvedTheme } = useTheme()

  useEffect(() => {
    if (theme === 'light') {
      setPreviousClassName('bg-slate-600')
    } else {
      if (theme === 'dark') {
        setPreviousClassName('bg-slate-800')
      }
    }
  }, [theme])

  return (
    <div
      className={`flex justify-between items-center p-6 text-white ${previousClassName}`}
    >
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
            className={`hover:bg-purple-800 hover:opacity-70 px-4 py-1 rounded-lg transition duration-300 ${
              pathname === '/panel-de-control' && 'bg-purple-800'
            }`}
          >
            Inicio
          </Link>
          <Link
            href={'/panel-de-control/envios'}
            className={`hover:bg-purple-800 hover:opacity-70 px-4 py-1 rounded-lg transition duration-300 ${
              pathname === '/panel-de-control/envios' && 'bg-purple-800'
            }`}
          >
            Envios
          </Link>
          <Link
            href={'/panel-de-control/registros'}
            className={`hover:bg-purple-800 hover:opacity-70 px-4 py-1 rounded-lg transition duration-300 ${
              pathname === '/panel-de-control/registros' && 'bg-purple-800'
            }`}
          >
            Registros
          </Link>
          <Link
            href={'/panel-de-control/usuarios'}
            className={`hover:bg-purple-800 hover:opacity-70 px-4 py-1 rounded-lg transition duration-300 ${
              pathname === '/panel-de-control/usuarios' && 'bg-purple-800'
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

export default TopBarWithLinks
