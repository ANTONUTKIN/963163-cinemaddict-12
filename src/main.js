import MovieList from "./presenter/movie-list.js";
import FilterPresenter from "./presenter/filter.js";
import UserProfilePresenter from "./presenter/user-profile.js";
import StatisticsPresenter from './presenter/statistics.js';
import MoviesModel from "./model/movies.js";
import CommentsModel from "./model/comments.js";
import FilterModel from "./model/filter.js";
import FooterStatisticsView from "./view/footer-statistics.js";
import {render} from "./utils/render.js";
import Api from "./api.js";
import {AUTHORIZATION, END_POINT, UpdateType} from "./const.js";

const api = new Api(END_POINT, AUTHORIZATION);

const mainElement = document.querySelector(`.main`);
const footerStatistics = document.querySelector(`.footer__statistics`);

const moviesModel = new MoviesModel();
const filterModel = new FilterModel();
const commentsModel = new CommentsModel();

const userProfilePresenter = new UserProfilePresenter(moviesModel);
const filterPresenter = new FilterPresenter(mainElement, filterModel, moviesModel);
const statisticsPresenter = new StatisticsPresenter(mainElement, moviesModel, filterModel);
const moviesListPresenter = new MovieList(mainElement, moviesModel, filterModel, commentsModel, api);


userProfilePresenter.init();
filterPresenter.init();
statisticsPresenter.init();
moviesListPresenter.init();

api.getMovies().then((movies) => {
  moviesModel.setMovies(UpdateType.INIT, movies);
  render(footerStatistics, new FooterStatisticsView(movies.length));
}).catch(() => {
  moviesModel.setMovies(UpdateType.INIT, []);
});
