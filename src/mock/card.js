import {getRandomInteger} from "../utils/common.js";
import {DATA} from "../const.js";

const generateId = () => Date.now() + parseInt(Math.random() * 10000, 10);

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
  const posterAdres = `src="./images/posters/` + posterPhoto[randomIndex] + `"`;

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
  return discription;
};

const generateCommentsNumber = () => {
  const randomCommentIndex = getRandomInteger(DATA.MIN_COMMENTS, DATA.MAX_COMMENTS);

  return randomCommentIndex;
};

const generateFilmDate = () => {
  const randomDate = getRandomInteger(DATA.MIN_DATE, DATA.MAX_DATE);

  return randomDate;
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
  const hourIndex = getRandomInteger(DATA.MIN_HOURS, DATA.MAX_HOURS);
  const minuteIndex = getRandomInteger(DATA.MIN_MINUTES, DATA.MAX_MINUTES);
  const filmDuration = hourIndex + `h ` + minuteIndex + `m`;

  return filmDuration;
};

const generateRating = () => {
  const randomIndex = Math.random() * DATA.MAX_RATING;
  const ratingIndex = randomIndex.toFixed(1);

  return ratingIndex;
};

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

const generatePopupGenre = () => {
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

const generatePopupDiscription = () => {
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

const commentsArr = [
  `Interesting setting and a good cast`,
  `Booooooooooring`,
  `Very very old. Meh`,
  `Almost two hours? Seriously?`,
];

export const generateCard = () => {
  return {
    id: generateId(),
    filmName: generateFilmName(),
    poster: generatePosterAdress(),
    discription: generateDiscription(),
    commentsCount: generateCommentsNumber(),
    date: generateFilmDate(),
    genre: generateGenre(),
    duration: generateTime(),
    rating: generateRating(),
    isAddedInWachlist: Boolean(getRandomInteger(0, 1)),
    isWatched: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1)),
    age: getRandomInteger(DATA.MIN_AGE, DATA.MAX_AGE),
    director: generateDirectorName(),
    country: generateCountry(),
    writers: generateWriters(),
    actors: generateActors(),
    datePopup: generateDate(),
    genrePopup: generatePopupGenre(),
    discriptionPopup: generatePopupDiscription(),
    comments: commentsArr,
  };
};
