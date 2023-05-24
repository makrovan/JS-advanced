// выбранная карта
let currentCard = null;

export default class Card {
  // конструктор класса c параметрами. Устанавливает начальные свойства и параметры карты.
  // Также запускает создание карты (метод createElement).
  constructor(container, cardNumber, flip, numberInLine = 4) {
    this.container = container;
    if (typeof cardNumber !== 'number') {
      throw new TypeError('Номер карточки должен быть числом');
    }
    this.flip = flip;
    this.numberInLine = numberInLine;
    this.createElement();
    this.cardNumber = cardNumber;
    this.open = false;
    this.success = false;
  }

  // метод, создающий карту и помещающий её в DOM-элемент, который был указан в конструкторе класса.
  // Метод должен возвращать созданный элемент карты.
  createElement() {
    const cardField = document.createElement('div');
    cardField.classList.add('border', 'border-primary', 'd-flex', 'justify-content-center', 'align-items-center');
    cardField.style.margin = '5px';
    cardField.style.width = `calc(100%/${this.numberInLine} - 10px)`;
    cardField.style.height = `calc(100vh/${this.numberInLine} - 10px)`;
    cardField.addEventListener('click', () => {
      // если повторно кликнули на открытую карту
      if (this.open) {
        return;
      }
      this.open = true;
      if (currentCard === null) {
        currentCard = this;
      } else if (currentCard.cardNumber === this.cardNumber) {
        currentCard.success = true;
        this.success = true;
        currentCard = null;
      } else {
        setTimeout(() => {
          this.open = false;
          // если открыли больше 2-х карт а минуту:
          if (currentCard) {
            currentCard.open = false;
            currentCard = null;
          }
        }, 1000);
      }
      this.flip(this);
    });
    this.container.append(cardField);

    const card = document.createElement('div');
    card.classList.add('overflow-hidden');
    cardField.append(card);
    this.cardElement = card;
    return card;
  }

  // свойство, принимающее числовое значение (1, 2, 4, ...). Устанавливает номер карты.
  set cardNumber(value) {
    this._cardNumber = value;
    this.cardElement.textContent = value;
  }

  get cardNumber() {
    return this._cardNumber;
  }

  // свойство, принимающее значение true или false
  // При установке этого параметра (сеттер) карта должна открыться или закрыться соответственно
  set open(value) {
    this._open = value;
    this.cardElement.style.display = value ? 'block' : 'none';
  }

  get open() {
    return this._open;
  }

  // свойство, принимающее значение true или false
  // установка (сеттер) значения true считается, что карта уже нашла свою пару:
  // карта меняет визуальный стиль, и на неё нельзя кликнуть
  set success(value) {
    this._success = value;
    if (value) {
      this.open = true;
      this.cardElement.addEventListener('click', () => { });
    } else {
      this.open = false;
    }
  }

  get success() {
    return this._success;
  }
}
