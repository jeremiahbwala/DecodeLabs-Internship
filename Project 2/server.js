const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());

// Temporary task database
const tasks = [
  {
    id: 1,
    title: "Learn Node.js",
    completed: false,
  },
  {
    id: 2,
    title: "Understand Express.js",
    completed: true,
  },
];

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the DecodeLabs Task Management API!",
  });
});

// GET all tasks
app.get("/api/tasks", (req, res) => {
  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// POST: Create a new task
app.post("/api/tasks", (req, res) => {
  const { title } = req.body;

  // Validate the title
  if (!title || typeof title !== "string" || !title.trim()) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid task title",
    });
  }

  // Create the new task
  const newTask = {
    id: tasks.length > 0
      ? Math.max(...tasks.map((task) => task.id)) + 1
      : 1,
    title: title.trim(),
    completed: false,
  };

  // Save the task
  tasks.push(newTask);

  // Send response
  res.status(201).json({
    success: true,
    message: "Task created successfully",
    data: newTask,
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});