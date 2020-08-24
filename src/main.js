import ProfileRating from "./view/profile-rating.js";
import SortList from "./view/sort.js";
import CardBoard from "./view/card-board.js";
import NavBoard from "./view/nav-board.js";
import StatsFilter from "./view/stats-filters.js";
import Card from "./view/film-card.js";
import ShowMore from "./view/load-more-button.js";
import TopRatedContainer from "./view/top-rated.js";
import MostCommentedContainer from "./view/most-commented.js";
// import {createDetailsPopupTemplate} from "./view/details.js";
import {generateCard} from "./mock/card.js";
// import {generatePopup} from "./mock/popup.js";
import {generateFilters} from "./mock/filters.js";
import {renderElement, RenderPosition} from "./utils.js";


const CARDS_COUNT = 18;
const CARDS_IN_BLOCK_COUNT = 2;
const TASK_COUNT_PER_STEP = 5;

const films = new Array(CARDS_COUNT).fill().map(generateCard);
const filters = generateFilters(films);

// Вставляем иконку профиля пользователя
const siteHeaderElement = document.querySelector(`.header`);
renderElement(siteHeaderElement, new ProfileRating().getElement(), RenderPosition.BEFOREEND);

// Вставляем меню статистики, затем в него элементы фильтров
const siteMainElement = document.querySelector(`.main`);
const navBoardComponent = new NavBoard();
renderElement(siteMainElement, navBoardComponent.getElement(), RenderPosition.BEFOREEND);
renderElement(navBoardComponent.getElement(), new StatsFilter(filters).getElement(), RenderPosition.AFTERBEGIN);

// Вставляем меню сортировки
renderElement(siteMainElement, new SortList().getElement(), RenderPosition.BEFOREEND);

// Вставляем контейнер для карточек фильмов
const filmCardboard = new CardBoard();
renderElement(siteMainElement, filmCardboard.getElement(), RenderPosition.BEFOREEND);


// Вставляем карточки фильмов
const filmCardContainer = siteMainElement.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, TASK_COUNT_PER_STEP); i++) {
  renderElement(filmCardContainer, new Card(films[i]).getElement(), RenderPosition.BEFOREEND);
}

// Вставляем кнопку Show more
if (films.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  const filmList = siteMainElement.querySelector(`.films-list`);

  renderElement(filmList, new ShowMore().getElement(), RenderPosition.BEFOREEND);

  const loadMoreButton = siteMainElement.querySelector(`.films-list__show-more`);
  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((card) => renderElement(filmCardContainer, new Card(card).getElement(), RenderPosition.BEFOREEND));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= films.length) {
      loadMoreButton.remove();
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

// Вставляем контейнер попапа с подробныи описанием фильма
// const documentBody = document.querySelector(`body`);
// const popup = generatePopup();
// render(documentBody, createDetailsPopupTemplate(popup), `beforeend`);

