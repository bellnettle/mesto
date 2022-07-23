import { popupFull, imageFull, parentCard, showPopup } from "./index.js"

export default class Card {
    constructor(link, title, template) {
        this._title = title;
        this._link = link;
        this._template = template;
    }

    _getTemplate() {
        const cardElement = this._template.content.cloneNode(true).querySelector('.element');
        return cardElement;
    }

    _renderCard(card, container) {
        container.prepend(card);
    }

    createCard() {
        this._element = this._getTemplate();
        this._imageElement = this._element.querySelector(".element__image")
        this._imageElement.src = this._link;
        this._imageElement.alt = this._title;
        this._element.querySelector(".element__subtitle").textContent = this._title;

        this._renderCard(this._element, parentCard)
        this._setEventListeners()
        return this._element;
    }

    _handleOpenPopup() {
        imageFull.src = this._link;
        imageFull.alt = this._title;
        popupFull.querySelector(".popup__title").textContent = this._title;
        showPopup(popupFull);
    }

    _setEventListeners() {
        this._imageElement.addEventListener('click', () => {
            this._handleOpenPopup();
        });
        this._handleLike();
        this._handleDelete();
    };


    _handleLike() {
        this._element.querySelector(".element__like").addEventListener("click", function (event) {
            event.target.classList.toggle("element__like_active")
        });
    }

    _handleDelete() {
        const elementToDelete = this._element;
        this._element.querySelector(".element__basket").addEventListener("click", function () {
            elementToDelete.remove()
        });
    }
}