// ToDoItem.tsx
// This file defines the ToDoItem component, which represents a single todo item.

import React, { useState } from 'react'; // Import React and the useState hook for managing state.

// Define an interface to describe the structure of a todo item.
interface Todo {
    id: number; // Unique identifier for the todo item.
    title: string; // Text content of the todo item.
    completed: boolean; // Flag indicating whether the todo item is completed.
    editing?: boolean; // Optional flag indicating whether the todo item is being edited.
}

// Define an interface to describe the props passed to the ToDoItem component.
interface TodoItemProps {
    todo: Todo; // The todo item to be displayed.
    toggleComplete: (id: number) => void; // Function to toggle the completion status of the todo item.
    deleteTodo: (id: number) => void; // Function to delete the todo item.
    editTodo: (id: number) => void; // Function to enable editing of the todo item.
    saveTodo: (id: number, newTitle: string) => void; // Function to save the edited title of the todo item.
}

// Define a functional component named TodoItem.
const TodoItem: React.FC<TodoItemProps> = (props) => {
    // Initialize a state variable to store the edited title of the todo item.
    const [editingTitle, setEditingTitle] = useState(props.todo.title);

    // Define a function to handle input changes during editing.
    const handleEditInputChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        // Access the native DOM event.
        const nativeEvent = event.nativeEvent as KeyboardEvent;
        if (nativeEvent.key === 'Enter') {
            // Save the edited title when the Enter key is pressed.
            props.saveTodo(props.todo.id, editingTitle);
        } else {
            // Update the editing title based on the input value.
            setEditingTitle(event.target.value);
        }
    };

    // Return the JSX to render the ToDoItem component.
    return (
        <li>
            <input
                type="checkbox"
                checked={props.todo.completed}
                onChange={() => props.toggleComplete(props.todo.id)}
            />

            {props.todo.editing ? (
                <input
                    type="text"
                    value={editingTitle}
                    onChange={handleEditInputChange}
                />
            ) : (
                <span
                    style={{
                        textDecoration: props.todo.completed ? 'line-through' : 'none', // Apply a line-through style if the todo item is completed.
                    }}
                >
                    {props.todo.title}
                </span>
            )}

            {props.todo.editing ? (
                <button onClick={() => props.saveTodo(props.todo.id, editingTitle)}>
                    Save
                </button>
            ) : (
                <>
                    <button onClick={() => props.editTodo(props.todo.id)}>Edit</button>
                    <button
                        onClick={() => props.deleteTodo(props.todo.id)}
                        disabled={!props.todo.completed} // Disable the delete button if the todo item is not completed.
                    >
                        Delete
                    </button>
                </>
            )}
        </li>
    );
};

// Export the ToDoItem component as the default export.
export default TodoItem;


