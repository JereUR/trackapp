'use client'

import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import 'leaflet/dist/leaflet.css'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

import UserContextProvider from '@/components/context/UserContext'
import ThemeProvider from '@/components/providers/ThemeProvider'
import TopBar from '@/components/header/TopBar'
import TopBarWithLinks from '@/components/header/TopBarWithLinks'
import { Toaster } from '@/components/ui/toaster'
import ShipmentsContextProvider from '@/components/context/ShipmentsContext'

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans'
})

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  const noLinks =
    pathname.startsWith('/iniciar-sesion') || pathname.startsWith('/recover')

  return (
    <html lang="en">
      <body
        className={cn(
          'min-h-screen bg-background font-sans antialiased',
          fontSans.variable
        )}
      >
        <UserContextProvider>
          <ShipmentsContextProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              <>
                {noLinks ? (
                  <div className="flex flex-col min-h-screen">
                    <TopBar />
                    <main className="flex-grow flex justify-center items-center">
                      {children}
                    </main>
                  </div>
                ) : (
                  <div>
                    <TopBarWithLinks />
                    {children}
                  </div>
                )}

                <Toaster />
              </>
            </ThemeProvider>
          </ShipmentsContextProvider>
        </UserContextProvider>
      </body>
    </html>
  )
}
