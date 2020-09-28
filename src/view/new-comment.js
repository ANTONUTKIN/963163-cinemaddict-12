
import SmartView from "./smart.js";

class NewComment extends SmartView {
  constructor() {
    super();
    this._currentEmoji = ``;
    this._currentMsg = ``;

    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._commentMessageChangeHandler = this._commentMessageChangeHandler.bind(this);
    this._commentSubmitHandler = this._commentSubmitHandler.bind(this);

    this._setInnerHandlers();
  }

  getTemplate() {
    const {emotion, comment = ``} = this._data;

    return `<div class="film-details__new-comment">
      <div for="add-emoji" class="film-details__add-emoji-label">
        ${emotion ? `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">` : ``}
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" autofocus>${comment}</textarea>
      </label>

      <div class="film-details__emoji-list">
      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
      <label class="film-details__emoji-label" for="emoji-smile">
          <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
      <label class="film-details__emoji-label" for="emoji-sleeping">
          <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
      <label class="film-details__emoji-label" for="emoji-puke">
          <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
      </label>

      <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
      <label class="film-details__emoji-label" for="emoji-angry">
          <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
      </label>
      </div>
  </div>`;
  }

  getComment() {
    let newComment = null;
    if (this._checkCommentReady()) {
      newComment = {
        // id: generateId(),
        author: `User`,
        date: new Date(),
        emotion: this._data.emotion,
        comment: this._data.comment
      };
    } else {
      this.shake();
    }
    return newComment;
  }

  setSubmitCommentHandler(callback) {
    this._callback.submitComment = callback;
    this.getElement().addEventListener(`keydown`, this._commentSubmitHandler);
  }

  _commentSubmitHandler(evt) {
    if (evt.ctrlKey && evt.key === `Enter`) {
      evt.preventDefault();
      this._callback.submitComment();
    }
  }

  _checkCommentReady() {
    return this._data.emotion && this._data.comment;
  }

  disableForm() {
    this.getElement().querySelector(`.film-details__comment-input`).disabled = true;
    this.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((emoji) => {
      emoji.disabled = true;
    });
  }

  enableForm() {
    this.getElement().querySelector(`.film-details__comment-input`).disabled = false;
    this.getElement().querySelectorAll(`.film-details__emoji-item`).forEach((emoji) => {
      emoji.disabled = false;
    });
  }

  _setInnerHandlers() {
    this.getElement().querySelector(`.film-details__emoji-list`).addEventListener(`change`, this._emojiClickHandler);
    this.getElement().querySelector(`.film-details__comment-input`).addEventListener(`input`, this._commentMessageChangeHandler);
    this.setSubmitCommentHandler(this._callback.submitComment);
  }

  _emojiClickHandler(evt) {
    evt.preventDefault();
    const name = evt.target.value;
    this.updateData({
      emotion: name
    });
  }

  _commentMessageChangeHandler(evt) {
    evt.preventDefault();
    this.updateData({
      comment: evt.target.value
    }, true);
  }

  restoreHandlers() {
    this._setInnerHandlers();
  }

}

export default NewComment;
