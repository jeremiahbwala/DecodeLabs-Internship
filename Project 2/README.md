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