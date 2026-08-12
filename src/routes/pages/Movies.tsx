import axios from 'axios'
import { useState, useEffect } from 'react'
import { useInfiniteQuery, infiniteQueryOptions } from '@tanstack/react-query'
import { Link, Outlet } from 'react-router'
import { useMovieStore } from '@/stores/movie'
import { useInView } from 'react-intersection-observer'

export interface ResponseDataSuccess {
  Response: 'True'
  Search: Movie[]
  totalResults: `${number}` // '817'
}
export interface ResponseDataError {
  Response: 'False'
  Error: string
}
export type ResponseData = ResponseDataSuccess | ResponseDataError
export interface Movie {
  Title: string
  Year: string
  imdbID: string
  Type: string
  Poster: string
}

export default function Movies() {
  // const { searchText, setSearchText } = useMovieStore(s => s) // ❌ 잘못된 코드!
  const searchText = useMovieStore(s => s.searchText)
  const setSearchText = useMovieStore(s => s.setSearchText)
  const [inputText, setInputText] = useState(searchText)
  const { ref, inView } = useInView()

  const options = infiniteQueryOptions({
    queryKey: ['movies', searchText],
    queryFn: async ({ signal, pageParam }) => {
      // await new Promise(resolve => setTimeout(resolve, 3000))
      const { data } = await axios.post<ResponseData>(
        '/api/movie',
        {
          title: searchText,
          page: pageParam
        },
        { signal }
      )
      if (data.Response === 'False') throw new Error(data.Error)
      return data
    },
    staleTime: 1000 * 5, // 캐싱하는 시간(ms)
    enabled: Boolean(searchText),
    placeholderData: prev => prev, // 깜빡이는 부분에 채워넣을 데이터
    getNextPageParam: (lastPage, pages) => {
      // '817' => 817 => 81.7 => 82
      const maxPage = Math.ceil(Number(lastPage.totalResults) / 10)
      const currentPage = pages.length
      if (currentPage < maxPage) return currentPage + 1
      return null
    },
    initialPageParam: 1
  })

  const { data, fetchNextPage, isFetching, hasNextPage } =
    useInfiniteQuery(options)

  useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView, fetchNextPage])

  function fetchMovies() {
    setSearchText(inputText)
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') fetchMovies()
          }}
        />
        <button onClick={() => fetchMovies()}>검색!</button>
      </div>
      <div>
        <ul>
          {data?.pages.map(page => {
            return page.Search.map(movie => {
              return (
                <li key={movie.imdbID}>
                  <Link to={`/movies/${movie.imdbID}`}>
                    {movie.Title}({movie.Year})
                  </Link>
                </li>
              )
            })
          })}
          {/* {movies?.map(movie => {
            return (
              <li key={movie.imdbID}>
                <Link to={`/movies/${movie.imdbID}`}>
                  {movie.Title}({movie.Year})
                </Link>
              </li>
            )
          })} */}
        </ul>
        <button
          ref={ref}
          style={{
            display: isFetching || !hasNextPage ? 'none' : 'block'
          }}
          onClick={() => fetchNextPage()}>
          더보기 +
        </button>
      </div>
      <Outlet />
    </>
  )
}
