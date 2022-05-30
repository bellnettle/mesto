let container = document.querySelector("#page")
let editButton = page.querySelector(".profile__edit-button");
let closeButton = page.querySelector(".popup__close");
let popup = page.querySelector(".popup");

let nameImput = popup.querySelector(".popup__item_el_name");
let jobImput = popup.querySelector(".popup__item_el_info");
let userName = page.querySelector(".profile__title");
let userJob = page.querySelector(".profile__subtitle");

nameImput.value = userName.textContent;
jobImput.value = userJob.textContent;


function showPopup() {
    popup.classList.add("popup_opened");
}

function closePopup() {
    popup.classList.remove("popup_opened");
}

function formSubmitHandler(evt) {
    evt.preventDefault();
    userName.textContent = nameImput.value;
    userJob.textContent = jobImput.value;
    closePopup();
}

editButton.addEventListener("click", showPopup);

closeButton.addEventListener("click", closePopup);

popup.addEventListener('submit', formSubmitHandler); 