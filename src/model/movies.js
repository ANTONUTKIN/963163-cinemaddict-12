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
}
