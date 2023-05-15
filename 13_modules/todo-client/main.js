import createTodoApp from './view.js';

// const localSelected = document.querySelector('#localChecked');
// const serverSelected = document.querySelector('#serverChecked');

const options = document.getElementsByName('options');
options.forEach((option) => {
  option.addEventListener('change', (event) => {
    createTodoApp(document.getElementById('todo-app'), 'Список дел', 'deal', event.currentTarget.value);
  });
});
// const sourceButton = document.getElementById('sourceButton');
// sourceButton.addEventListener('click', () => {

// });
