import UserProfileView from "../view/user-profile";
import {render, remove} from '../utils/render';


export default class UserProfile {
  constructor(moviesModel) {
    this._moviesModel = moviesModel;
    this._headerElement = document.querySelector(`.header`);
    this._pfofile = null;
    this._handleModelEvent = this._handleModelEvent.bind(this);
    this._moviesModel.addObserver(this._handleModelEvent);
  }

  init() {
    this._renderUserProfile();
  }

  _renderUserProfile() {
    if (this._pfofile !== null) {
      remove(this._pfofile);
      this._pfofile = null;
    }
    this._pfofile = new UserProfileView(this._moviesModel.getMovies());
    render(this._headerElement, this._pfofile);
  }

  _handleModelEvent() {
    this.init();
  }
}
