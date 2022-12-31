const getRandomInteger = (a, b) => {
  if (typeof a !== 'number') {
    throw 'Параметр "a" не является числовым значением';
  }

  if (typeof b !== 'number') {
    throw 'Параметр "b" не является числовым значением';
  }

  if (a < 0) {
    throw 'Параметр "a" не может быть отрицательным числом';
  }

  if (b < 0) {
    throw 'Параметр "b "не может быть отрицательным числом';
  }

  if (!Number.isFinite(a)) {
    throw 'Параметр "a" не является конечным значением';
  }

  if (!Number.isFinite(b)) {
    throw 'Параметр "b" не является конечным значением';
  }

  if (Math.abs(b - a) < 1) {
    throw 'Нет целых чисел в диапазоне';
  }

  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));

  if (min >= 0) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  return NaN;
};

const getRandomArrayElement = (elements) => {
  if (!Array.isArray(elements)) {
    return undefined;
  }

  if (elements.length === 0) {
    return undefined;
  }

  if (elements.length === 1) {
    return elements[0];
  }

  return elements[getRandomInteger(0, elements.length - 1)];
};

const isOutsideEvent = (evt) => evt.target.matches('section');

const isEscapeKey = (key) => key === 'Escape';

export function shuffleArray(arr) {
  const copyArray = arr.slice();
  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }
  return copyArray;
}

export {getRandomInteger, getRandomArrayElement, isOutsideEvent, isEscapeKey};
