let taskFormEl = document.getElementById("task-form");

taskFormEl.addEventListener("submit", function (e) {
  e.preventDefault();
  createTask();
});

// Create Task Functionality
function createTask() {
  let taskInputEl = document.getElementById("task-input");
  let task = taskInputEl.value.trim();

  if (task) {
    let taskList = localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : [];

    let taskObj = { text: task, isCompleted: false };
    taskList.unshift(taskObj);
    localStorage.setItem("tasks", JSON.stringify(taskList));
    displayTasks();
    taskInputEl.value = "";
  }
}

// Display Tasks
function displayTasks() {
  let taskListEl = document.getElementById("task-list-el");
  let taskList = localStorage.getItem("tasks")
    ? JSON.parse(localStorage.getItem("tasks"))
    : [];

  if (taskList.length > 0) {
    let eachTask = '';
    taskList.forEach((task, index) => {
      eachTask += `<li class="list-group-item list-group-item-dark mb-2">
                        <input type="checkbox" id="task-${index}" onclick="strikeTask(${index})" ${task.isCompleted ? "checked" : ""}>
                        <span id="task-text-${index}" style="text-decoration: ${task.isCompleted ? "line-through" : "none"}">${task.text}</span>
                        <button class="float-end" onclick="editTask(${index})">
                            <i class="bi bi-pen"></i>
                        </button>
                        <button class="float-end me-2" onclick="deleteTask(${index})">
                            <i class="bi bi-trash"></i>
                        </button>
                    </li>`;
    });
    taskListEl.innerHTML = eachTask;
  } else {
    taskListEl.innerHTML = "";
  }
}

// Strike through the task when checked
function strikeTask(index) {
  let taskList = JSON.parse(localStorage.getItem("tasks"));
  taskList[index].isCompleted = !taskList[index].isCompleted;
  localStorage.setItem("tasks", JSON.stringify(taskList));
  displayTasks();
}

// Edit task
function editTask(index) {
  let taskTextEl = document.getElementById("task-text-" + index);
  let newTaskText = prompt("Enter new task text:", taskTextEl.textContent);
  if (newTaskText !== null) {
    let taskList = JSON.parse(localStorage.getItem("tasks"));
    taskList[index].text = newTaskText;
    localStorage.setItem("tasks", JSON.stringify(taskList));
    displayTasks();
  }
}

// Delete task
function deleteTask(index) {
  let taskList = JSON.parse(localStorage.getItem("tasks"));
  taskList.splice(index, 1);
  localStorage.setItem("tasks", JSON.stringify(taskList));
  displayTasks();
}

// Initial display of tasks
displayTasks();
