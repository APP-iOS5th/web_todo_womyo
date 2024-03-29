const addTodo = (value) => {
  let todoList = document.getElementById("todoList");

  let item = document.createElement("li");
  item.innerText = value;
  item.classList.add("list-group-item");

  todoList.appendChild(item);
};

const storeTodos = () => {
  let todos = [];
  let todoList = document.getElementById("todoList");

  for (let i = 0; i < todoList.children.length; i++) {
    todos.push(todoList.children[i].innerText.trim());
  }

  localStorage.setItem("todos", JSON.stringify(todos));
};
