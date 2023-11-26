/* Assignment 04: Finishing a Todo List App
 *
 * 
 *
 */


// Variables
let tasks = [];
let nextTaskID = 1;

// DOM Elements
let taskListElement = document.getElementById("TaskList");
let taskInputElement = document.getElementById("TodoInput");
let addTaskButton = document.getElementById("AddTask");
let clearTasksButton = document.getElementById("ClearTasks");

// Functions
function showNotification(message) {
  const notificationElement = document.getElementById("notificationArea");
  notificationElement.textContent = message;
}

// Function to toggle the visibility of the Death Note container
function toggleDeathNoteContainer() {
  const deathNoteContainer = document.getElementById("DeathNoteContainer");
  const openDeathNoteButton = document.getElementById("OpenDeathNote");

  if (deathNoteContainer.style.display === "none") {
    // Show the Death Note container
    deathNoteContainer.style.display = "block";
    openDeathNoteButton.textContent = "Close Death Note";
  } else {
    // Hide the Death Note container
    deathNoteContainer.style.display = "none";
    openDeathNoteButton.textContent = "Open Death Note";
  }
}

// Event listener for the "Open Death Note" button
const openDeathNoteButton = document.getElementById("OpenDeathNote");
openDeathNoteButton.addEventListener("click", toggleDeathNoteContainer);

// Initial hiding of the Death Note container
document.addEventListener("DOMContentLoaded", function () {
  const deathNoteContainer = document.getElementById("DeathNoteContainer");
  deathNoteContainer.style.display = "none";
});


function displayTaskList() {
  taskListElement.innerHTML = "";

  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  tasks = storedTasks || tasks;

  for (const task of tasks) {
    const taskItem = document.createElement("li");
    taskItem.innerHTML =
      `<h2${task.completed ? ' class="completed-task"' : ''}>${task.description}</h2>
      <span>${task.id}</span>
      <button data-id="${task.id}" class="remove-btn">Spare</button>
      <button data-id="${task.id}" class="complete-btn">${task.completed ? 'Unkill' : 'Kill'}</button>
      <button data-id="${task.id}" class="edit-btn">Edit</button>`;

    if (task.completed) {
      const checkMark = document.createElement("span");
      checkMark.innerHTML = "✅";
      checkMark.classList.add("status-icon");
      taskItem.appendChild(checkMark);
    }

    taskListElement.appendChild(taskItem);
  }
}

function handleAddTask() {
  const description = taskInputElement.value.trim();

  if (description !== "") {
    createTask(description);
    taskInputElement.value = "";
    displayTaskList();
  } else {
    showNotification("You can't kill nothing");
  }
}

function showNotification(message) {
  const notificationElement = document.getElementById("notificationArea");
  notificationElement.textContent = message;

  setTimeout(() => {
    notificationElement.textContent = "";
  }, 3000);
}

function handleTaskClick(event) {
  const taskID = parseInt(event.target.getAttribute("data-id"));

  if (event.target.classList.contains("remove-btn")) {
    if (!isNaN(taskID)) {
      removeTask(taskID);
    } else {
      showNotification("Spare who?");
    }
  } else if (event.target.classList.contains("complete-btn")) {
    toggleTaskCompletion(taskID);
  } else if (event.target.classList.contains("edit-btn")) {
    editTaskDescription(taskID);
  }

  displayTaskList();
}

function toggleTaskCompletion(taskID) {
  const taskIndex = tasks.findIndex((task) => task.id === taskID);

  if (taskIndex !== -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;

    // Update stored tasks in localStorage
    updateStoredTasks();
  }
}

function createTask(description) {
  let task = {
    id: getNextTaskID(),
    description: description,
    completed: false,
  };

  tasks.push(task);

  // Update stored tasks in localStorage
  updateStoredTasks();
  displayTaskList();
}

function getNextTaskID() {
  return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
}



function markTaskAsCompleted(taskID) {
  const taskIndex = tasks.findIndex((task) => task.id === taskID);

  if (taskIndex !== -1) {
    tasks[taskIndex].completed = true;
  }
}

function removeTask(taskID) {
  tasks = tasks.filter((task) => task.id !== taskID);

  // Update stored tasks in localStorage
  updateStoredTasks();
  displayTaskList();
}

function editTaskDescription(taskID) {
  const taskIndex = tasks.findIndex((task) => task.id === taskID);

  if (taskIndex !== -1) {
    const newDescription = prompt("Enter new task description:", tasks[taskIndex].description);

    if (newDescription !== null) {
      tasks[taskIndex].description = newDescription.trim();

      // Update stored tasks in localStorage
      updateStoredTasks();
    }
  }
}

function updateStoredTasks() {
  // Update stored tasks in localStorage
  localStorage.setItem("tasks", JSON.stringify(tasks));
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