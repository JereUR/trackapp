'use client'

import { useContext } from 'react'

import { ShipmentsContext } from '../context/ShipmentsContext'

export default function useShipments() {
  const context = useContext(ShipmentsContext)

  if (!context) {
    throw new Error('useShipments must be used within a ShipmentsContext')
  }

  return context
}
