import Observer from "../utils/observer.js";

export default class Movies extends Observer {
  constructor() {
    super();
    this._cards = [];
  }

  setMovies(cards) {
    this._cards = cards.slice();
  }

  getMovies() {
    return this._cards;
  }

  updateCard(updateType, update) {
    const index = this._cards.findIndex((card) => card.id === update.id);

    if (index === -1) {
      throw new Error(`Can't update list with unexisting card`);
    }

    this._cards = [
      ...this._cards.slice(0, index),
      update,
      ...this._cards.slice(index + 1)
    ];

    this._notify(updateType, update);
  }
}
