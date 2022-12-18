import { useState } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid'
import logo from './assets/logo.png'
import notFound from './assets/notfound.png'
import Characters from './components/Characters'
import useCharacters from './hooks/useCharacters'
import { View } from './types/types'

export default function Home() {
  const [view, setView] = useState<View>('all')

  const {
    favorites,
    filter,
    filteredCharacters: characters,
    filterNotFound,
  } = useCharacters(view)

  return (
    <div className="mx-auto max-w-7xl py-4 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col gap-8">
        <img
          src={logo}
          width={400}
          height={200}
          alt="Rick and Morty Logo"
          className="self-center"
        />
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div className="w-full md:w-80">
            <label htmlFor="search" className="sr-only">
              Search characters
            </label>
            <div className="relative h-full w-full rounded-md shadow-sm">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <MagnifyingGlassIcon
                  className="h-5 w-5 text-cyan-600"
                  aria-hidden="true"
                />
              </div>
              <input
                type="search"
                id="search"
                className="block h-full w-full rounded-md border-zinc-300 pl-10 text-cyan-900 placeholder:text-cyan-800/75 focus:border-cyan-600 focus:ring-cyan-600 sm:text-sm"
                placeholder="Type a character name"
                onChange={(e) => filter(e.target.value)}
              />
            </div>
          </div>
          <span className="isolate inline-flex w-min self-end rounded-md shadow-sm">
            <button
              type="button"
              className="
                relative -ml-px inline-flex items-center 
                rounded-l-md border border-zinc-300 
                bg-white px-4 py-2 
                text-sm font-medium text-cyan-700 
                hover:bg-zinc-50 
                focus:z-10 focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600
              "
              onClick={() => setView('all')}
            >
              All
            </button>
            <button
              type="button"
              className="
                relative -ml-px inline-flex items-center 
                rounded-r-md border border-zinc-300 
                bg-white px-4 py-2 
                text-sm font-medium text-cyan-700 
                hover:bg-zinc-50 
                focus:z-10 focus:border-cyan-600 focus:outline-none focus:ring-1 focus:ring-cyan-600
              "
              onClick={() => setView('favorites')}
            >
              Favorites
            </button>
          </span>
        </div>

        {characters?.length ? (
          <Characters characters={characters} view={view} />
        ) : null}

        {filterNotFound || (favorites.length === 0 && view === 'favorites') ? (
          <div className="flex flex-col items-center justify-center self-center text-center">
            <img src={notFound} width={400} height={600} alt="No results" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
