const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add("popup__item_type-error");
    errorElement.textContent = errorMessage;
    errorElement.classList.add("popup__input-error_active");
};

const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove('popup__item_type-error');
    errorElement.classList.remove('popup__input-error_active');
    errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};



const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('popup__button_type-disabled');
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove('popup__button_type-disabled');
        buttonElement.removeAttribute("disabled", false);
    }
};

const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.popup__item'));
    const buttonElement = formElement.querySelector('.popup__button');

    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.popup'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll('.popup__form'));

        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet);
        });
    });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    buttonElement: '.popup__button',
    inactiveButtonClass: 'popup__button_type-disabled',
    inputElement: 'popup__item_type_error',
    errorElement: 'popup__input-error_active'
});