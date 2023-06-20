import { createInputForm } from '../src/domCreator';

/* <form class="p-5">
      <div class="row justify-content-md-center">
        <h2>Форма оплаты </h2>
      </div>
      <div class="form-group row">
        <label class="col-4 col-form-label" for="cardNamber">Номер банковской карты:</label>
        <input type="text" id="cardNamber" placeholder="XXXX XXXX XXXX XXXX" class="col-8 form-control">
      </div>
      <div class="form-group row">
        <label class="col-4 col-form-label" for="cardPeriod">Срок действия карты:</label>
        <input type="text" id="cardPeriod" placeholder="ММГГ" class="col-2 form-control">
      </div>
      <div class="form-group row">
        <label class="col-4 col-form-label" for="cardCvv">CVC/CVV:</label>
        <input type="text" id="cardCvv" placeholder="xxx" class="col-1 form-control">
      </div>
      <div class="form-group row">
        <label class="col-4 col-form-label" for="email">Адрес e-mail:</label>
        <input type="text" id="email" placeholder="example@mail.ru" class="col-8 form-control">
      </div>
      <div class="row justify-content-md-center">
        <button class="btn btn-primary col-5" type="submit" disabled="">Оплатить</button>
      </div>
    </form> */

test('Функция создания DOM-дерева должна вернуть DOM-элемент, в котором содержится строго четыре поля...', () => {
  const el = createInputForm();
  const matches = el.outerHTML.match(/<input.*?>/gi);
  expect(matches.length).toBe(4);
  expect(matches[0]).toContain('placeholder="XXXX XXXX XXXX XXXX"');
  expect(matches[1]).toContain('placeholder="ММГГ"');
  expect(matches[2]).toContain('placeholder="xxx"');
  expect(matches[3]).toContain('placeholder="example@mail.ru"');

  // const regExpr =
  //   /.*<input.*placeholder="XXXX XXXX XXXX XXXX".*>.*<input.*placeholder="ММГГ".*>.*<input.*placeholder="xxx".*>.*<input.*placeholder="example@mail.ru".*>.*/;
  // expect(el).toBeInstanceOf(HTMLFormElement);
  // expect(el.outerHTML).toMatch(regExpr);
});
