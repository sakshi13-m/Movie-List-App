export const getGenreList = async (year = 2012, voteCount = 100) => {
    try {
      const genreList = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=2dca580c2a14b55200e784d157207b4d`)
      return genreList.json()
    } catch (e) {
      console.error(e)
    }
  }