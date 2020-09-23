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
  MAJOR: `MAJOR`
};

export const UserAction = {
  UPDATE_CARD_LIST: `UPDATE_CARD_LIST`,
  ADD_COMMENT: `ADD_COMMENT`,
  DELETE_COMMENT: `DELETE_COMMENT`
};

export const FilterType = {
  ALL: `all`,
  WATCHLIST: `watchlist`,
  HISTORY: `history`,
  FAVORITES: `favorites`,
};


export const Mode = {
  OPENED: `OPENED`,
  CLOSED: `CLOSED`,
};