export default class FormValidator {
    constructor(params, formElement) {
        this._params = params;
        this._formElement = formElement;
    };

    showInputError = (formElement, inputElement, errorMessage, params) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.add(params.inputError);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(params.errorMessageClass);
    };

    hideInputError = (formElement, inputElement, params) => {
        const errorElement = formElement.querySelector(`.${inputElement.id}-input-error`);
        inputElement.classList.remove(params.inputError);
        errorElement.classList.remove(params.errorMessageClass);
        errorElement.textContent = '';
    };
    _checkInputValidity = (formElement, inputElement, params) => {
        if (!inputElement.validity.valid) {
            this.showInputError(formElement, inputElement, inputElement.validationMessage, params);
        } else {
            this.hideInputError(formElement, inputElement, params);
        }
    };

    _hasInvalidInput = (inputList) => {
        return inputList.some((inputListElement) => {
            return !inputListElement.validity.valid;
        });
    };

    _toggleButtonState = (inputList, buttonElement, inactiveButtonClass) => {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(inactiveButtonClass);
            buttonElement.setAttribute("disabled", true);
        } else {
            buttonElement.classList.remove(inactiveButtonClass);
            buttonElement.removeAttribute("disabled", false);
        }
    };

    _setEventListeners = (formElement, params) => {
        const inputList = Array.from(formElement.querySelectorAll(params.inputSelector));
        const buttonElement = formElement.querySelector(params.submitButtonSelector);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(formElement, inputElement, params);
                this._toggleButtonState(inputList, buttonElement, params.inactiveButtonClass);
            });
        });
    };

    enableValidation = () => {
        const formList = Array.from(document.querySelectorAll('.popup'));
        formList.forEach((formElement) => {
            formElement.addEventListener('submit', (evt) => {
                evt.preventDefault();
            });
            const fieldsetList = Array.from(formElement.querySelectorAll(this._params.formSelector));

            fieldsetList.forEach((fieldSet) => {
                this._setEventListeners(fieldSet, this._params);
            });
        });
    };
};

