import Board from "./presenter/board.js";
import MoviesModel from "./model/movies.js";
import {generateCard} from "./mock/card.js";

const CARDS_COUNT = 25;
const cards = new Array(CARDS_COUNT).fill().map(generateCard);

const moviesModel = new MoviesModel();
moviesModel.setMovies(cards);

const siteMainElement = document.querySelector(`.main`);
const documentBody = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);

const boardPresenter = new Board(siteMainElement, siteHeaderElement, documentBody, moviesModel);

boardPresenter.init();
