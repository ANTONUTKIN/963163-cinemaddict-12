import {formatMovieDuration, getReleaseDate} from "../utils/movie.js";
import SmartView from "./smart.js";

const createDetailsPopupTemplate = (movie) => {
  const {poster, ageRating, filmName, rating, director, writers, actors, date, description, genre, runtime, country, isAddedInWachlist, isWatched, isFavorite} = movie;

  const watchlistChecker = isAddedInWachlist
    ? `checked`
    : ``;

  const alreadyWatchedChecker = isWatched
    ? `checked`
    : ``;

  const toFavoriteChecker = isFavorite
    ? `checked`
    : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmName}</h3>
                  <p class="film-details__title-original">Original: ${filmName}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${getReleaseDate(date)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${formatMovieDuration(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${genre.join(`, `)}</td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistChecker}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatchedChecker}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${toFavoriteChecker}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>

        <div class="form-details__bottom-container">
        </div>
      </form>
    </section>`
  );
};

export default class MoviePopup extends SmartView {
  constructor(movie) {
    super();
    this._movie = movie;

    this._closePopupHandler = this._closePopupHandler.bind(this);

    this._toWatchlistHandler = this._toWatchlistHandler.bind(this);
    this._alreadyWatchedHandler = this._alreadyWatchedHandler.bind(this);
    this._addToFavoritsHandler = this._addToFavoritsHandler.bind(this);
    // this._setInnerHandlers();

  }

  getTemplate() {
    return createDetailsPopupTemplate(this._movie);
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

  setAddToWatchlistHandler(callback) {
    this._callback.watchlistClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watchlist`).addEventListener(`click`, this._toWatchlistHandler);
  }

  setAlreadyWatchedHandler(callback) {
    this._callback.watchedClick = callback;
    this.getElement().querySelector(`.film-details__control-label--watched`).addEventListener(`click`, this._alreadyWatchedHandler);
  }

  setAddToFavoritsHandler(callback) {
    this._callback.favoritsClick = callback;
    this.getElement().querySelector(`.film-details__control-label--favorite`).addEventListener(`click`, this._addToFavoritsHandler);
  }

  restoreHandlers() {
    // this._setInnerHandlers();
  }

  _closePopupHandler(evt) {
    evt.preventDefault();
    this._callback.popupClick();
  }
  setClosePopupHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopupHandler);
  }
}
