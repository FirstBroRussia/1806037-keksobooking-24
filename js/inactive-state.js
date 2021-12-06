const adForm = document.querySelector('.ad-form');
const mapFiltersForm = document.querySelector('.map__filters');
// const mapFiltersContainer = mapFiltersForm.querySelector('.');

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

const getActiveStateForSpecificFieldsByErrorLoadDataFromServer = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsetTagsFromAdFormElement.forEach( (item) => {
    item.disabled = false;
  });

};

const getActiveStateForSpecificFieldsBySuccessLoadDataFromServer = () => {
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

getInactiveStateForSpecificFields();

export {getInactiveStateForSpecificFields, getActiveStateForSpecificFieldsBySuccessLoadDataFromServer, getActiveStateForSpecificFieldsByErrorLoadDataFromServer};
