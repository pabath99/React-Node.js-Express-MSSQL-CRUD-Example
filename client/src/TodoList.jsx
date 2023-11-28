import React, { useState, useEffect } from 'react';
import DataGrid, { Column, Editing, Paging } from 'devextreme-react/data-grid';
import 'devextreme/dist/css/dx.light.css';
import axios from 'axios';

const TodoList = () => {
  // State to store the list of todos
  const [todos, setTodos] = useState([]);

  // useEffect hook to fetch todos when the component mounts
  useEffect(() => {
    fetchTodos();
  }, []);

  // Function to fetch todos from the backend
  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/todos');
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  // Function to handle saving a new todo
  const handleSave = async (e) => {
    const newTodo = { title: e.data.title, description: e.data.description, completed: e.data.completed || false};
  
    try {
      await axios.post('http://localhost:3000/api/todos', newTodo);
      fetchTodos();
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };
  
   // Function to handle updating a todo
  const handleUpdate = async (e) => {
    const updatedTodo = { ...e.oldData, ...e.newData };
  
    try {
      await axios.put(`http://localhost:3000/api/todos/${updatedTodo.id}`, updatedTodo);
      fetchTodos();
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  // Function to handle deleting a todo
  const handleDelete = async (e) => {
    const deletedTodoId = e.data.id;
    
    try {
      await axios.delete(`http://localhost:3000/api/todos/${deletedTodoId}`);
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  // Rendering the component
  return (
    <div>
      <h1>Todo List</h1>
      <DataGrid
        dataSource={todos}
        showBorders={true}
        width="100%"
        height={400}
        onRowInserted={handleSave}
        onRowUpdating={handleUpdate}
        onRowRemoved={handleDelete}
      >
        <Editing
          mode="popup"
          allowAdding={true}
          allowUpdating={true}
          allowDeleting={true}
          useIcons={true}
        />
        <Paging enabled={false} />
        <Column dataField="id" caption="ID" width={50} />
        <Column dataField="title" caption="Task" width={300} />
        <Column dataField="description" caption="Description" width={500} />
        <Column dataField="completed" caption="Completed" dataType="boolean" width={50} />
        <Column type="buttons" width={110} />
      </DataGrid>
    </div>
  );
};

export default TodoList;
