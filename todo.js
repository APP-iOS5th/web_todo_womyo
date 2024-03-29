const handleInput = () => {
  let value = document.getElementById("todoInput").value;

  if (value) {
    addTodo([value, false]);
    document.getElementById("todoInput").value = "";
    storeTodos();
  }
};

document.getElementById("addTodo").addEventListener("click", handleInput);

document.getElementById("todoInput").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    handleInput();
  }
});

const addTodo = (value) => {
  let todoList = document.getElementById("todoList");

  let [text, checked] = value;
  let item = document.createElement("li");
  item.innerText = text;
  item.classList.add("list-group-item");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = checked;
  checkbox.addEventListener("click", () => {
    storeTodos();
  });

  let editButton = document.createElement("button");
  editButton.innerHTML = '<i class="bi bi-pencil-square"></i>';
  editButton.classList.add("btn", "btn-edit", "btn-sm", "float-end");

  editButton.addEventListener("click", () => {
    const input = document.createElement("input");
    input.type = "text";
    input.value = item.innerText.replace("Remove", "").trim();
    input.classList.add("form-control");

    input.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        item.innerText = input.value.trim();
        item.insertBefore(checkbox, item.firstChild);
        item.appendChild(removeButton);
        item.appendChild(editButton);
        storeTodos();
      }
    });

    item.innerHTML = "";
    item.appendChild(input);
  });

  let removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.classList.add("btn", "btn-danger", "btn-sm", "float-end");

  removeButton.addEventListener("click", () => {
    item.parentNode.removeChild(item);
    storeTodos();
  });

  item.insertBefore(checkbox, item.firstChild);
  item.appendChild(removeButton);
  item.appendChild(editButton);

  todoList.appendChild(item);
};

const storeTodos = () => {
  let todos = [];
  let todoList = document.getElementById("todoList");

  for (let i = 0; i < todoList.children.length; i++) {
    todos.push([
      todoList.children[i].innerText.replace("Remove", "").trim(),
      todoList.children[i].querySelector("input[type='checkbox']").checked,
    ]);
  }

  localStorage.setItem("todos", JSON.stringify(todos));
};

const loadTodos = () => {
  let todos = JSON.parse(localStorage.getItem("todos"));

  if (todos) {
    todos.forEach((todo) => {
      addTodo(todo);
    });
  }
};

loadTodos();
