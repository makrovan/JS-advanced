import validator from 'validator';

export function cardNumberValidator(cardNumber) {
  return validator.isCreditCard(cardNumber);
}

export function cardCvvValidator(cvvTest) {
  return validator.isDecimal(cvvTest) && cvvTest.length === 3;
}

export function emailValidator(emailTest) {
  return validator.isEmail(emailTest);
}
