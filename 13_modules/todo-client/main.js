import createTodoApp from './view.js';

// const localSelected = document.querySelector('#localChecked');
// const serverSelected = document.querySelector('#serverChecked');

const options = document.getElementsByName('options');
const container = document.getElementById('todo-app');
createTodoApp(container, 'Список дел', container.dataset.source, 'local');

options.forEach((option) => {
  option.addEventListener('change', (event) => {
    createTodoApp(container, 'Список дел', container.dataset.source, event.currentTarget.value);
  });
});
