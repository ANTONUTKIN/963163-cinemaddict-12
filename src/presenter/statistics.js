import StatisticsView from '../view/statistics';
import {FilterType} from '../const';
import {render, remove, RenderPosition} from '../utils/render';


export default class Statistics {
  constructor(userStatisticsContainer, moviesModel, filterModel) {
    this._mainContainer = userStatisticsContainer;
    this._moviesModel = moviesModel;
    this._filterModel = filterModel;

    this._statistics = null;

    this._handleModelEvent = this._handleModelEvent.bind(this);

    this._moviesModel.addObserver(this._handleModelEvent);
    this._filterModel.addObserver(this._handleModelEvent);
  }

  init() {
    if (this._filterModel.getFilter() === FilterType.STATS && this._statistics === null) {
      this._renderStatistics();
    } else if (this._filterModel.getFilter() !== FilterType.STATS && this._statistics !== null) {
      remove(this._statistics);
      this._statistics = null;
    }
  }

  _renderStatistics() {
    this._statistics = new StatisticsView(this._moviesModel.getMovies());
    render(this._mainContainer, this._statistics, RenderPosition.BEFOREEND);
  }

  _handleModelEvent() {
    this.init();
  }
}
