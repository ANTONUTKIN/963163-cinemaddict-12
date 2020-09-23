import ProfileRating from "../view/profile-rating.js";
import SortList from "../view/sort.js";
import NavBoard from "../view/nav-board.js";
import CardBoard from "../view/card-board.js";
import NoData from "../view/no-data.js";
import Card from "../view/film-card.js";
import ShowMore from "../view/load-more-button.js";
import TopRatedContainer from "../view/top-rated.js";
import MostCommentedContainer from "../view/most-commented.js";
import MoviePresenter from "./movie.js";
import {renderElement, RenderPosition, removeElement} from "../utils/render.js";
import {sortRating, sortDate} from "../utils/sort.js";
import {SortType, UpdateType, UserAction} from "../const.js";
import { filter } from "../utils/filter.js";

const CARDS_IN_BLOCK_COUNT = 2;
const MOVIES_COUNT_PER_STEP = 5;

export default class MovieList {
  constructor(boardContainer, moviesModel, filterModel) {
    this._documentBodyContainer = document.body;
    this._boardContainer = boardContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;
    this._currentSortType = SortType.DEFAULT;
    this._moviePresenter = {};

    this._sortListComponent = null;
    this._showMoreComponent = null;

    this._navBoardComponent = new NavBoard();
    this._cardBoardComponent = new CardBoard();
    this._noFilmCardComponent = new NoData();
    this._topRatedComponent = new TopRatedContainer();
    this._mostViewedComponent = new MostCommentedContainer();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  // Метод инициализации модуля
  init() {
    this._renderMovieBoard();
    //this._renderExtraContainers();
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
      case UserAction.UPDATE_CARD_LIST:
        this._moviesModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._moviesModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._moviesModel.deleteComment(updateType, update);
        break;
    }
  }

    // Обработчик изменения модели
  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например добавить в просмотренные)
        this._moviePresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearCardsList();
        this._renderMovieBoard();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this._clearCardsList({resetRenderedCardsCount: true, resetSortType: true});
        this._renderMovieBoard();
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
    this. _clearCardsList({resetRenderedCardsCount: true});
    this._renderMovieBoard();
  }

  // Метод сортировки карточек фильмов
  _renderSortMenu() {
    if (this._sortListComponent !== null) {
      this._sortListComponent = null;
    }
    this._sortListComponent = new SortList(this._currentSortType);
    this._sortListComponent.setSortTypeChangeHandler(this._handleSortTypeChange);

    renderElement(this._boardContainer, this._sortListComponent, RenderPosition.BEFOREEND);
  }

  // Метод для рендеринга доски для карточек фильмов
  _renderMovieBoard() {
    // const movies  = this._getMovies();
    // const moviesCount = movies.length;
    // if (moviesCount === 0) {
    //   renderElement(this._boardContainer, this._noFilmCardComponent, RenderPosition.BEFOREEND);
    // } else {
    //   renderElement(this._boardContainer, this._cardBoardComponent, RenderPosition.BEFOREEND);
    // }
    this._renderMoviesList();
    // this._renderSortMenu();
    // this._renderCard();
    //this._renderShowMoreButton();
  }

  _renderMoviesList() {
    renderElement(this._boardContainer, this._cardBoardComponent, RenderPosition.BEFOREEND);
    const movies = this._getMovies();
    this._renderMovies(movies.slice(0, MOVIES_COUNT_PER_STEP));
  } 

  _renderMovies(movies) {
    const moviesListContainer = this._cardBoardComponent.getElement().querySelector('.films-list__container');
    movies.forEach((film) => this._renderMovie(film, moviesListContainer));
  }


  _renderMovie(movie, container) {
    const moviePresenter = new MoviePresenter(
      container,
      this._handleViewAction,
      this._handleModeChange,      
      this._moviesModel,
      //this._commentsModel,
    );
    moviePresenter.init(movie);
    this._moviePresenter[movie.id] = moviePresenter;
  }

  // Метод создания карточек фильмов
  _createCard(cardBoardElement, content) {
    this.MoviePresenter = new MoviePresenter(cardBoardElement, this._documentBodyContainer, this._handleViewAction);
    this.MoviePresenter.init(content);
    this._moviePresenter[content.id] = this.MoviePresenter;
  }

  // Метод рендеринга карточек фильмов
  _renderCard() {
    const filmCardContainer = this._boardContainer.querySelector(`.films-list__container`);
    const cardsData = this._getMovies();
    for (let i = 0; i < Math.min(cardsData.length, MOVIES_COUNT_PER_STEP); i++) {
      this._createCard(filmCardContainer, cardsData[i]);
    }
  }

  // Метод рендеринга кнопки допоказа карточек
  _renderShowMoreButton() {
    if (this._showMoreComponent !== null) {
      this._showMoreComponent = null;
    }

    this._showMoreComponent = new ShowMore();

    const cardsData = this._getMovies();
    if (cardsData.length > MOVIES_COUNT_PER_STEP) {
      let renderedTaskCount = MOVIES_COUNT_PER_STEP;
      const filmList = this._boardContainer.querySelector(`.films-list`);
      const filmCardContainer = this._boardContainer.querySelector(`.films-list__container`);

      renderElement(filmList, this._showMoreComponent, RenderPosition.BEFOREEND);

      this._showMoreComponent.setClickHandler(() => {
        cardsData
        .slice(renderedTaskCount, renderedTaskCount + MOVIES_COUNT_PER_STEP)
        .forEach((card) => this._createCard(filmCardContainer, card));

        renderedTaskCount += MOVIES_COUNT_PER_STEP;

        if (renderedTaskCount >= cardsData.length) {
          removeElement(this._showMoreComponent);
        }
      });
    }
  }

  // Мeтод рендеринга контейнеров для Top Rated и Most Commented фильмов
  _renderExtraContainers() {
    // renderElement(this._cardBoardComponent, this._topRatedComponent, RenderPosition.BEFOREEND);
    // renderElement(this._cardBoardComponent, this._mostViewedComponent, RenderPosition.BEFOREEND);

    // this._renderExtraCards();
  }

  // Метод рендеринга карточек фильмов в Top Rated и Most Commented
  _renderExtraCards() {
    const filmListExtra = this._documentBodyContainer.querySelectorAll(`.films-list--extra`);

    filmListExtra.forEach((element) => {
      const cardsData = this._getMovies();
      for (let i = 0; i < CARDS_IN_BLOCK_COUNT; i++) {
        const filmCardComponent = new Card(cardsData[i]);
        renderElement(element.querySelector(`.films-list__container`), filmCardComponent, RenderPosition.BEFOREEND);
      }
    });
  }

  // Метод очищения списка карточек фильмов
  _clearCardsList({resetRenderedCardsCount = false, resetSortType = false} = {}) {
    const moviesCount = this._getMovies().length;

    Object
      .values(this._moviePresenter)
      .forEach((presenter) => presenter.destroy());
    this._moviePresenter = {};

    // removeElement(this._sortListComponent);
    // removeElement(this._noFilmCardComponent);
    // removeElement(this._showMoreComponent);

    if (resetRenderedCardsCount) {
      this._renderedCardsCount  = MOVIES_COUNT_PER_STEP;
    } else {
      this._renderedCardsCount = Math.min(moviesCount, this._renderedCardsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
