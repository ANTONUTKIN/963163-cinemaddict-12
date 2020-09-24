import SortView from "../view/sort.js";
import NavBoard from "../view/nav-board.js";
import CardBoard from "../view/card-board.js";
import NoData from "../view/no-data.js";
import LoadMoreButtonView from "../view/load-more-button.js";
import TopRatedContainer from "../view/top-rated.js";
import MostCommentedContainer from "../view/most-commented.js";
import MoviePresenter from "./movie.js";
import {renderElement, RenderPosition, remove} from "../utils/render.js";
import {sortRating, sortDate} from "../utils/sort.js";
import {MOVIES_COUNT_PER_STEP, SortType, UpdateType, UserAction} from "../const.js";
import {filter} from "../utils/filter.js";

export default class MovieList {
  constructor(boardContainer, moviesModel, filterModel, commentsModel) {
    this._documentBodyContainer = document.body;
    this._boardContainer = boardContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._commentsModel = commentsModel;
    this._currentSortType = SortType.DEFAULT;
    this._moviePresenter = {};
    this._renderedMoviesCount = MOVIES_COUNT_PER_STEP;

    this._sortComponent = null;
    this._loadMoreButtonComponent = null;

    this._sortComponent = new SortView();
    this._navBoardComponent = new NavBoard();
    this._cardBoardComponent = new CardBoard();
    this._noMoviesComponent = new NoData();
    this._topRatedComponent = new TopRatedContainer();
    this._mostViewedComponent = new MostCommentedContainer();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
    this._handleLoadMoreButtonClick = this._handleLoadMoreButtonClick.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  // Метод инициализации модуля
  init() {
    this._renderMoviesBoard();
    // this._renderExtraContainers();
  }


  // Метод для рендеринга доски для карточек фильмов
  _renderMoviesBoard() {
    this._renderMoviesList();
    this._renderSortMenu();
  }

  _renderMoviesList() {
    const movies = this._getMovies();

    if (movies.length === 0) {
      renderElement(this._boardContainer, this._noMoviesComponent, RenderPosition.BEFOREEND);
      return;
    }

    renderElement(this._boardContainer, this._cardBoardComponent, RenderPosition.BEFOREEND);
    this._renderMovies(movies.slice(0, MOVIES_COUNT_PER_STEP));


    if (movies.length > this._renderedMoviesCount) {
      this._renderLoadMoreButton();
    }
  }

  // Рендер кнопки допоказа фильмов
  _renderLoadMoreButton() {
    if (this._loadMoreButtonComponent !== null) {
      this._loadMoreButtonComponent = null;
    }
    const moviesListContainer = this._boardContainer.querySelector(`.films-list`);
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._loadMoreButtonComponent.setLoadMoreButtonClickHandler(this._handleLoadMoreButtonClick);
    renderElement(moviesListContainer, this._loadMoreButtonComponent, RenderPosition.BEFOREEND);
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

  // Cортировка  фильмов
  _renderSortMenu() {
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
    renderElement(this._boardContainer.querySelector(`.films`), this._sortComponent, RenderPosition.BEFORE);
  }

  _clearSortMenu() {
    remove(this._sortComponent);
  }

  // Метод отрисовки списка карточек фильмов из модели
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

  // Обработчик изменения отбражения
  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
      case UserAction.DELETE_COMMENT:
      case UserAction.ADD_COMMENT:
        this._moviesModel.updateMovie(updateType, update);
        break;
    }
    // switch (actionType) {
    //   case UserAction.UPDATE_MOVIE:
    //     this._moviesModel.updateCard(updateType, update);
    //     break;
    //   case UserAction.ADD_COMMENT:
    //     this._moviesModel.addComment(updateType, update);
    //     break;
    //   case UserAction.DELETE_COMMENT:
    //     this._moviesModel.deleteComment(updateType, update);
    //     break;
    // }
  }

  // Обработчик изменения модели
  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например добавить в просмотренные)
        this._moviePresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearMoviesList();
        this._renderMoviesBoard();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this._clearMoviesList({resetRenderedMoviesCount: true, resetSortType: true});
        this._renderMoviesBoard();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }


  // Обработчик кнопок сортировки
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;

    this._clearSortMenu();
    this._clearMoviesList({resetRenderedMoviesCount: true});

    this._renderMoviesBoard();
  }

  // Метод отрисовки карточек фильмов
  _renderMovies(movies) {
    const moviesListContainer = this._cardBoardComponent.getElement().querySelector(`.films-list__container`);
    movies.forEach((film) => this._renderMovie(film, moviesListContainer));
  }

  _renderMovie(movie, container) {
    const moviePresenter = new MoviePresenter(container, this._handleViewAction, this._handleModeChange, this._moviesModel, this._commentsModel);
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  // Метод создания карточек фильмов
  _createCard(cardBoardElement, content) {
    this.MoviePresenter = new MoviePresenter(cardBoardElement, this._documentBodyContainer, this._handleViewAction);
    this.MoviePresenter.init(content);
    this._moviePresenter[content.id] = this.MoviePresenter;
  }

  // Метод очищения списка карточек фильмов
  _clearMoviesList({resetRenderedMoviesCount = false, resetSortType = false} = {}) {
    const moviesCount = this._getMovies().length;

    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};

    remove(this._noMoviesComponent);
    remove(this._sortComponent);
    remove(this._loadMoreButtonComponent);

    if (resetRenderedMoviesCount) {
      this._renderedMoviesCount = MOVIES_COUNT_PER_STEP;
    } else {
      this._renderedMoviesCount = Math.min(moviesCount, this._renderedCardsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
