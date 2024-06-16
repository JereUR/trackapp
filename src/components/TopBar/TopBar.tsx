import ThemeSwitcher from '../global/ThemeSwitcher'

const TopBar = () => {
  return (
    <div className="flex justify-between items-center p-6 text-white bg-slate-600 dark:bg-slate-800">
      <p className="text-3xl font-semibold">TrackApp</p>
      <ThemeSwitcher />
    </div>
  )
}

export default TopBar
