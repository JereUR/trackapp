'use client'

import { Inter as FontSans } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { Toaster } from '@/components/ui/toaster'

import TopBar from '@/components/TopBar/TopBar'
import { usePathname } from 'next/navigation'
import TopBarWithLinks from '@/components/TopBar/TopBarWithLinks'

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
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <>
            {noLinks ? <TopBar /> : <TopBarWithLinks />}
            {children}
            <Toaster />
          </>
        </ThemeProvider>
      </body>
    </html>
  )
}
