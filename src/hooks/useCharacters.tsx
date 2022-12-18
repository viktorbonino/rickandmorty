import { useState, useMemo } from 'react'
import axios from 'axios'
import { useQuery } from 'react-query'
import useFavorites from './useFavorites'
import { Character, View } from '../types/types'

export default function useCharacters(view: View) {
  const { favorites, addToFavorites, removeFromFavorites } = useFavorites()

  const { data, ...rest } = useQuery('characters', async () => {
    const { data } = await axios.get(
      'https://rickandmortyapi.com/api/character'
    )
    return data.results
  })

  const characters = useMemo<Character[]>(() => {
    if (data) {
      return data
        .map((character: Omit<Character, 'favorite'>) => {
          const isFavorite = favorites.find(
            (favorite) => favorite.id === character.id
          )

          return {
            ...character,
            favorite: isFavorite ? true : false,
          }
        })
        .sort(
          (a: Character, b: Character) =>
            Number(b.favorite) - Number(a.favorite)
        )
    }
  }, [data, favorites])

  const { filteredCharacters, filter, filterNotFound } = useFilteredCharacters(
    view === 'all' ? characters : favorites
  )

  return {
    characters,
    ...rest,
    addToFavorites,
    removeFromFavorites,
    favorites,
    filteredCharacters,
    filter,
    filterNotFound,
  }
}

function useFilteredCharacters(characters: Character[]) {
  const [filter, setFilter] = useState('')

  const filteredCharacters = useMemo(
    () =>
      characters?.filter((character) =>
        character.name.toLowerCase().includes(filter.toLowerCase())
      ),

    [characters, filter]
  )

  const filterNotFound = filter !== '' && filteredCharacters?.length === 0

  return {
    filteredCharacters,
    filter: setFilter,
    filterNotFound,
  }
}
