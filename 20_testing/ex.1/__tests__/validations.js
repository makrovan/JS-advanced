import { cardCvvValidator, cardNumberValidator } from '../src/customValidators';

test('Валидация номера карты пропускает корректный номер карты', () => {
  expect(cardNumberValidator('4276090010887131')).toBe(true);
});

test('Валидация номера карты не пропускает произвольную строку, содержащую любые нецифровые символы', () => {
  expect(cardNumberValidator('42760900card_number7131')).toBe(false);
  expect(cardNumberValidator('42760900номер карты7131')).toBe(false);
  expect(cardNumberValidator('42760900номер карты!!!7131')).toBe(false);
});

test('Валидация номера карты не пропускает строку с недостаточным количеством цифр', () => {
  expect(cardNumberValidator('42760900')).toBe(false);
});

test('Валидация номера карты не пропускает строку со слишком большим количеством цифр', () => {
  expect(cardNumberValidator('4276090010887131727609001')).toBe(false);
});

test('Валидация CVV/CVC пропускает строку с тремя цифровыми символами', () => {
  expect(cardCvvValidator('123')).toBe(true);
});

test('Валидация CVV/CVC не пропускает строки с 1-2 цифровыми символами', () => {
  expect(cardCvvValidator('12')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с 4+ цифровыми символами', () => {
  expect(cardCvvValidator('1234')).toBe(false);
});

test('Валидация CVV/CVC не пропускает строки с тремя нецифровыми символами', () => {
  expect(cardCvvValidator('abc')).toBe(false);
  expect(cardCvvValidator('абв')).toBe(false);
  expect(cardCvvValidator(',.!')).toBe(false);
});
