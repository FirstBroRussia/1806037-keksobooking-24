import {dataList} from './data-list.js';

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');
const mapCanvasElement = document.querySelector('#map-canvas');

const fragmentDocument = document.createDocumentFragment();

dataList.forEach( (item) => {
  const cloneCardPopupTemplate = cardTemplate.cloneNode(true);
  const cloneOfferPhotoMarkup = cardTemplate.querySelector('.popup__photo').cloneNode(true);
  const cloneOfferFeatureMarkupTemplate = cardTemplate.querySelector('.popup__feature').cloneNode(true);


  const popupOfferTitle = cloneCardPopupTemplate.querySelector('.popup__title');
  const popupOfferAddress = cloneCardPopupTemplate.querySelector('.popup__text--address');
  const popupOfferPrice = cloneCardPopupTemplate.querySelector('.popup__text--price');
  const popupOfferType = cloneCardPopupTemplate.querySelector('.popup__type');
  const popupOfferCapacity = cloneCardPopupTemplate.querySelector('.popup__text--capacity');
  const popupOfferCheckInOutTime = cloneCardPopupTemplate.querySelector('.popup__text--time');
  const popupOfferFeaturesList = cloneCardPopupTemplate.querySelector('.popup__features');
  const popupOfferDescription = cloneCardPopupTemplate.querySelector('.popup__description');
  const popupOfferPhotos = cloneCardPopupTemplate.querySelector('.popup__photos');
  const popupOfferAvatar = cloneCardPopupTemplate.querySelector('.popup__avatar');



  const getSwitchOfferType = (type) => {
    switch (type) {
      case 'flat' : return 'Квартира';
      case `bungalow` : return 'Бунгало';
      case 'house' : return 'Дом';
      case 'palace' : return 'Дворец';
      case 'hotel' : return 'Отель';
      default: return 'Ошибка в данных!';
    }
  };

  const getOfferRoomsTextContentToAppropriateMarkup = (rooms) => {
    if (rooms === 1) return `${rooms} комната`;
    return `${rooms} комнаты`;
  };

  const getOfferGuestsTextContentToAppropriateMarkup = (guests) => {
    if (guests === 1) return `${guests} гостя`;
    return `${guests} гостей`;
  };

  const getFeaturesListToMarkupPopup = (features) => {
    popupOfferFeaturesList.textContent = '';
    features.forEach( (item) => {
      const doubleCloneFeatureMarkup = cloneOfferFeatureMarkupTemplate.cloneNode(true);
      doubleCloneFeatureMarkup.setAttribute('class', `popup__feature popup__feature--${item}`);
      popupOfferFeaturesList.appendChild(doubleCloneFeatureMarkup);
    });
  };

  const getPhotosListToMarkupPopup = (photos) => {
    popupOfferPhotos.textContent = '';
    photos.forEach( (item) => {
      const doubleClonePhotoOfferMarkup = cloneOfferPhotoMarkup.cloneNode(true);
      doubleClonePhotoOfferMarkup.setAttribute('src', `${item}`);
      popupOfferPhotos.appendChild(doubleClonePhotoOfferMarkup);
    });
  };


  popupOfferAvatar.setAttribute('src', item.author.avatar);
  popupOfferTitle.textContent = item.offer.title;
  popupOfferAddress.textContent = item.offer.address;
  popupOfferPrice.textContent = `${item.offer.price} ₽/ночь`;
  popupOfferType.textContent = getSwitchOfferType(item.offer.type);
  popupOfferCapacity.textContent = `${getOfferRoomsTextContentToAppropriateMarkup(item.offer.rooms)} для ${getOfferGuestsTextContentToAppropriateMarkup(item.offer.guests)}`;
  popupOfferCheckInOutTime.textContent = `Заезд после ${item.offer.checkin}, выезд до ${item.offer.checkout}`;
  getFeaturesListToMarkupPopup(item.offer.features);
  popupOfferDescription.textContent = item.offer.description;
  getPhotosListToMarkupPopup(item.offer.photos);

  fragmentDocument.appendChild(cloneCardPopupTemplate);

});

mapCanvasElement.appendChild(fragmentDocument.children[0]);
