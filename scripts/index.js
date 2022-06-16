let container = document.querySelector("#page")

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

//удаление элемента

function deleteElement(element) {
  element.remove();
}

//открыть изображение

function showPopupFull(element) {
  const popupTemplate = document.querySelector(".popup__template");
  const popupFull = popupTemplate.content.cloneNode(true);

  popupFull.querySelector(".popup__image").src = element.src;
  popupFull.querySelector(".popup__title").textContent = element.alt;

  document.querySelector(".popup_type-full").classList.add("popup_opened");

  popupTemplate.after(popupFull);

}


//карточки по умолчанию из массива

initialCards.forEach(item => {
  const parent = document.querySelector('.elements__container')
  const elementTemplate = document.querySelector('.elements__template');

  const element = elementTemplate.content.cloneNode(true);
  element.querySelector(".element__image").src = item.link;
  element.querySelector(".element__image").alt = item.name;
  element.querySelector(".element__subtitle").textContent = item.name;

  element.querySelector(".element__basket").addEventListener("click", function (event) {
    const eventTarget = event.target;
    deleteElement(eventTarget.parentElement)
  });

  element.querySelector(".element__like").addEventListener("click", function (event) {
    event.target.classList.toggle("element__like_active")
  });

  element.querySelector(".element__image").addEventListener("click", function (event) {
    showPopupFull(event.target);
  });

  parent.append(element);
});

//добавление новой карточки

let formElement = page.querySelector(".popup__form_type-place");

let imgImput = formElement.querySelector(".popup__item_el_link");
let titleImput = formElement.querySelector(".popup__item_el_title");

let userImg = page.querySelector(".element__image");
let userTitle = page.querySelector(".element__subtitle");

function addElement(evt) {
  evt.preventDefault();
  const parent = document.querySelector('.elements__container')
  const elementTemplate = document.querySelector('.elements__template');

  const element = elementTemplate.content.cloneNode(true);
  element.querySelector(".element__image").src = imgImput.value;
  element.querySelector(".element__image").alt = titleImput.value;
  element.querySelector(".element__subtitle").textContent = titleImput.value;

  element.querySelector(".element__basket").addEventListener("click", function (event) {
    const eventTarget = event.target;
    deleteElement(eventTarget.parentElement)
  });

  element.querySelector(".element__like").addEventListener("click", function (event) {
    event.target.classList.toggle("element__like_active")
  })

  parent.prepend(element);
  closePopup("_type-place");
}

formElement.addEventListener('submit', addElement);


//редактирование профиля

let formProfile = page.querySelector(".popup__form_type-profile");

let nameImput = formProfile.querySelector(".popup__item_el_name");
let jobImput = formProfile.querySelector(".popup__item_el_info");

let userName = page.querySelector(".profile__title");
let userJob = page.querySelector(".profile__subtitle");

function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = nameImput.value;
  userJob.textContent = jobImput.value;
  closePopup("_type-profile");
}

formProfile.addEventListener('submit', formSubmitHandler);

//кнопки

let editButton = page.querySelector(".profile__edit-button");

let closeButtonProfile = page.querySelector(".popup__close_type-profile");
let closeButtonPlace = page.querySelector(".popup__close_type-place");
let closeButtonImage = page.querySelector(".popup__close_type-full");

let addButton = page.querySelector(".profile__add-button");

let basketButton = page.querySelectorAll(".element__basket");

let likeButton = page.querySelectorAll(".element__like");

//открытие-закрытие попапа

function showPopup(type) {
  let popup = page.querySelector(".popup" + type);
  popup.classList.add("popup_opened");
  nameImput.value = userName.textContent;
  jobImput.value = userJob.textContent;
}

function closePopup(type) {
  let popup = page.querySelector(".popup" + type);
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", function () { showPopup("_type-profile") });

addButton.addEventListener("click", function () { showPopup("_type-place") });

closeButtonProfile.addEventListener("click", function () { closePopup("_type-profile") });
closeButtonPlace.addEventListener("click", function () { closePopup("_type-place") });
closeButtonImage.addEventListener("click", function () { closePopup("_type-full") });









