import {generateId, getRandomInteger} from "../utils/common.js";

const authors = [
  `Misha Mitin`,
  `Vladmir Volich`,
  `John Doe`,
  `Kiril Ivanov`,
];

const messages = [
  `Nice one`,
  `Crazy`,
  `Very nice!`,
  `Genius`,
  `Love this one!`,
];

const generateDate = (start, end) => {
  const date = start.getTime() + Math.random() * (end.getTime() - start.getTime());
  return date;
};

const emojis = [`puke`, `angry`, `sleeping`];

const generateComment = () => {
  return {
    id: generateId(),
    author: authors[getRandomInteger(0, authors.length - 1)],
    message: messages[getRandomInteger(0, messages.length - 1)],
    date: generateDate(new Date(1900, 1, 1), new Date()),
    emoji: emojis[getRandomInteger(0, emojis.length - 1)],
  };
};

export {generateComment};
