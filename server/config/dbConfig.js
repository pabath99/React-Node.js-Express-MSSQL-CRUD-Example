// Importing Modules          
// Importing the 'mssql' module to interact with the SQL server
const sql = require('mssql');

// Database Configuration     
// Defining the configuration for connecting to the SQL database
const dbConfig = {
  // Credentials and location for database access
  user: 'your_username',
  password: 'your_password',
  server: 'your_server_name',
  database: 'your_database_name',

  // Pooling configuration to manage database connections efficiently
  pool: {
    max: 10, // Maximum number of connections in pool
    min: 0,  // Minimum number of connections in pool
    idleTimeoutMillis: 30000 // Time (ms) to wait before closing idle connections
  },
  
  // Options for the database connection
  options: {
    encrypt: true, // Enable encryption for data sent between client and server
    trustServerCertificate: true // Trust the certificate that is used to encrypt the data
  }
};

// Database Connection        
// 'connect' - Function to establish connection to the database
const connect = async () => {
  try {
    // Attempting to connect to the database using the provided configuration
    await sql.connect(dbConfig);
    // Logging success message to the console
    console.log('Connected to the database.');
  } catch (error) {
    // Logging error message and error object to the console
    console.error('Error connecting to the database:', error);
  }
};

// Module Exports             
// Exporting the 'sql' object and 'connect' function for use in other modules
module.exports = { sql, connect };
