const adForm = document.querySelector('.ad-form');

const inputImageUploadAvatar = adForm.querySelector('.ad-form-header__input');
inputImageUploadAvatar.addEventListener('change', () => {
  console.log(inputImageUploadAvatar.files);
});
