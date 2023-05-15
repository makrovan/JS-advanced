export async function getTodoArray(storageTitle) {
  const response = await fetch(`http://localhost:3000/api/todos?owner=${storageTitle}`);
  const todoArray = await response.json();
  return todoArray;
}

export async function addNewItem(name, done, storageTitle) {
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

export function removeItem(id) {
  fetch(`http://localhost:3000/api/todos/${id}`, {
    method: 'DELETE',
  });
}

export async function toggleItem(id) {
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
