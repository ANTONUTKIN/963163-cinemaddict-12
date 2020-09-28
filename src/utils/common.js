import moment from "moment";


export const generateId = () => Math.random().toString(36).substr(2, 9);

export const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const filmReleaseDate = (dueDate) => {
  return moment(dueDate).format(`D MMMM YYYY`);
};
