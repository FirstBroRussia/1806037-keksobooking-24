import {getRandomIntegerNumber} from "./utils/randomize-number.js";


const TITLE = [
  'ЯМАЙКА',
  'КОРЕЯ',
  'ПХЕНЬЯН!',
  'РОССИЯ',
  'ЯПОНИЯ',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const CHECK_IN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECK_OUT = [
  '12:00',
  '13:00',
  '14:00',
];

const DESCRIPTION = [
  'ААААА',
  'ММММММ',
  'ЫЫЫЫЫ',
  'ФФФФФ',
  'УУУУУУ',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const getPhotosList = () => Array.from({length: getRandomIntegerNumber(2, 5)}).map( () => PHOTOS[getRandomIntegerNumber(0, PHOTOS.length - 1)]);

const getFeaturesList = () => Array.from({length: getRandomIntegerNumber(1, FEATURES.length - 1)})
  .map((item, index) => FEATURES[index]);

  const getCorrectionNumbersToDataList = () => {
    const number = getRandomIntegerNumber(1,10);
    if (number < 10) return `0${number}`;
    return 10;
  }

const getDataList = () => {
  const locationLat = `35.${getRandomIntegerNumber(65000, 70000)}`;
  const locationLng = `139.${getRandomIntegerNumber(70000, 80000)}`;
  return {
  author: {
    avatar: `img/avatars/user${getCorrectionNumbersToDataList()}.png`,
  },
  location: {
    lat: locationLat,
    lng: locationLng,
  },
  offer: {
    title: `${TITLE[getRandomIntegerNumber(0, TITLE.length - 1)]}`,
    address: `${locationLat}, ${locationLng}`,
    price: getRandomIntegerNumber(100, 10000),
    type: `${TYPE[getRandomIntegerNumber(0, TYPE.length - 1)]}`,
    rooms: getRandomIntegerNumber(1, 4),
    guests: getRandomIntegerNumber(1, 4),
    checkin: `${CHECK_IN[getRandomIntegerNumber(0, CHECK_IN.length - 1)]}`,
    checkout: `${CHECK_OUT[getRandomIntegerNumber(0, CHECK_OUT.length - 1)]}`,
    features: getFeaturesList(),
    description: `${DESCRIPTION[getRandomIntegerNumber(0, DESCRIPTION.length - 1)]}`,
    photos: getPhotosList(),
  },
}
};

const dataList = Array.from({length: 10}).map(() => getDataList());

export {dataList};
