import { shuffleArray } from './util.js';

const NUMBER_OF_RANDOM_PHOTOS = 10;

const filters = document.querySelector('.img-filters');
const filtersForm = filters.querySelector('.img-filters__form');
const filterButtons = [...document.querySelectorAll('.img-filters__button')];

const filterDefault = (photos) => photos;

const filterRandom = (photos) =>
  shuffleArray(photos).slice(0, NUMBER_OF_RANDOM_PHOTOS);

const filterComments = (photos) => {
  const photosCopy = photos.slice();

  return photosCopy.sort((a, b) =>
    a.comments.length < b.comments.length ? 1 : -1
  );
};

const setFilter = (evt) => {
  const target = evt.target;

  if (target && target.matches('.img-filters__button')) {
    filterButtons.forEach((btn) => {
      btn.classList.remove('img-filters__button--active');
    });

    target.classList.add('img-filters__button--active');
  }
};

filtersForm.addEventListener('click', setFilter);

export { filters, filterDefault, filterRandom, filterComments, filtersForm };
