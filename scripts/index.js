const page = document.querySelector(".page"); //вся страница

const popupFull = document.querySelector(".popup_type-full"); //прозрачный фон попапа картинки
const imageFull = popupFull.querySelector(".popup__image"); //сама картинка в попапе большая

const formAddCardElement = page.querySelector(".popup__form_type-place"); //попап добаления карточки
const imgInput = formAddCardElement.querySelector(".popup__item_el_link"); //ввод ссылки на картинку
const titleInput = formAddCardElement.querySelector(".popup__item_el_title"); //ввод заголовка картинки

const parentCard = document.querySelector('.elements__container'); //сама карточка - родитель картинки и подписи

const elementTemplate = document.querySelector('.elements__template'); //темплейт карточки

const popupProfile = page.querySelector(".popup_type-profile"); //прозрачный фон попапа редактирования профиля
const buttonElement = popupProfile.querySelector(".popup__button"); //кнопка сохранить редактирование профиля

const popupPlace = page.querySelector(".popup_type-place"); //прозрачный фон попапа добавления карточки  
const popupButtonPlace = popupPlace.querySelector('.popup__button'); //кнопка создать карточку

export { page, popupFull, imageFull, formAddCardElement, imgInput, titleInput, parentCard, elementTemplate, popupProfile, buttonElement, popupPlace, popupButtonPlace }

import { initialCards } from "./data.js";
import FormValidator from "./FormValidator.js";
import Card from "./Card.js";


const params = {
  formSelector: '.popup__form',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_type-disabled',
  inputError: 'popup__item_type-error',
  errorMessageClass: 'popup__input-error_active'
};

//------------------------------------------------------------------------------------------------------------------------------------------

initialCards.forEach(item => {
  const newCard = new Card(item.link, item.name, elementTemplate);
  newCard.createCard();
});

formAddCardElement.addEventListener('submit', function (event) {
  const newCard = new Card(imgInput.value, titleInput.value, elementTemplate);
  newCard.createCard();
  event.preventDefault();
  closePopup(popupPlace);
  formAddCardElement.reset();

})

//редактирование профиля

const formProfile = page.querySelector(".popup__form_type-profile");
const formProfileValidator = new FormValidator(params, formProfile);
const formPlaceValidator = new FormValidator(params, formAddCardElement);


const nameInput = formProfile.querySelector(".popup__item_el_name");
const jobInput = formProfile.querySelector(".popup__item_el_info");

const userName = page.querySelector(".profile__title");
const userJob = page.querySelector(".profile__subtitle");

function editProfileForm(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(popupProfile);
}

formProfile.addEventListener('submit', editProfileForm);

//кнопки

const editButton = page.querySelector(".profile__edit-button");

const addButton = page.querySelector(".profile__add-button");

//открытие-закрытие попапа
let currentPopup = null;

const escPressed = (evt) => {
  if (evt.key === "Escape") {
    closePopup(currentPopup);
  }
}

export function showPopup(popup) {
  popup.classList.add("popup_opened");
  currentPopup = popup;
  document.addEventListener("keydown", escPressed);
  buttonElement.removeAttribute("disabled", false);
  buttonElement.classList.remove('popup__button_type-disabled');
}


function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escPressed);
}

const opts = {
  inputError: 'popup__item_type-error',
  errorMessageClass: 'popup__input-error_active'
};

editButton.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  [
    {
      'validator': formProfileValidator,
      'form': formProfile,
      'input': nameInput,
    },
    {
      'validator': formProfileValidator,
      'form': formProfile,
      'input': jobInput
    }
  ].forEach(el => el.validator.hideInputError(el.form, el.input, opts))

  showPopup(popupProfile);
});

addButton.addEventListener("click", function () {
  formAddCardElement.reset();
  popupButtonPlace.classList.add('popup__button_type-disabled');
  popupButtonPlace.setAttribute("disabled", true);
  [
    {
      'validator': formPlaceValidator,
      'form': formAddCardElement,
      'input': imgInput,
    },
    {
      'validator': formPlaceValidator,
      'form': formAddCardElement,
      'input': titleInput
    }
  ].forEach(el => el.validator.hideInputError(el.form, el.input, opts))

  showPopup(popupPlace);
});

//Закрытие попапов 

Array.from(document.querySelectorAll('.popup')).forEach(elem => elem.addEventListener("click", function (evt) {
  if ((!evt.target.closest('.popup__container')) || (evt.target.classList.contains('popup__close'))) {
    closePopup(evt.currentTarget);
  }
}));

//создание валидаторов форм, включение валидаци
const formList = Array.from(document.querySelectorAll('.popup'));
formList.forEach((formElement) => {
  const newForm = new FormValidator(params, formElement);
  newForm.enableValidation();
})










