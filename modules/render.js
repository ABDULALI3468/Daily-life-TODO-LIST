import Todo from './todo';
import updateStatus from './todostatus';

const todoInput = document.querySelector('.addTodo');
const clearCompletedBtn = document.querySelector('.completeButton');
const listContainer = document.querySelector('#place');

let todosArr = [];

const updateIndex = (index) => {
  for (let i = index + 1; i < todosArr.length; i += 1) {
    todosArr[i].index -= 1;
  }
};

const updateCheckBox = (index, bool) => {
  updateStatus(index, bool, todosArr);
};

const render = () => {
  listContainer.innerHTML = null;
  const todo = new Todo();
  if (localStorage.getItem('todos')) {
    todosArr = JSON.parse(localStorage.getItem('todos'));
  }

  const removeTodo = (arrIndex) => {
    updateIndex(arrIndex);
    todo.remove(arrIndex, todosArr);
  };

  const editDescription = (index, ele) => {
    todosArr[index].description = ele.value;
    todo.update(todosArr);
    render();
  };

  for (let i = 0; i < todosArr.length; i += 1) {
    updateCheckBox(i, false);
    const li = document.createElement('li');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    const inputDesc = document.createElement('input');
    inputDesc.value = todosArr[i].description;
    inputDesc.className = 'todoDesc';
    inputDesc.readOnly = true;
    const todoOptions = document.createElement('i');
    todoOptions.classList.add(
      'threedots',
      'fa-solid',
      'fa-ellipsis-vertical',
      'todo-options',
    );
    li.append(checkbox, inputDesc, todoOptions);
    listContainer.appendChild(li);

    inputDesc.addEventListener('keyup', (event) => {
      if (event.key === 'Enter') {
        editDescription(i, inputDesc);
      }
    });

    todoOptions.addEventListener('click', () => {
      li.style.background = '#dfdeac';
      todoOptions.style.background = '#dfdeac';
      todoOptions.style.border = 'none';

      inputDesc.readOnly = false;
      inputDesc.focus();
      if (todoOptions.classList.contains('fa-trash-can')) {
        li.remove();
        removeTodo(i);
      }
      todoOptions.classList.toggle('fa-ellipsis-vertical');
      todoOptions.classList.toggle('fa-trash-can');
    });

    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        updateCheckBox(i, true);
        inputDesc.style.textDecoration = 'line-through';
      } else {
        updateCheckBox(i, false);
        inputDesc.style.textDecoration = 'none';
      }
    });
  }
};

const addTodo = () => {
  if (todoInput.value) {
    const todo = new Todo(todoInput.value, false, todosArr.length + 1);
    todo.add(todo, todosArr);
    render();
    todoInput.value = null;
  } else {
    alert('Task description can not be empty');
  }
};

todoInput.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    addTodo();
  }
});

clearCompletedBtn.addEventListener('click', () => {
  const todo = new Todo();
  const filtered = todosArr.filter((todo) => todo.completed !== true);
  todosArr = filtered;
  for (let i = 0; i < todosArr.length; i += 1) {
    todosArr[i].index = i + 1;
  }
  localStorage.setItem('todos', JSON.stringify(todosArr));
  render();
});

export default render;
