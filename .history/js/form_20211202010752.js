const adForm = document.querySelector('.ad-form');

const inputImageUploadAvatar = adForm.querySelector('.ad-form-header__input');
inputImageUploadAvatar.addEventListener('change', () => {
  const inputFile = inputImageUploadAvatar.files[0];
  const fileUrl = URL.createObjectURL(inputFile);
  console.log(inputFile);
  console.log(fileUrl);
});
