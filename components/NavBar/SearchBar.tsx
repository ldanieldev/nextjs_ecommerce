'use client'
import { MdSearch } from 'react-icons/md'
import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SearchBar() {
  const [query, setQuery] = useState<string>('')
  const router = useRouter()

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (query.trim().length > 0) {
      router.push('/search?q=' + encodeURIComponent(query))
      setQuery('')
    }
  }

  return (
    <form className="w-full" onSubmit={onSubmit}>
      <button type="submit">
        <MdSearch
          className="text-gray-600 dark:text-gray-300 absolute inset-y-2 left-2"
          size={22}
        />
      </button>

      <input
        type="text"
        className="w-full py-1 pl-10 pr-4 bg-white border rounded-md dark:bg-slate-700 dark:focus-within:text-gray-700 dark:border-gray-600 dark:focus-within:bg-white "
        placeholder="Search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
    </form>
  )
}
