import React from 'react';
import './ToDoApp.css';
import ToDoList from "./components/todoList/ToDoList";

export function ToDoApp() {
    return (
        <div className="ToDoApp">
            <ToDoList/>
        </div>
    );
}
