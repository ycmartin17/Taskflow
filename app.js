const TASK_API = "http://localhost:3000/tasks";
const USER_API = "http://localhost:3000/users";

// =========================
// DASHBOARD TASKS
// =========================

const form = document.getElementById("taskForm");
const list = document.getElementById("taskList");

async function loadTasks() {
    if (!list) return;

    const res = await fetch(TASK_API);
    const tasks = await res.json();

    list.innerHTML = "";

    tasks.forEach(function(task) {
        const card = document.createElement("div");
        card.className = "task-card";

        card.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <p><strong>Priority:</strong> ${task.priority}</p>
            <p><strong>Status:</strong> ${task.status}</p>
            <p><strong>Due Date:</strong> ${task.dueDate}</p>
            <button onclick="markDone('${task.id}')">Mark Done</button>
            <button onclick="deleteTask('${task.id}')">Delete</button>
        `;

        list.appendChild(card);
    });
}

if (form) {
    form.addEventListener("submit", async function(event) {
        event.preventDefault();

        const task = {
            title: document.getElementById("title").value,
            description: document.getElementById("description").value,
            priority: document.getElementById("priority").value,
            status: document.getElementById("status").value,
            dueDate: document.getElementById("dueDate").value
        };

        await fetch(TASK_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(task)
        });

        form.reset();
        loadTasks();
    });
}

async function markDone(id) {
    const res = await fetch(TASK_API + "/" + id);
    const task = await res.json();

    task.status = "done";

    await fetch(TASK_API + "/" + id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(task)
    });

    loadTasks();
}

async function deleteTask(id) {
    await fetch(TASK_API + "/" + id, {
        method: "DELETE"
    });

    loadTasks();
}

loadTasks();

// =========================
// REGISTER
// =========================

const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const name = document.getElementById("regName").value;
        const email = document.getElementById("regEmail").value;
        const password = document.getElementById("regPassword").value;

        await fetch(USER_API, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password
            })
        });

        alert("Registration successful!");
        window.location.href = "login.html";
    });
}

// =========================
// LOGIN
// =========================

const loginForm = document.getElementById("loginForm");

if (loginForm) {
    loginForm.addEventListener("submit", async function(e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        const res = await fetch(USER_API);
        const users = await res.json();

        let foundUser = null;

        users.forEach(function(user) {
            if (user.email === email && user.password === password) {
                foundUser = user;
            }
        });

        if (foundUser) {
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password.");
        }
    });
}

// =========================
// CONTACT
// =========================

const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function(e) {
        e.preventDefault();

        alert("Message sent successfully!");
        contactForm.reset();
    });
}