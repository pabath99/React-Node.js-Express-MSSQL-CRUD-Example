// Importing Modules          
// Importing 'TodoModel' model to interact with the database
const TodoModel = require('../models/todoModel');

// Define a function to get all Todo items
exports.getAllTodos = async (req, res) => {
  try {
      // Retrieve all Todo items from the database
      const todos = await TodoModel.getAllTodos();
      // Send the retrieved items as a JSON response
      res.json(todos);
  } catch (err) {
      console.error(err);
      // Send a 500 Internal Server Error response in case of failure
      res.status(500).json({
          error: "Internal Server Error",
          message: "An error occurred while retrieving todos."
      });
  }
};

// Define a function to get a Todo item by its ID
exports.getTodoById = async (req, res) => {
  try {
      // Retrieve the Todo item using the ID from the request parameters
      const todo = await TodoModel.getTodoById(req.params.id);
      if (!todo) {
          // Send a 404 Not Found response if the Todo item does not exist
          return res.status(404).json({ error: "Todo not found" });
      }
      // Send the retrieved Todo item as a JSON response
      res.json(todo);
  } catch (err) {
      console.error(err);
      // Send a 500 Internal Server Error response in case of failure
      res.status(500).json({
          error: "Internal Server Error",
          message: "An error occurred while retrieving the Todo item."
      });
  }
};

// Define a function to create a new Todo item
exports.createTodo = async (req, res) => {
  try {
      // Create a new Todo item using the data from the request body
      const newTodo = await TodoModel.createTodo(req.body);
      // Send a 201 Created response with the newly created Todo item
      res.status(201).json(newTodo);
  } catch (err) {
      console.error(err);
      // Send a 500 Internal Server Error response in case of failure
      res.status(500).json({
          error: "Internal Server Error",
          message: "An error occurred while creating the Todo item."
      });
  }
};

// Define a function to update a Todo item by its ID
exports.updateTodoById = async (req, res) => {
  try {
      // Update the Todo item using the ID from the request parameters and data from the request body
      const updatedTodo = await TodoModel.updateTodoById(req.params.id, req.body);
      if (!updatedTodo) {
          // Send a 404 Not Found response if the Todo item does not exist
          return res.status(404).json({ error: "Todo not found" });
      }
      // Send the updated Todo item as a JSON response
      res.json(updatedTodo);
  } catch (err) {
      console.error(err);
      // Send a 500 Internal Server Error response in case of failure
      res.status(500).json({
          error: "Internal Server Error",
          message: "An error occurred while updating the Todo item."
      });
  }
};

// Define a function to delete a Todo item by its ID
exports.deleteTodoById = async (req, res) => {
  try {
      // Delete the Todo item using the ID from the request parameters
      const deleteResult = await TodoModel.deleteTodoById(req.params.id);
      if (!deleteResult) {
          // Send a 404 Not Found response if the Todo item does not exist
          return res.status(404).json({ error: "Todo not found" });
      }
      // Send a 200 OK response on successful deletion
      res.status(200).send('Todo deleted successfully.');
  } catch (err) {
      console.error(err);
      // Send a 500 Internal Server Error response in case of failure
      res.status(500).json({
          error: "Internal Server Error",
          message: "An error occurred while deleting the Todo item."
      });
  }
};

