import Card from './card.js';

export default class AmazingCard extends Card {
  set cardNumber(value) {
    this._cardNumber = value;
    // this.cardElement.textContent = value;
    const imgElement = document.createElement('img');
    const imgCode = value + 400;
    imgElement.onerror = function () {
      imgElement.src = '../img/stich.png';
    };
    imgElement.src = `https://http.cat/${imgCode}`;
    imgElement.alt = imgCode;
    this.cardElement.style.height = '100%';
    this.cardElement.style.width = '100%';
    imgElement.style.height = '100%';
    imgElement.style.width = '100%';
    this.cardElement.append(imgElement);
  }

  get cardNumber() {
    return this._cardNumber;
  }
}
