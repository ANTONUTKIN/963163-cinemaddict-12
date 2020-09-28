export const DATA = {
  MIN_COMMENTS: 0,
  MAX_COMMENTS: 5,
  MIN_SENTENCES: 1,
  MAX_SENTENCES: 5,
  MIN_DATE: 1920,
  MAX_DATE: 2020,
  MIN_HOURS: 0,
  MAX_HOURS: 3,
  MIN_AGE: 12,
  MAX_AGE: 18,
  MIN_GENRES: 1,
  MAX_GENRES: 3,
  MIN_MINUTES: 0,
  MAX_MINUTES: 59,
  MIN_DAYS: 1,
  MAX_DAYS: 30,
  MAX_RATING: 10,
  MIN_WRITERS: 1,
  MAX_WRITERS: 3,
  MIN_ACTORS: 2
};

export const SortType = {
  DEFAULT: `default`,
  DATE_SORT: `date`,
  RATING_SORT: `rating`
};

export const UpdateType = {
  PATCH: `PATCH`,
  MINOR: `MINOR`,
  MAJOR: `MAJOR`,
  SUPREME: `SUPREME`,
  INIT: `INIT`
};

export const UserAction = {
  UPDATE_MOVIE: `UPDATE_MOVIE`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
  STATS: `stats`
};


export const Mode = {
  OPENED: `OPENED`,
  CLOSED: `CLOSED`,
};

export const MOVIES_COUNT_PER_STEP = 5;
export const CARDS_IN_BLOCK_COUNT = 2;

export const Period = {
  ALL_TIME: `statistic-all-time`,
  TODAY: `statistic-today`,
  WEEK: `statistic-week`,
  MONTH: `statistic-month`,
  YEAR: `statistic-year`
};
