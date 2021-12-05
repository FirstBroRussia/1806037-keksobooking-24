import {getInactiveStateForSpecificFields, getActiveStateForSpecificFields} from '/js/inactive-state.js';
import {dataList} from './data-list.js';
import {onEscapeKeyDown} from './utils/util.js';

const mapWrap = document.querySelector('#map-canvas');
const inputAddressToAdForm = document.querySelector('#address');
const mapResetButton = document.querySelector('#map-reset');
const balloonTemplate = document.querySelector('#balloon').content.querySelector('.balloon');

const popupBalloonShowPhotoHome = document.querySelector('.popup-modal-wrapper');
const popupBallonImage = popupBalloonShowPhotoHome.querySelector('.popup__image');
const closeButtonBigImage = popupBalloonShowPhotoHome.querySelector('.popup-modal-wrapper__close-btn');

function getBalloon (item) {
  const balloonClone = balloonTemplate.cloneNode(true);

  const title = balloonClone.querySelector('.balloon__title');
  const address = balloonClone.querySelector('.balloon__lat-lng');
  const photos = balloonClone.querySelector('.balloon__photos');

  title.innerHTML = item.offer.title;
  address.innerHTML = item.offer.address;
  item.offer.photos.forEach( (item) => photos.insertAdjacentHTML('beforeend', `<a href="${item}"><img src="${item}" class="balloon__photo" width="45" height="40" alt="Фотография жилья"></a>`));

  return balloonClone;
}

const map = L.map(mapWrap)
  .on('load', () => {
    getActiveStateForSpecificFields();
  })
  .setView({
    lat: 35.6895,
    lng: 139.692,
  }, 12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconArchor: [26, 52],
});

const defaultPinIcon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconArchor: [20, 40],
});

/* const mainMarker = L.marker({
  lat: 35.6895,
  lng: 139.692,
},
{
  draggable: true,
  icon: mainPinIcon,
}
);
mainMarker.addTo(map); */

mapResetButton.addEventListener('click', () => {
  /* mainMarker.setLatLng({
    lat: 35.6895,
    lng: 139.692,
  }); */
  map.setView({
    lat: 35.6895,
    lng: 139.692,
  }, 12);
});

/* mainMarker.on('moveend', (evt) => {
  inputAddressToAdForm.setAttribute('value', `${evt.target.getLatLng().lat} ${evt.target.getLatLng().lng}`);
}); */

const newLayer = L.layerGroup().addTo(map);

function createMarker (point) {

  const marker = L.marker({
    lat: point.location.lat,
    lng: point.location.lng,
  },
  {
    icon: defaultPinIcon,
  }
  );

  marker
    .addTo(newLayer)
    .bindPopup(getBalloon(point));
}

function clearLayers (layer) {
  return layer.clearLayers();
}


dataList.forEach( (item) => {
  createMarker(item);
});

map.on('popupopen', () => {
  console.log('open');
});

map.on('popupclose', () => {
  console.log('close')
});

document.addEventListener('click', (evt) => {
  evt.preventDefault();
  if(evt.target.closest('a')) {
  const aaa = evt.target.closest('a');
  console.log(aaa.getAttribute('href'));
  popupBallonImage.setAttribute('src', aaa.getAttribute('href'));
  document.querySelector('body').classList.add('overflow-hidden');
  popupBalloonShowPhotoHome.classList.remove('hidden');
  closeButtonBigImage.addEventListener('click', closeBigImage);
  document.addEventListener('keydown', closeBigImageKeyDown);
  }
});

function closeBigImageKeyDown (evt) {
  if (onEscapeKeyDown(evt)) return closeBigImage();
}

function closeBigImage () {
  document.querySelector('body').classList.remove('overflow-hidden');
  popupBalloonShowPhotoHome.classList.add('hidden');
  popupBallonImage.setAttribute('src', '');
  closeButtonBigImage.removeEventListener('click', closeBigImage);
  document.removeEventListener('keydown', closeBigImageKeyDown);
}
