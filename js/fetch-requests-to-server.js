import {mapResetButton, renderMarkerBasedDataFromServer} from '/js/map.js';
import {adForm, resetAdForm, getSuccessDataToServer, getErrorDataToServer} from '/js/form.js';
import {resetMapFiltersForm, getDataFromServer} from '/js/filters-form-to-map.js';
import {getActiveStateForSpecificFieldsByErrorLoadDataFromServer} from '/js/inactive-state.js';
import {onEscapeKeyDown} from '/js/utils/util.js';

const errorDataFromServer = document.querySelector('.error__data-from-server');

const dataFromServer = fetch('https://24.javascript.pages.academy/keksobooking/data')
  .then((response) => {
    if (response.ok) {
    return response.json();
    }

    throw new Error('Ошибка загрузки данных с сервера');
  })
  .then((data) => {
    renderMarkerBasedDataFromServer(data);
    getDataFromServer(data);
    console.log(data);

  })
  .catch((error) => {
    errorDataFromServer.classList.remove('hidden');
    errorDataFromServer.textContent = error;
    getActiveStateForSpecificFieldsByErrorLoadDataFromServer();
  });

//-----------------------------------------

function dataToServer () {
  fetch('https://24.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: new FormData(adForm),
  })
  .then((response) => {
    if (!response.ok) {
      throw response.json();
    }

    resetAdForm();
    resetMapFiltersForm();
    mapResetButton.click();
    getSuccessDataToServer();

    const successElement = document.querySelector('.success');
    document.addEventListener('click', () => {
      successElement.remove();
    });
    document.addEventListener('keydown', (evt) => {
      if (onEscapeKeyDown(evt)) {
        successElement.remove();
      }
    });
    return response.json();
  })
  .then((json) => console.log(json))
  .catch((reject) => {
    getErrorDataToServer();

    const errorElement = document.querySelector('.error');
    const errorButton = errorElement.querySelector('.error__button');

    const deleteErrorElementByClick = (evt) => {
      errorElement.remove();
      if (evt.target === errorButton) {
        document.removeEventListener('click', deleteErrorElementByClick);
        document.removeEventListener('keydown', deleteErrorElementByKeyDown);
        return;
      }
      resetAdForm();
      resetMapFiltersForm();
      mapResetButton.click();
      document.removeEventListener('click', deleteErrorElementByClick);
      document.removeEventListener('keydown', deleteErrorElementByKeyDown);
    }
    const deleteErrorElementByKeyDown = (evt) => {
      if (onEscapeKeyDown(evt)) {
        errorElement.remove();
        resetAdForm();
      resetMapFiltersForm();
      mapResetButton.click();
      document.removeEventListener('click', deleteErrorElementByClick);
      document.removeEventListener('keydown', deleteErrorElementByKeyDown);
      }
    }

    document.addEventListener('click', deleteErrorElementByClick);
    document.addEventListener('keydown', deleteErrorElementByKeyDown);
  });
}


export {dataToServer};
