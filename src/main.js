import ProfileRating from "./view/profile-rating.js";
import SortList from "./view/sort.js";
import CardBoard from "./view/card-board.js";
import NavBoard from "./view/nav-board.js";
import StatsFilter from "./view/stats-filters.js";
import Card from "./view/film-card.js";
import ShowMore from "./view/load-more-button.js";
import TopRatedContainer from "./view/top-rated.js";
import MostCommentedContainer from "./view/most-commented.js";
import CardPopup from "./view/popup-card.js";
import NoData from "./view/no-data.js";
import {generateCard} from "./mock/card.js";
import {generateFilters} from "./mock/filters.js";
import {renderElement, RenderPosition} from "./utils.js";


const CARDS_COUNT = 18;
const CARDS_IN_BLOCK_COUNT = 2;
const TASK_COUNT_PER_STEP = 5;

const films = new Array(CARDS_COUNT).fill().map(generateCard);
const filters = generateFilters(films);
const siteMainElement = document.querySelector(`.main`);
const documentBody = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);

const removeElement = (element) => {
  element.getElement().remove();
  element.removeElement();
};

const renderCard = (cardListElement, content) => {
  const filmCard = new Card(content);
  const filmPopup = new CardPopup(content);

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removeElement(filmPopup);
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  renderElement(cardListElement, filmCard.getElement(), RenderPosition.BEFOREEND);

  filmCard.getElement().addEventListener(`click`, () => {
    renderElement(documentBody, filmPopup.getElement(), RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, onEscKeyDown);
    filmPopup.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, () => {
      removeElement(filmPopup);
      document.removeEventListener(`keydown`, onEscKeyDown);
    });
  });
};


// Вставляем иконку профиля пользователя
renderElement(siteHeaderElement, new ProfileRating().getElement(), RenderPosition.BEFOREEND);

// Вставляем меню статистики, затем в него элементы фильтров
const navBoardComponent = new NavBoard();
renderElement(siteMainElement, navBoardComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(navBoardComponent.getElement(), new StatsFilter(filters).getElement(), RenderPosition.AFTERBEGIN);

// Вставляем меню сортировки
renderElement(siteMainElement, new SortList().getElement(), RenderPosition.BEFOREEND);

// Вставляем контейнер для карточек фильмов
const noFilmCardboard = new NoData();
const filmCardboard = new CardBoard();
if (films.length === 0) {
  renderElement(siteMainElement, noFilmCardboard.getElement(), RenderPosition.BEFOREEND);
} else {
  renderElement(siteMainElement, filmCardboard.getElement(), RenderPosition.BEFOREEND);
}

// Вставляем карточки фильмов
const filmCardContainer = siteMainElement.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, TASK_COUNT_PER_STEP); i++) {
  renderCard(filmCardContainer, films[i]);
}

// Вставляем кнопку Show more
if (films.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  const filmList = siteMainElement.querySelector(`.films-list`);
  const showMoreButtonComponent = new ShowMore();

  renderElement(filmList, showMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = siteMainElement.querySelector(`.films-list__show-more`);
  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((card) => renderCard(filmCardContainer, card));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= films.length) {
      removeElement(showMoreButtonComponent);
    }
  });
}

// Вставляем контейнеры Top Rated и Most commented
renderElement(filmCardboard.getElement(), new TopRatedContainer().getElement(), RenderPosition.BEFOREEND);
renderElement(filmCardboard.getElement(), new MostCommentedContainer().getElement(), RenderPosition.BEFOREEND);

// Вставляем по 2 карточки фильмов в контейнеры Top rated и Mos commented
const filmListExtra = siteMainElement.querySelectorAll(`.films-list--extra`);

filmListExtra.forEach((element) => {
  for (let i = 0; i < CARDS_IN_BLOCK_COUNT; i++) {
    renderElement(element.querySelector(`.films-list__container`), new Card(films[i]).getElement(), RenderPosition.BEFOREEND);
  }
});
