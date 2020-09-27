import MovieList from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import StatisticsPresenter from './presenter/statistics.js';
import MoviesModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import {generateCard} from "./mock/card.js";
import UserProfileView from "./view/user-profile.js";
import {renderElement, RenderPosition} from "./utils/render.js";
import Api from "./api.js";


const CARDS_COUNT = 25;
const cards = new Array(CARDS_COUNT).fill().map(generateCard);
const AUTHORIZATION = `Basic er883jdzbdw`;
const END_POINT = `https://12.ecmascript.pages.academy/cinemaddict/`;
const api = new Api(END_POINT, AUTHORIZATION);

api.getMovies().then((movies) => {
  console.log(movies);
});

const moviesModel = new MoviesModel();
moviesModel.setMovies(cards);

const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);

const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel);
const statisticsPresenter = new StatisticsPresenter(mainElement, moviesModel, filterModel);
const moviesListPresenter = new MovieList(mainElement, moviesModel, filterModel, commentsModel);


filterPresenter.init();
statisticsPresenter.init();
moviesListPresenter.init();

renderElement(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);
