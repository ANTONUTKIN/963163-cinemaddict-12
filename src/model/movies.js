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

  updateCard(updateType, update) {
    const index = this._movies.findIndex((card) => card.id === update.id);

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
}
