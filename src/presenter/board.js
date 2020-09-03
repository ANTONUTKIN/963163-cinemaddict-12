import ProfileRating from "../view/profile-rating.js";
import SortList from "../view/sort.js";
import NavBoard from "../view/nav-board.js";
import StatsFilter from "../view/stats-filters.js";
import CardBoard from "../view/card-board.js";
import NoData from "../view/no-data.js";
import Card from "../view/film-card.js";
import CardPopup from "../view/popup-card.js";
import ShowMore from "../view/load-more-button.js";
import TopRatedContainer from "../view/top-rated.js";
import MostCommentedContainer from "../view/most-commented.js";
import {generateFilters} from "../mock/filters.js";
import {generateCard} from "../mock/card.js";
import {renderElement, RenderPosition, removeElement} from "../utils/render.js";
import {sortRating, sortDate} from "../utils/sort.js";
import {SortType} from "../const.js";

const CARDS_COUNT = 21;
const CARDS_IN_BLOCK_COUNT = 2;
const TASK_COUNT_PER_STEP = 5;

export default class Board {
  constructor(boardContainer, headerContainer, documentBodyContainer) {
    this._documentBodyContainer = documentBodyContainer;
    this._boardContainer = boardContainer;
    this._headerContainer = headerContainer;
    this._currentSortType = SortType.DEFAULT;

    this._cardsArray = new Array(CARDS_COUNT).fill().map(generateCard);
    this._profileComponent = new ProfileRating();
    this._sortListComponent = new SortList();
    this._navBoardComponent = new NavBoard();
    this._cardBoardComponent = new CardBoard();
    this._noFilmCardComponent = new NoData();
    this._showMoreComponent = new ShowMore();
    this._topRatedComponent = new TopRatedContainer();
    this._mostViewedComponent = new MostCommentedContainer();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  // Метод инициализации модуля
  init() {
    this._cardsArrayInit = this._cardsArray.slice();
    this._renderIcon();
    this._renderStats();
    this._renderCardBoard();
    this._renderExtraContainers();

  }

  // Метод рендеринга иконки профиля
  _renderIcon() {
    renderElement(this._headerContainer, this._profileComponent, RenderPosition.BEFOREEND);
  }

  // Метод рендеринга меню статистики и сортировки
  _renderStats() {
    const filters = generateFilters(this._cardsArray);
    this._statsComponent = new StatsFilter(filters);
    renderElement(this._boardContainer, this._navBoardComponent, RenderPosition.BEFOREEND);
    renderElement(this._navBoardComponent, this._statsComponent, RenderPosition.AFTERBEGIN);

    this._renderSortMenu();
  }

  // Метод сортировки карточек по дате и рейтингу
  _sortTasks(sortType) {
    switch (sortType) {
      case SortType.DATE_SORT:
        this._cardsArray.sort(sortDate);
        break;
      case SortType.RATING_SORT:
        this._cardsArray.sort(sortRating);
        break;
      default:
        this._cardsArray = this._cardsArrayInit.slice();
    }

    this._currentSortType = sortType;
  }

  _handleSortTypeChange(sortType) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortTasks(sortType);
    this._boardContainer.querySelector(`.films-list__container`).innerHTML = ``;
    this._renderCard();
  }

  _renderSortMenu() {
    renderElement(this._boardContainer, this._sortListComponent, RenderPosition.BEFOREEND);
    this._sortListComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  // Метод для рендеринга доски для карточек фильмов
  _renderCardBoard() {
    if (this._cardsArray.length === 0) {
      renderElement(this._boardContainer, this._noFilmCardComponent, RenderPosition.BEFOREEND);
    } else {
      renderElement(this._boardContainer, this._cardBoardComponent, RenderPosition.BEFOREEND);
    }

    this._renderCard();
    this._renderShowMoreButton();
  }

  // Метод создания карточек фильмов
  _createCard(cardListElement, content) {
    const filmCardComponent = new Card(content);
    const filmPopupComponent = new CardPopup(content);

    const onEscKeyDown = (evt) => {
      if (evt.key === `Escape` || evt.key === `Esc`) {
        evt.preventDefault();
        removeElement(filmPopupComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      }
    };

    renderElement(cardListElement, filmCardComponent, RenderPosition.BEFOREEND);
    filmCardComponent.setShowPopupHandler(() => {
      renderElement(this._documentBodyContainer, filmPopupComponent, RenderPosition.BEFOREEND);
      document.addEventListener(`keydown`, onEscKeyDown);
      filmPopupComponent.setClosePopupHandler(() => {
        removeElement(filmPopupComponent);
        document.removeEventListener(`keydown`, onEscKeyDown);
      });
    });
  }

  // Метод рендеринга карточек фильмов
  _renderCard() {
    const filmCardContainer = this._boardContainer.querySelector(`.films-list__container`);
    for (let i = 0; i < Math.min(this._cardsArray.length, TASK_COUNT_PER_STEP); i++) {
      this._createCard(filmCardContainer, this._cardsArray[i]);
    }
  }

  // Метод рендеринга кнопки допоказа карточек
  _renderShowMoreButton() {
    if (this._cardsArray.length > TASK_COUNT_PER_STEP) {
      let renderedTaskCount = TASK_COUNT_PER_STEP;
      const filmList = this._boardContainer.querySelector(`.films-list`);
      const filmCardContainer = this._boardContainer.querySelector(`.films-list__container`);

      renderElement(filmList, this._showMoreComponent, RenderPosition.BEFOREEND);

      this._showMoreComponent.setClickHandler(() => {
        this._cardsArray
        .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
        .forEach((card) => this._createCard(filmCardContainer, card));

        renderedTaskCount += TASK_COUNT_PER_STEP;

        if (renderedTaskCount >= this._cardsArray.length) {
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
      for (let i = 0; i < CARDS_IN_BLOCK_COUNT; i++) {
        const filmCardComponent = new Card(this._cardsArray[i]);
        renderElement(element.querySelector(`.films-list__container`), filmCardComponent, RenderPosition.BEFOREEND);
      }
    });
  }
}
