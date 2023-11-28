// Importing Modules
// Importing 'express' module to create route handlers
const express = require('express');
// Creating a router object to define routes for the TODO operations
const router = express.Router();
// Importing 'TodoController' module to handle the logic for TODO operations
const TodoController = require('../controllers/todoController');

// Defining Routes 
// Route to handle GET requests to retrieve all TODOs
// The logic is handled by the 'getAllTodos' method of 'TodoController'
router.get('/', TodoController.getAllTodos);

// Route to handle GET requests to retrieve a specific TODO by ID
// The logic is handled by the 'getTodoById' method of 'TodoController'
router.get('/:id', TodoController.getTodoById);

// Route to handle POST requests to create a new TODO
// The logic is handled by the 'createTodo' method of 'TodoController'
router.post('/', TodoController.createTodo);

// Route to handle PUT requests to update a specific TODO by ID
// The logic is handled by the 'updateTodoById' method of 'TodoController'
router.put('/:id', TodoController.updateTodoById);

// Route to handle DELETE requests to delete a specific TODO by ID
// The logic is handled by the 'deleteTodoById' method of 'TodoController'
router.delete('/:id', TodoController.deleteTodoById);

// Exporting the Router       
// Exporting the router to be used in other modules
module.exports = router;








