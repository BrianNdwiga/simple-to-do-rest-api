# To-Do List REST API

This project is a RESTful API for managing a simple to-do list. Built using Node.js, Express, and MongoDB, it adheres to best practices for API development, including validations, proper error handling, and a consistent response structure.

## Features

- Create, Read, Update, and Delete (CRUD) operations for to-dos.
- Validations for user input to ensure data integrity.
- Consistent response format with headers and body.
- Unit and integration tests using Jest and Supertest.
- In-memory MongoDB for testing with MongoMemoryServer.

## Table of Contents

- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Testing](#testing)
- [Project Structure](#project-structure)
- [License](#license)

## Technologies

- **Node.js** - JavaScript runtime for server-side development.
- **Express** - Web framework for building APIs.
- **MongoDB** - Database for storing to-do items.
- **Mongoose** - ODM for MongoDB.
- **Jest & Supertest** - For unit and integration testing.

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (optional if running locally; in-memory database is used for tests)
- A package manager like npm or yarn

## Installation

Clone the repository:

```bash
git clone https://github.com/your-repo/todo-api.git
cd todo-api
```

Install dependencies:

```bash
npm install
```

Set up environment variables:

Create a `.env` file in the project root. Add the following variables:

```env
PORT=3000
MONGO_URI=mongodb+srv://<db_username>:<db_password>@node-test.ggxki.mongodb.net/?retryWrites=true&w=majority&appName=node-test
```
Remember to replace <db_username> and <db_password> with your own credentials on MONGO_URI.

Start the server:

```bash
npm start
```

The API will be available at `http://localhost:3000`.

## Usage

### Running the Server

To run the server in development mode with live reloading:

```bash
npm run dev
```

### Running Tests

To execute the unit and integration tests:

```bash
npm test
```

## API Endpoints

### Base URL

`http://localhost:3000/api/todos`

### Endpoints

1. **Get All Todos**
    - URL: `GET /api/todos`
    - Response:
      ```json
      {
            "headers": {
                 "responseCode": 200,
                 "responseMessage": "Fetched Successfully"
            },
            "body": [
                 {
                      "id": "6792c2d1e596462d4df32d61",
                      "title": "Sample To-Do Item",
                      "completed": false
                 }
            ]
      }
      ```

2. **Create a New Todo**
    - URL: `POST /api/todos`
    - Payload:
      ```json
      {
            "title": "Learn Node.js"
      }
      ```
    - Response:
      ```json
      {
            "headers": {
                 "responseCode": 201,
                 "responseMessage": "Created Successfully"
            },
            "body": {
                 "id": "6792c2d1e596462d4df32d61",
                 "title": "Learn Node.js",
                 "completed": false
            }
      }
      ```

3. **Update a Todo**
    - URL: `PUT /api/todos/:id`
    - Payload:
      ```json
      {
            "title": "Learn Advanced Node.js",
            "completed": true
      }
      ```
    - Response:
      ```json
      {
            "headers": {
                 "responseCode": 200,
                 "responseMessage": "Updated Successfully"
            },
            "body": {
                 "id": "6792c2d1e596462d4df32d61",
                 "title": "Learn Advanced Node.js",
                 "completed": true
            }
      }
      ```

4. **Delete a Todo**
    - URL: `DELETE /api/todos/:id`
    - Response:
      ```json
      {
            "headers": {
                 "responseCode": 200,
                 "responseMessage": "Deleted Successfully"
            },
            "body": {
                 "id": "6792c2d1e596462d4df32d61",
                 "title": "Learn Node.js",
                 "completed": false
            }
      }
      ```

## Testing

The project includes a comprehensive test suite for all API endpoints. The tests use an in-memory MongoDB for isolation.

To run tests:

```bash
npm test
```

### Example Test Output

```bash
 PASS  __tests__/todo.test.js
  Todo API Tests
     ✓ GET /api/todos - should return an empty list initially (50ms)
     ✓ POST /api/todos - should create a new todo (23ms)
     ✓ POST /api/todos - should fail when title is missing (12ms)
     ✓ PUT /api/todos/:id - should update an existing todo (18ms)
     ✓ DELETE /api/todos/:id - should delete an existing todo (17ms)

Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
```

## Project Structure

```bash
todo-api/
├── __tests__/           # Test files
├── models/              # Mongoose schemas
│   └── Todo.js
├── routes/              # Route definitions
│   └── todoRoutes.js
├── controllers/         # Controller logic
│   └── todoController.js
├── utils/               # Utility functions
│   └── validations.js
├── app.js               # Express app setup
├── server.js            # Server entry point
├── package.json         # Dependencies and scripts
└── README.md            # Project documentation
```
