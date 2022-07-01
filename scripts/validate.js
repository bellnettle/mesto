const showInputError = (formElement, inputElement, errorMessage, inputError, errorMessageClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.add(inputError);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(errorMessageClass);
};

const hideInputError = (formElement, inputElement, inputError, errorMessageClass) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
    inputElement.classList.remove(inputError);
    errorElement.classList.remove(errorMessageClass);
    errorElement.textContent = '';
};


const checkInputValidity = (formElement, inputElement, inputError, errorMessageClass) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, inputError, errorMessageClass);
    } else {
        hideInputError(formElement, inputElement, inputError, errorMessageClass);
    }
};



const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
}

const toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(inactiveButtonClass);
        buttonElement.setAttribute("disabled", true);
    } else {
        buttonElement.classList.remove(inactiveButtonClass);
        buttonElement.removeAttribute("disabled", false);
    }
};

const setEventListeners = (formElement, inputSelector, submitButtonSelector, inactiveButtonClass, inputError, errorMessageClass) => {
    const inputList = Array.from(formElement.querySelectorAll(inputSelector));
    const buttonElement = formElement.querySelector(submitButtonSelector);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, inputError, errorMessageClass);
            toggleButtonState(inputList, buttonElement, inactiveButtonClass);
        });
    });
};

const enableValidation = (params) => {
    const formList = Array.from(document.querySelectorAll('.popup'));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', (evt) => {
            evt.preventDefault();
        });
        const fieldsetList = Array.from(formElement.querySelectorAll(params.formSelector));

        fieldsetList.forEach((fieldSet) => {
            setEventListeners(fieldSet,
                params.inputSelector,
                params.submitButtonSelector,
                params.inactiveButtonClass,
                params.inputError,
                params.errorMessageClass);
        });
    });
}

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_type-disabled',
    inputError: 'popup__item_type-error',
    errorMessageClass: 'popup__input-error_active'
});