import {FilterType} from "../const";

export const filter = {
  [FilterType.ALL]: (films) => films.slice(),
  [FilterType.WATCHLIST]: (cards) => cards.filter((card) => card.isAddedInWachlist),
  [FilterType.HISTORY]: (cards) => cards.filter((card) => card.isWatched),
  [FilterType.FAVORITES]: (cards) => cards.filter((card) => card.isFavorite),
};
