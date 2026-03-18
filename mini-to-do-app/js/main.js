const btnContainer = document.getElementById("btn-container");
const allBtn = document.getElementById("btn-all");
const completedBtn = document.getElementById("btn-completed");
const uncompletedBtn = document.getElementById("btn-uncompleted");
const openAddTaskBtn = document.getElementById("open-add-task-btn");
const addTaskDialog = document.getElementById("add-task-dialog");
const closeBtn = document.getElementById("close-btn");
const taskInput = document.getElementById("task-input");
const submitTaskBtn = document.getElementById("submit-task-btn");
const taskList = document.getElementById("task-list");

let tasks = [];

let currentFilter = "all";

const renderTasks = () => {
  taskList.innerHTML = "";

  let filtered = tasks;

  if (currentFilter === "completed") {
    filtered = tasks.filter((task) => task.completed);
  } else if (currentFilter === "uncompleted") {
    filtered = tasks.filter((task) => !task.completed);
  }

  filtered.forEach((task) => {
    const li = document.createElement("li");
    li.classList.add("task-item");

    const leftBox = document.createElement("div");
    leftBox.classList.add("left-box");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    const span = document.createElement("span");
    span.innerText = task.text;
    if (task.completed) {
      span.classList.add("checked");
    } else {
      span.classList.remove("checked");
    }

    const removeBtn = document.createElement("button");
    removeBtn.classList.add("remove-btn");
    removeBtn.innerText = "X";

    leftBox.appendChild(checkbox);
    leftBox.appendChild(span);

    li.appendChild(leftBox);
    li.appendChild(removeBtn);

    taskList.appendChild(li);

    checkbox.dataset.id = task.id;

    checkbox.addEventListener("change", () => {
      const taskId = parseInt(checkbox.dataset.id);
      const target = tasks.find((t) => t.id === taskId);
      if (target) {
        task.completed = checkbox.checked;
        renderTasks();
      }
    });

    removeBtn.dataset.id = task.id;

    removeBtn.addEventListener("click", () => {
      const taskId = parseInt(removeBtn.dataset.id);
      tasks = tasks.filter((t) => t.id !== taskId);
      renderTasks();
    });
  });
};

openAddTaskBtn.addEventListener("click", () => {
  addTaskDialog.showModal();

  requestAnimationFrame(() => {
    addTaskDialog.classList.remove("closing");
  });
});

addTaskDialog.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    addTaskDialog.close();
  }
});

const addNewTask = (taskContent) => {
  tasks.push({
    id: Date.now(),
    text: taskContent,
    completed: false,
  });

  addTaskDialog.close();
  renderTasks();
  taskInput.value = "";
  taskInput.focus();
  console.log(tasks);
};

submitTaskBtn.addEventListener("click", () => {
  const taskContent = taskInput.value.trim();

  if (taskContent !== "") {
    addNewTask(taskContent);
  }
});

taskInput.addEventListener("keydown", (e) => {
  const taskContent = taskInput.value.trim();

  if (e.key === "Enter" && taskContent !== "") {
    e.preventDefault();
    addNewTask(taskContent);
  }
});

closeBtn.addEventListener("click", () => {
  addTaskDialog.classList.add("closing");

  setTimeout(() => {
    addTaskDialog.close();
    addTaskDialog.removeAttribute("closing");
  }, 300);
});

allBtn.addEventListener("click", () => {
  currentFilter = "all";
  renderTasks();
});

completedBtn.addEventListener("click", () => {
  currentFilter = "completed";
  renderTasks();
});

uncompletedBtn.addEventListener("click", () => {
  currentFilter = "uncompleted";
  renderTasks();
});
