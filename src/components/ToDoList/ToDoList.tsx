
import React, { useState } from 'react';
import TodoItem from './ToDoItem';
import './Todolist.css'

// Define the structure of a Todo item
interface Todo {
    id: number;
    title: string;
    completed: boolean;
    editing?: boolean;
}

const TodoList: React.FC = () => {
    // Initialize state for the list of todos and the new todo title
    // useState is a hook that allows us to manage state in a functional component
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState<string>('');

    // Event handler for input change in the new todo input field
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        // Update the new todo title state with the input value
        setNewTodoTitle(event.target.value);
    };

    // Function to add a new todo to the list
    const addTodo = () => {
        // Check if the new todo title is not empty
        if (newTodoTitle.trim() !== '') {
            // Create a new todo object
            const newTodo: Todo = {
                id: Date.now(), // Generate a unique ID using the current timestamp
                title: newTodoTitle,
                completed: false,
            };
            // Add the new todo to the beginning of the todos array
            setTodos([newTodo, ...todos]);
            // Clear the new todo title input field
            setNewTodoTitle('');
        }
    };

    // Function to toggle the completion status of a todo
    const toggleComplete = (id: number) => {
        // Update the todos array by mapping over each todo
        setTodos(
            todos.map((todo) =>
                // If the todo ID matches the provided ID, toggle its completed status
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    // Function to delete a todo from the list
    const deleteTodo = (id: number) => {
        // Update the todos array by filtering out the todo with the matching ID
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    // Function to enable editing mode for a todo
    const editTodo = (id: number) => {
        // Update the todos array by mapping over each todo
        setTodos(
            todos.map((todo) =>
                // If the todo ID matches the provided ID, set its editing property to true
                todo.id === id ? { ...todo, editing: true } : todo
            )
        );
    };

    // Function to save changes to a todo after editing
    const saveTodo = (id: number, newTitle: string) => {
        // Update the todos array by mapping over each todo
        setTodos(
            todos.map((todo) =>
                // If the todo ID matches the provided ID, update its title and disable editing mode
                todo.id === id ? { ...todo, title: newTitle, editing: false } : todo
            )
        );
    };

    // JSX to render the todo list component
    return (
        <div className="todo-list-container">
            <h1>Todo List</h1>
            {/* Container for adding new todos */}
            <div className="add-todo-container">
                <input
                    type="text"
                    placeholder="Add a new todo..."
                    value={newTodoTitle}
                    onChange={handleInputChange}
                />
                <button onClick={addTodo}>Add</button>
            </div>
            {/* Unordered list to display todos */}
            <ul>
                {/* Map over the todos array and render a TodoItem component for each todo */}
                {todos.map((todo) => (
                    <TodoItem
                        key={todo.id}
                        todo={todo}
                        toggleComplete={toggleComplete}
                        deleteTodo={deleteTodo}
                        editTodo={editTodo}
                        saveTodo={saveTodo}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
