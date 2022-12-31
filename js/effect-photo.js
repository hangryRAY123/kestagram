import { overlay, preview, slider } from './form.js';

const effectsList = overlay.querySelector('.effects__list');
const effectSlider = overlay.querySelector('.effect-level__slider');
const effectValue = overlay.querySelector('.effect-level__value');

const EFFECT = {
  // params:[min, max, start, step, effect, unit]

  none: {
    name: 'none',
    className: 'effects__preview--none',
  },
  chrome: {
    name: 'chrome',
    className: 'effects__preview--chrome',
    params: [0, 1, 1, 0.1, 'grayscale', ''],
  },
  sepia: {
    name: 'sepia',
    className: 'effects__preview--sepia',
    params: [0, 1, 1, 0.1, 'sepia', ''],
  },
  marvin: {
    name: 'marvin',
    className: 'effects__preview--marvin',
    params: [0, 100, 100, 1, 'invert', '%'],
  },
  phobos: {
    name: 'phobos',
    className: 'effects__preview--phobos',
    params: [0, 3, 3, 0.1, 'blur', 'px'],
  },
  heat: {
    name: 'heat',
    className: 'effects__preview--heat',
    params: [1, 3, 3, 0.1, 'brightness', ''],
  },
};

noUiSlider.create(effectSlider, {
  connect: 'lower',
  range: {
    min: 0,
    max: 1,
  },
  start: 0,
  step: 0.1,
});

const createSlider = (min, max, start, step, effect, unit) => {
  effectSlider.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  });

  effectSlider.noUiSlider.on('update', () => {
    effectValue.value = effectSlider.noUiSlider.get();
    preview.style.filter = `${effect}(${effectSlider.noUiSlider.get()}${unit})`;
  });
};

const onPhotoEffectChange = (evt) => {
  const target = evt.target;

  if (target && target.value === EFFECT.none.name) {
    preview.classList.add(EFFECT.none.className);
    preview.style.filter = '';
    slider.style.display = 'none';
  } else {
    preview.classList.remove(EFFECT.none.className);
    slider.style.display = 'block';
  }

  if (target && target.value === EFFECT.chrome.name) {
    preview.classList.add(EFFECT.chrome.className);
    createSlider(...EFFECT.chrome.params);
  } else {
    preview.classList.remove(EFFECT.chrome.className);
  }

  if (target && target.value === EFFECT.sepia.name) {
    preview.classList.add(EFFECT.sepia.className);
    createSlider(...EFFECT.sepia.params);
  } else {
    preview.classList.remove(EFFECT.sepia.className);
  }

  if (target && target.value === EFFECT.marvin.name) {
    preview.classList.add(EFFECT.marvin.className);
    createSlider(...EFFECT.marvin.params);
  } else {
    preview.classList.remove(EFFECT.marvin.className);
  }

  if (target && target.value === EFFECT.phobos.name) {
    preview.classList.add(EFFECT.phobos.className);
    createSlider(...EFFECT.phobos.params);
  } else {
    preview.classList.remove(EFFECT.phobos.className);
  }

  if (target && target.value === EFFECT.heat.name) {
    preview.classList.add(EFFECT.heat.className);
    createSlider(...EFFECT.heat.params);
  } else {
    preview.classList.remove(EFFECT.heat.className);
  }
};

effectsList.addEventListener('change', onPhotoEffectChange);
