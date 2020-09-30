import moment from 'moment';
import Chart from 'chart.js';
import ChartDataLabels from "chartjs-plugin-datalabels";
import SmartView from "./smart";
import {Period, BAR_HEIGHT} from '../const';
import {getProfileRating, getMoviesDuration, getAllGenres, getTopGenre, getDurationInHours, getDurationInMinutes} from '../utils/movie';
import {getCurrentDate} from '../utils/common';


const renderChart = (statisticCtx, movies) => {
  const allGenres = getAllGenres(movies);
  const genresNames = Object.keys(allGenres);
  const genresCount = Object.values(allGenres);

  statisticCtx.height = BAR_HEIGHT * genresNames.length;

  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,

    data: {
      labels: genresNames,
      datasets: [
        {
          data: genresCount,
          backgroundColor: `#ffe800`,
          hoverBackgroundColor: `#ffe800`,
          anchor: `start`,
        },
      ],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        },
      },
      scales: {
        yAxes: [
          {
            ticks: {
              fontColor: `#ffffff`,
              padding: 100,
              fontSize: 20,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
            barThickness: 24,
          },
        ],
        xAxes: [
          {
            ticks: {
              display: false,
              beginAtZero: true,
            },
            gridLines: {
              display: false,
              drawBorder: false,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

export default class Statistics extends SmartView {
  constructor(movies) {
    super();
    this._movies = movies;

    this._data = {
      watchedMovies: movies.filter((movie) => movie.isWatched),
      selectedPeriod: Period.ALL_TIME
    };

    this._periodChangeHandler = this._periodChangeHandler.bind(this);

    this._setInnerHandlers();
    this._setChart();
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.statistic__filters`).addEventListener(`change`, this._periodChangeHandler);
  }

  _periodChangeHandler(evt) {
    evt.preventDefault();

    const dateAWeekAgo = moment().subtract(7, `days`);
    const dateAMonthAgo = moment().subtract(1, `month`);
    const dateAYearAgo = moment().subtract(1, `years`);

    let update;
    switch (evt.target.id) {
      case Period.ALL_TIME:
        update = {
          watchedMovies: this._movies.filter((movie) => movie.isWatched),
          selectedPeriod: Period.ALL_TIME
        };
        break;
      case Period.TODAY:
        update = {
          watchedMovies: this._movies.filter((movie) => movie.isWatched && moment(movie.watchingDate).isSame(getCurrentDate(), `day`)),
          selectedPeriod: Period.TODAY
        };
        break;
      case Period.WEEK:
        update = {
          watchedMovies: this._movies.filter((movie) => movie.isWatched && moment(movie.watchingDate).isBetween(dateAWeekAgo, getCurrentDate())),
          selectedPeriod: Period.WEEK
        };
        break;
      case Period.MONTH:
        update = {
          watchedMovies: this._movies.filter((movie) => movie.isWatched && moment(movie.watchingDate).isBetween(dateAMonthAgo, getCurrentDate())),
          selectedPeriod: Period.MONTH
        };
        break;
      case Period.YEAR:
        update = {
          watchedMovies: this._movies.filter((movie) => movie.isWatched && moment(movie.watchingDate).isBetween(dateAYearAgo, getCurrentDate())),
          selectedPeriod: Period.YEAR
        };
        break;
    }
    this.updateData(update);
    this._setChart();
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

  _isChecked(period) {
    const {selectedPeriod} = this._data;
    return period === selectedPeriod ? `checked` : ``;
  }

  _createStatisticsTemplate(period) {
    const {watchedMovies} = period;
    const watchedMoviesCount = watchedMovies.length;
    const allMoviesDuration = getMoviesDuration(watchedMovies);
    const label = getProfileRating(this._movies);
    const topGenre = getTopGenre(watchedMovies);


    return `<section class="statistic">
    <p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${label}</span>
    </p>

    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" ${this._isChecked(Period.ALL_TIME)}>
      <label for="statistic-all-time" class="statistic__filters-label">All time</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today" ${this._isChecked(Period.TODAY)}>
      <label for="statistic-today" class="statistic__filters-label">Today</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week" ${this._isChecked(Period.WEEK)}>
      <label for="statistic-week" class="statistic__filters-label">Week</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month" ${this._isChecked(Period.MONTH)}>
      <label for="statistic-month" class="statistic__filters-label">Month</label>

      <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year" ${this._isChecked(Period.YEAR)}>
      <label for="statistic-year" class="statistic__filters-label">Year</label>
    </form>

    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedMoviesCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${getDurationInHours(allMoviesDuration)}<span class="statistic__item-description">h</span> ${getDurationInMinutes(allMoviesDuration)} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>

    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>

  </section>`;
  }

  getTemplate() {
    return this._createStatisticsTemplate(this._data);
  }

  _setChart() {
    const statisticCtx = this.getElement().querySelector(`.statistic__chart`);
    renderChart(statisticCtx, this._data.watchedMovies);
  }
}
