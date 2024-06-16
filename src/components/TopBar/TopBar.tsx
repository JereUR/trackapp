import { useTheme } from 'next-themes'
import ThemeSwitcher from '../global/ThemeSwitcher'

const TopBar = () => {
  const { theme } = useTheme()

  return (
    <div
      className={`flex justify-between items-center p-6 text-white ${
        theme === 'dark' ? 'bg-slate-800' : 'bg-slate-600'
      }`}
    >
      <p className="text-3xl font-semibold">TrackApp</p>
      <ThemeSwitcher />
    </div>
  )
}

export default TopBar
