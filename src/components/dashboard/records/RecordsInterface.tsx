'use client'

import { useState } from 'react'

import RecordsForm from './RecordsForm'
import RecordsResume from './RecordsResume'
import { Resume } from '@/components/types/Record'

const RecordsInterface = () => {
  const [resume, setResume] = useState<Resume | null>(null)
  const [requestDone, setRequestDone] = useState<boolean>(false)
  console.log(resume)

  return (
    <div className="flex flex-col gap-8">
      <p className="text-3xl font-bold">Registros</p>
      <RecordsForm setResume={setResume} setRequestDone={setRequestDone} />
      <hr />
      <RecordsResume resume={resume} requestDone={requestDone} />
    </div>
  )
}

export default RecordsInterface
