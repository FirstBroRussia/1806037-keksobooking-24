import {getActiveStateForSpecificFieldsBySuccessLoadDataFromServer} from '/js/inactive-state.js';
import {onEscapeKeyDown} from './utils/util.js';
import {getRenderBalloonTemplate} from '/js/render-balloon-element.js';

const mapElement = document.querySelector('#map-canvas');
const inputAddressToAdForm = document.querySelector('#address');
const mapResetButton = document.querySelector('#map-reset');

const popupBalloonShowPhotoHome = document.querySelector('.popup-modal-wrapper');
const popupBallonImage = popupBalloonShowPhotoHome.querySelector('.popup__image-big');
const closeButtonBigImage = popupBalloonShowPhotoHome.querySelector('.popup-modal-wrapper__close-btn');

// ПОЯВЛЕНИЕ КАРТЫ,ВЫЮОР НАЧАЛЬНОЙ МЕТКИ  И ОТРИСОВКА ПРОВАЙДЕРА КАРТ
const map = L.map(mapElement)
  .on('load', () => {
      getActiveStateForSpecificFieldsBySuccessLoadDataFromServer();
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

// ДОБАВЛЕНИЯ ГЛАВНОЙ МЕТКИ НА КАРТУ И ПРИДАНИЕ ЕЙ SVG, ТАКЖЕ ОТНОСИТЕЛЬНО ЕЕ ПОЛОЖЕНИЯ КООРДИНАТЫ В ФОРМУ ПИШУТСЯ

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

const mainMarker = L.marker({
  lat: 35.6895,
  lng: 139.692,
},
{
  draggable: true,
  icon: mainPinIcon,
}
);
mainMarker.addTo(map);
inputAddressToAdForm.setAttribute('value', `${mainMarker._latlng.lat.toFixed(5)}, ${mainMarker._latlng.lng.toFixed(5)}`);

// КНОПКА СБРОСА ДО НАЧАЛЬНОГО ПОЛОЖЕНИЯ КАРТЫ И ГЛАВНОЙ МЕТКИ, ТАКЖЕ ПИШЕТСЯ ЕЕ КООРДИНАТЫ В ФОРМУ ПРИ ПЕРЕМЕЩЕНИИ

mapResetButton.addEventListener('click', () => {
  mainMarker.setLatLng({
    lat: 35.6895,
    lng: 139.692,
  });
  map.setView({
    lat: 35.6895,
    lng: 139.692,
  }, 12);
inputAddressToAdForm.setAttribute('value', `${mainMarker._latlng.lat.toFixed(5)} ${mainMarker._latlng.lng.toFixed(5)}`);
map.closePopup();
});

mainMarker.on('moveend', (evt) => {
  inputAddressToAdForm.setAttribute('value', `${evt.target.getLatLng().lat.toFixed(5)} ${evt.target.getLatLng().lng.toFixed(5)}`);
});

// ТУТ НАЧАЛО ОТРИСОВОК МАРКЕРОВ, СОЗДАНИЯ СЛОЁВ ДЛЯ МЕТОК...

const defaultLayer = L.layerGroup();
const customLayer = L.layerGroup();

function createMarker (point) {
  const marker = L.marker({
    lat: point.location.lat,
    lng: point.location.lng,
  },
  {
    icon: defaultPinIcon,
  }
  );

  const balloonElement = getRenderBalloonTemplate(point);

  marker
    .addTo(defaultLayer)
    .bindPopup(balloonElement);
}


map.on('popupopen', (evt) => {
  console.log(evt.popup._latlng);
  console.log(evt);

});

map.on('popupclose', () => {
  console.log('close')
});

mapElement.addEventListener('click', (evt) => {
  evt.preventDefault();

  if (evt.target.closest('img[class="popup__photo"]')) {
    window.scrollTo(0, 0);
    const currentClickTarget = evt.target.closest('img[class="popup__photo"]');
    popupBallonImage.setAttribute('src', currentClickTarget.getAttribute('src'));
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

function renderMarkerBasedDataFromServer (data) {
  data.forEach( (item) => {
    createMarker(item);
  });
  map.addLayer(defaultLayer);
}

export {mapResetButton, renderMarkerBasedDataFromServer};
