import React from "react";
import './MovieCard.scss'

interface props {
  item: {
    title: string,
    vote_average: number,
    backdrop_path: string
  }
}

export const MovieCard = ({item}: props) => {
  const { title, backdrop_path: backdrop, vote_average: rating } = item
  return (
    <div className="card">
      <img className="movie-img" src={`https://image.tmdb.org/t/p/w500${backdrop}`} alt={title} />
      <label className="title">{title}</label>
      <span className="rating">{rating}</span>
    </div>
  )
};
