import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.comments-count');
const commentsLoader = bigPicture.querySelector('.social__comments-loader');
const socialCommentCount = bigPicture.querySelector('.social__comment-count');
const socialComments = bigPicture.querySelector('.social__comments');
const socialCaption = bigPicture.querySelector('.social__caption');
const pictureCansel = bigPicture.querySelector('#picture-cancel');

const renderComments = (photo) => {
  const comment = document
    .querySelector('#comment')
    .content.querySelector('.social__comment');

  const commentFragment = document.createDocumentFragment();

  const comments = photo.comments;

  commentsCount.textContent = comments.length;

  if (comments.length <= 5) {
    socialCommentCount.textContent = `${comments.length} из ${comments.length} комментариев`;
    commentsLoader.classList.add('hidden');
  }

  comments.slice(0, 5).forEach((item) => {
    const commentItem = comment.cloneNode(true);
    commentFragment.appendChild(commentItem);

    commentItem.querySelector('.social__picture').src = item.avatar;
    commentItem.querySelector('.social__picture').alt = item.name;
    commentItem.querySelector('.social__text').textContent = item.message;
  });

  socialComments.append(commentFragment);

  let countComment = 5;

  const onDownloadCommentsClick = () => {
    comments.slice(countComment, countComment + 5).forEach((item) => {
      const commentItem = comment.cloneNode(true);
      commentFragment.appendChild(commentItem);

      commentItem.querySelector('.social__picture').src = item.avatar;
      commentItem.querySelector('.social__picture').alt = item.name;
      commentItem.querySelector('.social__text').textContent = item.message;
    });

    socialComments.append(commentFragment);

    countComment += 5;

    if (
      countComment <= comments.length ||
      (countComment = Math.min(countComment, comments.length))
    ) {
      socialCommentCount.textContent = `${countComment} из ${comments.length} комментариев`;
    }

    if (countComment === comments.length) {
      commentsLoader.classList.add('hidden');
    } else {
      commentsLoader.classList.remove('hidden');
    }
  };

  commentsLoader.addEventListener('click', onDownloadCommentsClick);
};

const openBigPhoto = (photo) => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
  commentsLoader.classList.remove('hidden');
  socialCommentCount.textContent = `5 из ${photo.comments.length} комментариев`;

  bigPictureImg.querySelector('img').src = photo.url;
  likesCount.textContent = photo.likes;
  socialCaption.textContent = photo.description;

  const onPopupEscKeydown = (evt) => {
    if (isEscapeKey(evt.key)) {
      evt.preventDefault();
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      document.removeEventListener('keydown', onPopupEscKeydown);
      bigPicture
        .querySelectorAll('.social__comment')
        .forEach((e) => e.remove());
    }
  };
  document.addEventListener('keydown', onPopupEscKeydown);

  const onBigPictureCloseClick = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', onPopupEscKeydown);
    bigPicture.querySelectorAll('.social__comment').forEach((e) => e.remove());
  };

  pictureCansel.addEventListener('click', onBigPictureCloseClick);
  document.addEventListener('keydown', onPopupEscKeydown);
  renderComments(photo);
};

export { openBigPhoto };
