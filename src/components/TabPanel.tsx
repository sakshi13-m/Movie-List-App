import React, { useEffect, useState } from 'react';
import './TabPanel.scss';
import { getGenreList } from '../apiServices/genreList';
import { getMovieList } from '../apiServices/movieList';

interface props {
  setGenreList: Function,
  setMovieList: Function
  genreList: Array<any>
}

export const TabPanel = ({ setGenreList, genreList, setMovieList }: props) => {
  const [selectedTab, setSelectedTab] = useState<Array<number>>([0]);

  const fetchGenreList = async () => {
    const list = await getGenreList();
    setGenreList([...genreList, ...list.genres])
  }

  const handleTabClick = async (index: number) => {
    let updatedTab: Array<number>;
    if (index === 0) {
      updatedTab = [0]
    }
    if (selectedTab.includes(index)) {
      updatedTab = selectedTab.filter((i) => i !== index)
    } else {
      updatedTab = selectedTab.filter((i) => i !== 0)
      updatedTab = [...updatedTab, index]
    }
    let selectedGenre: Array<number> = [];
    updatedTab[0] !== 0 && updatedTab.forEach((item) => selectedGenre.push(genreList[item].id))
    const { results } = await getMovieList(2012,100,selectedGenre)
    setSelectedTab(updatedTab.length === 0 ? [0] : updatedTab)
    setMovieList([{ 'year': 2012, 'data': results }])
  }

  useEffect(() => {
    if (genreList.length === 1) fetchGenreList()
  }, []);

  return (
    <div className='tab-panel'>
      {
        genreList.map((item, index) => (
          <div
            className={`tab ${selectedTab.includes(index) && 'selected-tab'}`}
            onClick={() => handleTabClick(index)}
          >{item.name}</div>
        ))
      }
    </div>
  );
}
