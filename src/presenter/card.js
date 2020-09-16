import CardView from "../view/film-card.js";
import CardPopupView from "../view/popup-card.js";
import {renderElement, RenderPosition, removeElement, replace} from "../utils/render.js";

export default class Card {
  constructor(cardBoardElement, documentBodyContainer, changeData) {
    this._cardBoardElement = cardBoardElement;
    this._documentBodyContainer = documentBodyContainer;
    this._changeData = changeData;

    this._cardComponent = null;
    this._popupComponent = null;

    this._handlePopupClick = this._handlePopupClick.bind(this);
    this._handleWatchlistClick = this._handleWatchlistClick.bind(this);
    this._handleWatchedClick = this._handleWatchedClick.bind(this);
    this._handleFavoriteClick = this._handleFavoriteClick.bind(this);
    this._closePopupHandler = this._closePopupHandler.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(content) {
    this._content = content;

    const prevCardComponent = this._cardComponent;
    const prevPopupComponent = this._popupComponentt;

    this._cardComponent = new CardView(content);
    this._popupComponent = new CardPopupView(content);

    this._cardComponent.setShowPopupHandler(this._handlePopupClick);
    this._popupComponent.setClosePopupHandler(this._closePopupHandler);
    this._cardComponent.setAddToWatchlistHandler(this._handleWatchlistClick);
    this._cardComponent.setAlreadyWatchedHandler(this._handleWatchedClick);
    this._cardComponent.setAddToFavoritsHandler(this._handleFavoriteClick);

    if (prevCardComponent === null || prevPopupComponent === null) {
      renderElement(this._cardBoardElement, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    }
    
    if (this._cardBoardElement.contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._cardBoardElement.contains(prevPopupComponent.getElement())) {
      replace(this._prevPopupComponent, prevPopupComponent);
    }

    removeElement(prevCardComponent);
    removeElement(prevPopupComponent);
  }

  destroy() {
    removeElement(this._cardComponent);
    removeElement(this._popupComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removeElement(this._popupComponent);
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _handlePopupClick() {
    renderElement(this._documentBodyContainer, this._popupComponent, RenderPosition.BEFOREEND);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _handleWatchlistClick() {
    console.log(this)
    this._changeData(
        Object.assign(
            {},
            this._content,
            {
              isAddedInWachlist: !this._content.isAddedInWachlist
            }
        )
    );
  }

  _handleWatchedClick() {
    this._changeData(
        Object.assign(
            {},
            this._content,
            {
              isWatched: !this._content.isWatched
            }
        )
    );
  }

  _handleFavoriteClick() {
    this._changeData(
        Object.assign(
            {},
            this._content,
            {
              isFavorite: !this._content.isFavorite
            }
        )
    );
  }

  _closePopupHandler() {
    removeElement(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
