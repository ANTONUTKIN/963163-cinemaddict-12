import Observer from "../utils/observer.js";

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(updateType, movies) {
    this._movies = movies.slice();
    this._notify(updateType);
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update list with unexisting movie`);
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1),
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(movie) {
    const adaptedCard = Object.assign({}, movie, {
      poster: movie.film_info.poster,
      filmName: movie.film_info.title,
      description: movie.film_info.description,
      rating: movie.film_info.total_rating,
      date: new Date(movie.film_info.release.date),
      isAddedInWachlist: movie.user_details.watchlist,
      isFavorite: movie.user_details.favorite,
      isWatched: movie.user_details.already_watched,
      watchingDate: movie.user_details.watching_date,
      runtime: movie.film_info.runtime,
      genre: movie.film_info.genre,
      director: movie.film_info.director,
      writers: movie.film_info.writers,
      actors: movie.film_info.actors,
      country: movie.film_info.release.release_country,
      ageRating: movie.film_info.age_rating,
      comments: movie.comments,
    });

    return adaptedCard;
  }

  static adaptToServer(movie) {
    const adaptedCard = Object.assign({}, {
      "id": movie.id,
      "comments": movie.comments,
      "film_info": {
        "actors": movie.actors,
        "age_rating": movie.ageRating,
        "alternative_title": movie.film_info.alternative_title,
        "description": movie.description,
        "director": movie.director,
        "genre": movie.genre,
        "title": movie.filmName,
        "poster": movie.poster,
        "total_rating": movie.rating,
        "writers": movie.writers,
        "release": {
          "date": movie.date,
          "release_country": movie.country,
        },
        "runtime": movie.runtime,
      },
      "user_details": {
        "watchlist": movie.isAddedInWachlist,
        "favorite": movie.isFavorite,
        "already_watched": movie.isWatched,
        "watching_date": movie.watchingDate,
      },
    });
    return adaptedCard;
  }
}
