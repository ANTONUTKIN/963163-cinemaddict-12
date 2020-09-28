import AbstractView from "./abstract.js";

export default class CommetnsLoading extends AbstractView {
  _createCommentsLoadingTemplate() {
    return `<div class="loader-wrap">
    <div class="loader"></div>
    </div>`;
  }

  getTemplate() {
    return this._createCommentsLoadingTemplate();
  }
}
