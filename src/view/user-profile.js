import {getUserRating} from "../utils/movie.js";
import AbstractView from "./abstract.js";

export default class UserProfileBlock extends AbstractView {
  constructor(movies) {
    super();
    this._movies = movies;
  }

  getTemplate() {
    const rating = getUserRating(this._movies);
    return `<section class="header__profile profile">
        <p class="profile__rating">${rating}</p>
        <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      </section>`;
  }
}
