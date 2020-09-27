import Observer from "../utils/observer.js";

export default class Movies extends Observer {
  constructor() {
    super();
    this._movies = [];
  }

  setMovies(cards) {
    this._movies = cards.slice();
  }

  getMovies() {
    return this._movies;
  }

  updateMovie(updateType, update) {
    const index = this._movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update list with unexisting card`);
    }

    this._movies = [
      ...this._movies.slice(0, index),
      update,
      ...this._movies.slice(index + 1)
    ];

    this._notify(updateType, update);
  }

  static adaptToClient(card) {
    const adaptedCard = Object.assign(
        {},
        card,
        {
          isAddedInWachlist: card.watchlist,
          isFavorite: card.favorite,
          isWatched: card.already_watched,
          watchingDate: card.watching_date
        }
    );

    delete adaptedCard.watchlist;
    delete adaptedCard.favorite;
    delete adaptedCard.watching_date;

    return adaptedCard;
  }

  static adaptToServer(card) {
    const adaptedCard = Object.assign(
        {},
        card,
        {
          "watchlist": card.isAddedInWachlist,
          "favorite": card.isFavorite,
          "already_watched": card.isWatched,
          "watching_date": watchingDate
        }
    );

    delete adaptedCard.isAddedInWachlist;
    delete adaptedCard.isFavorite;
    delete adaptedCard.isWatched;
    delete adaptedCard.watchingDate;

    return adaptedCard;
  }
}
