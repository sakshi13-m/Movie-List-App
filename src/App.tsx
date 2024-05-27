import React, { useEffect, useState } from 'react';
import './App.scss';
import { Movies } from './Movies';
import { getMovieList } from './apiServices/movieList';
import { TabPanel } from './components/TabPanel';

function App() {
  const [movieList, setMovieList] = useState<Array<Object>>([])

  const fetchMovieList = async () => {
    const { results } = await getMovieList(2012, 1500)
    console.log(results)
    setMovieList([{'year':2012, 'data': results}])
  }

  useEffect(() => {
    if(movieList.length === 0 ) fetchMovieList()
  }, [])

  return (
    <div className="App">
      <h2>Movies</h2>
      <TabPanel setMovieList={setMovieList} />
      <Movies movieList={movieList} setMovieList={setMovieList} />
    </div>
  );
}

export default App;
