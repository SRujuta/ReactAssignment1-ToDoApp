import React from 'react';
import {useState, useEffect} from 'react';
import { ToDoListService } from '../services/ToDoListService';
import classes from './ToDoItem.module.css';

function ToDoItem() {

  // useState hook usage
  const [toDoList, setToDoList] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Add to To-Do list
  const addToDo = () => {
    if (newTodo.trim() === "") {
      alert("Please enter a task!");
      return;
    }

    const newTodoItem = { text: newTodo, id: Date.now(), completed: false };
    ToDoListService.addToDoList(newTodoItem).then(() => {
      setToDoList([...toDoList, newTodoItem]);
      setNewTodo("");
    }).catch((error) => {})
  }

  // Remove from To-Do List
  const removeTodoItem = (id) => {
    ToDoListService.removeToDoList(id).then(() => {
      const newToDoList = toDoList.filter(toDoItem => id !== toDoItem.id);
      setToDoList(newToDoList);
    }).catch((error) => {})
  };

  // Toggle complete task 
  const toggleTodoCompletion = (id) => {
    const updatedTodo = toDoList.find(todo => todo.id === id);

    if (!updatedTodo) return;
    const updatedTodoItem = { ...updatedTodo, completed: !updatedTodo.completed };

    ToDoListService.toggleToDoList(updatedTodoItem).then(() => {
      setToDoList(toDoList.map(todo => todo.id === id ? updatedTodoItem : todo));
    }).catch((error) => {})
  }

  // useEffect usage
  useEffect(() => {
      ToDoListService.getToDoListDetails().then((response) => {
        setToDoList(response);
      }).catch((error) => {})
  },[])

  return (
    <div className={classes.todoapp}>
      <h1>To-Do List</h1>
      <div className={classes.todoinput}>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a task..."
        />
        <button onClick={addToDo}>Add Todo</button>
      </div>
      
      <ul className={classes.todolist}>
        {toDoList.length === 0 ? (
          <p>No tasks left to do!</p>
        ) : (
          toDoList.map((todo) => (
            <li key={todo.id} className={todo.completed ? classes.completed : ""}
              onClick={() => toggleTodoCompletion(todo.id)}
            >
              <span className={todo.completed ? classes.lineThrough : ''}>
                {todo.text}
              </span>
              <button onClick={() => removeTodoItem(todo.id)}>Delete</button>
            </li>
          ))
        )}
      </ul>
    </div>
  )
}

export default ToDoItem