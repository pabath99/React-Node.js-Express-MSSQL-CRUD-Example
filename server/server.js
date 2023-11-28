// Importing Modules         
// Importing 'express' module to create and configure the HTTP server
const express = require('express');
// Importing 'cors' module to enable Cross-Origin Resource Sharing (CORS)
const cors = require('cors');
// Importing 'todoRoutes' module to use its routing logic
const todoRoutes = require('./routes/todoRoutes');
// Importing 'connect' function from 'dbConfig' module to establish database connection
const { connect } = require('./config/dbConfig');

//  Setting Up Express App     
// Creating an instance of an Express application
const app = express();

// Middleware to parse JSON bodies from HTTP requests
app.use(express.json());
// Middleware to parse URL-encoded bodies from HTTP requests (extended: true allows parsing of nested objects)
app.use(express.urlencoded({ extended: true }));
// Enabling CORS for all origins with default settings
app.use(cors());

// Setting Up Routes          
// Mounting the 'todoRoutes' on '/todos' path
app.use('/api/todos', todoRoutes);

// Starting the Server        
// Defining the port number on which the server will listen
const PORT = 3000;
// Starting the server and establishing a connection to the database
app.listen(PORT, async () => {
  // Connecting to the database using the imported 'connect' function
  await connect();
  // Logging a message indicating the port on which the server is running
  console.log(`Server is running on port ${PORT}`);
});
