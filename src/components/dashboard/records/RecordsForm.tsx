import ErrorText from '@/components/ErrorText'
import useUser from '@/components/hooks/useUser'
import {
  FormErrorsGetResume,
  initialErrorsGetResume,
  PropsGetResume,
  initialDataGetResume,
  Resume
} from '@/components/types/Record'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import CustomButton from './CustomButton'

interface Props {
  setResume: Dispatch<SetStateAction<Resume | null>>
  setRequestDone: Dispatch<SetStateAction<boolean>>
}

const RecordsForm: React.FC<Props> = ({ setResume, setRequestDone }) => {
  const [dataGetResume, setDataGetResume] =
    useState<PropsGetResume>(initialDataGetResume)
  const [formErrors, setFormErrors] = useState<FormErrorsGetResume>(
    initialErrorsGetResume
  )

  const { fleets, getFleets, token, loadingUser, getResume } = useUser()

  useEffect(() => {
    if (token) getFleets()
  }, [token])

  const validations = () => {
    const errors: FormErrorsGetResume = {}

    if (!dataGetResume.fleet_id) {
      errors.fleet_id = 'Debe seleccionar una flota'
    }

    if (!dataGetResume.date) {
      errors.date = 'Debe seleccionar una fecha'
    }

    return errors
  }

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target
    setDataGetResume({ ...dataGetResume, fleet_id: parseInt(value) })
    if (value) setFormErrors({ ...formErrors, fleet_id: '' })
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target
    setDataGetResume({ ...dataGetResume, date: new Date(value) })
    if (value) setFormErrors({ ...formErrors, date: '' })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const err = validations()
    setFormErrors(err)
    if (Object.keys(err).length === 0 && dataGetResume.fleet_id) {
      const res = await getResume({
        id: dataGetResume.fleet_id,
        date: dataGetResume.date.toISOString()
      })

      if (res) {
        setResume(res)
        setRequestDone(true)
      }
    }
  }

  return (
    <div className="md:m-4 py-8 px-4 md:px-12 w-full md:w-fit border border-gray-300 dark:border-gray-700 bg-gray-200 dark:bg-gray-800 rounded-lg shadow-md">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 md:gap-32 items center w-full"
      >
        <div className="flex flex-col md:flex-row gap-4 md:gap-12">
          <div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="fleet"
                className="font-light text-foreground sm:text-lg"
              >
                Flota
              </label>
              {formErrors.fleet_id && <ErrorText text={formErrors.fleet_id} />}
            </div>
            <select
              id="fleet"
              name="fleet_id"
              onChange={handleSelectChange}
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base cursor-pointer"
            >
              <option value="" selected={dataGetResume.fleet_id === null}>
                -- Seleccione flota --
              </option>
              {fleets.map((fleet) => (
                <option
                  key={fleet.id}
                  value={fleet.id}
                  selected={dataGetResume.fleet_id === fleet.id}
                >
                  {fleet.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="flex gap-2 items-center">
              <label
                htmlFor="date"
                className="font-light text-foreground sm:text-lg"
              >
                Fecha
              </label>
              {formErrors.date && <ErrorText text={formErrors.date} />}
            </div>
            {formErrors.date && <ErrorText text={formErrors.date} />}
            <input
              type="date"
              name="date"
              className="mt-1 block w-full p-2 border border-gray-400 dark:border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-base cursor-pointer"
              value={dataGetResume.date.toISOString().split('T')[0]}
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className="flex justify-center mt-2 md:mt-0 md:items-end">
          <CustomButton loading={loadingUser} />
        </div>
      </form>
    </div>
  )
}

export default RecordsForm
