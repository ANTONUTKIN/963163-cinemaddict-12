import moment from "moment";
import {MovieDescription} from "../const";

export const formatMovieDuration = (duration) => {
  if (!duration) {
    return ``;
  }
  return `${moment.duration({minutes: duration}).hours()}h ${moment
    .duration({minutes: duration})
    .minutes()}m`;
};

export const getReleaseDate = (date) => {
  return moment(date).format(`DD MMMM YYYY`);
};

export const getReleaseYear = (date) => {
  return moment(date).format(`YYYY`);
};

export const getWatchedMoviesCount = (movies) => {
  return movies.filter((movie) => movie.isWatched).length;
};

export const getProfileRating = (movies) => {
  const watchedMoviesCount = getWatchedMoviesCount(movies);
  switch (true) {
    case (watchedMoviesCount >= 1 && watchedMoviesCount <= 10):
      return `novice`;
    case (watchedMoviesCount >= 11 && watchedMoviesCount <= 20):
      return `fan`;
    case (watchedMoviesCount >= 21):
      return `movie buff`;
    default:
      return ``;
  }
};

export const getMoviesDuration = (movies) => {
  return movies.reduce((acc, movie) => {
    return acc + movie.runtime;
  }, 0);
};

export const getAllGenres = (movies) => {
  const allGenres = movies.map((movie) => movie.genre).flat();
  return allGenres.reduce((accumulator, currentValue) => {
    accumulator[currentValue] = accumulator[currentValue] ? ++accumulator[currentValue] : 1;
    return accumulator;
  }, {});
};


export const getTopGenre = (watchedMovies) => {
  const genres = getAllGenres(watchedMovies);
  let favoriteGenre = ``;
  let maxNumOfViews = 0;
  for (const genre in genres) {
    if (genres[genre] > maxNumOfViews) {
      maxNumOfViews = genres[genre];
      favoriteGenre = genre;
    }
  }
  return favoriteGenre;
};

export const getFormatedDescription = (description) => description.length > MovieDescription.MAX ? `${description.substring(MovieDescription.MIN, MovieDescription.REQUIRE)}...` : description;
export const getDurationInHours = (allDuration) => moment.duration({minutes: allDuration}).hours();
export const getDurationInMinutes = (allDuration) => moment.duration({minutes: allDuration}).minutes();
