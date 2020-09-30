import Abstract from "./abstract.js";


export default class Filters extends Abstract {
  constructor(filters, currentFilterType) {
    super();
    this._filters = filters;
    this._currentFilter = currentFilterType;

    this._filterTypeChangeHandler = this._filterTypeChangeHandler.bind(this);
    this._statisticsClickHandler = this._statisticsClickHandler.bind(this);
  }

  getTemplate() {
    const filterItems = this._filters.map((filter) => this._createFilterItem(filter, this._currentFilter)).join(``);

    return `<nav class="main-navigation">
        <div class="main-navigation__items">
            ${filterItems}
        </div>
        <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`;
  }

  _createFilterItem(filter, currentFilter) {
    const {name, count, type} = filter;
    const activeClass = currentFilter === type ? `main-navigation__item--active` : ``;
    return `<a href="#${name}" data-type="${type}" class="main-navigation__item ${activeClass}">${name}
            ${name !== `All` ? `<span class="main-navigation__item-count">${count || 0}</span>` : ``}
            </a>`;
  }

  _filterTypeChangeHandler(evt) {
    evt.preventDefault();
    const filterType = evt.target.dataset.type;
    if (filterType) {
      this._callback.filterTypeChange(filterType);
    }
  }

  _statisticsClickHandler(evt) {
    evt.preventDefault();
    this._callback.statisticsClick();
  }

  setFilterTypeChangeHandler(callback) {
    this._callback.filterTypeChange = callback;
    this.getElement().addEventListener(`click`, this._filterTypeChangeHandler);
  }

  setStatisticsClickHandler(callback) {
    this._callback.statisticsClick = callback;
    this.getElement().querySelector(`.main-navigation__additional`).addEventListener(`click`, this._statisticsClickHandler);
  }
}
