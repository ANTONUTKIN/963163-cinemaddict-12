import Abstract from "./abstract.js";

const createStatsTemplate = (filters,  currentFilterType) => {
  const {type, count} = filters;
  return (
    `<div class="main-navigation__items">
      <a href="#all" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">All movies</a>
      <a href="#watchlist" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">Watchlist <span class="main-navigation__item-count">${count}</span></a>
      <a href="#history" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">History <span class="main-navigation__item-count">${count}</span></a>
      <a href="#favorites" class="main-navigation__item ${type === currentFilterType ? `main-navigation__item--active` : ``}">Favorites <span class="main-navigation__item-count">${count}</span></a>
    </div>`
  );
};

export default class StatsFilter extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
  }

  getTemplate() {
    return createStatsTemplate(this._filters, this._currentFilter);
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.value);
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`change`, this._filterTypeChangeHandler);
  }
}
