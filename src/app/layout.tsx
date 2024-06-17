'use client'

import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'

import AuthContextProvider from '@/components/context/AuthContext'
import ThemeProvider from '@/components/providers/ThemeProvider'
import TopBar from '../components/topbar/TopBar'
import TopBarWithLinks from '../components/topbar/TopBarWithLinks'
import { Toaster } from '@/components/ui/toaster'

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
        <AuthContextProvider>
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
        </AuthContextProvider>
      </body>
    </html>
  )
}
