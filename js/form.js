import {dataToServer} from '/js/fetch-requests-to-server.js';
import {onEscapeKeyDown} from '/js/utils/util.js';
import {resetMapFiltersForm} from '/js/filters-form-to-map.js';
import {mapResetButton} from '/js/map.js';

const bodyElement = document.querySelector('body');
const adForm = document.querySelector('.ad-form');

const imageAvatar = adForm.querySelector('.ad-form-header__preview').querySelector('img');
const inputImageAvatar = adForm.querySelector('#avatar');
const titleAdForm = adForm.querySelector('#title');
const inputImageUploadAvatar = adForm.querySelector('.ad-form-header__input');
const inputAddressToAdForm = adForm.querySelector('#address');
const selectTypeHome = adForm.querySelector('#type');
const priceHome = adForm.querySelector('#price');
const selectTimeIn = adForm.querySelector('#timein');
const selectTimeOut = adForm.querySelector('#timeout');
const selectRoomCount = adForm.querySelector('#room_number');
const selectCapacity = adForm.querySelector('#capacity');
const optionsCapacity = selectCapacity.querySelectorAll('option');
const descriptionToAdForm = adForm.querySelector('#description');
const inputImagesPhotoHome = adForm.querySelector('#images');
const allFeaturesCheckbox = adForm.querySelectorAll('.features__checkbox');
const inputImagesUploadPhotosHome = adForm.querySelector('.ad-form__input');
const photoHomeContainer = adForm.querySelector('.ad-form__photo-container');
const photoHome = photoHomeContainer.querySelector('.ad-form__photo');

const resetButtonToAdForm = adForm.querySelector('.ad-form__reset');

const successLoadAdTemplate = document.querySelector('#success').content.querySelector('.success');
const errorLoadAdTemplate = document.querySelector('#error').content.querySelector('.error');

function switchTypeHome (type) {
  switch (type) {
    case 'bungalow' : return 0;
    case 'flat' : return 1000;
    case 'hotel' : return 3000;
    case 'house' : return 5000;
    case 'palace' : return 10000;
  }
}

function imageUploadChangeHandler () {
  const inputFile = inputImageUploadAvatar.files[0];
  const fileUrl = URL.createObjectURL(inputFile);
  imageAvatar.setAttribute('src', `${fileUrl}`);
}

function selectTypeHomeChangeHandler (evt) {
  priceHome.setAttribute('min', `${switchTypeHome(evt.target.value)}`);
  priceHome.setAttribute('placeholder', `Минимум ${switchTypeHome(evt.target.value)}`);
}

function selectTimeInChangeHandler (evt) {
  const selectedIndex = evt.target.selectedIndex;
  selectTimeOut.selectedIndex = selectedIndex;
}

function selectTimeOutChangeHandler (evt) {
  const selectedIndex = evt.target.selectedIndex;
  selectTimeIn.selectedIndex = selectedIndex;
}

function selectRoomCountChangeHandler (evt) {
  const selectedValue = evt.target.value;
  const optionsSelectCapacity = selectCapacity.options;
  for (let index = 0; index < optionsSelectCapacity.length; index++) {
    if (index + 1 > selectedValue) {
      optionsSelectCapacity[index].disabled = true;
    } else {
      optionsSelectCapacity[index].disabled = false;
    }
  }
}

function inputImagePhotoHomeChangeHandler (evt) {
  const inputFiles = inputImagesUploadPhotosHome.files;
  photoHome.classList.add('hidden');
  for (let index = 0; index < inputFiles.length; index++) {
    const createImgElement = document.createElement('img');
    createImgElement.setAttribute('src', `${URL.createObjectURL(inputFiles[index])}`);
    photoHome.append(createImgElement);
  }
}

inputImagesUploadPhotosHome.addEventListener('change', inputImagePhotoHomeChangeHandler);
selectRoomCount.addEventListener('input', selectRoomCountChangeHandler);
inputImageUploadAvatar.addEventListener('change', imageUploadChangeHandler);
selectTypeHome.addEventListener('change', selectTypeHomeChangeHandler);
selectTimeIn.addEventListener('change', selectTimeInChangeHandler);
selectTimeOut.addEventListener('change', selectTimeOutChangeHandler);

function getSuccessDataToServer () {
  const successMarkupClone = successLoadAdTemplate.cloneNode(true);
  bodyElement.append(successMarkupClone);
}

function getErrorDataToServer () {
  const errorMarkupClone = errorLoadAdTemplate.cloneNode(true);
  bodyElement.append(errorMarkupClone);
}



function resetAdForm () {
  imageAvatar.setAttribute('src', `img/muffin-grey.svg`);
  inputImageAvatar.value = '';
  titleAdForm.value = '';
  selectTypeHome.value = 'flat';
  priceHome.min = 1000;
  priceHome.placeholder = 'Минимум 1000';
  priceHome.value = '';
  selectTimeIn.value = '12:00';
  selectTimeOut.value = '12:00';
  selectRoomCount.value = 1;
  optionsCapacity.forEach( (item) => {
    if (+item.getAttribute('value') === 1) {
      item.disabled = false;
      selectCapacity.value = 1;
    } else {
      item.disabled = true;
    }
  });
  allFeaturesCheckbox.forEach((item) => {item.checked = false;});
  descriptionToAdForm.value = '';
  inputImagesPhotoHome.value = '';
}

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  dataToServer();
});

resetButtonToAdForm.addEventListener('click', () => {
  resetAdForm();
  resetMapFiltersForm();
  mapResetButton.click();
});

export {adForm, resetAdForm, getSuccessDataToServer, getErrorDataToServer};
