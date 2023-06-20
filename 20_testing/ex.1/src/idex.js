import 'babel-polyfill';

import { el, mount, setStyle, unmount } from 'redom';

import CardInfo from 'card-info';

import {
  setMaskToCardPeriodInput,
  setMaskTocardNumberInput,
  setMaskToCardCvvInput,
} from './customMasks.js';

import {
  cardCvvValidator,
  cardNumberValidator,
  emailValidator,
} from './customValidators.js';

import { createInputForm } from './domCreator.js';

import 'bootstrap/dist/css/bootstrap.min.css';

import logo from './assets/images/logo.svg';

// функция стилизации формы ввода под цвета банка + загрузка Logo
function setFormBankStyle(cardNumber, form, cardNumberInput) {
  const cardInfo = new CardInfo(cardNumber, {
    brandsLogosPath: './assets/images/brands-logos/',
  });
  setStyle(form, { backgroundColor: cardInfo.backgroundColor });
  const labelRow = el('.row justify-content-between p-5');
  mount(form, labelRow, cardNumberInput.parentElement);

  const brandLogo = el('img', { src: logo });
  mount(labelRow, brandLogo);
  return labelRow;
}

let cardValid = false;
let cardPeriodValid = false;
let cardCvvValid = false;
let emailValid = false;

function checkButtonValid(button) {
  // console.log(`check: ${cardValid} ${cardPeriodValid} ${cardCvvValid} ${emailValid}`);
  if (cardValid && cardPeriodValid && cardCvvValid && emailValid) {
    button.removeAttribute('disabled');
  } else {
    button.setAttribute('disabled', '');
  }
}

function main() {
  const container = el('.container');
  mount(document.body, container);

  const form = createInputForm(container);
  mount(container, form);

  const cardNumberInput = document.getElementById('cardNamber');
  const cardPeriodInput = document.getElementById('cardPeriod');
  const cardCvvInput = document.getElementById('cardCvv');
  const emailInput = document.getElementById('email');
  const button = form.querySelector('button');

  const cardNumberInputMask = setMaskTocardNumberInput(cardNumberInput);
  const cardPeriodInputMask = setMaskToCardPeriodInput(cardPeriodInput);
  const cardCvvInputMask = setMaskToCardCvvInput(cardCvvInput);

  let labelRow = null;

  cardNumberInput.addEventListener('blur', () => {
    // const cardNumber = cardNumberInput.value.replaceAll(' ', '').replaceAll('X', '');
    const cardNumber = cardNumberInputMask.unmaskedValue;
    cardValid = cardNumberValidator(cardNumber);

    // обнуляем стиль формы, если она установлена предыдущим вводом
    if (labelRow) {
      unmount(form, labelRow);
      setStyle(form, { backgroundColor: 'white' });
      labelRow = null;
    }

    // устанавливаем форму в стиле банка, номер карточки которого ввели
    if (cardValid) {
      labelRow = setFormBankStyle(cardNumber, form, cardNumberInput);
    }
    checkButtonValid(button);
  });

  cardPeriodInput.addEventListener('blur', () => {
    cardPeriodValid = cardPeriodInputMask.typedValue >= new Date();
    // console.log(cardPeriodValid);
    checkButtonValid(button);
  });

  cardCvvInput.addEventListener('blur', () => {
    cardCvvValid = cardCvvValidator(cardCvvInputMask.unmaskedValue);
    checkButtonValid(button);
  });

  emailInput.addEventListener('blur', () => {
    emailValid = emailValidator(emailInput.value);
    checkButtonValid(button);
  });
}

main();
