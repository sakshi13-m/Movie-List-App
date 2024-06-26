export const getMovieList = async (year = 2012, voteCount = 100, selectedId: Array<number | null> = []) => {
  try {
    const movieList = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=2dca580c2a14b55200e784d157207b4d&sort_by=popularity.desc&primary_release_year=${year}&with_genres=${selectedId.join('%7C')}&page=1&vote_count.gte=${voteCount}`)
    return movieList.json()
  } catch (e) {
    console.error('error while fetching movie list', e)
    return { results: []}
  }
}