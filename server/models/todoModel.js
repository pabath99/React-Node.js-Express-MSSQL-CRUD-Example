const sql = require('mssql');
const config = require('../config/dbConfig');

// Function to retrieve all Todo items from the database
exports.getAllTodos = async () => {
    try {
        await sql.connect(config); // Connect to the database using the provided configuration
        const result = await sql.query`SELECT * FROM todos`; // Execute a SQL query to select all records from the 'todos' table
        return result.recordset; // Return the set of records retrieved from the database
    } catch (err) {
        console.error(err); // Log any errors that occur
    }
};

// Function to retrieve a specific Todo item by its ID
exports.getTodoById = async (id) => {
    try {
        await sql.connect(config); // Connect to the database
        const request = new sql.Request(); // Create a new SQL request
        request.input('id', sql.Int, id); // Set the input parameter 'id' for the SQL query
        const result = await request.query('SELECT * FROM todos WHERE id = @id'); // Execute the query to find the Todo item by ID
        return result.recordset[0]; // Return the first (and ideally only) record in the result set
    } catch (err) {
        console.error(err); // Log any errors
    }
};

// Function to create a new Todo item
exports.createTodo = async (todo) => {
  try {
      const pool = await sql.connect(config); // Connect to the database
      const { title, description, completed } = todo; // Destructure the todo object to get title, description, and completed status
      const request = pool.request(); // Create a new SQL request
      // Input the parameters for the SQL query
      request.input('title', sql.NVarChar(100), title);
      request.input('description', sql.NVarChar(250), description);
      request.input('completed', sql.Bit, completed);
      const result = await request.query('INSERT INTO todos (title, description, completed) OUTPUT INSERTED.* VALUES (@title, @description, @completed)');
      return result.recordset[0]; // Return the newly created record
  } catch (err) {
      console.error(err); // Log any errors
      throw new Error('Error creating todo'); // Throw an error if something goes wrong
  }
};

// Function to update an existing Todo item by its ID
exports.updateTodoById = async (id, todo) => {
    try {
        await sql.connect(config); // Connect to the database
        const { title, description, completed } = todo; // Destructure the updated todo object
        const request = new sql.Request(); // Create a new SQL request
        // Set the input parameters for the SQL query
        request.input('id', sql.Int, id);
        request.input('title', sql.NVarChar(100), title); 
        request.input('description', sql.NVarChar(250), description); 
        request.input('completed', sql.Bit, completed);
        const result = await request.query('UPDATE todos SET title = @title, description = @description, completed = @completed WHERE id = @id');
        return result.recordset; // Return the result of the update operation
    } catch (err) {
        console.error(err); // Log any errors
    }
};

// Function to delete a Todo item by its ID
exports.deleteTodoById = async (id) => {
    try {
        await sql.connect(config); // Connect to the database
        const request = new sql.Request(); // Create a new SQL request
        request.input('id', sql.Int, id); // Set the input parameter 'id' for the SQL query
        const result = await request.query('DELETE FROM todos WHERE id = @id'); // Execute the query to delete the Todo item by ID
        return result.recordset; // Return the result of the deletion operation
    } catch (err) {
        console.error(err); // Log any errors
    }
};
