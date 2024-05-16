
import React, { useState } from 'react';
import TodoItem from './ToDoItem';
import './Todolist.css'

interface Todo {
    id: number;
    title: string;
    completed: boolean;
    editing?: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodoTitle, setNewTodoTitle] = useState<string>('');

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewTodoTitle(event.target.value);
    };

    const addTodo = () => {
        if (newTodoTitle.trim() !== '') {
            const newTodo: Todo = {
                id: Date.now(),
                title: newTodoTitle,
                completed: false,
            };
            setTodos([newTodo, ...todos]);
            setNewTodoTitle('');
        }
    };

    const toggleComplete = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    const deleteTodo = (id: number) => {
        setTodos(todos.filter((todo) => todo.id !== id));
    };

    const editTodo = (id: number) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, editing: true } : todo
            )
        );
    };

    const saveTodo = (id: number, newTitle: string) => {
        setTodos(
            todos.map((todo) =>
                todo.id === id ? { ...todo, title: newTitle, editing: false } : todo
            )
        );
    };

    return (
        <div className="todo-list-container">
            <h1>Todo List</h1>
            <div className="add-todo-container">
                <input
                    type="text"
                    placeholder="Add a new todo..."
                    value={newTodoTitle}
                    onChange={handleInputChange}
                />
                <button onClick={addTodo}>Add</button>
            </div>
            <ul>
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
