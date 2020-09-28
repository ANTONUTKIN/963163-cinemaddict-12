import CommentListPresenter from "./comment-list.js";
import MovieCardView from "../view/movie-card.js";
import MoviePopupView from "../view/movie-popup.js";
import CommetnsLoadingView from "../view/commetns-loading.js";
import {renderElement, RenderPosition, removeElement, replace, render, remove} from "../utils/render.js";
import {UserAction, UpdateType, Mode} from "../const.js";

export default class MoviePresenter {
  constructor(moviesListContainer, changeData, changeMode, moviesModel, commentsModel, api) {
    this._moviesListContainer = moviesListContainer;
    this._changeData = changeData;
    this._changeMode = changeMode;
    this._moviesModel = moviesModel;
    this._commentsModel = commentsModel;
    this._api = api;

    this._commetnsLoadingComponent = new CommetnsLoadingView();
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
    this._renderMovieComponent();

    if (this._mode === Mode.OPENED) {
      this._replaceMoviePopup();
    }
  }

  resetView() {
    if (this._mode !== Mode.CLOSED) {
      this._closeMoviePopup();
    }
  }


  _configMoviePopup() {
    this._moviePopupComponent = new MoviePopupView(this._movie);
    this._commentsContainer = this._moviePopupComponent.getElement().querySelector(`.form-details__bottom-container`);
    this._moviePopupComponent.setAddToWatchlistHandler(this._handleWatchlistClick);
    this._moviePopupComponent.setAlreadyWatchedHandler(this._handleWatchedClick);
    this._moviePopupComponent.setAddToFavoritsHandler(this._handleFavoriteClick);
    this._moviePopupComponent.setClosePopupHandler(this._closeMoviePopup);
  }


  _replaceMoviePopup() {
    const prevMoviePopupComponent = this._moviePopupComponent;
    this._configMoviePopup();
    replace(this._moviePopupComponent, prevMoviePopupComponent);
    remove(prevMoviePopupComponent);
    this._renderComments();
  }

  _renderMovieComponent() {
    const prevMovieComponent = this._movieComponent;
    this._movieComponent = new MovieCardView(this._movie);
    this._movieComponent.setShowPopupHandler(this._openMoviePopup);
    this._movieComponent.setAddToWatchlistHandler(this._handleWatchlistClick);
    this._movieComponent.setAlreadyWatchedHandler(this._handleWatchedClick);
    this._movieComponent.setAddToFavoritsHandler(this._handleFavoriteClick);

    if (prevMovieComponent === null) {
      render(this._moviesListContainer, this._movieComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this._movieComponent, prevMovieComponent);
    remove(prevMovieComponent);
  }


  destroy() {
    if (this._movieComponent) {
      remove(this._movieComponent);
    }
    if (this._moviePopupComponent) {
      remove(this._moviePopupComponent);
    }
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._closeMoviePopup();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }


  _openMoviePopup() {
    this._configMoviePopup();
    renderElement(document.body, this._moviePopupComponent, RenderPosition.BEFOREEND);
    this._loadComments().then(() => this._renderComments());

    document.addEventListener(`keydown`, this._onEscKeyDown);
    this._changeMode();
    this._mode = Mode.OPENED;
  }

  _closeMoviePopup() {
    removeElement(this._moviePopupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
    this._mode = Mode.CLOSED;
  }

  _renderComments() {
    if (this._commentListPresenter) {
      this._commentListPresenter.destroy();
      this._commentListPresenter = null;
    }
    this._commentListPresenter = new CommentListPresenter(this._commentsContainer, this._movie, this._commentsModel, this._changeData, this._api);
    this._commentListPresenter.init();
  }


  _loadComments() {
    render(this._commentsContainer, this._commetnsLoadingComponent);
    return this._api.getComments(this._movie)
    .then((comments) => {
      remove(this._commetnsLoadingComponent);
      this._commentsModel.setComments(comments);
    });
  }


  _toggleMovieProperty(propertyName) {
    const update = Object.assign(
        {},
        this._movie,
        {
          [propertyName]: !this._movie[propertyName]
        }
    );
    this._api.updateMovies(update).then((updatedMovie) => {
      this._changeData(
          UserAction.UPDATE_MOVIE,
          UpdateType.PATCH,
          Object.assign(
              {},
              updatedMovie
          )
      );
    }).catch(() => {
      this._movieComponent.shake();
    });
  }


  _handleWatchlistClick() {
    this._toggleMovieProperty(`isAddedInWachlist`);
  }

  _handleWatchedClick() {
    this._toggleMovieProperty(`isWatched`);
  }

  _handleFavoriteClick() {
    this._toggleMovieProperty(`isFavorite`);
  }
}
