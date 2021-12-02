const adForm = document.querySelector('.ad-form');

const inputImageUploadAvatar = adForm.querySelector('.ad-form-header__input');
const selectTypeHome = adForm.querySelector('#type-home');
const priceHome = adForm.querySelector('#price');
const selectTimeIn = adForm.querySelector('#timein');
const selectTimeOut = adForm.querySelector('#timeout');
const selectRoomCount = adForm.querySelector('#room_number');
const selectCapacity = adForm.querySelector('#capacity');

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
  const imageAvatar = adForm.querySelector('.ad-form-header__preview').querySelector('img');
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

selectRoomCount.addEventListener('change', (evt) => {
  const selectedValue = evt.target.value;
  console.log(selectedValue);
});

inputImageUploadAvatar.addEventListener('change', imageUploadChangeHandler);
selectTypeHome.addEventListener('change', selectTypeHomeChangeHandler);
selectTimeIn.addEventListener('change', selectTimeInChangeHandler);
selectTimeOut.addEventListener('change', selectTimeOutChangeHandler);

