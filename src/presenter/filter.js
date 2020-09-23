import FilterView from "../view/filters.js";
import {renderElement, RenderPosition, replace, removeElement} from "../utils/render.js";
import {filter} from "../utils/filter.js";
import {FilterType, UpdateType} from "../const.js";

export default class Filter {
  constructor(boardContainer, filterModel, moviesModel) {
    this._boardContainer = boardContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;
    this._currentFilter = null;

    this._filterComponent = null;  

    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleFilterTypeChange = this._handleFilterTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._currentFilter = this._filterModel.getFilter();

    const filters = this._getFilters();
    const prevFilterComponent = this._filterComponent;

    this._filterComponent = new FilterView(filters, this._currentFilter);
    this._filterComponent.setFilterTypeChangeHandler(this._handleFilterTypeChange);

    

    if (prevFilterComponent === null) {
      renderElement(this._boardContainer, this._filterComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._filterComponent, prevFilterComponent);
    removeElement(prevFilterComponent);
  }

  _handleModelEvent() {
    this.init();
  }

  _handleFilterTypeChange(filterType) {
    if (this._currentFilter === filterType) {
      return;
    }

    this._filterModel.setFilter(UpdateType.MAJOR, filterType);
  }

  _getFilters() {
    const movies = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.ALL,
        name: `All`,
        count: movies.length
      },
      {
        type: FilterType.HISTORY,
        name: `Watchlist`,
        count: filter[FilterType.HISTORY](movies).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `History`,
        count: filter[FilterType.WATCHLIST](movies).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](movies).length
      },
    ];
  }
}