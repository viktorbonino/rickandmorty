import { StarIcon } from '@heroicons/react/24/solid'
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline'
import useCharacters from '../hooks/useCharacters'
import { Character, View } from '../types/types'

export default function Characters({
  characters,
  view,
}: {
  characters: Character[]
  view: View
}) {
  const { addToFavorites, removeFromFavorites } = useCharacters(view)

  return (
    <ul
      role="list"
      className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
    >
      {characters?.map((character) => (
        <li
          key={character.id}
          className="relative col-span-1 flex flex-col divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          {character.favorite ? (
            <button
              onClick={() => removeFromFavorites(character)}
              className="group absolute right-5 top-5"
              aria-label="Remove from favorites"
            >
              <StarIcon className="h-7 w-7 text-yellow-500 group-hover:hidden" />
              <StarIconOutline className="hidden h-7 w-7 text-yellow-500 group-hover:block" />
            </button>
          ) : (
            <button
              onClick={() => addToFavorites(character)}
              className="group absolute right-5 top-5"
              aria-label="Add to favorites"
            >
              <StarIconOutline className="h-7 w-7 text-yellow-500 group-hover:hidden" />
              <StarIcon className="hidden h-7 w-7 text-yellow-500 group-hover:block" />
            </button>
          )}
          <div className="flex flex-1 flex-col py-4">
            <img
              className="mx-auto h-32 w-32 flex-shrink-0 rounded-full shadow-inner"
              src={character.image}
              alt={character.name}
            />

            <h3 className="mt-6 text-sm font-medium text-cyan-800">
              {character.name}
            </h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between gap-2.5">
              <dt className="sr-only">Status</dt>
              <dd>
                <span
                  className={`
                    rounded-full px-2 py-1 text-xs font-medium capitalize
                    ${
                      character.status === 'Alive' &&
                      'bg-green-100 text-green-800'
                    }
                    ${character.status === 'Dead' && 'bg-red-100 text-red-800'}
                    ${
                      character.status === 'unknown' &&
                      'bg-blue-100 text-blue-800'
                    }
                  `}
                >
                  {character.status}
                </span>
              </dd>
              <dt className="sr-only">Gender</dt>
              <dd className="text-sm text-zinc-500">
                {character.species} - {character.gender}
              </dd>
              <dd className="mt-1 text-sm text-cyan-800">
                Seen in {character.episode.length}
                {character.episode.length === 1 ? ' episode' : ' episodes'}
              </dd>
            </dl>
          </div>
        </li>
      ))}
    </ul>
  )
}
