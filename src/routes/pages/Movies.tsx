import axios from 'axios'
import { useState } from 'react'

export default function Movies() {
  const [searchText, setSearchText] = useState('')

  async function fetchMovies() {
    await axios.get(`https://omdbapi.com?apikey=7035c60c&s=${searchText}`) // 보간
  }

  return (
    <>
      <div>
        <input
          type="text"
          value={searchText}
          onChange={e => setSearchText(e.target.value)}
        />
        <button>검색!</button>
      </div>
    </>
  )
}
