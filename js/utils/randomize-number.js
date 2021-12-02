const getRandomIntegerNumber = (min, max) => Math.floor(Math.random() * (max + 1 - min)) + min;

const getRandomFractionalNumber = (min, max, fixed) => {
  const randomNumber = Math.random() * (max + 1 - min) + min;
  if (randomNumber >= max) {
    return max;
  }
  if (fixed) return randomNumber.toFixed(fixed);
  return randomNumber;
}


export {getRandomIntegerNumber, getRandomFractionalNumber};
