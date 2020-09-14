import Board from "./presenter/board.js";

const siteMainElement = document.querySelector(`.main`);
const documentBody = document.querySelector(`body`);
const siteHeaderElement = document.querySelector(`.header`);
const boardPresenter = new Board(siteMainElement, siteHeaderElement, documentBody);

boardPresenter.init();
