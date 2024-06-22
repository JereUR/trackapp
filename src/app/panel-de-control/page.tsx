import AsideSection from '@/components/dashboard/AsideSection'
import ShowFleets from '@/components/dashboard/ShowFleets'
import React from 'react'

const AdminHomePage = () => {
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
