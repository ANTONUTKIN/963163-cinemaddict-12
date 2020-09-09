import CardView from "../view/film-card.js";
import CardPopupView from "../view/popup-card.js";
import {renderElement, RenderPosition, removeElement, replace} from "../utils/render.js";

export default class Card {
  constructor(cardBoardElement, documentBodyContainer) {
    this._cardBoardElement = cardBoardElement;
    this._documentBodyContainer = documentBodyContainer;
    this._cardPresenter = {};

    this._cardComponent = null;
    this._popupComponent = null;

    this._handlePopupClick = this._handlePopupClick.bind(this);
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

    if (prevCardComponent === null || prevPopupComponent === null) {
      renderElement(this._cardBoardElement, this._cardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._cardBoardElement.getElement().contains(prevCardComponent.getElement())) {
      replace(this._cardComponent, prevCardComponent);
    }

    if (this._cardBoardElement.getElement().contains(prevPopupComponent.getElement())) {
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

  _closePopupHandler() {
    removeElement(this._popupComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
