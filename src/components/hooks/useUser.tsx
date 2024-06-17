'use client'

import { useContext } from 'react'

import { AuthContext } from '../context/AuthContext'

export default function useUser() {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useUser must be used within a AuthContext')
  }

  return context
}
