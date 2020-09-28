import moment from "moment";
import { MovieDescription } from "../const";

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

export const getUserRating = (movies) => {
  const watchedCount = getWatchedMoviesCount(movies);
  let rating = ``;
  if (watchedCount >= 1 && watchedCount <= 10) {
    rating = `novice`;
  } else if (watchedCount <= 20) {
    rating = `fan`;
  } else {
    rating = `movie buff`;
  }
  return rating;
};


export const getFormatedDescription = (description) => description.length > MovieDescription.MAX ? `${description.substring(MovieDescription.MIN, MovieDescription.REQUIRE)}...` : description;