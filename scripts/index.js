const popupFull = document.querySelector(".popup_type-full");
const page = document.querySelector(".page");

const formAddCardElement = page.querySelector(".popup__form_type-place");

const imgInput = formAddCardElement.querySelector(".popup__item_el_link");
const titleInput = formAddCardElement.querySelector(".popup__item_el_title");

const parentCard = document.querySelector('.elements__container')

//карточки по умолчанию из массива

initialCards.forEach(item => {
  const newCard = createCard(item.link, item.name);
  renderCard(newCard, parentCard);
});

//добавление новой карточки

function createCard(link, title) {
  const elementTemplate = document.querySelector('.elements__template');

  const cardElement = elementTemplate.content.cloneNode(true);
  cardElement.querySelector(".element__image").src = link;
  cardElement.querySelector(".element__image").alt = title;
  cardElement.querySelector(".element__subtitle").textContent = title;

  cardElement.querySelector(".element__basket").addEventListener("click", function (event) {
    const eventTarget = event.target;
    eventTarget.parentElement.remove();
  });

  cardElement.querySelector(".element__like").addEventListener("click", function (event) {
    event.target.classList.toggle("element__like_active")
  });

  cardElement.querySelector(".element__image").addEventListener("click", function (event) {
    popupFull.querySelector(".popup__image").src = event.target.src;
    popupFull.querySelector(".popup__image").alt = event.target.alt;
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
  closePopup(page.querySelector(".popup_type-place"));
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
  closePopup(page.querySelector(".popup_type-profile"));
}

formProfile.addEventListener('submit', editProfileForm);

//кнопки

const editButton = page.querySelector(".profile__edit-button");

const closeButtonProfile = page.querySelector(".popup__close_type-profile");
const closeButtonPlace = page.querySelector(".popup__close_type-place");
const closeButtonImage = page.querySelector(".popup__close_type-full");

const addButton = page.querySelector(".profile__add-button");

//открытие-закрытие попапа

function showPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

editButton.addEventListener("click", function () {
  showPopup(page.querySelector(".popup_type-profile"));
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
});

addButton.addEventListener("click", function () {
  showPopup(page.querySelector(".popup_type-place"))
});

closeButtonProfile.addEventListener("click", function () { closePopup(page.querySelector(".popup_type-profile")) });
closeButtonPlace.addEventListener("click", function () { closePopup(page.querySelector(".popup_type-place")) });
closeButtonImage.addEventListener("click", function () { closePopup(page.querySelector(".popup_type-full")) });










