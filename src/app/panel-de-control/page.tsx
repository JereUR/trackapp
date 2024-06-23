import AsideSection from '@/components/dashboard/AsideSection'
import ShowFleets from '@/components/dashboard/ShowFleets'
import dynamic from 'next/dynamic'
import React, { useMemo } from 'react'

const AdminHomePage = () => {
  const AsideSection = useMemo(
    () =>
      dynamic(() => import('@/components/dashboard/AsideSection'), {
        loading: () => <p>A map is loading</p>,
        ssr: false
      }),
    []
  )
  return (
    <div className="flex gap-8 m-10">
      <div className="w-3/4">
        <ShowFleets />
      </div>
      <div className="w-1/4">
        <AsideSection />
      </div>
    </div>
  )
}

export default AdminHomePage
