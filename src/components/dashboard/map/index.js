import dynamic from 'next/dynamic'

const ShipmentMap = dynamic(() => import('./ShipmentMap'), {
  ssr: false
})

export default ShipmentMap
