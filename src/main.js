import MovieList from "./presenter/movie-list.js";
import MoviesModel from "./model/movies.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {generateCard} from "./mock/card.js";
import UserProfileView from "./view/user-profile.js";
import { renderElement, RenderPosition } from "./utils/render.js";


const CARDS_COUNT = 25;
const cards = new Array(CARDS_COUNT).fill().map(generateCard);

const moviesModel = new MoviesModel();
moviesModel.setMovies(cards);

const filterModel = new FilterModel();

const mainElement = document.querySelector(`.main`);
const documentBody = document.querySelector(`body`);
const headerElement = document.querySelector(`.header`);

const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel);
filterPresenter.init();


const boardPresenter = new MovieList(mainElement, moviesModel, filterModel);
boardPresenter.init();





renderElement(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);
