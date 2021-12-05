const getRandomIntegerNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

const getRandomFractionalNumber = (min, max, fixed) => {
  const randomNumber = Math.random() * (max + 1 - min) + min;
  if (randomNumber >= max) {
    return max;
  }
  if (fixed) return randomNumber.toFixed(fixed);
  return randomNumber;
}

const onEscapeKeyDown = (evt) => {
  if (evt.key === 'Esc' || evt.key === 'Escape' || evt.key === 27) {
    return true;
  }
};

export {getRandomIntegerNumber, getRandomFractionalNumber, onEscapeKeyDown};
