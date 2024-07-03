'use client'

import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import { MdSearch } from 'react-icons/md'
import { useDebouncedCallback } from 'use-debounce'

const Search = ({ placeholder }: { placeholder: string }) => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const handleSearch = useDebouncedCallback((e) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', '1')

    if (e.target.value) {
      e.target.value.length > 1 && params.set('q', e.target.value)
    } else {
      params.delete('q')
    }
    replace(`${pathname}?${params}`)
  }, 300)

  return (
    <div className="flex items-center gap-2 bg-background border border-input dark:border-muted p-2 rounded-lg w-max">
      <MdSearch />
      <input
        type="text"
        placeholder={placeholder}
        className="bg-transparent border-none text-foreground focus:outline-none"
        onChange={handleSearch}
      />
    </div>
  )
}

export default Search
