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
    const imgHeight = this.cardElement.offsetHeight;
    imgElement.style.height = `${imgHeight}px`;
    this.cardElement.append(imgElement);
  }

  get cardNumber() {
    return this._cardNumber;
  }
}
