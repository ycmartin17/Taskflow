alert("app.js loaded");

const API = "http://localhost:3000/tasks";

const form = document.getElementById("task-form");
const list = document.getElementById("task-list");

async function loadTasks() {
    const res = await fetch(API);
    const tasks = await res.json();

    list.innerHTML = "";

    tasks.forEach(function(task) {
        const li = document.createElement("li");
        li.className = "task-card " + task.priority;

        li.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p>Priority: ${task.priority}</p>
            <p>Status: ${task.status}</p>
            <p>Due Date: ${task.dueDate}</p>
            <button onclick="markDone('${task.id}')">Mark Done</button>
            <button onclick="deleteTask('${task.id}')">Delete</button>
        `;

        list.appendChild(li);
    });
}

form.addEventListener("submit", async function(event) {
    event.preventDefault();

    const task = {
        title: document.getElementById("title").value,
        description: document.getElementById("description").value,
        priority: document.getElementById("priority").value,
        status: document.getElementById("status").value,
        dueDate: document.getElementById("dueDate").value
    };

    await fetch(API, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    form.reset();
    loadTasks();
});

async function markDone(id) {
    const res = await fetch(API + "/" + id);
    const task = await res.json();

    task.status = "done";

    await fetch(API + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch(API + "/" + id, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();