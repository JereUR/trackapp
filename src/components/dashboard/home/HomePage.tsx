'use client'

import dynamic from 'next/dynamic'

const ShowFleets = dynamic(
  () => import('@/components/dashboard/home/ShowFleets'),
  {
    ssr: false
  }
)

const AsideSection = dynamic(
  () => import('@/components/dashboard/home/AsideSection'),
  {
    ssr: false
  }
)

const HomePage = () => {
  return (
    <div>
      <div className="md:hidden">
        <div className="m-2">
          <div className="my-4">
            <AsideSection />
          </div>
          <hr className="m-4 mt-6" />
          <div>
            <ShowFleets />
          </div>
        </div>
      </div>
      <div className="hidden md:block">
        <div className="flex gap-8 m-10">
          <div className="w-1/2">
            <ShowFleets />
          </div>
          <div className="w-1/2">
            <AsideSection />
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
