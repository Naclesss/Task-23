const inputElem = document.querySelector("#input-name");
const form = document.querySelector("#form");
const listElem = document.querySelector("#to-do-list");
const buttonElem = document.querySelector("#to-do-list button");

const toDoArray = JSON.parse(localStorage.getItem("to-do-list")) || [];

function updateTodoList() {
  listElem.innerHTML = "";

  for (const key in toDoArray) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.innerText = toDoArray[key];

    const button = document.createElement("button");
    button.innerText = "Delete";
    button.setAttribute("key", key);
    button.classList.add("delete");

    li.appendChild(span);
    li.appendChild(button);
    listElem.appendChild(li);
  }

  localStorage.setItem("to-do-list", JSON.stringify(toDoArray));
  document.getElementById("item-count").innerText = toDoArray.length;
}

function addToList(value) {
  if (value === "") return;

  toDoArray.push(value);

  updateTodoList();
  inputElem.value = "";
  inputElem.focus();
}

function deleteItem(key) {
  toDoArray.splice(Number(key), 1);

  updateTodoList();
  inputElem.value = "";
  inputElem.focus();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addToList(inputElem.value);
});

document.addEventListener("click", (e) => {
  const el = e.target;
  if (el.classList.contains("delete")) {
    deleteItem(el.getAttribute("key"));
  }
});

updateTodoList();

const themeSwitcher = document.getElementById("theme-switcher");

themeSwitcher.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  document.body.classList.toggle("light-mode");

  const currentTheme = document.body.classList.contains("dark-mode")
    ? "dark-mode"
    : "light-mode";
  localStorage.setItem("theme", currentTheme);
});

window.addEventListener("load", () => {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme) {
    document.body.classList.add(savedTheme);
  }
});