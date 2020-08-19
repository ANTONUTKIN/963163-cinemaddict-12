export const  generateFilters = (films) => {
  return {
    addedToWatchlist: films.filter((element) => element.isAddedInWachlist).length,
    isWatched: films.filter((element) => element.isWatched).length,    
    isFavorite: films.filter((element) => element.isFavorite).length, 
  }
};

