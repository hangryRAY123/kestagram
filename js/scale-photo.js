import { overlay, preview } from './form.js';

const smallerButton = overlay.querySelector('.scale__control--smaller');
const biggerButton = overlay.querySelector('.scale__control--bigger');
const controlValue = overlay.querySelector('.scale__control--value');

const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const DEFAULT_SCALE_STEP = 25;

const onScaleMinusClick = () => {
  const currentValue = Number.parseFloat(controlValue.value);

  if (currentValue === MIN_SCALE_VALUE) {
    return false;
  }

  if (!isNaN(currentValue)) {
    const downDifference = currentValue - DEFAULT_SCALE_STEP;
    controlValue.value = `${downDifference}%`;
    preview.style.transform = `scale(${downDifference / 100})`;
  }
};

const onScalePlusClick = () => {
  const currentValue = Number.parseFloat(controlValue.value);

  if (currentValue === MAX_SCALE_VALUE) {
    return false;
  }

  if (!isNaN(currentValue)) {
    const bigDifference = currentValue + DEFAULT_SCALE_STEP;
    controlValue.value = `${bigDifference}%`;
    preview.style.transform = `scale(${bigDifference / 100})`;
  }
};

biggerButton.addEventListener('click', onScalePlusClick);
smallerButton.addEventListener('click', onScaleMinusClick);
