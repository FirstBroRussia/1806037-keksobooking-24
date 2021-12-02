const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');

const fieldsetTagsFromAdFormElement = adForm.querySelectorAll('fieldset');
const selectTagsFromMapFiltersForm = mapFiltersForm.querySelectorAll('select');
const fieldsetTagFromMapFiltersForm = mapFiltersForm.querySelector('fieldset');

const getInactiveStateForSpecificFields = () => {
adForm.classList.add('ad-form--disabled');
fieldsetTagsFromAdFormElement.forEach( (item) => {
  item.disabled = true;
});
mapFiltersForm.classList.add('map__filters--disabled');
fieldsetTagFromMapFiltersForm.disabled = true;
selectTagsFromMapFiltersForm.forEach( (item) => {
  item.disabled = true;
});
};

const getActiveStateForSpecificFields = () => {
adForm.classList.remove('ad-form--disabled');
fieldsetTagsFromAdFormElement.forEach( (item) => {
  item.disabled = false;
});
mapFiltersForm.classList.remove('map__filters--disabled');
fieldsetTagFromMapFiltersForm.disabled = false;
selectTagsFromMapFiltersForm.forEach( (item) => {
  item.disabled = false;
});
};

export {getInactiveStateForSpecificFields, getActiveStateForSpecificFields, adForm};
