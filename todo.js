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

const addTodo = (todo) => {
  let todoList = document.getElementById("todoList");

  let [value, isChecked] = todo;
  let item = document.createElement("li");
  item.innerText = value;
  item.classList.add("list-group-item");

  let checkbox = createCheckBox(isChecked);
  let removeButton = createRemoveButton(item);
  let editButton = createEditButton(item, checkbox, removeButton);

  appendElementsInLi(item, checkbox, removeButton, editButton);
  todoList.appendChild(item);
};

const createCheckBox = (isChecked) => {
  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = isChecked;
  checkbox.addEventListener("click", () => {
    storeTodos();
  });

  return checkbox;
};

const createEditButton = (...elements) => {
  const [item, checkbox, removeButton] = elements;

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
        appendElementsInLi(item, checkbox, removeButton, editButton);
        storeTodos();
      }
    });

    item.innerHTML = "";
    item.appendChild(input);
  });

  return editButton;
};

const createRemoveButton = (item) => {
  let removeButton = document.createElement("button");
  removeButton.innerText = "Remove";
  removeButton.classList.add("btn", "btn-danger", "btn-sm", "float-end");

  removeButton.addEventListener("click", () => {
    item.parentNode.removeChild(item);
    storeTodos();
  });

  return removeButton;
};

const appendElementsInLi = (...elements) => {
  const [item, checkbox, removeButton, editButton] = elements;

  item.insertBefore(checkbox, item.firstChild);
  item.appendChild(removeButton);
  item.appendChild(editButton);
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
