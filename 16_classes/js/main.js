import AmazingCard from './amazingcard.js';

// массив с картами
const cards = [];

// Функция, генерирующую массив парных чисел.
function createNumbersArray(count) {
  const pairs = [];
  let localCount = count * count;
  localCount /= 2;
  for (let i = 1; i <= localCount; i++) {
    pairs.push(i);
    pairs.push(i);
  }
  return pairs;
}

// Функцию перемешивания массива.
function shuffle(arr) {
  let m = arr.length;
  let t;
  let i;

  while (m) {
    i = Math.floor(Math.random() * m--);
    t = arr[m];
    arr[m] = arr[i];
    arr[i] = t;
  }
  return arr;
}

function flip(card) {
  console.log('Клик по карте', card);
}

function startGame(count) {
  const container = document.getElementById('app');
  container.innerHTML = '';
  let cardsNumberArray = createNumbersArray(count);
  cardsNumberArray = shuffle(cardsNumberArray);
  for (const cardNumber of cardsNumberArray) {
    cards.push(new AmazingCard(container, cardNumber, flip, count));
  }
}

function getSize(container = document.getElementById('app')) {
  const form = document.createElement('form');
  const input = document.createElement('input');
  input.type = 'number';
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  form.classList.add('input-group', 'mt-5');
  input.classList.add('form-control');
  input.placeholder = 'Введите размер поля';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Начать игру';

  button.disabled = true;

  input.addEventListener('input', () => {
    button.disabled = false;
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (input.value % 2) {
      startGame(4);
    } else {
      startGame(input.value);

      // setTimeout(() => {
      //   container.innerHTML = '';
      //   window.alert('время вышло...');
      //   getSize();
      // }, 60000);
    }
  });

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);
  container.append(form);
}

getSize();
