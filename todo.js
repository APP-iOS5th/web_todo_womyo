const storeTodos = () => {
  let todos = [];
  let todoList = document.getElementById("todoList");

  for (let i = 0; i < todoList.children.length; i++) {
    todos.push(todoList.children[i].innerText.trim());
  }

  localStorage.setItem("todos", JSON.stringify(todos));
};
