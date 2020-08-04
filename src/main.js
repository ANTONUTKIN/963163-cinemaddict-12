import {createProfileRatingTemplate} from "./view/profile-rating.js";
import {createStatsTemplate} from "./view/stats.js";
import {createSortTemplate} from "./view/sort.js";
import {createFilmContainerTemplate} from "./view/card-board.js";
import {createFilmCardTemplate} from "./view/film-card.js";
import {createShowMoreButtonTemplate} from "./view/load-more-button.js";
import {createTopRatedContainerTemplate} from "./view/top-rated.js";
import {createMostCommentedContainerTemplate} from "./view/most-commented.js";

const CARDS_COUNT = 5;
const CARDS_IN_BLOCK_COUNT = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

// Вставляем иконку профиля пользователя
const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, createProfileRatingTemplate(), `beforeend`);

// Вставляем меню статистики, затем фильтров, затем контейнера карточек фильмов
const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, createStatsTemplate(), `beforeend`);
render(siteMainElement, createSortTemplate(), `beforeend`);
render(siteMainElement, createFilmContainerTemplate(), `beforeend`);

// Вставляем карточки фильмов
const filmContainer = siteMainElement.querySelector(`.films-list__container`);
for (let i = 0; i < CARDS_COUNT; i++) {
  render(filmContainer, createFilmCardTemplate(), `beforeend`);
}

// Вставляем кнопку Show more
const filmList = siteMainElement.querySelector(`.films-list`);
render(filmList, createShowMoreButtonTemplate(), `beforeend`);

// Вставляем контейнеры Top Rated и Most commented
const filmElement = siteMainElement.querySelector(`.films`);
render(filmElement, createTopRatedContainerTemplate(), `beforeend`);
render(filmElement, createMostCommentedContainerTemplate(), `beforeend`);

// Вставляем по 2карточки фильмов в контейнеры Top rated и Mos commented
const filmListExtra = siteMainElement.querySelectorAll(`.films-list--extra`);

filmListExtra.forEach((element) => {
  for (let i = 0; i < CARDS_IN_BLOCK_COUNT; i++) {
    render(element.querySelector(`.films-list__container`), createFilmCardTemplate(), `beforeend`);
  }
});
