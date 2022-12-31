import { openBigPhoto } from './big-photo.js';
import {
  filtersForm,
  filterDefault,
  filterComments,
  filterRandom,
} from './filters-photos.js';

const pictures = document.querySelector('.pictures');

function removeOldList() {
  pictures.querySelectorAll('.picture').forEach((item) => item.remove());
}

function debounce(callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

const createPhotos = (photos) => {
  removeOldList();

  const picture = document
    .querySelector('#picture')
    .content.querySelector('.picture');
  const pictureFragment = document.createDocumentFragment();

  photos.forEach((photo) => {
    const pictureLink = picture.cloneNode(true);

    pictureLink.querySelector('.picture__img').src = photo.url;
    pictureLink.querySelector('.picture__likes').textContent = photo.likes;
    pictureLink.querySelector('.picture__comments').textContent =
      photo.comments.length;

    pictureLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPhoto(photo);
    });

    pictureFragment.append(pictureLink);
  });

  pictures.append(pictureFragment);
};

const renderPhotoList = (photos) => {
  createPhotos(photos);

  function changeFilterHandler(evt) {
    const target = evt.target;

    switch (target.id) {
      case 'filter-default':
        createPhotos(filterDefault(photos));
        break;
      case 'filter-random':
        createPhotos(filterRandom(photos));
        break;
      case 'filter-discussed':
        createPhotos(filterComments(photos));
        break;
    }
  }

  filtersForm.addEventListener('click', debounce(changeFilterHandler));
};

export { renderPhotoList };
