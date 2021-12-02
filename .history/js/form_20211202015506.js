const adForm = document.querySelector('.ad-form');

const inputImageUploadAvatar = adForm.querySelector('.ad-form-header__input');
const selectTypeHome = adForm.querySelector('#type-home');
const priceHome = adForm.querySelector('#price');

function imageUploadChangeHandler () {
  const imageAvatar = adForm.querySelector('.ad-form-header__preview').querySelector('img');
  const inputFile = inputImageUploadAvatar.files[0];
  const fileUrl = URL.createObjectURL(inputFile);
  imageAvatar.setAttribute('src', `${fileUrl}`);
}

inputImageUploadAvatar.addEventListener('change', imageUploadChangeHandler);

function switchTypeHome (type) {
  switch (type) {
    case 'bungalow' : return 0;
    case 'flat' : return 1000;
    case 'hotel' : return 3000;
    case 'house' : return 5000;
    case 'palace' : return 10000;
  }
}

selectTypeHome.addEventListener('change', (evt) => {
  priceHome.setAttribute('min', `${switchTypeHome(evt.target.value)}`);
  priceHome.setAttribute('placeholder', `Минимум ${switchTypeHome(evt.target.value)}`);
});



