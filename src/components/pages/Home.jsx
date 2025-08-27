import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllMoviesThunk } from '../../redux/movie/moviesSlice';

import Hero from '../templates/Home/Hero'
import ChooseUs from '../templates/Home/ChooseUs'
import Trending from '../templates/Home/Trending'
import Upcoming from '../templates/Home/UpComing'
import Subscribe from '../templates/Subscribe'

function Home() {
  // Fetching movies from the Redux store
  const {nowPlaying, upcoming, popular, status, error} = useSelector((state) => state.movies);
  const dispatch = useDispatch();

  useEffect(() => {
    if (nowPlaying.length > 0 && upcoming.length > 0 && popular.length > 0) return;
    dispatch(fetchAllMoviesThunk());
  }, [dispatch, nowPlaying, upcoming, popular]);

  // Mounting
  if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>Error: {error}</p>;
  if (nowPlaying.length == 0 && upcoming.length == 0 && popular.length == 0) return <p>No movies available</p>;

  return (
    <div>
        <Hero movies={popular} />
        <ChooseUs />
        <Trending movies={nowPlaying} />
        <Upcoming movies={upcoming} />
        <Subscribe />
    </div>
  )
}

export default Home