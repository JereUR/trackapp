import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs'

const ThemeSwitcher = () => {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (resolvedTheme !== undefined) {
      setMounted(true)
    }
  }, [resolvedTheme])

  if (!mounted) {
    return <div>Loading...</div> // Mostrar estado de carga mientras se carga el tema
  }

  const handleThemeChange = (selectedTheme: string) => {
    setTheme(selectedTheme)
  }

  return (
    <Tabs defaultValue={resolvedTheme}>
      <TabsList className="bg-background py-5">
        <TabsTrigger value="light" onClick={() => handleThemeChange('light')}>
          <SunIcon
            className={`h-6 w-6 ${
              resolvedTheme === 'light' && 'text-blue-600'
            }`}
          />
        </TabsTrigger>
        <TabsTrigger value="dark" onClick={() => handleThemeChange('dark')}>
          <MoonIcon
            className={`h-6 w-6 ${resolvedTheme === 'dark' && 'text-blue-600'}`}
          />
        </TabsTrigger>
      </TabsList>
    </Tabs>
  )
}

export default ThemeSwitcher
