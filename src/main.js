import MovieList from "./presenter/movie-list.js";
import MoviesModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import FilterPresenter from "./presenter/filter.js";
import {generateCard} from "./mock/card.js";
import UserProfileView from "./view/user-profile.js";
import {renderElement, RenderPosition} from "./utils/render.js";


const CARDS_COUNT = 25;
const cards = new Array(CARDS_COUNT).fill().map(generateCard);

const moviesModel = new MoviesModel();
moviesModel.setMovies(cards);

const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

const mainElement = document.querySelector(`.main`);
const headerElement = document.querySelector(`.header`);

const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel);
filterPresenter.init();

const moviesListPresenter = new MovieList(mainElement, moviesModel, filterModel, commentsModel);
moviesListPresenter.init();

renderElement(headerElement, new UserProfileView(), RenderPosition.BEFOREEND);
