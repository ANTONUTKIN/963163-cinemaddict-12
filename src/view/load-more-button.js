import Abstract from "./abstract.js";

const createLoadMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class LoadMoreButton extends Abstract {
  constructor() {
    super();
    this._clickHandler = this._clickHandler.bind(this);
  }

  getTemplate() {
    return createLoadMoreButtonTemplate();
  }

  _clickHandler(evt) {
    evt.preventDefault();
    this._callback.click();
  }

  setLoadMoreButtonClickHandler(callback) {
    this._callback.click = callback;
    this.getElement().addEventListener(`click`, this._clickHandler);
  }
}

