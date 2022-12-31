import { sendData } from './api.js';
import { isEscapeKey } from './util.js';

const overlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('#upload-select-image');
const uploadFile = document.querySelector('#upload-file');
const closeCansel = document.querySelector('#upload-cancel');
const submitButton = overlay.querySelector('#upload-submit');
const preview = overlay.querySelector('.img-upload__preview img');
const slider = overlay.querySelector('.img-upload__effect-level');
const hashtagInput = document.querySelector('.text__hashtags');
const commentInput = document.querySelector('.text__description');
const HASHTAG_VALID_REGEX = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
const MAX_HASHTAG_NUMBERS = 5;

const onContentLoadChange = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  slider.style.display = 'none';
  preview.style.filter = '';
  document.addEventListener('keydown', onEscFormKeydown);
  preview.src = URL.createObjectURL(uploadFile.files[0]);
};

const onCloseFormClick = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscFormKeydown);
  form.reset();
  preview.style.transform = '';
  preview.className = '';
};

function onEscFormKeydown(evt) {
  if (isEscapeKey(evt.key)) {
    evt.preventDefault();
    onCloseFormClick();
  }
}

const onHashTagInput = () => {
  const hashTagArray = hashtagInput.value.toLowerCase().trim().split(' ');
  const uniqueHashTagArray = new Set(hashTagArray);

  if (hashTagArray.length > MAX_HASHTAG_NUMBERS) {
    hashtagInput.setCustomValidity(
      `Хэш-тегов не должно быть больше чем ${MAX_HASHTAG_NUMBERS}`
    );
    hashtagInput.reportValidity();
    return;
  } else {
    hashtagInput.setCustomValidity('');
  }

  if (hashTagArray.length !== uniqueHashTagArray.size) {
    hashtagInput.setCustomValidity('Хэш-теги не должны повторяться');
    hashtagInput.reportValidity();
    return;
  } else {
    hashtagInput.setCustomValidity('');
  }

  for (let i = 0; i < hashTagArray.length; ++i) {
    if (!HASHTAG_VALID_REGEX.test(hashTagArray[i])) {
      hashtagInput.setCustomValidity(
        `Хэш-тег должен начинается с символа # (решётка)
        Максимальная длина одного хэш-тега 20 символов, включая решётку
        Хэш-тег должен состоять из букв и чисел и не может содержать пробелы, спецсимволы (#, @, $ и т. п.), символы пунктуации (тире, дефис, запятая и т. п.), эмодзи и т. д.`
      );
      break;
    }
  }

  hashtagInput.reportValidity();
};

const onCommentInput = () => {
  if (commentInput.value.length > 140) {
    commentInput.setCustomValidity('Символов должно быть не больше 140');
  } else {
    commentInput.setCustomValidity('');
  }
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

form.addEventListener('submit', sendData);
uploadFile.addEventListener('change', onContentLoadChange);
closeCansel.addEventListener('click', onCloseFormClick);
hashtagInput.addEventListener('input', onHashTagInput);
commentInput.addEventListener('input', onCommentInput);

hashtagInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.stopPropagation();
  }
});

commentInput.addEventListener('keydown', (evt) => {
  if (isEscapeKey(evt.key)) {
    evt.stopPropagation();
  }
});

export {
  overlay,
  preview,
  slider,
  onCloseFormClick,
  blockSubmitButton,
  unblockSubmitButton,
  onEscFormKeydown,
};
