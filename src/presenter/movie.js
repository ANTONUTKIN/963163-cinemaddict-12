import MovieCardView from "../view/film-card.js";
import MoviePopupView from "../view/popup-card.js";
import {renderElement, RenderPosition, removeElement, replace} from "../utils/render.js";
import {UserAction, UpdateType, Mode} from "../const.js";

export default class MoviePresenter {
  constructor(moviesListContainer, changeData, changeMode, moviesModel) {
    this._moviesListContainer = moviesListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._moviesModel = moviesModel;
    
    this._movieComponent = null;
    this._moviePopupComponent = null;
    this._commentPresenter = null;
    this._mode = Mode.CLOSED;

    this._handlePopupClick = this._handlePopupClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._handleCommentDeleteClick = this._handleCommentDeleteClick.bind(this);
  }

  init(movie) {

    this._movie = movie;

    const prevMovieComponent = this._movieComponent;
    const prevMoviePopupComponent = this._moviePopupComponent;


    this._movieComponent = new MovieCardView(this._movie);
    this._moviePopupComponent = new MoviePopupView(movie);



    this._movieComponent.setShowPopupHandler(this._handlePopupClick);
    this._moviePopupComponent.setClosePopupHandler(this._closePopupHandler);
    this._movieComponent.setAddToWatchlistHandler(this._handleWatchlistClick);
    this._movieComponent.setAlreadyWatchedHandler(this._handleWatchedClick);
    this._movieComponent.setAddToFavoritsHandler(this._handleFavoriteClick);
    this._moviePopupComponent.setAddToWatchlistHandler(this._handleWatchlistClick);
    this._moviePopupComponent.setAlreadyWatchedHandler(this._handleWatchedClick);
    this._moviePopupComponent.setAddToFavoritsHandler(this._handleFavoriteClick);
    this._moviePopupComponent.setCommentDeleteHandler(this._handleFavoriteClick);


    if (prevMovieComponent === null || prevPopupComponent === null) {
      renderElement(this._moviesListContainer, this._movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._moviesListContainer.contains(prevMovieComponent.getElement())) {
      replace(this._movieComponent, prevMovieComponent);
    }

    if (this._documentBodyContainer.contains(prevPopupComponent.getElement())) {
      replace(this._moviePopupComponent, prevPopupComponent);
    }

    removeElement(prevMovieComponent);
    removeElement(prevPopupComponent);
  }

  destroy() {
   removeElement(this._movieComponent);
    //removeElement(this._moviePopupComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removeElement(this._moviePopupComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _handlePopupClick() {
    renderElement(document.body, this._moviePopupComponent, RenderPosition.BEFOREEND);
    // document.addEventListener(`keydown`, this._onEscKeyDown);
    // this._moviePopupComponent.setClosePopupHandler(this._closePopupHandler);
    // this._moviePopupComponent.setAddToWatchlistHandler(this._handleWatchlistClick);
    // this._moviePopupComponent.setAlreadyWatchedHandler(this._handleWatchedClick);
    // this._moviePopupComponent.setAddToFavoritsHandler(this._handleCommentDeleteClick);
  }

  _handleWatchlistClick() {
    this._changeData(
      UserAction.UPDATE_CARD_LIST,
      UpdateType.MINOR,
      Object.assign(
          {},
          this._movie,
          {
            isAddedInWachlist: !this._movie.isAddedInWachlist
          }
      )
    );
  }

  _handleWatchedClick() {
    this._changeData(
      UserAction.UPDATE_CARD_LIST,
      UpdateType.MINOR,
      Object.assign(
          {},
          this._movie,
          {
            isWatched: !this._movie.isWatched
          }   
      )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
      UserAction.UPDATE_CARD_LIST,
      UpdateType.MINOR,
      Object.assign(
          {},
          this._movie,
          {
            isFavorite: !this._movie.isFavorite
          }
      )
    );
  }

  _closePopupHandler() {
    removeElement(this._moviePopupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleCommentDeleteClick(card) {
    this._changeData(
        UserAction.DELETE_COMMENT,
        UpdateType.PATCH,
        card
    );
  }
}
