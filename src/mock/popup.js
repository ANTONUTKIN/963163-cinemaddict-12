import {generateCard} from "./card.js";
import {getRandomInteger} from "../utils.js";
import {DATA} from "../const.js";

const generateFilmName = () => generateCard().filmName;
const generateRating = () => generateCard().rating;
const generatePosterAdress = () => generateCard().poster;
const generateDuration = () => generateCard().duration;
const generateDirectorName = () => {
  const names = [
    `Anthony Mann`,
    `Quentin Tarantino`,
    `Steven Spielberg`,
    `Martin Scorcese`,
    `James Cameron`,
    `Cohen brothers`,
  ];

  const randomIndex = getRandomInteger(1, names.length - 1);
  const name = names[randomIndex];

  return name;
};

const generateCountry = () => {
  const countries = [
    `USA`,
    `India`,
    `UK`,
    `Russia`,
  ];

  const randomIndex = getRandomInteger(1, countries.length - 1);
  const country = countries[randomIndex];

  return country;
};

const generateDate = () => {
  const months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`
  ];
  const randomMonthsIndex = getRandomInteger(1, months.length - 1);
  const randomMonth = months[randomMonthsIndex];
  const randomDay = getRandomInteger(DATA.MIN_DAYS, DATA.MAX_DAYS);
  const randomYear = getRandomInteger(DATA.MIN_DATE, DATA.MAX_DATE);

  const renderDate = randomDay + ` ` + randomMonth + ` ` + randomYear;
  return renderDate;
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

  const newArr = [];
  const randomMember = getRandomInteger(DATA.MIN_SENTENCES, DATA.MAX_SENTENCES);
  const getRandomText = () => {
    for (let i = 0; i < randomMember; i++) {
      const randomIndex = getRandomInteger(1, discriptionArr.length - 1);
      const discription = discriptionArr[randomIndex];
      newArr.push(discription);
    }
    return newArr;
  };
  const textArr = getRandomText();
  const result = textArr.join(` `);

  return result;
};

const generateWriters = () => {
  const writersnArr = [
    `Anne Wigton`,
    `Heinz Herald`,
    `Richard Weil`,
    `Mark Twain`,
    `Dale Carnegie`,
    `Napoleon Hill`,
    `Robert Kyosaki`,
    `Jordan Belfort`,
    `John Doe`,
  ];

  const newArr = [];
  const randomMember = getRandomInteger(DATA.MIN_WRITERS, DATA.MAX_WRITERS);
  const getRandomText = () => {
    for (let i = 0; i < randomMember; i++) {
      const randomIndex = getRandomInteger(1, writersnArr.length - 1);
      const discription = writersnArr[randomIndex];
      newArr.push(discription);
    }
    return newArr;
  };
  const textArr = getRandomText();
  const result = textArr.join(`, `);

  return result;
};

const generateActors = () => {
  const actorsArr = [
    `Erich von Stroheim`,
    `Max Hero`,
    `Richard Weil`,
    `Mary Beth Hughes`,
    `Johny Depp`,
    `Keanu Reeves`,
    `Brad Pitt`,
    `Leonardo DiCaprio`,
    `Mikkie Rourk`,
    `Chuck Norris`,
    `Arkadiy Ukupnik`,
  ];

  const newArr = [];
  const randomMember = getRandomInteger(DATA.MIN_ACTORS, DATA.MAX_WRITERS);
  const getRandomText = () => {
    for (let i = 0; i < randomMember; i++) {
      const randomIndex = getRandomInteger(1, actorsArr.length - 1);
      const discription = actorsArr[randomIndex];
      newArr.push(discription);
    }
    return newArr;
  };
  const textArr = getRandomText();
  const result = textArr.join(`, `);

  return result;
};

const generateGenre = () => {
  const genreArr = [
    `Film-Noir`,
    `Musical`,
    `Western`,
    `Drama`,
    `Comedy`,
    `Cartoon`,
    `Mystery`,
  ];

  const randomNumber = getRandomInteger(DATA.MIN_GENRES, DATA.MAX_GENRES);
  const newArr = [];
  const getRandomGenre = () => {
    for (let i = 0; i < randomNumber; i++) {
      const randomIndex = getRandomInteger(1, genreArr.length - 1);
      const discription = genreArr[randomIndex];
      const renderGenre = `<span class="film-details__genre">` + discription + `</span>`;
      newArr.push(renderGenre);
    }
    return newArr;
  };

  const textArr = getRandomGenre();
  const result = textArr.join(` `);

  return result;
};

export const generatePopup = () => {
  return {
    filmName: generateFilmName(),
    rating: generateRating(),
    poster: generatePosterAdress(),
    director: generateDirectorName(),
    duration: generateDuration(),
    country: generateCountry(),
    date: generateDate(),
    description: generateDiscription(),
    writers: generateWriters(),
    actors: generateActors(),
    genre: generateGenre(),
    age: getRandomInteger(DATA.MIN_AGE, DATA.MAX_AGE),
  };
};
