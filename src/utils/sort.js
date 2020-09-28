export const sortRating = (a, b) => {
  return b.rating - a.rating;
};

export const sortDate = (a, b) => {
  return b.date.getTime() - a.date.getTime();
};
