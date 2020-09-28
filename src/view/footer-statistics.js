import AbstractView from './abstract';

export default class FooterStatistics extends AbstractView {
  constructor(count) {
    super();
    this._count = count;
  }

  _createMoviesCountTemplate(count) {
    return (
      `<p>${count} movies inside</p>`
    );
  }

  getTemplate() {
    return this._createMoviesCountTemplate(this._count);
  }
}
