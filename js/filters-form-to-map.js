import {getCustomLayerOnTheMap} from './map.js';

const mapFiltersForm = document.querySelector('.map__filters');

const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');
const housingFeatures = mapFiltersForm.querySelectorAll('input[id^="filter-"]');

let dataList;

function getDataFromServer (data) {
  dataList = data;
}

function resetMapFiltersForm () {
  housingType.value = 'any';
  housingPrice.value = 'any';
  housingRooms.value = 'any';
  housingGuests.value = 'any';
  housingFeatures.forEach( (item) => {
    item.checked = false;
  });
}

function switchHousingPrice (type, item) {
    switch (type) {
      case 'low' : return item.offer.price < 10000;
      case 'middle' : return item.offer.price >= 10000 && item.offer.price < 50000;
      case 'high' : return item.offer.price >= 50000;
    }
}

function switchHousingRooms (type, item) {
  switch (type) {
    case '1' : return (item.offer.rooms === 1);
    case '2' : return (item.offer.rooms === 2);
    case '3' : return (item.offer.rooms === 3);
  }
}

function switchHousingCapacity (type, item) {
  switch (type) {
    case '1' : return (item.offer.guests === 1);
    case '2' : return (item.offer.guests === 2);
    case '0' : return (item.offer.guests > 2);
  }
}

function getRenderMarkersByFilteredDataList () {
  let convertedDataList = dataList;

  if (housingType.value !== 'any') {
    convertedDataList = convertedDataList.filter( (item) => {
      if (item.offer.type === housingType.value) return true;
    });
  }
  if (housingPrice.value !== 'any') {
    convertedDataList = convertedDataList.filter( (item) => {
      if (switchHousingPrice(housingPrice.value, item)) return true;
    });
  }
  if (housingRooms.value !== 'any') {
      convertedDataList = convertedDataList.filter( (item) => {
        if (switchHousingRooms(housingRooms.value, item)) return true;
      });
    }
  if (housingGuests.value !== 'any') {
    convertedDataList = convertedDataList.filter( (item) => {
      if (switchHousingCapacity(housingGuests.value, item)) return true;
    });
  }
  housingFeatures.forEach( (checkbox) => {
    if (checkbox.checked) {
      convertedDataList = convertedDataList.filter( (item) => {
        if (item.offer.hasOwnProperty('features')) return true;
      });
      convertedDataList = convertedDataList.filter( (item) => {
        if (item.offer.features.includes(checkbox.value)) return true;
      });
    }
  });

  getCustomLayerOnTheMap(convertedDataList);
}

let debounceFn;
mapFiltersForm.addEventListener('change', (evt) => {
  clearTimeout(debounceFn);
  debounceFn = setTimeout(getRenderMarkersByFilteredDataList, 1000);

});


export {resetMapFiltersForm, getDataFromServer, getRenderMarkersByFilteredDataList};


/* if (evt.target.closest('#housing-type')) {
    const typeFilterValue = evt.target.closest('#housing-type').value;
    console.log(typeFilterValue);
  }
  if (evt.target.closest('#housing-price')) {
    const priceFilterValue = evt.target.closest('#housing-price').value;
    console.log(priceFilterValue);
  }
  if (evt.target.closest('#housing-rooms')) {
    const roomsFilterValue = evt.target.closest('#housing-rooms').value;
    console.log(roomsFilterValue);
  }
  if (evt.target.closest('#housing-guests')) {
    const guestsFilterValue = evt.target.closest('#housing-guests').value;
    console.log(guestsFilterValue);
  }
  if (evt.target.closest('input[id^="filter-"]')) {
    const featuresFilterValue = evt.target.closest('input[id^="filter-"]').value;
    const featuresFilterChecked = evt.target.closest('input[id^="filter-"]').checked;
    console.log(featuresFilterValue);
    console.log(featuresFilterChecked);
  } */
