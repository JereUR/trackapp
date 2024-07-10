'use client'

import { useState } from 'react'

import RecordsForm from './RecordsForm'
import RecordsResume from './RecordsResume'

const RecordsInterface = () => {
  const [dataRecord, setDataRecord] = useState(null)
  const [resume, setResume] = useState(null)

  return (
    <div className="flex flex-col gap-8">
      <p className="text-3xl font-bold">Registros</p>
      <RecordsForm />
      <hr />
      <RecordsResume />
    </div>
  )
}

export default RecordsInterface
