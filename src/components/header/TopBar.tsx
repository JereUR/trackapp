import { useRouter } from 'next/navigation'

import ThemeSwitcher from '../global/ThemeSwitcher'

export default function TopBar() {
  const router = useRouter()

  return (
    <div className="flex justify-between items-center p-6 text-white shadow-md bg-slate-600 dark:bg-slate-800">
      <p
        className="text-3xl font-semibold cursor-pointer"
        onClick={() => router.replace('/')}
      >
        TrackApp
      </p>
      <ThemeSwitcher />
    </div>
  )
}
