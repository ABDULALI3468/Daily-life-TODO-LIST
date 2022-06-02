class Todo {
  constructor(description, completed = false, index) {
    this.description = description;
    this.completed = completed;
    this.index = index;
  }

  add = (todo, todosArr) => {
    todosArr.push(todo);
    localStorage.setItem('todos', JSON.stringify(todosArr));
  };

  remove = (index, todosArr) => {
    todosArr.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todosArr));
  };

  update = (arr) => {
    localStorage.setItem('todos', JSON.stringify(arr));
  };
}

export default Todo;
