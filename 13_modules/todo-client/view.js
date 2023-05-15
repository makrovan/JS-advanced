import {
  setDataSource, getTodoArray, addNewItem, toggleItem, removeItem,
} from './api.js';

//  заголовок приложения
function createApiTitle(title) {
  const apiTitle = document.createElement('h2');
  apiTitle.innerHTML = title;
  return apiTitle;
}

//  форма для создания тела
function createTodoItemForm() {
  const form = document.createElement('form');
  const input = document.createElement('input');
  const buttonWrapper = document.createElement('div');
  const button = document.createElement('button');

  form.classList.add('input-group', 'mb-3');
  input.classList.add('form-control');
  input.placeholder = 'Введите название нового дела';
  buttonWrapper.classList.add('input-group-append');
  button.classList.add('btn', 'btn-primary');
  button.textContent = 'Добавить дело';
  button.disabled = true;

  input.addEventListener('input', () => {
    button.disabled = false;
  });

  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);

  return {
    form,
    input,
    button,
  };
}

// вывод строки с одним делом
async function createTodoItem(name, done, storageTitle, id = 0) {
  const newId = (id === 0) ? await addNewItem(name, done, storageTitle) : id;
  const item = document.createElement('li');
  //  элемент с кнопками
  const buttonGroup = document.createElement('div');
  const doneButton = document.createElement('button');
  const deleteButton = document.createElement('button');

  item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  if (done) {
    item.classList.add('list-group-item-success');
  }
  item.setAttribute('id', newId);
  item.textContent = name;

  buttonGroup.classList.add('btn-group', 'btn-group-sm');
  doneButton.classList.add('btn', 'btn-success');
  doneButton.textContent = 'Готово';
  deleteButton.classList.add('btn', 'btn-danger');
  deleteButton.textContent = 'Удалить';

  doneButton.addEventListener('click', async () => {
    await toggleItem(item.id, storageTitle);
    item.classList.toggle('list-group-item-success');
  });

  deleteButton.addEventListener('click', () => {
    if (window.confirm('Вы уверены?')) {
      removeItem(item.id, storageTitle);
      item.remove();
    }
  });

  //  добавляем кнопки в группу элементов
  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  return {
    item,
    doneButton,
    deleteButton,
  };
}

//  список элементов
async function createTodoList(storageTitle) {
  const list = document.createElement('ul');
  const todoArray = await getTodoArray(storageTitle);
  list.classList.add('list-group');
  todoArray.forEach(async (todoInstance) => {
    const istanceName = todoInstance.name;
    const instanceDone = todoInstance.done;
    const instanceId = todoInstance.id;
    const todoItem = await createTodoItem(istanceName, instanceDone, storageTitle, instanceId);
    list.append(todoItem.item);
  });
  // for (const  of todoArray) {}
  return list;
}

//-------------------------------------------------------------------
async function createTodoApp(container, title, storageTitle, source) {
  container.innerHTML = '';
  // todoArrayStorage = storageTitle;

  setDataSource(source);

  const todoAppTitle = createApiTitle(title);
  const todoItemForm = createTodoItemForm();
  const todoList = await createTodoList(storageTitle);

  //  событие submit по нажатию enter либо на кнопку
  todoItemForm.form.addEventListener('submit', async (event) => {
    event.preventDefault();

    //  проверка на то, что что-то введено
    if (!todoItemForm.input.value) {
      return;
    }

    const todoItem = await createTodoItem(todoItemForm.input.value, false, storageTitle);
    //  создаем и добавляем в список новое дело
    todoList.append(todoItem.item);
    todoItemForm.input.value = '';
    todoItemForm.button.disabled = true;
  });

  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);
}

// document.addEventListener('DOMContentLoaded',
//  createTodoApp(document.getElementById('todo-app'), 'Список дел'));
// window.createTodoApp = createTodoApp;
export default createTodoApp;
