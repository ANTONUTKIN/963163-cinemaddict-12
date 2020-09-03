import Abstract from "./abstract.js";

const createNavBoard = () => {
  return (
    `<nav class="main-navigation">
      <a href="#stats" class="main-navigation__additional">Stats</a>
    </nav>`
  );
};

export default class NavBoard extends Abstract {
  getTemplate() {
    return createNavBoard();
  }
}
