import Abstract from "./abstract.js";

const createShowMoreButtonTemplate = () => {
  return (
    `<button class="films-list__show-more">Show more</button>`
  );
};

export default class ShowMore extends Abstract {
  getTemplate() {
    return createShowMoreButtonTemplate();
  }
}

