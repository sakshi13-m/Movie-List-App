import React, { useCallback } from "react";
import './MovieCard.scss'

interface props {
  item: {
    title: string,
    vote_average: number,
    poster_path: string,
    genre_ids: Array<number>,
    overview: string,
  },
  genreList: Array<any>
}

export const MovieCard = ({item, genreList}: props) => {
  const { title, poster_path: backdrop, vote_average: rating, genre_ids, overview  } = item
  const getgenreList = useCallback(() => {
    const genre = genre_ids.forEach((item,idx, ar) => ar[idx] = genreList.filter((gen) => gen.id === item)[0]?.name)
    console.log(genre_ids, genre)
    return genre_ids.join(' | ')
  }, [item])

  return (
    <div className="card">
      <div className="movie-image-container">
        <img className="movie-img" src={`https://image.tmdb.org/t/p/w500${backdrop}`} alt={title} />
      </div>
      <div className="movie-info">
      <div className="movie-card-details">
        <p>{overview}</p>
        <p><b>Rating:</b> {rating.toFixed(1)}</p>
        <p><b>Genre:</b> {getgenreList()}</p>
      </div>
      </div>
    </div>
  )
};
