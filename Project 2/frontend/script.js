
const API_URL = "http://localhost:3000/api/tasks";

const taskList = document.getElementById("taskList");
const loading = document.getElementById("loading");
const message = document.getElementById("message");
const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");

// Retrieve tasks from the backend
async function fetchTasks() {
    loading.textContent = "Loading tasks...";
    loading.style.display = "block";
    message.textContent = "";

    try {
        const response = await fetch(API_URL);

        if (!response.ok) {
            throw new Error("Failed to fetch tasks");
        }

        const result = await response.json();
        const tasks = result.data;
        
        console.log("Backend response:", tasks);
        console.log("Is this an array?", Array.isArray(tasks));

        // Clear the existing task list
        taskList.innerHTML = "";

        if (tasks.length === 0) {
            message.textContent = "No tasks found. Add your first task!";
            return;
        }

        // Display each task
        tasks.forEach((task) => {
            const li = document.createElement("li");

            li.className = task.completed
                ? "task-item completed"
                : "task-item";

            // Create checkbox
            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;

            checkbox.addEventListener("change", () => {
                updateTask(task._id, checkbox.checked);
            });

            // Create delete button
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "delete-btn";

            deleteButton.addEventListener("click", () => {
                deleteTask(task._id);
            });

            const title = document.createElement("span");
            title.className = "task-title";
            title.textContent = task.title;

            // Add elements to task item
            li.appendChild(checkbox);
            li.appendChild(title);
            li.appendChild(deleteButton);

            taskList.appendChild(li);
        });

    } catch (error) {
        message.textContent = error.message;
        console.error("Error:", error);

    } finally {
        loading.style.display = "none";
    }
}

// Create a new task
async function addTask(title) {
    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                title: title
            })
        });

        if (!response.ok) {
            throw new Error("Failed to add task");
        }

        const result = await response.json();

        console.log("Task created:", result);

        message.textContent = "Task added successfully!";

        // Clear the input field
        taskTitle.value = "";

        // Refresh the task list
        await fetchTasks();

        message.textContent = "Task added successfully!";

    } catch (error) {
        message.textContent = error.message;
        console.error("Error:", error);
    }
}


async function updateTask(id, completed) {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                completed: completed
            })
        });

        if (!response.ok) {
            throw new Error("Failed to update task");
        }

        const result = await response.json();

        console.log("Task updated:", result);

        message.textContent = "Task updated successfully!";

        await fetchTasks();

    } catch (error) {
        message.textContent = error.message;
        console.error("Error:", error);

        await fetchTasks();
    }
}


async function deleteTask(id) {
    const confirmed = confirm("Are you sure you want to delete this task?");

    if (!confirmed) {
        return;
    }

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

        console.log("Task deleted successfully:", id);

        message.textContent = "Task deleted successfully!";

        // Refresh the task list
        await fetchTasks();

        message.textContent = "Task deleted successfully!";

    } catch (error) {
        message.textContent = error.message;
        console.error("Error:", error);
    }
}


// Listen for form submission
taskForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = taskTitle.value.trim();

    if (!title) {
        message.textContent = "Please enter a task title.";
        return;
    }

    addTask(title);
});

// Run when the page loads
fetchTasks();
