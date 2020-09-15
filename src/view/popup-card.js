import SmartView from "./smart.js";


const createDetailsPopupTemplate = (card, option) => {
  const {poster, age, filmName, rating, director, writers, actors, datePopup, duration, country, genrePopup, discriptionPopup} = card;
  const {isAddedInWachlist, isWatched, isFavorite} = option;

  const watchlistChecker = isAddedInWachlist
    ? `checked`
    : ``;

    const alreadyWatchedChecker = isWatched
    ? `checked`
    : ``;

    const toFavoriteChecker = isFavorite
    ? `checked`
    : ``;

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" ${poster} alt="">
    
              <p class="film-details__age">${age}+</p>
            </div>
    
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmName}</h3>
                  <p class="film-details__title-original">Original: ${filmName}</p>
                </div>
    
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>
    
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${datePopup}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${genrePopup}</td>                  
                </tr>
              </table>
    
              <p class="film-details__film-description">
                ${discriptionPopup}
              </p>
            </div>
          </div>
    
          <section class="film-details__controls">
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${watchlistChecker}>
            <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${alreadyWatchedChecker}>
            <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>
    
            <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${toFavoriteChecker}>
            <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
          </section>
        </div>
    
        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">4</span></h3>
    
            <ul class="film-details__comments-list">
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/smile.png" width="55" height="55" alt="emoji-smile">
                </span>
                <div>
                  <p class="film-details__comment-text">Interesting setting and a good cast</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">Tim Macoveev</span>
                    <span class="film-details__comment-day">2019/12/31 23:59</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/sleeping.png" width="55" height="55" alt="emoji-sleeping">
                </span>
                <div>
                  <p class="film-details__comment-text">Booooooooooring</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">John Doe</span>
                    <span class="film-details__comment-day">2 days ago</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/puke.png" width="55" height="55" alt="emoji-puke">
                </span>
                <div>
                  <p class="film-details__comment-text">Very very old. Meh</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">John Doe</span>
                    <span class="film-details__comment-day">2 days ago</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>
              <li class="film-details__comment">
                <span class="film-details__comment-emoji">
                  <img src="./images/emoji/angry.png" width="55" height="55" alt="emoji-angry">
                </span>
                <div>
                  <p class="film-details__comment-text">Almost two hours? Seriously?</p>
                  <p class="film-details__comment-info">
                    <span class="film-details__comment-author">John Doe</span>
                    <span class="film-details__comment-day">Today</span>
                    <button class="film-details__comment-delete">Delete</button>
                  </p>
                </div>
              </li>
            </ul>
    
            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>
    
              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
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
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class CardPopup extends SmartView {
  constructor(card) {
    super();
    this.card = card;
    this._option = {
      isAddedInWachlist: Boolean(this.card.isAddedInWachlist),
      isWatched: Boolean(this.card.isWatched),
      isFavorite: Boolean(this.card.isFavorite)
    };

    this._closePopupHandler = this._closePopupHandler.bind(this);

    this._enableAddToWatchedToggler = this._enableAddToWatchedToggler.bind(this);
    this._enableIsWatchedToggler = this._enableIsWatchedToggler.bind(this);
    this._enableIsFavoriteToggler = this._enableIsWatchedToggler.bind(this);
  }

  getTemplate() {
    return createDetailsPopupTemplate(this.card, this._option);
  }

  updateData(update) {
    if (!update) {
      return;
    }

    this._card = Object.assign(
        {},
        this._card,
        update
    );

    this.updateElement();
  }

  _enableAddToWatchedToggler() {
    const element = this.getElement();
    const addToWatchedToggleHandler = () => {
      this._option.isAddedInWachlist = !this._option.isAddedInWachlist;
      element
        .querySelector(`.film-details__control-label--watchlist`)
        .addEventListener(`click`, addToWatchedToggleHandler);
    }
    element
      .querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, addToWatchedToggleHandler);
  }

  _enableIsWatchedToggler() {
    const element = this.getElement();
    const isWatchedToggleHandler = () => {
      this._option.isWatched = !this._option.isWatched;
      element
        .querySelector(`.film-details__control-label--watched`)
        .addEventListener(`click`, isWatchedToggleHandler);
    }
    element
      .querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, isWatchedToggleHandler);
  }

  _enableIsFavoriteToggler() {
    const element = this.getElement();
    const isFavoriteToggleHandler = () => {
      this._option.isFavorite = !this._option.isFavorite;
      element
        .querySelector(`.film-details__control-label--favorite`)
        .addEventListener(`click`, isFavoriteToggleHandler);
    }
    element
      .querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, isFavoriteToggleHandler);
  }

  _closePopupHandler(evt) {
    evt.preventDefault();
    this._callback.popupClick();
  }

  setClosePopupHandler(callback) {
    this._callback.popupClick = callback;
    this.getElement().querySelector(`.film-details__close-btn`).addEventListener(`click`, this._closePopupHandler);
  }
}

