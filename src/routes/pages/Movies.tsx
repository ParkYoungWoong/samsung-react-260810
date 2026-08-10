import axios from 'axios'
import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

export interface ResponseData {
  Search: Movie[]
  totalResults: string
  Response: string
}
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  const [searchText, setSearchText] = useState('')
  const { data: movies } = useQuery({
    queryKey: ['movies', searchText],
    queryFn: async () => {
      const { data } = await axios.get<ResponseData>(
        `https://omdbapi.com?apikey=9d38c929&s=${searchText}`
      )
      return data.Search
    },
    staleTime: 1000 * 60 * 60 * 24, // 캐싱하는 시간(ms)
    enabled: false
  })

  return (
    <>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') fetchMovies()
          }}
        />
        <button onClick={() => fetchMovies()}>검색!</button>
      </div>
      <div>
        <ul>
          {movies.map(movie => {
            return <li key={movie.imdbID}>{movie.Title}</li>
          })}
        </ul>
      </div>
    </>
  )
}
