// http://localhost:5173/movies/tt2250912
import { useParams } from 'react-router'
import axios from 'axios'
import { useEffect, useState } from 'react'

export interface Movie {
  Title: string
  Year: string
  Rated: string
  Released: string
  Runtime: string
  Genre: string
  Director: string
  Writer: string
  Actors: string
  Plot: string
  Language: string
  Country: string
  Awards: string
  Poster: string
  Ratings: Rating[]
  Metascore: string
  imdbRating: string
  imdbVotes: string
  imdbID: string
  Type: string
  DVD: string
  BoxOffice: string
  Production: string
  Website: string
  Response: string
}
export interface Rating {
  Source: string
  Value: string
}

export default function MovieDetails() {
  const { movieId } = useParams()
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    async function fetchMovie() {
      const { data } = await axios.get<Movie>(
        `https://omdbapi.com?apikey=9d38c929&i=${movieId}`
      )
      setMovie(data)
    }
    fetchMovie()
  }, [])

  return (
    <>
      {movie && (
        <>
          <h1>{movie.Title}</h1>
        </>
      )}
    </>
  )
}
