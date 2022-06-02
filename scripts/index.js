let container = document.querySelector("#page")
let editButton = page.querySelector(".profile__edit-button");
let closeButton = page.querySelector(".popup__close");
let popup = page.querySelector(".popup");
let form = page.querySelector(".popup__form");

let nameImput = form.querySelector(".popup__item_el_name");
let jobImput = form.querySelector(".popup__item_el_info");
let userName = page.querySelector(".profile__title");
let userJob = page.querySelector(".profile__subtitle");




function showPopup() {
    popup.classList.add("popup_opened");
    nameImput.value = userName.textContent;
    jobImput.value = userJob.textContent;
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

form.addEventListener('submit', formSubmitHandler); 