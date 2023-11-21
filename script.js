/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


//
// Variables


// Constants


// DOM Elements
// Variables
let tasks = [];
let nextTaskID = 1;

// DOM Elements
let taskListElement = document.getElementById("TaskList");
let taskInputElement = document.getElementById("TaskInput");
let addTaskButton = document.getElementById("AddTask");
let clearTasksButton = document.getElementById("ClearTasks");

// Functions
function showNotification(message) {
  const notificationElement = document.getElementById("notificationArea");
  notificationElement.textContent = message;
}

function displayTaskList() {
  taskListElement.innerHTML = "";

  for (const task of tasks) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML =
      `<h2>${task.description}</h2>
      <span>${task.id}</span>
      <button data-id="${task.id}" class="remove-btn">Remove</button>
      <button data-id="${task.id}" class="complete-btn">Complete</button>`;

    if (task.completed) {
      const checkMark = document.createElement("span");
      checkMark.innerHTML = "✅";
      checkMark.classList.add("status-icon");
      taskItem.appendChild(checkMark);
      taskItem.classList.add("done");
    }

    taskListElement.appendChild(taskItem);
  }

  // Check if there are tasks
  if (tasks.length > 0) {
    const lastAddedTask = tasks[tasks.length - 1].description;
    // Do something with lastAddedTask if needed
  }
}

function handleAddTask() {
  const description = taskInputElement.value.trim();

  if (description !== "") {
    createTask(description);
    taskInputElement.value = "";
    displayTaskList();
  }
}

function handleTaskClick(event) {
  const taskID = parseInt(event.target.getAttribute("data-id"));

  if (event.target.classList.contains("remove-btn")) {
    removeTask(taskID);
  } else if (event.target.classList.contains("complete-btn")) {
    markTaskAsCompleted(taskID);
  }

  displayTaskList();
}

function createTask(description) {
  let task = {
    id: nextTaskID,
    description: description,
    completed: false,
  };

  tasks.push(task);
  nextTaskID++;
}

function markTaskAsCompleted(taskID) {
  const taskIndex = tasks.findIndex((task) => task.id === taskID);

  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
  }
}

function removeTask(taskID) {
  tasks = tasks.filter((task) => task.id !== taskID);
}

function clearAllTasks() {
  tasks = [];
  displayTaskList();
}

// Event Listeners
addTaskButton.addEventListener("click", handleAddTask);
taskListElement.addEventListener("click", handleTaskClick);
clearTasksButton.addEventListener("click", clearAllTasks);

// Initial rendering
displayTaskList();

const appID = "app";
const headingText = "To do. To done. ✅";