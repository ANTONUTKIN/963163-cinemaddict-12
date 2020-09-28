import Abstract from "./abstract.js";
import {SortType} from "../const.js";

export default class SortList extends Abstract {
  constructor(currentSortType) {
    super();

    this._currentSortType = currentSortType;
    this._sortTypeChangeHandler = this._sortTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return this._createSortTemplate();
  }

  _createSortTemplate() {
    return (
      `<ul class="sort">
        <li><a href="#" class="sort__button ${this._activeClassName(SortType.DEFAULT)}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
        <li><a href="#" class="sort__button ${this._activeClassName(SortType.DATE_SORT)}" data-sort-type="${SortType.DATE_SORT}">Sort by date</a></li>
        <li><a href="#" class="sort__button ${this._activeClassName(SortType.RATING_SORT)}" data-sort-type="${SortType.RATING_SORT}">Sort by rating</a></li>
      </ul>`
    );
  }

  _activeClassName(type) {
    return this._currentSortType === type ? `sort__button--active` : ``;
  }

  _sortTypeChangeHandler(evt) {
    if (evt.target.tagName !== `A`) {
      return;
    }
    evt.preventDefault();
    this._currentSortType = evt.target.dataset.sortType;
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }

  setSortTypeChangeHandler(callback) {
    this._callback.sortTypeChange = callback;
    this.getElement().addEventListener(`click`, this._sortTypeChangeHandler);
  }
}
