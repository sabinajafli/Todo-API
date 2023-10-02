let inputName = document.getElementById("input");
let addButton = document.getElementById("add-btn");
let openBox = document.getElementById("open");
let inProgressBox = document.getElementById("in-progress");
let completedBox = document.getElementById("completed");

let todo = [];

function generateId() {
  let id = Date.now();
  return id.toString();
}

function input() {
    let inputValue = inputName.value.trim();

    if (inputValue === "") {
        alert("You cannot create an empty task");
        return;
    }

    let task = {
        id: generateId(),
        name: inputValue,
        status: "open"
    }

    todo.push(task);
    addTask(task);
    inputName.value = "";
};

function addTask(task) {
    let taskElement = document.createElement("div");
    taskElement.innerText = task.name;
    taskElement.className = "task"
    taskElement.draggable = true;
    taskElement.dataset.taskId = task.id;

    taskElement.addEventListener("dragstart", (event) => {
        event.dataTransfer.setData("text/plain", task.id);
    });

    if (task.status === "open") {
        openBox.appendChild(taskElement);
    } else if (task.status === "in-progress") {
        inProgressBox.appendChild(taskElement);
    } else if (task.status === "completed") {
        completedBox.appendChild(taskElement);
    }
}

addButton.addEventListener("click", input);


openBox.addEventListener("dragover", (event) => {
    event.preventDefault();
});

openBox.addEventListener("drop", (event) => {
    const taskId = event.dataTransfer.getData("text/plain");
    moveTaskToStatus(taskId, "open");
    event.preventDefault();
});

inProgressBox.addEventListener("dragover", (event) => {
    event.preventDefault();
});

inProgressBox.addEventListener("drop", (event) => {
    const taskId = event.dataTransfer.getData("text/plain");
    moveTaskToStatus(taskId, "in-progress");
    event.preventDefault();
});

completedBox.addEventListener("dragover", (event) => {
    event.preventDefault();
});

completedBox.addEventListener("drop", (event) => {
    const taskId = event.dataTransfer.getData("text/plain");
    moveTaskToStatus(taskId, "completed");
    event.preventDefault();
});


function moveTaskToStatus(taskId, newStatus) {
    const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
    const task = todo.find((t) => t.id === taskId);

    if (task) {
        task.status = newStatus;
        taskElement.parentElement.removeChild(taskElement);

        if (newStatus === "open") {
            openBox.appendChild(taskElement);
            taskElement.classList.remove("completed-task");
        } else if (newStatus === "in-progress") {
            inProgressBox.appendChild(taskElement);
            taskElement.classList.remove("completed-task");
        } else if (newStatus === "completed") {
            completedBox.appendChild(taskElement);
            taskElement.classList.add("completed-task");
        }
    }
}
