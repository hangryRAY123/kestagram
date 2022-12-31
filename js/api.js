import { renderPhotoList } from './create-photos.js';
import { openSuccess, openError, showAlert } from './popup-alert.js';
import {
  onCloseFormClick,
  blockSubmitButton,
  unblockSubmitButton,
} from './form.js';
import { filters } from './filters-photos.js';

const getData = () => {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => {
      renderPhotoList(photos);
      filters.classList.remove('img-filters--inactive');
    })
    .catch(() => {
      showAlert(
        'Не удалось загрузить посты. Попробуйте перезагрузить страницу'
      );
    });
};

const sendData = (evt) => {
  const formData = new FormData(evt.target);

  evt.preventDefault();
  blockSubmitButton();

  fetch('https://26.javascript.pages.academy/kekstagram', {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok) {
        onCloseFormClick();
        openSuccess();
      } else {
        throw new Error('Ошибка отправки данных');
      }
    })
    .catch(() => {
      openError();
    })
    .finally(() => {
      unblockSubmitButton();
    });
};

export { getData, sendData };
