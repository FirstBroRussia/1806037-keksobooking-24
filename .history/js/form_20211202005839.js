const adForm = document.querySelector('.ad-form');

const inputImageUploadAvatar = adForm.querySelector('.ad-form-header__drop-zone');
inputImageUploadAvatar.addEventListener('change', () => {
  console.log(HTMLInputElement.files);
});
