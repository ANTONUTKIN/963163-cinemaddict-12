import AbstractView from "./abstract.js";



export default class UserProfileBlock extends AbstractView {
    constructor(filmsCount = 10) {
      super();
      this._moviesCount = filmsCount;
    }
  
    getTemplate() {
      let rating = ``;
      if (this._moviesCount === 0) {
        rating = ``;
      } else if (this._moviesCount >= 1 && this._moviesCount <= 10) {
        rating = `novice`;
      } else if (this._moviesCount <= 20) {
        rating = `fan`;
      } else {
        rating = `movie buff`;
      }
  
      return (
        `<section class="header__profile profile">
          <p class="profile__rating">${rating}</p>
          <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
        </section>`
      );
    }
  }