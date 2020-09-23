import FilterView from "../view/stats-filters.js";
import {renderElement, RenderPosition, replace, removeElement} from "../utils/render.js";
import NavBoard from "../view/nav-board.js";
import {filter} from "../utils/filter.js";
import {FilterType, UpdateType} from "../const.js";

export default class Filter {
  constructor(boardContainer, filterModel, moviesModel) {
    this._boardContainer = boardContainer;
    this._boardContainer = boardContainer;
    this._filterModel = filterModel;
    this._moviesModel = moviesModel;
    this._currentSortType = null;

    this._filterComponent = null;

    this._navBoardComponent = new NavBoard();

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
      renderElement(this._boardContainer, this._navBoardComponent, RenderPosition.BEFOREEND);
      renderElement(this._navBoardComponent, this._statsComponent, RenderPosition.AFTERBEGIN);
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
    const cards = this._moviesModel.getMovies();

    return [
      {
        type: FilterType.ALL,
        name: `All`,
        count: filter[FilterType.ALL](cards).length
      },
      {
        type: FilterType.HISTORY,
        name: `addedToWatchlist`,
        count: filter[FilterType.HISTORY](cards).length
      },
      {
        type: FilterType.WATCHLIST,
        name: `addedToWatchlist`,
        count: filter[FilterType.WATCHLIST](cards).length
      },
      {
        type: FilterType.FAVORITES,
        name: `Favorites`,
        count: filter[FilterType.FAVORITES](tasks).length
      },
    ];
  }
}