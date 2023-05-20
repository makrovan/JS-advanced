// массив хранения дел до его сохранения на локальное хранилище
let todoArray = [];

function getNextId(todoArr) {
  if (todoArr.length === 0) {
    return 1;
  }
  return todoArr[todoArr.length - 1].id + 1;
}

function saveTodoArray(storageTitle) {
  const storageString = JSON.stringify(todoArray);
  localStorage.setItem(storageTitle, storageString);
}

export function getTodoArray(storageTitle) {
  //  локальное хранилище!!!
  const storageString = localStorage.getItem(storageTitle);
  if (storageString) {
    todoArray = JSON.parse(storageString);
  }
  return todoArray;
}

export function addNewItem(name, done, storageTitle) {
  const id = getNextId(todoArray);
  const todoItem = {
    id,
    name,
    done,
  };

  todoArray.push(todoItem);
  saveTodoArray(storageTitle);
  return id;
}

export function removeItem(id, storageTitle) {
  for (const index of Object.keys(todoArray)) {
    if (parseInt(todoArray[index].id, 10) === parseInt(id, 10)) {
      todoArray.splice(index, 1);
      break;
    }
  }
  saveTodoArray(storageTitle);
}

export function toggleItem(id, storageTitle) {
  for (const index of Object.keys(todoArray)) {
    if (parseInt(todoArray[index].id, 10) === parseInt(id, 10)) {
      todoArray[index].done = !todoArray[index].done;
      break;
    }
  }
  saveTodoArray(storageTitle);
}
