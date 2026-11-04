# Task Management API

A simple RESTful backend API built with Node.js and Express.js as part of the DecodeLabs Full Stack Development Internship — Project 2.

The API allows users to retrieve existing tasks, create new tasks, and validates submitted data.

## Project Overview

The goal of this project is to develop a simple backend API that handles application logic, processes user input, and returns appropriate responses.

## Technologies Used

- Node.js
- Express.js
- JavaScript

## Features

- Retrieve all tasks using a GET request.
- Create new tasks using a POST request.
- Validate incoming user input.
- Return appropriate HTTP status codes and JSON responses.
- Store tasks temporarily in memory.

## Getting Started

### Prerequisites

Make sure you have Node.js and npm installed.

### Installation

1. Clone the repository:

   ```bash
   git clone YOUR_GITHUB_REPOSITORY_URL
   ```

2. Navigate into the project directory:

   ```bash
   cd "Project 2"
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

The server will run at:

`http://localhost:3000`

## API Endpoints

### 1. Welcome Route

- **Method:** GET
- **URL:** `/`

Returns a welcome message confirming that the server is running.

### 2. Get All Tasks

- **Method:** GET
- **URL:** `/api/tasks`

Returns all available tasks.

### 3. Create a Task

- **Method:** POST
- **URL:** `/api/tasks`
- **Content-Type:** `application/json`

Example request body:

```json
{
  "title": "Build my first API"
}
```

A successful request returns HTTP `201 Created`.

If the task title is missing or invalid, the API returns HTTP `400 Bad Request`.

## Sample Task Structure

```json
{
  "id": 1,
  "title": "Learn Node.js",
  "completed": false
}
```

## Data Storage

Tasks are currently stored in an in-memory JavaScript array. This means the data resets whenever the server restarts. No external database is required for this project.

## Project Purpose

This project demonstrates basic backend development concepts, including:

- Creating HTTP API endpoints.
- Handling client requests and server responses.
- Processing JSON request bodies.
- Performing basic input validation.
- Using HTTP status codes.

---

**Developed as part of the DecodeLabs Full Stack Development Internship — Project 2.**

# Project 3 – Database Integration & CRUD API

A Task Management REST API built with Node.js, Express.js, MongoDB and Mongoose as part of the DecodeLabs Full Stack Development Internship.

## Overview

This project extends the backend API developed in Project 2 by integrating MongoDB for persistent data storage.

It allows users to create, retrieve, update and delete tasks through RESTful API endpoints.

## Technologies Used

- Node.js – JavaScript runtime environment
- Express.js – Backend web framework
- MongoDB Atlas – Cloud database
- Mongoose – MongoDB object data modeling
- dotenv – Environment variable management

## Features

- MongoDB Atlas database connection
- Task schema and Mongoose model
- Create new tasks
- Retrieve all tasks
- Retrieve individual tasks by ID
- Update existing tasks
- Delete tasks
- Input validation
- Error handling
- Persistent database storage

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/` | API welcome message |
| GET | `/api/tasks` | Retrieve all tasks |
| GET | `/api/tasks/:id` | Retrieve a single task |
| POST | `/api/tasks` | Create a new task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Installation and Setup

### 1. Clone the repository

```bash
git clone YOUR_REPOSITORY_URL
```

### 2. Navigate into the project

```bash
cd YOUR_REPOSITORY_NAME
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URI=your_mongodb_connection_string
```

Replace the connection string with your MongoDB Atlas URI.

### 5. Start the server

```bash
node server.js
```

The server will run at:

`http://localhost:3000`

## Testing

The API was tested using Postman/Thunder Client to verify:

- Successful task creation
- Retrieval of all tasks
- Retrieval of individual tasks
- Successful task updates
- Successful task deletion
- Invalid input handling
- Invalid and nonexistent task ID handling
- Data persistence after server restart

## Learning Outcomes

- Understanding MongoDB database integration
- Working with Mongoose schemas and models
- Implementing CRUD operations
- Understanding asynchronous database operations
- Handling API validation and errors
- Managing environment variables and database credentials

## Internship

**DecodeLabs Full Stack Development Internship – Project 3**