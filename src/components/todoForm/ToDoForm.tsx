import React, {FormEvent, useState} from 'react'
import './ToDoForm.css'

interface ToDoFormProps {
    addTodo?: (todo: string) => void;
    editTodo?: (todo: string, id: string) => void;
    task?: { id: string; task: string };
    isEditing?: boolean;
}

export function ToDoForm({addTodo, editTodo, task, isEditing}: ToDoFormProps) {
    const [value, setValue] = useState(task ? task.task : '');
    const [error, setError] = useState<string | null>(null);
    const buttonLabel = isEditing ? "Finish Editing" : "Add Task";

    function submit(e: FormEvent) {
        e.preventDefault();

        if (value.trim() === '') {
            setError("Please input a task");
            return;
        }
        setError(null);
        if (task && editTodo) {
            editTodo(value, task.id);
        } else if (addTodo) {
            addTodo(value);
        }
        setValue('');
    }

    return (
        <form onSubmit={submit} className="TodoForm">
            <input
                type="text"
                value={value}
                onChange={(e) => {
                    const newValue = e.target.value.slice(0, 40);
                    setValue(newValue);
                    setError(null);
                }}
                className="todo-input"
                placeholder='Add your tasks here!'
            />
            <button type="submit" className='todo-btn'>{buttonLabel}</button>
            {error && <p className="error-message">{error}</p>}
        </form>
    )
}