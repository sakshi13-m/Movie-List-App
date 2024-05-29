import React, { useEffect, useState } from 'react';
import './App.scss';
import { Movies } from './Movies';
import { getMovieList } from './apiServices/movieList';
import { TabPanel } from './components/TabPanel';

function App() {
  const [movieList, setMovieList] = useState<Array<Object>>([])
  const [genreList, setGenreList] = useState([{ id: 0, name: 'All' }]);

  const fetchMovieList = async () => {
    const { results } = await getMovieList(2012, 1500)
    setMovieList([{'year':2012, 'data': results}])
  }

  useEffect(() => {
    if(movieList.length === 0 ) fetchMovieList()
  }, [])

  return (
    <div className="App">
      <h2>Movies</h2>
      <TabPanel setMovieList={setMovieList} genreList={genreList} setGenreList={setGenreList} />
      <Movies movieList={movieList} setMovieList={setMovieList} genreList={genreList} />
    </div>
  );
}

export default App;
