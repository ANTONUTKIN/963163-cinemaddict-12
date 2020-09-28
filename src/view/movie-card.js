import {formatMovieDuration, getReleaseYear, getFormatedDescription} from '../utils/movie.js';
import SmartView from "./smart.js";

const createMovieCardTemplate = ({isAddedInWachlist, isWatched, isFavorite, filmName, rating, date, runtime, genre, poster, description, comments}) => {
  const addToWachlistClassName = isAddedInWachlist
    ? `film-card__controls-item film-card__controls-item--active`
    : `film-card__controls-item`;

  const watchedClassName = isWatched
    ? `film-card__controls-item film-card__controls-item--active`
    : `film-card__controls-item`;

  const favoriteClassName = isFavorite
    ? `film-card__controls-item film-card__controls-item--active`
    : `film-card__controls-item`;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${filmName}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${getReleaseYear(date)}</span>
        <span class="film-card__duration">${formatMovieDuration(runtime)}</span>
        <span class="film-card__genre">${genre.join(`, `)}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${getFormatedDescription(description)}</p>
      <a class="film-card__comments">${comments.length} comments</a>
      <form class="film-card__controls">
        <button class="${addToWachlistClassName} film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="${watchedClassName} film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="${favoriteClassName} button film-card__controls-item--favorite">Mark as favorite</button>
      </form>
    </article>`
  );
};

export default class MovieCard extends SmartView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._showPopupHandler = this._showPopupHandler.bind(this);
    this._toWatchlistHandler = this._toWatchlistHandler.bind(this);
    this._alreadyWatchedHandler = this._alreadyWatchedHandler.bind(this);
    this._addToFavoritsHandler = this._addToFavoritsHandler.bind(this);
  }

  getTemplate() {
    return createMovieCardTemplate(this._movie);
  }

  _showPopupHandler(evt) {
    evt.preventDefault();
    this._callback.popupClick();
  }

  _toWatchlistHandler(evt) {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  _alreadyWatchedHandler(evt) {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  _addToFavoritsHandler(evt) {
    evt.preventDefault();
    this._callback.favoritsClick();
  }

  setShowPopupHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, this._showPopupHandler);
  }

  setAddToWatchlistHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`).addEventListener(`click`, this._toWatchlistHandler);
  }

  setAlreadyWatchedHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`).addEventListener(`click`, this._alreadyWatchedHandler);
  }

  setAddToFavoritsHandler(callback) {
    this._callback.favoritsClick = callback;
    this.getElement().querySelector(`.film-card__controls-item--favorite`).addEventListener(`click`, this._addToFavoritsHandler);
  }
}
