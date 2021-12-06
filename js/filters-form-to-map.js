const mapFiltersForm = document.querySelector('.map__filters');

const housingType = mapFiltersForm.querySelector('#housing-type');
const housingPrice = mapFiltersForm.querySelector('#housing-price');
const housingRooms = mapFiltersForm.querySelector('#housing-rooms');
const housingGuests = mapFiltersForm.querySelector('#housing-guests');
const housingFeatures = mapFiltersForm.querySelectorAll('#housing-features');

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

export {resetMapFiltersForm, getDataFromServer};
