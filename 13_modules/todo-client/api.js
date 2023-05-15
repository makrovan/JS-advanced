// массив хранения дел до его сохранения на локальное хранилище
let todoArray = [];
// если 'remote', то храним на сервере
let dataSource = 'remote';

export function setDataSource(source) {
  dataSource = source;
}

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

// GET /api/todos - получить список дел, query параметр owner фильтрует по владельцу
export async function getTodoArray(storageTitle) {
  if (dataSource !== 'remote') {
    //  локальное хранилище!!!
    const storageString = localStorage.getItem(storageTitle);
    if (storageString) {
      todoArray = JSON.parse(storageString);
    }
    return todoArray;
  }
  const response = await fetch(`http://localhost:3000/api/todos?owner=${storageTitle}`);
  todoArray = await response.json();
  return todoArray;
}

// POST /api/todos - создать дело, в теле запроса нужно передать объект
// { name: string, owner: string, done?: boolean }
export async function addNewItem(name, done, storageTitle) {
  if (dataSource !== 'remote') {
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

  const response = await fetch('http://localhost:3000/api/todos', {
    method: 'POST',
    body: JSON.stringify({
      name,
      owner: storageTitle,
      done,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const todoItem = await response.json();
  return todoItem.id;
}

// DELETE /api/todos/{id} - удалить дело по ID
export function removeItem(id, storageTitle) {
  if (dataSource === 'remote') {
    fetch(`http://localhost:3000/api/todos/${id}`, {
      method: 'DELETE',
    });
    return;
  }
  for (const index of Object.keys(todoArray)) {
    if (parseInt(todoArray[index].id, 10) === parseInt(id, 10)) {
      todoArray.splice(index, 1);
      break;
    }
  }
  saveTodoArray(storageTitle);
}

// PATCH /api/todos/{id} - изменить дело с ID, в теле запроса нужно передать объект
// { name?: string, owner?: string, done?: boolean }
export async function toggleItem(id, storageTitle) {
  if (dataSource !== 'remote') {
    for (const index of Object.keys(todoArray)) {
      if (parseInt(todoArray[index].id, 10) === parseInt(id, 10)) {
        todoArray[index].done = !todoArray[index].done;
        break;
      }
    }
    saveTodoArray(storageTitle);
    return;
  }

  const response = await fetch(`http://localhost:3000/api/todos/${id}`);
  const todoItem = await response.json();
  fetch(`http://localhost:3000/api/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ done: !todoItem.done }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
