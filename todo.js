const addTodo = (value) => {
  let todoList = document.getElementById("todoList");

  let item = document.createElement("li");
  item.innerText = value;
  item.classList.add("list-group-item");

  let removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.classList.add("btn", "btn-danger", "btn-sm", "float-end");

  removeButton.addEventListener("click", () => {
    item.parentNode.removeChild(item);
    storeTodos();
  });

  item.appendChild(removeButton);

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
