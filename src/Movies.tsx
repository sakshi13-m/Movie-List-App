import React, { useCallback, useEffect, useRef } from "react";
import { MovieCard } from "./components/MovieCard";
import './Movies.scss'
import { getMovieList } from "./apiServices/movieList";

interface props {
  movieList: Array<any>,
  setMovieList: Function
}

export const Movies = ({ movieList, setMovieList }: props) => {
  const yearRef = useRef<HTMLDivElement | null>(null);
  let isLoading = false;

  const checkYearPresent = (year: number) => {
    const check =  movieList.find((item) => item.year === year)
    console.log('check', year, check)
    return check ? true : false
  }

  const sortFetchedList = (list: Array<any>) => {
    list.sort((a, b) => a.year - b.year)
    return list
  }

  const getYear = (flag: boolean) => {
    if (movieList.length === 1) return 2012
    sortFetchedList(movieList)
    console.log('sorted List', movieList);
    return flag ? movieList[0].year : movieList.at(-1).year
  }

  const fetchData = async(year: number) => {
    isLoading = true
    const { results } = await getMovieList(year);
    setMovieList(sortFetchedList([
      ...movieList,
      {'year': year, 'data': results}

    ]))
    isLoading = false
  }

  const handleScroll = useCallback(() => {
    const container = yearRef.current;
    if (container) {
      if (container.scrollTop === 0) {
        const prevYear = getYear(true) - 1
        !isLoading && !checkYearPresent(prevYear) && fetchData(prevYear);
      } else if (container.scrollHeight - container.scrollTop === container.clientHeight) {
        const nextYear = getYear(false) + 1
        !isLoading && !checkYearPresent(nextYear) && fetchData(nextYear);
      }
    }
  }, [fetchData]);

  // useEffect(() => {
  //   const container = yearRef.current;
  //   if (container) {
  //     container.addEventListener('scroll', handleScroll);
  //     return () => {
  //       container.removeEventListener('scroll', handleScroll);
  //     };
  //   }
  // }, [handleScroll]);

  useEffect(() => {

  })

  return (
    <div className="list-div" id={'movie-list-div'} ref={yearRef}>
      {
        movieList.map((item: any) => (
          <div className="year-div">
            <h2>{item.year}</h2>
            {item.data.map((movieDetails: any) => <MovieCard item={movieDetails} />)}
          </ div>
        ))
      }
    </div>
  )
}