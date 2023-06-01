//переменные для кнопки закрытия
export const popupList = document.querySelectorAll('.popup')
//переменные для попапа редактирования аватара
export const avatarEdit = document.querySelector('.profile__avatar-container')
export const avatarPopup = document.querySelector('.popup_type_avatar')
export const avatarForm = avatarPopup.querySelector('.popup__form-container')

//переменные для попапа формы редактирования
export const profileEditButton = document.querySelector('.profile__edit');
export const profilePopup = document.querySelector('.popup_type_profile');
export const profileForm = profilePopup.querySelector('.popup__form-container');
export const nameInput = document.querySelector('.popup__form-item_el_name');
export const jobInput = document.querySelector('.popup__form-item_el_job');

//переменные для попапа формы добавления карточек
export const addButton = document.querySelector('.profile__add');
export const cardPopup = document.querySelector('.popup_type_card');
export const cardForm = cardPopup.querySelector('.popup__form-container');

//переменные для попапа карточек
export const imagePopup = document.querySelector('.popup_type_image');

export const formValidationConfig = {
  formSelector: '.popup__form-container',
  inputSelector: '.popup__form-item',
  errorClass: 'popup__form-item_type_error',
  buttonSelector: '.popup__form-save',
  buttonDisabledClass: 'popup__form-save_disabled',
  errorSelector: '.popup__form-item-error',
};

export const apiConfig = {
  url: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: '96b297f0-a85f-4378-98b7-30ead3538e01',
    'Content-Type': 'application/json'
  }
}
  