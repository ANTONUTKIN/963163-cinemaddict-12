import SmartView from "./smart";


const BtnTextState = {
  DELETING: `Deleting...`,
  DELETE: `Delete`
};

export default class Comment extends SmartView {
  constructor(comment) {
    super();
    this._comment = comment;

    this._deleteClickHandler = this._deleteClickHandler.bind(this);
  }

  getTemplate() {
    const {emotion, comment, author} = this._comment;
    return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-puke">
        </span>
        <div>
          <p class="film-details__comment-text">${comment}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">2 days ago</span>
            <button class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`;
  }

  setBtnDeletingState() {
    this.getElement().querySelector(`.film-details__comment-delete`).textContent = BtnTextState.DELETING;
  }

  resetBtnDeletingState() {
    this.getElement().querySelector(`.film-details__comment-delete`).textContent = BtnTextState.DELETE;
  }

  disableButton() {
    this.getElement().querySelector(`.film-details__comment-delete`).disabled = true;
  }

  enableButton() {
    this.getElement().querySelector(`.film-details__comment-delete`).disabled = false;
  }

  _deleteClickHandler(evt) {
    evt.preventDefault();
    this._callback.commentDeleteClick(this._comment.id);
  }

  setDeleteCommentClickHandler(callback) {
    this._callback.commentDeleteClick = callback;
    this.getElement().querySelector(`.film-details__comment-delete`).addEventListener(`click`, this._deleteClickHandler);
  }
}
