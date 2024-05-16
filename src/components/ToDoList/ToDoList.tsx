
import React, { useReducer } from 'react';
import TodoItem from './ToDoItem';
import './Todolist.css'

// Define the structure of a Todo item
interface Todo {
    id: number;
    title: string;
    completed: boolean;
    editing?: boolean;
}

// Define the actions that can be dispatched to the reducer
type Action =
    | { type: 'ADD_TODO'; payload: string }
    | { type: 'TOGGLE_COMPLETE'; payload: number }
    | { type: 'DELETE_TODO'; payload: number }
    | { type: 'EDIT_TODO'; payload: number }
    | { type: 'SAVE_TODO'; payload: { id: number; newTitle: string } };

// Define the initial state for the reducer
const initialState: Todo[] = [];

// Define the reducer function to handle state updates based on actions
const reducer = (state: Todo[], action: Action): Todo[] => {
    switch (action.type) {
        // Add a new todo
        case 'ADD_TODO':
            return [
                {
                    id: Date.now(),
                    title: action.payload,
                    completed: false,
                },
                ...state,
            ];

        // Toggle the completion status of a todo
        case 'TOGGLE_COMPLETE':
            return state.map((todo) =>
                todo.id === action.payload
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );

        // Delete a todo
        case 'DELETE_TODO':
            return state.filter((todo) => todo.id !== action.payload);

        // Enable editing mode for a todo
        case 'EDIT_TODO':
            return state.map((todo) =>
                todo.id === action.payload ? { ...todo, editing: true } : todo
            );

        // Save changes to a todo after editing
        case 'SAVE_TODO':
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? {
                        ...todo,
                        title: action.payload.newTitle,
                        editing: false,
                    }
                    : todo
            );

        default:
            return state;
    }
};

const TodoList: React.FC = () => {
    // Initialize state using the useReducer hook with the reducer function and initial state
    const [todos, dispatch] = useReducer(reducer, initialState);
    const [newTodoTitle, setNewTodoTitle] = React.useState('');

    // Event handler for input change in the new todo input field
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(event.target.value);
    };

    // Function to add a new todo by dispatching an 'ADD_TODO' action
    const addTodo = () => {
        if (newTodoTitle.trim() !== '') {
            dispatch({ type: 'ADD_TODO', payload: newTodoTitle });
            setNewTodoTitle('');
        }
    };

    // Function to toggle the completion status of a todo by dispatching a 'TOGGLE_COMPLETE' action
    const toggleComplete = (id: number) => {
        dispatch({ type: 'TOGGLE_COMPLETE', payload: id });
    };

    // Function to delete a todo by dispatching a 'DELETE_TODO' action
    const deleteTodo = (id: number) => {
        dispatch({ type: 'DELETE_TODO', payload: id });
    };

    // Function to enable editing mode for a todo by dispatching an 'EDIT_TODO' action
    const editTodo = (id: number) => {
        dispatch({ type: 'EDIT_TODO', payload: id });
    };

    // Function to save changes to a todo after editing by dispatching a 'SAVE_TODO' action
    const saveTodo = (id: number, newTitle: string) => {
        dispatch({
            type: 'SAVE_TODO',
            payload: { id, newTitle },
        });
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

