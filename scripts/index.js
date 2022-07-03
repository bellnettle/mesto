const popupFull = document.querySelector(".popup_type-full");
const imageFull = popupFull.querySelector(".popup__image");

const page = document.querySelector(".page");

const formAddCardElement = page.querySelector(".popup__form_type-place");

const imgInput = formAddCardElement.querySelector(".popup__item_el_link");
const titleInput = formAddCardElement.querySelector(".popup__item_el_title");

const parentCard = document.querySelector('.elements__container');

const elementTemplate = document.querySelector('.elements__template');

const popupProfile = page.querySelector(".popup_type-profile")
const popupPlace = page.querySelector(".popup_type-place");
const popupButtonPlace = popupPlace.querySelector('.popup__button');
const buttonElement = popupProfile.querySelector(".popup__button");

//карточки по умолчанию из массива

initialCards.forEach(item => {
  const newCard = createCard(item.link, item.name);
  renderCard(newCard, parentCard);
});

//добавление новой карточки

function createCard(link, title) {
  const cardElement = elementTemplate.content.cloneNode(true).querySelector('.element');
  const imageElement = cardElement.querySelector(".element__image")
  imageElement.src = link;
  imageElement.alt = title;
  cardElement.querySelector(".element__subtitle").textContent = title;

  cardElement.querySelector(".element__basket").addEventListener("click", function (event) {
    cardElement.remove()
  });

  cardElement.querySelector(".element__like").addEventListener("click", function (event) {
    event.target.classList.toggle("element__like_active")
  });

  imageElement.addEventListener("click", function (event) {
    imageFull.src = event.target.src;
    imageFull.alt = event.target.alt;
    popupFull.querySelector(".popup__title").textContent = event.target.alt;
    showPopup(popupFull);
  });
  return cardElement;

}
function renderCard(card, container) {
  container.prepend(card);
}


formAddCardElement.addEventListener('submit', function (event) {
  const newCard = createCard(imgInput.value, titleInput.value);
  renderCard(newCard, parentCard);
  event.preventDefault();
  closePopup(popupPlace);
  formAddCardElement.reset();

})

//редактирование профиля

const formProfile = page.querySelector(".popup__form_type-profile");

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

function showPopup(popup) {
  popup.classList.add("popup_opened");
  currentPopup = popup;
  document.addEventListener("keydown", escPressed);
  buttonElement.removeAttribute("disabled", false);
  buttonElement.classList.remove('popup__button_type-disabled');
  hideInputError(formProfile, nameInput, {
    inputError: 'popup__item_type-error',
    errorMessageClass: 'popup__input-error_active'
  });
  hideInputError(formProfile, jobInput, {
    inputError: 'popup__item_type-error',
    errorMessageClass: 'popup__input-error_active'
  });

}


function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", escPressed);
}

editButton.addEventListener("click", function () {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
  showPopup(popupProfile);
});

addButton.addEventListener("click", function () {
  popupButtonPlace.classList.add('popup__button_type-disabled');
  popupButtonPlace.setAttribute("disabled", true);
  showPopup(popupPlace);
});

//Закрытие попапов 

Array.from(document.querySelectorAll('.popup')).forEach(elem => elem.addEventListener("click", function (evt) {
  if ((!evt.target.closest('.popup__container')) || (evt.target.classList.contains('popup__close'))) {
    closePopup(evt.currentTarget);
  }
}));











