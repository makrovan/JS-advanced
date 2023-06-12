import {
  el, mount, setAttr, setStyle, unmount,
} from 'redom';
import CardInfo from 'card-info';
import validator from 'validator';
import {
  setMaskToCardPeriodInput,
  setMaskTocardNumberInput,
  setMaskToCardCvvInput,
} from './customMasks.js'
// import moment from 'moment';

// функция, добавляющая input-ы в форму
function makeInputRow(destForm,
  labelText,
  inputId,
  // inputType,
  inputPlaceholder,
  inputWidthInColumn = 8) {
  const row = el('.form-group row');
  mount(destForm, row);
  const label = el('label.col-4 col-form-label', labelText);
  setAttr(label, { for: inputId });
  mount(row, label);
  const input = el('input');
  setAttr(input, {
    type: 'text',
    id: inputId,
    placeholder: inputPlaceholder,
    class: `col-${inputWidthInColumn} form-control`,
  });
  mount(row, input);
  return input;
}

// функция стилизации формы ввода под цвета банка + загрузка Logo
function setFormBankStyle(cardNumber, form, cardNumberInput) {
  const cardInfo = new CardInfo(cardNumber, {
    banksLogosPath: './node_modules/card-info/dist/banks-logos/',
    brandsLogosPath: './node_modules/card-info/dist/brands-logos/',
  });
  // console.log(cardInfo);
  setStyle(form, { backgroundColor: cardInfo.backgroundColor });
  const labelRow = el('.row justify-content-between p-5');
  mount(form, labelRow, cardNumberInput.parentElement);
  const bankLogo = el('img', {
    src: cardInfo.bankLogoPng,
    alt: 'bank logo',
  });
  mount(labelRow, bankLogo);
  const brandLogo = el('img', {
    src: cardInfo.brandLogoPng,
    alt: 'bank logo',
  });
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
  // console.log(button);
}

function main() {
  const container = el('.container');
  mount(document.body, container);
  const form = el('form.p-5');
  mount(container, form);
  const headerRow = el('.row justify-content-md-center');
  mount(form, headerRow);
  const h2 = el('h2', 'Форма ввода реквизитов банковской карты');
  mount(headerRow, h2);

  const cardNumberInput = makeInputRow(form, 'Номер банковской карты:', 'cardNamber', 'XXXX XXXX XXXX XXXX');
  const cardPeriodInput = makeInputRow(form, 'Срок действия карты:', 'cardPeriod', 'ММГГ', 2);
  const cardCvvInput = makeInputRow(form, 'CVC/CVV:', 'cardCvv', 'xxx', 1);
  const emailInput = makeInputRow(form, 'Адрес e-mail:', 'email', 'example@mail.ru');

  const buttonRow = el('.row justify-content-md-center');
  mount(form, buttonRow);
  const button = el('button.btn btn-primary col-5', 'Оплатить');
  setAttr(button, { type: 'submit', disabled: 'true' });
  mount(buttonRow, button);

  const cardNumberInputMask = setMaskTocardNumberInput(cardNumberInput);
  const cardPeriodInputMask = setMaskToCardPeriodInput(cardPeriodInput);
  const cardCvvInputMask = setMaskToCardCvvInput(cardCvvInput);

  let labelRow = null;

  cardNumberInput.addEventListener('blur', () => {
    // const cardNumber = cardNumberInput.value.replaceAll(' ', '').replaceAll('X', '');
    const cardNumber = cardNumberInputMask.unmaskedValue;
    // console.log(cardNumber);
    cardValid = validator.isCreditCard(cardNumber);
    // console.log(cardValid);

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
    cardPeriodValid = cardPeriodInputMask.typedValue >= (new Date());
    // console.log(cardPeriodValid);
    checkButtonValid(button);
  });

  cardCvvInput.addEventListener('blur', () => {
    cardCvvValid = ((validator.isDecimal(cardCvvInputMask.unmaskedValue))
      && (cardCvvInputMask.unmaskedValue.length === 3));
    // console.log(cardCvvValid);
    checkButtonValid(button);
  });

  emailInput.addEventListener('blur', () => {
    emailValid = validator.isEmail(emailInput.value);
    // console.log(emailValid);
    checkButtonValid(button);
  });
}

main();
