import CommentListPresenter from "./comment-list.js";
import MovieCardView from "../view/film-card.js";
import MoviePopupView from "../view/movie-popup.js";
import {renderElement, RenderPosition, removeElement, replace} from "../utils/render.js";
import {UserAction, UpdateType, Mode} from "../const.js";

export default class MoviePresenter {
  constructor(moviesListContainer, changeData, changeMode, moviesModel, commentsModel) {
    this._moviesListContainer = moviesListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;

    this._movieComponent = null;
    this._moviePopupComponent = null;
    this._commentPresenter = null;
    this._mode = Mode.CLOSED;

    this._openMoviePopup = this._openMoviePopup.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._closeMoviePopup = this._closeMoviePopup.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(movie) {

    this._movie = movie;

    const prevMovieComponent = this._movieComponent;
    const prevMoviePopupComponent = this._moviePopupComponent;

    this._movieComponent = new MovieCardView(this._movie);
    this._moviePopupComponent = new MoviePopupView(movie);

    this._movieComponent.setShowPopupHandler(this._openMoviePopup);
    this._moviePopupComponent.setClosePopupHandler(this._closeMoviePopup);
    this._movieComponent.setAddToWatchlistHandler(this._handleWatchlistClick);
    this._movieComponent.setAlreadyWatchedHandler(this._handleWatchedClick);
    this._movieComponent.setAddToFavoritsHandler(this._handleFavoriteClick);
    this._moviePopupComponent.setAddToWatchlistHandler(this._handleWatchlistClick);
    this._moviePopupComponent.setAlreadyWatchedHandler(this._handleWatchedClick);
    this._moviePopupComponent.setAddToFavoritsHandler(this._handleFavoriteClick);


    if (prevMovieComponent === null || prevMoviePopupComponent === null) {
      renderElement(this._moviesListContainer, this._movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._moviesListContainer.contains(prevMovieComponent.getElement())) {
      replace(this._movieComponent, prevMovieComponent);
    }

    if (prevMoviePopupComponent !== null) {
      this._renderCommentsSection();
    }


    if (document.body.contains(prevMoviePopupComponent.getElement())) {
      replace(this._moviePopupComponent, prevMoviePopupComponent);
    }

    removeElement(prevMovieComponent);
    removeElement(prevMoviePopupComponent);
  }

  _renderCommentsSection() {
    this._commentsContainer = this._moviePopupComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._commentListPresenter = new CommentListPresenter(this._commentsContainer, this._movie, this._commentsModel, this._changeData);
    this._commentListPresenter.init();
  }

  destroy() {
    removeElement(this._movieComponent);
    removeElement(this._moviePopupComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removeElement(this._moviePopupComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _openMoviePopup() {
    this._commentsModel.setComments(this._movie.comments);
    renderElement(document.body, this._moviePopupComponent, RenderPosition.BEFOREEND);

    if (!this._commentListPresenter) {
      this._renderCommentsSection();
    }

    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._moviePopupComponent.setClosePopupHandler(this._closeMoviePopup);
    this._moviePopupComponent.setAddToWatchlistHandler(this._handleWatchlistClick);
    this._moviePopupComponent.setAlreadyWatchedHandler(this._handleWatchedClick);
  }

  _closeMoviePopup() {
    removeElement(this._moviePopupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._commentListPresenter.destroy();
    this._commentListPresenter = null;
  }

  _handleWatchlistClick() {
    this._changeData(
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
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
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
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
        UserAction.UPDATE_MOVIE,
        UpdateType.PATCH,
        Object.assign(
            {},
            this._movie,
            {
              isFavorite: !this._movie.isFavorite
            }
        )
    );
  }
}
