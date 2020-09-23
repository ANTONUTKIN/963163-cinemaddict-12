import ProfileRating from "../view/profile-rating.js";
import SortList from "../view/sort.js";
import NavBoard from "../view/nav-board.js";
import StatsFilter from "../view/stats-filters.js";
import CardBoard from "../view/card-board.js";
import NoData from "../view/no-data.js";
import Card from "../view/film-card.js";
import ShowMore from "../view/load-more-button.js";
import TopRatedContainer from "../view/top-rated.js";
import MostCommentedContainer from "../view/most-commented.js";
import CardPresenter from "../presenter/card.js";
import {generateFilters} from "../mock/filters.js";
import {renderElement, RenderPosition, removeElement} from "../utils/render.js";
import {sortRating, sortDate} from "../utils/sort.js";
import {SortType, UpdateType, UserAction} from "../const.js";

const CARDS_IN_BLOCK_COUNT = 2;
const TASK_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer, headerContainer, documentBodyContainer, cardsModel) {
    this._documentBodyContainer = documentBodyContainer;
    this._boardContainer = boardContainer;
    this._headerContainer = headerContainer;
    this._cardsModel = cardsModel;
    this._currentSortType = SortType.DEFAULT;
    this._cardPresenter = {};

    this._sortListComponent = null;
    this._showMoreComponent = null;

    this._profileComponent = new ProfileRating();
    this._navBoardComponent = new NavBoard();
    this._cardBoardComponent = new CardBoard();
    this._noFilmCardComponent = new NoData();
    this._topRatedComponent = new TopRatedContainer();
    this._mostViewedComponent = new MostCommentedContainer();

    this._handleViewAction = this._handleViewAction.bind(this);
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);

    this._cardsModel.addObserver(this._handleModelEvent);
  }

  // Метод инициализации модуля
  init() {
    this._renderIcon();
    this._renderStats();
    this._renderCardBoard();
    this._renderExtraContainers();
  }

  // Метод отрисовки списка карточек фильмов из модели
  _getMovies() {
    switch (this._currentSortType) {
      case SortType.DATE_SORT:
        return this._cardsModel.getMovies().slice().sort(sortDate);
      case SortType.RATING_SORT:
        return this._cardsModel.getMovies().slice().sort(sortRating);
    }
    
    return this._cardsModel.getMovies();
  }

  // Обработчик изменения отбражения
  _handleViewAction(actionType, updateType, update) {
    switch (actionType) {
      case UserAction.UPDATE_CARD_LIST:
        this._cardsModel.updateCard(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this._cardsModel.addComment(updateType, update);
        break;
      case UserAction.DELETE_COMMENT:
        this._cardsModel.deleteComment(updateType, update);
        break;
    }
  }

    // Обработчик изменения модели
  _handleModelEvent(updateType, data) {
    switch (updateType) {
      case UpdateType.PATCH:
        // - обновить часть списка (например добавить в просмотренные)
        this._cardPresenter[data.id].init(data);
        break;
      case UpdateType.MINOR:
        this._clearCardsList();
        this._renderCardBoard();
        // - обновить список (например, когда задача ушла в архив)
        break;
      case UpdateType.MAJOR:
        this._clearCardsList({resetRenderedCardsCount = true, resetSortType = true} = {});
        this._renderCardBoard();
        // - обновить всю доску (например, при переключении фильтра)
        break;
    }
  }

  // Метод рендеринга иконки профиля
  _renderIcon() {
    renderElement(this._headerContainer, this._profileComponent, RenderPosition.BEFOREEND);
  }

  // Метод рендеринга меню статистики и сортировки
  _renderStats() {
    const cardsData = this._getMovies();
    const filters = generateFilters(cardsData);
    this._statsComponent = new StatsFilter(filters);
    renderElement(this._boardContainer, this._navBoardComponent, RenderPosition.BEFOREEND);
    renderElement(this._navBoardComponent, this._statsComponent, RenderPosition.AFTERBEGIN);

    this._renderSortMenu();
  }

  // Обработчик кнопок сортировки
  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }
    this._currentSortType = sortType;
    this. _clearCardsList({resetRenderedCardsCount: true});
    this._renderCardBoard();
    console.log(this._currentSortType)
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
  _renderCardBoard() {
    const cards  = this._getMovies();
    const cardsCount = cards.length;
    if (cardsCount === 0) {
      renderElement(this._boardContainer, this._noFilmCardComponent, RenderPosition.BEFOREEND);
    } else {
      renderElement(this._boardContainer, this._cardBoardComponent, RenderPosition.BEFOREEND);
    }

    this._renderSortMenu();
    this._renderCard();
    this._renderShowMoreButton();
  }

  // Метод создания карточек фильмов
  _createCard(cardBoardElement, content) {
    this.CardPresenter = new CardPresenter(cardBoardElement, this._documentBodyContainer, this._handleViewAction);
    this.CardPresenter.init(content);
    this._cardPresenter[content.id] = this.CardPresenter;
  }

  // Метод рендеринга карточек фильмов
  _renderCard() {
    const filmCardContainer = this._boardContainer.querySelector(`.films-list__container`);
    const cardsData = this._getMovies();
    for (let i = 0; i < Math.min(cardsData.length, TASK_COUNT_PER_STEP); i++) {
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
    if (cardsData.length > TASK_COUNT_PER_STEP) {
      let renderedTaskCount = TASK_COUNT_PER_STEP;
      const filmList = this._boardContainer.querySelector(`.films-list`);
      const filmCardContainer = this._boardContainer.querySelector(`.films-list__container`);

      renderElement(filmList, this._showMoreComponent, RenderPosition.BEFOREEND);

      this._showMoreComponent.setClickHandler(() => {
        cardsData
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((card) => this._createCard(filmCardContainer, card));

        renderedTaskCount += TASK_COUNT_PER_STEP;

        if (renderedTaskCount >= cardsData.length) {
          removeElement(this._showMoreComponent);
        }
      });
    }
  }

  // Мeтод рендеринга контейнеров для Top Rated и Most Commented фильмов
  _renderExtraContainers() {
    renderElement(this._cardBoardComponent, this._topRatedComponent, RenderPosition.BEFOREEND);
    renderElement(this._cardBoardComponent, this._mostViewedComponent, RenderPosition.BEFOREEND);

    this._renderExtraCards();
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
    const cardsCount = this._getMovies().length;

    Object
      .values(this._cardPresenter)
      .forEach((presenter) => presenter.destroy());
    this._cardPresenter = {};

    removeElement(this._sortListComponent);
    removeElement(this._noFilmCardComponent);
    removeElement(this._showMoreComponent);

    if (resetRenderedCardsCount) {
      this._renderedCardsCount  = TASK_COUNT_PER_STEP;
    } else {
      this._renderedCardsCount = Math.min(cardsCount, this._renderedCardsCount);
    }

    if (resetSortType) {
      this._currentSortType = SortType.DEFAULT;
    }
  }
}
