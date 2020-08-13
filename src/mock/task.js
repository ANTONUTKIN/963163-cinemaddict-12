import {getRandomInteger} from "../utils.js";

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 5;
const MIN_DATE = 1920;
const MAX_DATE = 2020;
const MIN_HOURS = 0;
const MAX_HOURS = 3;
const MIN_MINUTES = 0;
const MAX_MINUTES = 59;
const MAX_RATING = 10;


const generateFilmName = () => {
  const filmName = [
    `The man with the golden arm`,
    `The great flamarion`,
    `The dance of life`,
    `Sagebrush trail`,
    `Popeye meets Sinbad`,
    `Santa Claus conquers the martians`,
    `Made forEach other`
  ];

  const randomIndex = getRandomInteger(0, filmName.length - 1);

  return filmName[randomIndex];
};

const generatePosterAdress = () => {
  const posterPhoto = [
    `the-man-with-the-golden-arm.jpg`,
    `the-great-flamarion.jpg`,
    `the-dance-of-life.jpg`,
    `sagebrush-trail.jpg`,
    `popeye-meets-sinbad.png`,
    `santa-claus-conquers-the-martians.jpg`,
    `made-for-each-other.png`
  ];

  const randomIndex = getRandomInteger(0, posterPhoto.length - 1);
  const posterAdres = 'src="./images/posters/' + posterPhoto[randomIndex] + '"';

  return posterAdres;
};

const generateDiscription = () => {
  const discriptionArr = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Fusce tristique felis at fermentum pharetra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const randomIndex = getRandomInteger(1, discriptionArr.length - 1);
  const discription = discriptionArr[randomIndex];
  return discription
};

const generateCommentsNumber = () => {
  const randomCommentIndex = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);

  return randomCommentIndex
};

const generateFilmDate = () => {
  const randomDate = getRandomInteger(MIN_DATE, MAX_DATE);

  return randomDate
};

const generateGenre = () => {
  const genres = [
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Mystery`,
  ];

  const randomIndex = getRandomInteger(1, genres.length - 1);
  const genre = genres[randomIndex];

  return genre;
};

const generateTime = () => {
  const hourIndex = getRandomInteger(MIN_HOURS, MAX_HOURS);
  const minuteIndex = getRandomInteger(MIN_MINUTES, MAX_MINUTES);
  const filmDuration = hourIndex + 'h ' + minuteIndex + 'm';

  return filmDuration
}

const generateRating = () => {
  const randomIndex = Math.random() * MAX_RATING;
  const ratingIndex = randomIndex.toFixed(1);

  return ratingIndex
}

export const generateCard = () => {
  return {
    filmName: generateFilmName(),
    poster: generatePosterAdress(),
    discription: generateDiscription(),
    comments: generateCommentsNumber(),
    date: generateFilmDate(),
    genre: generateGenre(),
    duration: generateTime(),
    rating: generateRating()
  }
};
