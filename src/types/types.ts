export interface Character {
  id: number
  name: string
  status: string
  species: string
  gender: string
  image: string
  episode: string[]
  url: string
  favorite: boolean
}

export type View = 'all' | 'favorites'
