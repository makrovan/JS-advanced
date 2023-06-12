import IMask from 'imask';

// накладываем маску на полле ввода периода действия карты
export function setMaskToCardPeriodInput(cardPeriodInput) {
  return IMask(cardPeriodInput, {
    mask: Date, // enable date mask
    pattern: 'YY/mm',
    blocks: {
      mm: {
        mask: IMask.MaskedRange,
        from: 1,
        to: 12,
        maxLength: 2,
        placeholderChar: 'М',
      },
      YY: {
        mask: IMask.MaskedRange,
        from: 23,
        to: 99,
        maxLength: 2,
        placeholderChar: 'Г',
      },
    },
    // define date -> str convertion
    format: function (date) {
      var month = date.getMonth() + 1;
      var year = date.getFullYear();
      year = year.toString().substring(-2);
      if (month < 10) month = "0" + month;
      return [year, month].join('/');
    },
    // define str -> date convertion
    // возвращает последний день месяца
    parse: function (str) {
      const yearMonthDay = str.split('/');
      const lastMonthDay = (new Date(`20${yearMonthDay[0]}`, yearMonthDay[1], 0)).getDate();
      return new Date(`20${yearMonthDay[0]}`, yearMonthDay[1] - 1, lastMonthDay);
    },
    min: new Date(),
    // max: new Date(2050, 0, 1),
    lazy: false,
    overwrite: true,
  });
}

export function setMaskTocardNumberInput(cardNumberInput) {
  return IMask(cardNumberInput, {
    mask: '0000 0000 0000 0000 000',
    lazy: false,
    placeholderChar: 'X',
  });
}

export function setMaskToCardCvvInput(cardCvvInput) {
  return IMask(cardCvvInput, {
    mask: '000',
    lazy: false,
    placeholderChar: 'X',
    displayChar: '*',
    overwrite: 'shift',
  });
}
