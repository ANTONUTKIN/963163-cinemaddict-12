import {createProfileRatingTemplate} from "./view/profile-rating.js";
import {createStatsTemplate} from "./view/stats.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmContainerTemplate} from "./view/card-board.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/load-more-button.js";
import {createTopRatedContainerTemplate} from "./view/top-rated.js";
import {createMostCommentedContainerTemplate} from "./view/most-commented.js";
// import {createDetailsPopupTemplate} from "./view/details.js";
import {generateCard} from "./mock/card.js";
// import {generatePopup} from "./mock/popup.js";
import {generateFilters} from "./mock/filters.js";


const CARDS_COUNT = 18;
const CARDS_IN_BLOCK_COUNT = 2;
const TASK_COUNT_PER_STEP = 5;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const films = new Array(CARDS_COUNT).fill().map(generateCard);
const filters = generateFilters(films);

// Вставляем иконку профиля пользователя
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createProfileRatingTemplate(), `beforeend`);

// Вставляем меню статистики, затем фильтров, затем контейнера карточек фильмов
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createStatsTemplate(filters), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmContainerTemplate(), `beforeend`);


// Вставляем карточки фильмов
const filmContainer = siteMainElement.querySelector(`.films-list__container`);
for (let i = 0; i < Math.min(films.length, TASK_COUNT_PER_STEP); i++) {
  render(filmContainer, createFilmCardTemplate(films[i]), `beforeend`);
}

// Вставляем кнопку Show more
if (films.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;
  const filmList = siteMainElement.querySelector(`.films-list`);

  render(filmList, createShowMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = siteMainElement.querySelector(`.films-list__show-more`);
  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    films
    .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
    .forEach((card) => render(filmContainer, createFilmCardTemplate(card), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= films.length) {
      loadMoreButton.remove();
    }
  });
}

// Вставляем контейнеры Top Rated и Most commented
const filmElement = siteMainElement.querySelector(`.films`);
render(filmElement, createTopRatedContainerTemplate(), `beforeend`);
render(filmElement, createMostCommentedContainerTemplate(), `beforeend`);

// Вставляем по 2 карточки фильмов в контейнеры Top rated и Mos commented
const filmListExtra = siteMainElement.querySelectorAll(`.films-list--extra`);

filmListExtra.forEach((element) => {
  for (let i = 0; i < CARDS_IN_BLOCK_COUNT; i++) {
    const card = generateCard();
    render(element.querySelector(`.films-list__container`), createFilmCardTemplate(card), `beforeend`);
  }
});

// Вставляем контейнер попапа с подробныи описанием фильма
// const documentBody = document.querySelector(`body`);
// const popup = generatePopup();
// render(documentBody, createDetailsPopupTemplate(popup), `beforeend`);

