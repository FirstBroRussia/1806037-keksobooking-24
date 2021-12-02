const adForm = document.querySelector('.ad-form');

const inputImageUploadAvatar = adForm.querySelector('.ad-form-header__input');
const selectTypeHome = adForm.querySelector('#type-home');

function imageUploadChangeHandler () {
  const imageAvatar = adForm.querySelector('.ad-form-header__preview').querySelector('img');
  const inputFile = inputImageUploadAvatar.files[0];
  const fileUrl = URL.createObjectURL(inputFile);
  imageAvatar.setAttribute('src', `${fileUrl}`);
}

inputImageUploadAvatar.addEventListener('change', imageUploadChangeHandler);

selectTypeHome.addEventListener('change', (evt) => {
  console.log(evt);
});


