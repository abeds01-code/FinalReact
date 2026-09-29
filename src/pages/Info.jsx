import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'

export default function Info() {
  const [movie,setMovie] = useState({})
  const params = useParams()
  const [querys] = useSearchParams()

  useEffect(() => {
    doApi()
  },[])

  const doApi = async() => {
    const url = `https://www.omdbapi.com/?i=${params.id}&apikey=90781f94`

    try {
      const {data} = await axios.get(url);
      console.log(data);
      setMovie(data)
    }
    catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='container'>

      <h2>{movie.Title}</h2>

      <img
        src={movie.Poster}
        alt={movie.Title}
        width="250"
      />

      <div>
        Actors: {movie.Actors}
      </div>

      <div>
        Rating: {movie.imdbRating}
      </div>

      <div>
        Plot: {movie.Plot}
      </div>

      <Link to={`/?s=${querys.get("s")}`}>
        Back
      </Link>

    </div>
  )
}