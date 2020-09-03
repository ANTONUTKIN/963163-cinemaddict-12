export const sortRating = (cardA, cardB) => {
  return cardB.rating - cardA.rating;
};

export const sortDate = (cardA, cardB) => {
  return cardB.date - cardA.date;
}
