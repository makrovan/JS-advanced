import { el, mount, setAttr } from 'redom';

// функция, добавляющая input-ы в форму
function makeInputRow(
  destForm,
  labelText,
  inputId,
  inputPlaceholder,
  inputWidthInColumn = 8
) {
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

// функция создающая форму ввода
export function createInputForm() {
  const form = el('form.p-5');
  const headerRow = el('.row justify-content-md-center');
  mount(form, headerRow);
  const h2 = el('h2', 'Форма оплаты ');
  mount(headerRow, h2);

  makeInputRow(
    form,
    'Номер банковской карты:',
    'cardNamber',
    'XXXX XXXX XXXX XXXX'
  );
  makeInputRow(form, 'Срок действия карты:', 'cardPeriod', 'ММГГ', 2);
  makeInputRow(form, 'CVC/CVV:', 'cardCvv', 'xxx', 1);
  makeInputRow(form, 'Адрес e-mail:', 'email', 'example@mail.ru');

  const buttonRow = el('.row justify-content-md-center');
  mount(form, buttonRow);
  const button = el('button.btn btn-primary col-5', 'Оплатить');
  setAttr(button, { type: 'submit', disabled: 'true' });
  mount(buttonRow, button);

  // console.log(form);
  return form;
}
