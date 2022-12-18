import { useEffect, useState } from 'react'
import { Character } from '../types/types'

export default function useFavorites() {
  const [favorites, setFavorites] = useState<Character[]>(
    JSON.parse(window.localStorage.getItem('favorites') || '[]')
  )

  useEffect(() => {
    const handleStorage = () => {
      const favorites = JSON.parse(
        window.localStorage.getItem('favorites') || '[]'
      )
      setFavorites(favorites)
    }
    window.addEventListener('favorites', handleStorage)

    return () => window.removeEventListener('favorites', handleStorage)
  }, [])

  const addToFavorites = (character: Character) => {
    if (
      !favorites.find((favorite: Character) => favorite.id === character.id)
    ) {
      const newFavorites = [...favorites, { ...character, favorite: true }]

      window.localStorage.setItem('favorites', JSON.stringify(newFavorites))
      window.dispatchEvent(new Event('favorites'))
    }
  }

  const removeFromFavorites = (character: Character) => {
    if (favorites.find((favorite: Character) => favorite.id === character.id)) {
      const favorites = JSON.parse(
        window.localStorage.getItem('favorites') || '[]'
      )

      const newFavorites = favorites.filter(
        (favorite: Character) => favorite.id !== character.id
      )

      window.localStorage.setItem('favorites', JSON.stringify(newFavorites))
      window.dispatchEvent(new Event('favorites'))
    }
  }

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
  }
}
