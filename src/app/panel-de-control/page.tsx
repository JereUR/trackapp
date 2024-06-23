import dynamic from 'next/dynamic'

const ShowFleets = dynamic(() => import('@/components/dashboard/ShowFleets'), {
  ssr: false
})

const AsideSection = dynamic(
  () => import('@/components/dashboard/AsideSection'),
  {
    ssr: false
  }
)

const AdminHomePage = () => {
  return (
    <div className="flex gap-8 m-10">
      <div className="w-3/5">
        <ShowFleets />
      </div>
      <div className="w-2/5">
        <AsideSection />
      </div>
    </div>
  )
}

export default AdminHomePage
