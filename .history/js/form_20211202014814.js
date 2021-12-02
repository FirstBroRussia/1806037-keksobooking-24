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
    case ''
  }
}

selectTypeHome.addEventListener('change', (evt) => {
  console.log(evt.target.value);
});

/* optionsSelectTypeHome.forEach( (item) => {
  console.log('aaa');
  item.addEventListener('click', (evt) => {
    console.log(evt.target.value);
  });
}); */
