import MoviePresenter from "./movie.js";
import SortView from "../view/sort.js";
import NavBoard from "../view/nav-board.js";
import CardBoard from "../view/card-board.js";
import NoData from "../view/no-data.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import LoadingView from '../view/loading';
import {RenderPosition, remove, render} from "../utils/render.js";
import {sortRating, sortDate} from "../utils/sort.js";
import {MOVIES_COUNT_PER_STEP, SortType, UpdateType, UserAction} from "../const.js";
import {filter} from "../utils/filter.js";

export default class MovieList {
  constructor(boardContainer, moviesModel, filterModel, commentsModel, api) {
    this._boardContainer = boardContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._api = api;
    this._currentSortType = SortType.DEFAULT;
    this._moviePresenter = {};
    this._renderedMoviesCount = MOVIES_COUNT_PER_STEP;
    this._isLoading = true;

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._navBoardComponent = new NavBoard();
    this._cardBoardComponent = new CardBoard();
    this._noMoviesComponent = new NoData();
    this._loadingComponent = new LoadingView();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);
    this._handleModeChange = this._handleModeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderMoviesList();
  }

  _renderMoviesList() {
    if (this._isLoading) {
      this._renderLoading();
      return;
    }

    const movies = this._getMovies();

    if (movies.length === 0) {
      render(this._boardContainer, this._noMoviesComponent, RenderPosition.BEFOREEND);
      return;
    }


    this._renderSortMenu();

    this._cardBoardComponent = new CardBoard();
    render(this._boardContainer, this._cardBoardComponent, RenderPosition.BEFOREEND);


    this._renderMovies(movies.slice(0, this._renderedMoviesCount));


    if (movies.length > this._renderedMoviesCount) {
      this._renderLoadMoreButton();
    }
  }


  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }
    const moviesListContainer = this._boardContainer.querySelector(`.films-list`);
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setLoadMoreButtonClickHandler(this._handleLoadMoreButtonClick);
    render(moviesListContainer, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
  }

  _handleLoadMoreButtonClick() {
    const movies = this._getMovies();

    const newRenderedMoviesCount = Math.min(movies.length, this._renderedMoviesCount + MOVIES_COUNT_PER_STEP);

    this._renderMovies(movies.slice(this._renderedMoviesCount, newRenderedMoviesCount));

    this._renderedMoviesCount = newRenderedMoviesCount;

    if (this._renderedMoviesCount >= movies.length) {
      remove(this._loadMoreButtonComponent);
    }

  }

  _renderSortMenu() {
    if (this._sortComponent !== null) {
      this._sortComponent = null;
    }
    this._sortComponent = new SortView(this._currentSortType);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    render(this._boardContainer.querySelector(`.main-navigation`), this._sortComponent, RenderPosition.AFTER);
  }

  _clearSortMenu() {
    remove(this._sortComponent);
  }

  _getMovies() {
    const filterType = this._filterModel.getFilter();
    const movies = this._moviesModel.getMovies();
    const filteredMovies = filter[filterType](movies);

    switch (this._currentSortType) {
      case SortType.DATE_SORT:
        return filteredMovies.sort(sortDate);
      case SortType.RATING_SORT:
        return filteredMovies.sort(sortRating);
    }

    return filteredMovies;
  }

  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
      case UserAction.DELETE_COMMENT:
      case UserAction.ADD_COMMENT:
        this._moviesModel.updateMovie(updateType, update);
        break;
    }
  }

  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        this._moviePresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearMoviesList();
        this._renderMoviesList();
        break;
      case UpdateType.MAJOR:
        this._clearMoviesList({resetRenderedMoviesCount: true, resetSortType: true});
        this._renderMoviesList();

        break;
      case UpdateType.SUPREME:
        this.destroy();
        break;
      case UpdateType.INIT:
        this._isLoading = false;
        remove(this._loadingComponent);
        this._renderMoviesList();
        break;
    }
  }

  destroy() {
    this._clearMoviesList({resetRenderedMoviesCount: true, resetSortType: true});
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;

    this._clearSortMenu();
    this._clearMoviesList({resetRenderedMoviesCount: true});

    this._renderMoviesList();
  }

  _handleModeChange() {
    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.resetView());
  }

  _renderMovies(movies) {
    const moviesListContainer = this._cardBoardComponent.getElement().querySelector(`.films-list__container`);
    movies.forEach((film) => this._renderMovie(film, moviesListContainer));
  }

  _renderMovie(movie, container) {
    const moviePresenter = new MoviePresenter(container, this._handleViewAction, this._handleModeChange, this._moviesModel, this._commentsModel, this._api);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  _renderLoading() {
    render(this._boardContainer, this._loadingComponent, RenderPosition.BEFOREEND);
  }


  _clearMoviesList({resetRenderedMoviesCount = false, resetSortType = false} = {}) {

    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};

    remove(this._cardBoardComponent);
    remove(this._noMoviesComponent);
    remove(this._sortComponent);
    remove(this._loadMoreButtonComponent);
    remove(this._loadingComponent);

    if (resetRenderedMoviesCount) {
      this._renderedMoviesCount = MOVIES_COUNT_PER_STEP;
    } else {
      this._renderedMoviesCount = Math.min(this._getMovies().length, this._renderedMoviesCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
