import ThemeSwitcher from '../global/ThemeSwitcher'

export default function TopBar() {
  return (
    <div className="flex justify-between items-center p-6 text-white shadow-md bg-slate-600 dark:bg-slate-800">
      <p className="text-3xl font-semibold">TrackApp</p>
      <ThemeSwitcher />
    </div>
  )
}
