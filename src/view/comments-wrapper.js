import AbstractView from "./abstract.js";

export default class CommentsSection extends AbstractView {
  constructor(comments) {
    super();
    this._comments = comments;
  }

  _createCommentsWrapper() {
    return (
      `<section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${this._comments.length}</span></h3>
          <ul class="film-details__comments-list"></ul>
        </section>`
    );
  }

  getTemplate() {
    return this._createCommentsWrapper();
  }

  getCommentsListWrapper() {
    return this.getElement().querySelector(`.film-details__comments-list`);
  }
}
