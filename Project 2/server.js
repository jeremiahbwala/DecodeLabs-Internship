const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = require("./config/db");

const Task = require("./models/Task");

const app = express();
const PORT = 3000;

app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the DecodeLabs Task Management API!",
  });
});

// GET all tasks
app.get("/api/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json({
      success: true,
      count: tasks.length,
      data: tasks,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve tasks",
    });
  }
});

// GET a single task by ID
app.get("/api/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      data: task,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve task",
    });
  }
});

// PUT: Update an existing task
app.put("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, completed } = req.body;

    // Validate MongoDB ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    // Validate the provided fields
    if (
      (title === undefined || typeof title !== "string" || !title.trim()) &&
      title !== undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid task title",
      });
    }

    if (completed !== undefined && typeof completed !== "boolean") {
      return res.status(400).json({
        success: false,
        message: "Completed must be a boolean",
      });
    }

    // Check that at least one field was provided
    if (title === undefined && completed === undefined) {
      return res.status(400).json({
        success: false,
        message: "Please provide at least one field to update",
      });
    }

    // Prepare update data
    const updateData = {};

    if (title !== undefined) {
      updateData.title = title.trim();
    }

    if (completed !== undefined) {
      updateData.completed = completed;
    }

    // Update the task in MongoDB
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
  console.error("Update task error:", error);

  res.status(500).json({
    success: false,
    message: "Failed to update task",
    error: error.message,
  });
}
});

// POST: Create a new task
app.post("/api/tasks", async (req, res) => {
  try {
    const { title } = req.body;

    // Validate the title
    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid task title",
      });
    }

    // Create a new task in MongoDB
    const newTask = await Task.create({
      title: title.trim(),
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: newTask,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
});

// DELETE: Remove a task
app.delete("/api/tasks/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid task ID",
      });
    }

    // Find and delete the task
    const deletedTask = await Task.findByIdAndDelete(id);

    // Check if the task exists
    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    // Send response
    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
      data: deletedTask,
    });
  } catch (error) {
    console.error("Delete task error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
});

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });
};

startServer();;