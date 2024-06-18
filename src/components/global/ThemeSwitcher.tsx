import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { useTheme } from 'next-themes'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

const ThemeSwitcher = ({ className }: { className?: string }) => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (resolvedTheme !== undefined) {
      setMounted(true)
    }
  }, [resolvedTheme])

  if (!mounted) {
    return <div>Loading...</div>
  }

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme)
  }

  return (
    <Tabs defaultValue={resolvedTheme} className={className}>
      <TabsList className="bg-background py-2 md:py-5">
        <TabsTrigger value="light" onClick={() => handleThemeChange('light')}>
          <SunIcon
            className={`h-5 w-5 md:h-6 md:w-6 ${
              resolvedTheme === 'light' && 'text-blue-600'
            }`}
          />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => handleThemeChange('dark')}>
          <MoonIcon
            className={`h-5 w-5 md:h-6 md:w-6 ${
              resolvedTheme === 'dark' && 'text-blue-600'
            }`}
          />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher
