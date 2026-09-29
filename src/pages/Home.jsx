import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'

export default function Home() {
  const [search,setSearch] = useState("")
  const [movies,setMovies] = useState([])
  const [querys,setQuerys] = useSearchParams()

  useEffect(() => {
    const searchQuery = querys.get("s")

    if(searchQuery){
      setSearch(searchQuery)
      doApi(searchQuery)
    }
  },[])

  const doApi = async(searchValue = search) => {
    setQuerys({s:searchValue})

    const url = `https://www.omdbapi.com/?s=${searchValue}&apikey=90781f94`

    try {
      const {data} = await axios.get(url);
      console.log(data);

      if(data.Search){
        setMovies(data.Search)
      }
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>
      <h2>Movie search:</h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button onClick={() => doApi()}>Search</button>

      <div className="row">
        {movies.map(item => {
          return (
            <div className='col-md-4 border' key={item.imdbID}>
              
              <img
                src={item.Poster}
                alt={item.Title}
                width="150"
              />

              <h2>{item.Title}</h2>

              <div>
                Year: {item.Year}
              </div>

              <Link to={`/info/${item.imdbID}?s=${search}`}>
                More Info
              </Link>

            </div>
          )
        })}
      </div>
    </div>
  )
}