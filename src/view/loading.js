import AbstractView from "./abstract.js";

export default class Loading extends AbstractView {
  _createLoadingTemplate() {
    return `<section class="films">
    <section class="films-list">
      <h2 class="films-list__title">Loading...</h2>
    </section>
  </section>`;
  }

  getTemplate() {
    return this._createLoadingTemplate();
  }
}
